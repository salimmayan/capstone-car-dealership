import * as c from '../actions/ActionTypes';

export default (state = {}, action) => {       
    const { fireStoreData, id } = action;
    //  console.log("INSIDE CAR-LIST REDUCER - state is ...");
    //  console.log(state);
    // type: 'ADD_FIRESTOREDATA',
    //       fireStoreData: cars,

     switch (action.type) {       
        case c.ADD_FIRESTORE_DATA:
            return Object.assign({}, state, {
                [id]: {
                    fireStoreData: fireStoreData
                  }
              });

        default:
            return state;
    }
};
