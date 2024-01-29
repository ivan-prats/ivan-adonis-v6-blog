export default class BlogPostId {
  private constructor(readonly value: string) {}

  static newFromSlug(slug: string): BlogPostId {
    return new BlogPostId(slug)
  }

  equals(other: BlogPostId): boolean {
    return this.value === other.value
  }
}
