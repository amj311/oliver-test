import { expect, test, when, mock } from '../../index';

const origStr = "original"

class Printer {
    strThing = origStr;
    argVal;

    constructor(arg) {
        this.argVal = arg;
    }
    
    getString(arg=0):string {
        return (origStr);
    }
}

test("Printer works as expected", function() {
    let arg = 0;
    let prtr = new Printer(arg);

    expect.true(prtr != null);
    expect.equal(prtr.argVal,arg);
    expect.equal(prtr.strThing,origStr);
    expect.equal(prtr.getString(),origStr);
    expect.equal(prtr.getString(2),origStr);
})


test("Original method works after when", function() {
    let arg = 0;
    let prtr = new Printer(arg);

    when(prtr,"getString",5).thenReturn(5);

    expect.true(prtr != null);
    expect.equal(prtr.argVal,arg);
    expect.equal(prtr.strThing,origStr);
    expect.equal(prtr.getString(),origStr);
    expect.equal(prtr.getString(2),origStr);
})


test("When Printer method thenReturn, no args", ()=>{
    let prtr = new Printer(0);
    let mockVal = 5;
    when(prtr,"getString").thenReturn(mockVal);

    expect.equal(prtr.getString(),mockVal)
    expect.equal(prtr.getString(2),origStr)
})


test("When Printer method thenDo, no args, full return", ()=>{
    let prtr = new Printer(0);
    let mockVal = 5;
    when(prtr,"getString").thenDo(() => {
        test("Test from thenDo", ()=> {
            expect.true(true);
        })
        return mockVal;
    });

    expect.equal(prtr.getString(),mockVal)
    expect.equal(prtr.getString(2),origStr)
})


test("When Printer method behavior stack", ()=>{
    let prtr = new Printer(0);
    let mockVal = 5;

    when(prtr,"getString",2)
        .thenDo(() => console.log(mockVal))
        .thenReturn(mockVal);


    expect.equal(prtr.getString(), origStr)         // returns "original value"
    expect.equal(prtr.getString(1), origStr)        // returns "original value"
    expect.equal(prtr.getString(2), undefined)      // prints "mocked val"
    expect.equal(prtr.getString(2), mockVal)        // returns "mocked val"
    expect.equal(prtr.getString(2), mockVal)        // returns "mocked val"  
})



test("Mock Printer original method works", ()=>{
    let mockPrtr = mock(Printer) as Printer;
    
    expect.true(mockPrtr != null);
    expect.equal(mockPrtr.getString(2),origStr)
})


test("Mock Printer when method works", ()=>{
    let mockPrtr:any = mock(Printer);
    expect.true(mockPrtr != null);

    let mockVal = 1;
    mockPrtr.when("getString",mockVal).thenReturn(mockVal);
    expect.equal(mockPrtr.getString(2),origStr)
})
