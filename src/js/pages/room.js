import React, { Component } from 'react';
import { connect } from 'react-redux';
import { enter } from '../actions/socket';
import RoomMessages from '../components/room-messages';
import RoomUsers from '../components/room-users';

const mapStateToProps = (state, props) => {
	const { name } = props.params;
	return {
		username: state.userInfos
	};
}

class Room extends Component {

	componentDidMount() {
		const { name } = this.props.params;
		this.props.dispatch(enter(name, this.props.username));
	}

	render() {
		const { name } = this.props.params;
		return (
			<div className="page">
				Room : {name}
				<div className="row box">
					<RoomMessages room={name} />
					<RoomUsers room={name} />
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Room);
