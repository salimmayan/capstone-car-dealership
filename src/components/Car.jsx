import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from 'react-bootstrap';

const myStyledComponentStyles = {
  backgroundColor: "#ecf0f1",
  fontFamily: "Segoe UI",
  paddingRight: "0px",
  paddingBottom: "0px",
  marginBottom: "0px",
  marginLeft: "0px",
  maxWidth: "100%",
  height: "auto",
  paddingLeft: "4px",
  // wdth: "100%",
};

function Car(props) {
  return (
    <Col lg={4}>
    <div>
      {/* <div onClick={() => props.whenCarClicked(props.id)}> */}
        {/* <h3>{props.Make} - {props.Miles}</h3> */}
        <div onClick={() => props.whenCarClicked(props.id)}>
          <div className="thumbnail">
            {/* <img style={myStyledComponentStyles} src={props.IkeymageURLs[0].value} alt=""></img> */}
            <img style={myStyledComponentStyles} src={props.ImageURL} alt=""></img>
            <p className="moreWeight">
              {props.Year} {props.Make} {props.Model}
            </p>
            <p className="lessWeight">
              {props.Trim} | {props.Miles.toLocaleString()}{" "}
              miles
            </p>
            <p className="moreWeight">
              ${props.Price.toLocaleString()}
            </p>
          </div>
        </div>
      {/* </div> */}
    </div>
    </Col>
  );
}

Car.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
  id: PropTypes.string,
  whenCarClicked: PropTypes.func,
  formattedWaitTime: PropTypes.string
};

export default Car;