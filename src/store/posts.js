import { postsAPI } from 'api/api'
import { toggleIsFetchingAC } from './auth'
import { addSnackbarMessageErrorAC } from './messages'

const ActionTypes = {
  SET_POSTS: 'SET_POSTS',
  SET_POST: 'SET_POST',
  SET_POST_ID: 'SET_POST_ID',
  SET_POST_LIKES_COUNTER: 'SET_POST_LIKES_COUNTER',
  TOGGLE_POST_LIKE_BEHAVIOR: 'TOGGLE_POST_LIKE_BEHAVIOR',
  SET_AUTHOR: 'SET_AUTHOR',
  SET_SCROLL_POSITION: 'SET_SCROLL_POSITION',
}

const initialState = {
  postsObj: null,
  post: null,
  postId: null,
  author: null,
  scrollPosition: null,
  postLikesCounter: null,
  postLikesBehavior: false,
}

export const postsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_POSTS:
      return { ...state, postsObj: payload }
    case ActionTypes.SET_POST:
      return { ...state, post: payload }
    case ActionTypes.SET_POST_ID:
      return { ...state, postId: payload }
    case ActionTypes.SET_POST_LIKES_COUNTER:
      return { ...state, postLikesCounter: payload }
    case ActionTypes.TOGGLE_POST_LIKE_BEHAVIOR:
      return { ...state, postLikesBehavior: payload }
    case ActionTypes.SET_AUTHOR:
      return { ...state, author: payload }
    case ActionTypes.SET_SCROLL_POSITION:
      return { ...state, scrollPosition: payload }
    default:
      return state
  }
}

const getPostsAC = (posts) => ({
  type: ActionTypes.SET_POSTS,
  payload: posts,
})

const getPostAC = (post) => ({
  type: ActionTypes.SET_POST,
  payload: post,
})

const setPostIdAC = (id) => ({
  type: ActionTypes.SET_POST_ID,
  payload: id,
})

export const setPostLikesCounterAC = (likes) => ({
  type: ActionTypes.SET_POST_LIKES_COUNTER,
  payload: likes,
})
export const togglePostLikeBihavior = (value) => ({
  type: ActionTypes.TOGGLE_POST_LIKE_BEHAVIOR,
  payload: value,
})

const setAuthorAC = (author) => ({
  type: ActionTypes.SET_AUTHOR,
  payload: author,
})

export const setScrollPositionAC = (position) => ({
  type: ActionTypes.SET_SCROLL_POSITION,
  payload: position,
})

export const getPosts =
  ({ perPage = 9, page = 1, search }) =>
  async (dispatch, getState) => {
    try {
      dispatch(toggleIsFetchingAC(true))
      const posts = await postsAPI.getPosts(perPage, (page - 1) * perPage, search)
      dispatch(getPostsAC(posts))
    } catch (error) {
      dispatch(addSnackbarMessageErrorAC(error.message))
    } finally {
      dispatch(toggleIsFetchingAC(false))
      const scrollY = getState().postsReducer.scrollPosition
      window.scrollTo(0, scrollY)
    }
  }

export const getPost = (id) => async (dispatch, getState) => {
  try {
    dispatch(toggleIsFetchingAC(true))
    const userId = getState().auth.user.id
    const response = await postsAPI.getPost({ id })
    dispatch(setPostIdAC(id))
    if (response.postedBy) {
      const author = await postsAPI.getAuthor(response.postedBy)
      dispatch(setAuthorAC(author))
    }
    dispatch(getPostAC(response))
    dispatch(setPostLikesCounterAC(getState().postsReducer.post.likes.length))
    dispatch(
      togglePostLikeBihavior(getState().postsReducer.post.likes.includes(userId))
    )
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  } finally {
    dispatch(toggleIsFetchingAC(false))
  }
}

export const setLike = (id) => async (dispatch, getState) => {
  try {
    const response = await postsAPI.setLike(id)
    if (response.status === 200) {
      const { postLikesBehavior } = getState().postsReducer
      dispatch(togglePostLikeBihavior(!getState().postsReducer.postLikesBehavior))

      const likes = postLikesBehavior
        ? getState().postsReducer.postLikesCounter - 1
        : getState().postsReducer.postLikesCounter + 1
      dispatch(setPostLikesCounterAC(likes))
    }
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  }
}
