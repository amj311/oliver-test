const { expect, test, runTestDir } = require("../index");
const util = require("util");
const { AssertionFailure, ThrowsErrorFailure } = require("../src/TestFailures");
const { AssertionError } = require("assert");

runTestDir("./tests/testingTheTests/compatibility/1.4")

// test("True: throws error", ()=>{
//     expect.throwsError(AssertionFailure, ()=>{
//         throw new AssertionFailure({name:"Test"});
//     });
// })

// test("True: throws inherited error", ()=>{
//     expect.throwsError(AssertionFailure, ()=>{
//         throw new ThrowsErrorFailure({opStr:"Test Op"});
//     });
// })

// test("Fail: throws no error", ()=>{
//     expect.throwsError(AssertionFailure, ()=>{});
// })

// test("Fail: throws other error", ()=>{
//     expect.throwsError(ThrowsErrorFailure, ()=>{
//         throw new AssertionFailure({name:"Test"});
//     });
// })