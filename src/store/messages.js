const ActionTypes = {
  ADD_SNACKBAR_MESSAGE_SUCCESS: 'ADD_SNACKBAR_MESSAGE_SUCCESS',
  ADD_SNACKBAR_MESSAGE_ERROR: 'ADD_SNACKBAR_MESSAGE_ERROR',
  DELETE_SNACKBAR_MESSAGE: 'DELETE_SNACKBAR_MESSAGE',
}

const initialState = {
  snackbarMessage: null,
}

export const messageReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.ADD_SNACKBAR_MESSAGE_SUCCESS:
      return {
        ...state,
        snackbarMessage: { message: payload, type: 'success' },
      }
    case ActionTypes.ADD_SNACKBAR_MESSAGE_ERROR:
      return {
        ...state,
        snackbarMessage: { message: payload, type: 'error' },
      }
    case ActionTypes.DELETE_SNACKBAR_MESSAGE:
      return { ...state, snackbarMessage: null }
    default:
      return state
  }
}

export const addSnackbarMessageSuccessAC = (message) => ({
  type: ActionTypes.ADD_SNACKBAR_MESSAGE_SUCCESS,
  payload: message,
})

export const addSnackbarMessageErrorAC = (message) => ({
  type: ActionTypes.ADD_SNACKBAR_MESSAGE_ERROR,
  payload: message,
})

export const deleteSnackbarMessageAC = () => ({
  type: ActionTypes.DELETE_SNACKBAR_MESSAGE,
})
