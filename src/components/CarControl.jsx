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
// import SlideShow from './SlideShow';
import firebase from "../firebase";
import ImageSlider from './ImageSlider';
import { Container, Row, Col } from 'react-bootstrap';
import FooterPage from './FooterPage';
import NavBar from './NavigationBar';
import Pagination from './Pagination';
// import Pagination from "react-bootstrap-4-pagination";
import _ from "lodash";

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
      // masterCarList: [],
      // error: null,
      // isLoaded: false,
      // headlines: [],
      pageSize: 4,
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
    console.log("Doc selectedCar is ");
    console.log(selectedCar);
    // const firestoreCar = {
    //   names: ticket.get("names"),
    //   location: ticket.get("location"),
    //   issue: ticket.get("issue"),
    //   id: ticket.id
    // }
    this.setState({ selectedCar: selectedCar });
  }

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



  handleDeletingCar = (id) => {
    this.props.firestore.delete({ collection: 'car', doc: id });
    this.setState({ masterCarList: this.props.firestore.get({ collection: 'car', doc: id }) });
    this.setState({ selectedCar: null });
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

  paginateFunction = (arrayOfItems, pageNumber, pageSize) => {   //ontained from lodash library
    const startIndex = (pageNumber - 1) * pageSize; //formula for calcualting starting index
    return _(arrayOfItems).slice(startIndex).take(pageSize).value();
  }

  render() {
    const auth = this.props.firebase.auth();
    let currentVisibleForm = null;
    let renderForm = null;
    const paginationCarArray = this.paginateFunction(
      this.state.masterCarList,
      this.state.currentPage,
      this.state.pageSize
    );

    // if (!isLoaded(auth)) {  //check to see if the auth state has been loaded or not. If it hasn't, our help queue will render Loading....
    //   return (
    //     <React.Fragment>
    //       <h1>Loading...</h1>
    //     </React.Fragment>
    //   )
    // }
    // if ((isLoaded(auth)) && (auth.currentUser == null)) { //If auth.currentUser is null, we know that the client isn't signed in. We'll return a message that says a user must be signed in to access the queue.
    //   return (
    //     <React.Fragment>
    //       <h1>You must be signed in to access the queue.</h1>
    //     </React.Fragment>
    //   )
    // }
    // if ((isLoaded(auth)) && (auth.currentUser != null)) {

    //   console.log("render called! - currentVisibleForm:SelectedCar:Editing:FormVisibleOnPage::::");
    //   console.log(this.state.currentVisibleForm);
    //   console.log(this.state.selectedCar);
    //   console.log(this.state.editing);
    //   console.log(this.props.formVisibleOnPage);

    //   let currentVisibleForm = null;
    //   let buttonText = null;
    //   if (this.state.editing) {
    //     console.log("INSIDE EDITING BLOCK");
    //     currentVisibleForm = <EditCarForm car={this.state.selectedCar} onEditCar={this.handleAddingNewCarToList} />
    //     buttonText = "Return to Car List";
    //   } else if (this.state.selectedCar != null) {
    //     console.log("INSIDE SLECTEDCAR BLOCK");
    //     console.log(this.state.selectedCar);
    //     currentVisibleForm = <ImageSlider slideImages={this.state.selectedCar} />
    //     renderForm = <CarDetail selectedCar={this.state.selectedCar} onClickingDelete={this.handleDeletingKeg} onClickingEdit={this.handleEditClick} />

    //     buttonText = "Return to car List";
    //   } else if (this.props.formVisibleOnPage) {
    //     console.log("INSIDE formVisibleOnPage BLOCK");
    //     currentVisibleForm = <NewCarForm onNewCarCreation={this.handleAddingNewCarToList} />;
    //     buttonText = "Return to Car List";
    //   } else {
    //     console.log("INSIDE NO CONDITION BLOCK");
    //     currentVisibleForm = <CarList carList={paginationCarArray} onCarSelection={this.handleChangingSelectedCar} />;
    //     renderForm = <Pagination className="pagination" itemsCount={this.state.masterCarList.length}
    //       pageSize={this.state.pageSize}
    //       currentPage={this.state.currentPage}
    //       onPageChange={this.handlePageChange}
    //     />
    //     buttonText = "Add Car";
    //   }
    if (this.state.loggedIn) {
      currentVisibleForm = (<LandingPage onSignInSuccess={this.handleOnSignInSuccess} />);
    }
    else if (this.state.editing) {
      // console.log("IN RENDER() - this.state.editing ");
      currentVisibleForm = (<EditCarForm car={this.state.selectedCar} buttonText="Update" />);
    } else if (this.state.selectedCar != null) {
      currentVisibleForm = <ImageSlider slideImages={this.state.selectedCar} />
      renderForm = <CarDetail selectedCar={this.state.selectedCar} onClickingDelete={this.handleDeletingKeg} onClickingEdit={this.handleEditClick} />
    } else {
      if (this.state.currentVisibleForm) {
        currentVisibleForm = <NewCarForm />;
      } else {
        currentVisibleForm = <CarList className="wrapperNew" carList={paginationCarArray} onCarSelection={this.handleChangingSelectedCar} />
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

CarControl.propTypes = {
  headlines: PropTypes.array,
  masterCarList: PropTypes.array,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
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