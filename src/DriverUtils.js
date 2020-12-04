var pathLib = require('path');
var fs = require('fs');

const exp = module.exports;

// Return a list of files of the specified fileTypes in the provided dir, 
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']
exp.getFilesFromDir = function(dir, filter) {
    var filesToReturn = [];

    function walkDir(currentPath) {
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

exp.FLAGS = {
    MSG_START: "<!OT-TEST",
    TEST_START: "START",
    TEST_END: "END",
    TEST_PASS: "PASS",
    TEST_FAIL: "FAIL",
    TEST_TIME: "TIME",
    TEST_ERR: "ERR",
    MSG_END: "OT-TEST!>",
    DELIM: ":::"
}