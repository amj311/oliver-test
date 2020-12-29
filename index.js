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
const { getFilesFromDir } = require('./src/DriverUtils');
const TestFilesCompiler = require('./src/TestFilesCompiler');
const TestFilesRunner = require('./src/TestFilesRunner');
const { runTBody,setBeforeEach } = require('./src/oTest');
const expect = require("./src/Assertions"); 
const { oWhen, oMock } = require('./src/oMock');
const { fgPrimary, bold } = require('./src/formatters');

const TSC_OUTDIR = ".ot-tsc-tmp";

function runTestDir(testDir) {
    console.log(colors.green(ASCII_LOGO));

    var pjson = require('./package.json');
    console.log("Running version "+bold(fgPrimary(pjson.version)));

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

module.exports = {runTestDir, test:runTBody, beforeEach:setBeforeEach, expect, when:oWhen, mock:oMock}