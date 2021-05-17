import { Reducer } from 'redux'
import produce from 'immer'

import { ActionTypes, ICharactersState } from './types'

export const INITIAL_STATE: ICharactersState = {
  characters: [],
  page: 1,
  maxPages: 1,
  perPage: 28,
  total: 0,
  loading: true,
  loadError: false,
  searchQuery: '',
  searchResult: [],
  searchError: false,
  serieCharacters: [],
  updates: []
}

const characters: Reducer<ICharactersState> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, draft => {
    const { payload, type } = action
    switch (type) {
      case ActionTypes.updateCharacter: {
        const updatesFiltered = draft.updates.filter(
          char => char.id !== payload.id
        )
        updatesFiltered.push(payload)

        return { ...draft, updates: updatesFiltered }
      }

      case ActionTypes.serieCharactersRequest: {
        Object.assign(draft, {
          maxPages: 1,
          page: 1,
          loading: true,
          loadError: false
        })
        return draft
      }
      case ActionTypes.serieCharactersSuccess: {
        Object.assign(draft, {
          serieCharacters: payload.characters,
          total: payload.characters.length,
          loading: false,
          loadError: false
        })
        return draft
      }

      case ActionTypes.serieCharactersFailure: {
        Object.assign(draft, {
          serieCharacters: [],
          loading: false,
          loadError: true
        })
        return draft
      }

      case ActionTypes.searchCharactersRequest: {
        Object.assign(draft, {
          maxPages: 1,
          page: 1,
          searchQuery: payload.query,
          searchResult: [],
          searchError: false,
          loading: true
        })

        return draft
      }

      case ActionTypes.searchCharactersSuccess: {
        Object.assign(draft, {
          searchResult: payload.characters,
          loading: false
        })

        return draft
      }

      case ActionTypes.loadAllCharactersRequest: {
        Object.assign(draft, {
          loading: true,
          searchQuery: '',
          searchResult: []
        })
        return draft
      }

      case ActionTypes.loadAllCharactersSuccess: {
        Object.assign(draft, {
          page: payload.page,
          characters: payload.characters,
          maxPages: Math.ceil(payload.total / draft.perPage),
          total: payload.total,
          loadError: false,
          loading: false
        })

        return draft
      }

      case ActionTypes.loadAllCharactersFailure: {
        Object.assign(draft, { loadError: true, loading: false })

        return draft
      }

      case ActionTypes.searchCharactersFailure: {
        Object.assign(draft, { searchError: true, loading: false })

        return draft
      }

      default: {
        return draft
      }
    }
  })
}

export default characters
