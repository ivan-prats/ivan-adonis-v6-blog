import BlogPost from './blog_post.js'
import BlogPostId from './blog_post_id.js'

export default interface BlogPostsRepositoryI {
  allPublished: () => Promise<BlogPost[]>
  findById: (blogPostId: BlogPostId) => Promise<BlogPost | null>
}
