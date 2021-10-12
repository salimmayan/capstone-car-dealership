import React from "react";
import PropTypes from "prop-types";
import "./Car.css";
import "bootstrap/dist/css/bootstrap.css";
import { useFirestore } from "react-redux-firebase"; //useFirestore is a HOOK needed for UPDATING Record in DB
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';

function CarDetail(props) {
  const { selectedCar, onClickingEdit, onClickingAddCar, onClickingDelete, onClickCloseCarDetail } = props;
  const featureList = selectedCar.Features.split(",");
  const basics = selectedCar.Basics;
  const basicsKeys = Object.keys(basics);
  const carFax = "https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=VAU_0&UID=C520459&vin=";
  const apostope = "";
  const carFaxURL = carFax.concat(basics.VIN, apostope);
  const safetyRecall = "https://www.nhtsa.gov/recalls?vin=";
  const safetyRecallURL = safetyRecall.concat(basics.VIN, apostope);  //https://www.nhtsa.gov/recalls?vin=JTJYARBZXK21470571
  const firestore = useFirestore(); //call useFirestore() function and save our Firestore reference in a constant called firestore
  
  useFirestoreConnect([
    { collection: 'car' }
  ]);
  // const cars = useSelector(state => state.firestoreRedux.ordered.car);
  const currentUserIDRedux = useSelector(state => state.currentUserIDRedux);
  let updateCarButton = null;
  let deleteCarButton = null;
  let addCarButton = null;
  
  console.log("CD: CURRENT USER IS");
  console.log(currentUserIDRedux.userID)
  console.log("CD: selectedCar.id");
  console.log(selectedCar.id);
  console.log("CD: selectedCar");
  console.log(selectedCar);
  console.log(typeof(selectedCar));
  if (currentUserIDRedux.userID === 'JPlfSdtQkeUodL3oi5JGDGVDdJO2' || currentUserIDRedux.userID === '0Y0HOyp9cjNLbfMhjaCiofmr07W2') {
    addCarButton = <button style={{ marginRight: "50px", background: "green", border: "none" }} className="btn btn-danger" onClick={onClickingAddCar}>Add New Car</button>
    updateCarButton = <button style={{ marginRight: "50px" }} className="btn btn-warning" onClick={ onClickingEdit }>Update Car</button>
    deleteCarButton = <button style={{ marginRight: "50px" }} className="btn btn-danger" onClick= { () => onClickingDelete (selectedCar.id) }>Delete Car</button>
  }
  else {

  }
  return (


    <React.Fragment>
      <div className="jumbotron coralColor ">
        <table className="table">
          <tbody>
            <tr>
              <td><span className="muchMoreWeight">{selectedCar.Year} {selectedCar.Make} {selectedCar.Model} </span></td>
              <td><span className="muchMoreWeight textAlignRight" >${selectedCar.Price.toLocaleString()}</span></td>
            </tr>
            <tr>
              <td><span className="notMuchMoreWeight">{selectedCar.Trim} | {selectedCar.Miles.toLocaleString()} miles</span></td>
              <td><span className="notMuchMoreWeight ">Payment Calculator $ {Math.round(selectedCar.Price / 36)}/month (For 36 months)</span></td>
            </tr>
          </tbody>
        </table>
        <div className="horizontalLine"></div>
        <h3 className="alignLeft">Car Details</h3>
        <div className="modal-body row vroomColor">
          {basicsKeys.map((key) => (
            <div key={key} className="col-md-5"><span className="moreWeight">{key}</span>: {basics[key]}</div>
          ))}
        </div>

        <div className="vroomColor morePadding">Clean Auto History:<img className="tempImage" alt="CarFaxLogo" src={require('./../img/carfax_logo2.png')} />
          This vehicle has a clean history and is free of accidents as reported by CARFAX.
          <a href={carFaxURL} target="_blank" rel="noopener noreferrer" > See the report</a>
        </div>
        <div>
          <a className="vroomColor morePadding" href={safetyRecallURL} target="_blank" rel="noopener noreferrer"   >Check for safety recalls</a>
        </div>
        <div className="horizontalLine"></div>
        <h3 className="alignLeft">Features</h3>
        <div className="modal-body row vroomColor">
          {featureList.map((feature, i) => (
            <div key={i} className="col-md-4">{feature}</div>
          ))}
        </div>
      </div>

      <div className="carDetailButton">
        {addCarButton}
        {updateCarButton}
        {deleteCarButton}
        <button style={{ marginRight: "50px", background: "blue", border: "none" }} className="btn btn-danger" onClick={onClickCloseCarDetail}>Back to Home Page</button>
      </div>
    </React.Fragment>
  );
}

CarDetail.propTypes = {
  keg: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingAddCar: PropTypes.func,
  updateCarButton: PropTypes.string,
  deleteCarButton: PropTypes.string,
  onClickCloseCarDetail: PropTypes.func,
  currentUserIDRedux: PropTypes.object,
};

export default CarDetail;
