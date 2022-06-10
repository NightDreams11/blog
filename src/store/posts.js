import { postsAPI } from 'api/api'
import { toggleIsFetchingAC } from './auth'
import { addSnackbarMessageErrorAC } from './messages'

const ActionTypes = {
  SET_POSTS: 'SET_POSTS',
  SET_POST: 'SET_POST',
  SET_POST_ID: 'SET_POST_ID',
  SET_AUTHOR: 'SET_AUTHOR',
  SET_SCROLL_POSITION: 'SET_SCROLL_POSITION',
}

const initialState = {
  postsObj: null,
  post: null,
  postId: null,
  author: null,
  scrollPosition: null,
}

export const postsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_POSTS:
      return { ...state, postsObj: payload }
    case ActionTypes.SET_POST:
      return { ...state, post: payload }
    case ActionTypes.SET_POST_ID:
      return { ...state, postId: payload }
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
      dispatch(addSnackbarMessageErrorAC(error.response.data.error))
    } finally {
      dispatch(toggleIsFetchingAC(false))
      const scrollY = getState().postsReducer.scrollPosition
      window.scrollTo(0, scrollY)
    }
  }

export const getPost = (id) => async (dispatch) => {
  try {
    // dispatch(toggleIsFetchingAC(true))
    const response = await postsAPI.getPost({ id })
    dispatch(setPostIdAC(id))
    if (response.postedBy) {
      const author = await postsAPI.getAuthor(response.postedBy)
      dispatch(setAuthorAC(author))
    }
    dispatch(getPostAC(response))
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.response.data.error))
  } finally {
    // dispatch(toggleIsFetchingAC(false))
  }
}

export const setLike = (id) => async (dispatch) => {
  try {
    const response = await postsAPI.setLike(id)
    if (response.status === 200) {
      dispatch(getPost(id))
    }
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.response.data.error))
  }
}
