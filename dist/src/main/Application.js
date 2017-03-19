"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli = require("commander");
var fs = require("fs-extra");
var path = require("path");
var ParserTestSuite_1 = require("../context/testing/parser/ParserTestSuite");
var TestRunner_1 = require("../context/testing/TestRunner");
var Application = (function () {
    function Application() {
    }
    Application.run = function () {
        var project = require('../../../package.json');
        cli
            .option('-o, --output <ramlunit-report.xml>', 'output path')
            .option('-d, --debug', 'enable very verbose mode')
            .usage('[options] <main.raml>')
            .version(project.version)
            .parse(process.argv);
        var inputPath = path.resolve(cli.args[0] || 'main.raml');
        var outputPath = path.resolve(cli.optionFor('output') || 'ramlunit-report.xml');
        var verbose = !!cli.debug;
        console.log("Running RamlUnit v" + project.version + " in " + (verbose ? 'debug' : 'regular') + " mode");
        console.log("Reading RAML from " + inputPath + "...");
        var testRunner = new TestRunner_1.TestRunner([
            new ParserTestSuite_1.ParserTestSuite(inputPath),
        ], verbose);
        var xmlDocument = testRunner.run();
        var status = xmlDocument.hasFailures() ? 'Failed' : 'Passed';
        console.log("Analysis result: " + status + ".");
        fs.ensureFileSync(outputPath);
        fs.writeFileSync(outputPath, xmlDocument.toString());
        console.log("Report saved to " + outputPath + ".");
        process.exit(+xmlDocument.hasFailures());
    };
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=Application.js.map