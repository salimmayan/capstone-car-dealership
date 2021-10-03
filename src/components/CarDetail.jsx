import React from "react";
import PropTypes from "prop-types";

function CarDetail(props){
  const { carDetail, onClickingDelete, onClickingEdit } = props;
  
  return (
    <React.Fragment>
      <h1>Car Detail</h1>
      <h3>{carDetail.Year}</h3>
      <h3>{carDetail.Price}</h3>
      <h3>{carDetail.id}</h3>
      <h3>{carDetail.Basics.BodyType}</h3>
      <h3>{carDetail.Features}</h3>
      <img src={carDetail.ImageURLs[0].value} alt=""></img>
      <button onClick={ onClickingEdit }>Update Car</button>
      {/* <button onClick={()=> onClickingDelete(carDetail.id) }>Delete Car</button> */}
      <button onClick={()=> onClickingDelete(carDetail.id) }>Delete Car</button>
      
      <hr/>
    </React.Fragment>
  );
}

CarDetail.propTypes = {
  carDetail: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default CarDetail;