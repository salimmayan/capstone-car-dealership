import React from "react";
import PropTypes from "prop-types";

function CarDetail(props){
  const { car, onClickingDelete } = props;
  
  return (
    <React.Fragment>
      <h1>Car Detail</h1>
      <h3>{car.location} - {car.names}</h3>
      <p><em>{car.issue}</em></p>
      <button onClick={ props.onClickingEdit }>Update Car</button>
      <button onClick={()=> onClickingDelete(car.id) }>Close Car</button>
      <hr/>
    </React.Fragment>
  );
}

CarDetail.propTypes = {
  car: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default CarDetail;