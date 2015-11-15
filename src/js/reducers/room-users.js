import {
	ROOM_USERS
} from '../actions/action-types';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

const addUsers = (state, room, users) => {
	return state.set(room, users);
};

export default function updateContext(state = initialState, action = {}) {
	const { type, room, users } = action;
	switch(type) {
		case ROOM_USERS:
			return addUsers(state, room, users);
		default:
			return state;
	}
}
