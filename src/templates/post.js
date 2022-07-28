import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Comments } from '../components/Comments'
import config from '../utils/config'
import { slugify, appendComments } from '../utils/helpers'

import looking from '../assets/me.jpg'

export default function PostTemplate({ data }) {
  const post = data.markdownRemark
  const { tags, title, date, thumbnail } = post.frontmatter

  const postURL = `${config.siteUrl}${post.fields.slug}`

  const commentBox = React.createRef()

  useEffect(() => {
    appendComments(commentBox)
  }, [commentBox])

  return (
    <>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`}>
        <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
        <link rel="token_endpoint" href="https://tokens.indieauth.com/token" />

        <link rel="me" href="https://fimidi.com/@astrid" />
        <link rel="me" href="https://github.com/astridx" />
        <link rel="me" href="https://codeberg.org/astrid" />
        <link rel="me" href="mailto:info@astrid-guenther.de" />
        <link rel="me" href="https://twitter.com/astridguenther" />
        <link rel="me" href="https://astrid-guenther.de" />

        <link
          rel="webmention"
          href="https://webmention.io/blog.astrid-guenther.de/webmention"
        />
        <link
          rel="pingback"
          href="https://webmention.io/blog.astrid-guenther.de/xmlrpc"
        />
      </Helmet>
      <SEO postPath={post.fields.slug} postNode={post} postSEO />

      <article className="h-entry">
        <section className="p-author h-card hidden">
          <p>
            <a className="u-url" href={postURL}>
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
              Hi, I’m Astrid, webworker, writer and I like open-source.
            </span>
          </p>
        </section>

        <header>
          <div className="container">
            <div className="post-details">
              {thumbnail && (
                <div>
                  <Img
                    fixed={thumbnail.childImageSharp?.fixed}
                    className="post-image"
                  />
                </div>
              )}
              Written by{' '}
              <a className="u-url" href="https://astrid-guenther.de">
                <span>Astrid Günther</span>
              </a>{' '}
              on
              <a href={postURL}>
                <time datetime={date} className="dt-published">
                  {' '}
                  {date}
                </time>
              </a>
            </div>
            <h1 className="p-name">{title}</h1>
            <div className="post-meta">
              {tags && (
                <div className="tags p-category">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${slugify(tag)}`}
                      className={`tag-${tag}`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div
          id={post.fields.slug}
          className="container post-content e-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <section id="comments" className="comments container">
        <h3>Comments</h3>
        <Comments commentBox={commentBox} />
      </section>
    </>
  )
}

PostTemplate.Layout = Layout

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
        description
        thumbnail {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
