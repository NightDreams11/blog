import { authAPI } from '../api/api'
import { addSnackbarMessageErrorAC, addSnackbarMessageSuccessAC } from './messages'

const ActionTypes = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USER: 'SET_USER',
  SET_AVATAR: 'SET_AVATAR',
  LOGOUT_USER: 'LOGOUT_USER',
  DELETE_USER: 'DELETE_USER',
  TOGGLE_IS_FETCHING: 'TOGGLE_IS_FETCHING',
}

const initialState = {
  user: null,
  token: null,
  previewAvatar: null,
  isFetching: false,
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
    case ActionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: payload }
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
export const toggleIsFetchingAC = (isFetching) => ({
  type: ActionTypes.TOGGLE_IS_FETCHING,
  payload: isFetching,
})

export const regUser = (payload) => async (dispatch) => {
  try {
    dispatch(toggleIsFetchingAC(true))
    await authAPI.regUser(payload)
    dispatch(addSnackbarMessageSuccessAC('Новый пользователь зарегистрирован'))
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  } finally {
    dispatch(toggleIsFetchingAC(false))
  }
}

export const loginUser = (payload) => async (dispatch) => {
  try {
    dispatch(toggleIsFetchingAC(true))
    const token = await authAPI.loginUser(payload)
    if (token.data.token) {
      window.localStorage.setItem('token', JSON.stringify(token.data.token))
      dispatch(setTokenAC(token.data.token))
      const user = await authAPI.getUser(token.data.token)
      dispatch(setUserAC(user))
      dispatch(addSnackbarMessageSuccessAC(`Welcome ${user.name}`))
    }
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  } finally {
    dispatch(toggleIsFetchingAC(false))
  }
}

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutUserAC())
  localStorage.setItem('token', null)
}

export const getUser = () => async (dispatch) => {
  if (JSON.parse(localStorage.getItem('token'))) {
    try {
      const response = await authAPI.getUser()
      dispatch(setUserAC(response))
      // console.log(getState())
    } catch (error) {
      dispatch(logoutUser())
    }
  }
}
