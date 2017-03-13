import * as xml from 'xml'
import {TestSuiteNode} from './TestSuiteNode'

export class DocumentNode {

    private testsuites: TestSuiteNode[]

    constructor(testsuites: TestSuiteNode[] = []) {
        this.testsuites = testsuites
    }

    addTestSuite(testsuite: TestSuiteNode): DocumentNode {
        return new DocumentNode(this.testsuites.concat(testsuite))
    }

    countFailures(): number {
        return this.testsuites.reduce((failures: number, testsuite: TestSuiteNode) => {
            return failures + testsuite.countFailures()
        }, 0)
    }

    hasFailures(): boolean {
        return this.countFailures() > 0
    }

    toString(): string {
        const testsuites: Array<any> = this.testsuites.map(ts => ts.toJson())

        return xml({ testsuites: testsuites }, {
            declaration: true,
            indent: '\t'
        }).toString()
    }
}
