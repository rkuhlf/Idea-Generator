import React, { Component } from "react";
import ListDropdown from "./ListDropdown";
import Editor from "./Editor";
import Display from "./Display";

// allow the user to type on a content editable thing maybe
// but they can also hit a button (or use a keyboard shortcut) to insert a list
// inserting the list adds a dropdown box as an inline element to the text
// each drop down option is a possible list to be selected
// the dropdown is a separate component

// have a generate button and a keyboard shortcut


// WAAAAAH NOT WORKING

// make it so that the user can edit some text on the left that is then translated in to a displayed string with random lists

// EXAMPLE
// Hi this is my mother {list}(names). She is brilliant and has lots of good qualities
// include markdown support (maybe in a later update)
// include window support (you can hit a button to close or open the window)
// buttons are on the left edge and right edge respectively


class GeneratePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alternator: false,
      uncompiled: ""
    };

    this.state.uncompiled =
      "This is your sentence. @[LIST]() You can edit it and add a random item from the list by clicking the add button to the side or by pressing ctrl-b.";

    this.generate = this.generate.bind(this);
    this.addList = this.addList.bind(this);
    this.handleContentEdited = this.handleContentEdited.bind(this);
  }

  generate() {
    this.setState(prevState => ({
      alternator: !prevState.alternator
    }));
  }

  addList() {
    this.setState(prevState => ({
      text: prevState.text + "LIST"
    }))
  }

  handleContentEdited(newText) {
    this.setState({
      uncompiled: newText.target.value
    });
  }

  render() {
    return (
      <div className="generate-page">
        <div>
          <Editor onChange={this.handleContentEdited} html={this.state.uncompiled} />
        </div>
        <div>
          <Display uncompiled={this.state.uncompiled} />
        </div>
        <button className="generate-button" onClick={this.generate}>Generate</button>
        <button className="add-button" onClick={this.addList}>Add</button>
      </div>
    );
  }
}

export default GeneratePage;
