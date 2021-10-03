import React from "react";
import "./Car.css";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
// import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { IoMdCall } from 'react-icons/io';
import { AiOutlineMail } from 'react-icons/ai';
import Modal from "react-responsive-modal";


// import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

const NavItem = props => {
  const pageURI = window.location.pathname + window.location.search
  const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
  const aClassName = props.disabled ? "nav-link disabled" : "nav-link"
  return (
    <li className={liClassName}>
      <a href={props.path} className={aClassName}>
        {props.name}
        {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
      </a>
    </li>
  );
}

class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
  }
  showDropdown(e) {
    e.preventDefault();
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? ' show' : '')
    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false"
          onClick={(e) => { this.showDropdown(e) }}>
          {this.props.name}
        </a>
        <div className={classDropdownMenu} aria-labelledby="navbarDropdown">
          {this.props.children}
        </div>
      </li>
    )
  }
}


class NavigationBar extends React.Component {



  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    // useScript('https://code.jquery.com/jquery-3.4.1.min.js');
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <a className="navbar-brand" href="/">CONSOLIDATED CARS</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavItem path="/" name="Home" />
            {/* <NavItem path="/signin" name="Sign In" /> */}
            <NavItem path="/createcar" name="Upload Data" />
            <NavItem path="/about" name="About" />
            <NavItem path="/page" name="LandingPage" />


            <NavDropdown name="Contact">
              <button className="dropdown-item"><IoMdCall /> <span className="navBarRed">(800) 450 3124</span> </button>
              <button className="dropdown-item" href="/email"><AiOutlineMail /><span className="navBarRed"> helpdesk@c-cars.com</span></button>
              <div className="dropdown-divider"></div>
              {/* <a className="dropdown-item" href="/Form">Formno</a> */}
            </NavDropdown>

          </ul>
          <ul className="navbar-nav navbar-right">
            <NavItem path="/signin" name="SignUp" />
            <NavItem path="/logout" name="LogOut" />
           
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
        </div>
      </nav>
    )
  }
}

export default NavigationBar;