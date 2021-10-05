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
          <Link to="https://astrid-guenther.de/datenschutzerklaerung">
            Datenschutz
          </Link>
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

          <a
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=KQMKUVAX5SPVS&amp;source=url"
            rel="nofollow"
          >
            <img
              src="https://camo.githubusercontent.com/48808c433ce8c8ed020ca8bd30816bef7b2f716c3ac00a12279f4cbb3043c5ce/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f656e5f55532f444b2f692f62746e2f62746e5f646f6e61746543435f4c472e676966"
              alt=""
              data-canonical-src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif"
            />
          </a>
        </nav>
      </section>
    </footer>
  )
}
