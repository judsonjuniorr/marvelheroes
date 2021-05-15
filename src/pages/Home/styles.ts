import styled, { keyframes } from 'styled-components'
import Breakpoints from 'styles/breakpoints'

const captainwwAnimation = keyframes`
  from {
    transform: translate(100%, 100%);
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
`

const spiderAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  75% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(-5%);
    opacity: 1;
  }
`

const ironManAnimation = keyframes`
  to { opacity: 1; }
`

const greenLanternAnimation = keyframes`
  from {
    transform: translateX(10vw) scaleX(-1);
  }
  to {
    opacity: 0.9;
    transform: scaleX(-1);
  }
`

const superManAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Main = styled.header`
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
    background-image: linear-gradient(45deg, #000000 0%, #2c3e50 74%);
    z-index: -1;
  }

  .character {
    position: absolute;
    user-select: none;
    pointer-events: none;
    bottom: 0;
    z-index: -1;
    transition: all 0.6s;
    opacity: 0;

    &.superman {
      max-width: 26vw;
      max-height: 90%;
      animation-name: ${superManAnimation};
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }

    &.greenlantern {
      bottom: 15px;
      max-width: 8vw;
      max-height: 55%;
      transform: translateX(10vw) scaleX(-1);
      left: 27vw;
      animation-name: ${greenLanternAnimation};
      animation-duration: 2s;
      animation-fill-mode: forwards;
    }

    &.ironman {
      left: 40vw;
      max-width: 15vw;
      margin: auto;
      max-height: 75%;
      transform: scaleX(-1);
      animation-name: ${ironManAnimation};
      animation-duration: 3s;
      animation-fill-mode: forwards;
    }

    &.captainww {
      right: 0;
      max-width: 35vw;
      max-height: 95%;
      animation-name: ${captainwwAnimation};
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }

    &.spiderman {
      top: -10%;
      right: 35vw;
      max-width: 10vw;
      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1)
      );
      animation-name: ${spiderAnimation};
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
  }

  .wave {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -40px;
    margin: auto;
    min-width: 100vw;
    transform: scaleY(-1);
    user-select: none;
    pointer-events: none;
  }

  ${Breakpoints.mdDown} {
    .character {
      &.superman {
        max-width: 35vw;
      }
      &.captainww {
        max-width: 40vw;
      }
      &.ironman {
        max-width: 20vw;
        left: 38vw;
      }

      &.greenlantern {
        opacity: 0 !important;
      }
      &.spiderman {
        top: 0;
        right: 5vw;
        max-width: 15vw;
      }
    }
  }

  ${Breakpoints.smDown} {
    min-height: 450px;
    .character {
      &.ironman {
        opacity: 0 !important;
      }
      &.superman {
        max-width: 40vw;
      }
      &.captainww {
        max-width: 55vw;
      }
    }
  }
`

export const Logo = styled.img`
  display: flex;
  flex-direction: column;
  max-height: 150px;
  height: 100%;
  width: 100%;
  max-width: 255px;
  margin: 0 auto;
  cursor: pointer;

  ${Breakpoints.md} {
    margin-left: 26vw;
  }
  ${Breakpoints.smDown} {
    max-width: 70%;
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
