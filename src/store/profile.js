import { profileAPI } from 'api/api'
import { userAdapter } from 'patterns/adapter'
import { setUserAC } from './auth'

const ActionTypes = {
  TOGGLE_MODAL: 'TOGGLE_MODAL',
}

const initialState = {
  isModalOpen: false,
}

export const ProfileReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.TOGGLE_MODAL:
      return { ...state, isModalOpen: payload }
    default:
      return state
  }
}

export const toggleModalAC = (value) => ({
  type: ActionTypes.TOGGLE_MODAL,
  payload: value,
})

export const uploadAvatar = (file) => async (dispatch, getState) => {
  const user = userAdapter(getState().auth.user)
  const token = JSON.parse(localStorage.getItem('token'))
  const updatedUser = await profileAPI.uploadAvatar({ file, user, token })
  if (updatedUser) {
    dispatch(setUserAC(updatedUser.data))
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  const usersId = userAdapter(getState().auth.user)
  const token = JSON.parse(localStorage.getItem('token'))
  const updatedUser = await profileAPI.updateUser({ user, token, usersId })
  if (updatedUser) {
    dispatch(setUserAC(updatedUser.data))
  }
}
