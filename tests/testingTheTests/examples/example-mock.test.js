const { when, mock, test, expect } = require("../../../index");

let val = "original value"
let log = "mocked log"
let mockVal = "mocked val"

class myClass  {
  constructor() {}
  getVal() { return val }
}

test("when example", () => {
  let myObj = new myClass();
  
  when(myObj, "getVal", 2)
    .thenDo(() => console.log(log))
    .thenReturn(mockVal);

  expect.equal(myObj.getVal(), val)     // returns "original value"
  expect.equal(myObj.getVal(1), val)    // returns "original value"
  expect.equal(myObj.getVal(2), undefined)    // prints "mocked log"
  expect.equal(myObj.getVal(2), mockVal)          // returns "mocked val"
  expect.equal(myObj.getVal(2), mockVal)          // returns "mocked val"
});




test("mock example", () => {

  const testObj = {
    useOtherObject(obj,arg=0) {
      return obj.getVal(arg)
    }
  }

  let mockObj = mock(myClass);
  mockObj.when("getVal", 2)
    .thenDo(() => console.log(log))
    .thenReturn(mockVal);

  expect.equal(testObj.useOtherObject(mockObj), val)          // returns "original value"
  expect.equal(testObj.useOtherObject(mockObj,1), val)          // returns "original value"
  expect.equal(testObj.useOtherObject(mockObj,2), undefined)    // prints "mocked log"
  expect.equal(testObj.useOtherObject(mockObj,2), mockVal)      // returns "mocked val"
  expect.equal(testObj.useOtherObject(mockObj,2), mockVal)      // returns "mocked val"
})