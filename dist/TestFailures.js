"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTestFailure = exports.TruthyFailure = exports.EqualityFailure = exports.AssertionFailure = exports.FoundErrorFailure = exports.TimeoutFailure = exports.TestFailure = void 0;
function determineType(obj) {
    if (Array.isArray(obj))
        return "Array";
    if (obj instanceof Map)
        return "Map";
    if (obj instanceof Set)
        return "Set";
    if (obj instanceof Function)
        return "Function";
    else {
        return typeof obj;
    }
}
var TestFailure = /** @class */ (function () {
    function TestFailure(message) {
        if (message === void 0) { message = ""; }
        this.failType = "generic";
        this.name = "Test Failure";
        this.message = message || "Failed test.";
    }
    TestFailure.prototype.print = function () {
        console.log(this.message);
    };
    return TestFailure;
}());
exports.TestFailure = TestFailure;
var TimeoutFailure = /** @class */ (function (_super) {
    __extends(TimeoutFailure, _super);
    function TimeoutFailure(ms) {
        return _super.call(this, "Triggered timeout after " + ms + " ms") || this;
    }
    return TimeoutFailure;
}(TestFailure));
exports.TimeoutFailure = TimeoutFailure;
var FoundErrorFailure = /** @class */ (function (_super) {
    __extends(FoundErrorFailure, _super);
    function FoundErrorFailure(e) {
        var _this = _super.call(this) || this;
        _this.failType = "error";
        _this.stack = e.stack;
        _this.message = "Encountered error: " + e.message;
        return _this;
    }
    FoundErrorFailure.prototype.print = function () {
        console.log(this.message);
        if (this.stack)
            console.log(this.stack);
    };
    return FoundErrorFailure;
}(TestFailure));
exports.FoundErrorFailure = FoundErrorFailure;
var AssertionFailure = /** @class */ (function (_super) {
    __extends(AssertionFailure, _super);
    function AssertionFailure(name) {
        var _this = _super.call(this) || this;
        _this.message = "Failed assertion: " + name;
        return _this;
    }
    AssertionFailure.prototype.print = function () {
        console.log(this.message);
    };
    return AssertionFailure;
}(TestFailure));
exports.AssertionFailure = AssertionFailure;
var EqualityFailure = /** @class */ (function (_super) {
    __extends(EqualityFailure, _super);
    function EqualityFailure(props) {
        var _this = _super.call(this, props.name) || this;
        _this.failType = "equality";
        _this.expected = props.expected;
        _this.actual = props.actual;
        return _this;
    }
    EqualityFailure.prototype.print = function () {
        console.log(this.message);
        console.log("Expected (" + determineType(this.expected) + "):", this.expected);
        console.log("Actual (" + determineType(this.actual) + "):", this.actual);
    };
    return EqualityFailure;
}(AssertionFailure));
exports.EqualityFailure = EqualityFailure;
var TruthyFailure = /** @class */ (function (_super) {
    __extends(TruthyFailure, _super);
    function TruthyFailure(props) {
        var _this = _super.call(this, props.name) || this;
        _this.failType = "truthy";
        _this.expected = props.expected;
        _this.actual = props.actual;
        return _this;
    }
    TruthyFailure.prototype.print = function () {
        console.log(this.message);
        console.log("Expected: ", this.expected);
        console.log("Actual: ", this.actual);
    };
    return TruthyFailure;
}(AssertionFailure));
exports.TruthyFailure = TruthyFailure;
function parseTestFailure(obj) {
    if (obj.failType == "truthy")
        return new TruthyFailure(obj);
    if (obj.failType == "equality")
        return new EqualityFailure(obj);
    if (obj.failType == "error")
        return new FoundErrorFailure(obj);
    if (obj.failType == "generic")
        return new TestFailure(obj);
    else
        return new TestFailure("unknown cause");
}
exports.parseTestFailure = parseTestFailure;
