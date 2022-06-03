import { postsAPI } from 'api/api'
import { toggleIsFetchingAC } from './auth'
import { addSnackbarMessageErrorAC } from './messages'

const ActionTypes = {
  SET_POSTS: 'SET_POSTS',
  SET_SCROLL_POSITION: 'SET_SCROLL_POSITION',
}

const initialState = {
  postsObj: null,
  scrollPosition: null,
}

export const postsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_POSTS:
      return { ...state, postsObj: payload }
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

export const setScrollPositionAC = (position) => ({
  type: ActionTypes.SET_SCROLL_POSITION,
  payload: position,
})

export const getPosts =
  (pageSize = 9, skipPosts = 0, search) =>
  async (dispatch, getState) => {
    try {
      dispatch(toggleIsFetchingAC(true))
      const posts = await postsAPI.getPosts(pageSize, skipPosts, search)
      dispatch(getPostsAC(posts))
    } catch (error) {
      dispatch(addSnackbarMessageErrorAC(error.response.data.error))
    } finally {
      dispatch(toggleIsFetchingAC(false))
      const scrollY = getState().postsReducer.scrollPosition
      window.scrollTo(0, scrollY)
    }
  }
