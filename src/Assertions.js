const { extractTestFailureOrigin } = require("./TestFailureOrigin");
const { EqualityFailure, TruthyFailure, GenericReasonFailure } = require("./TestFailures");


function attemptAssertion(assert,failure) {
    failure.origin = extractTestFailureOrigin();
    if (!assert()) throw failure;
}


function genericAssertEqual(name,actual,expected) {
    let assert = function() {
        return actual === expected;
    }
    let failure = new EqualityFailure({name,actual,expected});
    attemptAssertion(assert,failure);
}


function genericAssertIdentity(assert,actual,reason) {
    let failure = new GenericReasonFailure({actual,reason});
    console.log(reason,failure)
    attemptAssertion(assert,failure);
}


module.exports = {
    /**
     * Checks equality with loose equality operator
     * @param name
     * @param actual
     * @param expected
     */
    equalLoose(actual,expected) {
        let assert = function() {
            return actual == expected;
        }
        let failure = new EqualityFailure({name:"equalLoose",actual,expected});
        attemptAssertion(assert,failure);
    },

    /**
     * Checks equality with strong equals operator
     * @param actual 
     * @param expected 
     */
    equal(actual,expected) {
        genericAssertEqual("equal",actual,expected)
    },

    
    null(actual) {
        genericAssertIdentity(()=>actual===null,actual,"Expected value to be null, but it was not.")
    },

    notNull(actual) {
        genericAssertIdentity(()=>actual!==null,actual,"Expected value not to be null, but it was.")
    },

    undefined(actual) {
        genericAssertIdentity(()=>actual===undefined,actual,"Expected value to be undefined, but it was not.")
    },

    notUndefined(actual) {
        genericAssertIdentity(()=>actual!==undefined,actual,"Expected value not to be undefined, but it was.")
    },


    true(actual) {
        genericAssertIdentity(()=>actual===true,actual,"Expected value to be true, but it was not.")
    },
    
    false(actual) {
        genericAssertIdentity(()=>actual===false,actual,"Expected value to be false, but it was not.")
    },


    truthy(actual) {
        let assert = function() {
            if (actual) return true;
            else return false;
        }
        genericAssertIdentity(assert,actual,"Expected value to be truthy, but it was not.")
    },

    falsey(actual) {
        let assert = function() {
            if (!actual) return true;
            else return false;
        }
        genericAssertIdentity(assert,actual,"Expected value to be falsey, but it was not.")
    }

}
