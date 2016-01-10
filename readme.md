# remark-retext [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[**retext**][retext] support for [**remark**][remark].

## Installation

[npm][npm-install]:

```bash
npm install remark-retext
```

**remark-retext** is also available for [duo][duo-install], and as an
AMD, CommonJS, and globals module, [uncompressed and compressed][releases].

## Usage

```js
var remark = require('remark');
var retext = require('retext');
var report = require('vfile-reporter');
var lint = require('remark-lint');
var html = require('remark-html');
var equality = require('retext-equality');
var remark2retext = require('remark-retext');

remark()
    .use(lint)
    .use(remark2retext, retext().use(equality))
    .use(html)
    .process('## Hey guys\n', function (err, file, doc) {
        if (err) {
            throw err;
        } else {
            process.stderr.write(report(file) + '\n');
            process.stdout.write(doc);
        }
    });
```

Yields:

```txt
<stdin>
   1:1-1:12  warning  First heading level should be `1`                                    first-heading-level
   1:8-1:12  warning  `guys` may be insensitive, use `people`, `persons`, `folks` instead

⚠ 2 warnings
<h2>Hey guys</h2>
```

## API

### `remark.use(remark2retext, retext)`

[**retext**][retext] support for [**remark**][remark].

**Parameters**:

*   `remark2retext` — This plug-in;
*   `retext` ([`Processor`][retext]).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[remark]: https://github.com/wooorm/remark

[retext]: https://github.com/wooorm/retext

[travis-badge]: https://img.shields.io/travis/wooorm/remark-retext.svg

[travis]: https://travis-ci.org/wooorm/remark-retext

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/remark.svg

[codecov]: https://codecov.io/github/wooorm/remark

[npm-install]: https://docs.npmjs.com/cli/install

[duo-install]: http://duojs.org/#getting-started

[releases]: https://github.com/wooorm/remark-retext/releases

[license]: LICENSE

[author]: http://wooorm.com
