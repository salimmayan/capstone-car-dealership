import * as c from '../actions/ActionTypes';

export default (state = null, action) => {       
    const { userID } = action;
     switch (action.type) {       
        case c.CURRENT_USER_ID:
            return Object.assign({}, state, {
                    userID: userID
                  }
              );

        default:
            return state;
    }
};
