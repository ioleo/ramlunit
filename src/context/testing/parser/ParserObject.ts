import * as raml from 'raml-1-parser'
import {ErrorGroups, RamlApi} from "./ParserTypes"
import {FailureNode} from "../../xml/FailureNode"
import {Time} from '../../time/Time'
import {TestCaseNode} from '../../xml/TestCaseNode'
import {RamlParserError} from 'raml-1-parser/dist/raml1/highLevelAST'

export class ParserObject {

    static parse(inputPath: string): [RamlApi, Time] {
        const stopwatch = new Time()
        const api       = raml.loadApiSync(inputPath)
        const elapsed   = new Time(stopwatch)

        return [api, elapsed]
    }

    static createTestCase(name: string, errorGroups: ErrorGroups): TestCaseNode {
        const errors: RamlParserError[] = (name in errorGroups) ? errorGroups[name] : []

        return new TestCaseNode(name, errors.map(ParserObject.createFailure))
    }

    static createFailure(error: RamlParserError): FailureNode {
        const at = error.range.start
        const context = `
File: ${error.path}
Line: ${at.line}
Column: ${at.column}
\t\t\t\t`

        return new FailureNode(error.message, error.code, context)
    }
}