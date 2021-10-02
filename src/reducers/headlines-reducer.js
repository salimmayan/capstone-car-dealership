import * as c from './../actions/ActionTypes';

// const defaultState = {
//     isLoading: false,
//     headlines: [],
//     error: null
// }

// export default (state = defaultState, action) => {
//     return state;
// };

let initialState = {
    isLoading: false,
    headlines: [],
    error: null
}

export default (state = initialState, action) => {
    console.log("INSIDE HEADLINE REDUCER - state is ...");
    console.log(state);
    switch (action.type) {

        case c.GET_HEADLINES_SUCCESS:
            console.log("INSIDE SWTICH of HEADLINE REDUCER - GET_HEADLINES_SUCCESS");
            return Object.assign({}, state, {  //two objects here - empty object object will get "state" obj's properties and then previously-empty's obj's one property (IsLoading ) will get altered
                isLoading: false,
                headlines: action.headlines
            });

        case c.REQUEST_HEADLINES:
            console.log("INSIDE SWTICH of HEADLINE REDUCER -  REQUEST_HEADLINE");
            return Object.assign({}, state, {  //two objects here - empty object object will get "state" obj's properties and then previously-empty's obj's one property (IsLoading ) will get altered
                isLoading: true
            });

        case c.GET_HEADLINES_FAILURE:
            return Object.assign({}, state, {  //two objects here - empty object object will get "state" obj's properties and then previously-empty's obj's one property (IsLoading ) will get altered
                isLoading: false,
                headlines: [],
                error: action.error
            });

        default:
            return state;
    }
};