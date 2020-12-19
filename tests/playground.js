const {owhen,oMock} = require("../src/oMock")

class Printer {
    constructor(string) {
        string.split(" ");
    }

    printString(arg = 0) {
        console.log("original "+arg)
    }
}

function mockKlass(klass) {
    console.log(Object.getOwnPropertyDescriptors(klass))

    // class MockKlass extends klass {
    //     constructor() {
    //         console.log("mage sub!")
    //     }
    // }

    // return new MockKlass();
}

mockKlass(Printer)
Printer.constructor = Object;
console.log(Printer.constructor.toString())
console.log(new Printer())