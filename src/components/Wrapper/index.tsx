import * as S from './styles'

const Wrapper: React.FC = ({ children, ...rest }) => {
  return <S.Container {...rest}>{children}</S.Container>
}

export default Wrapper
