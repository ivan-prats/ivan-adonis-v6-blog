import * as url from 'node:url'
import path from 'node:path'
import { inject } from '@adonisjs/core'
import MarkdownFilesService from '#services/markdown_files_service'
import BlogPostsRepositoryI from '../domain/blog_posts_repository.js'
import BlogPost from '../domain/blog_post.js'
import BlogPostId from '../domain/blog_post_id.js'

@inject()
export default class BlogPostsMarkdownRepository implements BlogPostsRepositoryI {
  constructor(protected markdownFilesService: MarkdownFilesService) {
    const dirname = url.fileURLToPath(new URL('../../../../', import.meta.url))
    this._blogPostsMarkdownFolder = path.join(dirname, 'resources/blog-posts')
  }

  async allPublished() {
    const blogPosts = await this._getOrRenewCachedBlogPosts()

    const publishedBlogPosts: BlogPost[] = []
    for (const blogPost of blogPosts) {
      if (blogPost.status === 'published') publishedBlogPosts.push(blogPost)
    }
    return publishedBlogPosts
  }

  async findById(blogPostId: BlogPostId): Promise<BlogPost | null> {
    const blogPosts = await this._getOrRenewCachedBlogPosts()
    for (const blogPost of blogPosts) {
      if (blogPost.id.equals(blogPostId)) return blogPost
    }
    return null
  }

  /**
   * Private methods for internal usage
   */
  private _cachedBlogPosts: BlogPost[] | undefined
  private _blogPostsMarkdownFolder: string
  private async _getOrRenewCachedBlogPosts(): Promise<BlogPost[]> {
    if (this._cachedBlogPosts) return this._cachedBlogPosts
    else {
      const files = await this.markdownFilesService.getFileNamesOfDir(this._blogPostsMarkdownFolder)

      const blogPosts: BlogPost[] = []
      for (const file of files) {
        if (!file.endsWith('.md')) continue
        const { html, metadata } = await this.markdownFilesService.import<MetadataI>(
          path.join(this._blogPostsMarkdownFolder, file)
        )

        blogPosts.push(
          BlogPost.newFromProps({
            ...metadata,
            html,
          })
        )
      }
      this._cachedBlogPosts = blogPosts
      return blogPosts
    }
  }
}

interface MetadataI {
  title: string
  slug: string
  category: string
  teaser: string
  description: string
  published: boolean
  date: string
}
