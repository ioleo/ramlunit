export declare type FailureNodeAttr = {
    message: string;
    type: string;
};
export declare class FailureNode {
    private message;
    private type;
    private context;
    constructor(message: string, type: string, context?: string);
    toJson(): Object;
    private attr();
}
