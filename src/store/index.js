import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { authReducer } from './auth'
import { counterReducer } from './counter'
import { messageReducer } from './messages'
import { ProfileReducer } from './profile'

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  messages: messageReducer,
  profile: ProfileReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)
