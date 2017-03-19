import {assert} from 'chai'
import {FailureNode} from '../../../src/context/xml/FailureNode'

describe('FailureNode', () => {

    const node = new FailureNode('foo', 'bar', 'baz')

    it('failure should be convertable to json', () => {
        assert.deepEqual(node.toJson(), {
            failure: [
                { _attr: { message: 'foo', type: 'bar' }},
                'baz',
            ],
        })
    })
})
