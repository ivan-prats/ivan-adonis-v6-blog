import type { HttpContext } from '@adonisjs/core/http'
import QueryAllProjects from '../application/query_all_projects.js'
import ProjectsMarkdownRepository from './projects_markdown_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export default class ProjectsController {
  constructor(protected projectsRepository: ProjectsMarkdownRepository) {}

  async index({ view }: HttpContext) {
    const projects = await new QueryAllProjects(this.projectsRepository).handle()
    return await view.render('pages/projects/index', {
      projects: projects.map((project) => project.toJSON()),
    })
  }
}
