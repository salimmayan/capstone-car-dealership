
import "./Car.css";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "firebase/app"; //auth related -  give us access to firebase.auth() methods
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LogOut(props) {
    console.log("INSIDE LOGOUT@@@@@"); 
    const isLoggedInRedux = useSelector(state => state.isLoggedInRedux);
    const dispatch = useDispatch();

    function doSignOut() {
        console.log("INSIDE LOGOUT@@@@@");
        firebase
            .auth()
            .signOut()
            .then(function () {
                //We use the firebase.auth().signOut() method, which also returns a promise.
                console.log("Successfully Signed out!");
                const action = {
                    type: 'TOGGLE_LOGIN',
                }
                dispatch(action);
            })
            .catch(function (e) {
                console.log(e.message);
            });
    }

    console.log("INSIDE LOGOUT@@@@@");
    return (

        <React.Fragment>
            <div>
                {this.doSignOut}
                <h1>I AM IN LOG OUT PAGE</h1>
            </div>
        </React.Fragment>
    );
}


export default LogOut;