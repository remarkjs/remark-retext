/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module remark:retext
 * @fileoverview retext support for remark.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var bridge = require('unified-bridge');
var mdast2nlcst = require('mdast-util-to-nlcst');

/**
 * retext support for remark.
 *
 * @param {Remark} remark - Origin processor.
 * @param {Retext} retext - Destination processor.
 * @param {VFile} file - Virtual file.
 */
function enter(remark, retext, file) {
    return mdast2nlcst(file, retext.Parser);
}

/*
 * Expose.
 */

module.exports = bridge({
    'name': 'retext',
    'enter': enter
});
