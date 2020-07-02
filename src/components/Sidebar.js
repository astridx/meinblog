import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { slugify } from '../utils/helpers'

export default function Sidebar({ post }) {
  const { tags, thumbnail } = post.frontmatter

  return (
    <aside>
      <div className="aside-content">
        <section>
          {thumbnail && <Img fixed={thumbnail.childImageSharp.fixed} />}
          <h3>Published</h3>
          <time>{post.frontmatter.date}</time>
          <h3>Tags</h3>
          <div className="cell tags">
            {tags &&
              tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${slugify(tag)}`}
                  className={`tag-${tag}`}
                >
                  {tag}
                </Link>
              ))}
          </div>
          <h3>Fehler gefunden?</h3>
          <div>
            Bitte lasse mich wissen, wenn etwas falsch oder unklar ist. Öffne
            gerne ein{' '}
            <Link to="https://github.com/astridx/meinblog/issues/">
              Github-Issue
            </Link>
            .
          </div>
        </section>
      </div>
    </aside>
  )
}
