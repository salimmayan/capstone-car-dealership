import React from "react";
import Header from "./Header";
import CarControl from "./CarControl";
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    // <React.Fragment>
    //   <Header />
    //   <TicketControl />
    // </React.Fragment>
    <Router>    {/* wrap all the content in our return statement inside a <Router> component. */}
      <Header />
      <Switch>    {/* <Switch> component as being like a conditional - it will render only one of the routes contained inside the <Switch> component. */}
        <Route path="/signin">   {/* The <Route> component is wrapped around the component we want to render if the URL is correctly matched */}
          <Signin />
        </Route>
        <Route path="/">
          <CarControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
