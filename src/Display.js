import React from "react";

class Display extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			compiled: null
		}

		this.state.compiled = this.compile(props.uncompiled)
	}

	compile(text) {
		const re = /@\[(.*?)\]\((.*?)\)/g
		let match;

		let texts = [];
		let lists = [];
		let index = 0;
		let endIndex = 0;

		do {
		    match = re.exec(text);

		    if (match) {
		    	console.log(match);
				index = match.index;
				endIndex = index + match[0].length;
		        texts.push(text.substring(0, index));
				lists.push([match[1], match[2]])
		    }
		} while (match);

		texts.push(text.substring(endIndex));
		
		console.log(texts, lists);

		return (
			<div>
				{
					texts.map((text, index) => 
						[
						text,
						index !== lists.length ? lists[index][0] : null
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
	  }

	render() {
		return (
			<div>
				DISPLAY
				{this.state.compiled}
			</div>
			)
	}
}

export default Display;