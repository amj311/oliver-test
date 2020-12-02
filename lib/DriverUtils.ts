import fs from "fs";
import pathLib from 'path';
import childProcess from 'child_process';
import colors from 'colors';
import 'reflect-metadata';
import { TestResult } from "./TestResult";
import { AssertionError } from "assert";
import { parseTestFailure, TestFailure } from "./TestFailures";

export const FLAGS = {
    MSG_START: "<!OT-TEST",
    TEST_START: "START",
    TEST_END: "END",
    TEST_PASS: "PASS",
    TEST_FAIL: "FAIL",
    TEST_TIME: "TIME",
    TEST_ERR: "ERR",
    MSG_END: "OT-TEST!>",
    DELIM: ":::",
}

export function fgPlain(msg: any) {
    return msg;
}
export function fgPrimary(msg: any) {
    return colors.cyan(msg);
}
export function fgPass(msg: any) {
    return colors.green(msg);
}
export function bgPass(msg: any) {
    return colors.bold(colors.bgGreen(" " + msg + " "));
}
export function fgFail(msg: any) {
    return colors.red(msg);
}
export function bgFail(msg: any) {
    return colors.bold(colors.bgRed(" " + msg + " "));
}
export function fgDim(msg: any) {
    return colors.dim(msg);
}
export const PASS_BADGE = bgPass("PASS");
export const PASS_ICON = fgPass("✔");
export const FAIL_BADGE = bgFail("FAIL");
export const FAIL_ICON = fgFail("⨉");


// Return a list of files of the specified fileTypes in the provided dir, 
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']
export function getFilesFromDir(dir: string, filter: string) {
    var filesToReturn: string[] = [];

    function walkDir(currentPath: string) {
        var files = fs.readdirSync(currentPath);

        for (var i in files) {
            var curFile = pathLib.join(currentPath, files[i]);

            if (fs.statSync(curFile).isFile() && files[i].lastIndexOf(filter) > -1) {
                filesToReturn.push(curFile);
            }
            else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }
        }
    };

    walkDir(dir);
    return filesToReturn;
}




export class TestFilesCompiler {
    outDir!: string;
    compiledFiles: Map<string, TestFile> = new Map(); // key: basename of file
    // filesLeftToCompile!: number;
    exportCompiledFiles!: (testFiles: TestFile[]) => void | null;

    constructor() { }

    compileFiles(rawPaths: string[], outDir: string, exportCompiledFiles: (testFiles: TestFile[]) => void) {
        this.exportCompiledFiles = exportCompiledFiles;
        this.outDir = outDir;
        // this.filesLeftToCompile = rawPaths.length;
        this.compiledFiles = new Map();

        console.log("Preparing tests in " + fgPrimary(rawPaths.length) + " files...");

        let tsPaths = [];
        for (let rawPath of rawPaths) {
            if (pathLib.extname(rawPath)==".ts") tsPaths.push(rawPath);
            else {
                let fileName = pathLib.basename(rawPath).replace(pathLib.extname(rawPath), "");
                this.compiledFiles.set(fileName, new TestFile(rawPath, rawPath))    
            }
        };

        let compiler = this;
        function onCompilationComplete(err: any, stdout: any, stderr: any) {
            if (err) {
                console.log("Could not compile Typescript files!")
                console.log(err)
            }
            else {
                let newTestPaths = getFilesFromDir(compiler.outDir, '.test.');

                for (let testPath of newTestPaths) {
                    let fileName = pathLib.basename(testPath).replace(pathLib.extname(testPath), "");
                    let file = compiler.compiledFiles.get(fileName);
                    if (file) file.setTestPath(testPath);
                }
            }
            compiler.onCompletion();
        }

        if (tsPaths.length>0) {
            let compileProc:{stderr:any} = childProcess.exec('tsc --outDir .ot-tsc-tmp --module commonjs --target es5 --esModuleInterop' + tsPaths.join(" "), onCompilationComplete);
            compileProc.stderr?.on("data", (data:any)=> console.log(data.toString()))    
        }
        else {
            console.log("No Typescript files to compile.");
            compiler.onCompletion();
        }
    }

    onCompletion() {
        this.exportCompiledFiles(Array.from(this.compiledFiles.values()));
    };
}

class TestFile {
    origPath: any;
    testPath: any;
    constructor(origPath: any, testPath: any) {
        this.origPath = origPath;
        this.testPath = testPath;
    }

