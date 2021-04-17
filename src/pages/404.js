import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import config from '../utils/config'

export default function FourOhFour() {
  return (
    <Layout>
      <Helmet title={`Nichts gefunden | ${config.siteTitle}`} />
      <SEO />
      <h1>Nothing found</h1>
      <p>
        This was probably an error or the page does not yet exist in this
        language.
      </p>
      <h1>Nichts gefunden</h1>
      <p>
        Dies war wahrscheinlich ein Fehler oder die Seite existiert noch nicht
        in dieser Sprache.
      </p>
    </Layout>
  )
}
