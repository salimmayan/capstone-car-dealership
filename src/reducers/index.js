import formVisibleReducer from './form-visible-reducer';
import carListReducer from './car-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterCarList: carListReducer,
  // new line of code below
  firestore: firestoreReducer  //will handle the firestore state slice
});


export default rootReducer;
