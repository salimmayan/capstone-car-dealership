import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from 'react-bootstrap';
// import LikeButton from './LikeButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

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
      <Col lg={4}>
        <div>
          {/* <div onClick={() => props.whenCarClicked(props.id)}> */}
          {/* <h3>{props.Make} - {props.Miles}</h3> */}

          <div className="thumbnail">
            <div onClick={() => props.whenCarClicked(props.id)}>
              <img style={myStyledComponentStyles} src={props.ImageURL} alt=""></img>
            </div>
            <div onClick={() => props.whenLikeButtonClicked(props.id)}>
            <div style={{ margin: 'auto', display: 'block', width: 'fit-content' }}>
              <FormControlLabel control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />} label="" />
            </div>
            </div>
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
      </Col>
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