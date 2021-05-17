import { ActionTypes } from '../types'

interface IUpdateData {
  id: string
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
