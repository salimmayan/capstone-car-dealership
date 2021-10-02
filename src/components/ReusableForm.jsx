import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function ReusableForm(props) {
  const firestore = useFirestore();
  return (
    <React.Fragment>
      <h1>I am in ResuableForm</h1>
      <form onSubmit={props.formSubmissionHandler}>
      {/* const carMake = e.target.carMake.value;
    const carModel = e.target.carModel.value;
    const Miles = e.target.Miles.value;
    const Trim = e.target.Trim.value;
    const Price = e.target.Price.value;
    const Year = e.target.Year.value;
    const BodyType = e.target.BodyType.value;
    const Engine = e.target.Engine.value;
    const Exterior = e.target.Exterior.value;
    const MPG = e.target.MPG.value;
    const Transmission = e.target.Transmission.value;
    const VIN = e.target.VIN.value;
    const Features = e.target.Features.value; */}

        <input type='text' name='carModel' placeholder='Car Model' />
        <input type='text' name='Miles' placeholder='Miles' />
        <input type='text' name='Trim' placeholder='Car Trim' />
        <input type='text' name='Price' placeholder='Price' />
        <input type='text' name='Year' placeholder='Car Year' />
        <input type='text' name='BodyType' placeholder='BodyType' />
        <input type='text' name='Exterior' placeholder='Car Exterior' />
        <input type='text' name='MPG' placeholder='MPG' />
        <input type='text' name='Transmission' placeholder='Car Transmission' />
        <input type='text' name='VIN' placeholder='VIN' />
        <input type='text' name='Features' placeholder='Car Features' />
       
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;