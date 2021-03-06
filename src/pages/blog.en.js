import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Search from '../components/Search'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>Blog | {config.siteTitle}</title>
      </Helmet>
      <SEO />
      <section>
        <h1>Blog</h1>
        <p className="subtitle">
          Articles, tutorials, snippets, reflections and everything else.
        </p>
        <Search posts={simplifiedPosts} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogQueryEn {
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
            date(formatString: "DD.MM.YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
