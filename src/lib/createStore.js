import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const DEFAULT_STATE = {
	boxes: [],
	installer: {
		installed: {
			chassis: false,
			vagrant: false,
			virtualbox: false,
		},
		downloadProgress: {},
		downloadTotal: {},
	},
	terminal: {},
	vagrant: {
		machines: [],
	},
	ui: {
		editing: false,
		modal: 'install',
	},
};

export default function createStore() {
	let initialState = { ...DEFAULT_STATE };
	let storedState = localStorage.getItem( 'store' );
	if ( storedState ) {
		try {
			initialState = Object.assign({}, initialState, JSON.parse( storedState ) );
		} catch (e) {
			// No-op
		}
	}

	let store = createReduxStore( reducers, initialState, applyMiddleware( thunk ) );
	store.subscribe(() => {
		let mapper = store => ({ boxes: store.boxes });
		localStorage.setItem( 'store', JSON.stringify( mapper( store.getState() ) ) );
	});

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextReducers = require('./reducers').default;
			store.replaceReducer(nextReducers);
		});
	}

	return store;
}
