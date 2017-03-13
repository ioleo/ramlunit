import {AbstractTestSuite} from './AbstractTestSuite'
import {DocumentNode} from '../xml/DocumentNode'

export class TestRunner {

    suites: AbstractTestSuite[]

    verbose: boolean

    constructor(suites: AbstractTestSuite[] = [], verbose: boolean = false) {
        this.suites = suites
        this.verbose = verbose
    }

    run(): DocumentNode {
        const runTestSuite = (document: DocumentNode, suite: AbstractTestSuite) => {
            if (this.verbose) console.log(`Running suite ${suite.name}...`)

            return document.addTestSuite(suite.run())
        }

        return this.suites.reduce(runTestSuite, new DocumentNode())
    }

}