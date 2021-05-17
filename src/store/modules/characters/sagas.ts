import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import api from 'helpers/api'

import { ActionTypes, ICharacter, IUpdates } from './types'
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
import {
  serieCharactersFailure,
  serieCharactersRequest,
  serieCharactersSuccess
} from './actions/serieCharacters'

type LoadAllCharactersRequest = ReturnType<typeof loadAllCharactersRequest>
type SearchCharactersRequest = ReturnType<typeof searchCharactersRequest>
type SerieCharactersRequest = ReturnType<typeof serieCharactersRequest>

interface ILoadCharactersResponse {
  offset: number
  limit: number
  total: number
  count: number
  results: ICharacter[]
}

export function* loadAllCharacters({ payload }: LoadAllCharactersRequest) {
  const { page } = payload
  const perPage: number = yield select(state => state.characters.perPage)
  const offset = (page - 1) * perPage
  const updates: IUpdates[] = yield select(state => state.characters.updates)

  const apiCall = async () => {
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
    const updatedChars = cachedResult.characters.map(char => {
      const updated = updates.find(c => Number(c.id) === Number(char.id)) || {}
      return { ...char, ...updated }
    })
    Object.assign(cachedResult, { characters: updatedChars })
    yield put(loadAllCharactersSuccess(cachedResult))
    return
  }

  try {
    const charactersRequest: AxiosResponse<ILoadCharactersResponse> =
      yield call(apiCall)

    const charactersResult = {
      page,
      total: charactersRequest.data.total,
      characters: charactersRequest.data.results.map(r => {
        const updated = updates.find(c => Number(c.id) === Number(r.id)) || {}

        return {
          id: r.id,
          name: r.name,
          description: r.description,
          thumbnail: r.thumbnail,
          series: r.series,
          ...updated
        }
      })
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

export function* searchCharacters({ payload }: SearchCharactersRequest) {
  const { query } = payload
  const updates: IUpdates[] = yield select(state => state.characters.updates)

  const apiCall = async () => {
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
    const updatedChars = cachedResult.characters.map(char => {
      const updated = updates.find(c => Number(c.id) === Number(char.id)) || {}
      return { ...char, ...updated }
    })
    Object.assign(cachedResult, { characters: updatedChars })

    yield put(searchCharactersSuccess(cachedResult))
    return
  }

  try {
    const charactersRequest: AxiosResponse<ILoadCharactersResponse> =
      yield call(apiCall)

    const charactersResult = {
      total: charactersRequest.data.total,
      page: 1,
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

export function* serieCharacters({ payload }: SerieCharactersRequest) {
  const { serieID } = payload
  const updates: IUpdates[] = yield select(state => state.characters.updates)

  const apiCall = async () => {
    return api
      .get(`/series/${serieID}/characters`, { params: { limit: 100 } })
      .then(r => r.data)
      .catch(e => {
        throw e
      })
  }

  try {
    const charactersRequest: AxiosResponse<ILoadCharactersResponse> =
      yield call(apiCall)

    const charactersResult: ICharacter[] = charactersRequest.data.results.map(
      r => {
        const updated =
          updates.find(char => Number(char.id) === Number(r.id)) || {}

        return {
          id: r.id,
          name: r.name,
          description: r.description,
          thumbnail: r.thumbnail,
          series: r.series,
          ...updated
        }
      }
    )

    yield put(serieCharactersSuccess(charactersResult))
  } catch (error) {
    yield put(serieCharactersFailure())
  }
}

export default all([
  takeLatest(ActionTypes.loadAllCharactersRequest, loadAllCharacters),
  takeLatest(ActionTypes.searchCharactersRequest, searchCharacters),
  takeLatest(ActionTypes.serieCharactersRequest, serieCharacters)
])
