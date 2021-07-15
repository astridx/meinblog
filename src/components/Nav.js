import React from 'react'
import { Link } from 'gatsby'
import LanguageSelector from './LanguageSelector'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

export default function Nav() {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img
            style={{ display: 'block', maxWidth: '100%', margin: 'auto' }}
            src="/logo2.png"
            alt=""
          />
        </Link>
      </div>
      <div className="container flex">
        <div>
          <Link to="/blog">Blog</Link>
          <Link to="/tutorial">Sets</Link>
          <button id="dark-mode-button" style={{ marginLeft: '20px' }}>
            <LanguageSelector />
          </button>

          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <label>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    toggleTheme(e.target.checked ? 'dark' : 'light')
                  }
                  checked={theme === 'dark'}
                />{' '}
                Dark mode
              </label>
            )}
          </ThemeToggler>
        </div>
      </div>
    </nav>
  )
}
