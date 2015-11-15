import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

export function createStoreWithMiddleware(someReducers) {
	return compose(applyMiddleware(thunk))(createStore)(someReducers);
}

export const store = createStoreWithMiddleware(reducers);
