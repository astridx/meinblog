---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2020-10-09
title: 'Mapbox GL - Ebenen ein- und ausblenden'
template: post
thumbnail: '../../thumbnails/mapboxgl.png'
slug: mapboxgl-show-and-hide-layers
langKey: de
categories:
  - MapboxGL
tags:
  - MapBoxGL
  - geografische Daten
  - Geoinformationssystem
  - JavaScript-Bibliothek
  - Vektor-Tiles
  - Karten
  - Layer
  - Layer-Switcher
---

Erstelle einen benutzerdefinierten Ebenenumschalter, um verschiedene Datensätze anzuzeigen.

[![Full Screen Map with GeoJSON and Layer Control Layer Switcher Gatsby Mapbox GL Starter](https://user-images.githubusercontent.com/9974686/97810146-15a64600-1c72-11eb-8043-2ddf5c0e81f6.png)](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/map-show-and-hide-layers)

Das Beispiel im Bild zeigt dir, wie du ein Dreieck und ein Polygon ein- und ausblendest. Dieses kommt aus dem unten verlinkten Gatsby-Starter und ist bewusst unkompliziert gehalten. Der nachfolgende Programmcode zeigt dir ein realeres Szenario, welches ebenfalls als Demo unten verlinkt ist.

```html {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/mapboxexamples/master/examples/show-and-hide-layers.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Show and hide layers</title>
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
      #menu {
        background: #fff;
        position: absolute;
        z-index: 1;
        top: 10px;
        right: 10px;
        border-radius: 3px;
        width: 120px;
        border: 1px solid rgba(0, 0, 0, 0.4);
        font-family: 'Open Sans', sans-serif;
      }

      #menu a {
        font-size: 13px;
        color: #404040;
        display: block;
        margin: 0;
        padding: 0;
        padding: 10px;
        text-decoration: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        text-align: center;
      }

      #menu a:last-child {
        border: none;
      }

      #menu a:hover {
        background-color: #f8f8f8;
        color: #404040;
      }

      #menu a.active {
        background-color: #3887be;
        color: #ffffff;
      }

      #menu a.active:hover {
        background: #3074a4;
      }
    </style>

    <nav id="menu"></nav>
    <div id="map"></div>

    <script>
      mapboxgl.accessToken = '<Zugriffstoken>'
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 15,
        center: [-71.97722138410576, -13.517379300798098],
      })

      map.on('load', function () {
        map.addSource('museums', {
          type: 'vector',
          url: 'mapbox://mapbox.2opop9hr',
        })
        map.addLayer({
          id: 'museums',
          type: 'circle',
          source: 'museums',
          layout: {
            visibility: 'visible',
          },
          paint: {
            'circle-radius': 8,
            'circle-color': 'rgba(55,148,179,1)',
          },
          'source-layer': 'museum-cusco',
        })

        map.addSource('contours', {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-terrain-v2',
        })
        map.addLayer({
          id: 'contours',
          type: 'line',
          source: 'contours',
          'source-layer': 'contour',
          layout: {
            visibility: 'visible',
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#877b59',
            'line-width': 1,
          },
        })
      })

      var toggleableLayerIds = ['contours', 'museums']

      for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i]

        var link = document.createElement('a')
        link.href = '#'
        link.className = 'active'
        link.textContent = id

        link.onclick = function (e) {
          var clickedLayer = this.textContent
          e.preventDefault()
          e.stopPropagation()

          var visibility = map.getLayoutProperty(clickedLayer, 'visibility')

          if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none')
            this.className = ''
          } else {
            this.className = 'active'
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible')
          }
        }

        var layers = document.getElementById('menu')
        layers.appendChild(link)
      }
    </script>
  </body>
</html>
```

[Demo](https://astridx.github.io/mapboxexamples/examples/show-and-hide-layers.html)  
[Quellcode](https://github.com/astridx/mapboxexamples/blob/master/examples/show-and-hide-layers.html)  
[Gatsby Starter mit dieser Funktion](https://github.com/astridx/gatsby-starter-mapbox-examples) - [Gatsby Starter Demo](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/)
[MapBox GL Beispiel](https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/)
<img src="https://vg07.met.vgwort.de/na/1448a443bd494367a2a2445963dd6aa4" width="1" height="1" alt="">
