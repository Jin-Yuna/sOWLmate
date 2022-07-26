const HOST = 'http://localhost:8000/api/v1/'

const ACCOUNTS = 'auth/'
const USERS = 'users/'
const INTEREST = 'interest/'

export default {
  users: {
    login: () => HOST + ACCOUNTS + 'login',
    logout: () => HOST + ACCOUNTS + 'logout/',
    info: (currentUser) => HOST + ACCOUNTS + 'info/' + `${currentUser}/`,
    users: () => HOST + USERS,
    userInfoChange: (currentUser) => HOST + USERS + `${currentUser}/`,
    nicknameCheck: () => HOST + USERS + 'nickname/',
  },
  interests: {
    interestList: () => HOST + INTEREST + 'list/',
    userInterest: (currentUser, interestName) => HOST + INTEREST + `${currentUser}?=title=${interestName}/`
  }
}