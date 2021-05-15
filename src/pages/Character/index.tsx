import { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Lottie from 'react-lottie-player'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from 'helpers/api'
import { IState } from 'store'
import useDocumentTitle from 'helpers/useDocumentTitle'

import loadingAnimation from 'assets/loading.json'
import logo from 'assets/logo-inline.svg'

import Search from 'components/Search'
import SeriesList from 'components/SeriesList'

import { ISeriesState } from 'store/modules/series/types'
import { listSeriesRequest } from 'store/modules/series/actions/listSeries'
import * as S from './styles'
import * as T from './types'

const Character: React.FC = () => {
  const { id } = useParams<T.IParams>()
  const { state, search } = useLocation<T.ILocation>()
  const [character, setCharacter] = useState<T.ICharacter | null>(null)
  const { perPage } = useSelector<IState, ISeriesState>(st => st.series)
  const dispatch = useDispatch()

  useDocumentTitle(character?.name || state?.name)

  useEffect(() => {
    api
      .get<T.ICharacterRequest>(`/characters/${id}`)
      .then(({ data }) => {
        if (data.data.count <= 0) {
          if (!toast.isActive('notFound'))
            toast.error('Personagem não encontrado', { toastId: 'notFound' })
          return
        }
        setCharacter(data.data.results[0])
        dispatch(listSeriesRequest({ characterID: id, page: 1 }))
      })
      .catch(() => {
        if (!toast.isActive('error'))
          toast.error('Falha ao carregar o personagem', { toastId: 'error' })
      })
  }, [dispatch, id])

  const page = useMemo(() => {
    const pageSearch = new URLSearchParams(search).get('page')
    if (!pageSearch) return 1
    return Number(pageSearch.replace(/\D+/g, ''))
  }, [search])

  useEffect(() => {
    if (page) dispatch(listSeriesRequest({ characterID: id, page }))
  }, [dispatch, id, page])

  const seriesCountDesc = useMemo(() => {
    if (!character) return <></>

    let seriesText = ``
    if (character.series.available > 0) seriesText = ' séries'
    if (character.series.available === 1) seriesText = ' série'

    return character.series.available > 0 ? (
      <span className="series">
        <strong>{character.series.available}</strong>
        {seriesText}
      </span>
    ) : (
      <></>
    )
  }, [character])

  return (
    <>
      <S.Header>
        <Link to="/" className="logo">
          <img src={logo} alt="MARVEL HEROES" />
        </Link>
        <Search />
      </S.Header>
      {!character ? (
        <S.Loading>
          {state?.name && (
            <span>
              Aguarde enquanto <strong>{state.name}</strong> se prepara para a
              batalha
            </span>
          )}
          <Lottie
            play
            animationData={loadingAnimation}
            style={{ height: '200px' }}
          />
        </S.Loading>
      ) : (
        <S.Content>
          <S.CharacterInfo>
            <img
              src={`${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`}
              alt=""
              className="thumbnail"
            />
            <div className="info">
              <h1>{character.name}</h1>
              {seriesCountDesc}
              {character.description && (
                <p className="description">{character.description}</p>
              )}
            </div>
          </S.CharacterInfo>

          {character.series.available > 0 && (
            <S.Series>
              <h1>SERIES</h1>
              <small>
                Exibindo {page * perPage - perPage + 1} - {page * perPage} de{' '}
                {character.series.available}
              </small>
              <SeriesList />
            </S.Series>
          )}
        </S.Content>
      )}
    </>
  )
}

export default Character
