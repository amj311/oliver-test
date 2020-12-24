# RELEASE PLANS <!-- omit in toc -->

# Upcoming Features <!-- omit in toc -->

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
    - `notEqual(actual:any, unexpected:any)`
    - `notEqualLoose(actual:any, unexpected:any)`
    - `null(actual:any)`
    - `notNull(actual:any)`
    - `undefined(actual:any)`
    - `notUndefined(actual:any)`
    - `throws(errorClass:function, operation:function)`
    - `throwsError(operation:function)`
- beforeEach for all tests in a file

# Release Summaries <!-- omit in toc -->

- [v1.1.0](#v110)
- [v1.2.0](#v120)


## v1.1.0
Below are listed the exposed portions of the API as of the first release.

- Assertions
  - `equal(actual:any, expected:any)`
  - `equalLoose(actual:any, expected:any)`
  - `true(actual:any)`
  - `truthy(actual:any)`
  - `false(actual:any)`
  - `falsey(actual:any)`
- `runTestDir(path:string)`
- `test(name:string, testBody:function)`

## v1.2.0
- This release added support for mocking with `when` and `mock` methods.