const { test } = require('../../../index')

test("(Fail Case) not a function", function() {
    const num = 5;
    num();
})

test("(Fail Case) Split String", function() {
    const str = null;
    str.split(" ");
})