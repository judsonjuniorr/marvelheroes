import { useMemo } from 'react'
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa'
import { ImSpinner9 } from 'react-icons/im'
import LazyLoad from 'react-lazyload'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IState } from 'store'
import { ISeriesState } from 'store/modules/series/types'

import * as S from './styles'

const SeriesList: React.FC = () => {
  const series = useSelector<IState, ISeriesState>(state => state.series)

  const seriesList = useMemo(() => {
    if (series.series.length <= 0) return <></>

    return series.series.map(serie => (
      <S.SerieInfo key={serie.id} data-testid="serie-card">
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

  const skeletonList = useMemo(() => {
    return [...Array(28).keys()].map(key => {
      return (
        <S.SerieInfo key={key} data-testid="serie-load-card">
          <div className="cover skeleton-load" />
          <div className="moreInfo">
            <span className="year skeleton-load" />
            <div className="details skeleton-load" />
          </div>
        </S.SerieInfo>
      )
    })
  }, [])

  return (
    <S.Listing>
      {series.page > 1 && (
        <S.MovePage data-testid="prevPage">
          <Link
            to={{
              pathname: `/character/${series.characterID}`,
              search: `?page=${series.page - 1}`
            }}
          >
            <span>Página anterior</span>
            <div className="iconWrapper">
              {series.loading ? (
                <ImSpinner9
                  className="loading"
                  size={35}
                  data-testid="loading-spinner"
                />
              ) : (
                <>
                  <FaAngleDoubleLeft className="icon hover" size={32} />
                  <FaAngleLeft className="icon" size={32} />
                </>
              )}
            </div>
            <span className="pages">
              Você está na página {series.page} de {series.maxPages}
            </span>
          </Link>
        </S.MovePage>
      )}
      {series.loading ? skeletonList : seriesList}
      {series.page < series.maxPages && (
        <S.MovePage data-testid="nextPage">
          <Link
            to={{
              pathname: `/character/${series.characterID}`,
              search: `?page=${series.page + 1}`
            }}
          >
            <span>Prox. Página</span>
            <div className="iconWrapper">
              {series.loading ? (
                <ImSpinner9
                  className="loading"
                  size={35}
                  data-testid="loading-spinner"
                />
              ) : (
                <>
                  <FaAngleRight className="icon" size={32} />
                  <FaAngleDoubleRight className="icon hover" size={32} />
                </>
              )}
            </div>
            <span className="pages">
              Você está na página {series.page} de {series.maxPages}
            </span>
          </Link>
        </S.MovePage>
      )}
    </S.Listing>
  )
}

export default SeriesList
