import { render } from '@testing-library/react'
import Router from 'react-router-dom'
import * as Redux from 'react-redux'

import store from 'store'
import CharacterList from 'components/CharacterList'

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

const mockSetState = jest.fn()
const mockState = (init: any) => [init, mockSetState]
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (init: any) => mockState(init)
}))

describe('Character list component', () => {
  const serieID = '1011334'
  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockImplementation(() => ({ id: serieID }))
    jest.spyOn(Router, 'useLocation').mockImplementation(() => ({
      hash: '',
      pathname: `/character/${serieID}`,
      search: '',
      state: ''
    }))
  })

  function renderApp(props = {}) {
    return render(
      <Redux.Provider store={store}>
        <Router.MemoryRouter>
          <CharacterList {...props} />
        </Router.MemoryRouter>
      </Redux.Provider>
    )
  }

  it('should hide series amount if no serie is available', () => {
    const reduxState = {
      ...store.getState().characters,
      characters: [
        {
          id: 1011334,
          name: '3-D Man',
          description: '',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
            extension: 'jpg'
          },
          series: {
            available: 0,
            collectionURI:
              'http://gateway.marvel.com/v1/public/characters/1011334/series',
            items: [],
            returned: 0
          }
        }
      ],
      loading: false,
      page: 1,
      maxPages: 1
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => reduxState)
    const { getByTestId } = renderApp()
    const characterSerieAmount = getByTestId('serie-amount')

    expect(characterSerieAmount.textContent).toBe('')
  })

  it('should show previous page card if page is higher than 1', () => {
    const stateWithError = {
      ...store.getState().characters,
      loading: false,
      page: 2
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithError)
    const { getByTestId } = renderApp()

    expect(getByTestId('prevPage')).toBeTruthy()
  })

  it('should show next page card if has more than 1 page', () => {
    const stateWithError = {
      ...store.getState().characters,
      loading: false,
      page: 1,
      maxPages: 2
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithError)
    const { getByTestId, queryByTestId } = renderApp()

    expect(queryByTestId('prevPage')).toBeNull()
    expect(getByTestId('nextPage')).toBeTruthy()
  })

  it('should not show next page card if actual page is equal to max pages', () => {
    const stateWithError = {
      ...store.getState().characters,
      loading: false,
      page: 2,
      maxPages: 2
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithError)
    const { queryByTestId } = renderApp()

    expect(queryByTestId('nextPage')).toBeNull()
  })

  it('should show loading spinner on page card when changing page', () => {
    const stateWithError = {
      ...store.getState().characters,
      loading: true,
      page: 2,
      maxPages: 3
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithError)
    const { queryAllByTestId } = renderApp()

    expect(queryAllByTestId('loading-spinner').length).toBe(2)
  })
})
