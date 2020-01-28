const config = {
  siteTitle: 'Astrid Günther',
  siteTitleShort: 'Astrid Günther',
  siteTitleAlt: 'Astrid Günther',
  siteLogo: '/logos/logo-1024.png',
  siteUrl: 'https://blog/astrid-guenther.de/',
  repo: 'https://github.com/astridx/blog',
  pathPrefix: '',
  dateFromFormat: 'DD-MM-YYYY',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'Astrid Günther ist eine Frontend-Softwareentwicklerin und Autorin, die sich auf modernes JavaScript, Geoinformationssystem und Joomla spezialisiert hat.',
  siteRss: '/rss.xml',
  googleAnalyticsID: 'UA-42068444-1',
  postDefaultCategoryID: 'Tech',
  newsletter: 'https://astrid.substack.com',
  newsletterEmbed: 'https://astrid.substack.com/embed',
  userName: 'Astrid',
  userEmail: 'info@astrid-guenther.de',
  userTwitter: 'astridguenther',
  menuLinks: [
    {
      name: 'Über mich',
      link: '/ich/',
    },
    {
      name: 'Artikel',
      link: '/blog/',
    },
    {
      name: 'Kontakt',
      link: '/kontakt/',
    },
  ],
  themeColor: '#3F80FF',
  backgroundColor: '#eeeeee',
}

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`

module.exports = config
