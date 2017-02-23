'use strict';

var mdast2nlcst = require('mdast-util-to-nlcst');

module.exports = remark2retext;

/* Attacher.
 * If a destination processor is given, runs the destination
 * with the new NLCST tree (bridge-mode).
 * If a parser is given, returns the NLCST tree: further
 * plug-ins run on that tree (mutate-mode). */
function remark2retext(destination) {
  var fn = destination && destination.run ? bridge : mutate;
  return fn(destination);
}

/* Mutate-mode.  Further transformers run on the NLCST tree. */
function mutate(parser) {
  return transformer;
  function transformer(node, file) {
    return mdast2nlcst(node, file, parser);
  }
}

/* Bridge-mode.  Runs the destination with the new NLCST
 * tree. */
function bridge(destination) {
  return transformer;
  function transformer(node, file, next) {
    var Parser = destination.freeze().Parser;
    var tree = mdast2nlcst(node, file, Parser);

    destination.run(tree, file, function (err) {
      next(err);
    });
  }
}
