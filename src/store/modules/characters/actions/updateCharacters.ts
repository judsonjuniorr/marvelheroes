import { ActionTypes } from '../types'

interface IUpdateData {
  name: string
  description?: string
}

const updateCharacter = (payload: IUpdateData) => {
  return {
    type: ActionTypes.updateCharacter,
    payload
  }
}

export { updateCharacter }
