import assert from 'node:assert/strict'
import test from 'node:test'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import retextEnglish, {Parser as RetextEnglish} from 'retext-english'
import remarkStringify from 'remark-stringify'
import retextStringify from 'retext-stringify'
import remarkRetext from './index.js'

test('remarkRetext', async function (t) {
  await t.test('should mutate', async function () {
    assert.equal(
      unified()
        .use(remarkParse)
        .use(remarkRetext, RetextEnglish)
        .use(retextStringify)
        .processSync('## Hello, world! ##')
        .toString(),
      'Hello, world!'
    )
  })

  await t.test('should bridge', async function () {
    assert.equal(
      unified()
        .use(remarkParse)
        .use(remarkRetext, unified().use(retextEnglish))
        .use(remarkStringify)
        .processSync('## Hello, world! ##')
        .toString(),
      '## Hello, world!\n'
    )
  })
})
