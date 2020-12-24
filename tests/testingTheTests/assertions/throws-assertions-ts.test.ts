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



test("True: throws error", ()=>{
    expect.throwsError(ParentError, ()=>{
        throw new ParentError();
    });
})

test("True: throws inherited error", ()=>{
    expect.throwsError(ParentError, ()=>{
        throw new ChildError();
    });
})

test("Fail: throws no error", ()=>{
    expect.throwsError(ParentError, ()=>{});
})

test("Fail: throws other error", ()=>{
    expect.throwsError(ChildError, ()=>{
        throw new ParentError();
    });
})