const HOST = 'http://localhost:8000/api/v1/'

const ACCOUNTS = 'auth/'

export default {
  users: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
  }
}