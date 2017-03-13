import {TestCaseNode} from './TestCaseNode'
import {Time} from "../time/Time";

export type TestSuiteNodeAttr = { name: string, time: string, failures: number }
export class TestSuiteNode {

    private name: string
    private time: Time
    private testcases: TestCaseNode[]

    constructor(name: string, time: Time, testcases: TestCaseNode[] = []) {
        this.name = name
        this.time = time
        this.testcases = testcases
    }

    addTestCase(testcase: TestCaseNode): TestSuiteNode {
        return new TestSuiteNode(this.name, this.time, this.testcases.concat(testcase))
    }

    countFailures(): number {
        return this.testcases.reduce((failures: number, testcase: TestCaseNode) => {
            return failures + testcase.countFailures()
        }, 0)
    }

    hasFailures(): boolean {
        return this.countFailures() > 0
    }

    toJson(): Object {
        const testcases: Array<any> = this.testcases.map(tc => tc.toJson())

        return { testsuite: [{ _attr: this.attr() }, { testcases: testcases }] }
    }

    private attr(): TestSuiteNodeAttr {
        return {
            name: this.name,
            time: this.time.toString(),
            failures: this.countFailures()
        }
    }
}
