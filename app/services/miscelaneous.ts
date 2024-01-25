import slugifyPackage from 'slugify'

export function slugify(string: string) {
  return slugifyPackage.default(string.trim(), {
    locale: 'es',
    lower: true,
    replacement: '-',
    strict: true,
  })
}
