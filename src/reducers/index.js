import formVisibleReducer from './like-button-reducer';
// import carListReducer from './car-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
// import  headlinesReducer  from './headlines-reducer';
import firestoreCarDataReducer from './firestore-car-data-reducer';
import isLoggedInReduxReducer from './logged-in-reducer';
import likeButtonReducer from './like-button-reducer';
import currentUserIDReducer from './current-user-id';

const rootReducer = combineReducers({
  // formVisibleOnPage: formVisibleReducer,
  // masterCarList: carListReducer,
  // headlines: headlinesReducer,
  // new line of code below
  //EACH STATE SLICE SHOUDL HAVE A REDUCER? store.getState() for reading from store and to write dispatch an action to store
  masterCarListRedux: firestoreCarDataReducer,
  firestore: firestoreReducer,  //will handle the firestore state slice
  isLoggedInRedux: isLoggedInReduxReducer,
  likeButton: likeButtonReducer,
  currentUserIDRedux: currentUserIDReducer
});


export default rootReducer;
