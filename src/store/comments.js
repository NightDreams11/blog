import { authAPI, commentsAPI } from 'api/api'
import { addSnackbarMessageErrorAC } from './messages'

const ActionTypes = {
  SET_COMMENTS: 'SET_COMMENTS',
  SET_LIKED_COMMENT: 'SET_LIKED_COMMENT',
  TOGGLE_COMMENTS_IS_FETCHING: 'TOGGLE_COMMENTS_IS_FETCHING',
  SET_COMMENT_AUTHORS: 'SET_COMMENT_AUTHORS',
  SET_COMMENTS_LIKES_COUNTER: 'SET_COMMENTS_LIKES_COUNTER',
}

const initialState = {
  comments: null,
  comment: null,
  commentLikesCounter: null,
  toggleCommentsIsFetching: false,
  authorsOfComments: null,
}

export const commentsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_COMMENTS:
      return { ...state, comments: payload }
    case ActionTypes.SET_LIKED_COMMENT:
      return { ...state, comment: payload }
    case ActionTypes.TOGGLE_COMMENTS_IS_FETCHING:
      return { ...state, toggleCommentsIsFetching: state.toggleCommentsIsFetching }
    case ActionTypes.SET_COMMENT_AUTHORS:
      return {
        ...state,
        authorsOfComments: payload,
      }
    case ActionTypes.SET_COMMENTS_LIKES_COUNTER:
      return {
        ...state,
        comment: { ...state.comment, likes: [...payload] },
      }

    default:
      return state
  }
}

const getCommentsAC = (comments) => ({
  type: ActionTypes.SET_COMMENTS,
  payload: comments,
})

export const getCurrentCommentAC = (comment) => ({
  type: ActionTypes.SET_LIKED_COMMENT,
  payload: comment,
})

const toggleCommentsIsFetchingAC = (value) => ({
  type: ActionTypes.TOGGLE_COMMENTS_IS_FETCHING,
  payload: value,
})

const setAuthorsAC = (author) => ({
  type: ActionTypes.SET_COMMENT_AUTHORS,
  payload: author,
})

export const setCommentsLikesCounterAC = (likes) => ({
  type: ActionTypes.SET_COMMENTS_LIKES_COUNTER,
  payload: likes,
})

export const getComments = (id) => async (dispatch) => {
  try {
    dispatch(toggleCommentsIsFetchingAC(true))
    const response = await commentsAPI.getComments(id)

    dispatch(getCommentsAC(response.comments))
    // Убираем все повторения
    const uniqueUsersIds = [
      ...new Set(response.comments.map((comment) => comment.commentedBy)),
    ]

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

    const commentsAuthors = commentedUser.reduce((acc, elem) => {
      acc[elem.id] = elem
      return acc
    }, {})

    dispatch(setAuthorsAC(commentsAuthors))
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  } finally {
    dispatch(toggleCommentsIsFetchingAC(false))
  }
}

export const setLike = (id) => async (dispatch, getState) => {
  try {
    const response = await commentsAPI.setLike(id)
    if (response.status === 200) {
      const userId = getState().auth.user.id
      const currentComment = getState().commentsReducer.comment
      const userIndex = currentComment.likes.indexOf(userId)
      const isLiked = userIndex !== -1
      const { likes } = currentComment

      if (isLiked) {
        likes.splice(userIndex, 1)
        dispatch(setCommentsLikesCounterAC(likes))
      } else {
        likes.push(userId)
        dispatch(setCommentsLikesCounterAC(likes))
      }
    }
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  }
}
