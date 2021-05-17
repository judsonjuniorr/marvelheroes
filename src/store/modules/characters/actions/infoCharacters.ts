import { ActionTypes, ICharacter } from '../types'

const characterInfoRequest = (id: number | string) => {
  return {
    type: ActionTypes.characterInfoRequest,
    payload: { id }
  }
}

const characterInfoSuccess = (characterInfo: ICharacter) => {
  return {
    type: ActionTypes.characterInfoSuccess,
    payload: { characterInfo }
  }
}

const characterInfoFailure = (noInfo = false) => {
  return {
    type: ActionTypes.characterInfoFailure,
    payload: { noInfo }
  }
}

export { characterInfoRequest, characterInfoSuccess, characterInfoFailure }
