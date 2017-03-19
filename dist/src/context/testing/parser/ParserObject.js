"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var raml = require("raml-1-parser");
var FailureNode_1 = require("../../xml/FailureNode");
var Time_1 = require("../../time/Time");
var TestCaseNode_1 = require("../../xml/TestCaseNode");
var ParserObject = (function () {
    function ParserObject() {
    }
    ParserObject.parse = function (inputPath) {
        var stopwatch = new Time_1.Time();
        var api = raml.loadApiSync(inputPath);
        var elapsed = new Time_1.Time(stopwatch);
        return [api, elapsed];
    };
    ParserObject.createTestCase = function (name, errorGroups) {
        var errors = (name in errorGroups) ? errorGroups[name] : [];
        return new TestCaseNode_1.TestCaseNode(name, errors.map(ParserObject.createFailure));
    };
    ParserObject.createFailure = function (error) {
        var at = error.range.start;
        var context = "\nFile: " + error.path + "\nLine: " + at.line + "\nColumn: " + at.column + "\n\t\t\t\t";
        return new FailureNode_1.FailureNode(error.message, error.code, context);
    };
    return ParserObject;
}());
exports.ParserObject = ParserObject;
//# sourceMappingURL=ParserObject.js.map