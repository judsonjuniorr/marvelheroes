import { ActionTypes, ISeriesInfo } from '../types'

interface IListSeriesSuccess {
  total: number
  page: number
  series: ISeriesInfo[]
}
interface IListSeriesRequest {
  page: number
  characterID: number | string
}

const listSeriesRequest = (payload: IListSeriesRequest) => {
  return {
    type: ActionTypes.listSeriesRequest,
    payload
  }
}

const listSeriesSuccess = (payload: IListSeriesSuccess) => {
  return {
    type: ActionTypes.listSeriesSuccess,
    payload
  }
}

const listSeriesFailure = () => {
  return {
    type: ActionTypes.listSeriesFailure,
    payload: {}
  }
}

export { listSeriesRequest, listSeriesSuccess, listSeriesFailure }
export type { IListSeriesSuccess }
