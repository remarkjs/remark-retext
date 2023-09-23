# remark-retext

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to support **[retext][]**.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkRetext, destination[, options])`](#unifieduseremarkretext-destination-options)
    *   [`Options`](#options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to support [retext][].

## When should I use this?

This project is useful if you want to check natural language in markdown.
The retext ecosystem has many useful plugins to check prose, such as
[`retext-indefinite-article`][retext-indefinite-article] which checks that `a`
and `an` are used correctly, or [`retext-readability`][retext-readability] which
checks that sentences are not too complex.
This plugins lets you use them on markdown documents.

This plugin is not able to apply changes by retext plugins (such
as done by `retext-smartypants`) to the markdown content.

This plugin is built on [`mdast-util-to-nlcst`][mdast-util-to-nlcst], which does
the work on syntax trees.
remark focusses on making it easier to transform content by abstracting such
internals away.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install remark-retext
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkRetext from 'https://esm.sh/remark-retext@6'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkRetext from 'https://esm.sh/remark-retext@6?bundle'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
## Hello guys!
```

…and a module `example.js`:

```js
import remarkParse from 'remark-parse'
import remarkRetext from 'remark-retext'
import remarkStringify from 'remark-stringify'
import retextEnglish from 'retext-english'
import retextEquality from 'retext-equality'
import {read} from 'to-vfile'
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'

const file = await unified()
  .use(remarkParse)
  .use(remarkRetext, unified().use(retextEnglish).use(retextEquality))
  .use(remarkStringify)
  .process(await read('example.md'))

console.error(reporter(file))
```

…then running `node example.js` yields:

```text
example.md
1:10-1:14 warning Unexpected potentially insensitive use of `guys`, in somes cases `people`, `persons`, `folks` may be better gals-man retext-equality

⚠ 1 warning
```

## API

This package exports no identifiers.
The default export is [`remarkRetext`][api-remark-retext].

### `unified().use(remarkRetext, destination[, options])`

Bridge or mutate to retext.

###### Parameters

*   `destination` ([`Parser`][unified-parser] or
    [`Processor`][unified-processor])
    — configuration (required)

###### Returns

Transform ([`Transformer`][unified-transformer]).

###### Notes

*   if a [processor][unified-processor] is given, uses its parser to create a
    new nlcst tree, then runs the plugins attached to with that
    (*[bridge mode][unified-mode]*); you can add a parser to processor for
    example with `retext-english`; other plugins used on the processor should
    be retext plugins
*   if a [parser][unified-parser] is given, uses it to create a new nlcst tree,
    and returns it (*[mutate mode][unified-mode]*); you can get a parser by
    importing `Parser` from `retext-english` for example;  other plugins used
    after `remarkRetext` should be retext plugins

### `Options`

Configuration (TypeScript type).

###### Fields

*   `options.ignore` (`Array<string>`, optional)
    — list of [mdast][] node types to ignore;
    the types `'table'`, `'tableRow'`, and `'tableCell'` are always ignored
*   `options.source` (`Array<string>`, optional)
    — list of [mdast][] node types to mark as [nlcst][] source nodes;
    the type `'inlineCode'` is always marked as source

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `remark-retext@^6`,
compatible with Node.js 16.

This plugin works with `unified` version 6+, `remark` version 3+, and `retext`
version 7+.

## Security

Use of `remark-retext` does not involve **[rehype][]** (**[hast][]**) or user
content so there are no openings for [cross-site scripting (XSS)][wiki-xss]
attacks.

## Related

*   [`rehype-retext`](https://github.com/rehypejs/rehype-retext)
    — transform HTML ([hast][]) to natural language ([nlcst][])
*   [`remark-rehype`](https://github.com/remarkjs/remark-rehype)
    — transform Markdown ([mdast][]) to HTML ([hast][])
*   [`rehype-remark`](https://github.com/rehypejs/rehype-remark)
    — transform HTML ([hast][]) to Markdown ([mdast][])
*   [`mdast-util-to-nlcst`][mdast-util-to-nlcst]
    — underlying algorithm

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-retext/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-retext/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-retext.svg

[coverage]: https://codecov.io/github/remarkjs/remark-retext

[downloads-badge]: https://img.shields.io/npm/dm/remark-retext.svg

[downloads]: https://www.npmjs.com/package/remark-retext

[size-badge]: https://img.shields.io/bundlejs/size/remark-retext

[size]: https://bundlejs.com/?q=remark-retext

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/main/contributing.md

[support]: https://github.com/remarkjs/.github/blob/main/support.md

[coc]: https://github.com/remarkjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[mdast]: https://github.com/syntax-tree/mdast

[mdast-util-to-nlcst]: https://github.com/syntax-tree/mdast-util-to-nlcst

[nlcst]: https://github.com/syntax-tree/nlcst

[rehype]: https://github.com/rehypejs/rehype

[remark]: https://github.com/remarkjs/remark

[retext]: https://github.com/retextjs/retext

[retext-indefinite-article]: https://github.com/retextjs/retext-indefinite-article

[retext-readability]: https://github.com/retextjs/retext-readability

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[unified-mode]: https://github.com/unifiedjs/unified#processing-between-syntaxes

[unified-processor]: https://github.com/unifiedjs/unified#processor

[unified-parser]: https://github.com/unifiedjs/unified#parser

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[wiki-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[api-options]: #options

[api-remark-retext]: #unifieduseremarkretext-destination-options
