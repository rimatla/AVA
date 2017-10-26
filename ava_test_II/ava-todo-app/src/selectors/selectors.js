/*
Selectors are not as common as actions and reducers, but they are a very convenient way of fetching resources out of the Redux store.
They make refactoring easier, we can memorize them with libraries like reselect, and, most importantly, we can test them.
 */
export const getTodos = state => state.todos;