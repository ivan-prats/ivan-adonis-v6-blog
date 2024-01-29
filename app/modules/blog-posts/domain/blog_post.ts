import BlogPostId from './blog_post_id.js'

export default class BlogPost {
  readonly id: BlogPostId

  get status(): BlogPostStatusType {
    return this.props.published ? 'published' : 'unpublished'
  }
  get publicationDate(): Date {
    return new Date(this.props.date)
  }

  serialize(): BlogPostPrimitivesI {
    return { ...this.props, id: this.id, publicationDate: this.publicationDate }
  }

  static newFromProps(props: BlogPostPropsI): BlogPost {
    return new BlogPost(props)
  }

  private constructor(private readonly props: BlogPostPropsI) {
    this.id = BlogPostId.newFromSlug(props.slug)
  }
}

interface BlogPostPropsI {
  title: string
  slug: string
  category: string
  teaser: string
  description: string
  published: boolean
  date: string
  html: string
}

interface BlogPostPrimitivesI extends BlogPostPropsI {
  id: BlogPostId
  publicationDate: Date
}

const blogPostStatuses = ['published', 'unpublished'] as const
type BlogPostStatusType = (typeof blogPostStatuses)[number]
