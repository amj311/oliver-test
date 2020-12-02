import { EqualityFailure, TestFailure, TruthyFailure } from "./TestFailures";

export type Assertion = () => boolean;

function attemptAssertion(assert:Assertion,failure:TestFailure) {
    if (!assert()) throw failure;
}


function genericAssertEqual(name:string,actual:any,expected:any): void {
    let assert = function(): boolean {
        return actual === expected;
    }
    let failure = new EqualityFailure({name,actual,expected});
    attemptAssertion(assert,failure);
}

export const expect = {
    /**
     * Checks equality with loose equality operator
     * @param name 
     * @param actual 
     * @param expected 
     */
    equalLoose(actual:any,expected:any): void {
        let assert = function(): boolean {
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
    equal(actual:any,expected:any): void {
        genericAssertEqual("assertEqual",actual,expected)
    },


    true(actual:boolean): void {
        genericAssertEqual("assertTrue",actual,true)
    },
    
    false(actual:boolean): void {
        genericAssertEqual("assertFalse",actual,false)
    },


    truthy(actual:any): void {
        let assert = function(): boolean {
            if (actual) return true;
            else return false;
        }
        let failure = new TruthyFailure({name:"assertTruthy",expected:'truthy',actual});

        attemptAssertion(assert,failure);
    },

    falsey(actual:any): void {
        let assert = function(): boolean {
            if (!actual) return true;
            else return false;
        }
        let failure = new TruthyFailure({name:"assertFalsey",expected:'falsey',actual});

        attemptAssertion(assert,failure);
    }

}
