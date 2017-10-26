/*Reducers react to dispatched actions by modifying the store. Let's create a reducer which reacts to the TOGGLE_TODO action:*/
import { combineReducers } from 'redux';
import { TOGGLE_TODO } from '../actions/actions';

export const todos = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_TODO:
            return state.map(t => {
                if (t.id === action.payload) {
                    return { ...t, completed: !t.completed };
                }
                return t;
            })
        default:
            return state;
    }
};

//We are exporting individual reducers for testing, and the root reducer for the application.
export default combineReducers({ todos });