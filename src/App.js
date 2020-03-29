import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditPage from "./EditPage";
import HomePage from "./HomePage";
import GeneratePage from "./GeneratePage";

// have the backend be in localstorage
// store a variable with the list of the names of lists
// store a variable with the list of items for each list the user creates

export default function App() {
  return (
    <Router>
      {/*Navbar*/}
      <Switch>
        <Route path="/edit" component={EditPage} />
        <Route path="/generate">
          <GeneratePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      {/*Footer*/}
    </Router>
  );
}
