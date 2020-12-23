const { extractTestFailureOrigin } = require("./TestFailureOrigin");
const { EqualityFailure, TruthyFailure } = require("./TestFailures");


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


    true(actual) {
        genericAssertEqual("true",actual,true)
    },
    
    false(actual) {
        genericAssertEqual("false",actual,false)
    },


    truthy(actual) {
        let assert = function() {
            if (actual) return true;
            else return false;
        }
        let failure = new TruthyFailure({name:"truthy",expected:'truthy',actual});

        attemptAssertion(assert,failure);
    },

    falsey(actual) {
        let assert = function() {
            if (!actual) return true;
            else return false;
        }
        let failure = new TruthyFailure({name:"falsey",expected:'falsey',actual});

        attemptAssertion(assert,failure);
    }

}
