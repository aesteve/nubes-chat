import React, { Component } from 'react';

export default class DisplayError extends Component {

	constructor(props) {
		super(props);
		this.msgs = {
			401: 'Unauthorized',
			403: 'Forbidden',
			404: 'Not found',
			420: 'Api rate limitation reached',
			503: 'Server is temporarily unavailable'
		};
		this.defaultMsg = 'An unexpected error occured';
	}

	getMsg(error) {
		let msg = this.msgs[error.status];
		if (!msg) {
			msg = this.defaultMsg + ' : '; // TODO: append status msg
		}
		return msg;
	}

	render() {
		const { error } = this.props;
		return (
			<div className="alert-box alert radius">{this.getMsg(error)}</div>
		);
	}
}
