import "./Car.css";
import desktopImage from './../img/landingPage.jpg';
// import SignInModal from "./SignInModal";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "firebase/app"; //auth related -  give us access to firebase.auth() methods


function LandingPage(props) {
    const imageUrl = desktopImage;
    const { onSignInSuccess } = props;
    const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [errMessageSignIn, setErrMessageSignIn] = useState();
    const [errMessageSignUp, setErrMessageSignUp] = useState();
    const handleSignInClose = () => {setSignIn(false); handleSignInError();}
    const handleSignInShow = () => setSignIn(true);
    const handleSignUpClose = () => { setSignUp(false); handleSignUpError();}
    const handleSignUpShow = () => setSignUp(true);
    const handleSignInError = () => setErrMessageSignIn();
    const handleSignUpError = () => setErrMessageSignUp();

    function doSignUp(event) {
        event.preventDefault(); //prevent the default behavior of submitting a form (a page reload).
        handleSignUpError();
        const email = event.target.signUpEmail.value;
        const password = event.target.signUpPassword.value;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            //createUserWithEmailAndPassword() returns a promise, which means we can attach then to it.
            console.log("Successfully Signed Up!");
        })
            .catch(function (error) {
                console.log(error.message);
                setErrMessageSignUp(error.message);
            });
    }

    function doSignIn(event) {
        event.preventDefault();
        handleSignInError();
        const email = event.target.signInEmail.value;
        const password = event.target.signInPassword.value;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function () {
                //we are using the firebase.auth().signInWithEmailAndPassword() method.
                console.log("Successfully Signed In!");
                onSignInSuccess();
                handleSignInClose();                
                // <Ridirect to="/"/>
            })
            .catch(function (err) {
                console.log(err.message);
                setErrMessageSignIn(err.message);
            });
    }

    function doSignOut() {
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

// function onSignInSuccess() {
//     var signInText ="Successfully Signed In!";
//     return signInText;
// }

    return (
        <React.Fragment>
            <div className="container">
                <div className="reUsableKegForm coralColor newWrapper thumbnail" style={{ backgroundImage: `url(${imageUrl})`, backgroundRepeat: 'no-repeat', width: '1920px', height: '1199px', color: 'white' }}>
                    <br></br> <br></br> <br></br>
                    <h1 style={{ fontWeight: 20009, color: "red" }}>CONSOLIDATED CARS</h1>
                    <h3 style={{ color: "red" }}>Buy a car entirely online, and have it safely delivered, contact-free.</h3>
                    <div className="carDetailButton lotOfMarginTop">
                        <button style={{ marginLeft: "50px" }} className="width-175px paddingRightLeft buttonPrimary btn btn-secondory" type="reset" onClick={handleSignInShow}>SignIn</button>
                        <br></br>
                        <button id="close" style={{ marginLeft: "50px" }} className="width-175px paddingRightLeft buttonPrimary btn btn-primary" type="reset" onClick={handleSignUpShow}>SignUp</button>
                    </div>
                </div>
            </div>
            <div>
                <Modal show={signIn} onHide={handleSignInClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <form onSubmit={doSignIn}>
                                <input type="text" name="signInEmail" placeholder="Email" />
                                <br></br>
                                <input style={{ marginTop: "10px" }} type="password" name="signInPassword" placeholder="Password" />
                                <br></br>
                                <div className="navBarRed">{errMessageSignIn}</div>
                                <button style={{ marginTop: "10px" }} className="btn btn-info btn-sm" type="submit">Sign In</button>
                               
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleSignInClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <Modal show={signUp} onHide={handleSignUpClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <form onSubmit={doSignUp}>
                                <input type="text" name="signUpEmail" placeholder="Email" />
                                <br></br>
                                <input style={{ marginTop: "10px" }} type="password" name="signUpPassword" placeholder="Password" />
                                <br></br>
                                <div className="navBarRed">{errMessageSignUp}</div>                                
                                <button style={{ marginTop: "10px" }} className="btn btn-info btn-sm" type="submit">Sign Up</button>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleSignUpClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </React.Fragment>
    );
}


LandingPage.propTypes = {
    onSignInSuccess: PropTypes.func,
  };

export default LandingPage;