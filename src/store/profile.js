const ActionTypes = {
  TOGGLE_EDIT_MODE: 'TOGGLE_EDIT_MODE',
}

const initialState = {
  editMode: false,
}

export const ProfileReducer = (state = initialState, { type }) => {
  switch (type) {
    case ActionTypes.TOGGLE_EDIT_MODE:
      return { ...state, editMode: !state.editMode }
    default:
      return state
  }
}

export const toggleEditModeAC = () => ({
  type: ActionTypes.TOGGLE_EDIT_MODE,
})
