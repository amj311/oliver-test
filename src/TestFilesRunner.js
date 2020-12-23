const boxen = require('boxen');
var childProcess = require('child_process');
const { yellow } = require('colors');
const { FLAGS } = require('./DriverUtils');
const { fgPrimary, bold, fgPass, fgFail } = require("./formatters");
const TestFile = require("./TestFile");
const TestFileReport = require('./TestFileReport');

module.exports = class TestFilesRunner {
    constructor() {
        this.testFiles = null;
        this.filesLeftToRun = null;
        this.filesPassed = 0;
        this.filesFailed = 0;
        this.totalTests = 0;
        this.testsPassed = 0;
        this.testsFailed = 0;
        this.time = 0;

        this.onCompleteCb = null;
    }

    runFiles(testFiles, onCompleteCb) {
        this.testFiles = testFiles;
        this.filesLeftToRun = this.testFiles.length;
        this.onCompleteCb = onCompleteCb;

        console.log("Running tests...\n")

        for (let file of this.testFiles) this.runTestFile(file, this);
    }

    runTestFile(testFile, caller) {
        function onChildTerminate(err, stdout, stderr) {
            let fileReport = new TestFileReport(testFile.origPath);
            let msg = stdout;

            if (err || stderr.length > 0) {
                fileReport.setErrMsg(stderr);
            }

            let flags = []

            msg.split(FLAGS.MSG_START)
                .filter(line => line.indexOf(FLAGS.DELIM) == 0)
                .forEach(str => flags.push(str.split(FLAGS.MSG_END)[0]));

            flags = flags.map(f => f.split(FLAGS.DELIM))

            for (let flag of flags) {
                let event = flag[1];
                let content = flag[3];

                if (event == FLAGS.TEST_END) {
                    fileReport.addTestResult(JSON.parse(content));
                }
            }

            caller.reportTestFile(fileReport);
        }

        childProcess.execFile('node', [testFile.testPath], onChildTerminate);
    }

    reportTestFile(report) {
        report.print();

        if (report.passedAll()) this.filesPassed++;
        else this.filesFailed++;

        this.totalTests += report.testCount;
        this.testsFailed += report.failCount;
        this.testsPassed += report.passCount;
        this.time += report.time;

        this.filesLeftToRun--;
        if (this.filesLeftToRun <= 0) this.onFinishedAllTests();
    }


    onFinishedAllTests() {
        let suitesLabel = "Suites:";
        let testsLabel = "Tests:";
        let timeLabel = "Time:";
        let labelWidth = Math.max(suitesLabel.length,testsLabel.length,timeLabel.length);
        console.log(bold(fgPrimary("Tests Complete!\n")));

        let suiteSummary = 
            bold(suitesLabel + " ".repeat(labelWidth - suitesLabel.length)) +
            (this.filesPassed > 0 ? bold(fgPass(" " + this.filesPassed + " passed,")) : "") +
            (this.filesFailed > 0 ? bold(fgFail(" "+this.filesFailed + " failed,")) : "") +
            (" "+this.testFiles.length + " total");
        
        let testSummary = 
            bold(testsLabel + " ".repeat(labelWidth - testsLabel.length)) +
            (this.testsPassed > 0 ? bold(fgPass(" " + this.testsPassed + " passed,")) : "") +
            (this.testsFailed > 0 ? bold(fgFail(" "+this.testsFailed + " failed,")) : "") +
            (" "+this.totalTests + " total");
            
        let timeSummary = 
            bold(timeLabel + " ".repeat(labelWidth - timeLabel.length)) +
            yellow(" " + bold(this.time + " ms"));
        
        let summary = [suiteSummary,testSummary,timeSummary].join("\n")

        // console.log(summary);

        let borderColor = this.passedAll() ? 'greenBright' : 'redBright';
        console.log(boxen(summary, {padding: 1, borderStyle: 'round', borderColor}));

        this.onCompleteCb();
    }

    passedAll() {
        return this.filesFailed == 0 && this.testsFailed == 0;
    }

}