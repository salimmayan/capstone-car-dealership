import React from "react";
import Header from "./Header";
import CarControl from "./CarControl";
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './NavigationBar';
import AboutPage from './AboutPage';
import LandingPage from './LandingPage';
import NewCarFrom from './NewCarForm';
import FooterPage from './FooterPage';
import LogOut from './LogOut';

function App() {
  return (
    <Router>
    <div className="container">
      <NavigationBar /> {/* Navbar is outside of <Switch> component */}
      <main className="container">
        <Switch> {/* switch component is like a conditional - it will render only one of the routes contained inside */}
          <Route path="/signin"> {/* the path should always begin with a / (just like an actual path in a URL). */}
            <Signin />
          </Route>
          <Route path="/createcar">
            <NewCarFrom />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/">
            <CarControl />
          </Route>
          <Route path="/page">
            <LandingPage />
          </Route>
          <Route path="/logout">
            <LogOut />
          </Route>
        </Switch>
        
      </main>
     
    </div>
   {/* <div className="containerNew">   */}
   <FooterPage />
      {/* </div> */}
   
  </Router>
  );
}

export default App;
