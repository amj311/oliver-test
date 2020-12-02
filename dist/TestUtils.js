"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oTest = void 0;
var TestFailures_1 = require("./TestFailures");
var TestResult_1 = require("./TestResult");
var DriverUtils_1 = require("./DriverUtils");
function sendResult(result) {
    console.log(([DriverUtils_1.FLAGS.MSG_START, DriverUtils_1.FLAGS.TEST_END, result.testName, JSON.stringify(result), DriverUtils_1.FLAGS.MSG_END].join(":::")));
}
function oTest(name, test, ms) {
    if (ms === void 0) { ms = 15000; }
    var throwTimeout = setTimeout(function () { throw new TestFailures_1.TimeoutFailure(ms); }, ms);
    var result = new TestResult_1.TestResult(name);
    var testStart = Date.now();
    try {
        test();
        result.setPassed(true);
    }
    catch (e) {
        if (e instanceof TestFailures_1.TestFailure) {
            result.setPassed(false);
            result.setFailure(e);
            // e.print();
        }
        else {
            result.setPassed(false);
            result.setFailure(new TestFailures_1.FoundErrorFailure(e));
        }
        ;
    }
    clearTimeout(throwTimeout);
    var elapsed = Date.now() - testStart;
    result.setTime(elapsed);
    sendResult(result);
}
exports.oTest = oTest;
