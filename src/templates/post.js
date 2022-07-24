import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Comments } from '../components/Comments'
import config from '../utils/config'
import { slugify, appendComments } from '../utils/helpers'

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
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />

      <article className="h-entry">
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
              Written by <a className="u-url" href="https://astrid-guenther.de"><span className="p-author">Astrid Günther</span></a> on 
              <a href={postURL}><time datetime={date} className="dt-published"> {date}</time></a>
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
