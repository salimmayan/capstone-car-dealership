// import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Car.css";

function SignInModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <div>
            <Button variant="primary" onClick={handleShow}>Launch Modal</Button> 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className = "container">
                        <p>Add Login Fields</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            </div>
        </React.Fragment>
    );
}


export default SignInModal;