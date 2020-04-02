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
		console.log("compiling ", text);
		const re = /@\[(.*?)\]/g
		let match;

		let texts = [];
		let lists = [];
		let prevIndex = 0;
		let index = 0;
		let endIndex = 0;

		do {
		    match = re.exec(text);

		    if (match) {
				index = match.index;
				endIndex = index + match[0].length;
		        texts.push(text.substring(prevIndex, index));
				lists.push(match[1])
				prevIndex = endIndex;
		    }
		} while (match);

		texts.push(text.substring(endIndex));
		
		console.log(this.state.alternator);
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
		console.log("recieving props");
	    if (nextProps.uncompiled !== this.state.uncompiled) {
	      this.setState({compiled: this.compile(nextProps.uncompiled)});
	    }

	    // check if alternator switched
	    if (nextProps.alternator !== this.state.alternator) {
	    	console.log("state is opposite");
	    	console.log("setting display state to ", nextProps.alternator)
	    	this.setState({ // have to do both otherwise new props not passed
	    		alternator: nextProps.alternator,
	    	}, () => this.setState({
	    		compiled: this.compile(nextProps.uncompiled)
	    	}));
	    	// has to happen afterwards otherwise compile doesn't have the new state yet
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