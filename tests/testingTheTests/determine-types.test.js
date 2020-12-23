const { test, expect } = require('../../index')
const { determineType, typeNames } = require('../../src/JsTypes');


test("Determine Array", function() {
    expect.true([] instanceof Array)
    expect.equal(determineType([]), typeNames.get(Array));
})

test("Determine undefined", function() {
    expect.equal(determineType(undefined), "undefined");
})