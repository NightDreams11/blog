const ActionTypes = {
  TOGGLE_SNACKBAR: 'TOGGLE_SNACKBAR',
}

const initialState = {
  isSnackOpen: false,
}

export const messageReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.TOGGLE_SNACKBAR:
      return { ...state, isSnackOpen: payload }
    default:
      return state
  }
}
export const toggleSnackAC = (payload) => ({
  type: ActionTypes.TOGGLE_SNACKBAR,
  payload,
})
