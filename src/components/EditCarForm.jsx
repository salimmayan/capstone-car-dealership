import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditCarForm (props) {
  const firestore = useFirestore();
  const { car } = props;

  function handleEditCarFormSubmission(event) {
    event.preventDefault();
    props.onEditCar();
    const propertiesToUpdate = {
        carModel: event.target.carModel.value,
        Miles: event.target.Miles.value,
        Trim: event.target.Trim.value,
        Price: event.target.Price.value,
        Year: event.target.Year.value,
        BodyType: event.target.BodyType.value,
        Exterior: event.target.Exterior.value,
        MPG: event.target.MPG.value,
        Transmission: event.target.Transmission.value,
        VIN: event.target.VIN.value,
        Features: event.target.Features.value,
       // timeOpen: firestore.FieldValue.serverTimestamp()
    }
    return firestore.update({collection: 'Cars', doc: car.id }, propertiesToUpdate);
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditCarFormSubmission}
        buttonText="Update Car" />
    </React.Fragment>
  );
}

EditCarForm.propTypes = {
  onEditCar: PropTypes.func
};

export default EditCarForm;