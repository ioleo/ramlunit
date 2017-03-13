"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FailureNode = (function () {
    function FailureNode(message, type, context) {
        if (context === void 0) { context = ''; }
        this.message = message;
        this.type = type;
        this.context = context;
    }
    FailureNode.prototype.toJson = function () {
        return { failure: [{ _attr: this.attr() }, this.context] };
    };
    FailureNode.prototype.attr = function () {
        return {
            message: this.message,
            type: this.type
        };
    };
    return FailureNode;
}());
exports.FailureNode = FailureNode;
//# sourceMappingURL=FailureNode.js.map