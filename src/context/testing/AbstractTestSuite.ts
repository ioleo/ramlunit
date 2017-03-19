import {TestSuiteNode} from '../xml/TestSuiteNode'

export abstract class AbstractTestSuite {

    abstract name: string
    protected inputPath: string
    protected verbose: boolean

    constructor(inputPath: string, verbose: boolean = false) {
        this.inputPath = inputPath
        this.verbose = verbose
    }

    abstract run(): TestSuiteNode
}