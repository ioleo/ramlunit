"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var FailureNode_1 = require("../../../src/context/xml/FailureNode");
describe('FailureNode', function () {
    var node = new FailureNode_1.FailureNode('foo', 'bar', 'baz');
    it('failure should be convertable to json', function () {
        chai_1.assert.deepEqual(node.toJson(), {
            failure: [
                { _attr: { message: 'foo', type: 'bar' } },
                'baz',
            ],
        });
    });
});
//# sourceMappingURL=FailureNode.spec.js.map