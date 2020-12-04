const ASCII_LOGO = `
████████████████████████████████████████████████████████████████
██╔═══════════════════════════════════════════════════════════██╗
██║...........................................................██║
██║....██████╗.██╗.....██╗██╗...██╗███████╗██████╗............██║
██║...██╔═══██╗██║.....██║██║...██║██╔════╝██╔══██╗...........██║
██║...██║...██║██║.....██║██║...██║█████╗..██████╔╝...........██║
██║...██║...██║██║.....██║╚██╗.██╔╝██╔══╝..██╔══██╗...........██║
██║...╚██████╔╝███████╗██║.╚████╔╝.███████╗██║..██║...........██║
██║....╚═════╝.╚══════╝╚═╝..╚═══╝..╚══════╝╚═╝..╚═╝...........██║
██║...........................................................██║
██║.......................████████╗███████╗███████╗████████╗..██║
██║.......................╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝..██║
██║..........................██║...█████╗..███████╗...██║.....██║
██║..........................██║...██╔══╝..╚════██║...██║.....██║
██║..........................██║...███████╗███████║...██║.....██║
██║..........................╚═╝...╚══════╝╚══════╝...╚═╝.....██║
██║...........................................................██║
████████████████████████████████████████████████████████████████║
  ╚═════════════════════════════════════════════════════════════╝
`

var childProcess = require('child_process');
var colors = require('colors');
const { getFilesFromDir, FLAGS } = require('./DriverUtils');
const TestFilesCompiler = require('./TestFilesCompiler');
const TestFilesRunner = require('./TestFilesRunner');
const oTest = require('./oTest');
const { assertions } = require("./Assertions"); 

const TSC_OUTDIR = ".ot-tsc-tmp";

function runTestDir(testDir) {
    console.log(colors.green(ASCII_LOGO));

    const rawFiles = getFilesFromDir(testDir,".test.");
    
    const runner = new TestFilesRunner();
    const compiler = new TestFilesCompiler();

    function runTests(testFiles) {
        runner.runFiles(testFiles, ()=>{
            childProcess.exec('rm -rf '+TSC_OUTDIR);
        });
    }

    compiler.compileFiles(rawFiles, TSC_OUTDIR, runTests);
}

module.exports = {runTestDir, test: oTest, expect: assertions}