import { TestSuiteNode } from './TestSuiteNode';
export declare class DocumentNode {
    private testsuites;
    constructor(testsuites?: TestSuiteNode[]);
    addTestSuite(testsuite: TestSuiteNode): DocumentNode;
    countFailures(): number;
    hasFailures(): boolean;
    toString(): string;
}
