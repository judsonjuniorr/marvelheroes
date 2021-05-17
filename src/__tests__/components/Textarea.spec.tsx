import { render, fireEvent, waitFor } from '@testing-library/react'
import Unform from '@unform/core'

import Textarea from 'components/Textarea'

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'description',
        defaultValue: '',
        error: '',
        registerField: jest.fn()
      }
    }
  }
})

describe('Textarea component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Textarea name="description" placeholder="Descrição" />
    )

    expect(getByPlaceholderText('Descrição')).toBeTruthy()
  })

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Textarea name="description" placeholder="Descrição" />
    )

    const inputElement = getByPlaceholderText('Descrição')
    const containerElement = getByTestId('textarea-container')

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
      <Textarea name="description" placeholder="Descrição" />
    )

    const inputElement = getByPlaceholderText('Descrição')
    const containerElement = getByTestId('textarea-container')

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
      fieldName: 'description',
      defaultValue: 'meu@description.com',
      error: '',
      registerField: jest.fn(),
      clearError: jest.fn()
    }))

    const { getByTestId } = render(
      <Textarea name="description" placeholder="Descrição" />
    )

    const containerElement = getByTestId('textarea-container')

    await waitFor(() => {
      expect(containerElement).toHaveStyle(
        'border-color: rgba(42,117,179,0.4);'
      )
    })
  })

  it('should show error message', async () => {
    jest.spyOn(Unform, 'useField').mockImplementation(() => ({
      fieldName: 'description',
      defaultValue: 'meu@description.com',
      error: 'description invalido',
      registerField: jest.fn(),
      clearError: jest.fn()
    }))

    const { getByText } = render(
      <Textarea name="description" placeholder="Descrição" />
    )
    const containerElement = getByText('description invalido')

    await waitFor(() => {
      expect(containerElement).toBeDefined()
    })
  })
})
