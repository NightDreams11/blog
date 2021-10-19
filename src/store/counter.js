const counterActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  ADD: 'ADD',
}

const initialState = 0

export const counterReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case counterActionTypes.INCREMENT:
      return state + 1
    case counterActionTypes.DECREMENT:
      return state - 1
    case counterActionTypes.ADD:
      return state + payload
    default:
      return state
  }
}

export const increment = () => ({ type: counterActionTypes.INCREMENT })
export const decrement = () => ({ type: counterActionTypes.DECREMENT })
export const add = (payload) => ({
  type: counterActionTypes.ADD,
  payload,
})
