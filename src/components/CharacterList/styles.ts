import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const CharacterList = styled.ul`
  margin-top: 15px;
  padding: 0 20px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
`

export const CharacterItem = styled.li`
  height: 225px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  transition: all 0.4s;
  filter: grayscale(0.6);
  position: relative;

  > a {
    height: 100%;
  }

  .lazyload-wrapper {
    overflow: hidden;
    height: 100%;
  }

  .thumbnail {
    width: 100%;
    object-fit: cover;

    &.skeleton-load {
      height: 100%;
    }
  }

  .description {
    position: absolute;
    top: calc(100% - 75px);
    bottom: 0;
    right: 0;
    left: 0;
    width: calc(100% + 2px);
    padding: 8px 10px;
    min-height: 75px;
    font-size: 14px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    transition: all 0.2s;
    z-index: 1;

    .name {
      z-index: 2;
      color: #b3bdd3;
      font-weight: 500;

      &.skeleton-load {
        height: 1em;
        width: 90%;
        display: block;
      }
    }

    .series {
      color: #737987;

      &.skeleton-load {
        height: 1em;
        width: 60%;
        margin-top: 3px;
        display: block;
      }

      strong {
        color: #2a75b3;
      }
    }
  }

  &:hover {
    filter: grayscale(0);
    transform: scale(1.1);
    z-index: 10;

    .description {
      background: rgba(0, 0, 0, 1);
      left: 0;
      top: 100%;
      right: 0;
      pointer-events: none;
      border-left-color: transparent;
      backface-visibility: hidden;
      transform: translateZ(0);
      backdrop-filter: blur(0);
      min-height: fit-content;

      .name,
      .series {
        color: #fff;
      }
    }
  }

  &.pageAction {
    border-radius: 5px;

    > a {
      background: rgba(0, 0, 0, 0.4);
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
      border-radius: 5px;
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

    .pages {
      font-size: 13px;
    }
  }
`
