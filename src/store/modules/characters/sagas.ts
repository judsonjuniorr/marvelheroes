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

type LoadAllCharactersRequest = ReturnType<typeof loadAllCharactersRequest>

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
  const limit = page * perPage
  const offset = (page - 1) * perPage

  const apiCall = () => {
    return api
      .get(`/characters`, { params: { limit, offset } })
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

export default all([
  takeLeading(ActionTypes.loadAllCharactersRequest, loadAllCharacters)
])
