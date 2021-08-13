// const firebase = require('firebase/app');

import firebase from'firebase/app';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBzis3Y1LeUGi1FfQcvkZvk6I-ukTLrx9o",
    authDomain: "tny-jira-pointing-tool-2.firebaseapp.com",
    databaseURL: "https://tny-jira-pointing-tool-2.firebaseio.com",
    projectId: "tny-jira-pointing-tool-2",
    storageBucket: "tny-jira-pointing-tool-2.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "1:168714627283:web:3c88b74e5bdae950158c26"
  };

  export default function firebaseClient() {
      if(!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG)
      }
  }