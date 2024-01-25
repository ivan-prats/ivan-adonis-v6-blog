export default class ProjectId {
  private constructor(readonly value: string) {}

  static newFromSlug(slug: string) {
    return new ProjectId(slug)
  }
}
