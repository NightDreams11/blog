import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { authReducer } from './auth'
import { messageReducer } from './messages'
import { postsReducer } from './posts'
import { ProfileReducer } from './profile'

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
  profile: ProfileReducer,
  postsReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)
