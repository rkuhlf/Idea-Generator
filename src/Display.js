import React from "react";
import ListDropdown from "./ListDropdown";

class Display extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			compiled: null,
			alternator: this.props.alternator
		}

		this.state.compiled = this.compile(props.uncompiled)
	}

	compile(text) {
		const re = /@\[(.*?)\]/g
		let match;

		let texts = [];
		let lists = [];
		let index = 0;
		let endIndex = 0;

		do {
		    match = re.exec(text);

		    if (match) {
				index = match.index;
				endIndex = index + match[0].length;
		        texts.push(text.substring(0, index));
				lists.push(match[1])
		    }
		} while (match);

		texts.push(text.substring(endIndex));
		

		return (
			<div>
				{
					texts.map((text, index) => 
						[
						text,
						index !== lists.length ? <ListDropdown alternator={this.state.alternator} listName={lists[index]} /> : null
						]
					)
				}
			</div>
			)
	}
	
	componentWillReceiveProps(nextProps) {
	    if (nextProps.uncompiled !== this.state.uncompiled) {
	      this.setState({compiled: this.compile(nextProps.uncompiled)});
	    }

	    // check if alternator switched
	    if (nextProps.alternator !== this.state.alternator) {
	      this.setState({alternator: nextProps.alternator});
	    }
	  }

	render() {
		return (
			<div>
				{this.state.compiled}
			</div>
			)
	}
}

export default Display;