import firebase from "../firebase";
import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { withFirestore, isLoaded } from "react-redux-firebase"; //"isLoaded" is authrization related
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

// import firebase from "../firebase";
// import { withFirestore, isLoaded } from 'react-redux-firebase';

const db = firebase.firestore();

function NewCarForm() {
  const firestore = useFirestore();
  const [fileUrl, setFileURLs] = React.useState([]);
  const [uuID, setUuID] = React.useState();
  const [imgURLs, setImageURLs] = React.useState([]);
  const [updated, setUpdate] = React.useState(false);

  const addImageURL = (toAdd) => {
    setImageURLs([
      ...imgURLs,
      {
        id: imgURLs.length,
        value: toAdd,
      },
    ]);
  };

  const emptyImageURL = () => {
    setImageURLs([]);
  };

  const addFileURL = (toAdd2) => {
    setFileURLs([
      ...fileUrl,
      {
        id: fileUrl.length,
        value: toAdd2,
      },
    ]);
  };

  const printValues = (e) => {
    // e.preventDefault();
    // console.log("SALIM!!!: Inside printValues");
    // console.log(imgURLs, users);
  };

  function addNonImageFieldToFirestore(id) {
    emptyImageURL();
  }

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    addImageURL(await fileRef.getDownloadURL());
    // console.log("SALIM!!!!:imgURLs ");
    // console.log(imgURLs);
    printValues();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const uuIDTicket = {};
    uuIDTicket.id = v4();
    setUuID(uuIDTicket.id);
    const carMake = e.target.carMake.value;
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
    const Features = e.target.Features.value;

    if (!carMake || !fileUrl || !carModel || !Miles || !Trim || !Price || !Year || !Features) {
      return;
    }
    await db.collection("car").doc(uuIDTicket.id).set({
      //"car" is the name of collection
      ImageURLs: imgURLs,
      Make: carMake,
      Model: carModel,
      Miles: Miles,
      Price: Price,
      Trim: Trim,
      Year: Year,
      Basics: {
        BodyType: BodyType,
        Engine: Engine,
        Exterior: Exterior,
        MPG: MPG,
        Transmission: Transmission,
        VIN: VIN,
      },
      Features: Features,
    });

    for (var i = 0; i < 12; i++) {
      document.getElementsByClassName("clearFileFieldOnSubmit")[i].value = "";
    }

    addNonImageFieldToFirestore(uuID);
    // console.log("SALIM!!!carMake:imgExtURL:imgURLs::" + carMake + ":" + imgExtURL + ":" + imgURLs);
  };




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




  // if (this.props.loggedIn) {
  return (
    <React.Fragment>
      <br></br> <br></br> <br></br>
      <div className="reUsableCarFormh2">
        <h2>Create New Record</h2>
      </div>
      <div className="jumbotron">
        <form onSubmit={onSubmit}>
          <input type="file" className="clearFileFieldOnSubmit" onChange={onFileChange} />
          <br></br> <br></br>
          <input type="file" className="clearFileFieldOnSubmit" onChange={onFileChange} />
          <br></br> <br></br>
          <input type="file" className="clearFileFieldOnSubmit" onChange={onFileChange} />
          <br></br> <br></br>
          <input type="file" className="clearFileFieldOnSubmit" onChange={onFileChange} />
          <br></br> <br></br>
          <input type="file" className="clearFileFieldOnSubmit" onChange={onFileChange} />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="carMake" placeholder="Make" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="carModel" placeholder="Model" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="Year" placeholder="Year" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="Trim" placeholder="Trim" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="Miles" placeholder="Miles" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="Price" placeholder="Price" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="BodyType" placeholder="Body Type" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="Engine" placeholder="Engine" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="Exterior" placeholder="Exterior" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="MPG" placeholder="MPG" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="Transmission" placeholder="Transmission" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="VIN" placeholder="VIN" />
          <br></br> <br></br>
          <input type="text" className="clearFileFieldOnSubmit" name="Features" placeholder="Features (Comma separated)" />
          <br></br> <br></br>
          <div className="container">
            <div className="buttonPrimary2">
              <button style={{ marginLeft: "50px" }} className="btn btn-warning" >Create New Car</button>
              <button id="close" style={{ marginLeft: "50px" }} className="btn btn-primary" type="reset" onClick={handleClose}>Close Form</button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>

  );
  // }
  // }
}

// NewCarForm.propTypes = {
//   loggedIn: PropTypes.bool
// };

// const mapStateToProps = (state) => {
//   return {
//     loggedIn: state.loggedIn
//   };
// };

// NewCarForm = connect(mapStateToProps)(NewCarForm);

export default NewCarForm;