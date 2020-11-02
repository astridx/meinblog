---
date: 2020-10-06
title: 'Karten mit Mapbox GL vergleichen - Das Plugin Swipe'
template: post
thumbnail: '../../thumbnails/mapboxgl.png'
slug: mapboxgl-swipe
categories:
  - MapboxGL
tags:
  - MapBoxGL
  - geografische Daten
  - Geoinformationssystem
  - JavaScript-Bibliothek
  - Vektor-Tiles
  - Karten
  - Swipe
---

Jede Kartenansicht hat Vor- und Nachteile. Ideal ist es, wenn man Karten direkt vergleicht. Das nächste Beispiel zeigt, wie zwei unterschiedliche Style übereinanderlegt und den oberen verschiebbar macht. So vergleicht man einzelne Stellen direkt per Wischtechnik.

[![Full Screen Map Gatsby Mapbox GL Starter with Swipe to compare](https://user-images.githubusercontent.com/9974686/97810147-16d77300-1c72-11eb-8573-d464b249af22.png)](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/map-swipe)

```html {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/mapboxexamples/master/plugins/mapbox-gl-compare-swipe-between-maps.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Swipe between maps</title>
    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
      rel="stylesheet"
    />
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      #map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }
    </style>
  </head>

  <body>
    <style>
      body {
        overflow: hidden;
      }

      body * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }
    </style>
    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.js"></script>
    <link
      rel="stylesheet"
      href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.css"
      type="text/css"
    />
    <div id="comparison-container">
      <div id="before" class="map"></div>
      <div id="after" class="map"></div>
    </div>
    <script>
      mapboxgl.accessToken = '<Zugriffstoken>'
      var beforeMap = new mapboxgl.Map({
        container: 'before',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [7.221275, 50.326111],
        zoom: 15,
      })

      var afterMap = new mapboxgl.Map({
        container: 'after',
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [7.221275, 50.326111],
        zoom: 15,
      })

      // A selector or reference to HTML element
      var container = '#comparison-container'

      var map = new mapboxgl.Compare(beforeMap, afterMap, container, {
        // Set this to enable comparing two maps by mouse movement:
        // m ousemove: true
      })
    </script>
  </body>
</html>
```

[Demo](https://astridx.github.io/mapboxexamples/plugins/mapbox-gl-compare-swipe-between-maps.html)  
[Quellcode](https://github.com/astridx/mapboxexamples/blob/master/plugins/mapbox-gl-compare-swipe-between-maps.html)  
[Gatsby Starter mit dieser Funktion](https://github.com/astridx/gatsby-starter-mapbox-examples) - [Gatsby Starter Demo](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/)
