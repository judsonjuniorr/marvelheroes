import styled, { keyframes } from 'styled-components'

import Wrapper from 'components/Wrapper'

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
      height: 50px;
    }
  }
`

export const Loading = styled(Wrapper)`
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 75px);

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

export const CharacterInfo = styled.section`
  display: flex;
  margin-top: 20px;
  padding-top: 20px;

  .thumbnail {
    padding: 20px;
    margin-right: 20px;
  }

  .info {
    margin-top: 40px;

    h1 {
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

    .description {
      display: block;
      font-size: 17px;
      font-weight: 500;
      line-height: 20px;
      max-width: 50vw;
    }
  }
`

export const Series = styled.section`
  margin-top: 50px;

  h1 {
    text-transform: uppercase;
    letter-spacing: 4px;
    font-weight: 500;
    color: #fff;
  }

  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 30px;
    margin-top: 20px;
  }
`

export const SerieInfo = styled.li`
  .cover {
    display: block;
    position: relative;
    width: 100%;

    img {
      width: 100%;
      object-fit: cover;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      display: block;
    }

    strong {
      display: flex;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 5px 10px;
      border-top-right-radius: 5px;
      background: rgba(0, 0, 0, 0.9);
      color: #737987;
      transition: all 0.4s ease;
      font-weight: 500;
    }
  }

  .moreInfo {
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;
    transition: all 0.4s ease;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;

    .year {
      display: block;
      margin-top: 3px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .details {
      display: inline-block;
      text-decoration: none;
      color: #737987;
      padding: 3px 7px;
      border-radius: 3px;
      transition: all 0.2s;

      &:hover {
        background: #b3bdd3;
        color: #000;
      }
    }
  }

  &:hover {
    .cover strong,
    .moreInfo {
      background: #000;
      color: #fff;
    }
    .year,
    .details {
      color: #b3bdd3;
    }
  }
`
