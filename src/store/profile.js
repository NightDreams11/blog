import { profileAPI } from 'api/api'
import { deleteUserAC, setUserAC } from './auth'

// const ActionTypes = {}

const initialState = {}

export const ProfileReducer = (state = initialState, { type }) => {
  switch (type) {
    default:
      return state
  }
}

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

export const deleteUser = () => async (dispatch, getState) => {
  const { id } = getState().auth.user
  const response = await profileAPI.deleteUser({ id })
  if (response.status === 200) {
    localStorage.removeItem('token')
    dispatch(deleteUserAC())
  }
}
