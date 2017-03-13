import { ErrorGroups, RamlApi } from "./ParserTypes";
import { FailureNode } from "../../xml/FailureNode";
import { Time } from '../../time/Time';
import { TestCaseNode } from '../../xml/TestCaseNode';
import { RamlParserError } from 'raml-1-parser/dist/raml1/highLevelAST';
export declare class ParserObject {
    static parse(inputPath: string): [RamlApi, Time];
    static createTestCase(name: string, errorGroups: ErrorGroups): TestCaseNode;
    static createFailure(error: RamlParserError): FailureNode;
}
