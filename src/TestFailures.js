const { determineType } = require("./JsTypes");

/********************\
| ASSERTION FAILURES |
\********************/



const exp = module.exports;
exp.TestFailure = class extends Error {
    constructor(message = "") {
        super();
        this.failType = "generic";
        this.name = "Test Failure";
        this.message = message || `Failed test.`;
    }

    print() {
        console.error(this.message);
    }
}

exp.TimeoutFailure = class extends exp.TestFailure {
    constructor(ms) {
        super(`Triggered timeout after ${ms} ms`);
    }
}

exp.FoundErrorFailure = class extends exp.TestFailure {
    constructor(e) {
        super();
        this.failType = "error";
        this.stack = e.stack;
        this.message = e.message;
    }

    print() {
        console.log("Ecountered error during test:");
        console.log(this.message);
        if (this.stack) console.log(this.stack);
    }
}


exp.AssertionFailure = class extends exp.TestFailure {
    constructor(name) {
        super();
        this.name = name;
        this.message = `Failed assertion: `+name;
    }

    print() {
        console.log(this.message);
    }
}


exp.EqualityFailure = class extends exp.AssertionFailure {

    constructor(props) {
        super(props.name)
        this.failType = "equality";
        this.expected = props.expected;
        this.actual = props.actual;
    }
    
    print() {
        console.log(this.message);
        console.log(`Expected (${determineType(this.expected)}):`, this.expected);
        console.log(`Actual (${determineType(this.actual)}):`, this.actual);
    }
}

exp.TruthyFailure = class extends exp.AssertionFailure {
    constructor(props) {
        super(props.name)
        this.failType = "truthy";
        this.expected = props.expected;
        this.actual = props.actual;
    }
    
    print() {
        console.log(this.message);
        console.log(`Expected:`, this.expected);
        console.log(`Actual:`, this.actual);
    }
}


exp.parseTestFailure = function(obj) {
    if (obj.failType == "truthy") return new exp.TruthyFailure(obj);
    if (obj.failType == "equality") return new exp.EqualityFailure(obj);
    if (obj.failType == "error") return new exp.FoundErrorFailure(obj);
    if (obj.failType == "generic") return new exp.TestFailure(obj);
    else return new exp.TestFailure("unknown cause");
}