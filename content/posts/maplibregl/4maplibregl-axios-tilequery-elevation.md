---
date: 2021-05-05
title: 'Maplibre GL - Höhenangaben per Tilequery abfrage'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: maplibregl-axios-tilequery-elevation
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
  - Tilequery API
  - Schnittstelle
---

Manchmal ist es hilfreich, per Mausklick Informationen über einen Ort abzurufen. Mit der [Open-Elevation API](https://github.com/Jorl17/open-elevation) rufe ich Infos zu einer Koordinate ab.

[![Full Screen Map Gatsby Mapbox GL Starter with Query for getting elevation](https://user-images.githubusercontent.com/9974686/97810145-14751900-1c72-11eb-8730-a898c8068eb4.png)](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/map-full-plus-find-elevation)

Hier ein Beispiel für das Abrufen der Höhe eines Standorts und das Anzeigen der Angaben via Textfeld in der oberen linken Ecke der Karte. Das Beispiel habe ich vom [Mapbox GL Beispiel](https://docs.mapbox.com/help/tutorials/find-elevations-with-tilequery-api/) abgeleitet. Anders als MapBox nutze ich den Promise-basierten HTTP-Client [axios](https://github.com/axios/axios) für die Abfrage.

```html {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/maplibreexamples/main/examples/find-elevations-with-tilequery-api.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Display driving directions</title>
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
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
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

      .eleInfo {
        position: absolute;
        background-color: #fff;
        z-index: 1;
      }
    </style>
  </head>

  <body>
    <div class="eleInfo">
      <div>Longitude: <span id="lng"></span></div>
      <div>Latitude: <span id="lat"></span></div>
      <div>Elevation: <span id="ele"></span></div>
    </div>
    <div id="map"></div>

    <script>
      var lngDisplay = document.getElementById('lng')
      var latDisplay = document.getElementById('lat')
      var eleDisplay = document.getElementById('ele')

      lngDisplay.textContent = 'Please click on map.'
      latDisplay.textContent = '-'
      eleDisplay.textContent = '-'

      var map = new maplibregl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/streets/style.json?key=' +
          config.MAPTILER_TOKEN,
        center: [86.925278, 27.988056],
        zoom: 15,
      })

      function getElevation(lng, lat) {
        // https://github.com/Jorl17/open-elevation
        var query =
          'https://api.open-elevation.com/api/v1/lookup\?locations\=' +
          lat +
          ',' +
          lng
        axios
          .get(query)
          .then(function (response) {
            eleDisplay.textContent =
              response.data.results[0].elevation + ' Meter'
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // immer
          })
      }

      map.on('click', function (e) {
        lng = e.lngLat.lng
        lat = e.lngLat.lat
        lngDisplay.textContent = lng.toFixed(4) + '°'
        latDisplay.textContent = lat.toFixed(4) + '°'
        eleDisplay.textContent = 'Please wait ...'
        getElevation(e.lngLat.lng, e.lngLat.lat)
      })
    </script>
  </body>
</html>
```

Was alles möglich ist zeigt der [Playground](https://docs.mapbox.com/playground/tilequery/).

[Demo](https://astridx.github.io/maplibreexamples/examples/find-elevations-with-tilequery-api.html)  
[Quellcode](https://github.com/astridx/maplibreexamples/blob/main/examples/find-elevations-with-tilequery-api.html)  
[Gatsby Starter mit dieser Funktion](https://github.com/astridx/gatsby-starter-mapbox-examples) - [Gatsby Starter Demo](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/)
Warum auf dem Mount Everest die Höhenangabe nicht korrekt ist, erklärt dieses [Github-Issue](https://github.com/mapbox/mapbox-gl-js/issues/10039)
