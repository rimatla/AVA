import test from 'ava';
import { todos } from './reducers';
import { toggleTodo } from '../actions/actions';

/*
Here, we're passing an initial set of todos to the reducer,
none of which are completed. As the second argument, we are passing the action which toggles the state of thetodo
with the given id. We'll run npm test to see if our test passes.
*/

test('todos reducer', t => {
    t.deepEqual(todos([
        { id: 0, completed: false, text: 'buy milk' },
        { id: 1, completed: false, text: 'walk the dog' },
        { id: 2, completed: false, text: 'study' }
    ], toggleTodo(1)), [
        { id: 0, completed: false, text: 'buy milk' },
        { id: 1, completed: true, text: 'walk the dog' },
        { id: 2, completed: false, text: 'study' }
    ]);
});