import { authAPI, commentsAPI } from 'api/api'
import { addSnackbarMessageErrorAC } from './messages'

const ActionTypes = {
  SET_COMMENTS: 'SET_COMMENTS',
  TOGGLE_COMMENTS_IS_FETCHING: 'TOGGLE_COMMENTS_IS_FETCHING',
  SET_COMMENT_AUTHORS: 'SET_COMMENT_AUTHORS',
}

const initialState = {
  comments: null,
  toggleCommentsIsFetching: false,
  authorsOfComments: null,
}

export const commentsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_COMMENTS:
      return { ...state, comments: payload }
    case ActionTypes.TOGGLE_COMMENTS_IS_FETCHING:
      return { ...state, toggleCommentsIsFetching: state.toggleCommentsIsFetching }
    case ActionTypes.SET_COMMENT_AUTHORS:
      return {
        ...state,
        authorsOfComments: payload,
      }
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

const setAuthorsAC = (author) => ({
  type: ActionTypes.SET_COMMENT_AUTHORS,
  payload: author,
})

export const getComments = (id) => async (dispatch) => {
  try {
    dispatch(toggleCommentsIsFetchingAC(true))
    const comments = await commentsAPI.getComments(id)

    dispatch(getCommentsAC(comments.comments))
    // Убираем все повторения
    const uniqueUsersIds = [...new Set(comments.comments.map((c) => c.commentedBy))]

    const commentedUser = await Promise.all(
      uniqueUsersIds.map(async (userId) => {
        try {
          let user = {}
          user = await authAPI.getAuthor(userId)
          return user
        } catch (error) {
          const user = {
            name: 'DELETED',
            id: userId,
          }
          return user
        }
      })
    )

    dispatch(setAuthorsAC(commentedUser))
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  } finally {
    dispatch(toggleCommentsIsFetchingAC(false))
  }
}
