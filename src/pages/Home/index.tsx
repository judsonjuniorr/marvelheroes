import logo from 'assets/logo.svg'

import * as S from './styles'

const Home: React.FC = () => {
  return (
    <S.App>
      <S.AppHeader>
        <S.AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <S.AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </S.AppLink>
      </S.AppHeader>
    </S.App>
  )
}

export default Home
