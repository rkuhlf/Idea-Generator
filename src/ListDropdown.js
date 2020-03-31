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
      this.state.chosen = listNames[0];
      let storedItems = localStorage.getItem(listNames[0]);
      storedItems = JSON.parse(storedItems);
      this.state.chosenItems = storedItems;
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let newChosen = e.target.value;

    this.setState(() => {
      let storedItems = localStorage.getItem(newChosen);
      storedItems = JSON.parse(storedItems);

      return {
        chosen: newChosen,
        chosenItems: storedItems
      };
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.alternator !== this.props.alternator || nextState.chosen !== this.state.chosen;
  }

  getRandomItem() {
    const chosen = this.state.chosenItems;
    return <span>{chosen[Math.floor(Math.random() * chosen.length)]}</span>;
  }

  render() {
    return (
      <div className="dropdown">
        <div className="display-relative">
          <div className="hidden">&beginlist&</div>
          <span contenteditable="false">
          {this.getRandomItem()}
          </span>
          <select value={this.state.chosen} onChange={this.handleChange}>
            {this.state.listChoices.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
            <div className="hidden">&endlist&</div>
          </select>
        </div>
      </div>
    );
  }
}

export default ListDropdown;
