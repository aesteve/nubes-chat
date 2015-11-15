import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const mapStateToProps = (state, props) => {
	const { room } = props;
	return {
		users: state.roomUsers.get(room)
	};
};

class RoomUsers extends Component {

	render() {
		const { users, room } = this.props;
		const usersJSX = _.map(users, user => {
			return <div className="room-user-name">{user}</div>;
		});
		return (
			<div className="large-3 columns">
				{usersJSX}
			</div>
		);
	}
}

export default connect(mapStateToProps)(RoomUsers);
