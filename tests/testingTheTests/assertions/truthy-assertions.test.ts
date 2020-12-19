import { test, expect } from '../../../index'

test("expect.true: true", function() {
    expect.true(true);
})
test("expect.true: expressions", function() {
    expect.true(Math.pow(2,2)==4);
})
test("(Fail Case) expect.true", function() {
    expect.true(false);
})


test("expect.truthy", function() {
    expect.truthy(true);
    expect.truthy(1);
    expect.truthy(2);
    expect.truthy(-1);
    expect.truthy("true");
})

test("(Fail Case) expect.truthy: null", function() {
    expect.truthy(null);
})

test("(Fail Case) expect.truthy: false", function() {
    expect.truthy(false);
})
test("(Fail Case) expect.truthy: undefined", function() {
    expect.truthy(undefined);
})
test("(Fail Case) expect.truthy: 0", function() {
    expect.truthy(0);
})


test("expect.false: false", function() {
    expect.false(false);
})
test("expect.false: expression", function() {
    expect.false(Math.pow(2,2)==8);
})
test("(Fail Case) expect.false", function() {
    expect.false(true);
})



test("expect.falsey", function() {
    expect.falsey(false);
    expect.falsey(0);
    expect.falsey(null);
    expect.falsey(undefined);
})

test("(Fail Case) expect.falsey: True", function() {
    expect.falsey(true);
})
test("(Fail Case) expect.falsey: Expression", function() {
    expect.falsey(1);
})