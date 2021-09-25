import React, { Component } from 'react';
import { connect } from 'react-redux';
import CarList from './CarList';
import NewCarForm from './NewCarForm';

class CarControl extends Component {

    constructor(props) { //this is func defenition - where is it called? 
        console.log("constructor() called!");
        super(props);
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

    render() { //this is func defenition - where is it called? 
        let currentlyVisibleState = null;
        let temp = true;
        if (temp) {
            currentlyVisibleState = <CarList />
        } else {
            currentlyVisibleState = <NewCarForm />
        }
        return (
            <div>
                {currentlyVisibleState}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      // masterTicketList: state
      // masterTicketList: state.masterTicketList,
    //   formVisibleOnPage: state.formVisibleOnPage
    }
  }

  CarControl = connect(mapStateToProps)(CarControl); 

  export default CarControl;