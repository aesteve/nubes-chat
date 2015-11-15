import request from 'superagent';
import {
	FETCH_ROOMS_PROGRESS,
	FETCH_ROOMS_FINISHED
} from './action-types';

export function fetchRooms() {
	return (dispatch, getState) => {
		dispatch({
			type: FETCH_ROOMS_PROGRESS
		});
		request
			.get('/api/rooms')
			.accept('application/json')
			.end((err, res) => {
				dispatch({
					type: FETCH_ROOMS_FINISHED,
					err: err,
					res: res
				});
			})
	};
}
