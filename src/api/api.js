import { postsAdapter } from 'adapters/postsAdapter'
import { userAdapter } from 'adapters/userAdapter'
import * as axios from 'axios'

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
  async getPosts(pageSize) {
    return postsAdapter(await instance.get(`/posts?limit=${pageSize}`))
  },
}
