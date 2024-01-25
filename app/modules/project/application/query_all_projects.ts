import Project from '../domain/project.js'
import ProjectsRepository from '../domain/projects_repository.js'

export default class QueryAllProjects {
  constructor(private _projectsRepo: ProjectsRepository) {}

  async handle(): Promise<Project[]> {
    return this._projectsRepo.all()
  }
}
