# remark-retext [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Bridge / mutate from [**remark**][remark] to [**retext**][retext].

## Installation

[npm][]:

```bash
npm install remark-retext
```

## Usage

```javascript
var unified = require('unified');
var parse = require('remark-parse');
var lint = require('remark-lint');
var remark2retext = require('remark-retext');
var english = require('retext-english');
var equality = require('retext-equality');
var stringify = require('remark-stringify');
var report = require('vfile-reporter');

unified()
    .use(parse)
    .use(lint)
    .use(remark2retext, unified().use(english).use(equality))
    .use(stringify)
    .process('## Hello guys!', function (err, file) {
        file.filename = 'example';
        file.extension = 'md';
        process.stderr.write(report(file) + '\n');
    });
```

**stderr**(4) yields:

```txt
example.md
          1  warning  Missing newline character at end of file                             final-newline
     1-1:15  warning  First heading level should be `1`                                    first-heading-level
     1-1:15  warning  Don’t add a trailing `!` to headings                                 no-heading-punctuation
    10-1:14  warning  `guys` may be insensitive, use `people`, `persons`, `folks` instead  gals-men

⚠ 4 warnings
```

## API

### `origin.use(remark2retext, destination)`

Either bridge or mutate from [**remark**][remark] ([MDAST][]) to
[**retext**][retext] ([NLCST][]).

###### `destination`

`destination` is either a parser or a processor.

If a [`Unified`][processor] processor is given, runs the destination
processor with the new NLCST tree, then, after running discards that
tree and continues on running the origin processor with the original
tree ([bridge-mode][bridge]).

If a parser (such as [**parse-latin**][latin], [**parse-english**][english],
or [**parse-dutch**][dutch]) is given, passes the tree to further
plug-ins (mutate-mode).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/remark-retext.svg

[travis]: https://travis-ci.org/wooorm/remark-retext

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-retext.svg

[codecov]: https://codecov.io/github/wooorm/remark-retext

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[mdast]: https://github.com/wooorm/mdast

[remark]: https://github.com/wooorm/remark

[retext]: https://github.com/wooorm/retext

[processor]: https://github.com/wooorm/unified#processor

[bridge]: https://github.com/wooorm/unified#bridge

[nlcst]: https://github.com/wooorm/nlcst

[latin]: https://github.com/wooorm/parse-latin

[english]: https://github.com/wooorm/parse-english

[dutch]: https://github.com/wooorm/parse-dutch
