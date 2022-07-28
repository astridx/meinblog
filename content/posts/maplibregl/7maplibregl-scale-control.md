---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-05-08
title: 'Maplibre GL - Maßstab'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: maplibregl-scale-control
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
  - Maßstab
  - Scale Control
---

Kennt man sich in einer Gegend nicht aus, ist ein Maßstab hilfreich.

[![Full Screen Map with Scale Control Gatsby Mapbox GL Starter](https://user-images.githubusercontent.com/9974686/97810150-18a13680-1c72-11eb-8843-2e16801738e9.png)](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/map-scale-control)

```html {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/maplibreexamples/main/examples/scale_control.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Scale Control Maplibre GL Beispiel</title>
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
  </head>

  <body>
    <div id="map" style="width: 100vw; height: 100vh"></div>
    <script>
      var map = new maplibregl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/streets/style.json?key=' +
          config.MAPTILER_TOKEN,
        center: [7.2, 50.3],
        zoom: 12,
      })
      var scale = new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: 'metric',
      })
      map.addControl(scale)
    </script>
  </body>
</html>
```

Alle Optionen sind in der [MapBox GL Dokumentation](https://docs.mapbox.com/mapbox.js/api/v3.3.1/l-control-scale/) beschrieben.

[Demo](https://astridx.github.io/maplibreexamples/examples/scale_control.html)  
[Quellcode](https://github.com/astridx/maplibreexamples/blob/main/examples/scale_control.html)  
[Gatsby Starter mit dieser Funktion](https://github.com/astridx/gatsby-starter-mapbox-examples) - [Gatsby Starter Demo](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/)
