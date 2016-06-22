/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:retext
 * @fileoverview Bridge / mutate from remark to retext.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies */
var mdast2nlcst = require('mdast-util-to-nlcst');

/**
 * Mutate-mode.  Further transformers run on the NLCST tree.
 *
 * @param {Function} parser - NLCST Parser.
 * @return {NLCSTNode} - Tree.
 */
function mutate(parser) {
    /**
     * Transformer.
     *
     * @param {MDASTNode} node - Tree.
     * @param {VFile} file - Virtual file.
     * @return {NLCSTNode} - Tree.
     */
    return function (node, file) {
        return mdast2nlcst(node, file, parser);
    }
}

/**
 * Bridge-mode.  Runs the destination with the new NLCST
 * tree.
 *
 * @param {Unified} destination - Destination processor.
 * @return {Function} - Transformer.
 */
function bridge(destination) {
    return function (node, file, next) {
        var tree = mdast2nlcst(node, file, destination.Parser);

        destination.run(tree, file, function (err) {
            next(err);
        });
    };
}

/**
 * Attacher.
 * If a destination processor is given, runs the destination
 * with the new NLCST tree (bridge-mode).
 * If a parser is given, returns the NLCST tree: further
 * plug-ins run on that tree (mutate-mode).
 *
 * @param {Unified} origin - Origin processor.
 * @param {Unified|Function} destination - Destination,
 *   processor or NLCST parser constructor.
 * @return {Function} - Transformer.
 */
function attacher(origin, destination) {
    var fn = destination && destination.run ? bridge : mutate;

    return fn(destination);
}

/* Expose. */
module.exports = attacher;
