import cli  = require('commander')
import fs = require('fs-extra')
import path = require('path')
import {ParserTestSuite} from '../context/testing/parser/ParserTestSuite'
import {TestRunner} from '../context/testing/TestRunner'

export class Application {

    public static run() {

        // package.json path relative to compiled Application.js file
        const project = require('../../../package.json')

        cli
            .option('-o, --output <ramlunit-report.xml>', 'output path')
            .option('-d, --debug', 'enable very verbose mode')
            .usage('[options] <main.raml>')
            .version(project.version)
            .parse(process.argv)

        const inputPath = path.resolve(cli.args[0] || 'main.raml')
        const outputPath = path.resolve(cli.optionFor('output') || 'ramlunit-report.xml')
        const verbose = !!cli.debug

        console.log(`Running RamlUnit v${project.version} in ${verbose ? 'debug' : 'regular'} mode`)
        console.log(`Reading RAML from ${inputPath}...`)

        const testRunner = new TestRunner([
            new ParserTestSuite(inputPath),
        ], verbose)

        const xmlDocument = testRunner.run()
        const status = xmlDocument.hasFailures() ? 'Failed' : 'Passed'

        console.log(`Analysis result: ${status}.`)

        fs.ensureFileSync(outputPath)
        fs.writeFileSync(outputPath, xmlDocument.toString())

        console.log(`Report saved to ${outputPath}.`)

        process.exit(+xmlDocument.hasFailures())
    }
}
