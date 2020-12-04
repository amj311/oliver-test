# Oliver Test <!-- omit in toc -->

![npm](https://img.shields.io/npm/v/oliver-test?label=version) ![NPM](https://img.shields.io/npm/l/oliver-test)  ![npm](https://img.shields.io/npm/dt/oliver-test)

A lightweight and easy-to-use library for testing JavaScript and TypeScript.

<img src="./docs/images/logo-scroll.gif" alt="Logo" width="600"/>
<hr/>

## Contents <!-- omit in toc -->

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
  - [Assertions](#assertions)
  - [Handling Errors](#handling-errors)
- [Test Output](#test-output)
  - [Reporting Suites](#reporting-suites)
  - [Reporting Errors](#reporting-errors)
  - [Timing](#timing)

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
- One or more test suite files that import and call `test(name: string, testBody:function)`.

See [Writing Tests](#writing-tests) for details on creating these files.

Run your tests by running the 'initiator' file through the console, either directly with `node <path-to-test-initiator-file>` or as an npm script (if you have set one up) with `npm run test`.

For example, consider a project with the following structure:

```
├── package.json
├── run-tests.js
└── tests
    ├── index.test.ts
    ├── injector.test.ts
    └── profiler.test.js
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

Oliver Test expects tests to be organized into test suite files.

The test driver will identify any file as a test suite if it ends in `.test.js` or `.test.ts`. Each test suite may contain any number of tests, which may contain any number of assertions.

Tests are created by calling `test(name: string, testBody:function)` and providing the test body as a callback function.
Assertions are imported as methods of the `expect` object.

Example test suite:

``` js
// example.test.js

const { test, expect } = require('oliver-test');

test("Addition", function() {
    let sum = 2+2;
    expect.equal(sum, 4);
})

test("Array Length", function() {
    let arr = [1,2,3];
    expect.true(arr.length > 0);
})
```

### Assertions

Assertions are all implemented as methods of the `expect` object. These are the supported assertions as of the latest version:

| Assertion | Behavior |
| :-------- | :------- |
| `equal(actual:any, expected:any)` | Checks that `actual` is strongly equal to `expected`. |
| `equalLoose(actual:any, expected:any)` | Checks that `actual` is loosely equal to `expected`. |
| `truthy(actual:any)` | Checks that `actual` is truthy. |
| `true(actual:any)` | Checks that `actual` is equal to `true`. |
| `falsey(actual:any)` | Checks that `actual` is falsey. |
| `false(actual:any)` | Checks that `actual` is equal to `false`. |

### Handling Errors

If an error is not caught within an individual test body the test will fail and print the error.

If an error is not caught during a test suite the test will fail regardless of how many individual tests had passed.

Any output to `stderr` is considered an error and will fail the test suite.

## Test Output

A future release will allow the user to specify a `verbose` option to determine the ammount of output.

The test driver runs all tests suites concurrently and prints their results as soon as they complete, regardless of their order.

### Reporting Suites
Each test suite is shown with a summary and list of indidual test names.
The icon to the left of each test indicates its success.

<img src="./docs/images/suite-pass-output.png" alt="Logo" width="500"/>

### Reporting Errors
If a test fails an explanation will be printed directly beneath its name.
If there are any suite-level errors they are printed at the end of the summary regardless of when they occurred in the suite file.

<img src="./docs/images/suite-fail-output.png" alt="Logo" width="500"/>

### Timing
Test durations are recorded as the composite time during which each individual test ran. This does not include the duration of operations performed by the test driver when starting, compiling, or reporting.