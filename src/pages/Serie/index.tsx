import { useHistory, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Lottie from 'react-lottie-player'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from 'helpers/api'
import useDocumentTitle from 'helpers/useDocumentTitle'

import CharacterList from 'components/CharacterList'
import Search from 'components/Search'

import loadingAnimation from 'assets/loading.json'
import logo from 'assets/logo-inline.svg'

import { serieCharactersRequest } from 'store/modules/characters/actions/serieCharacters'
import * as S from './styles'
import * as T from './types'

const Serie: React.FC = () => {
  const params = useParams<T.IParams>()
  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(true)
  const [serie, setSerie] = useState<T.ISerieInfo | null>(null)
  useDocumentTitle(serie?.title)

  useEffect(() => {
    setIsLoading(true)
    api
      .get<T.ISerieRequest>(`/series/${params.id}`)
      .then(({ data }) => {
        if (data.data.total <= 0) {
          toast.warn('Nenhuma serie encontrada para esse ID')
          return history.push('/')
        }
        const serieResult = data.data.results[0]
        setSerie({
          title: serieResult.title.split(' (')[0],
          description: serieResult.description,
          startYear: serieResult.startYear,
          endYear: serieResult.endYear,
          thumbnail: serieResult.thumbnail,
          characters: serieResult.characters.available
        })
        return setIsLoading(false)
      })
      .catch(() => {
        toast.error('Falha ao buscar sua serie, tente mais tarde')
        history.push('/')
      })
  }, [history, params])

  useEffect(() => {
    if (serie && serie.characters > 0)
      dispatch(serieCharactersRequest(params.id))
  }, [dispatch, params.id, serie])

  return (
    <>
      <S.Header>
        <Link to="/" className="logo">
          <img src={logo} alt="MARVEL HEROES" />
        </Link>
        <Search />
      </S.Header>
      {isLoading || !serie ? (
        <S.Loading>
          <Lottie
            play
            animationData={loadingAnimation}
            style={{ height: '200px' }}
          />
        </S.Loading>
      ) : (
        <S.Content>
          <S.SerieInfo>
            <img
              src={`${serie.thumbnail.path}/portrait_fantastic.${serie.thumbnail.extension}`}
              alt=""
              className="thumbnail"
            />
            <div className="info">
              <h1>{serie.title}</h1>
              <span className="year">
                {serie.startYear === serie?.endYear
                  ? serie.startYear
                  : `${serie.startYear} - ${serie?.endYear || '.'}`}
              </span>
              {serie.description && (
                <p className="description">{serie.description}</p>
              )}
            </div>
          </S.SerieInfo>

          {serie.characters > 0 && (
            <S.Characters>
              <h1>PERSONAGENS</h1>
              <small>{serie.characters} participaram dessa série</small>
              <CharacterList />
            </S.Characters>
          )}
        </S.Content>
      )}
    </>
  )
}

export default Serie
