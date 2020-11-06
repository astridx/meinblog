import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { slugify } from '../utils/helpers'

export default function SidebarUeberTitel({ post }) {
  const { tags, thumbnail } = post.frontmatter

  return (
    <aside>
      <div className="aside-content">
        <section>
          {thumbnail && <Img fixed={thumbnail.childImageSharp.fixed} />}
        </section>
      </div>
    </aside>
  )
}
