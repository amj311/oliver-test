"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFileReport = exports.TestFilesRunner = exports.TestFilesCompiler = exports.getFilesFromDir = exports.FAIL_ICON = exports.FAIL_BADGE = exports.PASS_ICON = exports.PASS_BADGE = exports.fgDim = exports.bgFail = exports.fgFail = exports.bgPass = exports.fgPass = exports.fgPrimary = exports.fgPlain = exports.FLAGS = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = __importDefault(require("child_process"));
var colors_1 = __importDefault(require("colors"));
require("reflect-metadata");
var TestFailures_1 = require("./TestFailures");
exports.FLAGS = {
    MSG_START: "<!OT-TEST",
    TEST_START: "START",
    TEST_END: "END",
    TEST_PASS: "PASS",
    TEST_FAIL: "FAIL",
    TEST_TIME: "TIME",
    TEST_ERR: "ERR",
    MSG_END: "OT-TEST!>",
    DELIM: ":::",
};
function fgPlain(msg) {
    return msg;
}
exports.fgPlain = fgPlain;
function fgPrimary(msg) {
    return colors_1.default.cyan(msg);
}
exports.fgPrimary = fgPrimary;
function fgPass(msg) {
    return colors_1.default.green(msg);
}
exports.fgPass = fgPass;
function bgPass(msg) {
    return colors_1.default.bold(colors_1.default.bgGreen(" " + msg + " "));
}
exports.bgPass = bgPass;
function fgFail(msg) {
    return colors_1.default.red(msg);
}
exports.fgFail = fgFail;
function bgFail(msg) {
    return colors_1.default.bold(colors_1.default.bgRed(" " + msg + " "));
}
exports.bgFail = bgFail;
function fgDim(msg) {
    return colors_1.default.dim(msg);
}
exports.fgDim = fgDim;
exports.PASS_BADGE = bgPass("PASS");
exports.PASS_ICON = fgPass("✔");
exports.FAIL_BADGE = bgFail("FAIL");
exports.FAIL_ICON = fgFail("⨉");
// Return a list of files of the specified fileTypes in the provided dir, 
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']
function getFilesFromDir(dir, filter) {
    var filesToReturn = [];
    function walkDir(currentPath) {
        var files = fs_1.default.readdirSync(currentPath);
        for (var i in files) {
            var curFile = path_1.default.join(currentPath, files[i]);
            if (fs_1.default.statSync(curFile).isFile() && files[i].lastIndexOf(filter) > -1) {
                filesToReturn.push(curFile);
            }
            else if (fs_1.default.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }
        }
    }
    ;
    walkDir(dir);
    return filesToReturn;
}
exports.getFilesFromDir = getFilesFromDir;
var TestFilesCompiler = /** @class */ (function () {
    function TestFilesCompiler() {
        this.compiledFiles = new Map(); // key: basename of file
    }
    TestFilesCompiler.prototype.compileFiles = function (rawPaths, outDir, exportCompiledFiles) {
        this.exportCompiledFiles = exportCompiledFiles;
        this.outDir = outDir;
        // this.filesLeftToCompile = rawPaths.length;
        this.compiledFiles = new Map();
        console.log("Preparing tests in " + fgPrimary(rawPaths.length) + " files...");
        var tsPaths = [];
        for (var _i = 0, rawPaths_1 = rawPaths; _i < rawPaths_1.length; _i++) {
            var rawPath = rawPaths_1[_i];
            if (path_1.default.extname(rawPath) == ".ts")
                tsPaths.push(rawPath);
            else {
                var fileName = path_1.default.basename(rawPath).replace(path_1.default.extname(rawPath), "");
                this.compiledFiles.set(fileName, new TestFile(rawPath, rawPath));
            }
        }
        ;
        var compiler = this;
        function onCompilationComplete(err, stdout, stderr) {
            if (err) {
                console.log("Could not compile!");
                console.log(err);
            }
            else {
                var newTestPaths = getFilesFromDir(compiler.outDir, '.test.');
                for (var _i = 0, newTestPaths_1 = newTestPaths; _i < newTestPaths_1.length; _i++) {
                    var testPath = newTestPaths_1[_i];
                    var fileName = path_1.default.basename(testPath).replace(path_1.default.extname(testPath), "");
                    var file = compiler.compiledFiles.get(fileName);
                    if (file)
                        file.setTestPath(testPath);
                }
                compiler.onCompletion();
            }
        }
        var compileProc = child_process_1.default.exec('tsc --outDir .ot-tsc-tmp --module commonjs --target es5 --esModuleInterop' + tsPaths.join(" "), onCompilationComplete);
        // compileProc.stderr?.on("data", (data)=> console.log(data.toString()))
    };
    TestFilesCompiler.prototype.onCompletion = function () {
        this.exportCompiledFiles(Array.from(this.compiledFiles.values()));
    };
    ;
    return TestFilesCompiler;
}());
exports.TestFilesCompiler = TestFilesCompiler;
var TestFile = /** @class */ (function () {
    function TestFile(origPath, testPath) {
        this.origPath = origPath;
        this.testPath = testPath;
    }
    TestFile.prototype.setTestPath = function (path) {
        this.testPath = path;
    };
    return TestFile;
}());
var TestFilesRunner = /** @class */ (function () {
    function TestFilesRunner() {
        this.filesPassed = 0;
        this.filesFailed = 0;
        this.totalTests = 0;
        this.testsPassed = 0;
        this.testsFailed = 0;
        this.time = 0;
    }
    TestFilesRunner.prototype.runFiles = function (testFiles, onCompleteCb) {
        this.testFiles = testFiles;
        this.filesLeftToRun = this.testFiles.length;
        this.onCompleteCb = onCompleteCb;
        console.log("Running tests...\n");
        for (var _i = 0, _a = this.testFiles; _i < _a.length; _i++) {
            var file = _a[_i];
            this.runTestFile(file, this);
        }
    };
    TestFilesRunner.prototype.runTestFile = function (testFile, caller) {
        function onChildTerminate(err, stdout, stderr) {
            var fileReport = new TestFileReport(testFile.testPath);
            var msg = stdout;
            var flags = [];
            msg.split(exports.FLAGS.MSG_START)
                .filter(function (line) { return line.indexOf(exports.FLAGS.DELIM) == 0; })
                .forEach(function (str) { return flags.push(str.split(exports.FLAGS.MSG_END)[0]); });
            flags = flags.map(function (f) { return f.split(exports.FLAGS.DELIM); });
            for (var _i = 0, flags_1 = flags; _i < flags_1.length; _i++) {
                var flag = flags_1[_i];
                var event_1 = flag[1];
                var content = flag[3];
                if (event_1 == exports.FLAGS.TEST_END) {
                    fileReport.addTestResult(JSON.parse(content));
                }
            }
            caller.reportTestFile(fileReport);
        }
        child_process_1.default.execFile('node', [testFile.testPath], onChildTerminate);
    };
    TestFilesRunner.prototype.reportTestFile = function (report) {
        report.print();
        if (report.passedAll())
            this.filesPassed++;
        else
            this.filesFailed++;
        this.totalTests += report.testCount;
        this.testsFailed += report.failCount;
        this.testsPassed += report.passCount;
        this.time += report.time;
        this.filesLeftToRun--;
        if (this.filesLeftToRun <= 0)
            this.onFinishedAllTests();
    };
    TestFilesRunner.prototype.onFinishedAllTests = function () {
        var suitesLabel = "Test Suites:";
        var testsLabel = "Tests:";
        var timeLabel = "Time:";
        var labelWidth = suitesLabel.length;
        console.log(colors_1.default.bold(fgPrimary("Tests Complete!\n")));
        console.log(colors_1.default.bold(suitesLabel + " ".repeat(labelWidth - suitesLabel.length)), (this.filesPassed > 0 ? colors_1.default.bold(fgPass(" " + this.filesPassed + " passed,")) : ""), (this.filesFailed > 0 ? colors_1.default.bold(fgFail(this.filesFailed + " failed,")) : ""), (this.testFiles.length + " total"));
        console.log(colors_1.default.bold(testsLabel + " ".repeat(labelWidth - testsLabel.length)), (this.testsPassed > 0 ? colors_1.default.bold(fgPass(" " + this.testsPassed + " passed,")) : ""), (this.testsFailed > 0 ? colors_1.default.bold(fgFail(this.testsFailed + " failed,")) : ""), (this.totalTests + " total"));
        console.log(colors_1.default.bold(timeLabel + " ".repeat(labelWidth - timeLabel.length)), colors_1.default.yellow(" " + colors_1.default.bold(this.time + " ms")));
        this.onCompleteCb();
    };
    return TestFilesRunner;
}());
exports.TestFilesRunner = TestFilesRunner;
var TestFileReport = /** @class */ (function () {
    function TestFileReport(path) {
        this.filePath = path;
        this.testCount = 0;
        this.passCount = 0;
        this.failCount = 0;
        this.time = 0;
        this.testResults = new Map();
    }
    TestFileReport.prototype.addTestResult = function (res) {
        if (res.failure) {
            res.failure = TestFailures_1.parseTestFailure(res.failure);
        }
        this.testResults.set(res.testName, res);
        this.testCount++;
        if (res.passed)
            this.passCount++;
        else
            this.failCount++;
        this.time += res.time;
    };
    TestFileReport.prototype.passedAll = function () {
        return this.passCount == this.testCount && this.failCount == 0;
    };
    TestFileReport.prototype.print = function () {
        var hrWidth = 65;
        var hrThick = "═".repeat(hrWidth);
        var hrThin = "-".repeat(hrWidth);
        var resColor = this.passedAll() ? fgPass : fgFail;
        var resBadge = this.passedAll() ? exports.PASS_BADGE : exports.FAIL_BADGE;
        console.log(resColor(hrThick));
        var basename = path_1.default.basename(this.filePath);
        var prename = this.filePath.substr(0, this.filePath.lastIndexOf(basename));
        console.log(resBadge, resColor(prename + colors_1.default.bold(basename)));
        console.log("Total: " + this.testCount + "\tPassed: " + this.passCount + "\tFailed: " + this.failCount + "\tTime: " + this.time + " ms");
        console.log(resColor(hrThin));
        for (var _i = 0, _a = Array.from(this.testResults.values()); _i < _a.length; _i++) {
            var test = _a[_i];
            var indent = " ".repeat(0);
            var bigIndent = indent.repeat(2);
            var resIcon = test.passed ? exports.PASS_ICON : exports.FAIL_ICON;
            var format = test.passed ? fgPlain : colors_1.default.bold;
            console.log(format(indent + (resIcon + " " + test.testName + " (" + test.time + " ms)")));
            if (!test.passed && test.failure) {
                console.log("");
                test.failure.print();
                console.log("");
            }
        }
        console.log(resColor(hrThick) + "\n");
    };
    return TestFileReport;
}());
exports.TestFileReport = TestFileReport;
