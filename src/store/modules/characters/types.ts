export enum ActionTypes {
  loadAllCharactersRequest = '@characters/LOAD_ALL_CHARACTERS_REQUEST',
  loadAllCharactersSuccess = '@characters/LOAD_ALL_CHARACTERS_SUCCESS',
  loadAllCharactersFailure = '@characters/LOAD_ALL_CHARACTERS_FAILURE'
}

interface ISeries {
  available: number
  items: {
    resourceURI: string
    name: string
  }[]
}

export interface ICharacter {
  id: number
  description: string
  name: string
  thumbnail: {
    path: string
    extension: string
  }
  series: ISeries
}

export interface ICharactersState {
  characters: ICharacter[]
  page: number
  perPage: number
  total: number
  loading: boolean
  loadError: boolean
}
