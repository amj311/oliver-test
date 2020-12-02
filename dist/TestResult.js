"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResult = void 0;
var TestResult = /** @class */ (function () {
    function TestResult(name) {
        this.testName = name;
        this.passed = false;
        this.time = 0;
    }
    TestResult.prototype.setPassed = function (passed) {
        this.passed = passed;
    };
    TestResult.prototype.setErrorMsg = function (msg) {
        this.errorMsg = msg;
    };
    TestResult.prototype.setFailure = function (failure) {
        this.failure = failure;
    };
    TestResult.prototype.setTime = function (time) {
        this.time = time * 1;
    };
    return TestResult;
}());
exports.TestResult = TestResult;
