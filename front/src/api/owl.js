const HOST = 'http://127.0.0.1:8000/'

const ACCOUNTS = 'dj-rest-auth/'

export default {
  users: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
  }
}