import React from 'react'
import { Link } from 'gatsby'

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="container flex">
        <div>
          <Link to="/" className="brand">
            <span className="emoji">👁‍</span> Astrid Günther
          </Link>
        </div>
        <div>
          <Link to="/blog">Blog</Link>
          <Link to="/tutorial">Sets</Link>
        </div>
      </div>
    </nav>
  )
}
