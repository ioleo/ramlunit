import * as raml from 'raml-1-parser'
import {RamlParserError} from 'raml-1-parser/dist/raml1/highLevelAST'

export type RamlApi = raml.api10.Api | raml.api08.Api
export type ErrorGroups = _.Dictionary<RamlParserError[]>
