"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestSuiteNode = (function () {
    function TestSuiteNode(name, time, testcases) {
        if (testcases === void 0) { testcases = []; }
        this.name = name;
        this.time = time;
        this.testcases = testcases;
    }
    TestSuiteNode.prototype.addTestCase = function (testcase) {
        return new TestSuiteNode(this.name, this.time, this.testcases.concat(testcase));
    };
    TestSuiteNode.prototype.countFailures = function () {
        return this.testcases.reduce(function (failures, testcase) {
            return failures + testcase.countFailures();
        }, 0);
    };
    TestSuiteNode.prototype.hasFailures = function () {
        return this.countFailures() > 0;
    };
    TestSuiteNode.prototype.toJson = function () {
        var testcases = this.testcases.map(function (tc) { return tc.toJson(); });
        return { testsuite: [{ _attr: this.attr() }, { testcases: testcases }] };
    };
    TestSuiteNode.prototype.attr = function () {
        return {
            name: this.name,
            time: this.time.toString(),
            failures: this.countFailures()
        };
    };
    return TestSuiteNode;
}());
exports.TestSuiteNode = TestSuiteNode;
//# sourceMappingURL=TestSuiteNode.js.map