import * as _ from 'lodash'
import {AbstractTestSuite} from '../AbstractTestSuite'
import {TestCaseNode} from '../../xml/TestCaseNode'
import {TestSuiteNode} from '../../xml/TestSuiteNode'
import {RamlParserError} from "raml-1-parser/dist/raml1/highLevelAST"
import {ParserObject} from "./ParserObject"

export class ParserTestSuite extends AbstractTestSuite {

    name: string = 'raml-1-parser'

    run(): TestSuiteNode {
        const tests: string[] = Object.keys(require('raml-1-parser/resources/errorMessages'))
        const [api, time] = ParserObject.parse(this.inputPath)

        const errorGroups = _.groupBy(api.errors(), (e: RamlParserError) => { return e.code })
        const testcases: TestCaseNode[] = tests.reduce((cases: TestCaseNode[], name: string) => {
            return cases.concat(ParserObject.createTestCase(name, errorGroups))
        }, [])

        return new TestSuiteNode(this.name, time, testcases)
    }
}
