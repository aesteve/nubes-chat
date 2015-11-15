import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
	const { room } = props.params;
	return {
		messages: state.messages[room.name]
	};
}

class Room extends Component {

	componentDidMount() {
		// TODO : create socket and connect to room
	}

	render() {
		const { room } = props.params;
		return (
			<div className="page">
				Room : {room.name}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Room);
