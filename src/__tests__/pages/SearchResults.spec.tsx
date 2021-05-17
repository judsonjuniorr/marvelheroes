import { render, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import Router from 'react-router-dom'
import * as Redux from 'react-redux'

import store from 'store'
import SearchResults from 'pages/SearchResults'
import { searchCharactersRequest } from 'store/modules/characters/actions/searchCharacters'

// MOCK ROUTER
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

// MOCK REDUX
const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

// MOCK TOAST
jest.mock('react-toastify')

const characterExample = {
  id: 123,
  description: 'Throws web',
  name: 'Spider Man',
  thumbnail: {
    path: 'http://marvel.com',
    extension: 'jpg'
  },
  series: {
    available: 1,
    items: [
      {
        resourceURI: 'http://marvel.com',
        name: 'The amazing spider man'
      }
    ]
  }
}

describe('Search Resutls page', () => {
  function renderApp(props = {}) {
    return render(
      <Redux.Provider store={store}>
        <Router.MemoryRouter>
          <SearchResults {...props} />
        </Router.MemoryRouter>
      </Redux.Provider>
    )
  }

  it('should show query on header', () => {
    const query = 'spider'
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue(query)

    const { getByText } = renderApp()
    expect(getByText(query)).toBeTruthy()
  })

  it('should dispatch query request', async () => {
    const query = 'spider'
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue(query)

    renderApp()
    expect(mockDispatch).toHaveBeenCalledWith(searchCharactersRequest(query))
  })

  it('should throw error on search fail and redirect', async () => {
    const stateWithError = {
      ...store.getState().characters,
      searchError: true
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithError)
    const toastError = jest.spyOn(toast, 'error')
    renderApp()

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/')
      expect(toastError).toHaveBeenCalledWith(
        'Ocorreu um erro ao realizar sua pesquisa'
      )
    })
  })

  it('should show results and amount found', () => {
    const stateWithResult = {
      ...store.getState().characters,
      loading: false,
      searchResult: [...Array(28).keys()].map(id => ({
        ...characterExample,
        id
      }))
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithResult)
    jest.spyOn(Router, 'useLocation').mockImplementation(() => ({
      hash: '',
      pathname: '/search',
      search: '?query=spider',
      state: ''
    }))
    const { getByText, getAllByTestId } = renderApp()

    expect(getByText('28 encontrados')).toBeTruthy()
    expect(getAllByTestId('character-item').length).toBe(28)
  })
})
