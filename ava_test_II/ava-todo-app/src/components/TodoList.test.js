/*
The TodoList component is different — it's connected to the Redux store.
By using redux-mock-store we can test if the toggleTodo action is dispatched when we simulate a click on a Todocomponent:
 */
import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoList from './TodoList';
import { toggleTodo } from "../actions/actions";

const mockStore = configureStore();
const initialState = {
    todos: [
        { id: 0, completed: false, text: 'buy milk' },
        { id: 1, completed: false, text: 'walk the dog' },
        { id: 2, completed: false, text: 'study' }
    ]
};

test('dispatches toggleTodo action', t => {
    const store = mockStore(initialState);
    const wrapper = mount(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );
    wrapper.find('Todo').at(0).simulate('click');
    t.deepEqual(store.getActions(), [toggleTodo(0)]);
});