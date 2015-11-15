import React, { Component } from 'react';
import { PropTypes } from 'react-router';
import { connect } from 'react-redux';
import Menu from './components/menu';

const mapStateToProps = state => {
	return {
		username: state.userInfos
	};
};

class App extends Component {

	render() {
		const { username, children } = this.props;
		return (
			<div>
				<Menu />
				{username && children}
				{!username &&
					<div>Please choose an username</div>
				}
			</div>
		);
	}

}

export default connect(mapStateToProps)(App);
