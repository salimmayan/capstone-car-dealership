import * as c from '../actions/ActionTypes';

export default (state = false, action) => {
    console.log("INSIDE FORM-VISIBLE REDUCER - state is ...");
    console.log(state);
    switch (action.type) {
        case c.TOGGLE_FORM:
            return !state;
            default:
            return state;
    }
};
