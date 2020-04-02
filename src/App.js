import React from "react";
import "./css/styles.css";
import "./css/editPage.css";
import "./css/select.css";
import "./css/generatePage.css";
import "./css/scrollbar.css";
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from "react-router-dom";
import EditPage from "./EditPage";
import HomePage from "./HomePage";
import GeneratePage from "./GeneratePage";

import icon from "./img/creativity.svg"

// have the backend be in localstorage
// store a variable with the list of the names of lists
// store a variable with the list of items for each list the user creates

export default function App() {
  const scrollTop = () => {
    window.scrollTo(0, 0);
  }
  
  let year = new Date();
  year = year.getFullYear();

  return (
    <Router>
      {/*Navbar*/}
      <div className="navbar">
        <Link to="/"className="icon-title">
          <img src={icon} />
          <h3>Idea Generator</h3>
        </Link>
        <div className="links">
          <NavLink to="/" activeClassName="selected" exact>Home</NavLink>
          <NavLink to="/edit/new%20list" activeClassName="selected">Edit</NavLink>
          <NavLink to="/generate" activeClassName="selected">Generate</NavLink>
        </div>
      </div>
      <div className="main-content">
        <Switch>
          <Route path="/edit" component={EditPage} />
          <Route path="/generate">
            <GeneratePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
      {/*Footer*/}
      <div className="footer">
        <div className="scaling-grid">
          <div>
            The main goal of the idea generator is to help you come up with ideas so that you can create something. Make your own list of options or just use some of the pregenerated ones and see what you can come up with.
          </div>

          <div>
            <img src={icon} />
          </div>
          
          <div>
            <h2 className="footer-title">Idea Generator</h2>
            <div className="links">
              <a onClick={scrollTop}>Top</a>
              <Link to="/">Home</Link>
              <Link to="/edit">Edit</Link>
              <Link to="/generate">Generate</Link>
            </div>
          </div>
        </div>

        <div className="copyright">
          © {year} Riley Kuhlman 
        </div>

        {/* 
        description of what the website is trying to do
        icon
        Copyright info (make the year update automatically)
        scroll to top
        links to edit page, home page, and generate
        */}
      </div>
    </Router>
  );
}
