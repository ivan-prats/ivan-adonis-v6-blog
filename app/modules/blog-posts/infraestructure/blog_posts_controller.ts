import type { HttpContext } from '@adonisjs/core/http'
import QueryPublishedBlogPosts from '../application/query_published_blog_posts.js'
import QueryBlogPostBySlug from '../application/query_blog_post_by_id.js'
import BlogPostsMarkdownRepository from './blog_posts_markdown_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export default class BlogPostsController {
  constructor(protected blogPostsRepository: BlogPostsMarkdownRepository) {}

  async index({ view }: HttpContext) {
    const blogPosts = await new QueryPublishedBlogPosts(this.blogPostsRepository).handle()
    return await view.render('pages/blog/index', {
      blogPosts: blogPosts.map((blogPost) => blogPost.serialize()),
    })
  }

  async show({ view, params, response }: HttpContext) {
    const blogPostOrNull = await new QueryBlogPostBySlug(this.blogPostsRepository).handle(
      params.slug
    )

    if (!blogPostOrNull) {
      return response.notFound('Blog post not found')
    }

    return await view.render('pages/blog/show', {
      blogPost: blogPostOrNull.serialize(),
    })
  }
}
