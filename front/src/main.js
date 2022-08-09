import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import firebase from 'firebase/compat/app';
import googleAuth from './authentification';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

const gAuthOptions = {
  clientId: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
  scope: 'email',
  prompt: 'consent',
  fetch_basic_profile: true,
};
loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(googleAuth, gAuthOptions)
  .mount('#app');

// set auth config
const prompt = 'select_account';
const GoogleAuthConfig = Object.assign(
  { scope: 'profile email' },
  {
    clientId: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
    scope: 'profile email https://www.googleapis.com/auth/plus.login',
  },
);

// Install Vue plugin
app.config.globalProperties.$gAuth = googleAuth;
app.config.globalProperties.$gAuth.load(GoogleAuthConfig, prompt);
