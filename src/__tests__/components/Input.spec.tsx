import { render, fireEvent, waitFor } from '@testing-library/react'
import Unform from '@unform/core'

import Input from 'components/Input'

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn()
      }
    }
  }
})

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    )

    expect(getByPlaceholderText('E-mail')).toBeTruthy()
  })

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    )

    const inputElement = getByPlaceholderText('E-mail')
    const containerElement = getByTestId('input-container')

    fireEvent.focus(inputElement)

    await waitFor(() => {
      expect(containerElement).toHaveStyle(
        'border-color: rgba(255,255,255,0.4);'
      )
    })

    fireEvent.blur(inputElement)

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle(
        'border-color: rgba(255,255,255,0.4);'
      )
    })
  })

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    )

    const inputElement = getByPlaceholderText('E-mail')
    const containerElement = getByTestId('input-container')

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com.br' }
    })

    fireEvent.blur(inputElement)

    await waitFor(() => {
      expect(containerElement).toHaveStyle(
        'border-color: rgba(42,117,179,0.4);'
      )
    })
  })

  it('should set filled if has default value', async () => {
    jest.spyOn(Unform, 'useField').mockImplementation(() => ({
      fieldName: 'email',
      defaultValue: 'meu@email.com',
      error: '',
      registerField: jest.fn(),
      clearError: jest.fn()
    }))

    const { getByTestId } = render(<Input name="email" placeholder="E-mail" />)

    const containerElement = getByTestId('input-container')

    await waitFor(() => {
      expect(containerElement).toHaveStyle(
        'border-color: rgba(42,117,179,0.4);'
      )
    })
  })

  it('should show error message', async () => {
    jest.spyOn(Unform, 'useField').mockImplementation(() => ({
      fieldName: 'email',
      defaultValue: 'meu@email.com',
      error: 'Email invalido',
      registerField: jest.fn(),
      clearError: jest.fn()
    }))

    const { getByText } = render(<Input name="email" placeholder="E-mail" />)
    const containerElement = getByText('Email invalido')

    await waitFor(() => {
      expect(containerElement).toBeDefined()
    })
  })
})
