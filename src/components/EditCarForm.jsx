import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import "./Car.css";
import { useFirestore } from "react-redux-firebase"; //useFirestore is a HOOK needed for UPDATING Record in DB
import { Redirect } from 'react-router-dom';

// NOTES:  window.location = '/'; is used to redirect from current page to "home". 

function EditCarForm(props) {
  const { car, onSubmittingEditCarForm, onClickCloseForm } = props;
  const firestore = useFirestore(); //call useFirestore() function and save our Firestore reference in a constant called firestore

  const [updated, setUpdate] = React.useState(false);

  function handleEditCarFormSubmission(event) {
    event.preventDefault();
    const updatedCar = {
      Make: event.target.Make.value,
      Model: event.target.Model.value,
      Miles: event.target.Miles.value,
      Price: event.target.Price.value,
      Trim: event.target.Trim.value,
      Year: event.target.Year.value,
      Basics: {
        BodyType: event.target.BodyType.value,
        Engine: event.target.Engine.value,
        Exterior: event.target.Exterior.value,
        MPG: event.target.MPG.value,
        Transmission: event.target.Transmission.value,
        VIN: event.target.VIN.value,
      },
      Features: event.target.Features.value,
    };
    // firestore.update({ collection: "car", doc: car.id }, updatedCar); //Firestore will merge the two arg objects
    console.log("EF: I AM GETTING SUBMITTED");
    onSubmittingEditCarForm (updatedCar, car.id);
    // handleSetUpdate();
  }

  function handleSetUpdate() {
    console.log("inside handleSetUpdate");
    setUpdate(true);
  }

  if (updated) {
    window.location = '/'; // redirects to home page
    setUpdate(false);
    
  }

  const handleClose = (e) => {
    handleSetUpdate(); // e.target.id; (returns Id of button)
  }

  return (
    <React.Fragment>
      <br></br> <br></br> <br></br>
      <div className="reUsableCarFormh2">
        <h2>Update Record</h2>
        </div>
      <div className="reUsableKegForm coralColor container">
        <form onSubmit={handleEditCarFormSubmission}><table className="table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Current Value</th>
              <th>New Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Make</td>
              <td style={{ color: "coral" }}>{car.Make}</td>
              <td><input type="text" name="Make" placeholder="New Make" required/></td>
            </tr>
            <tr>
              <td>Model</td>
              <td style={{ color: "coral" }}>{car.Model}</td>
              <td><input type="text" name="Model" placeholder="New Model" required/></td>
            </tr>
            <tr>
              <td>Miles</td>
              <td style={{ color: "coral" }}>{car.Miles.toLocaleString()}</td>
              <td><input type="text" name="Miles" placeholder="New Miles" required/></td>
            </tr>
            <tr>
              <td>Price</td>
              <td style={{ color: "coral" }}>${car.Price.toLocaleString()}</td>
              <td><input type="text" name="Price" placeholder="New Price" required/></td>
            </tr>
            <tr>
              <td>Trim</td>
              <td style={{ color: "coral" }}>{car.Trim}</td>
              <td><input type="text" name="Trim" placeholder="New Trim" required/></td>
            </tr>
            <tr>
              <td>Year</td><td style={{ color: "coral" }}>{car.Year}</td>
              <td><input type="text" name="Year" placeholder="New Year" required/></td>
            </tr>
            <tr>
              <td>Body Type</td>
              <td style={{ color: "coral" }}>{car.Basics.BodyType}</td>
              <td><input type="text" name="BodyType" placeholder="New Body Type" required/></td>
            </tr>
            <tr>
              <td>Engine</td>
              <td style={{ color: "coral" }}>{car.Basics.Engine}</td>
              <td><input type="text" name="Engine" placeholder="New Engine" required/></td>
            </tr>
            <tr>
              <td>Exterior</td>
              <td style={{ color: "coral" }}>{car.Basics.Exterior}</td>
              <td><input type="text" name="Exterior" placeholder="New Exterior" required/></td>
            </tr>
            <tr>
              <td>MPG</td>
              <td style={{ color: "coral" }}>{car.Basics.MPG}</td>
              <td><input type="text" name="MPG" placeholder="New MPG" required/></td>
            </tr>
            <tr>
              <td>Transmission</td>
              <td style={{ color: "coral" }}>{car.Basics.Transmission}</td>
              <td><input type="text" name="Transmission" placeholder="New Transmission" required/></td>
            </tr>
            <tr>
              <td>VIN</td>
              <td style={{ color: "coral" }}>{car.Basics.VIN}</td>
              <td><input type="text" name="VIN" placeholder="New VIN" required/></td>
            </tr>
            <tr>
              <td>Features</td>
              <td style={{ color: "coral" }}>{car.Features}</td>
              <td><input type="text" name="Features" placeholder="New Features" required/></td>
            </tr>
          </tbody>
        </table>
          <div className = "carDetailButton">
            <button style ={{marginLeft: "50px"}} className="paddingRightLeft buttonPrimary btn btn-danger" type="submit" >
              Update
            </button>
            <button style ={{marginLeft: "50px"}} className="paddingRightLeft buttonPrimary btn btn-warning" type="reset">
              Reset
          </button>
            {/* <button id="close" style ={{marginLeft: "50px"}} className="paddingRightLeft buttonPrimary btn btn-primary" type="reset" onClick={handleClose}>
              Close
          </button> */}
           <button style ={{marginLeft: "50px", background: "blue", border: "none"}} className="btn btn-danger" onClick={ onClickCloseForm }>Back to Home Page</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

EditCarForm.propTypes = {
  car: PropTypes.object,
  onButtonText: PropTypes.string,
  onSubmittingEditCarForm: PropTypes.func,
  onClickCloseForm: PropTypes.func
};

export default EditCarForm;