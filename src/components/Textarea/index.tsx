import {
  useEffect,
  useRef,
  useState,
  useCallback,
  TextareaHTMLAttributes
} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { FiAlertCircle } from 'react-icons/fi'

import { useField } from '@unform/core'

import { Container, Error } from './styles'

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  containerStyle?: React.CSSProperties
}

const TextAreaComponent: React.FC<TextAreaProps> = ({
  name,
  containerStyle = {},
  placeholder,
  readOnly
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setisFilled] = useState(false)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocus = useCallback(() => setIsFocused(true), [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setisFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    if (defaultValue) setisFilled(!!inputRef.current?.value)
  }, [defaultValue])

  useEffect(() => {
    /* istanbul ignore next */
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue: (ref: any, value: any) => {
        // eslint-disable-next-line no-param-reassign
        ref.value = value
        if (value?.length > 0) setisFilled(true)
      }
    })
  }, [fieldName, registerField])

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input-container"
      isReadOnly={!!readOnly}
      className="textarea-container"
    >
      <TextareaAutosize
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={7}
      />

      {error && (
        <Error>
          <FiAlertCircle size={16} />
          {error}
        </Error>
      )}
    </Container>
  )
}
export default TextAreaComponent
