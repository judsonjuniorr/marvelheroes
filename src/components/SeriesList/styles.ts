import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Listing = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 30px;
  margin-top: 20px;
`

export const MovePage = styled.li`
  width: 100%;
  min-height: 195px;
  height: 100%;

  > a {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 7px;
    height: 100%;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    color: #737987;
    border: none;
    transition: all 0.4s ease;
    text-decoration: none;
  }

  .pages {
    font-size: 13px;
  }

  .iconWrapper {
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      transition: all 0.15s;
    }

    svg.hover {
      width: 0;
    }

    .loading {
      animation: ${rotate} 2s linear infinite;
    }
  }

  &:hover > a {
    background: rgba(0, 0, 0, 1);
    cursor: pointer;
    color: #b3bdd3;

    svg:not(.hover):not(.loading) {
      width: 0;
    }
    svg.hover {
      width: inherit;
    }
  }
`

export const SerieInfo = styled.li`
  .cover {
    display: block;
    position: relative;
    width: 100%;
    min-height: 195px;
    background: #222;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;

    img {
      width: 100%;
      height: 100%;
      object-position: center;
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

      &.skeleton-load {
        height: 1em;
        width: 120px;
      }
    }

    .details {
      display: inline-block;
      text-decoration: none;
      color: #737987;
      padding: 3px 7px;
      border-radius: 3px;
      transition: all 0.2s;

      &.skeleton-load {
        height: 1em;
        width: 70px;
      }

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
