
import { combineReducers } from 'redux'

import engineReducer from './engine'

const rootReducer = combineReducers({
    engine: engineReducer
})

export default rootReducer