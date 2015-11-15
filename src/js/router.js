import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
// Pages
import App from './app';
import Index from './pages/index';
import Rooms from './pages/rooms';
import Room from './pages/room';

export default (
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Index} />
			<Route path="rooms">
				<IndexRoute component={Rooms} />
				<Route path=":name" component={Room} />
			</Route>
		</Route>
	</Router>
);
