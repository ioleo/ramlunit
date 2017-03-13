import {assert} from 'chai'
import {Time} from '../../../src/context/time/Time'
import {DocumentNode} from '../../../src/context/xml/DocumentNode'
import {FailureNode} from '../../../src/context/xml/FailureNode'
import {TestCaseNode} from '../../../src/context/xml/TestCaseNode'
import {TestSuiteNode} from '../../../src/context/xml/TestSuiteNode'

describe('DocumentNode', () => {

    const stopwatch = new Time()
    const elapsed = new Time(stopwatch)

    const failure1 = new FailureNode('aaa1', 'bbb1', 'ccc1')
    const failure2 = new FailureNode('aaa2', 'bbb2', 'ccc2')
    const failingCase = new TestCaseNode('failing_case', [failure1, failure2])

    const passingCase1 = new TestCaseNode('passing_case_1', [])
    const passingCase2 = new TestCaseNode('passing_case_2', [])

    const passingSuite = new TestSuiteNode('passing_suite', elapsed, [passingCase1, passingCase2])
    const failingSuite = new TestSuiteNode('failing_suite', elapsed, [passingCase1, failingCase])

    const failingDocument = new DocumentNode([failingSuite])
    const passingDocument = new DocumentNode([passingSuite])
    const emptyDocument = new DocumentNode([])

    it('empty document should not have failures', () => {
        assert.strictEqual(emptyDocument.countFailures(), 0)
        assert.strictEqual(emptyDocument.hasFailures(), false)
    })

    it('passing document should not have failures', () => {
        assert.strictEqual(passingDocument.countFailures(), 0)
        assert.strictEqual(passingDocument.hasFailures(), false)
    })

    it('failing document should have failures', () => {
        assert.strictEqual(failingDocument.countFailures(), 2)
        assert.strictEqual(failingDocument.hasFailures(), true)
    })

    it('empty document added passing suite should not have failures', () => {
        const addedPassing = emptyDocument.addTestSuite(passingSuite)
        assert.strictEqual(addedPassing.countFailures(), 0)
        assert.strictEqual(addedPassing.hasFailures(), false)
    })

    it('empty document added failing suite should have failures', () => {
        const addedFailing = emptyDocument.addTestSuite(failingSuite)
        assert.strictEqual(addedFailing.countFailures(), 2)
        assert.strictEqual(addedFailing.hasFailures(), true)
    })

    it('passing document added passing suite should not have failures', () => {
        const addedPassing = passingDocument.addTestSuite(passingSuite)
        assert.strictEqual(addedPassing.countFailures(), 0)
        assert.strictEqual(addedPassing.hasFailures(), false)
    })

    it('passing document added failing suite should have failures', () => {
        const addedFailing = passingDocument.addTestSuite(failingSuite)
        assert.strictEqual(addedFailing.countFailures(), 2)
        assert.strictEqual(addedFailing.hasFailures(), true)
    })

    it('failing document added passing suite should have failures', () => {
        const addedPassing = failingDocument.addTestSuite(passingSuite)
        assert.strictEqual(addedPassing.countFailures(), 2)
        assert.strictEqual(addedPassing.hasFailures(), true)
    })

    it('failing document added failing suite should have failures', () => {
        const addedFailing = failingDocument.addTestSuite(failingSuite)
        assert.strictEqual(addedFailing.countFailures(), 4)
        assert.strictEqual(addedFailing.hasFailures(), true)
    })

})
