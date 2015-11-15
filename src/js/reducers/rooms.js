import {
	FETCH_ROOMS_PROGRESS,
	FETCH_ROOMS_FINISHED
} from '../actions/action-types';

const initialState = {
	inProgress: false,
	err: null,
	rooms: {}
};

export default function updateContext(state = initialState, action = {}) {
	const { type, res, err } = action;
	switch (type) {
		case FETCH_ROOMS_PROGRESS:
			return {
				inProgress: true,
				err: null,
				rooms: {}
			};
		case FETCH_ROOMS_FINISHED:
			const { rooms } = state;
			if (res && res.body) {
				res.body.forEach(room => {
					rooms[room.name] = room;
				});
			}
			return {
				inProgress: false,
				err: err,
				rooms: rooms
			};
		default:
			return state;
	}
}
