import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import LoginForm from './login';
// import SignupForm from './signup';
import { Route,BrowserRouter as Router } from 'react-router-dom';

const firebase = require ("firebase");
require("firebase/firestore");

firebase.initializeApp( {
    apiKey: "AIzaSyDkTX8_GVuGqvBrAp8ZGst_O6K-MMZSXYM",
    authDomain: "photogram-fd1ad.firebaseapp.com",
    databaseURL: "https://photogram-fd1ad.firebaseio.com",
    projectId: "photogram-fd1ad",
    storageBucket: "photogram-fd1ad.appspot.com",
    messagingSenderId: "239861675924",
    appId: "1:239861675924:web:cce1547827c584ae"
  })

//   const lol =(
//       <div>
//           hey
//       </div>
//   )

//   const routing =(
//      <Router><div>
//         <Route exact path='/' component ={LoginForm}></Route> 
//         <Route exact path='/signup' component ={SignupForm}></Route> 
//         <Route exact path='/dashboard' component ={lol}></Route> 
//       </div>
//       </Router> 
//   )

ReactDOM.render(<Router><Route path="/" component={App}/></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
