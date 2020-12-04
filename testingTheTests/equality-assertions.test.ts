import { expect, test } from '../index';

test("expect.equal: Primitive", function() {
    expect.equal(5,5);
    expect.equal(2+3,5);

    let str = "string";
    let str2 = str;
    expect.equal(str2,str);
})

console.log("HELLO!!!!!!")
console.log("HELLO!!!!!!")

test("expect.equal: Reference", function() {
    let arr = [1,2,3,4,5];
    let arr2 = arr;
    arr2.pop();
    expect.equal(arr2,arr);

    let fail = new Map()
    let fail2 = fail;
    expect.equal(fail,fail2);
})


test("expect.equal: Reference (Fail Case)", function() {
    let fail = new Map()
    let fail2 = new Map()
    expect.equal(fail,fail2);
})


test("expect.equal: Array (Fail Case)", function() {
    let arr = [1,2,3,4,5];
    let arr2 = [...arr];
    expect.equal(arr2,arr);
})

test("expect.equal: ArrayString (Fail Case)", function() {
    let arr = [1,2,3,4,5];
    let str = "1,2,3,4,5";
    expect.equal(str,arr);
})

test("expect.equalLoose", function() {
    let num = "5";
    let num2 = 5;
    expect.equalLoose(num2,num);
})