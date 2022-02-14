import React from 'react'

import { Link } from 'gatsby'

const links = [{ url: 'https://blog.astrid-guenther.de/rss.xml', label: 'RSS' }]

export const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <nav>
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
        <nav className="footer-links">
          <Link to="/blog">Blog</Link>
          <Link to="https://astrid-guenther.de/impressum">Impressum</Link>
          <Link to="https://astrid-guenther.de/datenschutzerklaerung">
            Datenschutz
          </Link>
        </nav>
        <nav>
          <span className="desktop-only">Made by Astrid Günther</span>
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </section>
    </footer>
  )
}
