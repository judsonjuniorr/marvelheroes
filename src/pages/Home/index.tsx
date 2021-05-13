import useDocumentTitle from 'helpers/useDocumentTitle'

import Wrapper from 'components/Wrapper'

import wave from 'assets/wave.svg'
import logo from 'assets/logo.svg'
import superMan from 'assets/super-man.png'
import greenLantern from 'assets/green-lantern.png'
import ironMan from 'assets/iron-man.png'
import captainWonderWoman from 'assets/captain-and-wonder-woman.png'
import spiderMan from 'assets/spider-man.png'

import * as S from './styles'

const Home: React.FC = () => {
  useDocumentTitle()

  return (
    <S.Wrapper>
      <S.Main>
        <S.Logo src={logo} alt="MARVEL HEROES" />

        <img src={superMan} alt="" className="character superman" />
        <img src={greenLantern} alt="" className="character greenlantern" />
        <img src={ironMan} alt="" className="character ironman" />
        <img src={captainWonderWoman} alt="" className="character captainww" />
        <img src={spiderMan} alt="" className="character spiderman" />
        <img src={wave} alt="" className="wave" />
      </S.Main>
      <S.Content>
        <Wrapper>content</Wrapper>
      </S.Content>
    </S.Wrapper>
  )
}

export default Home
