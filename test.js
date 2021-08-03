import test from 'tape'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import retextEnglish, {Parser as RetextEnglish} from 'retext-english'
import remarkStringify from 'remark-stringify'
import retextStringify from 'retext-stringify'
import remarkRetext from './index.js'

test('remarkRetext', (t) => {
  t.equal(
    unified()
      .use(remarkParse)
      .use(remarkRetext, RetextEnglish)
      .use(retextStringify)
      .processSync('## Hello, world! ##')
      .toString(),
    'Hello, world!',
    'should mutate'
  )

  t.equal(
    unified()
      .use(remarkParse)
      .use(remarkRetext, unified().use(retextEnglish))
      .use(remarkStringify)
      .processSync('## Hello, world! ##')
      .toString(),
    '## Hello, world!\n',
    'should bridge'
  )

  t.end()
})
