import firebase from 'firebase'
// import "firebase/auth"
// import "firebase/storage"

const config = {
  
  // apiKey: "AIzaSyC7xZ89KwUENK7PuDNxpETFrxibjD2jqnY",
  // authDomain: "revenue-computation-system.firebaseapp.com",
  // projectId: "revenue-computation-system",
  // storageBucket: "revenue-computation-system.appspot.com",
  // messagingSenderId: "826229306158",
  // appId: "1:826229306158:web:de45f38829f64d63df40bf"

  apiKey: "AIzaSyBt-QGFRApOJHUQJy9x3AylvTst2GDfBT0",
  authDomain: "revenue-computation-syst-2aa96.firebaseapp.com",
  databaseURL: "https://revenue-computation-syst-2aa96-default-rtdb.firebaseio.com",
  projectId: "revenue-computation-syst-2aa96",
  storageBucket: "revenue-computation-syst-2aa96.appspot.com",
  messagingSenderId: "371833213220",
  appId: "1:371833213220:web:47ed4da45824b3706523b1"  

};

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
export const auth = firebase.auth()
export const db = firebase.database()
// export const storage = firebase.storage()
