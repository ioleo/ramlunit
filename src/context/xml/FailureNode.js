"use strict";
exports.__esModule = true;
var XmlFailureNode = (function () {
    function XmlFailureNode(message, type, context) {
        if (context === void 0) { context = ''; }
        this.attributes = { message: message, type: type };
        this.context = context;
    }
    XmlFailureNode.prototype.isFailed = function () {
        return true;
    };
    XmlFailureNode.prototype.toJson = function () {
        return { failure: [{ _attr: this.attributes }, this.context] };
    };
    return XmlFailureNode;
}());
exports.XmlFailureNode = XmlFailureNode;
