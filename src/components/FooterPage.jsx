import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <div className="footer">
      <MDBFooter color="blue" className="font-small pt-4 mt-4">
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="6">
              <h6 className="title">CONSOLIDATED CARS</h6>
              <p className="footerAlt">
                © 2021 CONSOLIDATED CARS. ALL RIGHTS RESERVED. 
              </p>
              <a href="https://www.facebook.com/dealeron/" target="_blank" rel="noopener noreferrer" className = "padding fa fa-facebook"> </a> 
              <a href="https://twitter.com/DealerOn" target="_blank" rel="noopener noreferrer" className = "padding fa fa-twitter"> </a>
              <a href="https://www.instagram.com/dealeron_inc/" target="_blank" rel="noopener noreferrer" className = "padding fa fa-instagram"> </a>
            </MDBCol>
            <MDBCol md="3">
              <h6 className="title">About</h6>
              <ul>
                <li className="list-unstyled">
                  <p className="footerAlt">Terms of Use</p>
                </li>
                <li className="list-unstyled">
                  <p className="footerAlt">Privacy</p>
                </li>
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h6 className="title">Contact</h6>
              <ul>
                <li className="list-unstyled">
                  <p className="footerAlt">(800) 450 3124</p>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {/* <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
          </MDBContainer>
        </div> */}
      </MDBFooter>
    </div>
  );
};

export default FooterPage;
