import { TestFailure } from "./TestFailures";

export class TestResult {
    testName: any;
    passed: boolean;
    time: number;
    errorMsg?: string;
    failure?: TestFailure;
    
    constructor(name: string) {
        this.testName = name;
        this.passed = false;
        this.time = 0;
    }
    
    setPassed(passed: any) {
        this.passed = passed;
    }
    setErrorMsg(msg: any) {
        this.errorMsg = msg;
    }
    setFailure(failure:TestFailure) {
        this.failure = failure;
    }
    setTime(time: number) {
        this.time = time * 1;
    }
}