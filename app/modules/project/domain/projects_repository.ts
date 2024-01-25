import Project from './project.js'

export default interface ProjectsRepository {
  all: () => Promise<Project[]>
}
