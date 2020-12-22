# RELEASE PLANS

# Upcoming Features
- Supply an array of paths to `runTestDir()` to gather tests from multiple locations into the same report.
- Supply array of paths to exclude from search
- Exclude `node_modules` by default
- Logging options for `runTestDir()` (only failed, only results, etc)
  - Config object for constructor possible for v2
- CLI
- Assertions
  - Show assertion code and line number when failed
  - Print stacktrace for errorFailure
  - New Assertions:
    - `expect.notEqual(actual:any, unexpected:any)`
    - `expect.null(actual:any)`
    - `expect.notNull(actual:any)`
    - `expect.undefined(actual:any)`
    - `expect.notUndefined(actual:any)`
    - `expect.throws(errorClass:function, operation:function)`
- beforeEach for all tests in a file

## v1.2.0
- This release added support for mocking with `when` and `mock` methods.

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