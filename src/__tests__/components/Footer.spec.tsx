import { render } from '@testing-library/react'

import Footer from 'components/Footer'

describe('Footer component', () => {
  it('should be able to show the marvel copyright', () => {
    const { getByTestId } = render(<Footer />)

    expect(getByTestId('copyright')).toBeTruthy()
  })
})
