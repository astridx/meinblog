import React from 'react'
import { Link } from 'gatsby'

import gatsby from '../../content/thumbnails/gatsby.png'
import github from '../../content/thumbnails/github.png'

export default function Footer() {
  return (
    <footer className="footer container">
      <section className="flex">
        <nav className="footer-links">
          <Link to="/blog">Blog</Link>
          <Link to="https://astrid-guenther.de/impressum">Impressum</Link>
          <Link to="https://astrid-guenther.de/datenschutzerklaerung">Datenschutz</Link>
        </nav>
        <nav className="flex">
          <a
            href="https://www.gatsbyjs.org/"
            title="Built with Gatsby"
            target="_blank"
            rel="noopener noreferrer"
            className="img"
          >
            <img src={gatsby} className="footer-img" alt="Gatsby" />
          </a>
          <a
            href="https://github.com/astridx"
            title="Open-source on GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="img"
          >
            <img src={github} className="footer-img" alt="GitHub" />
          </a>
        </nav>
      </section>
    </footer>
  )
}
