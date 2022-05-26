import { authAPI } from '../api/api'
import { addSnackbarMessage } from './messages'

const ActionTypes = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USER: 'SET_USER',
  SET_AVATAR: 'SET_AVATAR',
  LOGOUT_USER: 'LOGOUT_USER',
  DELETE_USER: 'DELETE_USER',
}

const initialState = {
  user: null,
  token: null,
  previewAvatar: null,
}

export const authReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: payload }
    case ActionTypes.SET_USER:
      return { ...state, user: payload, previewAvatar: null }
    case ActionTypes.SET_AVATAR:
      return {
        ...state,
        previewAvatar: { file: payload.file, imageUrl: payload.imageUrl },
      }
    case ActionTypes.LOGOUT_USER:
      return { ...state, token: null, user: null }
    case ActionTypes.DELETE_USER:
      return { ...state, token: null, user: null }
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
export const setAvatarAC = (file, imageUrl) => ({
  type: ActionTypes.SET_AVATAR,
  payload: { file, imageUrl },
})
export const logoutUserAC = () => ({
  type: ActionTypes.LOGOUT_USER,
})
export const deleteUserAC = () => ({
  type: ActionTypes.DELETE_USER,
})

export const regUser = (payload) => async (dispatch) => {
  try {
    await authAPI.regUser(payload)
    dispatch(addSnackbarMessage('Новый пользователь зарегистрирован'))
  } catch (error) {
    dispatch(addSnackbarMessage(error.response.data.error.message))
  }
}

export const loginUser = (payload) => async (dispatch) => {
  try {
    const token = await authAPI.loginUser(payload)
    if (token.data.token) {
      window.localStorage.setItem('token', JSON.stringify(token.data.token))
      dispatch(setTokenAC(token.data.token))
      const user = await authAPI.getUser(token.data.token)
      dispatch(setUserAC(user))
      dispatch(addSnackbarMessage(`Welcome ${user.name}`))
    }
  } catch (error) {
    dispatch(addSnackbarMessage(error.response.data.error))
  }
}

export const getUser = () => async (dispatch) => {
  if (JSON.parse(localStorage.getItem('token'))) {
    const response = await authAPI.getUser()
    dispatch(setUserAC(response))
    // console.log(getState())
  }
}
