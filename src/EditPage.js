import React, { Component } from "react";
import { HotKeys, configure } from "react-hotkeys";


// button somewhere to allow you to edit other lists

// shortcuts
// you can hit something to add a new item
// something to delete all items
// something to clear the text of the current item

class EditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentName: "",
      currentList: [],
      listNames: []
    };

    configure({
        ignoreEventsCondition: () => false
    })

    this.getInfoFromURL();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editList = this.editList.bind(this);
    this.handleDropDownSelect = this.handleDropDownSelect.bind(this);
    this.deleteCurrent = this.deleteCurrent.bind(this);
  }

  getInfoFromURL() {
    const loc = window.location.href;
    let listName = loc.substring(loc.lastIndexOf("/") + 1);
    console.log(listName);
    listName = listName.replace("%20", " ");

    let listItems = localStorage.getItem(listName);
    console.log(listItems)
    if (listItems !== null) {

      listItems = JSON.parse(listItems);
      this.state.currentList = listItems;
    } else {
      // this is a new list
      this.state.currentList = [];
    }

    this.state.currentName = listName;


    let listNamesRaw = localStorage.getItem("listNames");
    if (listNamesRaw !== null) {
      console.log(listNamesRaw)
      try {
        this.state.listNames = JSON.parse(listNamesRaw);
      } catch {
        console.log("List Names unparsable");
      }
    }
  }

  // separate function to update local storage for more DRY
  updateLocalStorage(prevState) {
    // Update the list of list names
    // go through the list of list names
    let names = localStorage.getItem("listNames");
    if (names !== null && names !== "") {
      names = JSON.parse(names);
    } else {
      names = [];
    }

    let foundOne = false;
    for (let i = 0; i < names.length; i++) {
      // if there is one that matches the previous name
      if (names[i] === prevState.currentName) {
        // set it to the new name
        names[i] = this.state.currentName;
        foundOne = true;
      }
    }
    if (!foundOne) {
      // otherwise add it to the list
      names.push(this.state.currentName);
    }
    console.log(names);
    localStorage.setItem("listNames", JSON.stringify(names));

    // also update the list of names for the dropdown selector
    this.setState({
      listNames: names
    })

    // add in some checks to make sure it's not messing with my variables
    // maybe put "user" in front of all user defined variables

    // Update the actual list
    // remove the old list
    if (prevState !== undefined) localStorage.removeItem(prevState.currentName);
    // set a new list to the new name with the new values
    localStorage.setItem(this.state.currentName, JSON.stringify(this.state.currentList));
  }

  handleNameChange(e) {
    let prevState = this.state;
    this.setState({
      currentName: e.target.value
    }, () => this.updateLocalStorage(prevState));

  }

  editList(newText, index) {
    let prevState = this.state;
    this.setState(prevState => {
      let newList = prevState.currentList;
      newList[index] = newText;
      return {
        currentList: newList
      };
    }, () => this.updateLocalStorage(prevState));
  }

  addItem() {
    let prevState = this.state;
    this.setState(prevState => ({
      currentList: prevState.currentList.concat([""])
    }), () => {
      this.updateLocalStorage(prevState); 
      this.selectLastInput();
    });
  }

  selectLastInput() {
    let consts = document.getElementsByClassName("item-input")
    consts[consts.length - 1].focus();
  }

  deleteItem(index) {
    let prevState = this.state;
    this.setState(prevState => {
      let newList = prevState.currentList;
      newList.splice(index, 1);
      return {
        currentList: newList
      };
    }, () => this.updateLocalStorage(prevState));

  }

  deleteCurrent() {
    // delete the list that has this.state.currentName
    // set the current list to the list with index 0

    let names = localStorage.getItem("listNames");
    if (names !== null && names !== "") {
      names = JSON.parse(names);
    } else {
      names = [];
    }

    for (let i = names.length - 1; i >= 0; i--) {
      // if there is one that matches the previous name
      if (names[i] === this.state.currentName) {
        // delete it
        names.splice(i, 1);
        break;
      }
    }

    localStorage.setItem("listNames", JSON.stringify(names));
    this.setState({
      listNames: names
    }, () => this.handleDropDownSelect({
      target: {
        value: names[0]
      }
    }));

    localStorage.setItem("recentlyDeletedItems", JSON.stringify(this.state.currentList))
    localStorage.removeItem(this.state.currentName);
  }

  handleDropDownSelect(e) {
    let newName = e.target.value;
    if (newName === "addNewList" || newName === undefined) {
      newName = "New List";
      if (this.state.currentName === "New List") {
        console.log("need to rename list first");
        // display some kind of error
      }
    }

    this.props.history.push("/edit/" + newName.replace(" ", "%20"))
    // set the state and stuff to match the new selected one
    this.getInfoFromURL();
  }

  render() {
    const keyMap = {
      "ADD_ITEM": "enter"
    }

    const handlers = {
      "ADD_ITEM": this.addItem
    }

    return (
      <div className="edit-page">
        <div>
          <select value={this.state.currentName} onChange={this.handleDropDownSelect}>
            {this.state.listNames.map(item => (
              <option value={item}>{item}</option>
            ))}
            <option value="addNewList">+</option>
          </select>
        </div>
        <div className="list-name-input">
          <input
            type="text"
            onChange={this.handleNameChange}
            value={this.state.currentName}
          />
        </div>
        <HotKeys keyMap={keyMap} handlers={handlers}>
          <div className="list-items">
            {this.state.currentList.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={this.state.currentList[index]}
                  onChange={e => this.editList(e.target.value, index)}
                  className="item-input"
                />
                <button onClick={() => this.deleteItem(index)}>X</button>
              </div>
            ))}
          </div>
        </HotKeys>

        <div className="add-button">
          <button onClick={this.addItem}>Add Item</button>
        </div>
        
        
        <div className="delete-container">
          <button className="delete-button" onClick={this.deleteCurrent}>Delete List</button>
        </div>
      </div>
    );
  }
}

export default EditPage;
