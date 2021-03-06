import * as install from './actions/install';
import {updateMachineConfig} from './actions/updateConfig';

export {default as loadConfig} from './actions/loadConfig';
export {default as runCommand} from './actions/runCommand';
export {default as updateBoxStatus} from './actions/updateBoxStatus';
export {default as updateGlobalStatus} from './actions/updateGlobalStatus';

export { install, updateMachineConfig };

export const INIT_VAGRANT = 'INIT_VAGRANT';
export const ADD_BOX = 'ADD_BOX';
export const UPDATE_BOX = 'UPDATE_BOX';
export const SELECT_BOX = 'SELECT_BOX';
export const REMOVE_BOX = 'REMOVE_BOX';
export const SET_EDITING = 'SET_EDITING';
export const META_KEY_DOWN = 'META_KEY_DOWN';
export const META_KEY_UP = 'META_KEY_UP';
export const WINDOW_BLUR = 'WINDOW_BLUR';
export const SHOW_MODAL = 'SHOW_MODAL';
export const RESET = 'RESET';

export function addBox(name, path) {
	return { type: ADD_BOX, machine: { name, path, domain: "", status: "" } };
}

export function createBox(name, path) {
	return { type: ADD_BOX, name, path };
}

export function updateBox(path, data) {
	return { type: UPDATE_BOX, path, data };
}

export function removeBox(machine) {
	return { type: REMOVE_BOX, machine };
}

export function selectBox(path) {
	return { type: SELECT_BOX, path };
}

export function deselectBox() {
	return { type: SELECT_BOX, path: null };
}

export function startEditingBox() {
	return { type: SET_EDITING, editing: true };
}

export function finishEditingBox() {
	return { type: SET_EDITING, editing: false };
}

export function saveBoxChanges(path, changes) {
	return (dispatch, getStore) => {
		if ( changes.name ) {
			dispatch( updateBox( path, changes ) );
		}

		if ( changes.config ) {
			updateMachineConfig( path, changes.config )( dispatch, getStore );
		}
	};
}

export function showModal(id) {
	return { type: SHOW_MODAL, id };
}

export function hideModal() {
	return { type: SHOW_MODAL, id: null };
}

export function reset() {
	return { type: RESET };
}
