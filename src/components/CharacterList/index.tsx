import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ImSpinner9 } from 'react-icons/im'
import { useEffect, useMemo } from 'react'
import LazyLoad from 'react-lazyload'

import { IState } from 'store'
import { ICharactersState } from 'store/modules/characters/types'
import { loadAllCharactersRequest } from 'store/modules/characters/actions/loadAllCharacters'

import * as S from './styles'

const CharacterList: React.FC = () => {
  const { searchResult, characters, loading, maxPages, page, serieCharacters } =
    useSelector<IState, ICharactersState>(state => state.characters)
  const history = useHistory()
  const { search, pathname } = useLocation()
  const dispatch = useDispatch()

  const charactersList = useMemo(() => {
    const isSearch = pathname.includes('search')
    if (isSearch) return searchResult

    const isSerie = pathname.includes('serie')
    if (isSerie) return serieCharacters

    return characters
  }, [characters, pathname, searchResult, serieCharacters])

  const characterList = useMemo(() => {
    return charactersList.map(character => {
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
  }, [charactersList])

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

  useEffect(() => {
    if (pathname === '/') {
      const newPage = new URLSearchParams(search).get('page')
      if (newPage)
        dispatch(loadAllCharactersRequest(Number(newPage.replace(/\D+/g, ''))))
    }
  }, [page, dispatch, pathname, search])

  const prevPage = useMemo(
    () =>
      page > 1 && (
        <S.CharacterItem className="pageAction">
          <Link
            to={{
              pathname: history.location.pathname,
              search: `?page=${page - 1}`
            }}
          >
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
              Página {page} de {maxPages}
            </span>
          </Link>
        </S.CharacterItem>
      ),
    [history.location.pathname, loading, maxPages, page]
  )

  const nextPage = useMemo(
    () =>
      maxPages > page && (
        <S.CharacterItem className="pageAction">
          <Link
            to={{
              pathname: history.location.pathname,
              search: `?page=${page + 1}`
            }}
          >
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
              Página {page} de {maxPages}
            </span>
          </Link>
        </S.CharacterItem>
      ),
    [history.location.pathname, loading, maxPages, page]
  )

  return (
    <S.CharacterList>
      {prevPage}
      {loading ? skeletonList : characterList}
      {nextPage}
    </S.CharacterList>
  )
}

export default CharacterList
