import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
// import { createStore } from 'redux';  //"createStore" is a METHOD from library 'redux'
import { Provider } from 'react-redux';
// import reducer from './reducers/ticket-list-reducer';  //I created file "ticket-list-reducer.js" and now I am storing imported code in a varaible - "reducer" is a variable"
import rootReducer from './reducers/index';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase.js";
import reducer from './reducers/index';  //note that "reducer" is a file that contains a function with switch statements. It contians an initial state
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import middlewareLogger from './middleware/middleware-logger';
// import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer);
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware, middlewareLogger)));

const rrfProps = {
  firebase,
  config: {
    userProfile: "users"
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>   {/* pass the store into <Provider> as a prop */}
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />         {/* <App /> component is now a child of the <Provider> component. */}
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)

store.subscribe(() => {
  // console.log("INSIDE SUBSCRIBE"); 
  console.log(store.getState()); //Each time there's a change in the store, our subscription will be triggered, causing console.log to run
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
