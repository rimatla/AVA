`create-react-app ava-todo-app`
`npm install --save-dev ava`

### - Change package.json
`"test": "ava",`

`npm install --save-dev babel-preset-react-app`

### - Add these configurations to our package.json as babel and ava keys respectively:
`"babel": {
    "presets": "react-app"
  },
  "ava": {
    "babel": "inherit"
  }
`
### - babel-preset-react-app requires us to set NODE_ENV before running tests, which lets React know in which environment it's running.
### That way, it will work both on Unix and Windows
`$npm install --save-dev cross-env`

 ### - Modify our test script to use cross-env:
`"test": "cross-env NODE_ENV=test ava",`

### - AVA only parses test files, not imported modules, i.e. our application code.
### To fix that, require babel-register before running tests.
`npm install --save-dev babel-register`
