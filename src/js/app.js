import React, { Component } from 'react';
import { PropTypes } from 'react-router';
import { connect } from 'react-redux';
import Menu from './components/menu';

class App extends Component {

	render() {
		const { user, children } = this.props;
		return (
			<div>
				<Menu />
				{children}
			</div>
		);
	}

}

export default connect()(App);
