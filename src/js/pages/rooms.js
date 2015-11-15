import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		rooms: state.rooms
	}
};

class Rooms extends Component {
	componentDidMount() {
		// TODO : fetch room list
	}

	render() {
		return (
			<div className="page">
				Rooms
			</div>
		);
	}
}

export default connect(mapStateToProps)(Rooms);
