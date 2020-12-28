import { expect, test } from '../../../index';

test("expect.null", function() {
    expect.null(null);
})
test("(Fail Case) expect.null", function() {
    expect.null(5);
})

test("expect.notNull", function() {
    expect.notNull(5);
    expect.notNull(undefined);
})
test("(Fail Case) expect.notNull", function() {
    expect.notNull(null);
})

test("expect.undefined", function() {
    expect.undefined(undefined);
})
test("(Fail Case) expect.undefined", function() {
    expect.undefined(null);
})

test("expect.notUndefined", function() {
    expect.notUndefined(5);
    expect.notUndefined(null);
})
test("(Fail Case) expect.notUndefined", function() {
    expect.notUndefined(undefined);
})