export function getSimplifiedPosts(posts, options = {}) {
  return posts.map((post) => ({
    id: post.node.id,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    tags: post.node.frontmatter.tags,
    categories: post.node.frontmatter.categories,
    title: options.shortTitle
      ? post.node.frontmatter.shortTitle
      : post.node.frontmatter.title,
    description: post.node.frontmatter.description,
    ...(options.thumbnails && {
      thumbnail: post.node.frontmatter?.thumbnail?.childImageSharp?.fixed,
    }),
  }))
}

export function getCategoriesFromPosts(posts) {
  return posts
    .reduce((acc, post) => {
      return [...new Set([...acc, ...(post.categories || [])])]
    }, [])
    .sort()
}

export function slugify(string) {
  return (
    string &&
    string
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

export function getTheme() {
  const theme = localStorage.getItem('theme')

  if (theme === 'dark') return 'github-dark'
  if (theme === 'sepia') return 'gruvbox-dark'
  if (theme === 'light') return 'github-light'

  return 'github-light'
}
