const {fgFail,fgPass,fgPlain,FAIL_BADGE,PASS_BADGE,PASS_ICON,FAIL_ICON,bold} = require("./formatters");
var pathLib = require('path');
const { parseTestFailure } = require("./TestFailures");


module.exports = class TestFileReport {
    constructor(path) {
        this.filePath = path;

        this.testCount = 0;
        this.passCount = 0;
        this.failCount = 0;
        this.time = 0;
        this.stderr = null;

        this.testResults = new Map();
    }

    setErrMsg(msg) {
        this.stderr = msg;
    }

    addTestResult(res) {
        if (res.failure) {
            res.failure = parseTestFailure(res.failure);
        }
        this.testResults.set(res.testName, res);
        this.testCount++;
        if (res.passed) this.passCount++;
        else this.failCount++;
        this.time += res.time;
    }

    passedAll() {
        if (this.stderr) return false;
        return this.passCount == this.testCount && this.failCount == 0;
    }

    print() {
        let hrWidth = 65;
        let hrThick = "═".repeat(hrWidth);
        let hrThin = "-".repeat(hrWidth);

        let resColor = this.passedAll() ? fgPass : fgFail;
        let resBadge = this.passedAll() ? PASS_BADGE : FAIL_BADGE;
        
        console.log(resColor(hrThick))

        let basename = pathLib.basename(this.filePath);
        let prename = this.filePath.substr(0,this.filePath.lastIndexOf(basename))
        console.log(resBadge, resColor(prename+bold(basename)))
        console.log(`Total: ${this.testCount}\tPassed: ${this.passCount}\tFailed: ${this.failCount}\tTime: ${this.time} ms`)
        
        console.log(resColor(hrThin))

        for (let test of this.testResults.values()) {
            
            let indent = " ".repeat(0);
            let bigIndent = indent.repeat(2);

            let resIcon = test.passed ? PASS_ICON : FAIL_ICON;
            let format = test.passed ? fgPlain : bold;
            console.log(format(indent+`${resIcon} ${test.testName} (${test.time} ms)`))

            if (!test.passed && test.failure) {
                console.log("");
                test.failure.print();
                console.log("");
            }
        }
     
        if (this.stderr) {
            console.log(bold("\nFrom stderr:")+"\n"+this.stderr);
        }

        console.log(resColor(hrThick)+"\n")
    }
}