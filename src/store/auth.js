import { authAPI } from '../api/api'

const ActionTypes = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USER: 'SET_USER',
  TOGGLE_SNACKBAR: 'TOGGLE_SNACKBAR',
}

const initialState = {
  user: [],
  token: null,
  isSnackOpen: false,
}

export const authReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: payload }
    case ActionTypes.SET_USER:
      return { ...state, user: payload }
    case ActionTypes.TOGGLE_SNACKBAR:
      return { ...state, isSnackOpen: payload }
    default:
      return state
  }
}

export const setTokenAC = (token) => ({
  type: ActionTypes.SET_TOKEN,
  payload: token,
})
export const setUserAC = (user) => ({
  type: ActionTypes.SET_USER,
  payload: user,
})
export const toggleSnackAC = (payload) => ({
  type: ActionTypes.TOGGLE_SNACKBAR,
  payload,
})

export const regUser = (payload) => async () => {
  await authAPI.regUser(payload)
}

export const loginUser = (payload) => async (dispatch) => {
  const token = await authAPI.loginUser(payload)
  dispatch(setTokenAC(token.data.token))
  if (token.data.token) {
    const user = await authAPI.getUser(token.data.token)
    dispatch(setUserAC(user.data))
    // console.log(getState())
  }
}
