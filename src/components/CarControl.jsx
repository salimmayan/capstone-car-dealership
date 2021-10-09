import React, { Component } from 'react';
import { connect } from 'react-redux';
import CarList from './CarList';
import NewCarForm from './NewCarForm';
import EditCarForm from './EditCarForm';
import CarDetail from './CarDetail';
import PropTypes from "prop-types";
import * as a from './../actions'; // "actions" is a folder and not a file???
import { withFirestore, isLoaded } from 'react-redux-firebase';
import LandingPage from './LandingPage';
import firebase from "../firebase";
import ImageSlider from './ImageSlider';
import { Container, Row, Col } from 'react-bootstrap';
import Pagination from './Pagination';
import _ from "lodash";
import { string } from 'yup';
import { useFirestore } from "react-redux-firebase"; //useFirestore is a HOOK needed for UPDATING Record in DB
import { v4 } from 'uuid';

class CarControl extends Component {


  constructor(props) { //this is func defenition - where is it called? 
    console.log("constructor() called!");
    super(props);
    this.state = {
      currentVisibleForm: false,
      editing: false,
      selectedCar: null,
      masterCarList: null,
      addNewCar: false,
      pageSize: 6,
      currentPage: 1,
      startState: true,
      loggedInUser: string,
      docIdArray: null
    };
  }

  handleClickCars = () => {
    if (this.state.currentVisibleForm === false) {
      this.setState({ currentVisibleForm: true });
    } else {
      this.setState({ currentVisibleForm: false });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleChangingSelectedCar = (id) => {
    console.log("Doc ID is ");
    console.log(id);
    // const fireStoreSelectedCar = this.props.firestore.get({ collection: 'car', doc: id });
    // console.log("Doc fireStoreSelectedCar is ");
    // console.log(fireStoreSelectedCar);
    const selectedCar = this.state.masterCarList.filter(
      (car) => car.id === id
    )[0];
    this.setState({ selectedCar: selectedCar });
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleOnSignInSuccess = () => {
    this.setState({ startState: false });
    console.log("inside handleOnSignInSuccess");
  };

  handleDeletingCar = (id) => {
    this.props.firestoreRedux.delete({ collection: 'car', doc: id });
    this.setState({ masterCarList: this.props.firestoreRedux.get({ collection: 'car', doc: id }) });
    this.setState({ selectedCar: null });
  };

  handleLikeButtonClicked = (clickedCarID) => {
    console.log("LIKED car ID is ");
    console.log(clickedCarID);
    // const newMasterLikedList = this.props.firestoreRedux;
    // console.log("newMasterLikedList is ");
    // console.log(newMasterLikedList);
    // const newId = {clickedCarID};
    // console.log(clickedCarID);
    // this.props.firestore.update({collection: 'users', doc: this.props.currentUserIDRedux }, id)
    // return this.props.firestore.update({collection: 'user', doc: this.props.currentUserIDRedux }, newId)

    // .masterKegList.concat(newKeg);

    // const likedCars = {id}

    // const fireStoreSelectedCar = this.props.firestore.add({ collection: 'user', doc: this.props.currentUserIDRedux }, likedCars);
    // console.log("Doc fireStoreSelectedCar is ");
    // console.log(fireStoreSelectedCar);
    const uuID = {};
    uuID.id = v4()
    const temp= uuID.id;
    console.log("temp");
    console.log(temp);
    const newLikedCarObj = {temp: clickedCarID}
    console.log("newLikedCarObj");
    console.log(newLikedCarObj);
    const db = firebase.firestore();
    console.log("GETTING DATA FROM FS");
    console.log(this.props.firestoreRedux );
    // pull all cars that were clicked and then if current click matches an existing car, remove it. Else if current click
    // is not in the list of cars, then add it. 
    // const currentLikes = this.props.firestore.get({collection: 'users'})
    // console.log(currentLikes);
    //  firebase.auth().onAuthStateChanged(function (user) {
    //     var dbUser = db.collection('users').doc(user.uid).update({ newLikedCarObj });
    //  });

      // firebase.auth().onAuthStateChanged(function (user) {
      //               console.log("SIGN-IN I AM INSIDE");
      //               var dbUser = db.collection('users')
      //                   .doc(user.uid).set(
      //                       {
      //                           email: user.email,
      //                           someotherproperty: "some user preference"
      //                       });
      //           });

    //  db.collection("users2").doc(this.props.currentUserIDRedux).set({
    //   //"car" is the name of collection
    //   uuIDTicket: id,
    // });
  }


  componentDidMount() {
    console.log("START OF COMPOENENT DID MOUNT");
    const db = firebase.firestore();
    db.collection("car").get().then((querySnapshot) => {
      const cars = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        // console.log("DOC ID");
        // console.log(doc.id);
        const data = doc.data();
        return { id, ...data };
      });


      const docIdArray = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return doc.id;
      });

      this.setState({ docIdArray: docIdArray });

      // db.collection("users").get().then((querySnapshot) => {
      //   const cars2 = querySnapshot.docs.map((doc) => {
      //     const id = doc.id;
      //     // console.log("DOC ID");
      //     // console.log(doc.id);
      //     const data = doc.data();
      //     return { id, ...data };
      //   });
      // });

      // console.log("DOC ID");
      //   console.log(docIdArray);
      //create another state slice that turns true when logged in - place this begore returning data from each component

      //here I should dispatch an action to store "car" in redux state slice - each slice needs a reducer so create one
      // const { dispatch } = this.props;
      // const action = {
      //   type: 'ADD_FIRESTORE_DATA',
      //   id: 1,
      //   fireStoreData: cars,
      // }
      // dispatch(action);
      this.setState({
        masterCarList: cars,
        refreshPage: false,
      });

      console.log("masterCarList IS");
      console.log(this.state.masterCarList);
    });

