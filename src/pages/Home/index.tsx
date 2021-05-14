import {
  FaAngleRight,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleDoubleLeft
} from 'react-icons/fa'
import { ImSpinner9 } from 'react-icons/im'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import LazyLoad from 'react-lazyload'

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
  const contentRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const history = useHistory()
  useDocumentTitle()

  const { loadError, total, characters, page, maxPages, loading } = useSelector<
    IState,
    ICharactersState
  >(state => state.characters)

  useEffect(() => {
    const pageUrl = new URLSearchParams(history.location.search).get('page')
    let searchPage = page
    if (pageUrl) searchPage = Number(pageUrl)

    dispatch(loadAllCharactersRequest(searchPage))
    if (searchPage !== 1) {
      history.replace(`/?page=${searchPage}`)
    } else history.replace(`/`)
  }, [dispatch, history, maxPages, page])

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
          <Link
            to={{
              pathname: `/character/${character.id}`,
              state: { name: character.name }
            }}
          >
            <LazyLoad offset={50}>
              <img
                src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                alt=""
                className="thumbnail"
              />
            </LazyLoad>
            <div className="description">
              <span className="name">{character.name}</span>
              <div className="series">
                {character.series.available > 0 ? (
                  <strong>{character.series.available} </strong>
                ) : (
                  ''
                )}
                {series}
              </div>
            </div>
          </Link>
        </S.CharacterItem>
      )
    })
  }, [characters])

  const skeletonList = useMemo(() => {
    return [...Array(28).keys()].map(key => {
      return (
        <S.CharacterItem key={key}>
          <div className="thumbnail skeleton-load" />
          <div className="description">
            <span className="name skeleton-load" />
            <div className="series skeleton-load" />
          </div>
        </S.CharacterItem>
      )
    })
  }, [])

  const handlePrevPage = useCallback(() => {
    if (loading) return
    history.replace(`/?page=${page - 1}`)
    dispatch(loadAllCharactersRequest(page - 1))
    contentRef.current?.scrollIntoView()
  }, [dispatch, history, loading, page])

  const prevPage = useMemo(
    () =>
      page > 1 && (
        <S.CharacterItem className="pageAction">
          <button type="button" onClick={handlePrevPage}>
            <span>Página anterior</span>
            <div className="iconWrapper">
              {loading ? (
                <ImSpinner9 className="loading" size={22} />
              ) : (
                <>
                  <FaAngleDoubleLeft className="icon hover" size={19} />
                  <FaAngleLeft className="icon" size={19} />
                </>
              )}
            </div>
            <span className="pages">
              {page}/{maxPages}
            </span>
          </button>
        </S.CharacterItem>
      ),
    [handlePrevPage, loading, maxPages, page]
  )

  const handleNextPage = useCallback(() => {
    if (loading) return
    history.replace(`/?page=${page + 1}`)
    dispatch(loadAllCharactersRequest(page + 1))
    contentRef.current?.scrollIntoView()
  }, [dispatch, history, loading, page])

  const nextPage = useMemo(
    () =>
      maxPages > page && (
        <S.CharacterItem className="pageAction">
          <button type="button" onClick={handleNextPage}>
            <span>Prox. Página</span>
            <div className="iconWrapper">
              {loading ? (
                <ImSpinner9 className="loading" size={22} />
              ) : (
                <>
                  <FaAngleRight className="icon" size={19} />
                  <FaAngleDoubleRight className="icon hover" size={19} />
                </>
              )}
            </div>
            <span className="pages">
              {page}/{maxPages}
            </span>
          </button>
        </S.CharacterItem>
      ),
    [handleNextPage, loading, maxPages, page]
  )

  return (
    <S.Wrapper>
      <S.Main>
        <S.Logo
          src={logo}
          alt="MARVEL HEROES"
          onClick={() => {
            history.push('/')
            if (page !== 1) dispatch(loadAllCharactersRequest(1))
          }}
        />

        <img src={superMan} alt="" className="character superman" />
        <img src={greenLantern} alt="" className="character greenlantern" />
        <img src={ironMan} alt="" className="character ironman" />
        <img src={captainWonderWoman} alt="" className="character captainww" />
        <img src={spiderMan} alt="" className="character spiderman" />
        <img src={wave} alt="" className="wave" />
      </S.Main>
      <S.Content ref={contentRef}>
        <Wrapper>
          <S.Section>
            <strong>TODOS OS PERSONAGENS</strong>
            <small>
              <strong>{total}</strong> personagens em registro
            </small>

            <ul>
              {prevPage}
              {loading ? skeletonList : characterList}
              {nextPage}
            </ul>
          </S.Section>
        </Wrapper>
      </S.Content>
    </S.Wrapper>
  )
}

export default Home
