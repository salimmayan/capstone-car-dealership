
import "./Car.css";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "firebase/app"; //auth related -  give us access to firebase.auth() methods
import React from 'react';

function LogOut() {
    console.log("INSIDE LOGOUT@@@@@"); 
    function doSignOut() {
        console.log("INSIDE LOGOUT@@@@@");
        firebase
            .auth()
            .signOut()
            .then(function () {
                //We use the firebase.auth().signOut() method, which also returns a promise.
                console.log("Successfully Signed out!");
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