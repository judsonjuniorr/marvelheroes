import 'jest-canvas-mock'
import { render } from '@testing-library/react'
import Router from 'react-router-dom'
import * as Redux from 'react-redux'

import store from 'store'
import SeriesList from 'components/SeriesList'

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

describe('Series list component', () => {
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
          <SeriesList {...props} />
        </Router.MemoryRouter>
      </Redux.Provider>
    )
  }

  it('should be able to show loading cards', () => {
    const { getAllByTestId } = renderApp()
    const cards = getAllByTestId('serie-load-card')

    expect(cards.length).toBe(28)
  })

  it('should show previous page card if page is higher than 1', () => {
    const stateWithError = {
      ...store.getState().series,
      loading: false,
      page: 2
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithError)
    const { getByTestId } = renderApp()

    expect(getByTestId('prevPage')).toBeTruthy()
  })

  it('should show next page card if has more than 1 page', () => {
    const stateWithError = {
      ...store.getState().series,
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
      ...store.getState().series,
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
      ...store.getState().series,
      loading: true,
      page: 2,
      maxPages: 3
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithError)
    const { queryAllByTestId } = renderApp()

    expect(queryAllByTestId('loading-spinner').length).toBe(2)
  })

  it('should show series list and hide loading skeleton', () => {
    const series = [
      {
        id: 1945,
        title: 'Avengers: The Initiative',
        description: null,
        startYear: 2007,
        endYear: 2010,
        rating: 'T',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/514a2ed3302f5',
          extension: 'jpg'
        }
      },
      {
        id: 2005,
        title: 'Deadpool',
        description:
          "Wade Wilson: Heartless Merc With a Mouth or...hero? Laugh, cry and applaud at full volume for the mind-bending adventures of Deadpool, exploring the psyche and crazed adventures of Marvel's most unstable personality!",
        startYear: 1997,
        endYear: 2002,
        rating: '',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/7/03/5130f646465e3',
          extension: 'jpg'
        }
      },
      {
        id: 2045,
        title: 'Marvel Premiere',
        description: null,
        startYear: 1972,
        endYear: 1981,
        rating: '',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/4/40/5a98437953d4e',
          extension: 'jpg'
        }
      }
    ]
    const stateWithError = {
      ...store.getState().series,
      series,
      loading: false,
      page: 1,
      maxPages: 1
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithError)
    const { queryAllByTestId } = renderApp()

    expect(queryAllByTestId('serie-load-card')).toEqual([])
    expect(queryAllByTestId('serie-card').length).toBe(3)
  })
  it('should show only one year if start and end is equal', async () => {
    const series = [
      {
        id: 1945,
        title: 'Avengers: The Initiative',
        description: null,
        startYear: 2007,
        endYear: 2007,
        rating: 'T',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/514a2ed3302f5',
          extension: 'jpg'
        }
      },
      {
        id: 2005,
        title: 'Deadpool',
        description:
          "Wade Wilson: Heartless Merc With a Mouth or...hero? Laugh, cry and applaud at full volume for the mind-bending adventures of Deadpool, exploring the psyche and crazed adventures of Marvel's most unstable personality!",
        startYear: 1997,
        endYear: null,
        rating: '',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/7/03/5130f646465e3',
          extension: 'jpg'
        }
      },
      {
        id: 2045,
        title: 'Marvel Premiere',
        description: null,
        startYear: 1972,
        endYear: 1981,
        rating: '',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/4/40/5a98437953d4e',
          extension: 'jpg'
        }
      }
    ]
    const stateWithError = {
      ...store.getState().series,
      series,
      loading: false,
      page: 1,
      maxPages: 1
    }
    jest.spyOn(Redux, 'useSelector').mockImplementation(() => stateWithError)

    const { getByText } = renderApp()

    expect(getByText('2007')).toBeTruthy()
    expect(getByText('1997 - .')).toBeTruthy()
  })
})
