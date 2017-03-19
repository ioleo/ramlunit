"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DocumentNode_1 = require("../xml/DocumentNode");
var TestRunner = (function () {
    function TestRunner(suites, verbose) {
        if (suites === void 0) { suites = []; }
        if (verbose === void 0) { verbose = false; }
        this.suites = suites;
        this.verbose = verbose;
    }
    TestRunner.prototype.run = function () {
        var _this = this;
        var runTestSuite = function (document, suite) {
            if (_this.verbose)
                console.log("Running suite " + suite.name + "...");
            return document.addTestSuite(suite.run());
        };
        return this.suites.reduce(runTestSuite, new DocumentNode_1.DocumentNode());
    };
    return TestRunner;
}());
exports.TestRunner = TestRunner;
//# sourceMappingURL=TestRunner.js.map