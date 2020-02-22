import React, { Component } from 'react'
import { Link } from 'gatsby'
import gatsby from '../../content/thumbnails/gatsby.png'
import github from '../../content/images/github.png'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <div>
          <a href=" Ko-fi.com/astridguenther" target="_blank" rel="noopener noreferrer">
            Ko-Fi
          </a>
          <a href="https://patreon.com/astridx" target="_blank" rel="noopener noreferrer">
            Patreon
          </a>
        </div>
        <div>
          <a href="https://github.com/astridx" title="Open-source on GitHub">
            <img
              src={github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-img"
              alt="GitHub"
            />
          </a>
          <a href="https://www.gatsbyjs.org/" title="Erstellt mit Gatsby">
            <img
              src={gatsby}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-img"
              alt="Gatby"
            />
          </a>
        </div>
      </footer>
    )
  }
}
