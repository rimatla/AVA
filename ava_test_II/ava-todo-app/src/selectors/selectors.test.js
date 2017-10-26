/*
Selectors can be composed, for example a getFirstTodo selector would use getTodos to retrieve the list of todos.
It's a good idea to test at least the higher-level selectors to ensure that low-level selectors work as well.
 For example, passing tests for getFirstTodo would guarantee that getTodos works as well.
 */
import test from 'ava';
import { getTodos } from './selectors';

test('getTodos selector', t => {
    const todos = [
        { id: 0, completed: false, text: 'buy milk' },
        { id: 1, completed: false, text: 'walk the dog' },
        { id: 2, completed: false, text: 'study' }
    ];
    t.deepEqual(getTodos({ todos }), todos);
});