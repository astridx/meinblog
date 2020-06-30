import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Suggested from '../components/Suggested'
import SEO from '../components/SEO'

import config from '../utils/config'

export default function PostTemplate({ data, pageContext }) {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />
      <header className="article-header medium">
        <h1>{post.frontmatter.title}</h1>
      </header>
      <section className="grid post">
        <article>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
        <Sidebar post={post} />
      </section>
      <Suggested previous={previous} next={next} />
    </Layout>
  )
}

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
        date(formatString: "DD.MM.YYYY")
        tags
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
