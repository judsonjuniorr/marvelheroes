import { fireEvent, render, waitFor } from '@testing-library/react'
import * as Redux from 'react-redux'
import Router from 'react-router-dom'

import store from 'store'
import Home from 'pages/Home'
import { loadAllCharactersRequest } from 'store/modules/characters/actions/loadAllCharacters'
import { toast } from 'react-toastify'

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

describe('Home page', () => {
  function renderApp(props = {}) {
    return render(
      <Redux.Provider store={store}>
        <Router.MemoryRouter>
          <Home {...props} />
        </Router.MemoryRouter>
      </Redux.Provider>
    )
  }

  it('should be able to show loading cards', () => {
    const { getAllByTestId } = renderApp()
    const cards = getAllByTestId('character-load-card')

    expect(cards.length).toBe(28)
  })

  it('should be able to call load characters function', () => {
    renderApp()
    expect(mockDispatch).toHaveBeenCalledWith(loadAllCharactersRequest(1))
  })

  it('should be able to load characters if in another page', () => {
    const locationMock = jest
      .spyOn(Router, 'useLocation')
      .mockImplementation(() => ({
        hash: '',
        pathname: '/',
        search: '?page=3',
        state: ''
      }))
    renderApp()
    expect(mockDispatch).toHaveBeenCalledWith(loadAllCharactersRequest(3))
    locationMock.mockRestore()
  })

  it('should be able to move to home on logo click and load characters if not in page 1', async () => {
    const reduxState = {
      ...store.getState().characters,
      page: 3
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => reduxState)
    const { getByTestId } = renderApp()

    const logo = getByTestId('app-logo')
    fireEvent.click(logo)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/')
      expect(mockDispatch).toHaveBeenCalledWith(loadAllCharactersRequest(1))
    })
  })

  it('should throw an error if load fail', () => {
    const reduxState = {
      ...store.getState().characters,
      loadError: true
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => reduxState)
    renderApp()

    const toastError = jest.spyOn(toast, 'error')
    expect(toastError).toHaveBeenCalledWith(
      'Falha ao carregar os personagens, tente mais tarde',
      {
        toastId: 'loadError'
      }
    )
  })
})
