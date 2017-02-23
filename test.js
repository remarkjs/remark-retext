'use strict';

var test = require('tape');
var unified = require('unified');
var parse = require('remark-parse');
var english = require('retext-english');
var markdown = require('remark-stringify');
var naturalLanguage = require('retext-stringify');
var remark2retext = require('./index.js');

test('remark2retext()', function (t) {
  t.equal(
    unified()
      .use(parse)
      .use(remark2retext, english.Parser)
      .use(naturalLanguage)
      .processSync('## Hello, world! ##')
      .toString(),
    'Hello, world!',
    'should mutate'
  );

  t.equal(
    unified()
      .use(parse)
      .use(remark2retext, unified().use(english))
      .use(markdown)
      .processSync('## Hello, world! ##')
      .toString(),
    '## Hello, world!\n',
    'should bridge'
  );

  t.end();
});
