#### By Matija Marohnić
`create-react-app ava-todo-app`
`npm install --save-dev ava`

#### - Change package.json
`"test": "ava",`

`npm install --save-dev babel-preset-react-app`

#### - Add these configurations to our package.json as babel and ava keys respectively:
`"babel": {
    "presets": "react-app"
  },
  "ava": {
    "babel": "inherit"
  }
`
#### - babel-preset-react-app requires us to set NODE_ENV before running tests, which lets React know in which environment it's running. That way, it will work both on Unix and Windows
`$npm install --save-dev cross-env`

 #### - Modify our test script to use cross-env:
`"test": "cross-env NODE_ENV=test ava",`

#### - AVA only parses test files, not imported modules, i.e. our application code. To fix that, require babel-register before running tests.
`npm install --save-dev babel-register`

#### 1-add it to our AVA configuration, under require.

#### Node.js can't import CSS files, so we need a way to ignore those imports. They aren't needed in our tests anyway. There are a couple of modules which can help with this issue, for example ignore-styles, which ignores stylesheets, images and videos. To install ignore-styles, run:
`npm install --save-dev ignore-styles`

#### 2-add it to our AVA configuration, under require.

#### Rendering components requires a DOM, so we will use jsdom to create one. We will do that in a separate setup file, which we will also require before running tests.
`npm install --save-dev jsdom`

#### inside src directory create a test-setup.js

#### 3-add it to our AVA configuration, under require.
``"ava": {
      "babel": "inherit",
      "require": [
        "babel-register",
        "ignore-styles",
        "./src/test-setup"
      ]
    }``