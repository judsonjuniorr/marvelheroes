import { render } from '@testing-library/react'

import Wrapper from 'components/Wrapper'

describe('Wrapper component', () => {
  it('should be able render element children on wrapper', () => {
    const { getByTestId } = render(
      <Wrapper>
        <div data-testid="children">children</div>
      </Wrapper>
    )

    expect(getByTestId('children')).toBeTruthy()
  })
})
