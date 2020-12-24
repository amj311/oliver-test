import { expect, test } from '../../../index';

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


test("True: throwsError", ()=>{
    expect.throwsError(()=>{
        throw new Error();
    });
})

test("True: throwsError from other error", ()=>{
    expect.throwsError(()=>{
        throw new ParentError();
    });
})

test("True: throws error", ()=>{
    expect.throws(ParentError, ()=>{
        throw new ParentError();
    });
})

test("True: throws inherited error", ()=>{
    expect.throws(ParentError, ()=>{
        throw new ChildError();
    });
})

test("Fail: throws no error", ()=>{
    expect.throws(ParentError, ()=>{});
})

test("Fail: throws other error", ()=>{
    expect.throws(ChildError, ()=>{
        throw new ParentError();
    });
})