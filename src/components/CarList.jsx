import React from "react";
import PropTypes from "prop-types";
import Car from "./Car";

import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';


function CarList(props){
  // The useFirestoreConnect() hook comes from react-redux-firebase.
  useFirestoreConnect([
    { collection: 'Cars' }
  ]);

  // The useSelector() hook comes from react-redux.
  const cars = useSelector(state => state.firestore.ordered.Cars);
  console.log("Car List component: cars are ");
  console.log(cars);
  // react-redux-firebase also offers a useful isLoaded() function.
  if (isLoaded(cars)) {
    return (
      <React.Fragment>
        <h1>Car List component</h1>
        <hr/>
        {cars.map((car) => {
          return <Car
            whenCarClicked = { props.onCarSelection }
            carModel={car.carModel}
            Miles={car.Miles}
            Trim={car.Trim}
            Price={car.Price}
            Year={car.Year}
            BodyType={car.BodyType}
            Exterior={car.Exterior}
            MPG={car.MPG}
            Transmission={car.Transmission}
            VIN={car.VIN}
            Features={car.Features}
            key={car.timeOpen}/>
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