/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('mdast-util-to-nlcst').ParserInstance} ParserInstance
 * @typedef {import('mdast-util-to-nlcst').ParserConstructor} ParserConstructor
 * @typedef {import('mdast-util-to-nlcst').Options} Options
 * @typedef {import('unified').Processor<any, any, any, any>} Processor
 * @typedef {import('unified').Parser<any>} Parser
 */

import {toNlcst} from 'mdast-util-to-nlcst'

/**
 * Plugin to bridge or mutate to retext.
 *
 * If a destination processor is given, runs the destination with the new nlcst
 * tree (bridge-mode).
 * If a parser is given, returns the nlcst tree: further plugins run on that
 * tree (mutate-mode).
 *
 * @param destination
 *   Either a processor (`unified().use(retextEnglish)…`) or a parser.
 * @param options
 *   Configuration passed to `mdast-util-to-nlcst`.
 */
const remarkRetext =
  /**
   * @type {(import('unified').Plugin<[Processor, Options?]|[Processor], MdastRoot, MdastRoot> & import('unified').Plugin<[Parser, Options?]|[Parser], MdastRoot, Node>)}
   */
  (
    /**
     * @param {Processor|Parser} destination
     * @param {Options|undefined} options
     */
    function (destination, options) {
      return destination && 'run' in destination
        ? bridge(destination, options)
        : mutate(destination, options)
    }
  )

export default remarkRetext

/**
 * Mutate-mode.
 * Further transformers run on the nlcst tree.
 *
 * @type {import('unified').Plugin<[Parser, Options?], MdastRoot, Node>}
 */
function mutate(parser, options) {
  // Assume the parser is a retext parser.
  const Parser = /** @type {ParserInstance|ParserConstructor} */ (parser)
  return (node, file) => {
    return toNlcst(node, file, Parser, options)
  }
}

/**
 * Bridge-mode.
 * Runs the destination with the new nlcst tree.
 *
 * @type {import('unified').Plugin<[Processor, Options?], MdastRoot>}
 */
function bridge(destination, options) {
  return (node, file, next) => {
    // Assume the parser is a retext parser.
    const Parser = /** @type {ParserConstructor|ParserInstance} */ (
      destination.freeze().Parser
    )

    destination.run(toNlcst(node, file, Parser, options), file, (error) => {
      next(error)
    })
  }
}
