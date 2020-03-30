import React, { Component } from "react";
import ListDropdown from "./ListDropdown";
import ContentEditable from "./ContentEditable";

// allow the user to type on a content editable thing maybe
// but they can also hit a button (or use a keyboard shortcut) to insert a list
// inserting the list adds a dropdown box as an inline element to the text
// each drop down option is a possible list to be selected
// the dropdown is a separate component

// have a generate button and a keyboard shortcut

class GeneratePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alternator: false,
      text: ""
    };

    this.state.text =
      "This is your sentence. LIST You can edit it and add a random item from the list by clicking the add button to the side or by pressing ctrl-b.";

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

  handleContentEdited(newText,) {
    console.log(newText);
    // get the new content by the index and id
    // figure out which part of the text should be edited by splitting the same way its rendered and then using the index
    // let texts = this.state.text.split("LIST");
    // set that part to the new text
    // texts[index] = newText;

    // set the state text to the list joined back together
    this.setState({
      text: newText
    });
  }

  render() {
    let texts = this.state.text.split("LIST");

    return (
      <div className="generate-page">
        <ContentEditable
          onChange={e => this.handleContentEdited(e.target.value)}
        >
          {texts.map((text, index) => (
            <div key={index} className="display-inline">
              {text}
              
              {index !== texts.length - 1 ? (
                <l>
                <ListDropdown alternator={this.state.alternator}/>
                </l>
                ) : null}
            </div>
          ))}
          </ContentEditable>
        <button onClick={this.generate}>Generate</button>
        <button onClick={this.addList}>Add</button>
      </div>
    );
  }
}

export default GeneratePage;
