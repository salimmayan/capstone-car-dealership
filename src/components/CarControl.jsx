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

class CarControl extends Component {

    constructor(props) { //this is func defenition - where is it called? 
        console.log("constructor() called!");
        super(props);
        this.state = {
            formVisibleOnPage: false,
            selectedCar: null,
            editing: false            
            // masterCarList: [],
            // error: null,
            // isLoaded: false,
            // headlines: [],
        };
    }

    componentDidMount() { //this is func defenition - where is it called? 
        console.log("componentDidMount() called!");
        console.log("Component did mount - about to invoke dispatch(makeApiCall())");
        // this.makeApiCall()
        const { dispatch } = this.props;
        dispatch(makeApiCall());
    }

    componentDidUpdate() { //this is func defenition - where is it called? 
        console.log("componentDidUpdate() called!");
    }

    componentWillUnmount() { //this is func defenition - where is it called? 
        console.log("componentWillUnmount() called!");
    }

    handleClick = () => {
        if (this.state.selectedCar != null) {
            const { dispatch } = this.props;
            // const action = {
            //   type: 'null'
            // }
            const action = a.toggleForm();

            dispatch(action);
            this.setState({
                // formVisibleOnPage: false,
                selectedCar: null,
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

    handleAddingNewCarToList = () => {
        const { dispatch } = this.props;
        const action = a.toggleForm(); //returns an action object whihc has a type of " 'TOGGLE_FORM' "
        dispatch(action);
    }

    handleChangingSelectedCar = (id) => {
        // const selectedCar = this.state.masterCarList.filter(car => car.id === id)[0];
        // this.setState({selectedCar: selectedCar});
        // const selectedCar = this.props.masterCarList[id];
        // this.setState({ selectedCar: selectedCar });
        console.log("Doc ID is ");
        console.log(id);
        this.props.firestore.get({ collection: 'Cars', doc: id }).then((car) => {
            const firestoreCar = {
                carModel: car.get("carModel"),
                Miles: car.get("Miles"),
                Trim: car.get("Trim"),
                Price: car.get("Price"),
                Year: car.get("Year"),
                BodyType: car.get("BodyType"),
                Exterior: car.get("Exterior"),
                MPG: car.get("MPG"),
                Transmission: car.get("Transmission"),
                VIN: car.get("VIN"),
                Features: car.get("Features")
            }
            this.setState({ selectedCar: firestoreCar });
            // this.setState({formVisibleOnPage: false});
        });
    }

    handleDeletingCar = (id) => {
        // const newMasterCarList = this.state.masterCarList.filter(car => car.id !== id);
        // this.setState({
        //   masterCarList: newMasterCarList,
        //   selectedCar: null
        // });

        //   type: 'DELETE_Car',
        //   id: id
        // }
        // const { dispatch } = this.props;
        // // const action = {
        // const action = a.deleteCar(id);
        // dispatch(action);
        // this.setState({ selectedCar: null });
        this.props.firestore.delete({ collection: 'cars', doc: id });
        this.setState({ selectedCar: null });
    }

    handleEditClick = () => {
        this.setState({ editing: true });
    }

    handleEditingCarInList = () => {
        // const editedMasterCarList = this.state.masterCarList
        //   .filter(car => car.id !== this.state.selectedCar.id)
        //   .concat(carToEdit);
        // this.setState({
        //   masterCarList: editedMasterCarList,
        //   editing: false,
        //   selectedCar: null
        // });
        // const { dispatch } = this.props;
        this.setState({
            editing: false,
            selectedCar: null,
            formVisibleOnPage: false
        });
    }

    render() {
        const { error, isLoading, headlines } = this.props;
        console.log("headlines");
        console.log(this.props.headlines);
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
            console.log(this.state.formVisibleOnPage);

            let currentlyVisibleState = null;
            let buttonText = null;

            // formVisibleOnPage: false,
            // selectedCar: null,
            // editing: false        


            if (this.state.editing) {
                console.log("CARCONTROL IF-ELSE: EditCar - formVisibleOnPage:selectedCar:editing");
                console.log(this.state.formVisibleOnPage);
                console.log(this.state.selectedCar);
                console.log(this.state.editing);
                currentlyVisibleState = <EditCarForm car={this.state.selectedCar} onEditCar={this.handleAddingNewCarToList} />
                buttonText = "Return to Car List";
            } else if (this.state.selectedCar != null) {
                console.log("CARCONTROL IF-ELSE: CarDetail - formVisibleOnPage:selectedCar:editing");
                console.log(this.state.formVisibleOnPage);
                console.log(this.state.selectedCar);
                console.log(this.state.editing);
                currentlyVisibleState =
                    <CarDetail
                        car={this.state.selectedCar}
                        onClickingDelete={this.handleDeletingCar}
                        onClickingEdit={this.handleEditClick} />
                buttonText = "Return to Car List";
                // } else if (this.state.formVisibleOnPage) {
            } else if (this.state.formVisibleOnPage) {
                console.log("CARCONTROL IF-ELSE: NewCarForm - formVisibleOnPage:selectedCar:editing");
                console.log(this.state.formVisibleOnPage);
                console.log(this.state.selectedCar);
                console.log(this.state.editing);
                currentlyVisibleState = <NewCarForm onNewCarCreation={this.handleAddingNewCarToList} />;
                buttonText = "Return to Car List";
            } else {
                console.log("CARCONTROL IF-ELSE: CarList - formVisibleOnPage:selectedCar:editing");
                console.log(this.state.formVisibleOnPage);
                console.log(this.state.selectedCar);
                console.log(this.state.editing);
                // currentlyVisibleState = <CarList carList={this.state.masterCarList} onCarSelection={this.handleChangingSelectedCar} />;
                currentlyVisibleState = <CarList onCarSelection={this.handleChangingSelectedCar} />;
                buttonText = "Go Back";
            }
            return (
                <React.Fragment>
                    <h1>I am in Carcontrol</h1>

                    {/* <h1>Headlines</h1> */}
                    {/* <ul>
                        {headlines.map((headline, index) =>
                            <li key={index}>
                                <h3>{headline.title}</h3>
                                <p>{headline.abstract}</p>
                            </li>
                        )}
                    </ul> */}
                    <h1>{currentlyVisibleState}</h1>

                    <button onClick={this.handleClick}>{buttonText}</button>
                </React.Fragment>
            );
        }

    }
}

CarControl.propTypes = {
    headlines: PropTypes.array,
    // masterCarList: PropTypes.object,
    formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
    return {
        headlines: state.headlines,
        isLoading: state.isLoading,
        error: state.error
    }
}

CarControl = connect(mapStateToProps)(CarControl);  //return value of the connect() function is the CarControl component itself, but this time we will have powerful new tools at our disposal: the dispatch() and mapStateToProps() functions.

export default withFirestore(CarControl);