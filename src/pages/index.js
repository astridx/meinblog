import React, { useState, useEffect, useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import looking from '../assets/me.jpg'

export default function WebsiteIndex({ data }) {
  const [followers, setFollowers] = useState(null)
  const latest = data.latest.edges
  const highlights = data.highlights.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedHighlights = useMemo(
    () =>
      getSimplifiedPosts(highlights, { shortTitle: true, thumbnails: true }),
    [highlights]
  )

  useEffect(() => {
    async function getGithubAPI() {
      const response = await fetch('https://api.github.com/users/astridx')
      const data = await response.json()

      return data
    }

    getGithubAPI().then((data) => {
      setFollowers(data.followers)
    })
  }, [])

  return (
    <>
      <Helmet title={config.siteTitle}>
        <meta
          name="google-site-verification"
          content="8sATwOAKtrKDsV9NVV7JXILrY0DNAmQgyFGnrE3MnAU"
        />
      </Helmet>
      <SEO />

      <article className="hero">
        <header>
          <div className="container">
            <div className="flex-content">
              <div>
                <h1>Hallo, ich bin Astrid.</h1>
                <p className="subtitle small">
                  Ich bin Softwareentwicklerin, Autorin und ich mag{' '}
                  <a
                    href="https://github.com/astridx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Source.
                  </a>{' '}
                  Diese Website ist eine Art Kompendium. Hier sammele ich
                  Wissen, welches ich im Laufe der Jahre aufbaue.
                </p>
              </div>
              <img src={looking} alt="Me" className="main-image" />
            </div>
          </div>
        </header>

        <div className="container">
          <h2 className="main-header">
            <span>Neueste Beiträge - Latest Articles</span>{' '}
            <Link to="/blog">View All</Link>
          </h2>
          <Posts data={simplifiedLatest} />
        </div>
      </article>
    </>
  )
}

WebsiteIndex.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 7
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
          }
        }
      }
    }
    highlights: allMarkdownRemark(
      limit: 99
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Highlight" } } }
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
            shortTitle
            tags
            thumbnail {
              childImageSharp {
                fixed(width: 25, height: 25) {
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
