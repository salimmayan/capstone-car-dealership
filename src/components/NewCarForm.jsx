import React from 'react';
import { useFirestore } from 'react-redux-firebase'
import ReusableForm from './ReusableForm';

function NewCarForm(props) {

    const firestore = useFirestore();

    function addCarTicketToFirestore(event) {
        event.preventDefault();

        props.onNewTicketCreation();
        return firestore.collection('cars').add(
            {
                names: event.target.names.value,
                location: event.target.location.value,
                issue: event.target.issue.value,
                timeOpen: firestore.FieldValue.serverTimestamp()
            }
        );
    }


    return (
        <div>
            <h1>New car form</h1>
            <ReusableForm
                // Don't forget to change the name of the function here as well.
                formSubmissionHandler={addCarTicketToFirestore}
                buttonText="Help!" />
        </div>
    );
}

export default NewCarForm;