/*
When dispatched, this action will cause atodo item of a given id to switch its state, for instance from completed to not completed.
*/
import test from 'ava';
import { toggleTodo, TOGGLE_TODO } from './actions';

test('toggleTodo action', t => {
    t.deepEqual(toggleTodo(5), {
        type: TOGGLE_TODO,
        payload: 5
    });
});