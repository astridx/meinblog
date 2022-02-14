---
description: 'desc'
shortTitle: 'short'
date: 2021-05-02
title: 'Maplibre GL Quickstart'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: maplibregl-quickstart
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
---

Zu Beginn benötigen wir ein [Zugriffstoken](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) und eine Stil-URL. Wir wählen anfangs einen der professionell gestalteten Stile. Möglich ist es, später einen eigenen Stil zu erstellen. In den Beispielen verwende ich Vektorkacheln von MapTiler. Besorge dir einen eigenen API-Schlüssel, wenn du MapTiler-Daten in deinem Projekt verwenden möchtest.

Als Erstes fügen wir die JavaScript- und CSS-Dateien in den `<head>` unserer HTML-Datei ein.

```html
...
<script src="https://unpkg.com/maplibre-gl@1.14.0-rc.1/dist/maplibre-gl.js"></script>
<link
  href="https://unpkg.com/maplibre-gl@1.14.0-rc.1/dist/maplibre-gl.css"
  rel="stylesheet"
/>
...
```

Dann schreiben wir den folgenden Code in den `<body>` unserer HTML-Datei.

```html
...
<div id="map" style="width: 100vw; height: 100vh"></div>

<script>
  var map = new maplibregl.Map({
    container: 'map',
    style:
      'https://api.maptiler.com/maps/streets/style.json?key=' +
      config.MAPTILER_TOKEN,
    center: [7.2, 50.3], // Startposition [lng, lat]
    zoom: 12, // Zoom
  })
</script>
...
```

Nachfolgend die vollständige Datei.

```html {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/maplibreexamples/main/quickstart.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Quickstart/Schnellstart MapLibre GL Beispiel</title>
    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
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
        center: [7.2, 50.3], // Startposition [lng, lat]
        zoom: 12, // Zoom
      })
    </script>
  </body>
</html>
```

Fertig! Die Karte wird mit dem Stil `streets` über den gesamten Anzeigebereich [`style='width: 100vw; height: 100vw;'`](https://wiki.selfhtml.org/wiki/CSS/Wertetypen/Zahlen,_Ma%C3%9Fe_und_Ma%C3%9Feinheiten/Viewportabmessungen) zentriert auf die [Position](https://astrid-guenther.de/dies-und-das/39-geographische-koordinaten) `[7.5, 50.1]` mit der [Zoomstufe](https://wiki.openstreetmap.org/wiki/DE:Zoom_levels) 9 angezeigt:

[![Full Screen Map Gatsby Maplibre GL Starter](https://user-images.githubusercontent.com/9974686/97810139-0f17ce80-1c72-11eb-987f-aea7edadfd6f.png)](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/map-full)

Die Grundlage haben wir gelegt. Mithilfe der Karte ist es möglich geografische Geschichten zu erzählen oder standortbezogene Informationen weiterzugeben.

[Demo](https://astridx.github.io/maplibreexamples/quickstart.html)  
[Quellcode](https://github.com/astridx/maplibreexamples/blob/main/quickstart.html)  
[Gatsby Starter mit dieser Funktion](https://github.com/astridx/gatsby-starter-mapbox-examples) - [Gatsby Starter Demo](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/)
