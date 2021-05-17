import { ActionTypes, ISeriesInfo } from '../types'

const serieInfoRequest = (id: number | string) => {
  return {
    type: ActionTypes.serieInfoRequest,
    payload: { id }
  }
}

const serieInfoSuccess = (serieInfo: ISeriesInfo) => {
  return {
    type: ActionTypes.serieInfoSuccess,
    payload: { serieInfo }
  }
}

const serieInfoFailure = (noInfo = false) => {
  return {
    type: ActionTypes.serieInfoFailure,
    payload: { noInfo }
  }
}

export { serieInfoRequest, serieInfoSuccess, serieInfoFailure }
