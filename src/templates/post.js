import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SidebarUnten from '../components/SidebarUnten'
import SidebarOben from '../components/SidebarOben'
import SidebarUeberTitel from '../components/SidebarUeberTitel'
import Suggested from '../components/Suggested'
import SEO from '../components/SEO'
import Comment from '../components/Comment'

import config from '../utils/config'

export default function PostTemplate({ data, pageContext }) {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  const commentBox = React.createRef()

  useEffect(() => {
    const commentScript = document.createElement('script')
    const theme =
      typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
        ? 'github-dark'
        : 'github-light'
    commentScript.async = true
    commentScript.src = 'https://utteranc.es/client.js'
    commentScript.setAttribute('repo', 'astridx/meinblog')
    commentScript.setAttribute('issue-term', 'pathname')
    commentScript.setAttribute('id', 'utterances')
    //commentScript.setAttribute('theme', theme)
    commentScript.setAttribute('crossorigin', 'anonymous')
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(commentScript)
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`)
    }
  }, []) // eslint-disable-line

  function getGitMarkdownUrl() {
    const pathConst = '/content/posts/'
    const gitURL = 'https://github.com/astridx/meinblog'
    const sliceIndex =
      post.fileAbsolutePath.indexOf(pathConst) + pathConst.length
    const markdownFileGitPath = post.fileAbsolutePath.slice(sliceIndex)
    const blogPostOnGit = `${gitURL}/blob/master/content/posts/${markdownFileGitPath}`
    return blogPostOnGit
  }

  const gitMarkdownUrl = getGitMarkdownUrl()

  return (
    <Layout>
      <SidebarUeberTitel post={post} />
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />
      <header className="article-header medium">
        <h1>{post.frontmatter.title}</h1>
        <a href={gitMarkdownUrl} rel="noreferrer" target="_blank">
          Ändere diesen Beitrag
        </a>
      </header>
      <SidebarOben post={post} />
      <section className="post">
        <article>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
        <a href={gitMarkdownUrl} rel="noreferrer" target="_blank">
          Ändere diesen Beitrag
        </a>
      </section>
      <div id="utterances">
        <h2>Comments</h2>
        <Comment commentBox={commentBox} />
      </div>

      <Suggested previous={previous} next={next} />
      <SidebarUnten post={post} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fileAbsolutePath
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
            fixed(width: 80, height: 80) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
