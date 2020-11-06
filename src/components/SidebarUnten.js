import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { slugify } from '../utils/helpers'

export default function SidebarUnten({ post }) {
  const { tags, thumbnail } = post.frontmatter

  return (
    <aside>
      <div className="aside-content">
        <section>
          <h3>Fehler gefunden?</h3>
          <div>
            Bitte lasse mich wissen, wenn etwas falsch oder unklar ist. Öffne
            gerne ein{' '}
            <Link to="https://github.com/astridx/meinblog/issues/">
              Github-Issue
            </Link>
            .
          </div>
          <h3>Du oder Sie?</h3>
          <div>
            Ob Du oder Sie - das ist im Deutschen oft gar nicht so leicht zu
            entscheiden. Manche Leser sieze ich, andere duze ich. Deshalb gibt
            es im Weblog ein bunter Durcheinander und jeder sucht sich das aus,
            was für Ihn passt.
          </div>
        </section>
      </div>
    </aside>
  )
}
