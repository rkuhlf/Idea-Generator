import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <h1>Idea Generator</h1>

        <p>
          Struggling with creativity?
          <br />
          <Link to="/edit/newList">Create a new list</Link> or{" "}
          <Link to="/generate">use a pregenerated one</Link> to help you come up
          with ideas.
        </p>
      </div>
    );
  }
}

export default HomePage;
