import {FailureNode} from './FailureNode'

export type TestCaseNodeAttr = { name: string, failures: number }
export class TestCaseNode {

    private name: string
    private failures: FailureNode[]

    constructor(name: string, failures: FailureNode[]) {
        this.name = name
        this.failures = failures
    }

    countFailures(): number {
        return this.failures.length
    }

    hasFailures(): boolean {
        return this.countFailures() > 0
    }

    toJson(): Object {
        const failures: Array<any> = this.failures.map(f => f.toJson())

        return { testcase: [{ _attr: this.attr() }].concat(failures) }
    }

    private attr(): TestCaseNodeAttr {
        return {
            name: this.name,
            failures: this.countFailures()
        }
    }
}
