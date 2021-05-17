export enum ActionTypes {
  listSeriesRequest = '@series/LIST_SERIES_REQUEST',
  listSeriesSuccess = '@series/LIST_SERIES_SUCCESS',
  listSeriesFailure = '@series/LIST_SERIES_FAILURE',
  serieInfoRequest = '@series/SERIE_INFO_REQUEST',
  serieInfoSuccess = '@series/SERIE_INFO_SUCCESS',
  serieInfoFailure = '@series/SERIE_INFO_FAILURE'
}

export interface ISeriesInfo {
  id: number
  title: string
  description: string | null
  startYear: number
  endYear: number
  rating: string
  thumbnail: {
    path: string
    extension: string
  }
  characters?: number
}

export interface ISeriesState {
  series: ISeriesInfo[]
  characterID: number | string
  page: number
  maxPages: number
  perPage: number
  total: number
  loading: boolean
  loadError: boolean
  serieInfo: ISeriesInfo | null
  noInfo: boolean
}
