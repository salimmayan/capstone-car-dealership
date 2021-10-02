import * as c from './ActionTypes';

export const deleteCar = id => ({
  type: c.DELETE_Car,
  id
});

export const toggleForm = () => ({
  type: c.TOGGLE_FORM  //resolves to "type: 'TOGGLE_FORM'""
});

// export const addCar = (car) => {
//   const { names, location, issue, id, formattedWaitTime, timeOpen } = car;
//   return {
//     type: c.ADD_Car,
//     names: names,
//     location: location,
//     issue: issue,
//     id: id,
//     formattedWaitTime,
//     timeOpen: timeOpen
//   }
// }

export const updateTime = (id, formattedWaitTime) => ({
  type: c.UPDATE_TIME,
  id: id,
  formattedWaitTime: formattedWaitTime
});


export const requestHeadlines = () => ({
  type: c.REQUEST_HEADLINES,
  error: null
});

export const getHeadlinesSuccess = (headlines) => ({
  type: c.GET_HEADLINES_SUCCESS,
  headlines
});

export const getHeadlinesFailure = (error) => ({
  type: c.GET_HEADLINES_FAILURE,
  error
});

export const makeApiCall = () => {
  return dispatch => {
    console.log("Inside makeApiCall() - about to dispatch requestHeadlines()");
    dispatch(requestHeadlines());
    console.log("Inside makeApiCall() - about to call fetch()");
    return fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          dispatch(getHeadlinesSuccess(jsonifiedResponse.results));
        })
      .catch((error) => {
        dispatch(getHeadlinesFailure(error));
      });
  }
}