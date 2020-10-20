---
date: 2020-08-02
title: 'Ubuntu 20.02 Vorwort'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: webgl-quickstart
categories:
  - MapboxGL
tags:
  - Linux
  - Ubuntu
---

Zu Beginn benötigen wir ein [Zugriffstoken](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) und eine Stil-URL. Wir wählen anfangs einen der professionell gestalteten Stile. Möglich ist es, später einen eigenen Stil zu erstellen.

Fügen wir die JavaScript- und CSS-Dateien in den `<head>` unserer HTML-Datei ein.

```html
<script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
<link
  href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
  rel="stylesheet"
/>
```

Fügen wir den folgenden Code in den `<body>` unserer HTML-Datei ein.

```html
<div id="map" style="width: 100vw; height: 100vw;"></div>
<script>
  mapboxgl.accessToken = '<Zugriffstoken>'
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', //Stil
    center: [7.5, 50.1], // Startposition [lng, lat]
    zoom: 9, // Zoom
  })
</script>
```

Fertig! Die Karte wird mit dem Stil `streets-v11` über den gesamten Anzeigebereich [`style='width: 100vw; height: 100vw;'`](https://wiki.selfhtml.org/wiki/CSS/Wertetypen/Zahlen,_Ma%C3%9Fe_und_Ma%C3%9Feinheiten/Viewportabmessungen) zentriert auf die [Position](https://astrid-guenther.de/dies-und-das/39-geographische-koordinaten) `[7.5, 50.1]` mit der [Zoomstufe](https://wiki.openstreetmap.org/wiki/DE:Zoom_levels) 9 angezeigt.

Die Grundlage haben wir gelegt. Mithilfe der Karte ist es möglich geografische Geschichten zu erzählen oder standortbezogene Informationen weiterzugeben.

[Demo]https://astridx.github.io/mapboxexamples/quickstart.html)
[Quellcode](https://github.com/astridx/mapboxexamples/blob/master/quickstart.html)
