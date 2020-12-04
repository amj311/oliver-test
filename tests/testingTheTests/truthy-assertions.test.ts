import { test, expect } from '../../index'

test("expect.true: true", function() {
    expect.true(true);
})
test("expect.true: expressions", function() {
    expect.true(Math.pow(2,2)==4);
})
test("expect.true: Fail Case", function() {
    expect.true(false);
})


test("expect.truthy", function() {
    expect.truthy(true);
    expect.truthy(1);
    expect.truthy(2);
    expect.truthy(-1);
    expect.truthy("true");
})

test("expect.truthy: null (Fail Case)", function() {
    expect.truthy(null);
})

test("expect.truthy: false (Fail Case)", function() {
    expect.truthy(false);
})
test("expect.truthy: undefined (Fail Case)", function() {
    expect.truthy(undefined);
})
test("expect.truthy: 0 (Fail Case)", function() {
    expect.truthy(0);
})


test("expect.false: false", function() {
    expect.false(false);
})
test("expect.false: expression", function() {
    expect.false(Math.pow(2,2)==8);
})
test("expect.false: Fail Case", function() {
    expect.false(true);
})



test("expect.falsey", function() {
    expect.falsey(false);
    expect.falsey(0);
    expect.falsey(null);
    expect.falsey(undefined);
})

test("expect.falsey: True (Fail Case)", function() {
    expect.falsey(true);
})
test("expect.falsey: Expression (Fail Case)", function() {
    expect.falsey(1);
})