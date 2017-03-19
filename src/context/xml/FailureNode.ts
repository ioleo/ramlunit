export type FailureNodeAttr = { message: string, type: string }
export class FailureNode  {

    private message: string
    private type: string
    private context: string

    constructor(message: string, type: string, context: string = '') {
        this.message = message
        this.type = type
        this.context = context
    }

    toJson(): Object {
        return { failure: [{ _attr: this.attr() }, this.context] }
    }

    private attr(): FailureNodeAttr {
        return {
            message: this.message,
            type: this.type
        }
    }
}
