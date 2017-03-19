import { TestCaseNode } from './TestCaseNode';
import { Time } from "../time/Time";
export declare type TestSuiteNodeAttr = {
    name: string;
    time: string;
    failures: number;
};
export declare class TestSuiteNode {
    private name;
    private time;
    private testcases;
    constructor(name: string, time: Time, testcases?: TestCaseNode[]);
    addTestCase(testcase: TestCaseNode): TestSuiteNode;
    countFailures(): number;
    hasFailures(): boolean;
    toJson(): Object;
    private attr();
}
