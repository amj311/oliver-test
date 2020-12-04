module.exports = class TestFile {
    constructor(origPath,testPath) {
        this.origPath = origPath;
        this.testPath = testPath;
    }

    setTestPath(path) {
        this.testPath = path;
    }
}