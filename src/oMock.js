const { ModuleKind } = require("typescript");

let oWhen = function(obj,funName,...mockArgs) {
    let argStr = JSON.stringify(mockArgs);

    let oldFun = obj[funName];
    let mocks = [];

    function addMock(action) { 
        mocks.push(action);
        console.log(action, mocks)
        console.log(mocks[0])
    };
    function doMock() {
        let action = mocks.length > 1 ? mocks.shift() : mocks[0];
        console.log(action)
        return action();
    };

    obj[funName] = function(...givenArgs) {
        if (JSON.stringify(givenArgs) == argStr) return doMock();
        else return oldFun.call(obj,...givenArgs);
    }

    return {
        thenDo(action) {
            addMock(action);
            return this;
        },
        thenReturn(val) {
            addMock(()=>{return val});
        },
        thenThrow(error) {
            addMock(() => {throw error}); 
        }
    }
}


let oMock = function(klass) {
    let mocker = new Object();
    
    let props = Object.getOwnPropertyDescriptors(klass.prototype);
    Object.defineProperties(mocker,props);

    mocker.when = function(funName,...mockArgs) { 
        let ctx = this;
        return oWhen(ctx,funName,...mockArgs)
    }
    
    return mocker;
}

module.exports = {oMock,oWhen}