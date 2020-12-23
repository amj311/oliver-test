// const { AssertionFailure } = require("../src/TestFailures");
// const { expect, test } = require("../index");

const { TestFailureOrigin } = require("../src/TestFailureOrigin");
var util = require('util');
const { test } = require("../index");

test("(Fail Case) not a function", function() {
    const num = 5;
    num();
})