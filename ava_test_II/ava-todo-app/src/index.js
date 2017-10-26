import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './configureStore';
import { toggleTodo } from './actions/actions';

const store = configureStore({
    todos: [
        { id: 0, completed: false, text: 'buy milk' },
        { id: 1, completed: false, text: 'walk the dog' },
        { id: 2, completed: false, text: 'study' }
    ]
});

store.dispatch(toggleTodo(1));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
