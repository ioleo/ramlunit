#!/usr/bin/env node

var path = require('path'),
    cli = require('commander'),
    jsonfile = require('jsonfile'),
    Linter = require('ramllint'),
    XMLWriter = require('xml-writer'),
    SimpleFileWriter = require('simple-file-writer'),
    project = require('../package.json');

cli
    .option('-c, --config <config>', 'config path: .ramlunit')
    .option('-o, --output <output>', 'output path: report.xml')
    .usage('[options] <api.raml>')
    .version(project.version)
    .parse(process.argv);

cli.input = path.resolve(cli.args[0] || 'main.raml');
cli.config = path.resolve(cli.config || '.ramlunit');
cli.output = path.resolve(cli.output || 'report.xml');

function linterOptions() {
    console.log('Config read from ' + cli.config);
    try { return jsonfile.readFileSync(cli.config); }
    catch (ex) { return {}; }
}

var fileWriter = new SimpleFileWriter(cli.output, { flags: 'w' }),
    ramlLinter = new Linter(linterOptions()),
    xmlBuilder = new XMLWriter(true);

ramlLinter.lint(cli.input, function outputFn() {
    'use strict';

    var success = ramlLinter.results('success');
    var errors = ramlLinter.results('error');
    var tests = success + errors;
    var exitcode = (!errors.length) ? 0 : 1;

    console.log('Running ' + tests.length + ' tests...');
    console.log('Found ' + errors.length + ' failures');
    xmlBuilder.startDocument('1.0', 'UTF-8');
    xmlBuilder.startElement('testsuite');
    xmlBuilder.writeAttribute('tests', tests.length);
    xmlBuilder.writeAttribute('failures', errors.length);

    errors.forEach(function entryFormat(entry) {
        xmlBuilder.startElement('failure');
        xmlBuilder.writeAttribute('type', entry.rule);
        xmlBuilder.writeAttribute('message', entry.message);
        xmlBuilder.endElement();
        console.log('At: ' + entry.rule);
        console.log('    ' + entry.message);
    });

    xmlBuilder.endElement();
    xmlBuilder.endDocument();
    fileWriter.write(xmlBuilder.toString());
    console.log('Report saved to ' + cli.output);
    process.exit(exitcode);
});
