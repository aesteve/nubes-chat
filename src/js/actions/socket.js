import VertxBus from 'vertx3-eventbus-client';
import {
	ROOM_USERS,
	ROOM_MESSAGE
} from './action-types';

let pending = [];
let eb = new VertxBus('/socket/rooms');
eb.onopen = () => {
	refreshPending();
};
export function enter(room, username) {
	const address = 'rooms.' + room;
	return (dispatch, getState) => {
		pending.push(() => {
			console.log('registerhandler: ' + username);
			eb.registerHandler(address, {username: username}, (error, message) => {
				const { body } = message;
				if (body.users) {
					dispatch({
						type: ROOM_USERS,
						room: room,
						users: body.users
					});
				} else if (body.message && body.author) {
					dispatch({
						type: ROOM_MESSAGE,
						room: room,
						message: body
					});
				}
			});
		});
		refreshPending();
	};
}

function refreshPending() {
	let newPending = [];
	pending.forEach(handler => {
		try {
			handler();
		} catch (all) {
			console.error(all);
			newPending.push(handler);
		}
	});
	pending = newPending;
}
