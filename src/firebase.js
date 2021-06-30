import firebase from 'firebase/app'

import 'firebase/auth'

//bhowmickraj38
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDTK_MaQclKjnKav7oc4Pc3vxW2WhICfOc",
    authDomain: "yt-clone-27.firebaseapp.com",
    projectId: "yt-clone-27",
    storageBucket: "yt-clone-27.appspot.com",
    messagingSenderId: "818515021787",
    appId: "1:818515021787:web:5804ccf1d3ab1528b4e1fe",
    measurementId: "G-01DLY6KMPD"
  };

//rb941849
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAMmFnhIIIpjyax4JKlV_tOLNaVgGfj1Mk",
//   authDomain: "yt-demo-27.firebaseapp.com",
//   projectId: "yt-demo-27",
//   storageBucket: "yt-demo-27.appspot.com",
//   messagingSenderId: "617259400409",
//   appId: "1:617259400409:web:cb1e2ab70af437514d92c8",
//   measurementId: "G-817E94FDRC"
// };


firebase.initializeApp(firebaseConfig)

export default firebase.auth()