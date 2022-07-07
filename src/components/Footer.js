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
            Donate via Paypal
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
          <span>Made by Me</span>
        </nav>
      </section>
    </footer>
  )
}
