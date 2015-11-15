import SockJS from 'sockjs-client';
import {
	SOCKET_OPENED,
	SOCKET_CLOSED,
	SOCKET_ERROR,
	SOCKET_DATA
} from './action-types';

let socket;

export function open(path) {

	return (dispatch, getState) => {
		socket = new SockJS(path);
		socket.onopen = event => {
			dispatch({
				type: SOCKET_OPENED
			});
		};
		socket.onclose = event => {
			dispatch({
				type: SOCKET_CLOSED
			});
		};
		socket.onerror = event => {
			dispatch({
				type: SOCKET_ERROR,
				error: event
			});
		};
		socket.onmessage = data => {
			dispatch({
				type: SOCKET_DATA,
				data: data.data
			});
		}
	};

}
