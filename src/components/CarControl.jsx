import React, { Component } from 'react';
import { connect } from 'react-redux';
import CarList from './CarList';
import NewCarForm from './NewCarForm';
import EditCarForm from './EditCarForm';
import CarDetail from './CarDetail';
import PropTypes from "prop-types";
import * as a from './../actions'; // "actions" is a folder and not a file???
import { withFirestore, isLoaded } from 'react-redux-firebase';
import { makeApiCall } from './../actions';
import LandingPage from './LandingPage';
import SlideShow from './SlideShow';
import firebase from "../firebase";

class CarControl extends Component {

  constructor(props) { //this is func defenition - where is it called? 
    console.log("constructor() called!");
    super(props);
    this.state = {
      currentVisibleForm: true,
      editing: false,
      selectedCar: null,
      masterCarList: null,
      addNewCar: false,
      // masterCarList: [],
      // error: null,
      // isLoaded: false,
      // headlines: [],
      pageSize: 8,
      currentPage: 1,
      loggedIn: true,
    };
  }

  handleClickCars = () => {
    if (this.state.currentVisibleForm === false) {
      this.setState({ currentVisibleForm: true });
    } else {
      this.setState({ currentVisibleForm: false });
    }
  };

  handleChangingSelectedCar = (id) => {
    const selectedCar = this.state.masterCarList.filter(
      (car) => car.id === id
    )[0];
    // console.log("inside handleChangingSelectedCar - ID of clicked car is ");
    // console.log(selectedCar);
    this.setState({ selectedCar: selectedCar }); //selectedCar will store object from SHARED SHARE masterCarList with a UUID corresponding to clicked car
  };

  handleDeletingKeg = () => {
    const newEditing = false;
    const newSelectedCar = null;
    const newcurrentVisibleForm = false;
    this.setState({
      editing: newEditing,
      selectedCar: newSelectedCar,
      currentVisibleForm: newcurrentVisibleForm,
    });
  };

  handleEditClick = () => {
    // console.log("keg control -  inside  handleEditClick = () => {");
    this.setState({ editing: true });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleOnSignInSuccess = () => {
    this.setState({ loggedIn: false });
    console.log("inside handleOnSignInSuccess");
  };


  componentDidMount() {
    const db = firebase.firestore();
    db.collection("car")
      .get()
      .then((querySnapshot) => {
        // const cars = querySnapshot.docs.map((doc) => doc.data());
        const cars = querySnapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data };
        });
        // const { dispatch } = this.props;
        // const action = a.addKeg(cars);
        // dispatch(action);
        this.setState({
          masterCarList: cars,
          refreshPage: false,
        });
      });
  }

  render() {
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {  //check to see if the auth state has been loaded or not. If it hasn't, our help queue will render Loading....
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) { //If auth.currentUser is null, we know that the client isn't signed in. We'll return a message that says a user must be signed in to access the queue.
      return (
        <React.Fragment>
          <h1>You must be signed in to access the queue.</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser != null)) {

      console.log("render called! - currentVisibleForm:SelectedCar:Editing:FormVisibleOnPage::::");
      console.log(this.state.currentVisibleForm);
      console.log(this.state.selectedCar);
      console.log(this.state.editing);
      console.log(this.props.formVisibleOnPage);
      
      let currentVisibleForm = null;
      let buttonText = null;
      if (this.state.editing) {
        currentVisibleForm = <EditCarForm car={this.state.selectedCar} onEditCar={this.handleAddingNewCarToList} />
        buttonText = "Return to Car List";
      } else if (this.state.selectedCar != null) {
        currentVisibleForm =
          <CarDetail
            car={this.state.selectedCar}
            onClickingDelete={this.handleDeletingCar}
            onClickingEdit={this.handleEditClick} />
        buttonText = "Return to car List";
        // } else if (this.state.formVisibleOnPage) {
      } else if (this.props.formVisibleOnPage) {
        currentVisibleForm = <NewCarForm onNewCarCreation={this.handleAddingNewCarToList} />;
        buttonText = "Return to Car List";
      } else {
        // currentVisibleForm = <CarList CarList={this.state.masterCarList} onCarSelection={this.handleChangingSelectedCar} />;
        currentVisibleForm = <CarList className="wrapperNew" onCarSelection={this.handleChangingSelectedCar} />;
        buttonText = "Add Car";
      }
      return (
        <React.Fragment>
          <div className="container">
          {/* <h1>I am in Carcontrol</h1> */}
          {currentVisibleForm}
          <br></br>
          <br></br>
          </div>
          <button onClick={this.handleClick}>{buttonText}</button>
     
          
        </React.Fragment>
      );
    }

  }
}

CarControl.propTypes = {
  headlines: PropTypes.array,
  masterCarList: PropTypes.array,
  // masterCarList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    masterCarList: state.masterCarList,
    editing: state.editing,
    currentVisibleForm: state.currentVisibleForm,
    selectedCar: state.selectedCar,
    addNewCar: state.addNewCar,
    pageSize: state.pageSize,
    currentPage: state.currentPage,
    loggedIn: state.loggedIn,
    headlines: state.headlines,
    isLoading: state.isLoading,
    error: state.error
  };
};



CarControl = connect(mapStateToProps)(CarControl);  //return value of the connect() function is the CarControl component itself, but this time we will have powerful new tools at our disposal: the dispatch() and mapStateToProps() functions.

export default withFirestore(CarControl);