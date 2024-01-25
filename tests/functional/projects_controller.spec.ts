import { test } from '@japa/runner'

test.group(`ProjectsController acceptance tests`, () => {
  test(`Scenario: Website users can visit the /projects page
  `, async ({ client }) => {
    const response = await client.get('/projects')
    response.assertStatus(200)
  })
})
