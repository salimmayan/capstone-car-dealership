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
      pageSize: 3,
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
    console.log("CC: handleChangingSelectedCar - SELECTED CAR is ");
    console.log(id);
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
    console.log("CC: INSIDE Inside handleDeletingCar(). Captured ID is ");
    console.log(id);
    this.props.firestore.delete({ collection: "car", doc: id });
    this.updateMasterTicketList();
    this.setState({
      selectedCar: null,
      // masterCarList: this.props.firestore.get({ collection: 'car' }),
    });
  };

  handleAddCar = () => {
    console.log("CC: INSIDE handleAddCar()");
    this.updateMasterTicketList();
    this.setState({
      currentVisibleForm: true,
      selectedCar: null,
      // masterCarList: this.props.firestore.get({ collection: 'car' }),
      editing: false,
    });
  };

  handleNewCarForm = () => {
    this.updateMasterTicketList();
    this.setState({
      currentVisibleForm: false,
      // masterCarList: this.props.firestore.get({ collection: 'car' }),
      selectedCar: null,
      editing: false,
    });
  };

  handleSubmittingEditCarForm = (updatedCar, id) => {
    console.log("CC:HANDLEDUBMITTINGEDITCARFORM - UPDATED CAR IS ");
    console.log(updatedCar);
    console.log("CC:HANDLEDUBMITTINGEDITCARFORM - id IS");
    console.log(id);
    this.props.firestore.update({ collection: "car", doc: id }, updatedCar);
    console.log("CC:HANDLEDUBMITTINGEDITCARFORM");
    this.updateMasterTicketList();
    this.setState({
      currentVisibleForm: false,
      // masterCarList: this.props.firestore.get({ collection: 'car' }),
      selectedCar: null,
      editing: false,
    });
  };

  handleClose = () => {
    this.setState({
      currentVisibleForm: false,
      // masterCarList: this.props.firestore.get({ collection: 'car' }),
      selectedCar: null,
      editing: false,
    });
  };

  updateMasterTicketList = () => {
    const db = firebase.firestore();
    db.collection("car").get().then((querySnapshot) => {
      const liveCars = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        // console.log("DOC ID");
        // console.log(doc.id);
        const data = doc.data();
        return { id, ...data };
      });
      this.setState({
        masterCarList: liveCars
      });
    });
  };

