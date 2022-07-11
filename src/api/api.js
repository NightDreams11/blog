import { commentsAdapter } from 'adapters/commentsAdapter'
import { postAdapter } from 'adapters/postAdapter'
import { postsAdapter } from 'adapters/postsAdapter'
import { userAdapter } from 'adapters/userAdapter'
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

instance.interceptors.request.use((request) => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

export const authAPI = {
  regUser(payload) {
    return instance.post('/users', payload)
  },

  loginUser(payload) {
    return instance.post('/auth', payload)
  },

  async getUser() {
    return userAdapter(await instance.get('/auth/user'))
  },

  async getAuthor(id) {
    return userAdapter(await instance.get(`/users/${id}`))
  },
}

export const profileAPI = {
  async uploadAvatar({ file, id }) {
    const formData = new FormData()
    formData.append('avatar', file)
    return userAdapter(await instance.put(`/users/upload/${id}`, formData))
  },

  async updateUser({ user, id }) {
    return userAdapter(await instance.patch(`/users/${id}`, user))
  },

  deleteUser({ id }) {
    return instance.delete(`/users/${id}`)
  },
}

export const postsAPI = {
  async getPosts(pageSize, skipPosts, search) {
    if (search) {
      return postsAdapter(
        await instance.get(`/posts`, {
          params: {
            limit: pageSize,
            skip: skipPosts,
            search,
          },
        })
      )
    }
    return postsAdapter(
      await instance.get(`/posts?limit=${pageSize}&skip=${skipPosts}`)
    )
  },

  async getPost({ id }) {
    return postAdapter(await instance.get(`/posts/${id}`))
  },

  async createPost(payload) {
    return postAdapter(await instance.post('/posts', payload))
  },

  setLike(id) {
    return instance.put(`/posts/like/${id}`)
  },
}

export const commentsAPI = {
  async getComments(id) {
    return commentsAdapter(await instance.get(`/comments/post/${id}`))
  },

  setLike(id) {
    return instance.put(`/comments/like/${id}`)
  },

  async createComment({ postId, followedCommentID, comment }) {
    const response = await instance.post(`/comments/post/${postId}`, {
      text: comment,
      followedCommentID,
    })
    return response
  },

  editComment({ commentId, text }) {
    return instance.patch(`/comments/${commentId}`, { text })
  },

  deleteComment(commentId) {
    return instance.delete(`/comments/${commentId}`)
  },
}
