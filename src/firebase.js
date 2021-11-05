// import firebase from "firebase/compat/app"
// import "firebase/compat/auth"

// const app = firebase.initializeApp({

//   apiKey: process.env.APIKEY,
//   authDomain: process.env.AUTHDOMAIN,
//   projectId: process.env.PROJECTID,
//   storageBucket: process.env.STORAGEBUCKET,
//   messagingSenderId: process.env.MESSAGINGSENDERID,
//   appId: process.env.APPID
// })


// export const auth = app.auth()
// export default app

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4qufPEMs-6TCMb8a2TVz7qung8UOXyPg",
  authDomain: "movieapp-7e68e.firebaseapp.com",
  projectId: "movieapp-7e68e",
  storageBucket: "movieapp-7e68e.appspot.com",
  messagingSenderId: "872624417536",
  appId: "1:872624417536:web:5869f80686b4944f9621e5"
};


export const app = firebase.initializeApp(firebaseConfig);

