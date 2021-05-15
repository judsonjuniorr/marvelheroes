import { ActionTypes, ICharacter } from '../types'

interface ILoadCharactersSuccess {
  total: number
  characters: ICharacter[]
}

const searchCharactersRequest = (query: string) => {
  return {
    type: ActionTypes.searchCharactersRequest,
    payload: { query }
  }
}

const searchCharactersSuccess = (payload: ILoadCharactersSuccess) => {
  return {
    type: ActionTypes.searchCharactersSuccess,
    payload
  }
}

const searchCharactersFailure = () => {
  return {
    type: ActionTypes.searchCharactersFailure,
    payload: {}
  }
}

export {
  searchCharactersRequest,
  searchCharactersSuccess,
  searchCharactersFailure
}
export type { ILoadCharactersSuccess }
