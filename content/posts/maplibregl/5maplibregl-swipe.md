---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-05-06
title: 'Karten mit Mapbox GL vergleichen - Das Plugin Swipe'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: maplibregl-swipe
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
  - Swipe
---

Jeder Kartenstil hat Vor- und Nachteile. Ideal ist es, wenn man Karten direkt vergleicht. Das nächste Beispiel zeigt, wie zwei unterschiedliche Style übereinanderlegt und den oberen verschiebbar macht. So vergleicht man einzelne Stellen direkt per Wischtechnik.

[![Full Screen Map Gatsby Mapbox GL Starter with Swipe to compare](https://user-images.githubusercontent.com/9974686/97810147-16d77300-1c72-11eb-8573-d464b249af22.png)](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/map-swipe)

```html {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/maplibreexamples/main/plugins/maplibre-gl-compare-swipe-between-maps.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Swipe between maps</title>
    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
    <script src="../.env"></script>
    <script src="https://unpkg.com/maplibre-gl@1.14.0-rc.1/dist/maplibre-gl.js"></script>
    <link
      href="https://unpkg.com/maplibre-gl@1.14.0-rc.1/dist/maplibre-gl.css"
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
    <script src="maplibre-gl-compare.js"></script>
    <link rel="stylesheet" href="maplibre-gl-compare.css" type="text/css" />
    <div id="comparison-container">
      <div id="before" class="map"></div>
      <div id="after" class="map"></div>
    </div>
    <script>
      // https://cloud.maptiler.com/maps/
      var beforeMap = new maplibregl.Map({
        container: 'before',
        style:
          'https://api.maptiler.com/maps/hybrid/style.json?key=' +
          config.MAPTILER_TOKEN,
        center: [7.221275, 50.326111],
        zoom: 15,
      })

      var afterMap = new maplibregl.Map({
        container: 'after',
        style:
          'https://api.maptiler.com/maps/streets/style.json?key=' +
          config.MAPTILER_TOKEN,
        center: [7.221275, 50.326111],
        zoom: 15,
      })

      // A selector or reference to HTML element
      var container = '#comparison-container'

      var map = new maplibregl.Compare(beforeMap, afterMap, container, {
        // Set this to enable comparing two maps by mouse movement:
        // m ousemove: true
      })
    </script>
  </body>
</html>
```

[Demo](https://astridx.github.io/maplibreexamples/plugins/maplibre-gl-compare-swipe-between-maps.html)  
[Quellcode](https://github.com/astridx/maplibreexamples/blob/main/plugins/maplibre-gl-compare-swipe-between-maps.html)  
[Gatsby Starter mit dieser Funktion](https://github.com/astridx/gatsby-starter-mapbox-examples) - [Gatsby Starter Demo](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/)
