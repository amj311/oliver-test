const { expect, test } = require('../../index');
const Mod = require("./mod");

test("expect.true: true", function() {
    expect.true(true);
})
test("expect.true: expressions", function() {
    expect.true(Math.pow(2,2)==4);
})
test("import Mod.js", function() {
    let mod = new Mod();
    expect.true(mod instanceof Mod);
})