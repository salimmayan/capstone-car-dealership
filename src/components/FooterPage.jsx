import React from "react";
import "./Car.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="main-footer">
      <div className="containerNew">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h6 className="title">CONSOLIDATED CARS</h6>
            <h1 className="list-unstyled"></h1>
            <ul >

             <a href="https://www.youtube.com/user/DealerOnVideo" className="youtube social"> <FontAwesomeIcon icon={faYoutube} size="2x" /> </a> <br></br>
               <a href="https://www.facebook.com/dealeron/" className="facebook social"> <FontAwesomeIcon icon={faFacebook} size="2x" /> </a><br></br>
             <a href="https://twitter.com/DealerOn" className="twitter social"> <FontAwesomeIcon icon={faTwitter} size="2x" /> </a><br></br>
              <a href="https://www.instagram.com/dealeron_inc/" className="instagram social"> <FontAwesomeIcon icon={faInstagram} size="2x" /></a><br></br>


              {/* <li><a href="https://www.facebook.com/dealeron/" target="_blank" rel="noopener noreferrer" className="padding fa fa-facebook anchorTagColor"> </a>   </li>
              <li> <a href="https://twitter.com/DealerOn" target="_blank" rel="noopener noreferrer" className="padding fa fa-twitter anchorTagColor"> </a> </li>
              <li>  <a href="https://www.instagram.com/dealeron_inc/" target="_blank" rel="noopener noreferrer" className="padding fa fa-instagram anchorTagColor"> </a> </li> */}
            </ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h6 className="title">About</h6>
            <ul>
              <li className="list-unstyled">
                <p className="footerAlt">Terms of Use</p>
              </li>
              <li className="list-unstyled">
                <p className="footerAlt">Privacy</p>
              </li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h6 className="title">Contact</h6>
            <ul>
              <li className="list-unstyled">
                <p className="footerAlt">(800) 450 3124</p>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} CONSOLIDATED CARS | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;