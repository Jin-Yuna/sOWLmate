const HOST = "https://3.38.245.51:8080/api/v1/";

const ACCOUNTS = "auth/";
const USERS = "users/";
const INTEREST = "interest/";

export default {
  users: {
    login: () => HOST + ACCOUNTS + "login",
    logout: () => HOST + ACCOUNTS + "logout/",
    info: (currentUser) => HOST + ACCOUNTS + "info/" + `${currentUser}/`,
    users: () => HOST + USERS,
    userInfoChange: (currentUser) => HOST + USERS + `${currentUser}/`,
    nicknameCheck: (nickname) => HOST + USERS + "nickname/" + `${nickname}/`,
  },
  interests: {
    interestList: () => HOST + INTEREST + "list/",
    userInterest: (currentUser, interestName) => HOST + INTEREST + `${currentUser}?=title=${interestName}/`,
  },
};