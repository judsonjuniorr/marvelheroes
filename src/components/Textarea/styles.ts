import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  isReadOnly: boolean
}

export const Container = styled.label<ContainerProps>`
  background: transparent;
  border-radius: 5px;
  padding: 8px 12px;
  width: 100%;
  cursor: text;
  position: relative;
  font-weight: 400;
  min-height: 41px;

  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.3);

  display: flex;
  align-items: center;
  transition: all 0.3s ease-in;

  & + div {
    margin-top: 8px;
  }

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: #fff;
    transition: color 0.3s ease-in, background 0.3s ease-in;
    max-width: 100%;
    font-weight: 400;
    resize: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3) !important;
    }
  }

  svg {
    margin-right: 16px;
    min-height: 20px;
    min-width: 20px;
    max-height: 20px;
    max-width: 20px;
  }

  ${props =>
    props.isFilled &&
    css`
      border-color: rgba(42, 117, 179, 0.4);
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: rgba(255, 255, 255, 0.4);
    `}

  ${props =>
    props.isReadOnly &&
    css`
      filter: grayscale(1);
      pointer-events: none;
    `}

${props =>
    props.isErrored &&
    css`
      border-color: rgba(243, 20, 49, 0.4);
    `}
`

export const Error = styled.div`
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
