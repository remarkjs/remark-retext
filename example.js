/* eslint-env node */
var unified = require('unified');
var parse = require('remark-parse');
var lint = require('remark-lint');
var remark2retext = require('./');
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
