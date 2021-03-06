import React from 'react';

import openBrowser from './lib/openBrowser';
import Button from './Button';

import './Header.css';

export default class Header extends React.Component {
	render() {
		let { onShowCreate, onShowSettings } = this.props;

		return <div className="Header">
			<div className="title">
				<img role="presentation" src="logo.png" />
				<span>Chassis</span>
			</div>
			<div className="actions">
				<Button
					icon="bullhorn"
					light
					noborder
					onClick={ () => openBrowser( 'https://github.com/Chassis/Desktop/issues' ) }
				>
					Feedback
				</Button>
				<Button
					icon="gear"
					light
					noborder
					shortcut="Cmd+,"
					onClick={ onShowSettings }
				>
					Settings
				</Button>
				<Button
					icon="plus"
					light
					noborder
					shortcut="Cmd+N"
					onClick={ onShowCreate }
				>
					Add&hellip;
				</Button>
			</div>
		</div>;
	}
}

Header.propTypes = {
	onShowCreate: React.PropTypes.func.isRequired,
	onShowSettings: React.PropTypes.func.isRequired,
};
