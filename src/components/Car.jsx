import React from "react";
import PropTypes from "prop-types";

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
    <React.Fragment>
      <div onClick={() => props.whenCarClicked(props.id)}>
        {/* <h3>{props.Make} - {props.Miles}</h3> */}
        <div onClick={() => props.onCarSelection(props.id)}>
          <div className="thumbnail">
            {/* <img style={myStyledComponentStyles} src={props.ImageURLs[0].value} alt=""></img> */}
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
      </div>
    </React.Fragment>
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