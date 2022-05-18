import { profileAPI } from 'api/api'
import { userAdapter } from 'patterns/adapter'
import { setUserAC } from './auth'

const ActionTypes = {
  UPDATE_USER: 'UPDATE_USER',
}

const initialState = {
  editMode: false,
}

export const ProfileReducer = (state = initialState, { type }) => {
  switch (type) {
    case ActionTypes.UPDATE_USER:
      return { ...state, editMode: !state.editMode }
    default:
      return state
  }
}

export const uploadAvatar = (file) => async (dispatch, getState) => {
  const user = userAdapter(getState().auth.user)
  const token = JSON.parse(localStorage.getItem('token'))
  const updatedUser = await profileAPI.uploadAvatar({ file, user, token })
  if (updatedUser) {
    dispatch(setUserAC(updatedUser.data))
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  const id = userAdapter(getState().auth.user)
  const token = JSON.parse(localStorage.getItem('token'))
  const updatedUser = await profileAPI.updateUser({ user, token, id })
  if (updatedUser) {
    dispatch(setUserAC(updatedUser.data))
  }
}
