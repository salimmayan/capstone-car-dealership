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