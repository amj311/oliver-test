module.exports = class TestResult {
    constructor(name, passed = false, time = 0) {
        this.testName = name;
        this.passed = passed;
        this.time = time*1;
        this.errorMsg = null;
        this.failure = null;
    }
    setPassed(passed) {
        this.passed = passed;
    }
    setErrorMsg(msg) {
        this.errorMsg = msg;
    }
    setFailure(failure) {
        this.failure = failure;
    }
    setTime(time) {
        this.time = time*1;
    }
}