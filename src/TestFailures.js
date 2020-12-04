
/********************\
| ASSERTION FAILURES |
\********************/


function determineType(obj) {
    if (Array.isArray(obj)) return "Array";
    if (obj instanceof Map) return "Map";
    if (obj instanceof Set) return "Set";
    if (obj instanceof Promise) return "Promise";
    if (obj instanceof Function) return "Function";

    else {
        return typeof obj;
    }
}

const exp = module.exports;
exp.TestFailure = class extends Error {
    failType = "generic";
    name = "Test Failure";
    message;
    stack;

    constructor(message = "") {
        super();
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
    failType = "error";

    constructor(e) {
        super();
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
        this.message = `Failed assertion: `+name;
    }

    print() {
        console.log(this.message);
    }
}


exp.EqualityFailure = class extends exp.TestFailure {
    failType = "equality";
    expected;
    actual;

    constructor(props) {
        super(props.name)
        this.expected = props.expected;
        this.actual = props.actual;
    }
    
    print() {
        console.log(this.message);
        console.log(`Expected (${determineType(this.expected)}):`, this.expected);
        console.log(`Actual (${determineType(this.actual)}):`, this.actual);
    }
}

exp.TruthyFailure = class extends exp.TestFailure {
    failType = "truthy";
    expected;
    actual;

    constructor(props) {
        super(props.name)
        this.expected = props.expected;
        this.actual = props.actual;
    }
    
    print() {
        console.log(this.message);
        console.log(`Expected: `, this.expected);
        console.log(`Actual: `, this.actual);
    }
}


exp.parseTestFailure = function(obj) {
    if (obj.failType == "truthy") return new exp.TruthyFailure(obj);
    if (obj.failType == "equality") return new exp.EqualityFailure(obj);
    if (obj.failType == "error") return new exp.FoundErrorFailure(obj);
    if (obj.failType == "generic") return new exp.TestFailure(obj);
    else return new exp.TestFailure("unknown cause");
}