import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  isReadOnly: boolean
}

export const InputContainer = styled.div`
  height: 40px;
  padding: 0 10px;
  background: #1b212d;
  border-radius: 7px;
  border: 1px solid transparent;
  transition: all 0.4s;

  input {
    height: 100%;
    width: 100%;
    background: transparent;
    border: medium none;
    color: #fff;
    line-height: 40px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }
`

export const Container = styled.label<ContainerProps>`
  display: block;

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      ${InputContainer} {
        filter: grayscale(1);
        pointer-events: none;
      }
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      ${InputContainer} {
        border-color: rgba(255, 255, 255, 0.4);
      }
    `}
  ${({ isFilled }) =>
    isFilled &&
    css`
      ${InputContainer} {
        border-color: rgba(42, 117, 179, 0.4);
      }
    `}
  ${({ isErrored }) =>
    isErrored &&
    css`
      ${InputContainer} {
        border-color: rgba(243, 20, 49, 0.4);
      }
    `}
`

export const Error = styled.small`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5px;
  color: rgb(243, 20, 49);
  user-select: none;

  svg {
    margin-right: 5px;
  }
`
