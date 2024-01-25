import Project from '../domain/project.js'
import ProjectsRepository from '../domain/projects_repository.js'
import type { ApplicationService } from '@adonisjs/core/types'
import MarkdownFilesService from '#services/markdown_files_service'
import path from 'node:path'
import { inject } from '@adonisjs/core'
import * as url from 'node:url'

@inject()
export default class ProjectsMarkdownRepository implements ProjectsRepository {
  constructor(protected markdownFilesService: MarkdownFilesService) {
    const dirname = url.fileURLToPath(new URL('../../../../', import.meta.url))
    this.projectsMarkdownFolder = path.join(dirname, 'resources/projects')
  }

  private _cachedProjects: Project[] | undefined
  private projectsMarkdownFolder: string

  async all() {
    if (this._cachedProjects) return this._cachedProjects
    else {
      const files = await this.markdownFilesService.getFileNamesOfDir(this.projectsMarkdownFolder)

      const projects: Project[] = []
      for (const file of files) {
        if (!file.endsWith('.md')) continue
        if (file.toLowerCase().startsWith('readme')) continue

        const { html, metadata } = await this.markdownFilesService.import<MetadataI>(
          path.join(this.projectsMarkdownFolder, file)
        )
        projects.push(
          Project.newFromProps({
            ...metadata,
            dateStart: new Date(metadata.dateStart),
            dateEnd: new Date(metadata.dateEnd),
            html,
          })
        )
      }

      this._cachedProjects = projects
      return projects
    }
  }
}

interface MetadataI {
  title: string
  categories: string[]
  slug: string
  link: string
  image: string
  dateStart: string
  dateEnd: string
  published: boolean
}
