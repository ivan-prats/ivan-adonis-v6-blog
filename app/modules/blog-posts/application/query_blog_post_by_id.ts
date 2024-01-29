import BlogPost from '../domain/blog_post.js'
import BlogPostId from '../domain/blog_post_id.js'
import BlogPostsRepositoryI from '../domain/blog_posts_repository.js'

export default class QueryBlogPostBySlug {
  constructor(private _blogPostsRepo: BlogPostsRepositoryI) {}

  async handle(slug: string): Promise<BlogPost | null> {
    return this._blogPostsRepo.findById(BlogPostId.newFromSlug(slug))
  }
}
