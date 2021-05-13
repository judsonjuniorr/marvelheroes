import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import useDocumentTitle from 'helpers/useDocumentTitle'

import { IState } from 'store'
import { ICharactersState } from 'store/modules/characters/types'
import { loadAllCharactersRequest } from 'store/modules/characters/actions/loadAllCharacters'

import Wrapper from 'components/Wrapper'

import wave from 'assets/wave.svg'
import logo from 'assets/logo.svg'
import ironMan from 'assets/iron-man.png'
import superMan from 'assets/super-man.png'
import spiderMan from 'assets/spider-man.png'
import greenLantern from 'assets/green-lantern.png'
import captainWonderWoman from 'assets/captain-and-wonder-woman.png'

import * as S from './styles'

const Home: React.FC = () => {
  useDocumentTitle()
  const dispatch = useDispatch()
  const { loadError, total } = useSelector<IState, ICharactersState>(
    state => state.characters
  )

  useEffect(() => {
    dispatch(loadAllCharactersRequest(1))
  }, [dispatch])

  useEffect(() => {
    if (loadError && !toast.isActive('loadError'))
      toast.error('Falha ao carregar os personagens, tente mais tarde', {
        toastId: 'loadError'
      })
  }, [loadError])

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
        <Wrapper>
          <S.Section>
            <strong>TODOS OS PERSONAGENS</strong>
            <small>
              <strong>{total}</strong> personagens em registro
            </small>
          </S.Section>
        </Wrapper>
      </S.Content>
    </S.Wrapper>
  )
}

export default Home
