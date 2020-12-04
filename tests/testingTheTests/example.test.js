const { test, expect } = require('../../index');

test("Addition", function() {
    let sum = 2+2;
    expect.equal(sum, 4);
})

test("Array Length", function() {
    let arr = [1,2,3];
    expect.true(arr.length > 0);
})