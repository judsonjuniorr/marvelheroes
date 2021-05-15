export enum ActionTypes {
  listSeriesRequest = '@series/LIST_SERIES_REQUEST',
  listSeriesSuccess = '@series/LIST_SERIES_SUCCESS',
  listSeriesFailure = '@series/LIST_SERIES_FAILURE'
}

export interface ISeriesInfo {
  id: number
  title: string
  description: string
  startYear: number
  endYear: number
  rating: string
  thumbnail: {
    path: string
    extension: string
  }
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
}
