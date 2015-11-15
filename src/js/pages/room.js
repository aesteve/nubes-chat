import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open as openSocket } from '../actions/socket';

const mapStateToProps = (state, props) => {
	const { name } = props.params;
	return {
		messages: state.messages[name]
	};
}

class Room extends Component {

	componentDidMount() {
		const { name } = this.props.params;
		this.props.dispatch(openSocket('/socket/rooms/'));
	}

	render() {
		const { name } = this.props.params;
		return (
			<div className="page">
				Room : {name}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Room);
