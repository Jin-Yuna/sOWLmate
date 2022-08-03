const HOST = 'https://3.38.245.51:8080/api/v1/';
// const HOST = 'http://localhost:8080/api/v1/';

const ACCOUNTS = 'auth/';
const USERS = 'users/';
const INTEREST = 'interest/';
const CATEGORIS = 'categories/';

export default {
  users: {
    login: (id, password) =>
      HOST + ACCOUNTS + 'login' + `?id=${id}&password=${password}`,
    logout: () => HOST + ACCOUNTS + 'logout',
    info: (currentUser) => HOST + ACCOUNTS + 'info/' + `${currentUser}`,
    users: () => HOST + USERS,
    signup: (
      id,
      password,
      nickname,
      region,
      language,
      preferenceLanguage,
      name,
    ) =>
      HOST +
      'users' +
      `?id=${id}&password=${password}&nickname=${nickname}&region=${region}&language=${language}&preferenceLanguage=${preferenceLanguage}&name=${name}`,
    userInfoChange: (currentUser) => HOST + USERS + `${currentUser}`,
    nicknameCheck: (nickname) => HOST + USERS + 'nickname/' + `${nickname}`,
    profile: (currentUser) => HOST + USERS + 'profile/' + `${currentUser}`,
  },
  interests: {
    interestList: () => HOST + INTEREST + 'list',
    userInterest: (currentUser, interestName) =>
      HOST + INTEREST + `${currentUser}?title=${interestName}`,
  },
  categories: {
    language: () => HOST + CATEGORIS + 'language',
    region: () => HOST + CATEGORIS + 'region',
    interest: () => HOST + CATEGORIS + 'interest',
  },
};
