var pathLib = require('path');
var childProcess = require('child_process');
const { getFilesFromDir } = require('./DriverUtils');
const {fgPrimary, bold} = require("./formatters");
const TestFile = require("./TestFile");

module.exports = class TestFilesCompiler {
    constructor(){
        this.outDir = null;
        this.compiledFiles = new Map();
        this.exportCompiledFiles = null;
    }

    compileFiles(rawPaths,outDir,exportCompiledFiles) {
        this.exportCompiledFiles = exportCompiledFiles;
        this.outDir = outDir;
        
        console.log("Preparing tests in "+bold(fgPrimary(rawPaths.length))+" files...")

        let tsPaths = [];
        for (let rawPath of rawPaths) {
            if (pathLib.extname(rawPath)==".ts") tsPaths.push(rawPath);

            let key = pathLib.basename(rawPath).replace(pathLib.extname(rawPath),"");
            this.compiledFiles.set(key,new TestFile(rawPath,rawPath))
        };

        let compiler = this;
        function onCompilationComplete(err, stdout, stderr) {
            if (err) {
                console.log("Could not compile TypeScript files!")
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
            console.log("Compiling "+bold(fgPrimary(tsPaths.length))+" TypeScript files...")
            childProcess.exec('tsc --target es5 --esModuleInterop --allowJs --outDir '+this.outDir+" "+tsPaths.join(" "), onCompilationComplete);
        }
        else {
            compiler.onCompletion();
        }
    }

    onCompletion() {
        this.exportCompiledFiles(Array.from(this.compiledFiles.values()));
    };
}