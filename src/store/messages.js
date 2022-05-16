const ActionTypes = {
  ADD_SNACKBAR_MESSAGE: 'ADD_SNACKBAR_MESSAGE',
  DELETE_SNACKBAR_MESSAGE: 'DELETE_SNACKBAR_MESSAGE',
}

const initialState = {
  snackbarMessage: null,
}

export const messageReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.ADD_SNACKBAR_MESSAGE:
      return { ...state, snackbarMessage: payload }
    case ActionTypes.DELETE_SNACKBAR_MESSAGE:
      return { ...state, snackbarMessage: null }
    default:
      return state
  }
}

export const addSnackbarMessageAC = (payload) => ({
  type: ActionTypes.ADD_SNACKBAR_MESSAGE,
  payload,
})

export const deleteSnackbarMessageAC = () => ({
  type: ActionTypes.DELETE_SNACKBAR_MESSAGE,
})

export const addSnackbarMessage = (payload) => (dispatch) => {
  dispatch(addSnackbarMessageAC(payload))
}
