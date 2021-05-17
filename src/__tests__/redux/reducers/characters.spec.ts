import characters, { INITIAL_STATE } from 'store/modules/characters/reducer'
import {
  loadAllCharactersFailure,
  loadAllCharactersRequest,
  loadAllCharactersSuccess
} from 'store/modules/characters/actions/loadAllCharacters'
import {
  searchCharactersFailure,
  searchCharactersRequest,
  searchCharactersSuccess
} from 'store/modules/characters/actions/searchCharacters'
import {
  serieCharactersFailure,
  serieCharactersRequest,
  serieCharactersSuccess
} from 'store/modules/characters/actions/serieCharacters'

const charactersLoadExample = {
  total: 1,
  page: 2,
  characters: [
    {
      id: 123,
      description: 'Throws web',
      name: 'Spider Man',
      thumbnail: {
        path: 'http://marvel.com',
        extension: 'jpg'
      },
      series: {
        available: 1,
        items: [
          {
            resourceURI: 'http://marvel.com',
            name: 'The amazing spider man'
          }
        ]
      }
    }
  ]
}

describe('Characters Reducer', () => {
  // Load
  it('should reset values when request characters', () => {
    expect(characters(INITIAL_STATE, loadAllCharactersRequest(1))).toEqual(
      expect.objectContaining({
        loading: true,
        searchQuery: '',
        searchResult: []
      })
    )
  })

  it('should set values when characters loaded success', () => {
    expect(
      characters(INITIAL_STATE, loadAllCharactersSuccess(charactersLoadExample))
    ).toEqual(
      expect.objectContaining({
        page: 2,
        characters: charactersLoadExample.characters,
        maxPages: Math.ceil(
          charactersLoadExample.total / INITIAL_STATE.perPage
        ),
        total: charactersLoadExample.total ?? 0,
        loadError: false,
        loading: false
      })
    )
  })

  it('should set error when characters load fails', () => {
    expect(characters(INITIAL_STATE, loadAllCharactersFailure())).toEqual(
      expect.objectContaining({ loadError: true, loading: false })
    )
  })

  // Search
  it('should define the query for characters search', () => {
    const query = 'spider'
    expect(characters(INITIAL_STATE, searchCharactersRequest(query))).toEqual(
      expect.objectContaining({
        searchQuery: query,
        searchResult: [],
        searchError: false,
        loading: true
      })
    )
  })

  it('should set values when characters search success', () => {
    expect(
      characters(INITIAL_STATE, searchCharactersSuccess(charactersLoadExample))
    ).toEqual(
      expect.objectContaining({
        searchResult: charactersLoadExample.characters,
        loading: false
      })
    )
  })

  it('should set error when characters search fails', () => {
    expect(characters(INITIAL_STATE, searchCharactersFailure())).toEqual(
      expect.objectContaining({ searchError: true, loading: false })
    )
  })

  // Serie
  it('should request series characters', () => {
    const query = 474
    expect(characters(INITIAL_STATE, serieCharactersRequest(query))).toEqual(
      expect.objectContaining({ loading: true, loadError: false })
    )
  })

  it('should load series characters', () => {
    expect(
      characters(
        INITIAL_STATE,
        serieCharactersSuccess(charactersLoadExample.characters)
      )
    ).toEqual(
      expect.objectContaining({
        serieCharacters: charactersLoadExample.characters,
        loading: false,
        loadError: false
      })
    )
  })

  it('should set error when serie characters load fails', () => {
    expect(characters(INITIAL_STATE, serieCharactersFailure())).toEqual(
      expect.objectContaining({
        serieCharacters: [],
        loading: false,
        loadError: true
      })
    )
  })
})
