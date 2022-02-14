import React from 'react'
import { Link } from 'gatsby'

import { Hamburger } from '../assets/Hamburger'

const mainNavItems = [
  { url: '/blog', label: 'Articles' },
  { url: '/projects', label: 'Projects' },
]

const socialNavItems = [
  { url: 'https://github.com/astridx', label: 'GitHub' },
  {
    url: 'https://twitter.com/astridguenther',
    label: 'Twitter',
  },
  {
    url: 'https://www.facebook.com/astrid.guenther.16',
    label: 'Facebook',
  },
]

export const Navigation = ({ setCollapsed, onUpdateTheme, theme }) => {
  return (
    <header className="navigation">
      <div className="navigation-inner">
        <nav className="brand-section">
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="desktop-only collapse-button"
            title="Collapse Sidebar"
          >
            <Hamburger />
          </button>

          <Link to="/" className="brand">
            <span>Astrid Günther</span>
          </Link>
        </nav>
        <div>
          <nav>
            {mainNavItems.map((item) => (
              <Link to={item.url} key={item.label} activeClassName="active">
                <div className="tooltip">{item.label}</div>
              </Link>
            ))}
          </nav>
        </div>
        <div className="toolbar-section">
          <nav className="social-nav">
            {socialNavItems.map((item) => (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button onClick={onUpdateTheme} className="theme-switcher">
            Dark/Light
          </button>
        </div>
      </div>
    </header>
  )
}
