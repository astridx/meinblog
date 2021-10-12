module.exports = {
  siteMetadata: {
    title: 'Astrid Günther',
    author: {
      name: 'Astrid Günther',
    },
    pathPrefix: '/',
    siteUrl: 'https://blog.astrid-guenther.de/',
    description:
      'Softwareentwicklerin und Open Source-Erstellerin. Das ist mein digitaler Garten.',
    feedUrl: 'https://blog.astrid-guenther.de/rss.xml',
    logo: 'https://blog.astrid-guenther.de/logo.png',
  },
  plugins: [
    // ===================================================================================
    // Meta
    // ===================================================================================
    `gatsby-plugin-catch-links`,
    'gatsby-plugin-dark-mode',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Astrid Günther',
        short_name: 'Astrid Günther',
        description:
          'Softwareentwicklerin und Open Source-Erstellerin. Das ist mein digitaler Garten.',
        start_url: '/',
        background_color: 'white',
        theme_color: '#16868F',
        display: 'minimal-ui',
        icon: `static/logo.png`,
      },
    },
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
                  categories: edge.node.frontmatter.tags,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
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
                        tags
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
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Solarized Light',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-footnotes`,
            options: {
              footnoteBackRefPreviousElementDisplay: 'inline',
              footnoteBackRefDisplay: 'inline',
              footnoteBackRefInnerText: '^', // Defaults to: "↩"
              //use if you want the Wikipedia style ^ link without an underline beneath it
              footnoteBackRefAnchorStyle: `text-decoration: none;`,
              //use "front" for Wikipedia style ^ links
              footnoteBackRefInnerTextStartPosition: 'front',
              useFootnoteMarkerText: false, // Defaults to false
              useCustomDivider: '<hr/><strong>References:</strong>', // Defaults to <hr/>
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,

    // ===================================================================================
    // ebook https://www.gatsbyjs.com/plugins/gatsby-plugin-ebook/
    // ===================================================================================
    /*'gatsby-plugin-ebook',
    {
      resolve: 'gatsby-plugin-ebook',
      options: {
        filename: 'JoomlaEn.epub',
      }
    },*/

    // ===================================================================================
    // language https://github.com/angeloocana/gatsby-plugin-i18n
    // ===================================================================================
    {
      resolve: `gatsby-plugin-i18n`,
      options: {
        langKeyDefault: 'de',
        langKeyForNull: 'de',
        prefixDefault: false,
        useLangKeyLayout: false,
      },
    },

    //
    //
    // htaccess https://github.com/AndreasFaust/gatsby-plugin-htaccess
    //
    //
    {
      resolve: 'gatsby-plugin-htaccess',
      options: {
        https: true,
        www: true,
        custom: [
          '<IfModule mod_headers.c>Header always set X-Frame-Options "DENY" "expr=%{CONTENT_TYPE} =~ m#text/html#i"</IfModule>',
          '<IfModule mod_headers.c>Header always set Feature-Policy microphone "none";</IfModule>',
          '<IfModule mod_headers.c>Header always set X-Content-Type-Options "nosniff"</IfModule>',
          '<IfModule mod_headers.c>Header set Strict-Transport-Security "max-age=31536000" env=HTTPS</IfModule>',
          '<IfModule mod_headers.c>Header always set Referrer-Policy "strict-origin-when-cross-origin" "expr=%{CONTENT_TYPE} =~ m#text\/(css|html|javascript)|application\/pdf|xml#i"</IfModule>',
        ],        
        redirect: [
          'RewriteRule ^not-existing-url/?$ /existing-url [R=301,L,NE]',
          {
            from: 'blog.astrid-guenther.de/ubuntu-docker-einrichten',
            to: 'blog.astrid-guenther.de/ubuntu-docker-einrichten-docker-lamp',
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
                  date(formatString: "DD.MM.YYYY")
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'body', 'tags'],
        store: ['id', 'slug', 'title', 'tags', 'date'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: `/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            tags: node.frontmatter.tags,
            date: node.frontmatter.date,
          })),
      },
    },
  ],
}
