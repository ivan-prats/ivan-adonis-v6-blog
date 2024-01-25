import edge from 'edge.js'
import fs from 'node:fs'
import MarkdownIt from 'markdown-it'
import meta from 'markdown-it-meta'

const newMdInstance = () => new MarkdownIt({ html: true, linkify: true }).use(meta)

export default class MarkdownFilesService {
  async import<MetadataI>(
    absoluteFilePathToImport: string
  ): Promise<{ html: string; metadata: MetadataI }> {
    const fileContents = await fs.promises.readFile(absoluteFilePathToImport, 'utf8')
    const fileContentsWithoutEdgeSyntax = await edge.renderRaw(fileContents)

    const md = newMdInstance()
    const html = md.render(fileContentsWithoutEdgeSyntax)
    return {
      html,
      metadata: (md as any).meta,
    }
  }

  async getFileNamesOfDir(absoluteFolderPath: string): Promise<string[]> {
    return await fs.promises.readdir(absoluteFolderPath)
  }
}
