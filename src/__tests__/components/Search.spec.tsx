import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as Redux from 'react-redux'

import store from 'store'
import Search from 'components/Search'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

describe('Search component', () => {
  function renderApp(props = {}) {
    return render(
      <Redux.Provider store={store}>
        <MemoryRouter>
          <Search {...props} />
        </MemoryRouter>
      </Redux.Provider>
    )
  }

  it('should be able to search for a character', async () => {
    const { getByTestId } = renderApp()
    const searchValue = 'spider'

    const searchField = getByTestId('search-input')
    fireEvent.change(searchField, { target: { value: searchValue } })

    const searchForm = getByTestId('search-form')
    fireEvent.submit(searchForm)

    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/search',
        search: `?query=${searchValue}`
      })
    )
  })
})
