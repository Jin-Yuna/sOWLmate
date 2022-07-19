const HOST = 'http://127.0.0.1:8000/'

const USERS = 'dj-rest-auth/'

export default {
  users: {
    login: () => HOST + USERS + 'login/',
  }
}