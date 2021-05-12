// eslint-disable-next-line import/no-unresolved
import { SagaIterator } from '@redux-saga/types'
import { all } from 'redux-saga/effects'

export default function* rootSaga(): SagaIterator {
  return yield all([])
}
