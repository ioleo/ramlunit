"use strict";
exports.__esModule = true;
var XmlTestCaseNode = (function () {
    function XmlTestCaseNode(attributes, failures) {
        if (attributes === void 0) { attributes = {}; }
        if (failures === void 0) { failures = []; }
        this.attributes = attributes;
        this.failures = failures;
    }
    XmlTestCaseNode.prototype.isFailed = function () {
        return !!this.failures.length;
    };
    XmlTestCaseNode.prototype.toJson = function () {
        var failures = this.failures.map(function (f) { return f.toJson(); });
        return { testcase: [{ _attr: this.attributes }].concat(failures) };
    };
    return XmlTestCaseNode;
}());
exports.XmlTestCaseNode = XmlTestCaseNode;
