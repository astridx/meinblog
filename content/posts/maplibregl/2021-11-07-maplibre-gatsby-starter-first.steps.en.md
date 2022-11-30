---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-11-07
title: 'Gatsby Blog with MapLibre GL JS and React Hooks'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: en/maplibre-blog-with-gatsby
langKey: en
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

I like to design websites with [Gatsby](https://www.gatsbyjs.com/) and have recently started using [MapLibre GL](https://maplibre.org/). I wish to combine the two. The idea is to create a travel blog where the map illustrates the text content by dynamically zooming into the relevant area. Ideally, the places from a blog post are marked with a marker. When navigating between different posts, the digital map continuously highlights the new regions instead of refreshing the entire map each time. This makes it easier for the reader to see the spatial context.

## Setup

In the following example code, I do not discuss every single line of code. Instead, I make the result available online in my [Github Repo](https://github.com/astridx/gatsby-maplibre-blog-tutorial). The branch `main` is created for MapLibre GL in version 1.x. The branch `test_maplibre_v2` contains additions for MapLibre GL 2.x.

> I assume you are familiar with Gatsby and React and have installed the basic dependencies: First steps with [React](https://de.reactjs.org/docs/getting-started.html) or [Gatsby](https://www.gatsbyjs.com/docs/tutorial/)

First, we create an empty Gatsby project. I use the [start project](https://www.gatsbyjs.com/docs/starters/) provided by Gatsby. This way the basics are pre-configured. The end result of this tutorial is a boilerplate structure. Feel free to adapt it to your individual needs afterwards.

```
$ gatsby new gatsby-maplibre-blog
```

After you have created the project, change to the project directory via `cd gatsby-maplibre-blog` and call `gatsby develop`. As a result, you will see the following output under the URL `http://localhost:8000/` in the browser:

![A screenshot of the Gatsby standard starter](/images/bloggatsby1.png)

To tidy things up a bit, I changed the files `components/layout.js`, `pages/404.js` and `pages/index.js` in the `src` folder.

> If you are familiar with Gatsby, you can also delete other contents of the boilerplate. To keep this example simple, it is enough to change the files `components/layout.js`, `pages/404.js` and `pages/index.js`. Below you can see the code I replaced.

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

I also cleaned up the file "gatsby-config.js". Here, too, I wanted to start with a minimum. So I removed a lot and changed the source path of the file to `content`.

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Gatsby maplibre Blog`,
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

I also make sure that the folder named `content` exists in the root directory of my project. Since it does not yet exist in the project, I create it. We don't need it at the moment, but I will create Markdown files for blog posts in it later.

```
mkdir content
```

At this point, restart the development server to make sure there is no error. Run `gatsby develop` again. If you see no error messages, everything is fine.

![A screenshot of Gatsby default starter after tidy up](/images/bloggatsby2.png)

## Install MapLibre GL JS

We will install MapLibre GL JS from NPM. You can follow [the instructions](https://www.npmjs.com/package/maplibre-gl). Basically, all you need to do is run the following command in the terminal:

```
$ npm i maplibre-gl
```

> Note: The current version of `maplibre-gl` is `2.0.0-pre.6` at the time of writing. I want to install this version, even though it is not a stable version. Therefore I call `npm i maplibre-gl@2.0.0-pre.6`.

The NPM package contains a CSS file. I will later import this directly from the npm module into my component.

> Alternatively, it is possible to import the CSS file using the line `<link href='https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css' rel='stylesheet' />` in the header of the [static HTML page](https://www.gatsbyjs.com/docs/custom-html/). MapLibre uses [unpkg.com](https://github.com/maplibre/maplibre-gl-js/blob/main/docs/README-unpkg.md).

## Show the map

I want the same map to be used in all blog entries. So instead of adding a map on each page, I will add it to the `layout` component. This way, every page on my website will include the map. To make the code reusable, I will create a separate component called `Map`. Let's start with the file `components/map.js`.

```
// map.js
import React, { useRef, useEffect, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

const mapContainerStyle = {
  width: "100%",
  height: "120px",
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
    map.addControl(new maplibregl.NavigationControl(), "top-right")

    setMap(map)

    return () => map.remove()
  }, [])

  return <div ref={mapContainerRef} style={mapContainerStyle} />
}

export default Map
```

> The map style 'https://demotiles.maplibre.org/style.json' displays a very simple map. This is ideal for demo sites because no access token is needed. See the [example](https://maplibre.org/maplibre-gl-js-docs/example/simple-map/) in the MapLibre documentation for more information. Examples with more detailed maps can also be found in the [MapLibre documentation](https://maplibre.org/maplibre-gl-js-docs/) including explanations on the use of tokens.

And integrate the map component into the file 'layout.js'.

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

At this point, restart the development server to ensure that the map is displayed correctly. Run `gatsby develop` again. If you see the map at the top, all is well.

![Displaying a map on the index page](/images/bloggatsby3.png)

I use React hooks - `useRef()` to access the Map Container DOM element. `UseState()` to store the Map object as state. So I can use the value in other parts of the component, and `UseEffect()` to create the Map object when the component is called. The empty dependency array in `useEffect()` is important. If you remove the second argument, you will find that the function goes into an infinite loop. This is because `useEffect()` is executed whenever the state changes. Since we use `setMap(map)` within the same hook, it will be executed over and over again. Because of the empty array, the effect hook is only executed once when the component is initialised. This is what we want to achieve. It is important to us that a new map is only created once. After that, the same map should be used. With `return () => map.remove()` we clean up when the component is removed.

## Add markers

Now let's create some markers on the map. Each blog post will contain an array of location data, and I want to create a marker for each location. Later this will be done via formatting the markdown files, but for now let's create a simple object with the coordinates as the data source.

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

> I know the coordinates of my places. This is not the case in every use case. You may only know the address or the name of a POI. In this case, it would be nice to have a service integrated that calculates the coordinate based on a text. Such a service is called geocoding. If you want to integrate one, have a look at the Openstreetmap variant. This is [Nominatim](https://nominatim.org/).

Next I will create two new components: `Marker` and `Markers`. I will implement both of them in the file `markers.js

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

The `Markers` component uses two properties of the `Map` component. In React, the properties are called `props`. The first `props` is a reference to the map `map`. The second `props` is the data of the markers. We pass these on to the `marker` component in the `places` property. This component then takes care of the display on the map.

I use the [Turf.js library](http://turfjs.org/) to calculate the area of the map that should be displayed. This area is called the bounding box. I want all markers belonging to the blog post to be visible. So it may be that the bounding box represents a small excerpt of the world. But it can also be that the whole world is relevant. For each new call, it is therefore important that the map recalculates the centre point and the zoom level. Next to `Turf.js` I install `@turf/helpers` so that the values are converted into a GeoJson object. This is what the `Turf.js` functions expect.

```
$ npm install @turf/bbox @turf/helpers
```

In the `map.js`, I will create a new `useEffect()` hook. The first effect hook we used was to run *once* to create a new map, but the markers will be created and removed many times whenever we navigate between pages, so the new effect hook with different dependency array will be necessary.

```js
// map.js

// add new modules
import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'
import { multiPoint } from '@turf/helpers'
import Markers from './markers'
import 'maplibre-gl/dist/maplibre-gl.css'

// ... variables

const Map = () => {
  // ... ref, state, useEffect

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

![Newly added markers](/images/bloggatsby4.png)

We now have markers on the map for a place in Spain, a place in France and one in Germany. MapLibre provides very useful methods like `fitBounds()` and `easeTo()`. There are even more functions and options. See the MapLibre documentation.

## Adding Markdown files

It's time to use the data from real blog entries instead of the `places` object. I have created Markdown `.md` files in the `content` folder which contain the data for the markers. Here is an example (`content/spainien.md`):

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

## Generating pages

To generate pages from Markdown pages in Gatsby, additional steps are required. Here I will only go into the code that is relevant to our project. First install `gatsby-transformer-remark`.

```
$ npm install gatsby-transformer-remark
```

Next, update the files `gatsby-config.js` and `gatsby-node.js` to include the plugin `gatsby-transformer-remark`.

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

We create the file `./src/templates/postTemplate.js`, which is used as a template for our Markdown files.

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

Now it is necessary to restart the development server because we have updated `gatsby-node.js`. If all goes well, Gatsby will generate pages for us.

## Add Navigation

In order to be able to call the individual pages, we add a simple navigation in a new `postList` component in the file `postList.js`. We use `useStaticQuery` to use GraphQL queries.

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

At the end we integrate the navigation `<PostList />` into the layout, i.e. into the file `layout.js`.

```js
// componentes/layout.js
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

We can now navigate between the pages. But everything does still not fit yet. The map is reloaded every time the page is loaded. This causes unnecessary API calls and affects usability. Another problem is that the markers are the same on all pages. We have not yet connected the GraphQL query data to our map component. We need props to handle this.

## Gatsby Browser API

Why the map reloads [can be found on the Gatsby website](https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting) explains. In short: we need to remove the wrapping `layout` component from our pages and use the `wrapPageElement` browser API in `gatsby-browser.js`. You can find more information about this interface at [the API reference](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement).
Use the same code in `gatsby-ssr.js` for server-side rendering.

```js
// gatsby-browser.js & gatsby-ssr.js
const React = require('react')
const Layout = require('./src/components/layout').default

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
```

> Remember to remove all layout components. No error will occur, but you will see the map twice.

If you now navigate between the pages, the map is not reloaded. In the next step, we make sure that the content of the map dynamically adapts to the properties of the blog post.

![Pages and navigation and no reload](/images/bloggatsby5.png)

## Adapt the map component to use props.

To send different coordinates from the blog posts to our "Map" component, we need to change the `Map` component. We use properties or `props` again.

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

## Using the coordinates in the layout component

Last but not least, the coordinates are passed on to the `layout` component. I use the `useState()` hook because the data is different for each page. So they are updated every time a new page is called. The `useEffect()` hook makes the data update only when `props` changes.

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

That's it! Now the data and markers will update correctly.

Todo

- Popup für jede Markierung hinzufügen
- Hinzufügen eines eigenen Markierungsdesigns (z.B. SVG)
- Hinzufügen von Marker-Animationen
- Hinzufügen von benutzerdefinierten Kartenstilen

## Referenzen

- [Mapbox React examples repo](https://github.com/mapbox/mapbox-react-examples): There are only a few examples but I got a lot of help from the repo as they covered almost everything I needed to know.
- [Maplibre examples](https://maplibre.org/maplibre-gl-js-docs/api/): Most of them are in vanilla JS but using the hooks we covered in this post, I think it would be fairly simple to translate them to React.
- [Mapbox Gatsby Blog with Hooks](https://erraticgenerator.com/blog/gatsby-blog-with-mapbox-gl-js-using-react-hooks/).
