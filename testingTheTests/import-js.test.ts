import {TestFailure} from '../src/TestFailures';
import Mod from "./mod";
import { test, expect } from '../index'


test("import TestFailure.ts", function() {
    let fail = new TestFailure("plan");
    expect.equal(fail.failType,"generic");
})

test("import Mod.js", function() {
    let mod = new Mod();
    expect.true(mod instanceof Mod);
})
