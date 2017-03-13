import { AbstractTestSuite } from '../AbstractTestSuite';
import { TestSuiteNode } from '../../xml/TestSuiteNode';
export declare class ParserTestSuite extends AbstractTestSuite {
    name: string;
    run(): TestSuiteNode;
}
