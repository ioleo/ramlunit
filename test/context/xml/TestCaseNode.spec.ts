import {assert} from 'chai'
import {FailureNode} from '../../../src/context/xml/FailureNode'
import {TestCaseNode} from '../../../src/context/xml/TestCaseNode'

describe('TestCaseNode', () => {

    const failure1 = new FailureNode('failure_1', 'foo', 'bar')
    const failure2 = new FailureNode('failute_2', 'foo', 'bar')
    const failingCase = new TestCaseNode('failing_case', [failure1, failure2])
    const passingCase = new TestCaseNode('passing_case', [])

    it('passing case should not have failures', () => {
        assert.strictEqual(passingCase.countFailures(), 0)
        assert.strictEqual(passingCase.hasFailures(), false)
    })

    it('failing case should have failures', () => {
        assert.strictEqual(failingCase.countFailures(), 2)
        assert.strictEqual(failingCase.hasFailures(), true)
    })

    it('passing case should be convertable to json', () => {
        assert.deepEqual(passingCase.toJson(), {
            testcase: [
                { _attr: { name: 'passing_case', failures: 0 }},
            ],
        })
    })

    it('failing case should be convertable to json', () => {
        assert.deepEqual(failingCase.toJson(), {
            testcase: [
                { _attr: { name: 'failing_case', failures: 2 }},
                failure1.toJson(),
                failure2.toJson(),
            ],
        })
    })
})
