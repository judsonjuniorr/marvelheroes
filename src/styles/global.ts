import { createGlobalStyle } from 'styled-components'

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
`
