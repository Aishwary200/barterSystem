import firebase from 'firebase/app';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyALzR9DMFQZDaw9jWQxh3nFvv85XojUd-Q",
    authDomain: "bartersystem-ce131.firebaseapp.com",
    projectId: "bartersystem-ce131",
    storageBucket: "bartersystem-ce131.appspot.com",
    messagingSenderId: "396426978200",
    appId: "1:396426978200:web:4f4e7a694b90a26f7dc1ed"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore()