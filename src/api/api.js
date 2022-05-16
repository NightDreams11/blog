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
