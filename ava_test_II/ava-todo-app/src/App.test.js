// src/App.test.js
import test from 'ava';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore();
const initialState = { todos: [] };

// we need to wrap App in Provider, so that connect knows which store to connect to:
test('renders without crashing', t => {
    const div = document.createElement('div');
    const store = mockStore(initialState);
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        div
    );
});