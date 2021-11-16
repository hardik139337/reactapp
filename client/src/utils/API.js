import axios from 'axios'

export default {
  register(data) {
    return axios.post('https://api712217.herokuapp.com/auth/register', data)
  },
  login(data) {
    return axios.post('https://api712217.herokuapp.com/auth/login', data)
  },
  loadUser(headers) {
    return axios.get('https://api712217.herokuapp.com/auth/user', headers)
  },
}
