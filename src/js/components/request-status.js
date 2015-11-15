import React, { Component } from 'react';
import DisplayError from './display-error';
import Loader from './loader';

export default class RequestStatus extends Component {
	render() {
		const { err, inProgress } = this.props;
		if (err) {
			return <DisplayError error={err} />;
		} else if (inProgress) {
			return <Loader />;
		} else {
			return null;
		}
	}
}
