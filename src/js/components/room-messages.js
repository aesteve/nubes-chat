import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const mapStateToProps = (state, props) => {
	return {
		messages: state.messages[props.room]
	};
}

class Message extends Component {
	render() {
		const { message } = this.props;
		return (
			<div className="message">
				<span className="author">{message.author}</span>
				<span className="content">{message.message}</span>
			</div>
		);
	}
}

class RoomMessages extends Component {

	render() {
		const { messages } = this.props;
		const messagesJSX = _.map(messages, message => {
			return <Message message={message} />;
		});
		return (
			<div className="large-6 columns">
				{messagesJSX}
			</div>
		);
	}

}

export default connect(mapStateToProps)(RoomMessages);
