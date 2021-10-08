import * as c from '../actions/ActionTypes';

export default (state = false, action) => {
    // console.log("INSIDE LOGGED-IN-REDUCER - BEFORE state is ...");
    // console.log(state);
    switch (action.type) {
        case c.TOGGLE_LOGIN:
            // console.log("INSIDE LOGGED-IN-REDUCER - INSIDE TOGGLE_LOGIN SWITCH");
            return !state;
            default:
                // console.log("INSIDE LOGGED-IN-REDUCER - INSIDE DEFAULT SWITCH");
            return state;
    }
    // console.log("INSIDE LOGGED-IN-REDUCER - AFTER state is ...");
    // console.log(state);
};
