import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function TagTemplate({ data, pageContext }) {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post found.' : ' posts found.'

  return (
    <Layout>
      <Helmet title={`Posts tagged: ${tag} | ${config.siteTitle}`} />
      <SEO />
      <section>
        <h1>
          Tag: <u>{tag}</u>
        </h1>
        <p class="subtitle">
          <span className="count">{totalCount}</span>
          {message}
        </p>
      </section>
      <section className="medium">
        <Posts data={simplifiedPosts} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
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
