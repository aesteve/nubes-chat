import { combineReducers } from 'redux';
import rooms from './rooms';
import messages from './messages';

export default combineReducers({
	rooms,
	messages
});
