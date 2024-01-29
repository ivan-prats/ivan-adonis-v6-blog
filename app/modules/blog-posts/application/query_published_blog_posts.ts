import BlogPost from '../domain/blog_post.js'
import BlogPostsRepositoryI from '../domain/blog_posts_repository.js'

export default class QueryPublishedBlogPosts {
  constructor(private _blogPostsRepo: BlogPostsRepositoryI) {}

  async handle(): Promise<BlogPost[]> {
    return this._blogPostsRepo.allPublished()
  }
}
