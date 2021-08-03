import {toNlcst} from 'mdast-util-to-nlcst'

// Attacher.
// If a destination processor is given, runs the destination with the new nlcst
// tree (bridge mode).
// If a parser is given, returns the nlcst tree: further plugins run on that
// tree (mutate mode).
export default function remarkRetext(destination, options) {
  var fn = destination && destination.run ? bridge : mutate
  return fn(destination, options)
}

// Mutate mode.
// Further transformers run on the nlcst tree.
function mutate(parser, options) {
  return transformer
  function transformer(node, file) {
    return toNlcst(node, file, parser, options)
  }
}

// Bridge mode.
// Runs the destination with the new nlcst tree.
function bridge(destination, options) {
  return transformer
  function transformer(node, file, next) {
    var Parser = destination.freeze().Parser
    var tree = toNlcst(node, file, Parser, options)
    destination.run(tree, file, done)
    function done(error) {
      next(error)
    }
  }
}
