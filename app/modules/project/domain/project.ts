import ProjectId from './project_id.js'

export default class Project {
  toJSON(): ProjectPrimitivesI {
    return {
      ...this.props,
      id: this.id.value,
    }
  }

  static newFromProps(props: ProjectPropsI): Project {
    return new Project(props)
  }

  readonly id: ProjectId
  private constructor(private readonly props: ProjectPropsI) {
    this.id = ProjectId.newFromSlug(props.slug)
  }
}

interface ProjectPropsI {
  title: string
  slug: string
  categories: string[]
  link: string
  image: string
  dateStart: Date
  dateEnd: Date
  published: boolean
  html: string
}

interface ProjectPrimitivesI extends ProjectPropsI {
  id: string
}
