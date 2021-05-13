import { FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'

import useDocumentTitle from 'helpers/useDocumentTitle'

import { IState } from 'store'
import { ICharactersState } from 'store/modules/characters/types'
import { loadAllCharactersRequest } from 'store/modules/characters/actions/loadAllCharacters'

import Wrapper from 'components/Wrapper'

import wave from 'assets/wave.svg'
// import logo from 'assets/logo.svg'
// import ironMan from 'assets/iron-man.png'
// import superMan from 'assets/super-man.png'
// import spiderMan from 'assets/spider-man.png'
// import greenLantern from 'assets/green-lantern.png'
// import captainWonderWoman from 'assets/captain-and-wonder-woman.png'

import * as S from './styles'

const Home: React.FC = () => {
  useDocumentTitle()
  const dispatch = useDispatch()
  const { loadError, total, characters, page, maxPages } = useSelector<
    IState,
    ICharactersState
  >(state => state.characters)

  useEffect(() => {
    dispatch(loadAllCharactersRequest(page))
  }, [dispatch, page])

  useEffect(() => {
    if (loadError && !toast.isActive('loadError'))
      toast.error('Falha ao carregar os personagens, tente mais tarde', {
        toastId: 'loadError'
      })
  }, [loadError])

  const characterList = useMemo(() => {
    return characters.map(character => {
      let series = ``
      if (character.series.available > 0) series = 'séries'
      if (character.series.available === 1) series = 'série'

      return (
        <S.CharacterItem key={character.id}>
          <div className="description">
            <span className="name">{character.name}</span>
            <div className="series">
              {character.series.available > 0 ? (
                <strong>{character.series.available}</strong>
              ) : (
                ''
              )}{' '}
              {series}
            </div>
          </div>
        </S.CharacterItem>
      )
    })
  }, [characters])

  return (
    <S.Wrapper>
      <S.Main>
        {/* <S.Logo src={logo} alt="MARVEL HEROES" />

        <img src={superMan} alt="" className="character superman" />
        <img src={greenLantern} alt="" className="character greenlantern" />
        <img src={ironMan} alt="" className="character ironman" />
        <img src={captainWonderWoman} alt="" className="character captainww" />
        <img src={spiderMan} alt="" className="character spiderman" /> */}
        <img src={wave} alt="" className="wave" />
      </S.Main>
      <S.Content>
        <Wrapper>
          <S.Section>
            <strong>TODOS OS PERSONAGENS</strong>
            <small>
              <strong>{total}</strong> personagens em registro
            </small>

            <ul>
              {characterList}
              {maxPages > page && (
                <S.CharacterItem className="pageAction">
                  <div className="iconWrapper">
                    <FaAngleRight className="icon" size={19} />
                    <FaAngleDoubleRight className="icon hover" size={19} />
                  </div>
                </S.CharacterItem>
              )}
            </ul>
          </S.Section>
        </Wrapper>
      </S.Content>
    </S.Wrapper>
  )
}

export default Home
