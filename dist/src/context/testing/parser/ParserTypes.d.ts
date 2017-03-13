/// <reference types="lodash" />
import * as raml from 'raml-1-parser';
import { RamlParserError } from 'raml-1-parser/dist/raml1/highLevelAST';
export declare type RamlApi = raml.api10.Api | raml.api08.Api;
export declare type ErrorGroups = _.Dictionary<RamlParserError[]>;
