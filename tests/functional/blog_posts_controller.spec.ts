import { test } from '@japa/runner'

test.group(`BlogPostsController acceptance tests`, () => {
  test(`Scenario: Website users can visit the /blog page`, async ({ client }) => {
    const response = await client.get('/blog')
    response.assertStatus(200)
  })

  test(`Scenario: Website users can visit the /blog/ddd-blog-in-typescript-with-adonis page`, async ({
    client,
  }) => {
    const response = await client.get('/blog/ddd-blog-in-typescript-with-adonis')
    response.assertStatus(200)
  })
})
