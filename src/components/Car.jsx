import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from 'react-bootstrap';
// import LikeButton from './LikeButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import "./Car.css";

const myStyledComponentStyles = {
  backgroundColor: "#ecf0f1",
  fontFamily: "Segoe UI",
  paddingRight: "0px",
  paddingBottom: "0px",
  marginBottom: "0px",
  marginLeft: "0px",
  maxWidth: "100%",
  height: "auto",
  paddingLeft: "4px"
};

const listenForLikes = () => {
  const likes = document.querySelectorAll(".like");
  likes.forEach(like => {
   like.addEventListener("click", (event) => {
     event.target.classList.toggle("like-no");
     event.target.classList.toggle("like-yes");
     if (event.target.classList.contains("like-yes")) {
       console.log("✅💾 Saving Favorite...");
      //  getFaveData(event.target);
     } else {
       console.log("❌ Removing Favorite...");
      //  getFaveData(event.target);
     }
   })
  })
}

function Car(props) {
  const like = document.createElement("div");
  return (
    <React.Fragment>
      <Col lg={4}>
        <div>
          <div className="thumbnail">
            <div onClick={() => props.whenCarClicked(props.id)}>
              <img class = "like-no" style={myStyledComponentStyles} src={props.ImageURL} alt=""></img>
            </div>
            <div onClick={() => props.whenLikeButtonClicked(props.id)}>
              <div style={{ margin: 'auto', display: 'block', width: 'fit-content' }}>
                <FormControlLabel control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked = {true} name="checkedH" />} label="" onClick= { () => props.whenLikeButtonClicked (props.id) }/>
              </div>
            </div>
            { listenForLikes()}
            {like.classList.add("like", "like-no")}
            {/* <button onClick= { () => props.whenLikeButtonClicked (props.id) }>Like</button> */}
            {/* <p>Like</p> */}
            <p className="moreWeight">{props.Year} {props.Make} {props.Model}</p>
            <p className="lessWeight">{props.Trim} | {props.Miles.toLocaleString()}{" "}miles</p>
            <p className="moreWeight">${props.Price.toLocaleString()}</p>
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
  whenLikeButtonClicked: PropTypes.func,
  formattedWaitTime: PropTypes.string
};

export default Car;