    console.log("END OF COMPOENENT DID MOUNT");
  }

  paginateFunction = (arrayOfItems, pageNumber, pageSize) => {   //ontained from lodash library
    const startIndex = (pageNumber - 1) * pageSize; //formula for calcualting starting index
    return _(arrayOfItems).slice(startIndex).take(pageSize).value();
  }

  render() {
    // const firestore = useFirestore();

    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      console.log("CC: Loop - isLoaded ");
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      console.log("CC: Loop - isLoaded && currentUser is null");
      return (
        <React.Fragment>
          <h1>You must be signed in to access the queue.</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      console.log("CC: Loop - isLoaded && currentUser is not null");
      let currentVisibleForm = null;
      let renderForm = null;
      const paginationCarArray = this.paginateFunction(
        this.state.masterCarList,
        this.state.currentPage,
        this.state.pageSize
      );
      console.log("CC: firestoreRedux ");
      console.log(this.props.firestoreRedux);

      console.log("CC: this.props.isLoggedInRedux ");
      console.log(this.props.isLoggedInRedux);
      if (!this.props.isLoggedInRedux) {
        console.log("CC: Render Loop - isLoggedInRedux - LandingPage");
        currentVisibleForm = (<LandingPage onSignInSuccess={this.handleOnSignInSuccess} />);
      }
      else if (this.state.editing) {
        console.log("CC: Render Loop - editing - EditCarForm");
        // console.log("IN RENDER() - this.state.editing ");
        currentVisibleForm = (<EditCarForm car={this.state.selectedCar} buttonText="Update" />);
      }
      else if (this.state.selectedCar != null) {
        console.log("CC: Render Loop - selectedCar - CarDetail");
        currentVisibleForm = <ImageSlider slideImages={this.state.selectedCar} />
        renderForm = <CarDetail selectedCar={this.state.selectedCar} onClickingEdit={this.handleEditClick} />
      }
      else {
        if (this.state.currentVisibleForm) {
          console.log("CC: Render Loop - currentVisibleForm - NewCarForm");
          currentVisibleForm = <NewCarForm />;
        }
        else {
          console.log("CC: Render Loop - currentVisibleForm - CarList");
          currentVisibleForm = <CarList className="wrapperNew" carList={paginationCarArray} onwhenLikeButtonClicked={this.handleLikeButtonClicked} onCarSelection={this.handleChangingSelectedCar} />
          renderForm = <Pagination className="pagination" itemsCount={this.state.masterCarList.length} pageSize={this.state.pageSize}
            currentPage={this.state.currentPage} onPageChange={this.handlePageChange} />
        }
      }
      return (
        <React.Fragment>
          <div className="container">
            <Container>
              {currentVisibleForm}
              <br></br>
              <br></br>
              {renderForm}
            </Container>
            {/* <button onClick={this.handleClick}>{buttonText}</button> */}
          </div>
        </React.Fragment>
      );
    }
  }
}

CarControl.propTypes = {
  // headlines: PropTypes.array,
  masterCarList: PropTypes.array,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  // masterCarList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  startState: PropTypes.bool,
  firestoreRedux: PropTypes.object,
  loggedInUser: PropTypes.string,
  docIdArray: PropTypes.array,
  isLoggedInRedux: PropTypes.bool,
  currentUserIDRedux: PropTypes.object,
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
    startState: state.startState,
    // headlines: state.headlines,
    loggedIn: state.loggedIn,
    isLoggedInRedux: state.isLoggedInRedux,
    error: state.error,
    firestoreRedux: state.firestoreRedux,
    currentUserIDRedux: state.currentUserIDRedux,
    startState: state.startState,
  };
};




CarControl = connect(mapStateToProps)(CarControl);  //return value of the connect() function is the CarControl component itself, but this time we will have powerful new tools at our disposal: the dispatch() and mapStateToProps() functions.

export default withFirestore(CarControl);