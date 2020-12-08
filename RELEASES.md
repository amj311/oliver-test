# RELEASE PLANS

# Upcoming Features
- Supply an array of paths to `runTestDir()` to gather tests from multiple locations into the same report.
- `verbose` parameter for `runTestDir()`
  - Config object for constructor possible for v2
- Mocking
- Assertions
  - `expect.notEqual(actual:any, unexpected:any)`
  - `expect.null(actual:any)`
  - `expect.notNull(actual:any)`
  - `expect.undefined(actual:any)`
  - `expect.notUndefined(actual:any)`
  - `expect.throws(errorClass:function, operation:function)`

## v1.1.0
Below are listed the exposed portions of the API as of the first release.

- Assertions
  - `expect.equal(actual:any, expected:any)`
  - `expect.equalLoose(actual:any, expected:any)`
  - `expect.true(actual:any)`
  - `expect.truthy(actual:any)`
  - `expect.false(actual:any)`
  - `expect.falsey(actual:any)`
- `runTestDir(path:string)`
- `test(name:string, testBody:function)`