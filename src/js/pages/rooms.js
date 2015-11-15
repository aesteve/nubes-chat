import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchRooms } from '../actions/rooms';
import RequestStatus from '../components/request-status';

const mapStateToProps = state => {
	return {
		rooms: state.rooms
	}
};

class RoomPreview extends Component {
	render() {
		const { room } = this.props;
		const roomLink = '/rooms/' + room.name;
		return (
			<div className="row room-preview">
				<div className="rooom-name"><Link to={roomLink}>{room.name}</Link></div>
				<div className="rooom-description">{room.description}</div>
				<div className="nb-users"></div>
			</div>
		)
	}
}

class Rooms extends Component {

	componentDidMount() {
		this.props.dispatch(fetchRooms());
	}

	render() {
		const { rooms } = this.props;
		const roomsJSX = _.map(rooms.rooms, (room, roomId) => {
			return <RoomPreview key={roomId} room={room} />;
		});
		return (
			<div className="page">
				<RequestStatus {...rooms} />
				{roomsJSX}
			</div>
		);
	}

}

export default connect(mapStateToProps)(Rooms);
