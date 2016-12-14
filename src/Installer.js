import React from 'react';
import { connect } from 'react-redux';

import './Installer.css';

import Chassis from './Installer/Chassis';
import Downloads from './Installer/Downloads';
import ImportBoxes from './Installer/ImportBoxes';
import Steps from './Steps';
import Welcome from './Installer/Welcome';

class Installer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 0,
		};
	}

	onNext() {
		this.setState( state => ({ step: state.step + 1 }) );
	}

	render() {
		const { vagrant } = this.props;

		return <div id="app" className="Installer">
			<Steps step={ this.state.step }>
				<Welcome onNext={() => this.onNext()} />
				<Downloads onNext={() => this.onNext()} />

				{ vagrant.machines.length > 0 ?
					<ImportBoxes
						boxes={ vagrant.machines }
						onNext={() => this.onNext()}
					/>
				: null }

				<Chassis />
			</Steps>
		</div>;
	}
}

export default connect(state => state)(Installer);
