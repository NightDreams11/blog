import { authAPI } from '../api/api'

const ActionTypes = {
  SET_TOKEN: 'SET_TOKEN',
}

const initialState = {
  user: null,
  token: null,
}

export const authReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: payload }
    default:
      return state
  }
}

const setTokenAC = (token) => ({ type: ActionTypes.SET_TOKEN, payload: token })

export const regUser = (payload) => async () => {
  await authAPI.regUser(payload)
  //   const response = await authAPI.regUser(payload)
  //   console.log(response)
}

export const loginUser = (payload) => async (dispatch) => {
  const token = await authAPI.loginUser(payload)
  dispatch(setTokenAC(token.data.token))
}
