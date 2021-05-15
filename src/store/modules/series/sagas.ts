import { all, call, put, select, takeLeading } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import api from 'helpers/api'

import { ActionTypes, ISeriesInfo } from './types'
import {
  // IListSeriesSuccess,
  listSeriesFailure,
  listSeriesRequest,
  listSeriesSuccess
} from './actions/listSeries'

type ListSeriesRequest = ReturnType<typeof listSeriesRequest>

interface IListSeriesResponse {
  offset: number
  limit: number
  total: number
  count: number
  results: ISeriesInfo[]
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
    // const cachedResult = JSON.parse(cached) as IListSeriesSuccess
    // yield put(listSeriesSuccess(cachedResult))
    // return
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

export default all([takeLeading(ActionTypes.listSeriesRequest, listSeries)])
