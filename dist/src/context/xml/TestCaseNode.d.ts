import { FailureNode } from './FailureNode';
export declare type TestCaseNodeAttr = {
    name: string;
    failures: number;
};
export declare class TestCaseNode {
    private name;
    private failures;
    constructor(name: string, failures: FailureNode[]);
    countFailures(): number;
    hasFailures(): boolean;
    toJson(): Object;
    private attr();
}
