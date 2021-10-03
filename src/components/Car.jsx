import React from "react";
import PropTypes from "prop-types";

function Car(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenCarClicked(props.id)}>
        <h3>{props.carModel} - {props.Miles}</h3>
   
      </div>

      {/* whenCarClicked = { props.onCarSelection }
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
            key={car.timeOpen}/> */}

      <hr/>
    </React.Fragment>
  );
}

Car.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
  id: PropTypes.string,
  whenCarClicked: PropTypes.func,
  formattedWaitTime: PropTypes.string
};

export default Car;