import { commentsAPI } from 'api/api'
import { addSnackbarMessageErrorAC } from './messages'

const ActionTypes = {
  SET_COMMENTS: 'SET_COMMENTS',
  TOGGLE_COMMENTS_IS_FETCHING: 'TOGGLE_COMMENTS_IS_FETCHING',
  SET_COMMENT_AUTHOR: 'SET_COMMENT_AUTHOR',
}

const initialState = {
  comments: null,
  toggleCommentsIsFetching: false,
  author: null,
}

export const commentsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_COMMENTS:
      return { ...state, comments: payload }
    case ActionTypes.TOGGLE_COMMENTS_IS_FETCHING:
      return { ...state, toggleCommentsIsFetching: state.toggleCommentsIsFetching }
    case ActionTypes.SET_COMMENT_AUTHOR:
      return { ...state, author: payload }
    default:
      return state
  }
}

const getCommentsAC = (comments) => ({
  type: ActionTypes.SET_COMMENTS,
  payload: comments,
})

const toggleCommentsIsFetchingAC = (value) => ({
  type: ActionTypes.TOGGLE_COMMENTS_IS_FETCHING,
  payload: value,
})

// const setAuthorAC = (author) => ({
//   type: ActionTypes.SET_COMMENT_AUTHOR,
//   payload: author,
// })

export const getComments = (id) => async (dispatch) => {
  try {
    dispatch(toggleCommentsIsFetchingAC(true))
    const comments = await commentsAPI.getComments(id)

    // Promise.all(
    //   comments.comments.map((comment) => authAPI.getAuthor(comment.commentedBy))
    // ).then((authors) => {
    //   console.log(authors)
    // })

    dispatch(getCommentsAC(comments))
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  } finally {
    dispatch(toggleCommentsIsFetchingAC(false))
  }
}
