import { TestSuiteNode } from '../xml/TestSuiteNode';
export declare abstract class AbstractTestSuite {
    abstract name: string;
    protected inputPath: string;
    protected verbose: boolean;
    constructor(inputPath: string, verbose?: boolean);
    abstract run(): TestSuiteNode;
}
