import test from 'ava'
import sinon from 'sinon' // you'll need to install this with `npm install --save-dev sinon`
import store from './Customers'

/*
// change this from `test.skip(` to simply `test(`
test.skip('customers should start with empty', t => {
  // call store.getCustomers and verify the result is empty
})
*/

//Test 1
test('customers should start with empty', t => {
  // call store.getCustomers and verify the result is empty
  const customers = store.getCustomers()
  t.true(customers.length === 0)
})

//Test 2
test('setting customers and getting them', t => {
  // create two or more objects with a string property called `name`
  // call store.setCustomers with an array of these objects
  // call store.getCustomers
  // validate that what is returned has the proper length
  // validate that the contents are the same as the contents of the array you passed
  const c0 = {name: 'Bill'}
  const c1 = {name: 'Francine'}
  store.setCustomers([c0, c1])
  const customers = store.getCustomers()
  const [sc0, sc1] = customers
  t.true(customers.length === 2)
  t.deepEqual(c0, sc0)
  t.deepEqual(c1, sc1)
})

//Test 3
test('subscribing to the store', t => {
  // create a function spy with `sinon.spy()`
  // use that spy to subscribe to the store and assign the unsubscribe function
  // call store.setCustomers
  // validate that the spy was called once
  // reset the spy with `spy.reset()`
  // then call the unsubscribe function
  // validate that calling store.setCustomers again will not call the spy
  const spy = sinon.spy()
  const unsubscribe = store.subscribe(spy)
  store.setCustomers([])
  t.true(spy.calledOnce)
  spy.reset()
  unsubscribe()
  store.setCustomers([])
  t.false(spy.called)
})

// add an afterEach here to reset the customers to an empty array
test.afterEach( () => store.setCustomers([]))
