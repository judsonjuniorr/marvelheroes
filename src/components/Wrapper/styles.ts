import styled from 'styled-components'
import breakpoints from 'styles/breakpoints'

export const Container = styled.div`
  width: 100%;
  max-width: 95%;
  margin: 0 auto;

  ${breakpoints.smOnly} {
    max-width: 540px;
  }
  ${breakpoints.mdOnly} {
    max-width: 720px;
    margin: 0 2%;
  }
  ${breakpoints.lg} {
    max-width: 960px;
  }
  ${breakpoints.xl} {
    max-width: 1140px;
  }
`
