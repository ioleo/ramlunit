"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Time_1 = require("../../../src/context/time/Time");
var DocumentNode_1 = require("../../../src/context/xml/DocumentNode");
var FailureNode_1 = require("../../../src/context/xml/FailureNode");
var TestCaseNode_1 = require("../../../src/context/xml/TestCaseNode");
var TestSuiteNode_1 = require("../../../src/context/xml/TestSuiteNode");
describe('DocumentNode', function () {
    var stopwatch = new Time_1.Time();
    var elapsed = new Time_1.Time(stopwatch);
    var failure1 = new FailureNode_1.FailureNode('aaa1', 'bbb1', 'ccc1');
    var failure2 = new FailureNode_1.FailureNode('aaa2', 'bbb2', 'ccc2');
    var failingCase = new TestCaseNode_1.TestCaseNode('failing_case', [failure1, failure2]);
    var passingCase1 = new TestCaseNode_1.TestCaseNode('passing_case_1', []);
    var passingCase2 = new TestCaseNode_1.TestCaseNode('passing_case_2', []);
    var passingSuite = new TestSuiteNode_1.TestSuiteNode('passing_suite', elapsed, [passingCase1, passingCase2]);
    var failingSuite = new TestSuiteNode_1.TestSuiteNode('failing_suite', elapsed, [passingCase1, failingCase]);
    var failingDocument = new DocumentNode_1.DocumentNode([failingSuite]);
    var passingDocument = new DocumentNode_1.DocumentNode([passingSuite]);
    var emptyDocument = new DocumentNode_1.DocumentNode([]);
    it('empty document should not have failures', function () {
        chai_1.assert.strictEqual(emptyDocument.countFailures(), 0);
        chai_1.assert.strictEqual(emptyDocument.hasFailures(), false);
    });
    it('passing document should not have failures', function () {
        chai_1.assert.strictEqual(passingDocument.countFailures(), 0);
        chai_1.assert.strictEqual(passingDocument.hasFailures(), false);
    });
    it('failing document should have failures', function () {
        chai_1.assert.strictEqual(failingDocument.countFailures(), 2);
        chai_1.assert.strictEqual(failingDocument.hasFailures(), true);
    });
    it('empty document added passing suite should not have failures', function () {
        var addedPassing = emptyDocument.addTestSuite(passingSuite);
        chai_1.assert.strictEqual(addedPassing.countFailures(), 0);
        chai_1.assert.strictEqual(addedPassing.hasFailures(), false);
    });
    it('empty document added failing suite should have failures', function () {
        var addedFailing = emptyDocument.addTestSuite(failingSuite);
        chai_1.assert.strictEqual(addedFailing.countFailures(), 2);
        chai_1.assert.strictEqual(addedFailing.hasFailures(), true);
    });
    it('passing document added passing suite should not have failures', function () {
        var addedPassing = passingDocument.addTestSuite(passingSuite);
        chai_1.assert.strictEqual(addedPassing.countFailures(), 0);
        chai_1.assert.strictEqual(addedPassing.hasFailures(), false);
    });
    it('passing document added failing suite should have failures', function () {
        var addedFailing = passingDocument.addTestSuite(failingSuite);
        chai_1.assert.strictEqual(addedFailing.countFailures(), 2);
        chai_1.assert.strictEqual(addedFailing.hasFailures(), true);
    });
    it('failing document added passing suite should have failures', function () {
        var addedPassing = failingDocument.addTestSuite(passingSuite);
        chai_1.assert.strictEqual(addedPassing.countFailures(), 2);
        chai_1.assert.strictEqual(addedPassing.hasFailures(), true);
    });
    it('failing document added failing suite should have failures', function () {
        var addedFailing = failingDocument.addTestSuite(failingSuite);
        chai_1.assert.strictEqual(addedFailing.countFailures(), 4);
        chai_1.assert.strictEqual(addedFailing.hasFailures(), true);
    });
});
//# sourceMappingURL=DocumentNode.spec.js.map