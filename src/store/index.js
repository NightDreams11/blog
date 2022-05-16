import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { authReducer } from './auth'
import { counterReducer } from './counter'
import { messageReducer } from './messages'

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  messages: messageReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)
