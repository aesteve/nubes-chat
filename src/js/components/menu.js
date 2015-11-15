import React, { Component } from 'react';
import { Link } from 'react-router';
import Username from './username';


export default class Menu extends Component {
	render() {
		// <CredentialsSection {...this.props} />
		return (
			<div id="main-menu">
				<nav className="top-bar" data-topbar role="navigation">
					<ul className="title-area">
						<li className="name">
							<h1><Link to="/">Nubes chat</Link></h1>
						</li>
					</ul>
					<section className="top-bar-section">
						<ul className="right">
							<li><a href="javascript:void(0)" >Username: </a></li>
							<li style={{paddingRight: '8px'}}><Username /></li>
						</ul>
						<ul className="left">
							<li><Link to="/rooms" activeStyle={{background: "#008cba"}}>Rooms</Link></li>
						</ul>
					</section>
				</nav>
			</div>
		);
	}
}
