"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var AbstractTestSuite_1 = require("../AbstractTestSuite");
var TestSuiteNode_1 = require("../../xml/TestSuiteNode");
var ParserObject_1 = require("./ParserObject");
var ParserTestSuite = (function (_super) {
    __extends(ParserTestSuite, _super);
    function ParserTestSuite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'raml-1-parser';
        return _this;
    }
    ParserTestSuite.prototype.run = function () {
        var tests = Object.keys(require('raml-1-parser/resources/errorMessages'));
        var _a = ParserObject_1.ParserObject.parse(this.inputPath), api = _a[0], time = _a[1];
        var errorGroups = _.groupBy(api.errors(), function (e) { return e.code; });
        var testcases = tests.reduce(function (cases, name) {
            return cases.concat(ParserObject_1.ParserObject.createTestCase(name, errorGroups));
        }, []);
        return new TestSuiteNode_1.TestSuiteNode(this.name, time, testcases);
    };
    return ParserTestSuite;
}(AbstractTestSuite_1.AbstractTestSuite));
exports.ParserTestSuite = ParserTestSuite;
//# sourceMappingURL=ParserTestSuite.js.map