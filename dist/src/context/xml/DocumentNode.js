"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xml = require("xml");
var DocumentNode = (function () {
    function DocumentNode(testsuites) {
        if (testsuites === void 0) { testsuites = []; }
        this.testsuites = testsuites;
    }
    DocumentNode.prototype.addTestSuite = function (testsuite) {
        return new DocumentNode(this.testsuites.concat(testsuite));
    };
    DocumentNode.prototype.countFailures = function () {
        return this.testsuites.reduce(function (failures, testsuite) {
            return failures + testsuite.countFailures();
        }, 0);
    };
    DocumentNode.prototype.hasFailures = function () {
        return this.countFailures() > 0;
    };
    DocumentNode.prototype.toString = function () {
        var testsuites = this.testsuites.map(function (ts) { return ts.toJson(); });
        return xml({ testsuites: testsuites }, {
            declaration: true,
            indent: '\t'
        }).toString();
    };
    return DocumentNode;
}());
exports.DocumentNode = DocumentNode;
//# sourceMappingURL=DocumentNode.js.map