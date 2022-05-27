import { profileAPI } from 'api/api'
import { deleteUserAC, setUserAC, toggleIsFetchingAC } from './auth'
import { addSnackbarMessageSuccessAC } from './messages'

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
    dispatch(addSnackbarMessageSuccessAC('Photo was updated'))
    dispatch(setUserAC(updatedUser))
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  const { id } = getState().auth.user
  const updatedUser = await profileAPI.updateUser({ user, id })
  if (updatedUser) {
    dispatch(addSnackbarMessageSuccessAC('Account was updated'))
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUserAC(updatedUser))
  }
}

export const deleteUser = () => async (dispatch, getState) => {
  const { id } = getState().auth.user
  const response = await profileAPI.deleteUser({ id })
  if (response.status === 200) {
    localStorage.removeItem('token')
    dispatch(addSnackbarMessageSuccessAC('Account was deleted'))
    dispatch(deleteUserAC())
  }
}
