/**
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('mdast-util-to-nlcst').Options} Options
 * @typedef {import('mdast-util-to-nlcst').ParserConstructor} ParserConstructor
 * @typedef {import('mdast-util-to-nlcst').ParserInstance} ParserInstance
 * @typedef {import('nlcst').Root} NlcstRoot
 * @typedef {import('unified').Processor<NlcstRoot>} Processor
 * @typedef {import('vfile').VFile} VFile
 */

/**
 * @typedef {ParserConstructor | ParserInstance} Parser
 *
 * @callback TransformBridge
 *   Bridge-mode.
 *
 *   Runs the destination with the new nlcst tree.
 *   Discards result.
 * @param {MdastRoot} tree
 *   Tree.
 * @param {VFile} file
 *   File.
 * @returns {Promise<undefined>}
 *   Nothing.
 *
 * @callback TransformMutate
 *  Mutate-mode.
 *
 *  Further transformers run on the nlcst tree.
 *
 * @param {MdastRoot} tree
 *   Tree.
 * @param {VFile} file
 *   File.
 * @returns {NlcstRoot}
 *   Tree (nlcst).
 */

import {toNlcst} from 'mdast-util-to-nlcst'
import {ParseLatin} from 'parse-latin'

/**
 * Bridge or mutate to retext.
 *
 * ###### Notes
 *
 * *   if a processor is given, uses its parser to create a new nlcst tree,
 *     then runs the plugins attached to with that ([*bridge mode*][bridge]);
 *     you can add a parser to processor for example with `retext-english`; other
 *     plugins used on the processor should be retext plugins
 * *   if a parser is given, uses it to create a new nlcst tree, and returns
 *     it (*mutate mode*); you can get a parser by importing `Parser` from
 *     `retext-english` for example; other plugins used after `remarkRetext`
 *     should be retext plugins
 *
 * @overload
 * @param {Processor} processor
 * @param {Options | null | undefined} [options]
 * @returns {TransformBridge}
 *
 * @overload
 * @param {Parser} parser
 * @param {Options | null | undefined} [options]
 * @returns {TransformMutate}
 *
 * @param {Parser | Processor} destination
 *   Parser or processor (required).
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {TransformBridge | TransformMutate}
 *   Transform.
 */
export default function remarkRetext(destination, options) {
  if (!destination) {
    throw new Error(
      'Expected `parser` (such as from `parse-english`) or `processor` (a unified pipeline) as `destination`'
    )
  }

  if ('run' in destination) {
    const processor = destination.freeze()

    /**
     * @type {TransformBridge}
     */
    return async function (tree, file) {
      const parser = parserFromRetextParse(processor)
      const nlcstTree = toNlcst(tree, file, parser, options)
      await processor.run(nlcstTree, file)
    }
  }

  const parser = destination

  /**
   * @type {TransformMutate}
   */
  return function (tree, file) {
    return toNlcst(tree, file, parser, options)
  }
}

/**
 *
 * @param {Processor} processor
 * @returns {ParseLatin}
 */
function parserFromRetextParse(processor) {
  const parser = new ParseLatin()
  add(
    parser.tokenizeParagraphPlugins,
    processor.data('nlcstParagraphExtensions')
  )
  add(parser.tokenizeRootPlugins, processor.data('nlcstRootExtensions'))
  add(parser.tokenizeSentencePlugins, processor.data('nlcstSentenceExtensions'))

  return parser

  /**
   * @template T
   * @param {Array<T>} list
   * @param {Array<T> | undefined} values
   */
  function add(list, values) {
    /* c8 ignore next -- plugins like `retext-emoji`. */
    if (values) list.unshift(...values)
  }
}
