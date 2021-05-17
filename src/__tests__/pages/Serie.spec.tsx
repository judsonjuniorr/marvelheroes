import 'jest-canvas-mock'
import { render, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import Router from 'react-router-dom'
import * as Redux from 'react-redux'

import store from 'store'
import Serie from 'pages/Serie'
import { serieInfoRequest } from 'store/modules/series/actions/serieInfo'

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

const apiResponse = {
  code: 200,
  status: 'Ok',
  copyright: '© 2021 MARVEL',
  attributionText: 'Data provided by Marvel. © 2021 MARVEL',
  attributionHTML:
    '<a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>',
  etag: 'b6ddd2c84d394b0bb3169899d0c30fb98b3fa3b9',
  data: {
    offset: 0,
    limit: 20,
    total: 1,
    count: 1,
    results: [
      {
        id: 16450,
        title: 'A+X (2012 - 2014)',
        description:
          "Get ready for action-packed stories featuring team-ups from your favorite Marvel heroes every month! First, a story where Wolverine and Hulk come together, and then Captain America and Cable meet up! But will each partner's combined strength be enough?",
        startYear: 2012,
        endYear: 2014,
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/5/d0/511e88a20ae34',
          extension: 'jpg'
        },
        characters: {
          available: 37
        }
      }
    ]
  }
}

describe('Serie page', () => {
  const serieID = '16450'
  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockImplementation(() => ({ id: serieID }))
    jest.spyOn(Router, 'useLocation').mockImplementation(() => ({
      hash: '',
      pathname: `/serie/${serieID}`,
      search: '',
      state: ''
    }))
  })

  function renderApp(props = {}) {
    return render(
      <Redux.Provider store={store}>
        <Router.MemoryRouter>
          <Serie {...props} />
        </Router.MemoryRouter>
      </Redux.Provider>
    )
  }

  it('should show loading animation before showing info', () => {
    const { getByTestId } = renderApp()

    expect(getByTestId('loading-anim')).toBeTruthy()
  })

  it('should show error and redirect on info request fail', async () => {
    const reduxState = {
      ...store.getState().series,
      loadError: true
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => reduxState)
    const toastError = jest.spyOn(toast, 'error')
    renderApp()
    expect(mockDispatch).toHaveBeenCalledWith(serieInfoRequest('16450'))

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/')
      expect(toastError).toHaveBeenCalledWith(
        'Falha ao buscar sua serie, tente mais tarde'
      )
    })
  })

  it('should show error and redirect if no result is found', async () => {
    const reduxState = {
      ...store.getState().series,
      loadError: true,
      noInfo: true
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => reduxState)
    const toastError = jest.spyOn(toast, 'warn')
    renderApp()
    expect(mockDispatch).toHaveBeenCalledWith(serieInfoRequest('16450'))

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/')
      expect(toastError).toHaveBeenCalledWith(
        'Nenhuma serie encontrada para esse ID'
      )
    })
  })

  it('should load serie info', async () => {
    const serieResult = apiResponse.data.results[0]
    const serieInfo = {
      title: serieResult.title.split(' (')[0],
      description: serieResult.description,
      startYear: serieResult.startYear,
      endYear: serieResult.endYear,
      thumbnail: serieResult.thumbnail,
      characters: serieResult.characters.available
    }
    const reduxState = {
      ...store.getState().series,
      loading: false,
      loadError: false,
      noInfo: false,
      serieInfo
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => reduxState)

    const { getByText } = renderApp()
    expect(mockDispatch).toHaveBeenCalledWith(serieInfoRequest('16450'))

    expect(getByText(serieInfo.title)).toBeTruthy()
    expect(getByText(serieInfo.description)).toBeTruthy()
  })

  it('should show only one year if start and end is equal', async () => {
    const serieResult = apiResponse.data.results[0]
    const serieInfo = {
      title: serieResult.title.split(' (')[0],
      description: serieResult.description,
      startYear: serieResult.startYear,
      endYear: serieResult.startYear,
      thumbnail: serieResult.thumbnail,
      characters: serieResult.characters.available
    }
    const reduxState = {
      ...store.getState().series,
      loading: false,
      loadError: false,
      noInfo: false,
      serieInfo
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => reduxState)

    const { getByText } = renderApp()
    expect(mockDispatch).toHaveBeenCalledWith(serieInfoRequest('16450'))

    expect(getByText(serieResult.startYear)).toBeTruthy()
  })

  it('should show a dot if endYear is not provided', async () => {
    const serieResult = apiResponse.data.results[0]
    const serieInfo = {
      title: serieResult.title.split(' (')[0],
      description: serieResult.description,
      startYear: serieResult.startYear,
      endYear: null,
      thumbnail: serieResult.thumbnail,
      characters: serieResult.characters.available
    }
    const reduxState = {
      ...store.getState().series,
      loading: false,
      loadError: false,
      noInfo: false,
      serieInfo
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => reduxState)

    const { getByText } = renderApp()
    expect(mockDispatch).toHaveBeenCalledWith(serieInfoRequest('16450'))

    expect(getByText(`${serieResult.startYear} - .`)).toBeTruthy()
  })
})
