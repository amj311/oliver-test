const { EqualityFailure, TruthyFailure } = require("./TestFailures");


function attemptAssertion(assert,failure) {
    if (!assert()) throw failure;
}


function genericAssertEqual(name,actual,expected) {
    let assert = function() {
        return actual === expected;
    }
    let failure = new EqualityFailure({name,actual,expected});
    attemptAssertion(assert,failure);
}

module.exports.assertions = {
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
        let failure = new EqualityFailure({name:"assertEqualLoose",actual,expected});
        attemptAssertion(assert,failure);
    },

    /**
     * Checks equality with strong equals operator
     * @param actual 
     * @param expected 
     */
    equal(actual,expected) {
        genericAssertEqual("assertEqual",actual,expected)
    },


    true(actual) {
        genericAssertEqual("assertTrue",actual,true)
    },
    
    false(actual) {
        genericAssertEqual("assertFalse",actual,false)
    },


    truthy(actual) {
        let assert = function() {
            if (actual) return true;
            else return false;
        }
        let failure = new TruthyFailure({name:"assertTruthy",expected:'truthy',actual});

        attemptAssertion(assert,failure);
    },

    falsey(actual) {
        let assert = function() {
            if (!actual) return true;
            else return false;
        }
        let failure = new TruthyFailure({name:"assertFalsey",expected:'falsey',actual});

        attemptAssertion(assert,failure);
    }

}
