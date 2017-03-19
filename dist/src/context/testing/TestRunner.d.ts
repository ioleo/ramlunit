import { AbstractTestSuite } from './AbstractTestSuite';
import { DocumentNode } from '../xml/DocumentNode';
export declare class TestRunner {
    suites: AbstractTestSuite[];
    verbose: boolean;
    constructor(suites?: AbstractTestSuite[], verbose?: boolean);
    run(): DocumentNode;
}
