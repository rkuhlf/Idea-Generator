// code from https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable/27255103#27255103
// change reactdom findnode to ref?

import React, { Component } from "react";
import { HotKeys, configure } from "react-hotkeys";

class ContentEditable extends Component {
  constructor(props) {
    super(props);

    this.selfRef = React.createRef();
    this.emitChange = this.emitChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    configure({
      ignoreEventsCondition: () => false
    })
  }

  getCaretPosition() {
    const editableDiv = this.selfRef.current;
    var caretPos = 0,
      sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return caretPos;
  }


  render() {
    const keyMap = {
      MOVE_UP: "ctrl+l"
    };

    const handlers = {
      MOVE_UP: event => {
        console.log("insert list!!!");
        const pos = this.getCaretPosition();
        let oldHtml = this.selfRef.current.innerHTML; 
        let newHtml = oldHtml.substring(0, pos) + "LIST" + oldHtml.substring(pos);
        this.selfRef.current.innerHTML = newHtml;
        this.emitChange();
        event.preventDefault();
      }
    };


    return (
      <div className="content-editable">
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <div
          ref={this.selfRef}
          id="contenteditable"
          onInput={this.emitChange}
          onBlur={this.emitChange}
          contentEditable
          dangerouslySetInnerHTML={{ __html: this.props.html }}
        />
      </HotKeys>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.selfRef.current.innerHTML;
  }

  componentDidUpdate() {
    if (this.props.html !== this.selfRef.current.innerHTML) {
      this.selfRef.current.innerHTML = this.props.html;
    }
  }

  onKeyPress(e) {
    console.log(e.key);
    console.log(e.ctrlKey)
  }

  emitChange() {
    var html = this.selfRef.current.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }
}

export default ContentEditable;
