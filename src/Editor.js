// code from https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable/27255103#27255103
// change reactdom findnode to ref?

// fix getCaret so that it works with sub react components
// fix so that there is no domexception because fail to removeChild on Node
// make it so the select is not content editable

import React, { Component } from "react";
import { HotKeys, configure } from "react-hotkeys";

// listen for hotkey, when it comes, first add to innerHTML, then emitChange so that it doesn't update and remove cursor


class Editor extends Component {
    constructor(props) {
        super(props);
        
        this.emitChange = this.emitChange.bind(this);
        configure({
            ignoreEventsCondition: () => false
        })

        this.caretPos = 0;
        this.selfRef = React.createRef();
        this.addList = this.addList.bind(this);
    }

    shouldComponentUpdate(nextProps){
        return nextProps.html !== this.selfRef.current.innerHTML;
    }

    componentDidUpdate() {
        if ( this.props.html !== this.selfRef.current.innerHTML ) {
           this.selfRef.current.innerHTML = this.props.html;
        }

    }

    emitChange(){
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

    addList() {
        // join all previous splits from the caret position being wrong
        const caret = this.getCaretPosition();

        if (caret !== -1) {
            this.caretPos = caret;
        }
        let innerHTML = this.selfRef.current.innerHTML;
        const textToAdd = "@[list]"
        innerHTML = innerHTML.substring(0, this.caretPos) + textToAdd + innerHTML.substring(this.caretPos)

        this.selfRef.current.innerHTML = innerHTML;

        // make sure caret position gets fixed
        this.setCaretPosition(this.caretPos + textToAdd.length);
        // this.joinAllInner();

    }

    joinAllInner() {
        let innerHTML = this.selfRef.current.innerHTML;

        this.selfRef.current.innerHTML = innerHTML;
    }

    setCaretPosition(pos) {
        console.log("setting caret position to", pos);
        // clicking twice sends the second back to the beginning
        // it seems to move further and further back
        let innerHTML = this.selfRef.current.innerHTML;
        innerHTML = innerHTML.substring(0, pos) + "<i id='select-pos'></i>" + innerHTML.substring(pos);
        this.selfRef.current.innerHTML = innerHTML;
        
        let selection = window.getSelection();
        selection.removeAllRanges();
        let range = document.createRange();

        let selectNode = document.getElementById("select-pos");
        range.selectNode(selectNode);
        selection.addRange(range);
        selectNode.remove();
        this.caretPos = pos;
    }

    getCaretPosition() {
        const editableDiv = this.selfRef.current;
        var caretPos = -1,
        sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
              range = sel.getRangeAt(0);
              // debugger;
              const loggable = Object.assign({}, range);
              console.log(loggable);
              if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
                if (range.startContainer.previousSibling !== null) {
                    caretPos += range.startContainer.previousSibling.length;
                    console.log("adding to make new pos", caretPos)
                }
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

    stopProp(event) {
        event.stopPropagation();
        event.preventDefault();
    }


    render() {
        return (
                <div>
                    <div ref={this.selfRef} id="contenteditable"
                        onInput={this.emitChange} 
                        onBlur={this.emitChange}
                        contentEditable
                        dangerouslySetInnerHTML={{__html: this.props.html}}></div>
                     <button className="add-button" onMouseDown={this.stopProp} onClick={this.addList}>Add</button>
                </div>
            )
        
    }
}

export default Editor;