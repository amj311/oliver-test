const { test, expect } = require('../src/index')

try {
    throw new Error("catch me!");
}
catch (e) {
    console.error("Caught an error!")
}

test("Good Test", function() {
    expect.true(true)
})

const str = "don't change me!";
str = "watch me";


test("This test should never be found!", function() {
    expect.true(true)
})
