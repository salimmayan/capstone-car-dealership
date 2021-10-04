import React from "react";
import PropTypes from "prop-types";
import Car from "./Car";

import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Container, Row, Col } from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';

function CarList(props) {
  // The useFirestoreConnect() hook comes from react-redux-firebase.
  useFirestoreConnect([
    { collection: 'car' }
  ]);

  // The useSelector() hook comes from react-redux.
  const cars = useSelector(state => state.firestore.ordered.car);
  console.log("Car List component: cars are ");
  console.log(cars);
  // react-redux-firebase also offers a useful isLoaded() function.
  if (isLoaded(cars)) {
    return (

      // <React.Fragment>
        <Row>
         
        
          {/* <h1>Car List component</h1> */}
          {props.carList.map((currentCar) => {
            return <Car
              whenCarClicked={props.onCarSelection}
              ImageURL={currentCar.ImageURLs[0].value}
              Miles={currentCar.Miles}
              Make={currentCar.Make}
              Trim={currentCar.Trim}
              Price={currentCar.Price}
              Year={currentCar.Year}
              id={currentCar.id}
              key={currentCar.timeOpen} />
          })}
        
        
        </Row>
      // </React.Fragment>
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