import assert from 'node:assert/strict'
import test from 'node:test'
import {ParseEnglish} from 'parse-english'
import remarkParse from 'remark-parse'
import remarkRetext from 'remark-retext'
import remarkStringify from 'remark-stringify'
import retextEnglish from 'retext-english'
import retextStringify from 'retext-stringify'
import {unified} from 'unified'

test('remarkRetext', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('remark-retext')).sort(), [
      'default'
    ])
  })

  await t.test('should throw when w/o parser or processor', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how missing options is handled.
      unified().use(remarkRetext).freeze()
    }, /Expected `parser` \(such as from `parse-english`\) or `processor` \(a unified pipeline\) as `destination`/)
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
      // @ts-expect-error: TS barfs on overloads that result in bridges.
      .use(remarkRetext, unified().use(retextEnglish))
      .use(remarkStringify)
      .process('## Hello, world! ##')

    assert.equal(String(file), '## Hello, world!\n')
  })
})
