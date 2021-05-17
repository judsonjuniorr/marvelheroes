import { useHistory, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Lottie from 'react-lottie-player'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import { IState } from 'store'
import useDocumentTitle from 'helpers/useDocumentTitle'
import { ISeriesState } from 'store/modules/series/types'
import { serieInfoRequest } from 'store/modules/series/actions/serieInfo'
import { serieCharactersRequest } from 'store/modules/characters/actions/serieCharacters'

import CharacterList from 'components/CharacterList'
import Search from 'components/Search'

import loadingAnimation from 'assets/loading.json'
import logo from 'assets/logo-inline.svg'

import * as S from './styles'
import * as T from './types'

const Serie: React.FC = () => {
  const params = useParams<T.IParams>()
  const dispatch = useDispatch()
  const history = useHistory()

  const { serieInfo, loading, loadError, noInfo } = useSelector<
    IState,
    ISeriesState
  >(state => state.series)
  useDocumentTitle(serieInfo?.title)

  useEffect(() => {
    if (noInfo) {
      toast.warn('Nenhuma serie encontrada para esse ID')
      return history.push('/')
    }
    if (loadError) {
      toast.error('Falha ao buscar sua serie, tente mais tarde')
      return history.push('/')
    }

    return () => {}
  }, [history, loadError, noInfo])

  useEffect(() => {
    dispatch(serieInfoRequest(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if (serieInfo && serieInfo.characters && serieInfo.characters > 0)
      dispatch(serieCharactersRequest(params.id))
  }, [dispatch, params.id, serieInfo])

  return (
    <>
      <S.Header>
        <Link to="/" className="logo">
          <img src={logo} alt="MARVEL HEROES" />
        </Link>
        <Search />
      </S.Header>
      {loading || !serieInfo ? (
        <S.Loading>
          <Lottie
            play
            animationData={loadingAnimation}
            style={{ height: '200px' }}
            data-testid="loading-anim"
          />
        </S.Loading>
      ) : (
        <S.Content>
          <S.SerieInfo>
            <img
              src={`${serieInfo.thumbnail.path}/portrait_fantastic.${serieInfo.thumbnail.extension}`}
              alt=""
              className="thumbnail"
            />
            <div className="info">
              <h1>{serieInfo.title}</h1>
              <span className="year">
                {serieInfo.startYear === serieInfo?.endYear
                  ? serieInfo.startYear
                  : `${serieInfo.startYear} - ${serieInfo?.endYear || '.'}`}
              </span>
              {serieInfo.description && (
                <p className="description">{serieInfo.description}</p>
              )}
            </div>
          </S.SerieInfo>

          {serieInfo.characters && serieInfo.characters > 0 && (
            <S.Characters>
              <h1>PERSONAGENS</h1>
              <small>{serieInfo.characters} participaram dessa série</small>
              <CharacterList />
            </S.Characters>
          )}
        </S.Content>
      )}
    </>
  )
}

export default Serie
