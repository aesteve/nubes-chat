import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SET_USERNAME } from '../actions/action-types';

const mapStateToProps = state => {
	return {
		username: state.userInfos
	};
}

const ChooseUsername = connect()(class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};
		this.changeValue = this.changeValue.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
	}

	changeValue(e) {
		this.setState({
			username: e.target.value
		});
	}

	changeUsername(e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.dispatch({
			type: SET_USERNAME,
			username: this.state.username
		});
	}

	render() {
		return (
			<form style={{display: 'inline-block'}} onSubmit={this.changeUsername}>
				<input type="text" onChange={this.changeValue} value={this.state.username} />
			</form>
		);
	}
});

class Username extends Component {
	render() {
		const { username } = this.props;
		if (this.props.username) {
			return <a href="javascript:void(0)">{username}</a>
		} else {
			return <ChooseUsername />
		}
	}
}

export default connect(mapStateToProps)(Username);
