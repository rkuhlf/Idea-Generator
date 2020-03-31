// code from https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable/27255103#27255103
// change reactdom findnode to ref?

// fix getCaret so that it works with sub react components
// fix so that there is no domexception because fail to removeChild on Node
// make it so the select is not content editable

import React, { Component } from "react";
import { HotKeys, configure } from "react-hotkeys";
import ReactDOMServer from "react-dom/server";
import ErrorBoundary from "./ErrorBoundary";

class ContentEditable extends Component {
    constructor(props) {
        super(props);

        this.selfRef = React.createRef();
        this.emitChange = this.emitChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.reactHTML = this.props.children;
        configure({
            ignoreEventsCondition: () => false
        })
    }

    getCaretPosition() {
        const element = this.selfRef.current;
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);

                let preCaretString = preCaretRange.toString().split(/&beginlist&.*?&endlist&/);
                preCaretString = preCaretString.join("LIST");

                caretOffset = preCaretString.length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }

    renderedHtmlToString(html) {
        while (html.includes("<l>")) {
            const startIndex = html.indexOf("<l>");
            const endIndex = html.indexOf("</l>");

            html = html.substring(0, startIndex) + "LIST" + html.substring(endIndex + 4);
        }

        while (html.includes("<")) {
            const startIndex = html.indexOf("<");
            const endIndex = html.indexOf(">");

            html = html.substring(0, startIndex) + html.substring(endIndex + 1);
        }

        return html;
    }


    render() {
        const keyMap = {
            INSERT_LIST: "ctrl+l",
            BACKSPACE: "backspace",
            TEST_CARET: "alt+c"
        };

        const handlers = {
            INSERT_LIST: event => {

                const pos = this.getCaretPosition();
                let oldHtml = this.renderedHtmlToString(this.selfRef.current.innerHTML);
                let newHtml = oldHtml.substring(0, pos) + "LIST" + oldHtml.substring(pos);
                this.selfRef.current.innerHTML = newHtml;
                this.emitChange();
                event.preventDefault();
            },
            BACKSPACE: event => {
                const pos = this.getCaretPosition();

                let currentHtml = this.renderedHtmlToString(this.selfRef.current.innerHTML);

                const stuffBefore = currentHtml.substring(pos - 4, pos);
                if (stuffBefore === "LIST") {
                    let newHtml = currentHtml.substring(0, pos - 4) + currentHtml.substring(pos);

                    this.selfRef.current.innerHTML = newHtml;
                    this.emitChange();
                    event.preventDefault();
                }
            },
            TEST_CARET: event => {

            }
        };

        // store react html in string in state
        // set innerHTML to renderToString
        // whenever it's edited, 

        // render the list in here
        return (
            <ErrorBoundary>
      <div className="content-editable">
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <div
          ref={this.selfRef}
          id="contenteditable"
          onInput={this.emitChange}
          onBlur={this.emitChange}
          contentEditable
        >{this.props.children}
        </div>
      </HotKeys>
      </div>
      </ErrorBoundary>
        );
    }

    shouldComponentUpdate(nextProps) {
        const newReact = nextProps.children;
        const oldReact = this.reactHTML;
        if (newReact.length !== oldReact.length) {
            return true;
        }

        return false;
    }

    componentDidUpdate() {
        console.log("updating component");
        if (ReactDOMServer.renderToString(this.props.children) !== this.selfRef.current.innerHTML) {

            this.reactHTML = this.props.children;
            this.selfRef.current.innerHTML = ReactDOMServer.renderToString(this.props.children);
        }
    }

    onKeyPress(e) {
        // console.log(e.ctrlKey)
    }

    emitChange() {
        var html = this.selfRef.current.innerHTML;

        html = this.renderedHtmlToString(html); // get rid of all of the tags

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