//   updateVegetablesCollection (veggies, veggie) {
//     if (veggies.indexOf(veggie) === -1) {
//         veggies.push(veggie);
//         console.log('New veggies collection is : ' + veggies);
//     } else if (veggies.indexOf(veggie) > -1) {
//         console.log(veggie + ' already exists in the veggies collection.');
//     }
// }



  handleLikeButtonClicked = (clickedCarID) => {
   const db = firebase.firestore(); 
    let users;
    let carsPrevLikedByUser;
    db.collection("user").get().then((querySnapshot) => {
      users = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        console.log("CC: HANDLE LIKED BUTTON CLICK - DOC ID");
        console.log(doc.id);  //doc.id is middle coloumn which is user ID
        if (id === this.props.currentUserIDRedux.userID) {
          //   const carsPrevLikedByUser = this.state.masterCarList.filter(
          //   (car) => car.id === id
          // )[0];
          carsPrevLikedByUser = doc.data();  //doc.data is right most coloumn which is car ID's
        }
        const data = doc.data();
        return { id, ...data };
        // return { id };
      });

      console.log("Current User:Clicked Car Id:Cars Previosly Liked by User:::" + this.props.currentUserIDRedux.userID + ":" + clickedCarID + ":" + carsPrevLikedByUser);
      // console.log("Current User:Clicked Car Id:Cars Previosly Liked by User:::" + this.props.currentUserIDRedux.userID + ":" + clickedCarID );
          

      // likedCarId
      // console.log("CC: HANDLE LIKED BUTTON CLICK - users");
      // console.log(users);
      // console.log(users[0]); //{id: 'JPlfSdtQkeUodL3oi5JGDGVDdJO2', likedCarId: ["4bec2952-8fb5-44f8-ae6c-fb4ee3e3d190", "2a8d6107-38b7-4bab-92a9-d04030f8a0ed"]} 
      // console.log(users[1]); //{id: 'sAaFSSvOUAfzykLdGDmW9rMixgZ2', likedCarId: ["879d9c06-1f02-4f94-802c-40409e364699", "0ae7b823-e6d3-49f3-bea7-481ceaf8c297"]} 
      
      // console.log(users[0].id); //JPlfSdtQkeUodL3oi5JGDGVDdJO2
      // console.log(users[1].id);  //sAaFSSvOUAfzykLdGDmW9rMixgZ2

      // const temp1 =users[0].likedCarId[0];  //id and likedCarId are two key's inside object. 
      // console.log(temp1); //JPlfSdtQkeUodL3oi5JGDGVDdJO2
      

      let likedCarId;
      console.log(users.length);
      console.log(this.props.currentUserIDRedux.userID);
      console.log(users[0].id);
      for (let i = 0; i < users.length; i++) {
        if (users[i].id == this.props.currentUserIDRedux.userID) {
          likedCarId = users[i].likedCarId;
        }
      }
      console.log(likedCarId);

      var newItem = clickedCarID; 
      if(likedCarId.indexOf(newItem) === -1)  
      {  //if not present
        //add
        likedCarId.push(newItem);
      }   
     else if (likedCarId.indexOf(newItem) > -1) 
     {  //if present
      console.log(likedCarId + '  BEFORE REMOVING.'); 
      const index = likedCarId.indexOf(newItem);
      likedCarId.splice(index, 1);
      console.log(likedCarId + '  AFTER REMOVING.');

  }

      

      
      // likedCarId.indexOf(newItem) === -1 ? likedCarId.push(newItem) : console.log("This item already exists");      
      // console.log(likedCarId)
      db.collection('user').doc(this.props.currentUserIDRedux.userID).update({ likedCarId });

      
    });
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

      console.log("CC:componentDidMount - masterCarList IS");
      console.log(this.state.masterCarList);
    });

    console.log("END OF COMPOENENT DID MOUNT");
  }



  componentDidUpdate() {
    // console.log("START OF COMPOENENT DID UPDATE");
    // const db = firebase.firestore();
    // db.collection("car").get().then((querySnapshot) => {
    //   const liveCars = querySnapshot.docs.map((doc) => {
    //     const id = doc.id;
    //     // console.log("DOC ID");
    //     // console.log(doc.id);
    //     const data = doc.data();
    //     return { id, ...data };
    //   });
    //   this.setState({
    //     masterCarList: liveCars
    //   });
    // });
    // console.log("END OF COMPOENENT DID UPDATE");
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
      console.log("CC: Loop - isLoaded && currentUser is not null - this.props.firestoreRedux");
      console.log(this.props.firestoreRedux.data.car);
      const liveCarArray = [this.props.firestoreRedux.data.car];
      console.log("CC: Loop - isLoaded && currentUser is not null - liveCarArray");
      console.log(liveCarArray);
      // console.log("CC: Loop - isLoaded && currentUser is not null - liveCarArray.length");      
      // console.log(liveCarArray.length);  
      console.log("CC: Loop - isLoaded && currentUser is not null -this.state.masterCarList");
      console.log(this.state.masterCarList);
      // console.log(this.props.masterCarList.length);      
      const paginationCarArray = this.paginateFunction(
        // this.state.masterCarList,
        this.state.masterCarList,
        this.state.currentPage,
        this.state.pageSize
      );
      console.log("CC: PAGINATION CAR ARRAY");
      console.log(paginationCarArray);
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
        currentVisibleForm = (<EditCarForm onClickCloseForm={this.handleClose} onSubmittingEditCarForm={this.handleSubmittingEditCarForm} car={this.state.selectedCar} buttonText="Update" />);
      }
      else if (this.state.selectedCar != null) {
        console.log("CC: Render Loop - selectedCar - CarDetail");
        currentVisibleForm = <ImageSlider slideImages={this.state.selectedCar} />
        renderForm = <CarDetail selectedCar={this.state.selectedCar} onClickCloseCarDetail={this.handleClose} onClickingEdit={this.handleEditClick} onClickingAddCar={this.handleAddCar} onClickingDelete={this.handleDeletingCar} />
        // renderForm = <CarDetail selectedCar={this.state.selectedCar} onClickCloseForm={this.handleClose} onClickingEdit={this.handleEditClick} onClickingAddCar={this.handleAddCar}  />

      }
      else {
        if (this.state.currentVisibleForm) {
          console.log("CC: Render Loop - currentVisibleForm - NewCarForm");
          currentVisibleForm = <NewCarForm onClickCloseNewCarForm={this.handleClose} onSubmittingNewCarForm={this.handleNewCarForm} />;
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