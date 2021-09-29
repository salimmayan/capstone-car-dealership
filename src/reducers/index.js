// import formVisibleReducer from './form-visible-reducer';
// import ticketListReducer from './ticket-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
//   formVisibleOnPage: formVisibleReducer,  //state slice is "formVisibleOnPage" and pairing reducer is "formVisibleReducer"
//   masterTicketList: ticketListReducer,    //state slice is "masterTicketList" and pairing reducer is "ticketListReducer"
  firestore: firestoreReducer  //will handle the firestore state slice
});


export default rootReducer;
