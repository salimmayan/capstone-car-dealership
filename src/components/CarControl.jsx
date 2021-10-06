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
    this.setState({ selectedCar: selectedCar });
  }

  handleEditClick = () => {
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
        const cars = querySnapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data };
        });
        //create another state slice that turns true when logged in - place this begore returning data from each component
        
        //here I should dispatch an action to store "car" in redux state slice - each slice needs a reducer so create one
        const { dispatch } = this.props;
        const action = {
          type: 'ADD_FIRESTORE_DATA',
          id:1,
          fireStoreData: cars,
        }
        dispatch(action);
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

    console.log("ATTENTION - ATTENTION ");
    console.log(this.props.masterCarListRedux);

    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <React.Fragment>
          <h1>You must be signed in to access the queue.</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      // All of the code previously in our render() method should go in this conditional.
      const { dispatch } = this.props;
      const action = {
        type: 'TOGGLE_LOGIN'
      }
      dispatch(action);
      
      

      if (this.state.loggedIn) {
        currentVisibleForm = (<LandingPage onSignInSuccess={this.handleOnSignInSuccess} />);
      }
      else if (this.state.editing) {
        // console.log("IN RENDER() - this.state.editing ");
        currentVisibleForm = (<EditCarForm car={this.state.selectedCar} buttonText="Update" />);
      } else if (this.state.selectedCar != null) {
        currentVisibleForm = <ImageSlider slideImages={this.state.selectedCar} />
        renderForm = <CarDetail selectedCar={this.state.selectedCar} onClickingEdit={this.handleEditClick} />
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
}

CarControl.propTypes = {
  // headlines: PropTypes.array,
  masterCarList: PropTypes.array,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  // masterCarList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  loggedIn: PropTypes.bool,
  masterCarListRedux: PropTypes.object
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
    // headlines: state.headlines,
    isLoading: state.isLoading,
    error: state.error,
    masterCarListRedux: state.masterCarListRedux,
    loggedIn: state.loggedIn
  };
};




CarControl = connect(mapStateToProps)(CarControl);  //return value of the connect() function is the CarControl component itself, but this time we will have powerful new tools at our disposal: the dispatch() and mapStateToProps() functions.

export default withFirestore(CarControl);