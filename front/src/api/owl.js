const HOST = 'http://3.38.245.51:8000/api/v1/';

const ACCOUNTS = 'auth/';

export default {
  users: {
    login: () => HOST + ACCOUNTS + 'login',
    logout: () => HOST + ACCOUNTS + 'logout/',
  },
};
