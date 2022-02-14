---
description: 'desc'
shortTitle: 'short'
date: 2021-05-03
title: 'Maplibre GL Routing mit dem Plugin Directions'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: maplibregl-directions
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
  - Routing
---

Wegbeschreibungen anzeigen: Ich verwende das [Mapbox-GL-Direcitons-Plugin](https://github.com/mapbox/mapbox-gl-directions), um Ergebnisse der [Mapbox Directions API](https://www.mapbox.com/navigation/) anzuzeigen.
Eine vollständige Referenz findest du unter [API.md](https://github.com/mapbox/mapbox-gl-directions/blob/master/API.md). Nachfolgend ein einfaches Beispiel:

[![Full Screen Map with Route / Directions Gatsby Mapbox GL Starter](https://user-images.githubusercontent.com/9974686/97810148-1808a000-1c72-11eb-86cd-77aa3f72a7b8.png)](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/map-direction)

Zunächst der Programmcode:

````html {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/maplibreexamples/main/plugins/maplibre-gl-directions.html -->

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
    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js"></script>
    <link
      rel="stylesheet"
      href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css"
      type="text/css"
    />
    <div id="map"></div>

    <script>
      new MapboxDirections({
        accessToken: config.MAPBOX_TOKEN,
        unit: 'metric',
        profile: 'mapbox/driving',
        flyTo: false,
        controls: {
          inputs: false,
          instructions: true,
          profileSwitcher: false,
        },
        exclude: 'ferry',
      })

      var map = new maplibregl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/streets/style.json?key=' +
          config.MAPTILER_TOKEN,
        center: [-4.488582, 36.86133],
        zoom: 15,
      })

      var directions = new MapboxDirections({
        accessToken: maplibregl.accessToken,
        language: 'de-DE',
        steps: true,
        exclude: 'toll',
        unit: 'metric',
        interactive: false,
        controls: 'true',
        profile: 'mapbox/driving',
        flyTo: false,
      })

      var marker1 = new maplibregl.Marker()
        .setLngLat([1.81108, 47.069302])
        .addTo(map)
      var marker2 = new maplibregl.Marker()
        .setLngLat([-0.610723, 43.185493])
        .addTo(map)
      var marker3 = new maplibregl.Marker()
        .setLngLat([-3.479979, 39.819714])
        .addTo(map)

      /*        directions.on('route', e => {
                    let routes = e.route
                    routes.map(r => r.legs[0].steps[0].name)
                    tail = routes.map(r => r.legs[0].steps)
                    var i;
                    for (i = 0; i < tail[0].length; i++) {
                        console.log(
                            i + ': ' + tail[0][i].maneuver.location[0] + '---' + tail[0][i].maneuver.location[1]
                        );
                    }
                });*/

      this.map.on('load', () => {
        showRoute()
      })

      function showRoute() {
        directions.setOrigin('kehrig')
        directions.setDestination('-4.488582, 36.861330')
        // directions.addWaypoint(1, [-1.497526, 43.307164]);
      }
      map.addControl(directions, 'top-left')
    </script>
  </body>
</html>
``` Ich gebe zwei Koordinaten ein. Die Mapbox Directions-API gibt ein
JSON-Objekt zurück, das eine Route mit Reisedauer, geschätzten Entfernungen und
Turn-by-Turn-Anweisungen enthält. Bei Verwendung des Mapbox GL
Directions-Plugins werden alle diese Informationen automatisch zur Karte
hinzugefügt, wenn eine Anforderung abgeschlossen ist. Nachfolgend zeige ich eine
kurze JSON-Rohantwort an, um zu veranschaulichen, welche Informationen im
Richtungsantwortobjekt enthalten sind. ```json [ { "geometry":
"m~zqHwnbk@UhCoCt@G@", "legs": [ { "summary": "Veilchenhang, Sonnenhang",
"weight": 50.1, "duration": 47.4, "steps": [ { "intersections": [ { "out": 0,
"entry": [true], "bearings": [284], "location": [7.226839, 50.278312] } ],
"driving_side": "right", "geometry": "m~zqHwnbk@UhC", "mode": "driving",
"maneuver": { "bearing_after": 284, "bearing_before": 0, "location": [7.226839,
50.278312], "type": "depart", "instruction": "Head west on Veilchenhang" },
"weight": 21.5, "duration": 18.8, "name": "Veilchenhang", "distance": 50.8 }, {
"intersections": [ { "out": 2, "in": 0, "entry": [false, true, true],
"bearings": [105, 195, 345], "location": [7.226145, 50.278421] } ],
"driving_side": "right", "geometry": "c_{qHmjbk@oCt@G@", "mode": "driving",
"maneuver": { "bearing_after": 345, "bearing_before": 282, "location":
[7.226145, 50.278421], "modifier": "right", "type": "turn", "instruction": "Turn
right onto Sonnenhang" }, "weight": 28.6, "duration": 28.6, "name":
"Sonnenhang", "distance": 87 }, { "intersections": [ { "in": 0, "entry": [true],
"bearings": [169], "location": [7.225868, 50.279183] } ], "driving_side":
"right", "geometry": "{c{qHuhbk@", "mode": "driving", "maneuver": {
"bearing_after": 0, "bearing_before": 349, "location": [7.225868, 50.279183],
"type": "arrive", "instruction": "You have arrived at your destination" },
"weight": 0, "duration": 0, "name": "Sonnenhang", "distance": 0 } ], "distance":
137.8 } ], "weight_name": "routability", "weight": 50.1, "duration": 47.4,
"distance": 137.8 } ]
````

Das Richtungsobjekt ist beispielsweise mit folgendem Code manipulierbar.

```js
directions.on('route', (e) => {
  let routes = e.route
  routes.map((r) => r.legs[0].steps[0].name)
  tail = routes.map((r) => r.legs[0].steps)
  var i
  for (i = 0; i < tail[0].length; i++) {
    console.log(
      i +
        ': ' +
        tail[0][i].maneuver.location[0] +
        '---' +
        tail[0][i].maneuver.location[1]
    )
  }
})
```

Ein Marker kann wie gewohnt zur Karte hinzugefügt werden.

```js
var marker3 = new mapboxgl.Marker().setLngLat([-3.479979, 39.819714]).addTo(map)
```

Soll die Koordinate des Markers als Zwischenziel verwendet werden, ist das Hinzufügen von `directions.addWaypoint(1, [-3.479979, 39.819714]);` erforderlich.

[Demo](https://astridx.github.io/maplibreexamples/plugins/maplibre-gl-directions.html)  
[Quellcode](https://github.com/astridx/maplibreexamples/blob/main/plugins/maplibre-gl-directions.html)  
[Gatsby Starter mit dieser Funktion](https://github.com/astridx/gatsby-starter-mapbox-examples) - [Gatsby Starter Demo](https://astridx.github.io/gatsbystarter/gatsby-starter-mapbox-examples/)  
[Mapbox GL Dokumentation](https://docs.mapbox.com/help/how-mapbox-works/directions/)  
[Mapbox GL Directions plugin ](https://github.com/mapbox/mapbox-gl-directions)
