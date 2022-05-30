import { postsAPI } from 'api/api'

const ActionTypes = {
  SET_POSTS: 'SET_POSTS',
}

const initialState = {
  postsObj: null,
  pageSize: 9,
}

export const postsReducer = (state = initialState, { type, payload = 0 }) => {
  switch (type) {
    case ActionTypes.SET_POSTS:
      return { ...state, postsObj: payload }

    default:
      return state
  }
}

const getPostsAC = (posts) => ({
  type: ActionTypes.SET_POSTS,
  payload: posts,
})

export const getPosts = () => async (dispatch) => {
  const posts = await postsAPI.getPosts()
  dispatch(getPostsAC(posts))
}
