import { test } from '@japa/runner'
import ProjectsMarkdownRepository from '../../app/modules/project/infraestructure/projects_markdown_repository.js'
import Project from '../../app/modules/project/domain/project.js'
import app from '@adonisjs/core/services/app'

test.group('ProjectsMarkdownRepository integration tests', (group) => {
  let projectsMarkdownRepository: ProjectsMarkdownRepository

  group.each.setup(async () => {
    projectsMarkdownRepository = await app.container.make(ProjectsMarkdownRepository)
  })

  test('"all" method returns an array of Projects with length of at least 1', async ({
    assert,
  }) => {
    const projects = await projectsMarkdownRepository.all()
    assert.isAbove(projects.length, 1)
    for (const project of projects) {
      assert.isTrue(project instanceof Project)
    }
  })

  test('calling "all" method twice on a fresh Repo gives back the same Projects', async ({
    assert,
  }) => {
    const projectsTheFirstTime = await projectsMarkdownRepository.all()
    const projectsTheSecondTime = await projectsMarkdownRepository.all()
    assert.deepEqual(projectsTheFirstTime, projectsTheSecondTime)
  })
})
