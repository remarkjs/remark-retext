/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module remark:retext
 * @fileoverview Test suite for `remark-retext`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var remark = require('remark');
var retext = require('retext');
var lint = require('remark-lint');
var html = require('remark-html');
var equality = require('retext-equality');
var remark2retext = require('./');

/*
 * Tests.
 */

test('remark2retext', function (t) {
    var invoked;

    remark()
        .use(lint)
        .use(remark2retext, retext().use(equality))
        .use(html)
        .process('## Hey guys\n', function (err, file, doc) {
            invoked = true;

            t.ifError(err);
            t.equal(doc, '<h2>Hey guys</h2>\n');
            t.deepEqual(file.messages.map(String), [
                '1:1-1:12: First heading level should be `1`',
                '1:8-1:12: `guys` may be insensitive, use ' +
                '`people`, `persons`, `folks` instead'
            ]);
        });

    t.equal(invoked, true);

    t.end();
});
