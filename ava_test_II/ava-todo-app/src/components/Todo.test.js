//We'll use shallow rendering for testing the Todocomponent:

import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Todo from './Todo';

test('outputs given text', t => {
    const wrapper = shallow(
        <Todo
            id={1}
            text="buy milk"
            completed={false}
            onToggle={() => {}}
        />
    );
    t.regex(wrapper.render().text(), /buy milk/);
});

test('has a strikethrough if completed', t => {
    const wrapper = shallow(
        <Todo
            id={1}
            text="buy milk"
            completed
            onToggle={() => {}}
        />
    );
    t.is(wrapper.prop('style').textDecoration, 'line-through');
});

test('executed callback when clicked with its id', t => {
    const onToggle = sinon.spy();
    const wrapper = shallow(
        <Todo
            id={1}
            text="buy milk"
            completed={false}
            onToggle={onToggle}
        />
    );
    wrapper.simulate('click');
    t.true(onToggle.calledWith(1));
});

/*
The first two times, we're passing an empty function as onToggle because the component requires it,
but the third time we're actually testing that callback,
so we're creating a spy with Sinon.JS and checking if it had been called with the expected value.
 */