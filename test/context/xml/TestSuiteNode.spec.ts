import {assert} from 'chai'
import {Time} from '../../../src/context/time/Time'
import {FailureNode} from '../../../src/context/xml/FailureNode'
import {TestCaseNode} from '../../../src/context/xml/TestCaseNode'
import {TestSuiteNode} from '../../../src/context/xml/TestSuiteNode'

describe('TestSuiteNode', () => {

    const stopwatch = new Time()
    const elapsed = new Time(stopwatch)

    const failure1 = new FailureNode('aaa1', 'bbb1', 'ccc1')
    const failure2 = new FailureNode('aaa2', 'bbb2', 'ccc2')
    const failingCase = new TestCaseNode('failing_case', [failure1, failure2])

    const passingCase1 = new TestCaseNode('passing_case_1', [])
    const passingCase2 = new TestCaseNode('passing_case_2', [])

    const passingSuite = new TestSuiteNode('passing_suite', elapsed, [passingCase1, passingCase2])
    const failingSuite = new TestSuiteNode('failing_suite', elapsed, [passingCase1, failingCase])
    const emptySuite = new TestSuiteNode('empty_suite', elapsed, [])

    it('empty suite should not have failures', () => {
        assert.strictEqual(emptySuite.countFailures(), 0)
        assert.strictEqual(emptySuite.hasFailures(), false)
    })

    it('passing suite should not have failures', () => {
        assert.strictEqual(passingSuite.countFailures(), 0)
        assert.strictEqual(passingSuite.hasFailures(), false)
    })

    it('failing suite should have failures', () => {
        assert.strictEqual(failingSuite.countFailures(), 2)
        assert.strictEqual(failingSuite.hasFailures(), true)
    })

    it('empty suite should be convertable to json', () => {
        assert.deepEqual(emptySuite.toJson(), {
            testsuite: [
                { _attr: { name: 'empty_suite', time: elapsed.toString(), failures: 0 }},
                { testcases: [] },
            ],
        })
    })

    it('passing suite should be convertable to json', () => {
        assert.deepEqual(passingSuite.toJson(), {
            testsuite: [
                { _attr: { name: 'passing_suite', time: elapsed.toString(), failures: 0 }},
                { testcases: [
                    passingCase1.toJson(),
                    passingCase2.toJson(),
                ]},
            ],
        })
    })

    it('failing suite should be convertable to json', () => {
        assert.deepEqual(failingSuite.toJson(), {
            testsuite: [
                { _attr: { name: 'failing_suite', time: elapsed.toString(), failures: 2 }},
                { testcases: [
                    passingCase1.toJson(),
                    failingCase.toJson(),
                ]},
            ],
        })
    })
})
