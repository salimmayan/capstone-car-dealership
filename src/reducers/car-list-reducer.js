import * as c from '../actions/ActionTypes';

export default (state = {}, action) => {
    console.log("in reducer - defautl state is ");
    console.log(state);
    const { names, location, issue, id, formattedWaitTime, timeOpen } = action;
    switch (action.type) {
        case c.ADD_Car:
            return Object.assign({}, state, {
                [id]: {
                  names: names,
                  location: location,
                  issue: issue,
                  id: id,
                  timeOpen: timeOpen,
                  formattedWaitTime: formattedWaitTime
                }
              });

        case c.DELETE_Car:
            let newState = { ...state };
            delete newState[id];
            return newState;

        case c.UPDATE_TIME:
            const newCar = Object.assign({}, state[id], { formattedWaitTime });
            const updatedState = Object.assign({}, state, {
                [id]: newCar
            });
            console.log("updatedState is");
            console.log(updatedState);
            return updatedState;

        default:
            return state;
    }
};
