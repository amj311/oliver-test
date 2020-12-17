const TestResult = require("./TestResult");
const {FLAGS} = require("./DriverUtils");
const {TestFailure, FoundErrorFailure, EqualityFailure} = require("./TestFailures");

function sendResult(result) {
    console.log(([FLAGS.MSG_START,FLAGS.TEST_END,result.testName,JSON.stringify(result),FLAGS.MSG_END].join(FLAGS.DELIM)));
}

module.exports = function runTBody(name, testBody) {
    let result = new TestResult(name)
    let testStart = Date.now();
    
    try {
        testBody();
        result.setPassed(true);
    }
    catch (e) {
        if (e.failType) {
            result.setPassed(false);
            result.setFailure(e);
        }
        else {
            result.setPassed(false);
            result.setFailure(new FoundErrorFailure(e));
        };
    }

    let elapsed = Date.now() - testStart;
    result.setTime(elapsed);
    sendResult(result);
}

