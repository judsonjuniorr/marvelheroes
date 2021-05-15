import { all, call, put, select, takeLeading } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import api from 'helpers/api'

import { ActionTypes, ICharacter } from './types'
import {
  loadAllCharactersFailure,
  loadAllCharactersRequest,
  loadAllCharactersSuccess,
  ILoadCharactersSuccess
} from './actions/loadAllCharacters'
import {
  searchCharactersFailure,
  searchCharactersRequest,
  searchCharactersSuccess
} from './actions/searchCharacters'

type LoadAllCharactersRequest = ReturnType<typeof loadAllCharactersRequest>
type SearchCharactersRequest = ReturnType<typeof searchCharactersRequest>

interface ILoadCharactersResponse {
  offset: number
  limit: number
  total: number
  count: number
  results: ICharacter[]
}

function* loadAllCharacters({ payload }: LoadAllCharactersRequest) {
  const { page } = payload
  const perPage: number = yield select(state => state.characters.perPage)
  const offset = (page - 1) * perPage

  const apiCall = () => {
    return api
      .get(`/characters`, { params: { limit: perPage, offset } })
      .then(r => r.data)
      .catch(e => {
        throw e
      })
  }

  const cached = sessionStorage.getItem(`@marvelheroes/characters:page:${page}`)
  if (cached) {
    const cachedResult = JSON.parse(cached) as ILoadCharactersSuccess
    yield put(loadAllCharactersSuccess(cachedResult))
    return
  }

  try {
    const charactersRequest: AxiosResponse<ILoadCharactersResponse> =
      yield call(apiCall)

    const charactersResult = {
      page,
      total: charactersRequest.data.total,
      characters: charactersRequest.data.results.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        thumbnail: r.thumbnail,
        series: r.series
      }))
    }

    sessionStorage.setItem(
      `@marvelheroes/characters:page:${page}`,
      JSON.stringify(charactersResult)
    )

    yield put(loadAllCharactersSuccess(charactersResult))
  } catch (error) {
    yield put(loadAllCharactersFailure())
  }
}

function* searchCharacters({ payload }: SearchCharactersRequest) {
  const { query } = payload

  const apiCall = () => {
    return api
      .get(`/characters`, { params: { nameStartsWith: query } })
      .then(r => r.data)
      .catch(e => {
        throw e
      })
  }

  const cached = sessionStorage.getItem(
    `@marvelheroes/characters:search:${query}`
  )
  if (cached) {
    const cachedResult = JSON.parse(cached) as ILoadCharactersSuccess
    yield put(searchCharactersSuccess(cachedResult))
    return
  }

  try {
    const charactersRequest: AxiosResponse<ILoadCharactersResponse> =
      yield call(apiCall)

    const charactersResult = {
      total: charactersRequest.data.total,
      characters: charactersRequest.data.results.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        thumbnail: r.thumbnail,
        series: r.series
      }))
    }

    sessionStorage.setItem(
      `@marvelheroes/characters:search:${query}`,
      JSON.stringify(charactersResult)
    )

    yield put(searchCharactersSuccess(charactersResult))
  } catch (error) {
    yield put(searchCharactersFailure())
  }
}

export default all([
  takeLeading(ActionTypes.loadAllCharactersRequest, loadAllCharacters),
  takeLeading(ActionTypes.searchCharactersRequest, searchCharacters)
])
