import assert from 'node:assert/strict'
import test from 'node:test'
import {unified} from 'unified'
import {ParseEnglish} from 'parse-english'
import remarkParse from 'remark-parse'
import retextEnglish from 'retext-english'
import remarkStringify from 'remark-stringify'
import retextStringify from 'retext-stringify'
import remarkRetext from './index.js'

test('remarkRetext', async function (t) {
  await t.test('should throw when w/o parser or processor', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how missing options is handled.
      unified().use(remarkRetext).freeze()
    }, /Expected `parser` \(such as from `parse-english`\) or `processor` \(a unified pipeline\) as `parserOrProcessor`/)
  })

  await t.test('should mutate', async function () {
    const file = await unified()
      .use(remarkParse)
      .use(remarkRetext, ParseEnglish)
      .use(retextStringify)
      .process('## Hello, world! ##')

    assert.equal(String(file), 'Hello, world!')
  })

  await t.test('should bridge', async function () {
    const file = await unified()
      .use(remarkParse)
      // @ts-expect-error: to do.
      .use(remarkRetext, unified().use(retextEnglish))
      .use(remarkStringify)
      .process('## Hello, world! ##')

    assert.equal(String(file), '## Hello, world!\n')
  })
})
