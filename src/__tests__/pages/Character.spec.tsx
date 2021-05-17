import 'jest-canvas-mock'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import Router from 'react-router-dom'
import * as Redux from 'react-redux'

import store from 'store'
import Character from 'pages/Character'
import { updateCharacter } from 'store/modules/characters/actions/updateCharacters'

// MOCK TOAST
jest.mock('react-toastify')

// MOCK REDUX
const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

// MOCK ROUTER
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

const characterExample = {
  id: 1010870,
  name: 'Ajaxis',
  description: 'Ajaxis description',
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/70/4c0035adc7d3a',
    extension: 'jpg'
  },
  series: {
    available: 0,
    items: []
  }
}

describe('Character page', () => {
  function renderApp(props = {}) {
    return render(
      <Redux.Provider store={store}>
        <Router.MemoryRouter>
          <Character {...props} />
        </Router.MemoryRouter>
      </Redux.Provider>
    )
  }

  function changeState(newCharacterState = {}, newSeriesState = {}) {
    const reduxCharacterState = {
      ...store.getState().characters,
      ...newCharacterState
    }
    const reduxSeriesState = {
      ...store.getState().series,
      ...newSeriesState
    }
    return jest
      .spyOn(Redux, 'useSelector')
      .mockImplementationOnce(() => reduxSeriesState)
      .mockImplementationOnce(() => reduxCharacterState)
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('sould show loading animation', () => {
    jest.restoreAllMocks()
    const characterName = 'Ajaxis'
    jest.spyOn(Router, 'useLocation').mockImplementation(() => ({
      hash: '',
      pathname: `/character/1010870`,
      search: '',
      state: {
        name: characterName
      }
    }))
    const { getByTestId } = renderApp()

    expect(getByTestId('load-anim')).toBeTruthy()
    expect(getByTestId('load-text').textContent).toBe(
      `Aguarde enquanto ${characterName} se prepara para a batalha`
    )
  })

  it('sould throw an error if no character is found', () => {
    changeState({ noInfo: true })
    const toastError = jest.spyOn(toast, 'error')
    renderApp()
    expect(toastError).toHaveBeenCalledWith('Personagem não encontrado', {
      toastId: 'notFound'
    })
  })

  it('sould throw an error if the request fails somehow', () => {
    changeState({ loadError: true })
    const toastError = jest.spyOn(toast, 'error')
    renderApp()
    expect(toastError).toHaveBeenCalledWith('Falha ao carregar o personagem', {
      toastId: 'error'
    })
  })

  it('sould show character info', () => {
    changeState({
      loadError: false,
      loading: false,
      characterInfo: characterExample
    })
    const { getByText, getByTestId } = renderApp()

    expect(getByText(characterExample.name)).toBeTruthy()
    expect(getByText(characterExample.description)).toBeTruthy()
    expect(getByTestId('toggle-edit')).toBeTruthy()
  })

  it('sould show specific series placeholder depending on the amount', async () => {
    const state = {
      loadError: false,
      loading: false,
      characterInfo: {
        ...characterExample,
        series: {
          available: 0,
          items: []
        }
      }
    }
    changeState(state)

    let app = renderApp()
    expect(app.queryByTestId('series-count')).toBeNull()
    app.unmount()

    Object.assign(state, {
      characterInfo: {
        ...characterExample,
        series: { available: 1, items: [] }
      }
    })
    changeState(state)

    app = renderApp()
    expect(app.getByTestId('series-count').textContent).toBe('1 série')
    app.unmount()

    Object.assign(state, {
      characterInfo: {
        ...characterExample,
        series: { available: 2, items: [] }
      }
    })
    changeState(state)
    app = renderApp()

    expect(app.getByTestId('series-count').textContent).toBe('2 séries')
    app.unmount()
  })

  it('sould be able to toggle the edit mode', async () => {
    const charState = {
      loadError: false,
      loading: false,
      characterInfo: characterExample
    }
    const mock = changeState(charState)
    const { getByTestId, queryByTestId } = renderApp()

    const toggleEditBtn = getByTestId('toggle-edit')
    expect(toggleEditBtn).toBeTruthy()
    mock
      .mockImplementationOnce(() => store.getState().series)
      .mockImplementationOnce(() => charState)
    await waitFor(() => fireEvent.click(toggleEditBtn))

    expect(queryByTestId('toggle-edit')).toBeNull()
    const nameInput = getByTestId('input-component')
    expect(nameInput).toBeTruthy()
    expect(nameInput.getAttribute('value')).toBe(characterExample.name)

    const descriptionInput = getByTestId('textarea-component')
    expect(descriptionInput).toBeTruthy()
  })

  it('sould be able to edit the name and description', async () => {
    jest
      .spyOn(Router, 'useParams')
      .mockImplementation(() => ({ id: `${characterExample.id}` }))
    const charState = {
      loadError: false,
      loading: false,
      characterInfo: characterExample
    }
    const mock = changeState(charState)
    const { getByTestId } = renderApp()

    const toggleEditBtn = getByTestId('toggle-edit')
    expect(toggleEditBtn).toBeTruthy()
    mock
      .mockImplementationOnce(() => store.getState().series)
      .mockImplementationOnce(() => charState)
    await waitFor(() => fireEvent.click(toggleEditBtn))

    const nameInput = getByTestId('input-component')
    fireEvent.change(nameInput, { target: { value: 'Novo nome' } })
    const descriptionInput = getByTestId('textarea-component')
    fireEvent.change(descriptionInput, { target: { value: 'Nova desc' } })
    const updateForm = getByTestId('update-form')

    const newState = {
      loadError: false,
      loading: false,
      characterInfo: {
        ...characterExample,
        name: 'Novo nome',
        description: 'Nova desc'
      }
    }
    mock
      .mockImplementationOnce(() => store.getState().series)
      .mockImplementationOnce(() => newState)
    await waitFor(() => fireEvent.submit(updateForm))

    expect(toggleEditBtn).toBeTruthy()
    expect(mockDispatch).toHaveBeenNthCalledWith(
      3,
      updateCharacter({
        id: `${characterExample.id}`,
        name: 'Novo nome',
        description: 'Nova desc'
      })
    )
  })

  it('should be able to show the serie lists of the character', () => {
    const seriesState = {
      loading: false,
      total: 2,
      series: [
        {
          id: 3374,
          title: 'Hulk',
          description:
            "General Thunderbolt Ross spent years hunting the Hulk, but now he's become one himself! As the rampaging Red Hulk, Ross strives to reconcile the man he used to be with the monster he's becomes, smashing anything that moves along the way!",
          startYear: 2008,
          endYear: 2012,
          rating: '',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/2/d0/5137710f56aa1',
            extension: 'jpg'
          }
        },
        {
          id: 474,
          title: 'Ultimate X-Men',
          description:
            "The battle for mutant supremacy reaches new heights in the Ultimate Universe when Professor X's X-Men clash with Magneto's Brotherhood, and humanity finds itself caught in the middle! Meet dynamic new versions of old favorites including Wolverine, Cyclops, Storm and many more!",
          startYear: 2001,
          endYear: 2009,
          rating: 'T',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/7/50/5148c9cd878e3',
            extension: 'jpg'
          }
        }
      ]
    }
    changeState(
      {
        loadError: false,
        loading: false,
        characterInfo: {
          ...characterExample,
          series: {
            available: 2,
            items: []
          }
        }
      },
      seriesState
    )
      .mockImplementationOnce(() => store.getState().characters)
      .mockImplementationOnce(() => seriesState)
    const { queryAllByTestId } = renderApp()

    const seriesCard = queryAllByTestId('serie-card')
    expect(seriesCard.length).toBe(2)
  })

  it('should be able to cancel the edit mode', async () => {
    jest
      .spyOn(Router, 'useParams')
      .mockImplementation(() => ({ id: `${characterExample.id}` }))
    const charState = {
      loadError: false,
      loading: false,
      characterInfo: characterExample
    }
    const mock = changeState(charState)
    const { getByTestId } = renderApp()

    const toggleEditBtn = getByTestId('toggle-edit')
    expect(toggleEditBtn).toBeTruthy()
    mock
      .mockImplementationOnce(() => store.getState().series)
      .mockImplementationOnce(() => charState)
    await waitFor(() => fireEvent.click(toggleEditBtn))

    changeState(charState)
    const cancelEdit = getByTestId('cancel-edit')
    expect(cancelEdit).toBeTruthy()
    await waitFor(() => fireEvent.click(cancelEdit))

    expect(toggleEditBtn).toBeTruthy()
  })

  it('should be able to list another page', async () => {
    jest
      .spyOn(Router, 'useParams')
      .mockImplementation(() => ({ id: `${characterExample.id}` }))
    jest.spyOn(Router, 'useLocation').mockImplementation(() => ({
      hash: '',
      pathname: '/character/1016823',
      search: '?page=2',
      state: ''
    }))
    const charState = {
      loadError: false,
      loading: false,
      characterInfo: {
        ...characterExample,
        series: {
          available: 100
        }
      }
    }
    changeState(charState)
    const { getByTestId, getByText } = renderApp()

    expect(getByTestId('series-count').textContent).toBe('100 séries')
    expect(getByText('Exibindo 29 - 56 de 100')).toBeTruthy()
  })
})
