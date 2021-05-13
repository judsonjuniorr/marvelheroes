import { Reducer } from 'redux'
import produce from 'immer'

import { ActionTypes, ICharactersState } from './types'

const INITIAL_STATE: ICharactersState = {
  characters: [],
  page: 1,
  maxPages: 1,
  perPage: 30,
  total: 0,
  loading: true,
  loadError: false
}

const characters: Reducer<ICharactersState> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, draft => {
    const { payload, type } = action
    switch (type) {
      case ActionTypes.loadAllCharactersRequest: {
        Object.assign(draft, { page: payload.page ?? 1 })
        return draft
      }

      case ActionTypes.loadAllCharactersSuccess: {
        Object.assign(draft, {
          characters: payload.characters,
          maxPages: Math.ceil(payload.total / draft.perPage),
          total: payload.total ?? 0,
          loadError: false,
          loading: false
        })

        return draft
      }

      case ActionTypes.loadAllCharactersFailure: {
        Object.assign(draft, { loadError: true, loading: false })

        return draft
      }

      default: {
        return draft
      }
    }
  })
}

export default characters
