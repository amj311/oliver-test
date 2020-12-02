const oTest = require("./dist/index.js")

console.log("HELLO!!!!!!")

oTest("expect.equal: Primitive", function() {
    expect.equal(5,5);
    expect.equal(2+3,5);

    let str = "string";
    let str2 = str;
    expect.equal(str2,str);
})

console.log("HELLO!!!!!!")
console.log("HELLO!!!!!!")

oTest("expect.equal: Reference", function() {
    let arr = [1,2,3,4,5];
    let arr2 = arr;
    arr2.pop();
    expect.equal(arr2,arr);

    let fail = new Map()
    let fail2 = fail;
    fail2.expected = true;
    expect.equal(fail,fail2);
})


oTest("expect.equal: Reference (Fail Case)", function() {
    let fail = new Map()
    let fail2 = new Map()
    expect.equal(fail,fail2);
})


oTest("expect.equal: Array (Fail Case)", function() {
    let arr = [1,2,3,4,5];
    let arr2 = [...arr];
    expect.equal(arr2,arr);
})

oTest("expect.equal: ArrayString (Fail Case)", function() {
    let arr = [1,2,3,4,5];
    let str = "1,2,3,4,5";
    expect.equal(str,arr);
})



oTest("expect.equalLoose", function() {
    let num = "5";
    let num2 = 5;
    expect.equalLoose(num2,num);
})