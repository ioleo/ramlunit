"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestCaseNode = (function () {
    function TestCaseNode(name, failures) {
        this.name = name;
        this.failures = failures;
    }
    TestCaseNode.prototype.countFailures = function () {
        return this.failures.length;
    };
    TestCaseNode.prototype.hasFailures = function () {
        return this.countFailures() > 0;
    };
    TestCaseNode.prototype.toJson = function () {
        var failures = this.failures.map(function (f) { return f.toJson(); });
        return { testcase: [{ _attr: this.attr() }].concat(failures) };
    };
    TestCaseNode.prototype.attr = function () {
        return {
            name: this.name,
            failures: this.countFailures()
        };
    };
    return TestCaseNode;
}());
exports.TestCaseNode = TestCaseNode;
//# sourceMappingURL=TestCaseNode.js.map