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
    }

    shouldComponentUpdate(nextProps){
        return nextProps.html !== this.getDOMNode().innerHTML;
    }

    componentDidUpdate() {
        if ( this.props.html !== this.getDOMNode().innerHTML ) {
           this.getDOMNode().innerHTML = this.props.html;
        }
    }

    emitChange(){
        var html = this.getDOMNode().innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }

    render() {
        return <div id="contenteditable"
            onInput={this.emitChange} 
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    }
}

export default Editor;