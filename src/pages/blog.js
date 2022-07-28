import React, { useMemo } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <>
      <Helmet title={`Articles | ${config.siteTitle}`} >
      <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
        <link rel="token_endpoint" href="https://tokens.indieauth.com/token" />

        <link rel="me" href="https://fimidi.com/@astrid" />
        <link rel="me" href="https://github.com/astridx" />        
        <link rel="me" href="https://codeberg.org/astrid" />        
        <link rel="me" href="mailto:info@astrid-guenther.de" />
        <link rel="me" href="https://twitter.com/astridguenther" />        
        <link rel="me" href="https://astrid-guenther.de" />

        <link rel="webmention" href="https://webmention.io/blog.astrid-guenther.de/webmention" />
        <link rel="pingback" href="https://webmention.io/blog.astrid-guenther.de/xmlrpc" />

        </Helmet>
      <SEO
        customDescription="Tutorials, technical articles, snippets, reference materials, and all
              development-related resources I've written."
      />

      <article className="blog-page">
        <header>
          <div className="container">
            <h1>My digital garden</h1>
            <p className="description">Mein digitaler Garten.</p>
          </div>
        </header>

        <section>
          <div className="container">
            <Search data={simplifiedPosts} showYears />
          </div>
        </section>
      </article>
    </>
  )
}

BlogIndex.Layout = Layout

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
  }
`
