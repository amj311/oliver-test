const TestResult = require("./TestResult");
const {FLAGS} = require("./DriverUtils");
const {TestFailure, FoundErrorFailure, EqualityFailure} = require("./TestFailures");
const { extractTestFailureOrigin } = require("./TestFailureOrigin");

function sendResult(result) {
    console.log(([FLAGS.MSG_START,FLAGS.TEST_END,result.testName,JSON.stringify(result),FLAGS.MSG_END].join(FLAGS.DELIM)));
}

let beforeEach = null;

function setBeforeEach(action) { beforeEach = action };

function runTBody(name, testBody) {
    let result = new TestResult(name)
    let testStart = Date.now();
    
    try {
        if (beforeEach) beforeEach();
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
            result.setFailure(new FoundErrorFailure({e,origin:extractTestFailureOrigin(e)}));
        };
    }

    let elapsed = Date.now() - testStart;
    result.setTime(elapsed);
    sendResult(result);
    
    return result.passed;
}


module.exports = {runTBody, setBeforeEach}