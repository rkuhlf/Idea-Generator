import React, { Component } from "react";


// allow the user to type on a content editable thing maybe
// but they can also hit a button (or use a keyboard shortcut) to insert a list
// inserting the list adds a dropdown box as an inline element to the text
// each drop down option is a possible list to be selected
// the dropdown is a separate component

// have the list show a random item from the list
// whenever you hover over it, it shows the dropdown

class ListDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listChoices: [],
      chosen: "",
      listName: props.listName,
      alternator: false
    };

    

    this.handleChange = this.handleChange.bind(this);
  }

  determineChoices() {
    let choices = localStorage.getItem(this.state.listName);
    if (choices !== null) {
      choices = JSON.parse(choices);
      this.setState({
        listChoices: choices,
        chosen: this.getRandomItem(choices)
      })
    } else {
      this.setState({
        listName: "Not a List",
        listChoices: [],
        chosen: "Not a List"
      })
    }
  }

  handleChange(e) {
    let newChosen = e.target.value;

    this.setState(() => {
      return {
        chosen: newChosen
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("dropdown recieves props with ", nextProps.alternator);
    console.log("state alternator is currently", this.state.alternator)
    if (nextProps.alternator !== this.state.alternator) {
      console.log("props different");
      this.setState({
        chosen: this.getRandomItem(this.state.listChoices),
        alternator: nextProps.alternator
      })
    } if (nextProps.listName !== this.props.listName) {
      this.setState({
        listName: nextProps.listName
      }, this.determineChoices);
    }
  }

  getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  render() {
    return (
      <select value={this.state.chosen} onChange={this.handleChange}>
        {this.state.listChoices.map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
        
      </select>

    );
  }
}

export default ListDropdown;
