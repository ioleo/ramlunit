"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var FailureNode_1 = require("../../../src/context/xml/FailureNode");
var TestCaseNode_1 = require("../../../src/context/xml/TestCaseNode");
describe('TestCaseNode', function () {
    var failure1 = new FailureNode_1.FailureNode('failure_1', 'foo', 'bar');
    var failure2 = new FailureNode_1.FailureNode('failute_2', 'foo', 'bar');
    var failingCase = new TestCaseNode_1.TestCaseNode('failing_case', [failure1, failure2]);
    var passingCase = new TestCaseNode_1.TestCaseNode('passing_case', []);
    it('passing case should not have failures', function () {
        chai_1.assert.strictEqual(passingCase.countFailures(), 0);
        chai_1.assert.strictEqual(passingCase.hasFailures(), false);
    });
    it('failing case should have failures', function () {
        chai_1.assert.strictEqual(failingCase.countFailures(), 2);
        chai_1.assert.strictEqual(failingCase.hasFailures(), true);
    });
    it('passing case should be convertable to json', function () {
        chai_1.assert.deepEqual(passingCase.toJson(), {
            testcase: [
                { _attr: { name: 'passing_case', failures: 0 } },
            ],
        });
    });
    it('failing case should be convertable to json', function () {
        chai_1.assert.deepEqual(failingCase.toJson(), {
            testcase: [
                { _attr: { name: 'failing_case', failures: 2 } },
                failure1.toJson(),
                failure2.toJson(),
            ],
        });
    });
});
//# sourceMappingURL=TestCaseNode.spec.js.map