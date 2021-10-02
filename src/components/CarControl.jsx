import React, { Component } from 'react';
import { connect } from 'react-redux';
import CarList from './CarList';
import NewCarForm from './NewCarForm';
import EditCarForm from './EditCarForm';
import CarDetail from './CarDetail';
import PropTypes from "prop-types";
import * as a from './../actions'; // "actions" is a folder and not a file???
import { withFirestore, isLoaded } from 'react-redux-firebase';

class CarControl extends Component {

    constructor(props) { //this is func defenition - where is it called? 
        console.log("constructor() called!");
        super(props);
        this.state = {
            // formVisibleOnPage: false,
            // masterCarList: [],
            selectedCar: null,
            editing: false
          };
    }

    componentDidMount() { //this is func defenition - where is it called? 
        console.log("componentDidMount() called!");
    }

    componentDidUpdate() { //this is func defenition - where is it called? 
        console.log("componentDidUpdate() called!");
    }

    componentWillUnmount() { //this is func defenition - where is it called? 
        console.log("componentWillUnmount() called!");
    }

    handleClick = () => {
        if (this.state.selectedTicket != null) {
          const { dispatch } = this.props;
          // const action = {
          //   type: 'null'
          // }
          const action = a.toggleForm();
    
          dispatch(action);
          this.setState({
            // formVisibleOnPage: false,
            selectedTicket: null,
            editing: false
          });
        } else {
          // this.setState(prevState => ({
          // formVisibleOnPage: !prevState.formVisibleOnPage,
          // }));
          const { dispatch } = this.props;
          // const action = {
          //   type: 'TOGGLE_FORM'
          // }
          const action = a.toggleForm();
          dispatch(action);
        }
      }

      handleAddingNewTicketToList = () => {
        const { dispatch } = this.props;
        const action = a.toggleForm(); //returns an action object whihc has a type of " 'TOGGLE_FORM' "
        dispatch(action);
      }
    
      handleChangingSelectedTicket = (id) => {
        // const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
        // this.setState({selectedTicket: selectedTicket});
        // const selectedTicket = this.props.masterTicketList[id];
        // this.setState({ selectedTicket: selectedTicket });
        console.log("Doc ID is ");
        console.log(id);
        this.props.firestore.get({ collection: 'tickets', doc: id }).then((ticket) => {
          const firestoreTicket = {
            names: ticket.get("names"),
            location: ticket.get("location"),
            issue: ticket.get("issue"),
            id: ticket.id
          }
          this.setState({ selectedTicket: firestoreTicket });
          // this.setState({formVisibleOnPage: false});
        });
      }
    
      handleDeletingTicket = (id) => {
        // const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
        // this.setState({
        //   masterTicketList: newMasterTicketList,
        //   selectedTicket: null
        // });
    
        //   type: 'DELETE_TICKET',
        //   id: id
        // }
        // const { dispatch } = this.props;
        // // const action = {
        // const action = a.deleteTicket(id);
        // dispatch(action);
        // this.setState({ selectedTicket: null });
        this.props.firestore.delete({ collection: 'tickets', doc: id });
        this.setState({ selectedTicket: null });
      }
    
      handleEditClick = () => {
        this.setState({ editing: true });
      }
    
      handleEditingTicketInList = () => {
        // const editedMasterTicketList = this.state.masterTicketList
        //   .filter(ticket => ticket.id !== this.state.selectedTicket.id)
        //   .concat(ticketToEdit);
        // this.setState({
        //   masterTicketList: editedMasterTicketList,
        //   editing: false,
        //   selectedTicket: null
        // });
        // const { dispatch } = this.props;
        this.setState({
          editing: false,
          selectedTicket: null
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
    
          console.log("render called!:SelectedCar:Editing:FormVisibleOnPage::::");
          console.log(this.state.selectedCar);
          console.log(this.state.editing);
          console.log(this.props.formVisibleOnPage);
    
          let currentlyVisibleState = null;
          let buttonText = null;
          if (this.state.editing) {
            currentlyVisibleState = <EditCarForm car={this.state.selectedCar} onEditCar={this.handleAddingNewCarToList} />
            buttonText = "Return to Car List";
          } else if (this.state.selectedCar != null) {
            currentlyVisibleState =
              <CarDetail
                car={this.state.selectedCar}
                onClickingDelete={this.handleDeletingCar}
                onClickingEdit={this.handleEditClick} />
            buttonText = "Return to Car List";
            // } else if (this.state.formVisibleOnPage) {
          } else if (this.props.formVisibleOnPage) {
            currentlyVisibleState = <NewCarForm onNewCarCreation={this.handleAddingNewCarToList} />;
            buttonText = "Return to Car List";
          } else {
            // currentlyVisibleState = <CarList carList={this.state.masterCarList} onCarSelection={this.handleChangingSelectedCar} />;
            currentlyVisibleState = <CarList carList={this.props.masterCarList} onCarSelection={this.handleChangingSelectedCar} />;
            buttonText = "Add Car";
          }
          return (
            <React.Fragment>
              <h1>I am in Carcontrol</h1>
              {currentlyVisibleState}
              <button onClick={this.handleClick}>{buttonText}</button>
            </React.Fragment>
          );
        }
    
      }
    }
    
    CarControl.propTypes = {
      // masterCarList: PropTypes.object
      masterCarList: PropTypes.object,
      formVisibleOnPage: PropTypes.bool
    };
    
    const mapStateToProps = state => {
      return {
        // masterCarList: state
        // masterCarList: state.masterCarList,
        formVisibleOnPage: state.formVisibleOnPage
      }
    }
    
    CarControl = connect(mapStateToProps)(CarControl);  //return value of the connect() function is the CarControl component itself, but this time we will have powerful new tools at our disposal: the dispatch() and mapStateToProps() functions.
    
    export default withFirestore(CarControl);