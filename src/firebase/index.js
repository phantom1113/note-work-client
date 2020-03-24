import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAbZfx2P46LzAyz-acezCUxMSLbkms0EW8",
  authDomain: "note-work-a05b4.firebaseapp.com",
  databaseURL: "https://note-work-a05b4.firebaseio.com",
  projectId: "note-work-a05b4",
  storageBucket: "note-work-a05b4.appspot.com",
  messagingSenderId: "347465768421",
  appId: "1:347465768421:web:bbf01db5217779ecad230c",
  measurementId: "G-DE2WSGMNRB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export {
  storage, firebase as default
}