import React from 'react'
import looking from '../assets/me.jpg'
import { Link } from 'gatsby'

export const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <nav>
          <small>Donate via </small>
          <a
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=KQMKUVAX5SPVS&amp;source=url"
            rel="nofollow"
          >
            Paypal
          </a>
          <small> or via IBAN: DE96 5001 0517 5416 BIC: INGDDEFFXXX</small>
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

      <div className="h-card hidden">
        <p>
          <a className="u-url" href="https://astrid-guenther.de">
            Astrid Günther
          </a>
          created by
          <img src={looking} alt="Me" className="u-photo" />
          <span className="p-name" rel="me">
            Astrid Günther
          </span>
          in
          <span className="p-country-name">Germany</span>.
        </p>

        <p>
          <span className="p-note">
            Hi, I’m Astrid, webworker, writer and open-source enthusiast.
          </span>
        </p>
      </div>
    </footer>
  )
}
