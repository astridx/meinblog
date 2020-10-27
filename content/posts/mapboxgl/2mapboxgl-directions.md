---
date: 2020-10-03
title: 'Mapbox GL Routing mit dem Plugin Directions'
template: post
thumbnail: '../../thumbnails/mapboxgl.png'
slug: mapboxgl-derections
categories:
  - MapboxGL
tags:
  - MapBoxGL
  - geografische Daten
  - Geoinformationssystem
  - JavaScript-Bibliothek
  - Vektor-Tiles
  - Karten
  - Routing
---

Directions



[Demo](https://astridx.github.io/mapboxexamples/plugins/mapbox-gl-directions.html)  
[Quellcode](https://github.com/astridx/mapboxexamples/blob/master/plugins/mapbox-gl-directions.html)  
[Gatsby Starter mit dieser Funktion](https://github.com/astridx/mapbox-react-examples/)

```html 
<!--  https://raw.githubusercontent.com/astridx/mapboxexamples/master/plugins/mapbox-gl-directions.html -->

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Display driving directions</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
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
    <script
        src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js"></script>
    <link rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css"
        type="text/css" />
    <div id="map"></div>

    <script>
        var lngDisplay = document.getElementById('lng');
        var latDisplay = document.getElementById('lat');
        var eleDisplay = document.getElementById('ele');

        mapboxgl.accessToken = '<Zugriffstoken>';
        new MapboxDirections({
            accessToken: this.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
            flyTo: false,
            controls: {
                inputs: false,
                instructions: true,
                profileSwitcher: false
            },
            exclude: 'ferry'
        });

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-4.488582, 36.861330],
            zoom: 15
        });
        //style: 'mapbox://styles/mapbox/satellite-v9'
        //style: 'mapbox://styles/mapbox/streets-v11',

        var directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            language: 'de-DE',
            steps: true,
            exclude: 'toll',
            unit: 'metric',
            interactive: false,
            controls: 'true',
            profile: 'mapbox/driving',
            flyTo: false
        });

        var marker1 = new mapboxgl.Marker()
            .setLngLat([1.811080, 47.069302])
            .addTo(map);
        var marker2 = new mapboxgl.Marker()
            .setLngLat([-0.610723, 43.185493])
            .addTo(map);
        var marker3 = new mapboxgl.Marker()
            .setLngLat([-3.479979, 39.819714])
            .addTo(map);

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
        });

        function showRoute() {
            directions.setOrigin("kehrig");
            directions.setDestination("-4.488582, 36.861330");
            // directions.addWaypoint(1, [-1.497526, 43.307164]);
        }
        map.addControl(directions, 'top-left');
    </script>
</body>

</html>
```