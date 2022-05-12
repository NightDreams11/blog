const ActionTypes = {
  TOGGLE_SNACKBAR: 'TOGGLE_SNACKBAR',
  ADD_SNACKBAR_MESSAGE: 'ADD_SNACKBAR_MESSAGE',
  DELETE_SNACKBAR_MESSAGE: 'DELETE_SNACKBAR_MESSAGE',
}

const initialState = {
  isSnackOpen: false,
  snackbarMessages: ['Добро пожаловать', 'До свидания'],
}

export const messageReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.TOGGLE_SNACKBAR:
      return { ...state, isSnackOpen: payload }
    case ActionTypes.ADD_SNACKBAR_MESSAGE:
      return { ...state, isSnackOpen: payload }
    case ActionTypes.DELETE_SNACKBAR_MESSAGE:
      return { ...state, isSnackOpen: payload }
    default:
      return state
  }
}
export const toggleSnackAC = (payload) => ({
  type: ActionTypes.TOGGLE_SNACKBAR,
  payload,
})

export const addSnackbarMessageAC = (payload) => ({
  type: ActionTypes.ADD_SNACKBAR_MESSAGE,
  payload,
})

export const deleteSnackbarMessageAC = (payload) => ({
  type: ActionTypes.DELETE_SNACKBAR_MESSAGE,
  payload,
})
