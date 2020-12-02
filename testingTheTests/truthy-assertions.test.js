const {expect} = require("../dist/Assertions");
const {oTest} = require("../dist/TestUtils");


oTest("expect.true: true", function() {
    expect.true(true);
})
oTest("expect.true: expressions", function() {
    expect.true(Math.pow(2,2)==4);
})
oTest("expect.true: Fail Case", function() {
    expect.true(false);
})


oTest("expect.truthy", function() {
    expect.truthy(true);
    expect.truthy(1);
    expect.truthy(2);
    expect.truthy(-1);
    expect.truthy("true");
})

oTest("expect.truthy: null (Fail Case)", function() {
    expect.truthy(null);
})

oTest("expect.truthy: false (Fail Case)", function() {
    expect.truthy(false);
})
oTest("expect.truthy: undefined (Fail Case)", function() {
    expect.truthy(undefined);
})
oTest("expect.truthy: 0 (Fail Case)", function() {
    expect.truthy(0);
})


oTest("expect.false: false", function() {
    expect.false(false);
})
oTest("expect.false: expression", function() {
    expect.false(Math.pow(2,2)==8);
})
oTest("expect.false: Fail Case", function() {
    expect.false(true);
})



oTest("expect.falsey", function() {
    expect.falsey(false);
    expect.falsey(0);
    expect.falsey(null);
    expect.falsey(undefined);
})

oTest("expect.falsey: True (Fail Case)", function() {
    expect.falsey(true);
})
oTest("expect.falsey: Expression (Fail Case)", function() {
    expect.falsey(1);
})