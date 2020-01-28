import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import config from '../../data/SiteConfig'
import publications from '../../data/publications'
import gatsby from '../../content/thumbnails/gatsby.png'

export default class PublicationsPage extends Component {
  render() {
    const logoMap = {
      Gatsby: gatsby,
    }

    const companyStr = Object.keys(logoMap)
      .join(', ')
      .replace(/, ([^,]*)$/, ' and $1')

    const pubs = Object.entries(publications)
    return (
      <Layout>
        <Helmet title={`Published Articles – ${config.siteTitle}`} />
        <div className="container">
          <header className="page-header">
            <h1>Publications</h1>
          </header>
          <div className="page">
            <p>I've written for {companyStr}.</p>
            {pubs.map((publication, i) => {
              const company = publication[0]
              const articles = publication[1]

              return (
                <article>
                  <h2 className="publication-company" id={company.replace(/\s/g, '')}>
                    <img src={logoMap[company]} alt="Company" />
                    {company}
                  </h2>
                  <ul key={i}>
                    {articles.map((article, i) => {
                      return (
                        <li key={i}>
                          <a href={article.path} target="_blank" rel="noopener noreferrer">
                            {article.title}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}
