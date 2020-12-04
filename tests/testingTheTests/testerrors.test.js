const { test } = require('../../index')

test("not a function (Fail Case)", function() {
    const num = 5;
    num();
})

test("Split String", function() {
    const str = null;
    str.split(" ");
})