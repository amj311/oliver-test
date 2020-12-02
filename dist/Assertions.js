"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = void 0;
var TestFailures_1 = require("./TestFailures");
function attemptAssertion(assert, failure) {
    if (!assert())
        throw failure;
}
function genericAssertEqual(name, actual, expected) {
    var assert = function () {
        return actual === expected;
    };
    var failure = new TestFailures_1.EqualityFailure({ name: name, actual: actual, expected: expected });
    attemptAssertion(assert, failure);
}
exports.expect = {
    /**
     * Checks equality with loose equality operator
     * @param name
     * @param actual
     * @param expected
     */
    equalLoose: function (actual, expected) {
        var assert = function () {
            return actual == expected;
        };
        var failure = new TestFailures_1.EqualityFailure({ name: "assertEqualLoose", actual: actual, expected: expected });
        attemptAssertion(assert, failure);
    },
    /**
     * Checks equality with strong equals operator
     * @param actual
     * @param expected
     */
    equal: function (actual, expected) {
        genericAssertEqual("assertEqual", actual, expected);
    },
    true: function (actual) {
        genericAssertEqual("assertTrue", actual, true);
    },
    false: function (actual) {
        genericAssertEqual("assertFalse", actual, false);
    },
    truthy: function (actual) {
        var assert = function () {
            if (actual)
                return true;
            else
                return false;
        };
        var failure = new TestFailures_1.TruthyFailure({ name: "assertTruthy", expected: 'truthy', actual: actual });
        attemptAssertion(assert, failure);
    },
    falsey: function (actual) {
        var assert = function () {
            if (!actual)
                return true;
            else
                return false;
        };
        var failure = new TestFailures_1.TruthyFailure({ name: "assertFalsey", expected: 'falsey', actual: actual });
        attemptAssertion(assert, failure);
    }
};
