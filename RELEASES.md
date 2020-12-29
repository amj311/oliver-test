# RELEASE PLANS <!-- omit in toc -->

# Upcoming Features <!-- omit in toc -->

- Supply an array of paths to `runTestDir()` to gather tests from multiple locations into the same report.
- Supply array of paths to exclude from search
- Exclude `node_modules` by default
- Logging options for `runTestDir()` (only failed, only results, etc)
  - Config object for constructor possible for v2
- CLI
- Assertions
- beforeEach for all tests in a file

# Release Summaries <!-- omit in toc -->

- [v1.1](#v11)
- [v1.2](#v12)
  - [v1.2.1](#v121)
- [v1.3](#v13)
  - [v1.3.1](#v131)
  - [v1.3.1](#v131-1)
- [v1.4](#v14)


## v1.1
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

## v1.2
- This release added support for mocking with `when` and `mock` methods.

### v1.2.1
- Assertion failures print code from origin.
- ErrorFailures print stack trace.


## v1.3
- New Assertions:
  - `notEqual(actual:any, unexpected:any)`
  - `notEqualLoose(actual:any, unexpected:any)`
  - `null(actual:any)`
  - `notNull(actual:any)`
  - `undefined(actual:any)`
  - `notUndefined(actual:any)`
  - `throws(errorClass:function, operation:function)`
  - `throwsError(operation:function)`
 
### v1.3.1
- `runTestDir()` prints curent version.
 
### v1.3.1
- Fixed breaking issue: `expect.falsey` had been removed in previous release

## v1.4
- Added `beforeEach(action:function)`
- `test` returns success of test as `boolean`;