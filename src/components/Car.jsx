import React from "react";
import PropTypes from "prop-types";

function Car(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenCarClicked(props.id)}>
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <p><em>{props.formattedWaitTime}</em></p>
      </div>
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