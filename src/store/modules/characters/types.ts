export enum ActionTypes {
  loadAllCharactersRequest = '@characters/LOAD_ALL_CHARACTERS_REQUEST',
  loadAllCharactersSuccess = '@characters/LOAD_ALL_CHARACTERS_SUCCESS',
  loadAllCharactersFailure = '@characters/LOAD_ALL_CHARACTERS_FAILURE',
  searchCharactersRequest = '@characters/SEARCH_CHARACTERS_REQUEST',
  searchCharactersSuccess = '@characters/SEARCH_CHARACTERS_SUCCESS',
  searchCharactersFailure = '@characters/SEARCH_CHARACTERS_FAILURE',
  serieCharactersRequest = '@characters/SERIE_CHARACTERS_REQUEST',
  serieCharactersSuccess = '@characters/SERIE_CHARACTERS_SUCCESS',
  serieCharactersFailure = '@characters/SERIE_CHARACTERS_FAILURE',
  searchCharactersClear = '@characters/SEARCH_CLEAR'
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
  serieCharacters: ICharacter[]
  page: number
  maxPages: number
  perPage: number
  total: number
  loading: boolean
  loadError: boolean
  searchQuery: string
  searchResult: ICharacter[]
  searchError: boolean
}
