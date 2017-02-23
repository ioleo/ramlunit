# ramlunit

Check RAML against specification and save test results in JUnit format.

### Note

This uses a customized [fork](https://github.com/loostro/ramllint) of `ramllint`. 
I've submitted a [PR](https://github.com/QuickenLoans/ramllint/pull/52) to the main project and will
update the dependency as soon as it gets merged.

### Usage

```
Usage: ramlunit [options] <api.raml>

Options:

    -h, --help             output usage information
    -c, --config <config>  config path: .ramlunit
    -o, --output <output>  output path: report.xml
    -V, --version          output the version number
```

### Options

##### `--config` or `-c`

Path to JSON file with configuration for RAML Lint. Defaults to `.ramlunit`.
If file is not found, the default configuration is used.

For example, if you'd like to change the rules for URL validation to 
permit `/sticky-wickets` and `/{stickyWicketId}`, you can do 
`ramllint -c .ramlunit` with `.ramlunit` file contents:

```
{
    'url_lower': '^\\/([a-z]+(-[a-z]+)*|{[a-z]+([A-Z][a-z]+)*})$'
}
```

See [ramllint](https://github.com/loostro/ramllint#rules) documentation.

##### `--output` or `-o`

Path to output file. Defaults to `report.xml`. The output is written to 
this file in "overwrite" mode.

### License

This tools is released under the [MIT LICENSE](LICENSE).