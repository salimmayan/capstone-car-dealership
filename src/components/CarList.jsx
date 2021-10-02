import React from "react";
import PropTypes from "prop-types";
import Car from "./Car";

import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';


function CarList(props){
  // The useFirestoreConnect() hook comes from react-redux-firebase.
  useFirestoreConnect([
    { collection: 'cars' }
  ]);

  // The useSelector() hook comes from react-redux.
  const cars = useSelector(state => state.firestore.ordered.cars);

  // react-redux-firebase also offers a useful isLoaded() function.
  if (isLoaded(cars)) {
    return (
      <React.Fragment>
        <hr/>
        {cars.map((car) => {
          return <Car
            whenCarClicked = { props.onCarSelection }
            names={car.names}
            location={car.location}
            issue={car.issue}
            formattedWaitTime={car.formattedWaitTime}
            id={car.id}
            key={car.id}/>
        })}
      </React.Fragment>
    );
  // If the cars aren't loaded yet, our fragment will return a "Loading..." message.
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

CarList.propTypes = {
  // carList: PropTypes.array,
  // carList: PropTypes.object,
  onCarSelection: PropTypes.func
};

export default CarList;