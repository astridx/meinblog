require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Astrid Günther',
    author: {
      name: 'Astrid Günther',
    },
    pathPrefix: '/',
    siteUrl: 'https://blog.astrid-guenther.de/',
    description:
      'Autorin und Softwareentwicklerin. Das ist mein digitaler Garten..',
    feedUrl: 'https://blog.astrid-guenther.de/rss.xml',
    logo: 'https://blog.astrid-guenther.de/logo.png',
  },
  plugins: [
    // ===================================================================================
    // Meta
    // ===================================================================================
    {
      resolve: 'gatsby-plugin-htaccess',
      options: {
        https: true,
        www: false,
        SymLinksIfOwnerMatch: true,
        host: 'blog.astrid-guenther.de', // if 'www' is set to 'false', be sure to also remove it here!
        redirect: [
          'RewriteRule ^not-existing-url/?$ /existing-url [R=301,L,NE]',
          {
            from: 'my-domain.com',
            to: 'mydomain.com',
          },
          {
            from: 'my-other-domain.com',
            to: 'mydomain.com',
          },
        ],
        custom: `
            # X-XSS-Protection
            <IfModule mod_headers.c>
              Header set X-XSS-Protection "1; mode=block"
            </IfModule>

            # X-Frame-Options
            <IfModule mod_headers.c>
              Header set X-Frame-Options "SAMEORIGIN"
            </IfModule>

            # X-Content-Type-Options
            <IfModule mod_headers.c>
              Header set X-Content-Type-Options "nosniff"
            </IfModule>
            
            # Strict-Transport-Security
            <IfModule mod_headers.c>
              Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"
            </IfModule>
            
            # Referrer-Policy
            <IfModule mod_headers.c>
              Header set Referrer-Policy "same-origin"
            </IfModule>
            
            # Feature-Policy
            <IfModule mod_headers.c>
              Header set Feature-Policy "geolocation 'self'; vibrate 'none'"
            </IfModule>
            
            # Content-Security-Policy - Example 3
            <IfModule mod_headers.c>
              Header set Content-Security-Policy "default-src https:; font-src https: data:; img-src https: data:; script-src https:; style-src https:;"
            </IfModule>            
        `,
      },
    },

    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'content:encoded': edge.node.html },
                    { author: 'info@astrid-guenther.de' },
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 30,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug 
                      }
                      frontmatter {
                        title
                        date
                        template
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Astrid Günther | RSS Feed',
          },
        ],
      },
    },

    // Webmentions
    { 
      resolve: "gatsby-source-webmentions",
      options: {
        DOMAIN: "blog.astrid-guenther.de", // without https and any slashes
        TOKEN: process.env.WEBMENTIONS_TOKEN, // token from webmention.io
        perPage: 100, // optional
      },
    },   

    // ===================================================================================
    // Images and static
    // ===================================================================================

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`,
      },
    },

    // ===================================================================================
    // Markdown
    // ===================================================================================

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          `gatsby-remark-vscode`,
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              // linkImagesToOriginal: false,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
            },
          },
        ],
      },
    },

    // ===================================================================================
    // Search
    // ===================================================================================

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: {
          encode: 'icase',
          tokenize: 'forward',
          async: false,
        },
        query: `
          {
            allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" } } }) {
              nodes {
                id
                frontmatter {
                  title
                  tags
                  slug
                  date(formatString: "MMMM DD, YYYY")
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'tags'],
        store: ['id', 'slug', 'title', 'tags', 'date'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: `/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            tags: node.frontmatter.tags,
            categories: node.frontmatter.categories,
            date: node.frontmatter.date,
          })),
      },
    },
  ],
}
