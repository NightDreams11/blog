import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

export const authAPI = {
  regUser(payload) {
    return instance.post('/users', payload)
  },

  loginUser(payload) {
    return instance.post('/auth', payload)
  },

  getUser(token) {
    return instance.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

export const profileAPI = {
  uploadAvatar(payload) {
    const formData = new FormData()
    formData.append('avatar', payload.file)
    return instance.put(`/users/upload/${payload.user.id}`, formData, {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  updateUser(payload) {
    return instance.patch(`/users/${payload.id.id}`, payload.user, {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    })
  },
}
