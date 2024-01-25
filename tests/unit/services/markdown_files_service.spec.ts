import MarkdownFilesService from '#services/markdown_files_service'
import { test } from '@japa/runner'
import path from 'node:path'
import * as url from 'node:url'

const filename = url.fileURLToPath(import.meta.url)
const dirname = url.fileURLToPath(new URL('.', import.meta.url))

test.group('MarkdownFilesService unit tests', () => {
  test(`when calling "getFileNamesOfDir" method with this file's directory, it returns an array with this file's name in it`, async ({
    assert,
  }) => {
    const fileNames = await new MarkdownFilesService().getFileNamesOfDir(dirname)

    const thisFileName = filename.split('/').pop() || ''
    assert.include(fileNames, thisFileName)
  })

  test(`when calling "import" method with this directory's "testing.md" file, it returns the correct metadata in that file`, async ({
    assert,
  }) => {
    const expectedMetadata = {
      'this is a string': 'yellow',
      'this is a number': 1,
      'this is 4': 4,
    }
    const { metadata } = await new MarkdownFilesService().import(path.join(dirname, 'testing.md'))
    assert.deepEqual(metadata, expectedMetadata)
  })

  test(`when calling "import" method with this directory's "testing.md" file, it returns the content as html`, async ({
    assert,
  }) => {
    const expectedHtml = '<p>In here we will put the html</p>\n'
    const { html } = await new MarkdownFilesService().import(path.join(dirname, 'testing.md'))
    assert.deepEqual(html, expectedHtml)
  })
})
