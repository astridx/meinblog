import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Lists from '../components/Lists'
import Projects from '../components/Projects'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import projects from '../data/projects'
import interviews from '../data/interviews'
import speaking from '../data/speaking'
import books from '../data/books'

export default function BlogIndex({ data }) {
  const latest = data.latest.edges
  const popular = data.popular.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [
    popular,
  ])

  const Section = ({ title, children, ...props }) => (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  )

  return (
    <Layout>
      <Helmet>
        <html lang="de" />
        <title>{config.siteTitle}</title>
        <meta
          name="google-site-verification"
          content="8sATwOAKtrKDsV9NVV7JXILrY0DNAmQgyFGnrE3MnAU"
        />
      </Helmet>
      <SEO />
      <section className="small lead">
        <h1>Willkommen</h1>
        <p className="subtitle">
          Ich bin Softwareentwicklerin, Autorin und ich mag{' '}
          <a href="https://github.com/astridx" target="_blank" rel="noreferrer">
            Open Source.
          </a>{' '}
          Diese Website ist eine Art Kompendium. Hier sammele ich Wissen,
          welches ich im Laufe der Jahre aufbaue.
        </p>
      </section>
      <Section title="Bücher" className="medium">
        <Lists data={books} />
      </Section>
      <Section title="Veröffentlichungen" className="medium">
        <Lists data={interviews} />
      </Section>
      <Section title="Beliebt">
        <Posts data={simplifiedPopular} tags />
      </Section>
      <Section title="Projekte">
        <Projects data={projects} />
      </Section>
      <Section title="Vorträge" className="medium">
        <Lists data={speaking} />
      </Section>
      <Section title="Neu">
        <Posts data={simplifiedLatest} tags />
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
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
    popular: allMarkdownRemark(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
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
