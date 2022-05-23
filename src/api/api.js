import * as axios from 'axios'

const token = JSON.parse(localStorage.getItem('token'))

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

instance.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${token}`
  return request
})

export const authAPI = {
  regUser(payload) {
    return instance.post('/users', payload)
  },

  loginUser(payload) {
    return instance.post('/auth', payload)
  },

  getUser() {
    return instance.get('/auth/user')
  },
}

export const profileAPI = {
  uploadAvatar({ file, id }) {
    const formData = new FormData()
    formData.append('avatar', file)
    return instance.put(`/users/upload/${id}`, formData)
  },

  updateUser({ user, id }) {
    return instance.patch(`/users/${id}`, user)
  },

  deleteUser({ id }) {
    return instance.delete(`/users/${id}`)
  },
}
