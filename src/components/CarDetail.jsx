import React from "react";
import PropTypes from "prop-types";

function CarDetail(props){
  const { carDetail, onClickingDelete, onClickingEdit } = props;
  
  return (
    <React.Fragment>
      {/* <h1>Car Detail COMPOENENT</h1> */}
      {/* <h3>{props.selectedCar.Year}</h3>
      <h3>{props.selectedCar.Price}</h3>
      <h3>{props.selectedCar.id}</h3>
      <h3>{props.selectedCar.Basics.BodyType}</h3>
      <h3>{props.selectedCar.Features}</h3> */}
      <img src={props.selectedCar.ImageURLs[0].value} alt=""></img>
      <button onClick={ props.onClickingEdit }>Update Car</button>
      {/* <button onClick={()=> onClickingDelete(carDetail.id) }>Delete Car</button> */}
      <button onClick={()=> props.onClickingDelete(props.selectedCar.id) }>Delete Car</button>
      
      <hr/>
    </React.Fragment>
  );
}

CarDetail.propTypes = {
  selectedCar: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default CarDetail;