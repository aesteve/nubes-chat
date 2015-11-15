import {
	ROOM_MESSAGE
} from '../actions/action-types';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function updateContext(state = initialState, action = {}) {
	const { type, room, message } = action;
	if (type === ROOM_MESSAGE) {
		return state.updateIn(room, oldMessages => {
			if (!oldMessages) {
				return Immutable.fromJS([message]);
			} else {
				return oldMessages.push(message);
			}
		});
	}
	return state;
}
