import { useLocation, useParams } from 'react-router'
import { useEffect, useMemo, useState } from 'react'
import Lottie from 'react-lottie-player'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from 'helpers/api'
import useDocumentTitle from 'helpers/useDocumentTitle'

import loadingAnimation from 'assets/loading.json'
import logo from 'assets/logo-inline.svg'

import LazyLoad from 'react-lazyload'
import Search from 'components/Search'
import * as S from './styles'

interface IParams {
  id: string
}

interface ILocation {
  name?: string
}

interface ISeriesInfo {
  id: number
  title: string
  description: string
  detailsURL?: string
  startYear: number
  endYear: number
  rating: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface ICharacter {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  series: {
    available: number
    collectionURI: string
    items: {
      resourceURI: string
      name: string
    }[]
  }
}

interface ICharacterRequest {
  data: {
    count: number
    results: ICharacter[]
  }
}

const Character: React.FC = () => {
  const { id } = useParams<IParams>()
  const { state } = useLocation<ILocation>()
  const [character, setCharacter] = useState<ICharacter | null>(null)
  const [series, setSeries] = useState<ISeriesInfo[] | null>(null)
  useDocumentTitle(character?.name || state?.name)

  useEffect(() => {
    async function loadSeries(charReq: ICharacter) {
      const serieIDs = charReq.series.items.map(
        serie => serie.resourceURI.split('/').slice(-1)[0]
      )
      const serieInfoList: ISeriesInfo[] = []
      await Promise.all(
        serieIDs.map(async serie => {
          const cached = sessionStorage.getItem(`@marvelheroes/serie:${serie}`)
          if (cached) {
            serieInfoList.push(JSON.parse(cached) as ISeriesInfo)
          } else {
            const response = await api.get(`/series/${serie}`)
            const serieInfo = response.data.data.results
            if (serieInfo?.length > 0) {
              const serieData = {
                id: serieInfo[0].id,
                title: serieInfo[0].title.split(' (')[0],
                description: serieInfo[0].description,
                detailsURL:
                  serieInfo[0].urls.length > 0
                    ? serieInfo[0].urls[0].url
                    : undefined,
                startYear: serieInfo[0].startYear,
                endYear: serieInfo[0].endYear,
                rating: serieInfo[0].rating,
                thumbnail: serieInfo[0].thumbnail
              }
              serieInfoList.push(serieData)
              sessionStorage.setItem(
                `@marvelheroes/serie:${serie}`,
                JSON.stringify(serieData)
              )
            }
          }
        })
      )

      setSeries(serieInfoList)
    }

    api
      .get<ICharacterRequest>(`/characters/${id}`)
      .then(({ data }) => {
        if (data.data.count <= 0) {
          if (!toast.isActive('notFound'))
            toast.error('Personagem não encontrado', { toastId: 'notFound' })
          return
        }
        setCharacter(data.data.results[0])
        loadSeries(data.data.results[0])
      })
      .catch(() => {
        if (!toast.isActive('error'))
          toast.error('Falha ao carregar o personagem', { toastId: 'error' })
      })
  }, [id])

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

  const seriesList = useMemo(() => {
    if (!series) return <></>

    return series
      .sort((a, b) => b.endYear - a.endYear)
      .map(serie => (
        <S.SerieInfo key={serie.id}>
          <Link to={`/serie/${serie.id}`}>
            <div className="cover">
              <LazyLoad>
                <img
                  src={`${serie.thumbnail.path}/landscape_incredible.${serie.thumbnail.extension}`}
                  alt=""
                />
              </LazyLoad>
              <strong>{serie.title}</strong>
            </div>
          </Link>
          <div className="moreInfo">
            <span className="year">
              {serie.startYear === serie?.endYear
                ? serie.startYear
                : `${serie.startYear} - ${serie?.endYear || '.'}`}
            </span>
            <Link to={`/serie/${serie.id}`} className="details">
              Ver mais...
            </Link>
          </div>
        </S.SerieInfo>
      ))
  }, [series])

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
          {state.name && (
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
              <ul>{seriesList}</ul>
            </S.Series>
          )}
        </S.Content>
      )}
    </>
  )
}

export default Character
