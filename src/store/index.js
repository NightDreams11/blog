import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { counterReducer } from './counter'

const rootReducer = combineReducers({ counter: counterReducer })

export const store = createStore(rootReducer, composeWithDevTools())
