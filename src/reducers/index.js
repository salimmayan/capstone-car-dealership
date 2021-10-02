import formVisibleReducer from './form-visible-reducer';
import carListReducer from './car-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import  headlinesReducer  from './headlines-reducer';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterCarList: carListReducer,
  headlines: headlinesReducer,
  // new line of code below
  firestore: firestoreReducer  //will handle the firestore state slice
});


export default rootReducer;
