const { test } = require('../src/index')

test("not a function (Fail Case)", function() {
    const num = 5;
    num();
})

test("null (Fail Case)", function() {
    const str = null;
    str.split(" ");
})