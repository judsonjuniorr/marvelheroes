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
  updates: [],
  characterInfo: null,
  noInfo: false
}

const characters: Reducer<ICharactersState> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, draft => {
    const { payload, type } = action
    switch (type) {
      case ActionTypes.characterInfoRequest: {
        Object.assign(draft, {
          loading: true,
          noInfo: false,
          loadError: false,
          characterInfo: null
        })

        return draft
      }
      case ActionTypes.characterInfoSuccess: {
        Object.assign(draft, {
          loading: false,
          noInfo: false,
          loadError: false,
          characterInfo: payload.characterInfo
        })

        return draft
      }
      case ActionTypes.characterInfoFailure: {
        Object.assign(draft, {
          loading: false,
          characterInfo: null,
          loadError: !payload.noInfo,
          noInfo: payload.noInfo
        })

        return draft
      }

      case ActionTypes.updateCharacter: {
        const updatesFiltered = draft.updates.filter(
          char => char.id !== payload.id
        )
        updatesFiltered.push(payload)

        Object.assign(draft, {
          characterInfo: {
            ...draft.characterInfo,
            name: payload.name,
            description: payload.description
          },
          updates: updatesFiltered
        })

        return draft
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
