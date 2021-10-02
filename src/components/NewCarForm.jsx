import React from "react";
// import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
// import Moment from 'moment';
import { useFirestore } from 'react-redux-firebase'

function NewCarForm(props) {
  const firestore = useFirestore();

  // function handleNewCarFormSubmission(event) {
  function addCarToFirestore(event) {
    event.preventDefault();
    // props.onNewCarCreation({
    // names: event.target.names.value, 
    // location: event.target.location.value, 
    // issue: event.target.issue.value, 
    // id: v4(),  
    // timeOpen: new Moment(),
    // formattedWaitTime: new Moment().fromNow(true)});
    props.onNewCarCreation();

    // Here's how we will actually add a Car to Firestore.

    return firestore.collection('Cars').add(
      {
        names: event.target.names.value,
        location: event.target.location.value,
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }

  return (
    <React.Fragment>
      <h1>I am in NewCarform</h1>
      <ReusableForm
        // formSubmissionHandler={handleNewCarFormSubmission}
        formSubmissionHandler={addCarToFirestore}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewCarForm.propTypes = {
  onNewCarCreation: PropTypes.func
};

export default NewCarForm;