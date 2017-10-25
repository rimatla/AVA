import test from 'ava'
import sinon from 'sinon'

import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {render} from 'react-dom'
import {Simulate} from 'react-addons-test-utils'

import Toggle from './Toggle'

// change this from `test.skip(` to simply `test(`
test('toggle--off class applied by default', t => {
  // render <Toggle /> with renderToStaticMarkup and get the output
  // assert the the output string includes the text for the classname
  const output = renderStatic()
  t.true(output.includes('toggle--off'))
})

test('toggle--on class applied when initialToggledOn specified to true', t => {
  // render <Toggle /> with renderToStaticMarkup and get the output
  // assert the the output string includes the text for the classname
  const output = renderStatic({initialToggledOn: true})
  t.true(output.includes('toggle--on'))
})

test('invokes the onToggle prop when clicked', t => {
  // create a spy to pass in as the onToggle prop (you'll need to import sinon)
  // use document.createElement to create a div
  // render <Toggle /> with your onToggle prop into the div using `render` from `react-dom`
  // get a reference to the button using `div.querySelector`
  // Use `Simulate.click` from `react-addons-test-utils` to simulate a click event on the `button`
  // validate the div's `innerHTML` includes the right class
  // validate your onToggle spy was called (only once)
  // validate your onToggle spy was called with the right state (true/false)
  const onToggle = sinon.spy()
  const div = renderToDiv({onToggle})
  const button = div.querySelector('button')
  Simulate.click(button)

  t.true(div.innerHTML.includes('toggle--on'))
  t.true(onToggle.calledOnce)
  t.true(onToggle.calledWith(true))
})

/**
 * Render the <Toggle /> component to a string with the given props
 * @param {Object} props - the props to apply to the <Toggle /> element
 * @returns {String} - the rendered string
 */
function renderStatic(props) {
  return renderToStaticMarkup(<Toggle {...props} />)
}

/**
 * Render the <Toggle /> component to a div with the given props
 * @param {Object} props - the props to apply to the <Toggle /> element
 * @returns {Element} - the div that contains the element
 */
function renderToDiv(props) {
  const div = document.createElement('div')
  render(
    <Toggle {...props}>
      {props.children || 'hello world'}
    </Toggle>,
    div,
  )
  return div
}
