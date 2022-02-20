import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'
import joomla from '../../content/thumbnails/joomla.png'
import github from '../../content/thumbnails/github.png'

const projectsList = [
  {
    name: 'Joomla Boilerplate',
    slug: 'boilerplate',
    tagline: 'A free, open source boilerplate for a Joomla Extension.',
    image: joomla,
    url: 'https://github.com/astridx/boilerplate/',
    writeup: '/en/der-weg-zu-joomla4-erweiterungen/',
    description: ``,
  },
]

export default function ProjectsIndex() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        'https://api.github.com/users/astridx/repos?per_page=100'
      )

      return repos.json()
    }

    getStars()
      .then((data) => {
        setRepos(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Helmet title={`Projects | ${config.siteTitle}`} />
      <SEO />

      <article>
        <header>
          <div className="container">
            <h1>Projekte</h1>
            <p className="description">
              Ein paar meiner Open-Source-Projekte. Alle{' '}
              <a href="https://github.com/astridx">auf GitHub</a>.
            </p>
          </div>
        </header>

        <section className="projects large container">
          {projectsList.map((project) => (
            <div className="project" key={project.name}>
              <h2>{project.name}</h2>
              {project.image && <img src={project.image} alt={project.name} />}
              <div className="links tags">
                {project.writeup && <Link to={project.writeup}>Doku</Link>}
                <a
                  href={`https://github.com/astridx/${project.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source
                </a>
              </div>
              <p className="description">{project.tagline}</p>
              <div className="stars">
                {repos.find((repo) => repo.name === project.slug) && (
                  <>
                    <img src={github} alt="Stargazers" />
                    <span>
                      <a
                        href={`https://github.com/astridx/${project.slug}/stargazers`}
                      >
                        {Number(
                          repos.find((repo) => repo.name === project.slug)
                            .stargazers_count
                        ).toLocaleString()}
                      </a>
                      {` stars on GitHub`}
                    </span>
                    <span></span>
                  </>
                )}
              </div>
            </div>
          ))}
        </section>
      </article>
    </>
  )
}

ProjectsIndex.Layout = Layout
