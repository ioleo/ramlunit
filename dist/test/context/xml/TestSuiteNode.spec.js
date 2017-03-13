"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Time_1 = require("../../../src/context/time/Time");
var FailureNode_1 = require("../../../src/context/xml/FailureNode");
var TestCaseNode_1 = require("../../../src/context/xml/TestCaseNode");
var TestSuiteNode_1 = require("../../../src/context/xml/TestSuiteNode");
describe('TestSuiteNode', function () {
    var stopwatch = new Time_1.Time();
    var elapsed = new Time_1.Time(stopwatch);
    var failure1 = new FailureNode_1.FailureNode('aaa1', 'bbb1', 'ccc1');
    var failure2 = new FailureNode_1.FailureNode('aaa2', 'bbb2', 'ccc2');
    var failingCase = new TestCaseNode_1.TestCaseNode('failing_case', [failure1, failure2]);
    var passingCase1 = new TestCaseNode_1.TestCaseNode('passing_case_1', []);
    var passingCase2 = new TestCaseNode_1.TestCaseNode('passing_case_2', []);
    var passingSuite = new TestSuiteNode_1.TestSuiteNode('passing_suite', elapsed, [passingCase1, passingCase2]);
    var failingSuite = new TestSuiteNode_1.TestSuiteNode('failing_suite', elapsed, [passingCase1, failingCase]);
    var emptySuite = new TestSuiteNode_1.TestSuiteNode('empty_suite', elapsed, []);
    it('empty suite should not have failures', function () {
        chai_1.assert.strictEqual(emptySuite.countFailures(), 0);
        chai_1.assert.strictEqual(emptySuite.hasFailures(), false);
    });
    it('passing suite should not have failures', function () {
        chai_1.assert.strictEqual(passingSuite.countFailures(), 0);
        chai_1.assert.strictEqual(passingSuite.hasFailures(), false);
    });
    it('failing suite should have failures', function () {
        chai_1.assert.strictEqual(failingSuite.countFailures(), 2);
        chai_1.assert.strictEqual(failingSuite.hasFailures(), true);
    });
    it('empty suite should be convertable to json', function () {
        chai_1.assert.deepEqual(emptySuite.toJson(), {
            testsuite: [
                { _attr: { name: 'empty_suite', time: elapsed.toString(), failures: 0 } },
                { testcases: [] },
            ],
        });
    });
    it('passing suite should be convertable to json', function () {
        chai_1.assert.deepEqual(passingSuite.toJson(), {
            testsuite: [
                { _attr: { name: 'passing_suite', time: elapsed.toString(), failures: 0 } },
                { testcases: [
                        passingCase1.toJson(),
                        passingCase2.toJson(),
                    ] },
            ],
        });
    });
    it('failing suite should be convertable to json', function () {
        chai_1.assert.deepEqual(failingSuite.toJson(), {
            testsuite: [
                { _attr: { name: 'failing_suite', time: elapsed.toString(), failures: 2 } },
                { testcases: [
                        passingCase1.toJson(),
                        failingCase.toJson(),
                    ] },
            ],
        });
    });
});
//# sourceMappingURL=TestSuiteNode.spec.js.map