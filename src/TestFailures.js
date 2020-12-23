const { extractTestFailureOrigin, TestFailureOrigin } = require("./TestFailureOrigin");
const { determineType } = require("./JsTypes");

/********************\
| ASSERTION FAILURES |
\********************/

const exp = module.exports;
exp.TestFailure = class extends Error {
  constructor(props={}) {
    super();
    let {message,origin} = props;
    this.failType = "generic";
    this.name = "Test Failure";
    this.message = message || `Failed test.`;
    this.origin = origin? new TestFailureOrigin(origin) : null;
  }

  print() {
    console.error(this.message);
    if (this.origin) this.origin.print({ showCursor: true });
  }
}

exp.TimeoutFailure = class extends exp.TestFailure {
  constructor(ms) {
    super({message:`Triggered timeout after ${ms} ms`});
  }
}

exp.FoundErrorFailure = class extends exp.TestFailure {
  constructor(props) {
    super(props);
    let {e,message} = props;
    this.failType = "error";
    this.name = "Found Error Failure";
    this.stack = e? e.stack : null;
    this.message = message || e.name+": "+e.message || "no error message";
  }

  print() {
    console.log("Ecountered error during test:");
    console.log(this.message);
    if (this.origin) this.origin.print({ showCursor: true });
    if (this.stack) console.log(this.stack);
  }
}


exp.AssertionFailure = class extends exp.TestFailure {
  constructor(props={}) {
    super(props);
    this.name = props.name;
    this.message = `Failed assertion: `;
  }
}


exp.EqualityFailure = class extends exp.AssertionFailure {
  constructor(props={}) {
    super(props)
    this.failType = "equality";
    this.expected = props.expected;
    this.actual = props.actual;
  }

  print() {
    console.log(this.message);
    this.origin.print({ showCursor: true });
    console.log(`Expected (${determineType(this.expected)}):`)
    console.dir(this.expected);
    console.log(`\nActual (${determineType(this.actual)}):`)
    console.dir(this.actual);
  }
}

exp.GenericReasonFailure = class extends exp.AssertionFailure {
  constructor(props={}) {
    super(props)
    this.failType = "reason";
    this.reason = props.reason;
    this.actual = props.actual;
  }

  print() {
    console.log(this.message+this.reason);
    this.origin.print({ showCursor: true });
    console.log(`Actual:`, this.actual);
  }
}


exp.parseTestFailure = function (obj) {
  if (obj.failType == "truthy") return new exp.TruthyFailure(obj);
  if (obj.failType == "reason") return new exp.GenericReasonFailure(obj);
  if (obj.failType == "equality") return new exp.EqualityFailure(obj);
  if (obj.failType == "error") return new exp.FoundErrorFailure(obj);
  if (obj.failType == "generic") return new exp.TestFailure(obj);
  else return new exp.TestFailure("unknown cause");
}