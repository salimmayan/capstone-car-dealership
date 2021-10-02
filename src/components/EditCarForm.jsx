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
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value
    }
    return firestore.update({collection: 'cars', doc: car.id }, propertiesToUpdate);
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