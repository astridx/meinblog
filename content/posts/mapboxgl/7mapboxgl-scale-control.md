---
date: 2020-10-08
title: 'Mapbox GL - Maßstab'
template: post
thumbnail: '../../thumbnails/mapboxgl.png'
slug: mapboxgl-scale-control
categories:
  - MapboxGL
tags:
  - MapBoxGL
  - geografische Daten
  - Geoinformationssystem
  - JavaScript-Bibliothek
  - Vektor-Tiles
  - Karten
  - Maßstab
  - Scale Control
---

Kennt man sich in einer Gegend nicht aus, ist ein Maßstab hilfreich.

[![Full Screen Map with Scale Control Gatsby Mapbox GL Starter](https://user-images.githubusercontent.com/9974686/97810150-18a13680-1c72-11eb-8843-2e16801738e9.png)](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/map-scale-control)

```html {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/mapboxexamples/master/examples/scale_control.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Scale Control Map Box GL Beispiel</title>
    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
      rel="stylesheet"
    />
  </head>

  <body>
    <div id="map" style="width: 100vw; height: 100vh;"></div>
    <script>
      mapboxgl.accessToken = '<Zugriffstoken>'
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [7.2, 50.3],
        zoom: 12,
      })
      var scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'metric',
      })
      map.addControl(scale)
    </script>
  </body>
</html>
```

Alle
Optionen sind in der [MapBox GL Dokumentation](https://docs.mapbox.com/mapbox.js/api/v3.3.1/l-control-scale/) beschrieben.

[Demo](https://astridx.github.io/mapboxexamples/plugins/mapbox-gl-compare-swipe-between-maps.html)  
[Quellcode](https://github.com/astridx/mapboxexamples/blob/master/plugins/mapbox-gl-compare-swipe-between-maps.html)  
[Gatsby Starter mit dieser Funktion](https://github.com/astridx/gatsby-starter-mapbox-examples) - [Gatsby Starter Demo](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/)
