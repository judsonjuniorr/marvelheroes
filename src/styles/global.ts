import { createGlobalStyle, keyframes } from 'styled-components'

const skeletonLoad = keyframes`
  from { left: -150px; }
  to { left: 100%; }
`

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, html, #root  { min-height: 100vh; }

  body {
    font-family: 'Roboto', 'Oxygen', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #121620;
    color: #535761;
  }

  #root {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow-x: hidden;

    > * {
      width: 100%;
    }
  }

  h1, h2, h3, h4, h5, h6, strong { font-weight: 600; }
  button { cursor: pointer; }

  .skeleton-load {
    position: relative;
    overflow: hidden;
    background-color: #222;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: -150px;
      top: 0;
      height: 100%;
      width: 150px;
      background: linear-gradient(to right, transparent 0%, #444 50%, transparent 100%);
      animation: ${skeletonLoad} 2s infinite;
    }
  }
`
