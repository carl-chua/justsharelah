import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCYf-0-MKBW5-N8gA15E9cpKrYLENxbl2g",
    authDomain: "justsharelah.firebaseapp.com",
    databaseURL: "https://justsharelah.firebaseio.com",
    projectId: "justsharelah",
    storageBucket: "justsharelah.appspot.com",
    messagingSenderId: "344804176098",
    appId: "1:344804176098:web:6e4163aaf6bf97f45deebb",
    measurementId: "G-9EXSXLX51M"
  };

  firebase.initializeApp(config)

  export default firebase;