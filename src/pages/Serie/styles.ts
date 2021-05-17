import styled, { keyframes } from 'styled-components'

import Wrapper from 'components/Wrapper'
import Breakpoints from 'styles/breakpoints'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const Header = styled(Wrapper)`
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 10px;

  a {
    display: flex;
    img {
      height: 30px;

      ${Breakpoints.md} {
        height: 40px;
      }
    }
  }

  ${Breakpoints.smDown} {
    .input-label {
      max-width: 150px;
    }
  }
`

export const Loading = styled(Wrapper)`
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 175px);

  span {
    color: #737987;
    font-size: 13px;

    strong {
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      text-transform: uppercase;
    }
  }
`

export const Content = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 1.3s forwards;
  min-height: calc(100vh - 75px);
  padding-bottom: 40px;
`

export const SerieInfo = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding-top: 20px;

  ${Breakpoints.md} {
    flex-direction: row;
  }

  .thumbnail {
    padding: 20px;

    ${Breakpoints.mdDown} {
      margin: 0 auto;
    }

    ${Breakpoints.md} {
      margin-right: 20px;
    }
  }

  .info {
    margin-top: 40px;

    h1 {
      font-family: 'Roboto Condensed', sans-serif;
      text-transform: uppercase;
      color: #fff;
      font-size: 32px;
    }

    .series {
      display: block;
      margin: 10px 0;
      color: #737987;

      strong {
        color: #2a75b3;
        margin-right: 3px;
      }
    }

    .year {
      display: flex;
      font-weight: 500;
      margin: 5px 0;
      font-family: 'Roboto Condensed', sans-serif;
      color: #b3bdd3;
    }

    .description {
      display: block;
      font-size: 17px;
      font-weight: 500;
      line-height: 20px;
      width: 100%;

      ${Breakpoints.md} {
        max-width: 50vw;
      }
    }
  }
`

export const Characters = styled.section`
  margin-top: 50px;

  h1 {
    font-family: 'Roboto Condensed', sans-serif;
    text-transform: uppercase;
    letter-spacing: 4px;
    font-weight: 500;
    color: #fff;
  }
`
