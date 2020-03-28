import React, { Component } from "react";

// button somewhere to allow you to edit other lists

// shortcuts
// you can hit something to add a new item
// something to delete all items
// something to clear the text of the current item

class EditPage extends Component {
  constructor(props) {
    super(props);

    const loc = window.location.href;
    const listName = loc.substring(loc.indexOf("?") + 1);

    this.state = {
      currentName: "",
      currentList: [],
      listNames: []
    };

    let listInfo = localStorage.getItem(listName);
    if (listInfo !== null) {
      listInfo = JSON.parse(listInfo);
      this.state.currentName = listInfo.name;
      this.state.currentList = listInfo.items;
    } else {
      this.state.currentName = "New List";
    }
    this.state.listNames = JSON.parse(localStorage.getItem("listNames"));

    this.handleNameChange = this.handleNameChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editList = this.editList.bind(this);
  }

  // separate function to update local storage for more DRY
  updateLocalStorage(prevState) {
    // Update the list of list names
    // go through the list of list names
    let names = localStorage.getItem("listNames");
    if (names !== null) {
      names = JSON.parse(names);
    } else {
      names = [];
    }

    for (let i = 0; i < names.length; i++) {
      // if there is one that matches the previous name
      if (names[i] === prevState.currentName) {
        // set it to the new name
        names[i] = this.state.currentName;
      } else {
        // otherwise add it to the list
        names.append(this.state.currentName);
      }
    }
    localStorage.setItem("listNames", names);

    // add in some checks to make sure it's not messing with my variables
    // maybe put "user" in front of all user defined variables

    // Update the actual list
    // remove the old list
    if (prevState !== undefined) localStorage.removeItem(prevState.currentName);
    // set a new list to the new name with the new values
    localStorage.setItem(this.state.currentName, this.state.currentList);
  }

  handleNameChange(e) {
    this.setState({
      currentName: e.target.value
    });

    // update local storage
    this.updateLocalStorage();
  }

  editList(newText, index) {
    this.setState(prevState => {
      let newList = prevState.currentList;
      newList[index] = newText;
      return {
        currentList: newList
      };
    });

    this.updateLocalStorage();
  }

  addItem() {
    this.setState(prevState => ({
      currentList: prevState.currentList.concat([""])
    }));

    this.updateLocalStorage();
  }

  deleteItem(index) {
    this.setState(prevState => {
      let newList = prevState.currentList;
      newList.splice(index, 1);
      return {
        currentList: newList
      };
    });

    this.updateLocalStorage();
  }

  render() {
    return (
      <div>
        <div>
          <h2>Edit Different List</h2>
          <select>
            {this.state.currentList.map(item => (
              <option>item</option>
            ))}
          </select>
        </div>
        <div>
          List Name:
          <input
            type="text"
            onChange={this.handleNameChange}
            value={this.state.currentName}
          />
        </div>
        {this.state.currentList.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              value={this.state.currentList[index]}
              onChange={e => this.editList(e.target.value, index)}
            />
            <button onClick={() => this.deleteItem(index)}>Delete</button>
          </div>
        ))}
        <div>
          <button onClick={this.addItem}>Add Item</button>
        </div>
      </div>
    );
  }
}

export default EditPage;
