import test from 'ava'
import sinon from 'sinon'

import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {render, unmountComponentAtNode} from 'react-dom'

import CustomerList from './CustomerList'

test('Renders no customers and add button', t => {
  // normal props test. Use renderToStaticMarkup and test the output when you pass no props
  // verify that it includes 'no customers' and doesn't include 'list of customers'
  const output = renderStatic()
  t.true(output.includes('no customers'))
  t.false(output.includes('list of customers'))
})

test('Renders customers and add button', t => {
  // Here's where we need to provide our stubbed store
  // create an object that has a getCustomers function
  // which is a spy that wraps a function that returns
  // an array of at least 2 customers (objects with a name string property)
  // then use renderToStaticMarkup to get the output
  // then assert that the output includes 'list of customers'
  // assert your output includes the names of each of your customers
  // assert that your output doesn't include 'no customers'
  const store = {
    getCustomers: sinon.spy(() => [{name: 'Bob'}, {name: 'Joanna'}]),
  }
  const output = renderStatic({store})
  t.true(output.includes('list of customers'))
  t.true(output.includes('Bob'))
  t.true(output.includes('Joanna'))
  t.false(output.includes('no customers'))
})

test('Responds to store updates', t => {
  // this is where we're actually testing the callback to the subscription
  // the other two tests were pretty much just testing Props
  // this test covers the Data input

  // declare an uninitialized callback variable
  // declare a customers variable assigned to an empty array []
  // create a store with a getCustomers that's a function which returns customers
  // also add a subscribe function that accepts a cb that simply assigns your callback variable to the given cb
  // Create a div with document.createElement (as before)
  // render the CustomerList with your store stub prop into the div
  // reassign the customers to an array of at least two new customers (objects with a name property)
  // invoke the callback (which should be assigned by now)
  // get the innerHTML of the div and assert:
  // it includes 'list of customers'
  // it includes the names of each of your customers
  // it does not include 'no customers'
  const {ref, store} = getStoreStub()
  const div = renderToDiv({store})
  ref.customers = [{name: 'Jill'}, {name: 'Fred'}]
  ref.callback()
  const {innerHTML} = div
  t.true(innerHTML.includes('list of customers'))
  t.true(innerHTML.includes('Jill'))
  t.true(innerHTML.includes('Fred'))
  t.false(innerHTML.includes('no customers'))
})

test('unsubscribes when unmounted', t => {
  // do many of the same things as above by stubbing the store
  // this one needs to create a spy that will be returned by the stubbed subscribe method
  // You don't need to worry about changing customers or invoking the callback
  // still render it into a div
  // But then you can immediately unmount it by calling unmountComponentAtNode (from 'react-dom')
  // then assert that your unsubscribe spy was called
  const {ref, store} = getStoreStub()
  const div = renderToDiv({store})
  unmountComponentAtNode(div)
  t.true(ref.unsubscribe.calledOnce)
})


/**
 * Create a stub for the store which can be used for assertions
 * @returns {Object} - ref property has customers and will haf ref.callback when
 *   store.callback is invoked. store.getCustomers will return ref.customers
 */
function getStoreStub() {
  const unsubscribe = sinon.spy()
  const ref = {customers: [], unsubscribe}
  const store = {
    getCustomers: () => ref.customers,
    subscribe: cb => {
      ref.callback = cb
      return ref.unsubscribe
    },
  }
  return {ref, store}
}


/**
 * Render the <CustomerList /> component to a string with the given props
 * @param {Object} props - the props to apply to the <CustomerList /> element
 * @returns {Object} - the rendered string, store, and actions stubs
 */
function renderStatic(props) {
  const output = renderToStaticMarkup(
    <CustomerListWithDefaults {...props} />
  )
  return output
}

/**
 * Render the <CustomerList /> component to a div with the given props
 * @param {Object} props - the props to apply to the <CustomerList /> element
 * @returns {Element} - the div that contains the element
 */
function renderToDiv(props) {
  const div = document.createElement('div')
  render(
    <CustomerListWithDefaults {...props} />,
    div,
  )
  return div
}

function CustomerListWithDefaults(props) {
  const store = {
    getCustomers: () => [],
  }
  const actions = {
    addCustomer() {},
  }
  return (
    <CustomerList
      store={store}
      actions={actions}
      {...props}
    />
  )
}
