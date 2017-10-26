/*
We're going to start off by creating a component for a singletodo.
This component will output the text and, if completed, have a strikethrough.
When we click on it, it will execute a callback with its id. We will use this behavior later
for dispatching the toggleTodo action that we created in the previously
 */
import React, { PropTypes, Component } from 'react';

class Todo extends Component {
    constructor(props) {
        super(props)
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        this.props.onToggle(this.props.id);
    }

    render() {
        return (
            <li
                style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none'
                }}
                onClick={this._onClick}
            >
                {this.props.text}
            </li>
        );
    }
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default Todo;