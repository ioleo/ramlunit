"use strict";
exports.__esModule = true;
var XmlTestSuiteNode = (function () {
    function XmlTestSuiteNode(attributes, testcases) {
        if (attributes === void 0) { attributes = {}; }
        if (testcases === void 0) { testcases = []; }
        this.attributes = attributes;
        this.testcases = testcases;
    }
    XmlTestSuiteNode.prototype.addTestCase = function (testcase) {
        return new XmlTestSuiteNode(this.attributes, this.testcases.concat(testcase));
    };
    XmlTestSuiteNode.prototype.isFailed = function () {
        return this.testcases.reduce(function (flag, testcase) { return flag || testcase.isFailed(); }, false);
    };
    XmlTestSuiteNode.prototype.toJson = function () {
        var testcases = this.testcases.map(function (tc) { return tc.toJson(); });
        return { testsuite: [{ _attr: this.attributes }, { testcases: testcases }] };
    };
    return XmlTestSuiteNode;
}());
exports.XmlTestSuiteNode = XmlTestSuiteNode;
