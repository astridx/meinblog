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
    image: 'https://s3.amazonaws.com/CAPS-SSE/content/44075505/DIGITAL_BOOK_THUMBNAIL?versionId=WlCSb3UtGN.ThXMs4RMZ.Id9HaI594up&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220505T091619Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=AKIAWBV6LQ4QPLOTC37V%2F20220505%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=848c4a7f6dac3f10b1738bc4908a1fc22ffe0183bd6633ce12d9de5e79eaff9e',
    url: 'https://www.amazon.com/dp/B09X4RZHLG',
    writeup: '/en/der-weg-zu-joomla4-erweiterungen/',
  },

  {
    name: 'React Book',
    tagline: 'Der Weg zu React.',
    image: 'https://s3.amazonaws.com/CAPS-SSE/content/35733319/DIGITAL_BOOK_THUMBNAIL?versionId=_2q.CFmwhnWhgx8sTrXFxzuomBAbYKfp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220505T103509Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=AKIAWBV6LQ4QPLOTC37V%2F20220505%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=0ba24b8ef04803fb8b5a03b79e67761dadcdcea14965a1eec77cd094a9f202ee',
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
