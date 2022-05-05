import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { authReducer } from './auth'
import { counterReducer } from './counter'

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)
