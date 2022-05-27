import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'
import github from '../../content/thumbnails/github.png'

const booksList = [
  {
    name: 'Joomla Book',
    tagline: 'Developing a Joomla Extension.',
    image: 'https://m.media-amazon.com/images/I/51aHOHo9VjL.jpg',
    url: 'https://www.amazon.com/dp/B09X4RZHLG',
    writeup: '/en/der-weg-zu-joomla4-erweiterungen/',
  },

  {
    name: 'React Book',
    tagline: 'Der Weg zu React.',
    image: 'https://m.media-amazon.com/images/I/51dZ+OXn+-L._AC_UY218_.jpg',
    url: 'https://www.amazon.de/dp/B08F3CZWW4',
    writeup: '/erste-schritte-mit-react',
  },
  {
    name: 'Leaflet Book',
    tagline: 'Einstieg in LeafletJs',
    image: 'https://www.epubli.de/shop/buch/83153/cover/front/200',
    url: 'https://www.amazon.de/dp/3748507453/',
    writeup: '/leaflet-tutorials/',
  },

]

export default function BooksIndex() {

  return (
    <>
      <Helmet title={`Books | ${config.siteTitle}`} />
      <SEO />

      <article>
        <header>
          <div className="container">
            <h1>Books</h1>
            <p className="description">
              Ein paar meiner Open-Source-Projekte. Alle{' '}
              <a href="https://github.com/astridx">auf GitHub</a>.
            </p>
          </div>
        </header>

        <section className="projects large container">
          {booksList.map((book) => (
            <div className="project" key={book.name}>
              <h2>{book.name}</h2>
              {book.image && <img src={book.image} alt={book.name} />}
              <div className="links tags">
                {book.writeup && <Link to={book.writeup}>Text</Link>}
                <a
                  href={`${book.url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </div>
              <p className="description">{book.tagline}</p>
            </div>
          ))}
        </section>
      </article>
    </>
  )
}

BooksIndex.Layout = Layout
