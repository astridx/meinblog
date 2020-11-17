import React from 'react'
import { Link } from 'gatsby'

export default function Nav() {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img
            style={{ display: 'block', 'max-width': '100%', margin: 'auto' }}
            src="/logo2.png"
            alt=""
          />
        </Link>
      </div>
      <div className="container flex">
        <div>
          <Link to="/blog">Blog</Link>
          <Link to="/tutorial">Sets</Link>
        </div>
        <button
          style={{ 'margin-left': '20px' }}
          id="dark-mode-button"
          onClick={(event) => {
            const theme =
              typeof window !== 'undefined' && localStorage.getItem('theme')

            if (theme === 'dark') {
              typeof window !== 'undefined' && localStorage.removeItem('theme')
              const link = document.querySelectorAll('#dark-mode')

              if (link) {
                link.forEach((el) => el.remove())
                event.target.textContent = '🌙'
              }
            } else {
              typeof window !== 'undefined' &&
                localStorage.setItem('theme', 'dark')
              event.target.textContent = '☀️'
              const head = document.getElementsByTagName('head')[0]
              const link = document.createElement('link')
              link.rel = 'stylesheet'
              link.id = 'dark-mode'
              link.href = '../dark.css'

              head.appendChild(link)
            }
          }}
        >
          {typeof window !== 'undefined' &&
          localStorage.getItem('theme') === 'dark'
            ? '☀️'
            : '🌙'}
        </button>
      </div>
    </nav>
  )
}
