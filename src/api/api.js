import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'http://51.158.179.21/api/v1',
})

export const authAPI = {
  regUser(payload) {
    return instance.post('/users', payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  },

  loginUser(payload) {
    return instance.post('/auth', payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  },
}
