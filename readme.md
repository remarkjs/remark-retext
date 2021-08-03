# remark-retext

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to bridge or mutate to [**retext**][retext].

## Note!

This plugin is ready for the new parser in remark
([`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
No change is needed: it works exactly the same now as it did previously!

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install remark-retext
```

## Use

Say we have the following file, `example.md`:

```markdown
## Hello guys!
```

And our script, `example.js`, looks as follows:

```js
import {readSync} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkRetext from 'remark-retext'
import retextEnglish from 'retext-english'
import retextEquality from 'retext-equality'

const file = readSync('example.md')

unified()
  .use(remarkParse)
  .use(remarkRetext, unified().use(retextEnglish).use(retextEquality))
  .use(remarkStringify)
  .process(file)
  .then((file) => {
    console.error(reporter(file))
  })
```

Now, running `node example` yields:

```text
example.md
  1:10-1:14  warning  `guys` may be insensitive, use `people`, `persons`, `folks` instead  gals-man  retext-equality

⚠ 1 warning
```

## API

This package exports no identifiers.
The default export is `remarkRetext`.

### `unified().use(remarkRetext, destination[, options])`

[**remark**][remark] ([**mdast**][mdast]) plugin to bridge or mutate to
[**retext**][retext] ([**nlcst**][nlcst]).

###### `destination`

`destination` is either a parser or a processor.

If a [`Unified`][processor] processor is given, runs the destination processor
with the new nlcst tree, then, after running discards that tree and continues on
running the origin processor with the original tree ([*bridge mode*][bridge]).

If a parser (such as [`parse-latin`][latin], [`parse-english`][english], or
[`parse-dutch`][dutch]) is given, passes the tree to further plugins
(*mutate mode*).

###### `options`

Passed to [`mdast-util-to-nlcst`][to-nlcst].

## Security

Use of `remark-retext` does not involve [**rehype**][rehype] ([**hast**][hast])
or user content so there are no openings for [cross-site scripting (XSS)][xss]
attacks.

## Related

*   [`rehype-retext`](https://github.com/rehypejs/rehype-retext)
    — Transform HTML ([hast][]) to natural language ([nlcst][])
*   [`remark-rehype`](https://github.com/remarkjs/remark-rehype)
    — Transform Markdown ([mdast][]) to HTML ([hast][])
*   [`rehype-remark`](https://github.com/rehypejs/rehype-remark)
    — Transform HTML ([hast][]) to Markdown ([mdast][])
*   [`mdast-util-to-nlcst`][to-nlcst]
    — Underlying algorithm

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

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-retext.svg

[size]: https://bundlephobia.com/result?p=remark-retext

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[retext]: https://github.com/retextjs/retext

[processor]: https://github.com/unifiedjs/unified#processor

[bridge]: https://github.com/unifiedjs/unified#processing-between-syntaxes

[mdast]: https://github.com/syntax-tree/mdast

[nlcst]: https://github.com/syntax-tree/nlcst

[hast]: https://github.com/syntax-tree/hast

[latin]: https://github.com/wooorm/parse-latin

[english]: https://github.com/wooorm/parse-english

[dutch]: https://github.com/wooorm/parse-dutch

[to-nlcst]: https://github.com/syntax-tree/mdast-util-to-nlcst

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype
