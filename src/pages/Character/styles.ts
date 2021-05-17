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
      height: 40px;
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

export const CharacterInfo = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding-top: 20px;
  position: relative;
  width: 100%;

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
    position: relative;
    margin-top: 40px;
    width: 100%;
    padding-bottom: 30px;

    .editBtn {
      position: absolute;
      left: 0;
      top: -30px;

      background: transparent;
      border: medium none;
      color: #737987;
      display: flex;
      align-items: center;
      transition: all 0.4s ease;
      border-radius: 4px;
      padding: 4px 5px;

      svg {
        margin-left: 7px;
      }

      &:hover {
        background: #737987;
        color: #fff;
      }
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

    .description {
      display: block;
      font-size: 17px;
      font-weight: 500;
      line-height: 20px;
      max-width: 50vw;
    }
  }

  .info h1 {
    color: #fff;
    font-size: 32px;
    font-family: 'Roboto Condensed', sans-serif;
    text-transform: uppercase;
  }

  .nameInpt {
    > label > div {
      background: transparent;
      border: medium none;
      border: 2px dashed #737987;
      height: 40px;

      input {
        color: #fff;
        font-family: 'Roboto Condensed', sans-serif;
        text-transform: uppercase;
      }
    }
    + .textarea-container {
      margin-top: 20px;
    }
  }

  .textarea-container {
    border: 2px dashed #737987;
    min-height: 145px;
    display: flex;
    align-items: flex-start;

    textarea {
      min-height: 100%;
      color: #fff;
      font-family: 'Roboto', sans-serif;
    }
  }

  .editAction {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: medium none;
      border-radius: 4px;
      transition: all 0.4s;
      font-weight: 600;
      padding: 4px 5px;
      text-transform: uppercase;

      + button {
        margin-left: 7px;
      }
    }

    .cancel {
      color: rgb(243, 20, 49);

      &:hover {
        color: #fff;
        background: rgb(243, 20, 49);
      }
    }

    .submit {
      color: #2dce89;

      &:hover {
        color: #fff;
        background: #2dce89;
      }
    }
  }
`

export const Series = styled.section`
  margin-top: 50px;

  h1 {
    font-family: 'Roboto Condensed', sans-serif;
    text-transform: uppercase;
    letter-spacing: 4px;
    font-weight: 500;
    color: #fff;
  }
`
