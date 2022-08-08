// const HOST = 'https://3.38.245.51:8080/api/v1/';
const HOST = 'https://localhost:8080/api/v1/';
// const NODE = 'https://i7b308.p.ssafy.io:8443/';
const NODE = 'https://localhost:8443/';


const ACCOUNTS = 'auth/';
const USERS = 'users/';
const INTEREST = 'interest/';
const CATEGORIS = 'categories/';
const CONFERENCE = 'conference/';

export default {
  users: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    info: () => HOST + ACCOUNTS + 'info/',
    users: () => HOST + USERS,

    userList: () => HOST + USERS + 'list/',

    profile: () => HOST + USERS + 'profile/',
    changePassword: () => HOST + USERS + 'modifypw/', // 비밀번호 알고있을 때

    idCheck: () => HOST + USERS + 'exist/' + 'id/',
    nicknameCheck: () => HOST + USERS + 'exist/' + 'nickname/',
    idUsernameCheck: () => HOST + ACCOUNTS + 'findpw/',
    idEmailCheck: () => HOST + ACCOUNTS + 'exist/' + 'id/' + 'sendemail/',
    resetPassword: () => HOST + ACCOUNTS + 'findpw/' + 'sendemail/',
  },
  interests: {
    interestList: () => HOST + INTEREST + 'list/',
    userInterest: () => HOST + INTEREST,
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
      HOST +
      CONFERENCE +
      'list/' +
      'both?interest=' +
      `${interest}` +
      '&language=' +
      `${language}`,
    conferenceCreate: () => HOST + CONFERENCE + 'create/',
    conferenceEnter: () => HOST + CONFERENCE + 'enter/',
    conferenceDelete: () => HOST + CONFERENCE + 'exit/',
  },
  webRTC: {
    conferenceSend: (user1) => NODE + '?from=' + `${user1}` + '&to=',
    conferenceReceive: (user1, user2) =>
      NODE + '?from=' + `${user1}` + '&to=' + `${user2}`,
  },
};
