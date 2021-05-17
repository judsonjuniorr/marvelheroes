import series, { INITIAL_STATE } from 'store/modules/series/reducer'
import {
  listSeriesFailure,
  listSeriesRequest,
  listSeriesSuccess
} from 'store/modules/series/actions/listSeries'
import {
  serieInfoFailure,
  serieInfoRequest,
  serieInfoSuccess
} from 'store/modules/series/actions/serieInfo'

describe('Series Reducer', () => {
  it('should request the series list from a character', () => {
    expect(
      series(
        INITIAL_STATE,
        listSeriesRequest({
          characterID: 1010913,
          page: 1
        })
      )
    ).toEqual(
      expect.objectContaining({
        loading: true,
        loadError: false,
        characterID: 1010913,
        series: []
      })
    )
  })

  it('should load the series list from a character', () => {
    const serie = {
      id: 469,
      title: 'Ultimate Adventures',
      description: null,
      startYear: 2002,
      endYear: 2003,
      rating: 'All Ages',
      thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/2/10/5a8c5ed0dbc2f',
        extension: 'jpg'
      }
    }
    expect(
      series(
        INITIAL_STATE,
        listSeriesSuccess({
          total: 1,
          page: 2,
          series: [serie]
        })
      )
    ).toEqual(
      expect.objectContaining({
        page: 2,
        series: [serie],
        maxPages: Math.ceil(1 / INITIAL_STATE.perPage),
        total: 1,
        loadError: false,
        loading: false
      })
    )
  })

  it('should define the error when fails to load series', () => {
    expect(series(INITIAL_STATE, listSeriesFailure())).toEqual(
      expect.objectContaining({
        loadError: true,
        loading: false
      })
    )
  })

  it('should request the serie info', () => {
    expect(series(INITIAL_STATE, serieInfoRequest(1945))).toEqual(
      expect.objectContaining({
        serieInfo: null,
        loading: true,
        loadError: false
      })
    )
  })

  it('should load the serie info', () => {
    const serie = {
      id: 469,
      title: 'Ultimate Adventures',
      description: null,
      startYear: 2002,
      endYear: 2003,
      rating: 'All Ages',
      thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/2/10/5a8c5ed0dbc2f',
        extension: 'jpg'
      },
      characters: 2
    }
    expect(series(INITIAL_STATE, serieInfoSuccess(serie))).toEqual(
      expect.objectContaining({
        serieInfo: serie,
        loading: false,
        loadError: false,
        noInfo: false
      })
    )
  })

  it('should define the error when fails to load serie info', () => {
    expect(series(INITIAL_STATE, serieInfoFailure())).toEqual(
      expect.objectContaining({
        serieInfo: null,
        loading: false,
        loadError: true,
        noInfo: false
      })
    )
  })

  it('should define the error when no serie is found', () => {
    expect(series(INITIAL_STATE, serieInfoFailure(true))).toEqual(
      expect.objectContaining({
        serieInfo: null,
        loading: false,
        loadError: false,
        noInfo: true
      })
    )
  })
})
