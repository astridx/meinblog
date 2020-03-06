import React, { Component } from 'react'
import Helmet from 'react-helmet'
import GitHubButton from 'react-github-btn'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import ProjectListing from '../components/ProjectListing'
import SimpleListing from '../components/SimpleListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import projects from '../../data/projects'
import speaking from '../../data/speaking'
import quotes from '../../data/quotes'
import astrid from '../../content/images/ich_quadratisch_1000.jpg'

export default class Index extends Component {
  render() {
    const { data } = this.props

    const latestPostEdges = data.latest.edges
    const popularPostEdges = data.popular.edges

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Entwicklerin & Autorin`} />
        <SEO />
        <div className="container">
          <div className="lead">
            <div className="elevator">
              <h1>{`Hallo, ich bin Astrid`}</h1>
              <p>
                Ich bin Joomla Erweiterungs-Entwicklerin und Front-End-Softwareentwicklerin, arbeite gerne mit {' '}
                <a href="https://github.com/astridx" target="_blank" rel="noopener noreferrer">
                  Open Source Programmen
                </a>{' '}
                und <Link to="/blog">schreibe</Link> über JavaScript, Geoinformationssysteme und
                Persönliches. 💾
              </p>
              <div className="social-buttons">
                <GitHubButton
                  href="https://github.com/astridx"
                  data-size="large"
                  data-show-count="true"
                >
                  astridx
                </GitHubButton>
              </div>
            </div>
            <div className="newsletter-section">
              <img src={astrid} className="newsletter-avatar" alt="Astrid" />
              <div>
                <h3>Updates bekommen</h3>
                <p>Open Source Projekte und Entwicklungstutorials	</p>
                <a className="button" href="https://astrid.substack.com">
                  Abonnieren
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container front-page">
          <section className="section">
            <h2>
              Neueste Artikel
              <Link to="/blog" className="view-all">
                Alle ansehen
              </Link>
            </h2>
            <PostListing simple postEdges={latestPostEdges} />
          </section>

          <section className="section">
            <h2>
              Am beliebtesten
              <Link to="/categories/popular" className="view-all">
                Alle ansehen
              </Link>
            </h2>
            <PostListing simple postEdges={popularPostEdges} />
          </section>

          <section className="section">
            <h2>Open Source Projekte</h2>
            <ProjectListing projects={projects} />
          </section>

          <section className="section">
            <h2>Vorträge</h2>
            <SimpleListing simple data={speaking} />
          </section>

          <section className="section">
            <h2>{`-`}</h2>
            <div className="quotations">
              {quotes.map(quote => (
                <blockquote className="quotation" key={quote.name}>
                  <p>{quote.quote}</p>
                  <cite>— {quote.name}</cite>
                </blockquote>
              ))}
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 7
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`
