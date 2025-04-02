# remark-retext

[![Build][badge-build-image]][badge-build-url]
[![Coverage][badge-coverage-image]][badge-coverage-url]
[![Downloads][badge-downloads-image]][badge-downloads-url]
[![Size][badge-size-image]][badge-size-url]

**[remark][github-remark]** plugin to support
**[retext][github-retext]**.

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`unified().use(remarkRetext, destination[, options])`](#unifieduseremarkretext-destination-options)
  * [`Options`](#options)
* [Types](#types)
* [Compatibility](#compatibility)
* [Security](#security)
* [Related](#related)
* [Contribute](#contribute)
* [License](#license)

## What is this?

This package is a [unified][github-unified] ([remark][github-remark]) plugin to
support [retext][github-retext].

## When should I use this?

This project is useful if you want to check natural language in markdown.
The retext ecosystem has many useful plugins to check prose,
such as [`retext-indefinite-article`][github-retext-indefinite-article]
which checks that `a` and `an` are used correctly,
or [`retext-readability`][github-retext-readability] which checks that sentences
are not too complex.
This plugins lets you use them on markdown documents.

This plugin is not able to apply changes by retext plugins (such
as done by `retext-smartypants`) to the markdown content.

This plugin is built on [`mdast-util-to-nlcst`][github-mdast-util-to-nlcst],
which does the work on syntax trees.
remark focusses on making it easier to transform content by abstracting such
internals away.

## Install

This package is [ESM only][github-gist-esm].
In Node.js (version 16+),
install with [npm][npmjs-install]:

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

* `destination` ([`Parser`][github-unified-parser] or
  [`Processor`][github-unified-processor])
  — configuration (required)

###### Returns

Transform ([`Transformer`][github-unified-transformer]).

###### Notes

* if a [processor][github-unified-processor] is given,
  uses its parser to create a new nlcst tree,
  then runs the plugins attached to with that
  (*[bridge mode][github-unified-mode]*);
  you can add a parser to processor for example with `parse-english`;
  other plugins used on the processor should be retext plugins
* if a [parser][github-unified-parser] is given,
  uses it to create a new nlcst tree,
  and returns it (*[mutate mode][github-unified-mode]*);
  you can get a parser by importing `Parser` from `parse-english` for example;
  other plugins used after `remarkRetext` should be retext plugins

### `Options`

Configuration (TypeScript type).

###### Fields

* `options.ignore`
  (`Array<string>`, optional)
  — list of [mdast][github-mdast] node types to ignore;
  the types `'table'`, `'tableRow'`, and `'tableCell'` are always ignored
* `options.source`
  (`Array<string>`, optional)
  — list of [mdast][github-mdast] node types to mark as [nlcst][github-nlcst]
  source nodes;
  the type `'inlineCode'` is always marked as source

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release,
we drop support for unmaintained versions of Node.
This means we try to keep the current release line,
`remark-retext@6`,
compatible with Node.js 16.

This plugin works with `unified` version 6+,
`remark` version 3+,
and `retext` version 7+.

## Security

Use of `remark-retext` does not involve **[rehype][github-rehype]**
(**[hast][github-hast]**) or user
content so there are no openings for
[cross-site scripting (XSS)][wikipedia-xss]
attacks.

## Related

* [`rehype-retext`](https://github.com/rehypejs/rehype-retext)
  — transform HTML ([hast][github-hast]) to natural language
  ([nlcst][github-nlcst])
* [`remark-rehype`](https://github.com/remarkjs/remark-rehype)
  — transform markdown ([mdast][github-mdast]) to HTML ([hast][github-hast])
* [`rehype-remark`](https://github.com/rehypejs/rehype-remark)
  — transform HTML ([hast][github-hast]) to markdown ([mdast][github-mdast])
* [`mdast-util-to-nlcst`][github-mdast-util-to-nlcst]
  — underlying algorithm

## Contribute

See [`contributing.md`][health-contributing] in [`remarkjs/.github`][health] for
ways to get started.
See [`support.md`][health-support] for ways to get help.

This project has a [code of conduct][health-coc].
By interacting with this repository,
organization,
or community you agree to abide by its terms.

## License

[MIT][file-license] © [Titus Wormer][wooorm]

<!-- Definitions -->

[api-options]: #options

[api-remark-retext]: #unifieduseremarkretext-destination-options

[badge-build-image]: https://github.com/remarkjs/remark-retext/workflows/main/badge.svg

[badge-build-url]: https://github.com/remarkjs/remark-retext/actions

[badge-coverage-image]: https://img.shields.io/codecov/c/github/remarkjs/remark-retext.svg

[badge-coverage-url]: https://codecov.io/github/remarkjs/remark-retext

[badge-downloads-image]: https://img.shields.io/npm/dm/remark-retext.svg

[badge-downloads-url]: https://www.npmjs.com/package/remark-retext

[badge-size-image]: https://img.shields.io/bundlejs/size/remark-retext

[badge-size-url]: https://bundlejs.com/?q=remark-retext

[esmsh]: https://esm.sh

[file-license]: license

[github-gist-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[github-hast]: https://github.com/syntax-tree/hast

[github-mdast]: https://github.com/syntax-tree/mdast

[github-mdast-util-to-nlcst]: https://github.com/syntax-tree/mdast-util-to-nlcst

[github-nlcst]: https://github.com/syntax-tree/nlcst

[github-rehype]: https://github.com/rehypejs/rehype

[github-remark]: https://github.com/remarkjs/remark

[github-retext]: https://github.com/retextjs/retext

[github-retext-indefinite-article]: https://github.com/retextjs/retext-indefinite-article

[github-retext-readability]: https://github.com/retextjs/retext-readability

[github-unified]: https://github.com/unifiedjs/unified

[github-unified-mode]: https://github.com/unifiedjs/unified#processing-between-syntaxes

[github-unified-parser]: https://github.com/unifiedjs/unified#parser

[github-unified-processor]: https://github.com/unifiedjs/unified#processor

[github-unified-transformer]: https://github.com/unifiedjs/unified#transformer

[health]: https://github.com/remarkjs/.github

[health-coc]: https://github.com/remarkjs/.github/blob/main/code-of-conduct.md

[health-contributing]: https://github.com/remarkjs/.github/blob/main/contributing.md

[health-support]: https://github.com/remarkjs/.github/blob/main/support.md

[npmjs-install]: https://docs.npmjs.com/cli/install

[typescript]: https://www.typescriptlang.org

[wikipedia-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[wooorm]: https://wooorm.com
