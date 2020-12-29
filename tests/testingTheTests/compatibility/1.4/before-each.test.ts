import { expect, test, beforeEach } from '../../../../index';

let num;
const numVal = 5;
let string;
const stringVal = "hello";
let bool;
const boolVal = true;

beforeEach(()=>{
    num = numVal;
    string = "hello"
    bool = true;
})

test("beforeEach inits vars", ()=>{
    expect.equal(num,numVal);
    expect.equal(string,stringVal);
    expect.equal(bool,boolVal);
})


test("beforeEach resets vars", ()=>{
    num = 0;
    string = "not hello";
    bool = false;

    let success = test("vals are back to original", ()=>{
        expect.equal(num,numVal);
        expect.equal(string,stringVal);
        expect.equal(bool,boolVal);
    })

    expect.true(success);
})