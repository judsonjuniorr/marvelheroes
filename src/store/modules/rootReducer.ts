import { combineReducers } from 'redux'

import characters from './characters/reducer'
import series from './series/reducer'

export default combineReducers({ characters, series })
