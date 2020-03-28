// code from https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable/27255103#27255103
// change reactdom findnode to ref?

import React, { Component } from "react";
import ReactDOM from "react-dom";

class ContentEditable extends Component {
  constructor(props) {
    super(props);

    this.selfRef = React.createRef();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    return (
      <div
        ref={this.selfRef}
        id="contenteditable"
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
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
