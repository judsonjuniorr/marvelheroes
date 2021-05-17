import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import api from 'helpers/api'

import { ActionTypes, ISeriesInfo } from './types'
import {
  IListSeriesSuccess,
  listSeriesFailure,
  listSeriesRequest,
  listSeriesSuccess
} from './actions/listSeries'
import {
  serieInfoFailure,
  serieInfoRequest,
  serieInfoSuccess
} from './actions/serieInfo'

type ListSeriesRequest = ReturnType<typeof listSeriesRequest>
type SerieInfoRequest = ReturnType<typeof serieInfoRequest>

interface IListSeriesResponse {
  offset: number
  limit: number
  total: number
  count: number
  results: ISeriesInfo[]
}

export interface ISerieInfoResponse {
  data: {
    total: number
    results: {
      id: number
      title: string
      description: string | null
      startYear: number
      endYear: number
      thumbnail: {
        path: string
        extension: string
      }
      characters: {
        available: number
      }
    }[]
  }
}

function* listSeries({ payload }: ListSeriesRequest) {
  const { page, characterID } = payload
  const perPage: number = yield select(state => state.series.perPage)
  const offset = (page - 1) * perPage

  const apiCall = () => {
    return api
      .get(`/characters/${characterID}/series`, {
        params: { limit: perPage, offset }
      })
      .then(r => r.data)
      .catch(e => {
        throw e
      })
  }

  const cacheKey = `@marvelheroes/series:${characterID}:page:${page}`
  const cached = sessionStorage.getItem(cacheKey)
  if (cached) {
    const cachedResult = JSON.parse(cached) as IListSeriesSuccess
    yield put(listSeriesSuccess(cachedResult))
    return
  }

  try {
    const seriesRequest: AxiosResponse<IListSeriesResponse> = yield call(
      apiCall
    )

    const seriesResult = {
      page,
      total: seriesRequest.data.total,
      series: seriesRequest.data.results.map(s => ({
        id: s.id,
        title: s.title.split(' (')[0],
        description: s.description,
        startYear: s.startYear,
        endYear: s.endYear,
        rating: s.rating,
        thumbnail: s.thumbnail
      }))
    }

    sessionStorage.setItem(cacheKey, JSON.stringify(seriesResult))
    yield put(listSeriesSuccess(seriesResult))
  } catch (error) {
    yield put(listSeriesFailure())
  }
}

function* serieInfo({ payload }: SerieInfoRequest) {
  const { id } = payload

  const apiCall = () => {
    return api
      .get<ISerieInfoResponse>(`/series/${id}`)
      .then(r => r.data)
      .catch(e => {
        throw e
      })
  }

  try {
    const seriesRequest: ISerieInfoResponse = yield call(apiCall)
    if (Number(seriesRequest.data.total) <= 0) yield put(serieInfoFailure(true))

    const serieResult = seriesRequest.data.results[0]
    const serieInfoData: ISeriesInfo = {
      id: Number(id),
      rating: '',
      title: serieResult.title.split(' (')[0],
      description: serieResult.description,
      startYear: serieResult.startYear,
      endYear: serieResult.endYear,
      thumbnail: serieResult.thumbnail,
      characters: serieResult.characters.available
    }

    yield put(serieInfoSuccess(serieInfoData))
  } catch (error) {
    yield put(serieInfoFailure())
  }
}

export default all([
  takeLatest(ActionTypes.listSeriesRequest, listSeries),
  takeLatest(ActionTypes.serieInfoRequest, serieInfo)
])
