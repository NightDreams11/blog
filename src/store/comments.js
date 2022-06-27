import { authAPI, commentsAPI } from 'api/api'
import { addSnackbarMessageErrorAC } from './messages'

const ActionTypes = {
  SET_COMMENTS: 'SET_COMMENTS',
  TOGGLE_COMMENTS_IS_FETCHING: 'TOGGLE_COMMENTS_IS_FETCHING',
  TOGGLE_DELETE_COMMENTS_IS_FETCHING: 'TOGGLE_DELETE_COMMENTS_IS_FETCHING',
  SET_COMMENT_AUTHORS: 'SET_COMMENT_AUTHORS',
  SET_COMMENT_LIKE: 'SET_COMMENT_LIKE',
  SET_COMMENT_LIKE_TO_CHILD: 'SET_COMMENT_LIKE_TO_CHILD',
}

const initialState = {
  comments: null,
  commentLikesCounter: null,
  toggleCommentsIsFetching: false,
  toggleDeleteCommentsIsFetching: false,
  authorsOfComments: null,
}

export const commentsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_COMMENTS:
      return { ...state, comments: payload }
    case ActionTypes.TOGGLE_COMMENTS_IS_FETCHING:
      return { ...state, toggleCommentsIsFetching: payload }
    case ActionTypes.TOGGLE_DELETE_COMMENTS_IS_FETCHING:
      return { ...state, toggleDeleteCommentsIsFetching: payload }
    case ActionTypes.SET_COMMENT_AUTHORS:
      return {
        ...state,
        authorsOfComments: payload,
      }
    case ActionTypes.SET_COMMENT_LIKE:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.id]: { ...state.comments[payload.id], likes: [...payload.likes] },
        },
      }
    case ActionTypes.SET_COMMENT_LIKE_TO_CHILD:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.perentId]: {
            ...state.comments[payload.perentId],
            answers: {
              ...state.comments[payload.perentId],
              likes: [...payload.likes],
            },
            likes: [...payload.likes],
          },
        },
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

const toggleDeleteCommentsIsFetchingAC = (value) => ({
  type: ActionTypes.TOGGLE_DELETE_COMMENTS_IS_FETCHING,
  payload: value,
})

const setAuthorsAC = (author) => ({
  type: ActionTypes.SET_COMMENT_AUTHORS,
  payload: author,
})

export const setCommentLike = ({ id, likes, perentId }) => ({
  type: !perentId
    ? ActionTypes.SET_COMMENT_LIKE
    : ActionTypes.SET_COMMENT_LIKE_TO_CHILD,
  payload: { id, likes },
})

export const getComments = (id) => async (dispatch) => {
  try {
    dispatch(toggleCommentsIsFetchingAC(true))
    const response = await commentsAPI.getComments(id)

    const processedResponse = response.comments.reduce((acc, elem) => {
      if (!elem.followedCommentID) {
        acc[elem.id] = elem
        return acc
      }

      if (elem.followedCommentID && acc[elem.followedCommentID]) {
        acc[elem.followedCommentID].answers = elem
        return acc
      }

      if (elem.followedCommentID && !acc[elem.followedCommentID]) {
        acc[elem.followedCommentID] = { answers: { [elem.id]: elem } }
        return acc
      }

      if (!elem.followedCommentID && acc[elem.id]) {
        acc[elem.id] = { ...acc[elem.id], ...elem }
        return acc
      }

      return acc
    }, {})

    dispatch(getCommentsAC(processedResponse))
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

export const setLike = (id, perentId) => async (dispatch, getState) => {
  try {
    const response = await commentsAPI.setLike(id)
    if (response.status === 200) {
      const userId = getState().auth.user.id
      const currentComment =
        getState().commentsReducer.comments[id] ||
        getState().commentsReducer.comments[perentId].answers
      const userIndex = currentComment.likes.indexOf(userId)
      const isLiked = userIndex !== -1
      const { likes } = currentComment

      if (isLiked) {
        likes.splice(userIndex, 1)
        dispatch(setCommentLike({ id, likes, perentId }))
      } else {
        likes.push(userId)
        dispatch(setCommentLike({ id, likes, perentId }))
      }
    }
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  }
}

export const createComment =
  ({ comment, postId, followedCommentID = null }) =>
  async (dispatch) => {
    try {
      const response = await commentsAPI.createComment({
        comment,
        postId,
        followedCommentID,
      })
      if (response.status === 200) {
        dispatch(getComments(postId))
      }
    } catch (error) {
      dispatch(addSnackbarMessageErrorAC(error.message))
    } finally {
      dispatch(toggleCommentsIsFetchingAC(false))
    }
  }

export const deleteComment =
  ({ commentId, postId }) =>
  async (dispatch) => {
    try {
      dispatch(toggleDeleteCommentsIsFetchingAC(true))
      const response = await commentsAPI.deleteComment(commentId)
      if (response.status === 200) {
        dispatch(getComments(postId))
      }
    } catch (error) {
      dispatch(addSnackbarMessageErrorAC(error.message))
    } finally {
      dispatch(toggleDeleteCommentsIsFetchingAC(false))
    }
  }
