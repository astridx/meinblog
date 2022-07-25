import React, { useState, useEffect } from 'react'
import { useLocation } from '@reach/router'
import Helmet from 'react-helmet'

import favicon from '../assets/logo.png'
import { Sidebar } from './Sidebar'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

import '../style.css'
import '../new-moon.css'
import '../light-theme.css'
import '../sepia-theme.css'

function setDarkTheme(setTheme) {
  localStorage.setItem('theme', 'dark')
  setTheme('dark')
  document.body.style.backgroundColor = '#252525'
}

function setLightTheme(setTheme) {
  localStorage.setItem('theme', 'light')
  setTheme('light')
  document.body.style.backgroundColor = 'white'
}

function setSepiaTheme(setTheme) {
  localStorage.setItem('theme', 'sepia')
  setTheme('sepia')
  document.body.style.backgroundColor = '#f1e2c0'
}

function getMainClass(theme, collapsed) {
  let classString = theme

  if (collapsed) {
    classString += ' collapsed'
  }

  return classString
}

export const Layout = ({ children }) => {
  const location = useLocation()
  const [theme, setTheme] = useState('light')
  const [collapsed, setCollapsed] = useState(true)
  const slug = location.pathname

  const onUpdateTheme = (theme) => {
    if (theme === 'dark') {
      setLightTheme(setTheme)
    } else if (theme === 'light') {
      setDarkTheme(setTheme)
      //   } else if (theme === 'sepia') {
      //     setLightTheme(setTheme)
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'dark') setDarkTheme(setTheme)
    if (savedTheme === 'sepia') setSepiaTheme(setTheme)
    if (savedTheme === 'light') setLightTheme(setTheme)
  }, [])

  return (
    <>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
        <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
        <link rel="token_endpoint" href="https://tokens.indieauth.com/token" />

        <link rel="me" href="https://fimidi.com/@astrid" />
        <link rel="me" href="https://github.com/astridx" />        
        <link rel="me" href="https://codeberg.org/astrid" />        
        <link rel="me" href="mailto:info@astrid-guenther.de" />
        <link rel="me" href="https://twitter.com/astridguenther" />        
      </Helmet>

      <div className={getMainClass(theme, collapsed, slug)}>
        <Sidebar setCollapsed={setCollapsed} />
        <Navigation
          setCollapsed={setCollapsed}
          onUpdateTheme={() => onUpdateTheme(theme)}
          theme={theme}
        />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
