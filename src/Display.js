import React from "react";

class Display extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			compiled: null
		}
	}

	compile(text) {
		const matches = text.matchAll(/@[.*?]\(.*?\)/)
		console.log(matches);
	}

	shouldComponentUpdate(nextProps){
	    return nextProps.html !== this.getDOMNode().innerHTML;
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