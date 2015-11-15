import {
	SET_USERNAME
} from '../actions/action-types';

const initialState = null;

export default function updateContext(state = initialState, action = {}) {
	const { type, username } = action;
	if (type === SET_USERNAME) {
		return username;
	}
	return state;
}
