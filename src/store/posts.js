import { authAPI, postsAPI } from 'api/api'
import { addSnackbarMessageErrorAC } from './messages'

const ActionTypes = {
  SET_POSTS: 'SET_POSTS',
  SET_POST: 'SET_POST',
  SET_POST_LIKES_COUNTER: 'SET_POST_LIKES_COUNTER',
  TOGGLE_POSTS_IS_FETCHING: 'TOGGLE_POSTS_IS_FETCHING',
  SET_AUTHOR: 'SET_AUTHOR',
  SET_SCROLL_POSITION: 'SET_SCROLL_POSITION',
}

const initialState = {
  postsObj: null,
  post: null,
  author: null,
  scrollPosition: null,
  postLikesCounter: null,
  postsIsFetching: false,
}

export const postsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_POSTS:
      return { ...state, postsObj: payload }
    case ActionTypes.SET_POST:
      return { ...state, post: payload }
    case ActionTypes.SET_POST_LIKES_COUNTER:
      return {
        ...state,
        post: { ...state.post, likes: [...payload] },
      }
    case ActionTypes.TOGGLE_POSTS_IS_FETCHING:
      return { ...state, postsIsFetching: payload }
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

export const setPostLikesCounterAC = (likes) => ({
  type: ActionTypes.SET_POST_LIKES_COUNTER,
  payload: likes,
})

export const togglePostsIsFetchingAC = (value) => ({
  type: ActionTypes.TOGGLE_POSTS_IS_FETCHING,
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
      dispatch(togglePostsIsFetchingAC(true))
      const posts = await postsAPI.getPosts(perPage, (page - 1) * perPage, search)
      dispatch(getPostsAC(posts))
    } catch (error) {
      dispatch(addSnackbarMessageErrorAC(error.message))
    } finally {
      dispatch(togglePostsIsFetchingAC(false))
      const scrollY = getState().postsReducer.scrollPosition
      window.scrollTo(0, scrollY)
    }
  }

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch(togglePostsIsFetchingAC(true))
    const response = await postsAPI.getPost({ id })

    if (response.postedBy) {
      const author = await authAPI.getAuthor(response.postedBy)
      dispatch(setAuthorAC(author))
    }
    dispatch(getPostAC(response))
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  } finally {
    dispatch(togglePostsIsFetchingAC(false))
  }
}

export const setLike = (id) => async (dispatch, getState) => {
  try {
    const response = await postsAPI.setLike(id)
    if (response.status === 200) {
      const userId = getState().auth.user.id
      const isLiked = getState().postsReducer.post.likes.includes(userId)
      const [...likes] = getState().postsReducer.post.likes

      if (isLiked) {
        const currentLikes = likes.filter((item) => {
          return item !== userId
        })
        dispatch(setPostLikesCounterAC(currentLikes))
      } else {
        likes.push(userId)
        dispatch(setPostLikesCounterAC(likes))
      }
    }
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  }
}
