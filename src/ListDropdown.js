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
      chosenItems: []
    };

    let listNames = localStorage.getItem("listNames");
    if (listNames !== null) {
      listNames = JSON.parse(listNames);
      this.state.listChoices = listNames;
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState(() => {
      let storedItems = localStorage.getItem(e.target.value);
      storedItems = JSON.parse(storedItems);

      return {
        chosen: e.target.value,
        chosenItems: storedItems
      };
    });
  }

  getRandomItem() {
    const chosen = this.state.chosenItems;
    return <span>{chosen[Math.floor(Math.random() * chosen.length)]}</span>;
  }

  render() {
    return (
      <div>
        {this.getRandomItem()}
        <select onChange={this.handleChange}>
          {this.state.listChoices.map(name => (
            <option value={name}>{name}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default ListDropdown;
