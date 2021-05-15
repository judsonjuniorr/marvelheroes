import Wrapper from 'components/Wrapper'
import styled from 'styled-components'

export const Header = styled.header`
  margin-bottom: 30px;
  background: #1b212d;
  position: relative;
  overflow: hidden;
  padding-bottom: 30px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 250px;
    padding: 20px 0;

    img {
      height: 50px;
    }

    h2 {
      font-weight: 500;
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      color: #b3bdd3;
      text-align: center;

      small {
        font-size: 14px;
        color: #737987;
      }
    }
  }

  .wave {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -50px;
    margin: auto;
    min-width: 100vw;
    transform: scaleY(-1);
    user-select: none;
    pointer-events: none;
  }
`

export const Content = styled(Wrapper)`
  > strong {
    font-family: 'Roboto Condensed', sans-serif;
    color: #b3bdd3;
    font-size: 20px;
    display: flex;
    margin-top: 30px;
  }

  ul {
    margin-top: 15px;
    padding: 0 20px;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 20px;
  }
`
