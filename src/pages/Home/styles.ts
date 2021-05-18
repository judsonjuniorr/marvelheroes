import styled, { css, keyframes } from 'styled-components'
import Breakpoints from 'styles/breakpoints'

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

interface IMainProps {
  wallpIdx: number
}

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const wallp: { [key: number]: any } = {
  1: css`
    &.blackPhanter {
      animation: ${fadeIn} 0.5s ease-in forwards;
    }
  `,
  2: css`
    &.deadPool {
      animation: ${fadeIn} 0.5s ease-in forwards;
    }
  `,
  3: css`
    &.antMan {
      animation: ${fadeIn} 0.5s ease-in forwards;
    }
  `,
  4: css`
    &.venom {
      animation: ${fadeIn} 0.5s ease-in forwards;
    }
  `,
  5: css`
    &.groot {
      animation: ${fadeIn} 0.5s ease-in forwards;
    }
  `
}

export const Main = styled.header<IMainProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: max(60vh, 530px);
  overflow: hidden;
  padding-top: 30px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #000000;
    background-image: linear-gradient(45deg, #000000 35%, #1c2833 80%);
    z-index: -1;
  }

  .character {
    position: absolute;
    user-select: none;
    pointer-events: none;
    bottom: 0;
    top: 0;
    left: 5vw;
    margin: auto;
    max-height: 100%;
    z-index: -1;
    transition: all 0.2s;
    mask-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 1) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    opacity: 0;

    ${({ wallpIdx }) => wallp[wallpIdx]}

    ${Breakpoints.lgDown} {
      max-height: 500px;
      max-width: 80%;
      right: 0;
      top: 200px;
    }
  }

  .wave {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 100vw;
    transform: scaleY(-1);
    user-select: none;
    pointer-events: none;
  }
`

export const Logo = styled.div`
  max-width: 30vw;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  transition: all 0.3s ease;

  a {
    img {
      max-height: 150px;
      height: 100%;
      width: 100%;
      max-width: 250px;
      cursor: pointer;
    }
  }
  > form {
    margin-top: 30px;
    width: 400px;
    max-width: 100%;
    input {
      text-align: center;
    }

    .input-label > div {
      border-color: rgba(255, 255, 255, 0.4);
    }
  }

  ${Breakpoints.smDown} {
    max-width: 80%;
  }

  ${Breakpoints.lg} {
    align-self: flex-end;
    align-items: flex-end;
    margin-right: 6vw;
    margin-top: 50px;

    a,
    > form {
      align-self: flex-end;

      img {
        max-height: 250px;
      }
      input {
        text-align: left;
      }
    }
  }
`

export const Content = styled.div`
  padding-top: 50px;
  padding-bottom: 70px;
  height: 100%;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Section = styled.section`
  + section {
    margin-top: 30px;
  }

  > strong {
    font-family: 'Roboto Condensed', sans-serif;
    color: #b3bdd3;
    font-size: 20px;
    display: flex;
  }
  small {
    color: #737987;
    margin-left: 10px;
  }
`
