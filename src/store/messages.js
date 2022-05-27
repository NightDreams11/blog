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
        snackbarMessage: { message: payload.message, type: payload.type },
      }
    case ActionTypes.ADD_SNACKBAR_MESSAGE_ERROR:
      return {
        ...state,
        snackbarMessage: { message: payload.message, type: payload.type },
      }
    case ActionTypes.DELETE_SNACKBAR_MESSAGE:
      return { ...state, snackbarMessage: null }
    default:
      return state
  }
}

export const addSnackbarMessageSuccessAC = (payload) => ({
  type: ActionTypes.ADD_SNACKBAR_MESSAGE_SUCCESS,
  payload: {
    message: payload,
    type: 'success',
  },
})

export const addSnackbarMessageErrorAC = (payload) => ({
  type: ActionTypes.ADD_SNACKBAR_MESSAGE_ERROR,
  payload: {
    message: payload,
    type: 'error',
  },
})

export const deleteSnackbarMessageAC = () => ({
  type: ActionTypes.DELETE_SNACKBAR_MESSAGE,
})
