import { authAPI, postsAPI } from 'api/api'
import { addSnackbarMessageErrorAC, addSnackbarMessageSuccessAC } from './messages'

const ActionTypes = {
  SET_POSTS: 'SET_POSTS',
  SET_POST: 'SET_POST',
  SET_POST_IMAGE: 'SET_POST_IMAGE',
  SET_POST_LIKES_COUNTER: 'SET_POST_LIKES_COUNTER',
  SET_CREATED_POSTS_ID: 'SET_CREATED_POSTS_ID',
  TOGGLE_POSTS_IS_FETCHING: 'TOGGLE_POSTS_IS_FETCHING',
  SET_AUTHOR: 'SET_AUTHOR',
  SET_SCROLL_POSITION: 'SET_SCROLL_POSITION',
}

const initialState = {
  postsObj: null,
  post: null,
  createdPostsId: null,
  author: null,
  scrollPosition: null,
  postLikesCounter: null,
  postsIsFetching: false,
  previevPostImage: null,
}

export const postsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_POSTS:
      return { ...state, postsObj: payload }
    case ActionTypes.SET_POST:
      return { ...state, post: payload }
    case ActionTypes.SET_CREATED_POSTS_ID:
      return { ...state, createdPostsId: payload }
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
    case ActionTypes.SET_POST_IMAGE:
      return {
        ...state,
        previevPostImage: { file: payload.file, imageUrl: payload.imageUrl },
      }
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

const setCreatedPostsIdAC = (id) => ({
  type: ActionTypes.SET_CREATED_POSTS_ID,
  payload: id,
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

export const setPostImageAC = (file, imageUrl) => ({
  type: ActionTypes.SET_POST_IMAGE,
  payload: { file, imageUrl },
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

export const createPost =
  ({ payload }) =>
  async (dispatch) => {
    try {
      dispatch(togglePostsIsFetchingAC(true))
      const response = await postsAPI.createPost({ payload })
      if (response.id) {
        dispatch(getPosts({}))
        dispatch(setCreatedPostsIdAC(response.id))
      }
    } catch (error) {
      dispatch(addSnackbarMessageErrorAC(error.message))
    } finally {
      dispatch(togglePostsIsFetchingAC(false))
    }
  }

export const updatePostPhoto =
  ({ id, file }) =>
  async (dispatch) => {
    try {
      const response = await postsAPI.updatePostPhoto({ id, file })
      if (response.status === 200) {
        dispatch(getPosts({}))
        dispatch(addSnackbarMessageSuccessAC('Photo was updated'))
      }
    } catch (error) {
      dispatch(addSnackbarMessageErrorAC(error.message))
    }
  }

export const setLike = (id) => async (dispatch, getState) => {
  try {
    const response = await postsAPI.setLike(id)
    if (response.status === 200) {
      const userId = getState().auth.user.id
      const userIndex = getState().postsReducer.post.likes.indexOf(userId)
      const isLiked = userIndex !== -1
      const { likes } = getState().postsReducer.post

      if (isLiked) {
        likes.splice(userIndex, 1)
        dispatch(setPostLikesCounterAC(likes))
      } else {
        likes.push(userId)
        dispatch(setPostLikesCounterAC(likes))
      }
    }
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await postsAPI.deletePost(id)
  } catch (error) {
    dispatch(addSnackbarMessageErrorAC(error.message))
  }
}
