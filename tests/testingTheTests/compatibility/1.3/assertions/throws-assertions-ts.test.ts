import { expect, test } from '../../../../../index';

class ParentError implements Error {
    constructor() {
    }
    name: string = "name";
    message: string = "msg";
    stack?: string;
}

class ChildError extends ParentError {
    constructor() {
        super();
    }
}


test("Pass: throwsError", ()=>{
    expect.throwsError(()=>{
        throw new Error();
    });
})

test("Pass: throwsError from other error", ()=>{
    expect.throwsError(()=>{
        throw new ParentError();
    });
})

test("Pass: throws error", ()=>{
    expect.throws(ParentError, ()=>{
        throw new ParentError();
    });
})

test("Pass: throws inherited error", ()=>{
    expect.throws(ParentError, ()=>{
        throw new ChildError();
    });
})

test("Fail: Throws no error", ()=>{
    try {
        expect.throws(ParentError, ()=>{});
    }
    catch(e) {
        expect.equal(e.failType, "throws")
    }
})

test("Fail: throws other error", ()=>{
    expect.throws(ParentError, ()=>{
        expect.throws(ChildError, ()=>{
            throw new ParentError();
        });
    });
})