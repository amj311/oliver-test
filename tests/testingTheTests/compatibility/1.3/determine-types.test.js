const { test, expect } = require('../../../../index')
const { determineType } = require('../../../../src/JsTypes');

test("Determine Array", function() {
    expect.equal(determineType([]), "Array")
    expect.equal(determineType(new Array()), "Array")
})

test("Determine Promise", function() {
    expect.equal(determineType([]), "Array")
    expect.equal(determineType(new Promise(()=>{},()=>{})), "Promise")
})

test("Determine String()", function() {
    expect.equal(determineType(new String()), "string");
})

test("Determine string()", function() {
    expect.equal(determineType("khg"), "string");
})

test("Determine Function", function() {
    expect.equal(determineType(()=>{}), "function");
    expect.equal(determineType(new Function()), "function");
})

test("Determine undefined", function() {
    expect.equal(determineType(undefined), "undefined");
})

test("Determine Obscure Class", function() {
    expect.equal(determineType(new ArrayBuffer()), "ArrayBuffer");
})

test("Determine Custom Class", function() {
    class MyClass {}
    expect.equal(determineType(new MyClass()), "MyClass");
})