// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCcCWs1TbxcdPRoWo72AL7PjU9t4EL5ksw",
    authDomain: "covid-19-tracker-1c12c.firebaseapp.com",
    databaseURL: "https://covid-19-tracker-1c12c.firebaseio.com",
    projectId: "covid-19-tracker-1c12c",
    storageBucket: "covid-19-tracker-1c12c.appspot.com",
    messagingSenderId: "896663019998",
    appId: "1:896663019998:web:f161fd4ff9dd237257fd4f",
    measurementId: "G-WFWTK04JJK"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();