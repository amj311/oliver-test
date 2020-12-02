
function determineType(obj:any): string {
    if (Array.isArray(obj)) return "Array";
    if (obj instanceof Map) return "Map";
    if (obj instanceof Set) return "Set";
    if (obj instanceof Function) return "Function";

    else {
        return typeof obj;
    }
}


export class TestFailure implements Error {
    failType:string = "generic";
    name: string = "Test Failure";
    message: string;
    stack?: string | undefined;

    constructor(message:string = "") {
        this.message = message || `Failed test.`;
    }

    print() {
        console.log(this.message);
    }
}





export class FoundErrorFailure extends TestFailure {
    failType:string = "error";

    constructor(e:Error) {
        super();
        this.stack = e.stack;
        this.message = `Encountered error: `+e.message;
    }

    print() {
        console.log(this.message);
        if (this.stack) console.log(this.stack);
    }
}






export class AssertionFailure extends TestFailure {
    constructor(name:string) {
        super();
        this.message = `Failed assertion: `+name;
    }

    print() {
        console.log(this.message);
    }
}



export class EqualityFailure extends AssertionFailure {
    failType:string = "equality";
    expected:any;
    actual:any;

    constructor(props:{name:string, actual:any,expected:any}) {
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





export class TruthyFailure extends AssertionFailure {
    failType:string = "truthy";
    expected:string;
    actual:any;

    constructor(props:{name:string, expected:"truthy"|"falsey", actual:any}) {
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




export function parseTestFailure(obj:any):TestFailure {
    if (obj.failType == "truthy") return new TruthyFailure(obj);
    if (obj.failType == "equality") return new EqualityFailure(obj);
    if (obj.failType == "error") return new FoundErrorFailure(obj);
    if (obj.failType == "generic") return new TestFailure(obj);
    else return new TestFailure("unknown cause");
}