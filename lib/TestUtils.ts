import { AssertionFailure, FoundErrorFailure, TestFailure } from "./TestFailures";
import { TestResult } from "./TestResult";
import { FLAGS } from "./DriverUtils";

function sendResult(result:TestResult) {
    console.log(([FLAGS.MSG_START,FLAGS.TEST_END,result.testName,JSON.stringify(result),FLAGS.MSG_END].join(":::")));
}
// function sendFailure(failure:TestFailure) {
//     console.log(([FLAGS.MSG_START,FLAGS.TEST_ERR,result.testName,JSON.stringify(result),FLAGS.MSG_END].join(":::")));
// }

export type TestBody = () => void;

export function oTest(name:string, test:TestBody) {
    let result = new TestResult(name)
    let testStart = Date.now();
    
    try {
        test();
        result.setPassed(true);
    }
    catch (e) {
        if (e instanceof AssertionFailure) {
            result.setPassed(false);
            result.setFailure(e);
            // e.print();
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