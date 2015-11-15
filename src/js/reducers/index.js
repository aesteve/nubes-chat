import { combineReducers } from 'redux';
import rooms from './rooms';
import messages from './messages';
import roomUsers from './room-users';
import userInfos from './user-infos';

export default combineReducers({
	rooms,
	messages,
	roomUsers,
	userInfos
});
