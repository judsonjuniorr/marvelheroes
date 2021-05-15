import { ActionTypes, ICharacter } from '../types'

const serieCharactersRequest = (serieID: number | string) => {
  return {
    type: ActionTypes.serieCharactersRequest,
    payload: { serieID }
  }
}

const serieCharactersSuccess = (characters: ICharacter[]) => {
  return {
    type: ActionTypes.serieCharactersSuccess,
    payload: { characters }
  }
}

const serieCharactersFailure = () => {
  return {
    type: ActionTypes.serieCharactersFailure,
    payload: {}
  }
}

export {
  serieCharactersRequest,
  serieCharactersSuccess,
  serieCharactersFailure
}
