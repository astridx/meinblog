import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Guides from '../components/Guides'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(
    () => getSimplifiedPosts(posts, { thumbnails: true }),
    [posts]
  )

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>Tutorials | {config.siteTitle}</title>
      </Helmet>
      <SEO />
      <section>
        <h1>Sets</h1>
        <p className="subtitle">The tutorials missing on the web.</p>
        <p className="medium">
          Here you will find an overview of detailed tutorials, best practices,
          references and links to design, development and programming.
        </p>
        <Guides data={simplifiedPosts} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GuidesQueryEn {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "TutorialEn" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            thumbnail {
              childImageSharp {
                fixed(width: 50, height: 50) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
