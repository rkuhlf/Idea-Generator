import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <h1>Idea Generator</h1>

        <p>
          Struggling with creativity? <Link to="/edit/newList">Create a new list</Link> or{" "}
          <Link to="/generate">use a pregenerated one</Link> to help you come up
          with ideas.
        </p>

        <p>
          The principle behind this website is that there are so many good ideas and good combinations of ideas floating around out there, but we just haven't seen them in the right order yet. So, by allowing you to create lists of items and then insert a random item from that list into a sentence, mad libs style, I hope that you can come up with your next big idea.
        </p>
      </div>
    );
  }
}

export default HomePage;
