---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-11-07
title: 'Gatsby Blog mit maplibre GL JS unter Verwendung von React Hooks'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: maplibre-blog-with-gatsby
langKey: de
categories:
  - MaplibreGL
tags:
  - MaplibreGL
  - geografische Daten
  - Geoinformationssystem
  - JavaScript-Bibliothek
  - Vektor-Tiles
  - Karten
  - Gatsby
---

Ich gestalte gerne Webseiten mit [Gatsby](https://www.gatsbyjs.com/) und habe vor kurzem angefangen, [MapLibre GL](https://maplibre.org/) zu benutzen. Ich wünsche mir, beides zu kombinieren. Die Idee ist, einen Reiseblog zu erstellen, bei dem die Karte den Textinhalt verdeutlicht, indem sie dynamisch in den relevanten Bereich zoomt. Idealerweise werden die Orte aus einem Blogbeitrag mit einem Marker markiert. Beim Navigieren zwischen verschiedenen Beiträgen hebt die digitale Map kontinuierlich die neuen Bereiche hervor, anstatt jedes Mal die gesamte Karte zu aktualisieren. Dadurch ist es für den Leser leichter, den räumlicher Kontext zu erkennen.

## Einrichtung

Im nachfolgenden Beispielcode gehe ich nicht auf jede einzelne Codezeile ein. Dafür stelle ich das Ergebnis online in meinem [Github Repo](https://github.com/astridx/gatsby-maplibre-blog-tutorial) zur Verfügung. Der Branch `main` ist für MapLibre GL in Version 1.x erstellt. Der Branch `test_maplibre_v2` enthält Ergänzungen für MapLibre GL 2.x.

> Ich gehe davon aus, dass du mit Gatsby und React vertraut bist und die grundlegenden Abhängigkeiten installiert hast: Erste Schritte mit [React](https://de.reactjs.org/docs/getting-started.html) oder [Gatsby](https://www.gatsbyjs.com/docs/tutorial/)

Als erstes erstellen wir ein leeres Gatsby-Projekt. Ich verwende das von Gatsby zur Verfügung gestellt [Startprojekt](https://www.gatsbyjs.com/docs/starters/). So ist das Wesentliche vorkonfiguriert. Das Endergebnis dieses Tutorials ist eine Boilerplate-Struktur. Passe die im Anschluß gerne an deine individuellen Bedürfnisse an.

```
$ gatsby new gatsby-maplibre-blog
```

Nachdem du das Projekt erstellt hast, wechsele mittels `cd gatsby-maplibre-blog` in das Projektverzeichnis und rufe `gatsby develop` auf. Als Ergebnis siehst du die folgende Ausgabe unter der URL `http://localhost:8000/` im Browser:

![Ein Bildschirmfoto des Gatsby-Standard-Starters](/images/bloggatsby1.png)

Um etwas aufzuräumen habe ich im Ordner `src` die Dateien `components/layout.js`, `pages/404.js` und `pages/index.js` abgeändert.

> Wenn du mit Gatsby vertraut bist, kannst du auch noch weitere Inhalte des Boilerplates löschen. Um diese Beispiel übersichtlich zu halten, reicht das Ändern der Dateien `components/layout.js`, `pages/404.js` und `pages/index.js` aus. Nachfolgend siehst du den von mir ausgewechselten Code.

```js
// index.js
import React from 'react'
import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h1>Reise Blog</h1>
  </Layout>
)

export default IndexPage
```

```js
// layout.js
import React from 'react'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
```

```js
// 404.js
import React from 'react'

const NotFoundPage = () => (
  <>
    <h1>Page Not Found</h1>
  </>
)

export default NotFoundPage
```

Weiterhin habe ich die Datei `gatsby-config.js` aufgeräumt. Auch hier wollte ich mit einem Minimum beginnen. So habe ich eine Menge entfernt und den Quellpfad der Datei in `content` geändert.

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Gatsby MapLibre Blog`,
    description: ``,
    author: `Me`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
```

Zusätzlich stelle ich sicher, dass es den Ordner namens `content` im Stammverzeichnis meines Projekts gibt. Weil es ihn im Projekt noch nicht gibt, lege ich ihn an. Wir benötigen ihn im Moment nicht, aber hier werde ich später Markdown-Dateien für Blogbeiträge anlegen.

```
mkdir content
```

Starte an dieser Stelle den Entwicklungsserver neu, um sicherzustellen, dass kein Fehler vorliegt. Führe `gatsby develop` erneut aus. Wenn du keine Fehlermeldungen siehst ist alles gut.

![A screenshot of Gatsby default starter after tidy up](/images/bloggatsby2.png)

## MapLibre GL JS installieren

Wir werden MapLibre GL JS von NPM installieren. Du kannst [der Anleitung](https://www.npmjs.com/package/maplibre-gl) folgen. Im Grunde genommen reicht es aus, den nachfolgenden Befehl im Terminal auszuführen:

```
$ npm i maplibre-gl
```

> Anmerkung: Die aktuelle Version von `maplibre-gl` ist `2.0.0-pre.6` zum Zeitpunkt des Schreibens. Ich möchte diese Version installieren, auch wenn es keine stabile Version ist. Deshalb rufe ich `npm i maplibre-gl@2.0.0-pre.6` auf.

Das NPM Paket beinhaltet eine CSS-Datei. Diese werde ich später direkt aus dem npm-Modul in meine Komponente importiere.

> Alternativ ist es möglich, die CSS-Datei mittels der Zeile `<link href='https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css' rel='stylesheet' />` im Kopfbereich der [statischen HTML-Seite zu importieren](https://www.gatsbyjs.com/docs/custom-html/). MapLibre verwendet [unpkg.com](https://github.com/maplibre/maplibre-gl-js/blob/main/docs/README-unpkg.md).

## Die Karte anzeigen

Ich möchte, dass dieselbe Karte in allen Blogeinträgen verwendet wird. Anstatt also auf jeder Seite eine Karte hinzuzufügen, werde ich sie in die Komponente `Layout` einfügen. So wird jede Seite meiner Website die Karte beinhalten. Um den Code wiederverwendbar zu machen, werde ich eine separate Komponente namens `Map` erstellen. Beginnen wir mit der Datei `components/map.js`.

```js
// map.js
import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapContainerStyle = {
  width: '100%',
  height: '120px',
}

const Map = () => {
  const mapContainerRef = useRef(null)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-0.687787, 38.185674462487874],
      zoom: 10,
    })
    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    setMap(map)

    return () => map.remove()
  }, [])

  return <div ref={mapContainerRef} style={mapContainerStyle} />
}

export default Map
```

> Der Kartenstil 'https://demotiles.maplibre.org/style.json' zeigt eine sehr einfach gehaltene Karte an. Diese ist für Demoseiten ideal, weil kein Zugriffstoken notwendig ist. Sieh dir das [Beispiel](https://maplibre.org/maplibre-gl-js-docs/example/simple-map/) in der MapLibre Dokumentation an, um weitere Informationen zu erhalten. Beispiele mit detaillierteren Karten findest du ebenfalls in der [MapLibre Dokumentation](https://maplibre.org/maplibre-gl-js-docs/) inklusive Erläuterungen zur Nutzung von Tokens.

Und integriere die Kartenkomponente in die Datei ´layout.js´.

```js
// layout.js
import React from 'react'
import PropTypes from 'prop-types'
import Map from './map'

const Layout = ({ children }) => {
  return (
    <>
      <Map />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
```

Starte an dieser Stelle den Entwicklungsserver neu, um sicherzustellen, dass die Karte korrekt angezeigt wird. Führe `gatsby develop` erneut aus. Wenn du die Karte im oberen Bereich siehst ist alles gut.

![Anzeige einer Karte auf der Indexseite](/images/bloggatsby3.png)

Ich verwende React Hooks - `useRef()` um auf das Map Container DOM Element zuzugreifen. `UseState()`, um das Map-Objekt als Status zu speichern, so dass ich den Wert in anderen Teilen der Komponente verwenden kann, und `UseEffect()`, um das Map-Objekt zu erstellen, wenn die Komponente aktiviert wird. Das leere Abhängigkeits-Array als zweites Argument für `useEffect()` ist wichtig. Wenn du das zweite Argument entfernst, wirst du feststellen, dass die Funktion in eine Endlosschleife gerät. Das liegt daran, dass `useEffect()` immer dann ausgeführt wird, wenn sich der Zustand ändert. Da wir `setMap(map)` innerhalb desselben Hooks verwenden, wird es immer wieder ausgeführt. Durch das leere Array wird der Effekt-Hook nur einmal ausgeführt, wenn die Komponente initialisiert wird. Das ist das was wir erzielen möchten. Uns ist wichtig, dass nur einmal eine neue Map erstellt wird. Danach soll dieselbe Map verwendet werden. Mit `return () => map.remove()` wird aufgeräumt, wenn die Komponente entfernt wird.

## Marker hinzufügen

Erstellen wir nun einige Marker auf der Karte. Jeder Blogbeitrag wird ein Array von Ortsdaten enthalten, und ich möchte für jeden Ort eine Markierung erstellen. Später wird dies über das Formatieren der Markdown-Dateien erfolgen, aber für den Anfang erstellen wir ein einfaches Objekt mit den Koordinaten als Datenquelle.

```js
// on top of map.js
const places = [
  {
    name: 'Spanien',
    longitude: -0.687787,
    latitude: 38.185674462487874,
  },
  {
    name: 'Germany',
    longitude: 7.587787,
    latitude: 50.7438,
  },
  {
    name: 'Frankreich',
    longitude: 3.687787,
    latitude: 45.753,
  },
]
```

> Die Koordinaten meiner Plätze sind mir bekannt. Dies ist nicht in jedem Anwendungsfall so. Eventuell kennst du nur die Adreese oder den Namen eines POI. In diesem Fall wäre es schön, wenn ein Dienst integriert wäre, der anhand eines Textes die Koordinate errechnet. Ein solcher Dienst nennt sich Geocoding. Falls du einen solchen integrieren möchtest, schaue dir die Variante von Openstreetmap an. Dies ist [Nominatim](https://nominatim.org/).

Als nächstes werde ich zwei neue Komponenten erstellen: `Marker` and `Markers`. Beide implementiere ich in der Datei `markers.js`

```js
// markers.js
import React, { useRef, useEffect } from 'react'
import maplibregl from 'maplibre-gl'

const Marker = ({ map, place }) => {
  const markerRef = useRef()

  useEffect(() => {
    const marker = new maplibregl.Marker(markerRef)
      .setLngLat([place.longitude, place.latitude])
      .addTo(map)

    return () => marker.remove()
  })

  return <div ref={markerRef} />
}

const Markers = ({ map, places }) => {
  return (
    <>
      {places &&
        places.map((place) => (
          <Marker key={place.name} map={map} place={place} />
        ))}
    </>
  )
}

export default Markers
```

Die Komponente `Markers` verwendet zwei Eigenschaften der Komponente `Map`. In React werden die Eigenschaften 'props' genannt. Das erste 'props' ist ein Verweis auf die Karte 'map'. Das zweite `props` sind die Daten der Marker. Diese geben wir in der Eigenschaft 'Places' an die Komponente 'Marker' weiter. Diese Komponente kümmert sich dann um die Darstellung auf der Karte.

Ich verwende die [Turf.js-Bibliothek](http://turfjs.org/), um den Bereich der Karte zu berechnen, der angezeigt werden soll. Dieser Bereich wird als Bounding Box bezeichnet. Ich möchte, dass alle Markierungen, die zum Blogbeitrag gehören, sichtbar sind. Es kann also sein, dass die Bounding Box einen kleinen Ausschnitt der Welt darstellt. Es kann aber auch sein, dass die ganze Welt relevant ist. Bei jedem neuen Aufruf ist es daher wichtig, dass die Karte den Mittelpunkt und die Zoomstufe neu berechnet. Neben `Turf.js` installiere ich `@turf/helpers`, damit die Werte in ein GeoJson-Objekt umgewandelt werden. Das ist es, was `Turf.js` erwarten.

```
$ npm install @turf/bbox @turf/helpers
```

In the `map.js`, I will create a new `useEffect()` hook. The first effect hook we used was to run *once* to create a new map, but the markers will be created and removed many times whenever we navigate between pages, so the new effect hook with different dependency array will be necessary.

```js
// map.js

import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'
import { multiPoint } from '@turf/helpers'
import Markers from './markers'
import 'maplibre-gl/dist/maplibre-gl.css'

// ... variables

const Map = () => {
  // add new effect hook
  useEffect(() => {
    if (!map) return

    if (places.length !== 0) {
      const coords = []
      places.forEach((place) => {
        coords.push([place.longitude, place.latitude])
      })
      const feature = multiPoint(coords)
      const box = bbox(feature)

      map.fitBounds(
        [
          [box[0], box[1]],
          [box[2], box[3]],
        ],
        {
          padding: 20,
          maxZoom: 14,
          duration: 2000,
        }
      )
    } else {
      map.easeTo({
        center: [-73.9856, 40.7497],
        zoom: 10,
        duration: 2000,
      })
    }
  }, [map])

  return (
    <div ref={mapContainerRef} style={mapContainerStyle}>
      {places && map && <Markers map={map} places={places} />}
    </div>
  )
}

export default Map
```

![Neu hinzugefügte Marker](/images/bloggatsby4.png)

Wir haben jetzt Marker auf der Karte für einen Ort in Spanien, einen Ort in Frankreich und einen in Deutschland. MapLibre bietet sehr nützliche Methoden wie `fitBounds()` und `easeTo()`. Es gibt noch mehr Funktionen und Optionen. Sieh dir die MapLibre Dokumentation an.

## Hinzufügen von Markdown-Dateien

Es ist an der Zeit, die Daten von echten Blog-Einträgen anstelle des "Places"-Objekts zu verwenden. Ich habe Markdown `.md`-Dateien im `content`-Ordner erstellt, welche die Daten für die Marker beinhalten. Hier ist ein Beispiel (`content/spanien.md`):

```
---
title: Spanien
date: 2021-12-27
places:
- {
    name: "Spanien",
    longitude: -0.687787,
    latitude: 38.185674462487874,
  }
---

Die Anreise war ein Abenteuer.
```

## Seiten (Pages) generieren

Um Seiten aus Markdown-Seiten in Gatsby zu generieren, sind zusätzliche Schritte erforderlich. Hier gehe ich nur auf den Code ein, der für unseres Projekts relevant ist. Installiere als erstes das Plugin `gatsby-transformer-remark`.

```
$ npm install gatsby-transformer-remark
```

Dann aktualisiere die Dateien `gatsby-config.js` und `gatsby-node.js` so, dass das Plugin `gatsby-transformer-remark` eingebunden wird.

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Gatsby MapLibre Blog`,
    description: ``,
    author: `Me`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
```

```js
// gatsby-node.js
const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /maplibre-gl/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/postTemplate.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
```

Wir erstellen die Datei `./src/templates/postTemplate.js`, welche als Template für unsere Markdown-Dateien verwendet wird.

```js
// postTemplate.js
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const PostTemplate = ({ data }) => {
  const frontmatter = data.markdownRemark.frontmatter
  const html = data.markdownRemark.html

  return (
    <Layout>
      <div>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <Link to="/">Back to Index</Link>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        places {
          name
          longitude
          latitude
        }
      }
    }
  }
`
```

Nun ist es erforderlich den Entwicklungsserver neu zu starten, da wir die `gatsby-node.js` aktualisiert haben. Wenn alles gut geht, wird Gatsby Seiten für uns generieren.

## Add Navigation

Damit wir die einzelnen Seiten aufrufen können, fügen wir eine einfache Navigation in einer neuen `PostList` Komponente in der Datei `postList.js` hinzu. Wir verwenden `useStaticQuery`, um GraphQL Abfragen zu nutzen.

```js
// components/postList.js
import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`

const PostList = () => {
  const data = useStaticQuery(query)
  const nodes = data.allMarkdownRemark.nodes

  return (
    <ul
      style={{
        listStyleType: 'none',
        padding: 0,
      }}
    >
      {nodes.map((node) => {
        const title = node.frontmatter.title
        return (
          <li key={title}>
            <Link to={node.fields.slug}>{title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default PostList
```

Am Ende integrieren wir die Navigation `<PostList />` in das Layout, also in die Datei `layout.js`.

```js
// components/layout.js
import React from 'react'
import PropTypes from 'prop-types'
import Map from './map'
import PostList from './postList'

const Layout = ({ children }) => {
  return (
    <>
      <Map />
      <div style={{ margin: '0 40px' }}>
        <main>{children}</main>
        <PostList />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
```

Wir können jetzt zwischen den Seiten navigieren. Alles passt aber noch nicht. Die Karte wird bei jedem Laden der Seite neu geladen. Das verursacht unnötige API-Aufrufe und beeinträchtigt die Benutzerfreundlichkeit. Ein weiteres Problem ist, dass die Marker auf allen Seiten gleich sind. Wir haben bisher die GraphQL-Abfragedaten noch nicht mit unserer Kartenkomponente verbunden. Wir benötigen Props , um das zu handhaben.

## Gatsby Browser API

Warum die Karte neu geladen wird, [findest du auf der Gatsby-Website](https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting) erklärt. Kurz: Wir müssen die umhüllende `Layout` Komponente von unseren Seiten entfernen und die `wrapPageElement` Browser API in `gatsby-browser.js` verwenden. Mehr Informationen zu dieser Schnittstelle findest du unter [der API-Referenz](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement).
Verwendet den gleichen Code in `gatsby-ssr.js` für Server-Side Rendering.

```js
// gatsby-browser.js & gatsby-ssr.js
const React = require('react')
const Layout = require('./src/components/layout').default

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
```

> Denke daran, alle Layout-Komponenten, zu entfernen. Es tritt zwar kein Fehler auf, aber du siehst die Karte zweimal.

Wenn du nun zwischen den Seiten navigierst, wird die Karte nicht neu geladen. Im nächsten Schritt sorgen wir nun dafür, dass sich der Inhalt der Karte dynamisch an die Eigenschaften des Blogbeitrags anpasst.

![Pages and navigation and no reload](/images/bloggatsby5.png)

## Die Kartenkomponente für die Verwendung von props anpassen.

Um unterschiedliche Koordinaten von den Blogbeiträgen an unsere "Map"-Komponente zu senden, müssen wir die `Map`-Komponente ändern. Wir verwenden wieder Eigenschaften oder `props`.

```js
// in map.js

// ... remove const places

// add props & update places to props.places
const Map = props => {
	// ...
  useEffect(() => {
    if (!map) return

    if (props.places && props.places.length !== 0) {
      const coords = []
      props.places.forEach(place => {
        coords.push([place.longitude, place.latitude])
      })
    // ...
  }, [map, props.places])

  // ...

  useEffect(() => {
    if (!map) return

    if (props.places && props.places.length !== 0) {
      const coords = []
      props.places.forEach(place => {
        coords.push([place.longitude, place.latitude])
      })
      const feature = multiPoint(coords)
      const box = bbox(feature)

      map.fitBounds(
        [
          [box[0], box[1]],
          [box[2], box[3]],
        ],
        {
          padding: 20,
          maxZoom: 14,
          duration: 2000,
        }
      )
    } else {
      map.easeTo({
        center: [-73.9856, 40.7497],
        zoom: 10,
        duration: 2000,
      })
    }
  }, [map, props.places])

  return (
    <div ref={mapContainerRef} style={mapContainerStyle}>
      {props.places && map && <Markers map={map} places={props.places} />}
    </div>
  )
}
```

## Die Koordinaten in der Layout-Komponente verwenden

Last but not least werden die Koordinaten an die Komponente `Layout` weiter gegeben. Ich verwende den `useState()`-Hook, weil die Daten für jede Seite unterschiedlich sind. So werden diese jedem neuen Seitenaufruf aktualisiert. Der `useEffect()`-Hook bewirkt, dass die Daten nur wenn `props` sich ändert aktualisiert werden.

```js
// components/layout.js
// ...
return (
  <>
    <Map places={places} />
    // ...
  </>
)
// ...
```

Das war's! Jetzt werden die Daten und Markierungen korrekt aktualisieren.

Todo

- Popup für jede Markierung hinzufügen
- Hinzufügen eines eigenen Markierungsdesigns (z.B. SVG)
- Hinzufügen von Marker-Animationen
- Hinzufügen von benutzerdefinierten Kartenstilen

## Referenzen

- [Mapbox React examples repo](https://github.com/mapbox/mapbox-react-examples): There are only a few examples but I got a lot of help from the repo as they covered almost everything I needed to know.
- [MapLibre examples](https://maplibre.org/maplibre-gl-js-docs/api/)
- [Mapbox Gatsby Blog with Hooks](https://erraticgenerator.com/blog/gatsby-blog-with-mapbox-gl-js-using-react-hooks/).