    setTestPath(path: any) {
        this.testPath = path;
    }
}


export class TestFilesRunner {
    testFiles!: TestFile[];
    filesLeftToRun!: number;
    filesPassed: number;
    filesFailed: number;
    totalTests: number;
    testsPassed: number;
    testsFailed: number;
    time: number;
    onCompleteCb!: () => void;

    constructor() {
        this.filesPassed = 0;
        this.filesFailed = 0;
        this.totalTests = 0;
        this.testsPassed = 0;
        this.testsFailed = 0;
        this.time = 0;
    }

    runFiles(testFiles: TestFile[], onCompleteCb: () => void) {
        this.testFiles = testFiles;
        this.filesLeftToRun = this.testFiles.length;
        this.onCompleteCb = onCompleteCb;

        console.log("Running tests...\n")

        for (let file of this.testFiles) this.runTestFile(file, this);
    }

    runTestFile(testFile: TestFile, caller: this) {

        function onChildTerminate(err: any, stdout: any, stderr: any) {
            let fileReport = new TestFileReport(testFile.testPath);

            let msg = stdout;
            let flags:any = [];

            msg.split(FLAGS.MSG_START)
                .filter((line: string) => line.indexOf(FLAGS.DELIM) == 0)
                .forEach( (str:string) => flags.push(str.split(FLAGS.MSG_END)[0]));

            flags = flags.map((f: string) => f.split(FLAGS.DELIM))

            for (let flag of flags) {
                let event = flag[1];
                let content = flag[3];

                if (event == FLAGS.TEST_END) {
                    fileReport.addTestResult(JSON.parse(content));
                }
            }

            caller.reportTestFile(fileReport);
        }

        childProcess.execFile('node', [testFile.testPath],
            onChildTerminate);
    }

    reportTestFile(report: { print: () => void; passedAll: () => any; testCount: any; failCount: any; passCount: any; time: any; }) {
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
        let suitesLabel = "Test Suites:";
        let testsLabel = "Tests:";
        let timeLabel = "Time:";
        let labelWidth = suitesLabel.length;
        console.log(colors.bold(fgPrimary("Tests Complete!\n")));
        console.log(
            colors.bold(suitesLabel + " ".repeat(labelWidth - suitesLabel.length)),
            (this.filesPassed > 0 ? colors.bold(fgPass(" " + this.filesPassed + " passed,")) : ""),
            (this.filesFailed > 0 ? colors.bold(fgFail(this.filesFailed + " failed,")) : ""),
            (this.testFiles.length + " total")
        )
        console.log(
            colors.bold(testsLabel + " ".repeat(labelWidth - testsLabel.length)),
            (this.testsPassed > 0 ? colors.bold(fgPass(" " + this.testsPassed + " passed,")) : ""),
            (this.testsFailed > 0 ? colors.bold(fgFail(this.testsFailed + " failed,")) : ""),
            (this.totalTests + " total")
        )
        console.log(
            colors.bold(timeLabel + " ".repeat(labelWidth - timeLabel.length)),
            colors.yellow(" " + colors.bold(this.time + " ms"))
        )

        this.onCompleteCb();
    }

}

export class TestFileReport {
    filePath: any;
    testCount: number;
    passCount: number;
    failCount: number;
    time: number;
    testResults: Map<any, any>;
    constructor(path: any) {
        this.filePath = path;

        this.testCount = 0;
        this.passCount = 0;
        this.failCount = 0;
        this.time = 0;

        this.testResults = new Map();
    }

    addTestResult(res: TestResult) {
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
        let prename = this.filePath.substr(0, this.filePath.lastIndexOf(basename))
        console.log(resBadge, resColor(prename + colors.bold(basename)))
        console.log(`Total: ${this.testCount}\tPassed: ${this.passCount}\tFailed: ${this.failCount}\tTime: ${this.time} ms`)

        console.log(resColor(hrThin))

        for (let test of Array.from(this.testResults.values()) as TestResult[]) {
            let indent = " ".repeat(0);
            let bigIndent = indent.repeat(2);

            let resIcon = test.passed ? PASS_ICON : FAIL_ICON;
            let format = test.passed ? fgPlain : colors.bold;
            console.log(format(indent + `${resIcon} ${test.testName} (${test.time} ms)`))

            if (!test.passed && test.failure) {
                console.log("");
                test.failure.print();
                console.log("");
            }
        }

        console.log(resColor(hrThick) + "\n")
    }
}
