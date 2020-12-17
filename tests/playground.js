const {owhen,oMock} = require("../src/oMock")

class Printer {
    printString(arg = 0) {
        console.log("original "+arg)
    }
}


let mockPrinter = oMock(Printer);
mockPrinter.printString(1);

// oWhen(mockPrinter,"printString",1).thenDo(()=>console.log("mock 1")).thenDo(()=>console.log("mock 1 again"))
mockPrinter.when("printString",1).thenDo(()=>console.log("mock 1")).thenDo(()=>console.log("mock 1 again"))

mockPrinter.printString(1);
mockPrinter.printString(2);
mockPrinter.printString(1);
