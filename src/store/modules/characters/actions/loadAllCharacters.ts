import { ActionTypes, ICharacter } from '../types'

interface ILoadCharactersSuccess {
  total: number
  characters: ICharacter[]
}

const loadAllCharactersRequest = (page: number) => {
  return {
    type: ActionTypes.loadAllCharactersRequest,
    payload: { page }
  }
}

const loadAllCharactersSuccess = (payload: ILoadCharactersSuccess) => {
  return {
    type: ActionTypes.loadAllCharactersSuccess,
    payload
  }
}

const loadAllCharactersFailure = () => {
  return {
    type: ActionTypes.loadAllCharactersFailure,
    payload: {}
  }
}

export {
  loadAllCharactersRequest,
  loadAllCharactersSuccess,
  loadAllCharactersFailure
}
export type { ILoadCharactersSuccess }
