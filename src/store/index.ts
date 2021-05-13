import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'

import { ICharactersState } from './modules/characters/types'

export interface IState {
  characters: ICharactersState
}

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga)

export default store
