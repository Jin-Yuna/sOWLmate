// const HOST = 'https://3.38.245.51:8080/api/v1/';
const HOST = 'https://localhost:8080/api/v1/';

const ACCOUNTS = 'auth/';
const USERS = 'users/';
const INTEREST = 'interest/';
const CATEGORIS = 'categories/';
const CONFERENCE = 'conference/';

export default {
  users: {
    login: (id, password) =>
      HOST + ACCOUNTS + 'login' + `?id=${id}&password=${password}`,
    logout: () => HOST + ACCOUNTS + 'logout/',
    info: (currentUser) => HOST + ACCOUNTS + 'info/' + `${currentUser}/`,
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
    userInfoChange: (currentUser) => HOST + USERS + `${currentUser}/`,
    idCheck: () => HOST + USERS + 'exist/' + 'id',
    nicknameCheck: (nickname) => HOST + USERS + 'nickname/' + `${nickname}/`,
    idNicknameCheck: () => HOST + ACCOUNTS + 'findpw',
    resetPassword: () => HOST + ACCOUNTS + 'findpw/' + 'sendemail',
  },
  interests: {
    interestList: () => HOST + INTEREST + 'list/',
    userInterest: (currentUser, interestName) =>
      HOST + INTEREST + `${currentUser}?title=${interestName}`,
  },
  categories: {
    language: () => HOST + CATEGORIS + 'language/',
    region: () => HOST + CATEGORIS + 'region/',
    interest: () => HOST + CATEGORIS + 'interest/',
  },
  conference: {
    conferenceList: () => HOST + CONFERENCE + 'list/',
    conferenceInsterestList: (interest) =>
      HOST + CONFERENCE + 'list/' + `${interest}`,
    conferenceLanguageList: (language) =>
      HOST + CONFERENCE + 'list/' + `${language}`,
    conferenceInterestLanguageList: (interest, language) =>
      HOST + CONFERENCE + 'list/' + `${interest}` + `${language}`,
    conferenceCreate: () => HOST + CONFERENCE + 'create/',
    conferenceEnter: () => HOST + CONFERENCE + 'enter/',
    conferenceDelete: () => HOST + CONFERENCE + 'exit/',
  },
};
