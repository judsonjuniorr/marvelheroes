import { Reducer } from 'redux'
import produce from 'immer'

import { ActionTypes, ISeriesState } from './types'

const INITIAL_STATE: ISeriesState = {
  series: [],
  page: 1,
  maxPages: 1,
  perPage: 28,
  total: 0,
  loading: true,
  loadError: false,
  characterID: 0
}

const characters: Reducer<ISeriesState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    const { payload, type } = action
    switch (type) {
      case ActionTypes.listSeriesRequest: {
        Object.assign(draft, {
          loading: true,
          loadError: false,
          characterID: payload.characterID,
          series: []
        })
        return draft
      }

      case ActionTypes.listSeriesSuccess: {
        Object.assign(draft, {
          page: payload.page,
          series: payload.series,
          maxPages: Math.ceil(payload.total / draft.perPage),
          total: payload.total ?? 0,
          loadError: false,
          loading: false
        })

        return draft
      }

      case ActionTypes.listSeriesFailure: {
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
