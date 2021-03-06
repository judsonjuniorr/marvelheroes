import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'
import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import * as S from './styles'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  containerStyle?: React.CSSProperties
  alwaysFocus?: boolean
}

const InputComponent: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  readOnly,
  alwaysFocus = false,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
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
    <S.Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused || alwaysFocus}
      isReadOnly={!!readOnly}
      className="input-label"
    >
      <S.InputContainer data-testid="input-container">
        <input
          data-testid="input-component"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          readOnly={readOnly}
          disabled={readOnly}
          {...rest}
        />
      </S.InputContainer>

      {error && (
        <S.Error>
          <FiAlertCircle size={16} />
          {error}
        </S.Error>
      )}
    </S.Container>
  )
}

export default InputComponent
