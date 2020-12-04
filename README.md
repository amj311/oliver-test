# Oliver Test

A lightweight and easy-to-use library for testing JavaScript and TypeScript.



## Installation

Add the node module to your project:

```
$ npm install oliver-test
```

Add a test command:

``` json
// package.json
...
"scripts": {
    "test": "node <path-to-test-initiator-file>"
  }
...
```

## Running Tests

In order to run tests with Oliver Test, you need to create at least:

- One 'initiator' file that imports and calls `runTestDir(testDir: string)`
and provides a path to your test files.
- One or more test files that import and call `test(name: string, testBody:function)`.

Run your tests by running the 'initiator' file through the console, either directly with `node <path-to-test-initiator-file>` or as an npm script (if you have set one up) with `npm run test`.


### Example

Consider a project with the following structure:

```
├── package.json
├── run-tests.js
├── src/
├── tests
│   ├── index.test.ts
│   ├── injector.test.ts
│   └── profiler.test.js
└── tsconfig.json
```


``` json
// package.json
...
"scripts": {
    "test": "node run-tests.js"
  }
...
```

``` js
// run-tests.js

const { runTestDir } = require('oliver-test');
runTestDir('./tests');
```

To run all the the tests in `./tests` you would run `node run-tests.js` or `npm run test`.



## Writing Tests

The test driver will identify any file as a test if it ends in `.test.js` or `.test.ts`.

Each test file may contain any number of tests, which may contain any number of assertions.
Tests are created by calling `test(name: string, testBody:function)` and providing the test body as a callback function.
Assertions are imported as methods of the `expect` object.

Example test file:

``` js
// example.test.js

const { test, expect } = require('oliver-test');

test("Addition", function() {
    sum = 2+2;
    expect.equals(sum, 4);
})
```

### Assertions

These are the supported assertions as of the latest version:

| Assertion | Behavior |
| :-------- | :------- |
| `equals(actual:any, expected:any)` | Checks that `actual` is strongly equal to `expected`. |
| `equalsLoose(actual:any, expected:any)` | Checks that `actual` is loosely equal to `expected`. |
| `truthy(actual:any)` | Checks that `actual` is not truthy. |
| `true(actual:any)` | Checks that `actual` is equal to `true`. |
| `falsey(actual:any)` | Checks that `actual` is not falsey. |
| `false(actual:any)` | Checks that `actual` is equal to `false`. |

### Errors
