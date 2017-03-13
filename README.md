# ramlunit

Check RAML against specification and save test results in JUnit format.

### Note

This uses a customized [fork](https://github.com/loostro/ramllint) of `ramllint`. 
I've submitted a [PR](https://github.com/QuickenLoans/ramllint/pull/52) to the main project and will
update the dependency as soon as it gets merged.

### Usage

```
Usage: ramlunit [options] <main.raml>

Options:

    -h, --help             output usage information
    -o, --output <output>  output path: ramlunit-report.xml
    -V, --version          output the version number
```

### Arguments

##### 1: `<main.raml>`

Path to input file. Defaults to `main.raml`.

### Options

##### `--output` or `-o`

Path to output file. Defaults to `ramlunit-report.xml`. The output file will be overwritten.

### License

This tools is released under the [MIT LICENSE](LICENSE).