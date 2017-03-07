import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAVxwmbQvfhNEnYjBRGQE8gh1zIb6CEBRA",
    authDomain: "kanban-board-react.firebaseapp.com",
    databaseURL: "https://kanban-board-react.firebaseio.com",
    storageBucket: "kanban-board-react.appspot.com",
    messagingSenderId: "175941260137"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
