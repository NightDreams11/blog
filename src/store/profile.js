import { profileAPI } from 'api/api'
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
  const { id } = getState().auth.user
  const updatedUser = await profileAPI.uploadAvatar({ file, id })
  if (updatedUser) {
    dispatch(setUserAC(updatedUser.data))
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  const { id } = getState().auth.user
  const updatedUser = await profileAPI.updateUser({ user, id })
  if (updatedUser) {
    dispatch(setUserAC(updatedUser.data))
  }
}
