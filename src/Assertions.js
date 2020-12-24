const { extractTestFailureOrigin } = require("./TestFailureOrigin");
const { EqualityFailure, TruthyFailure, GenericReasonFailure, ThrowsErrorFailure } = require("./TestFailures");


function attemptAssertion(assert,failure) {
    failure.origin = extractTestFailureOrigin();
    if (!assert()) throw failure;
}


function genericAssertEqual(assert,name,actual,expected) {
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
     * Checks that two values are loosely equal
     * @param name
     * @param actual
     * @param expected
     */
    equalLoose(actual,expected) {
        genericAssertEqual(()=>actual!==expected,"equal loose",actual,expected)
    },

    
    /**
     * Checks that two values are strongly equal
     * @param actual 
     * @param expected 
     */
    equal(actual,expected) {
        genericAssertEqual(()=>actual===expected,"equal",actual,expected)
    },


    /**
     * Checks that two values are not strongly equal
     * @param actual 
     * @param expected 
     */
    notEqual(actual,expected) {
        genericAssertEqual(()=>actual==expected,"not equal",actual,expected)
    },

    
    /**
     * Checks that two values are not loosely equal
     * @param actual 
     * @param expected 
     */
    notEqualLoose(actual) {
        genericAssertEqual(()=>actual!=expected,"not equal loose",actual,expected)
    },


    
    /**
     * Checks that a value is null
     * @param actual 
     */
    null(actual) {
        genericAssertIdentity(()=>actual===null,actual,"Expected value to be null, but it was not.")
    },

    /**
     * Checks that a value is not null
     * @param actual 
     */
    notNull(actual) {
        genericAssertIdentity(()=>actual!==null,actual,"Expected value not to be null, but it was.")
    },

    /**
     * Checks that a value is undefined
     * @param actual 
     */
    undefined(actual) {
        genericAssertIdentity(()=>actual===undefined,actual,"Expected value to be undefined, but it was not.")
    },

    /**
     * Checks that a value is not undefined
     * @param actual 
     */
    notUndefined(actual) {
        genericAssertIdentity(()=>actual!==undefined,actual,"Expected value not to be undefined, but it was.")
    },


    /**
     * Checks that a value is equal to true
     * @param actual 
     */
    true(actual) {
        genericAssertIdentity(()=>actual===true,actual,"Expected value to be true, but it was not.")
    },
    

    /**
     * Checks that a value is equal to false
     * @param actual 
     */
    false(actual) {
        genericAssertIdentity(()=>actual===false,actual,"Expected value to be false, but it was not.")
    },


    /**
     * Checks that a value is truthy
     * @param actual 
     */
    truthy(actual) {
        let assert = function() {
            if (actual) return true;
            else return false;
        }
        genericAssertIdentity(assert,actual,"Expected value to be truthy, but it was not.")
    },


    /**
     * Checks that an operation throws an error. If a class is not provided this will check for `Error` by default
     * @param errorClass
     * @param operation
     */
    throwsError(errorClass,operation) {
        if (!errorClass) errorClass = Error;
        let assert = function() {
            try {
                operation();
                return false;
            }
            catch (e) {
                if (e instanceof errorClass) return true;
                else throw e;
            }
        }
        let failure = new ThrowsErrorFailure({opStr:operation.toString()});
        attemptAssertion(assert,failure)
    }

}