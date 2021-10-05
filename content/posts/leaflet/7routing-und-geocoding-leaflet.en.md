---
date: 2018-12-19
title: 'Routing und Geocoding'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: en/routing-und-geocoding-leaflet
langKey: de
categories:
  - Leaflet
tags:
  - geografische Daten
  - Leaflet
---

Last, but not least möchte ich Ihnen ein Routing Plugin vorstellen, nämlich die [Leaflet Routing Machine](https://github.com/perliedman/leaflet-routing-machine)[^github.com/perliedman/leaflet-routing-machine] von Per Liedmann.

todo: https://github.com/perliedman/leaflet-routing-machine/issues/637

> Auch das ESRI bietet ein Routing Plugin. Jede Leaflet Erweiterung hat ihre Vorteile und ihre Nachteile. Falls Sie die Routing Version des Environmental Systems Research Institute ESRI einsetzen möchten, finden Sie alle Informationen hierfür unter der Adresse [https://github.com/jgravois/lrm-esri](https://github.com/jgravois/lrm-esri)[^github.com/jgravois/lrm-esri].

## In diesem Kapitel werden wir …

Als erstes sehen wir uns kurz an, was sich hinter dem Begriff Routing versteckt. Danach werden wir das Plugin Leaflet Routing Machine in unsere Leaflet Karte integrieren. Dieses Plugin stellt zwei Textfelder zur Eingabe von Adressen zur Verfügung und berechnet auf Anforderung eine Route zwischen diesen beiden Adressen. Im weiteren Verlauf nutzen wir Optionen, um die Routenberechnung flexibler und benutzerfreundlicher zu machen.

## Allgemeines zum Thema Routing

Fangen wir von vorne an. Es ist nämlich meiner Meinung nach auch spannend, einmal etwas über den Tellerrand zu blicken. Reicht es Ihnen, wenn sie zwei Adressen eingeben könnten und einen Weg zwischen diesen beiden Adressen als Ergebnis ausgegeben bekommen? Oder, möchten Sie auch etwas genauer wissen, was sich hinter dem Begriff Routing verbirgt? Wenn ersteres auf Sie zutrifft, dann lesen Sie am besten im nächsten Kapitel weiter. Ansonsten ist meine kurze Zusammenfassung hier im Kapitel vielleicht interessant für Sie.

Auch wenn die vielen Informationen auf einer Karte komplex erscheinen: Das Berechnen einer Route kann von einer Software oder einem Dienst effizient durchgeführt werden. Dazu müssen die Daten der Karte, auf der die Berechnung ausgeführt werden soll, bestimmte Informationen enthalten. Die Daten von OpenStreetMap beinhalten Informationen, um Routen für verschiedene Profile berechnen zu können. Eine Route kann zum Beispiel für die Nutzung eines Autos oder eines Fahrrads unterschiedlich berechnet werden. Auch Optionen wie _'zu Fuß'_ oder _'mit dem Pferd'_ sind mit OpenStreetMap Daten möglich.

Damit die Software zur Routenberechnung fehlerfrei funktioniert, müssen diese Daten qualitativ gut sein. Das bedeutet, dass Linien – also zum Beispiel Straßen – die verbunden sein sollen, auch wirklich verbunden sind. Umgekehrt dürfen Straßen, die sich auf verschieden Ebenen kreuzen - zum Beispiel bei Brücken oder Tunneln, nicht verbunden sein. Das bedeutet auch, dass Poller oder Absperrpfosten, an denen kein Auto vorbeikommt, auch als solche eingezeichnet sind. Ganz wichtig ist es, dass Abbiegeverbote an Kreuzungen auf der Karte klar gekennzeichnet sind. Wie OpenStreetMap das macht, können Sie unter anderem auf der Website [https://wiki.openstreetmap.org](https://wiki.openstreetmap.org/w/index.php?title=OSM_tags_for_routing)[^wiki.openstreetmap.org/w/index.php?title=osm_tags_for_routing] nachlesen.

Um bei der Routen-Berechnung die schnellste Route bestimmen zu können, sind Geschwindigkeitsangaben notwendig. OpenStreetMap speichert für jede Straße den Standardhöchstwert für deutsche Straßen. Dieser Standardwerte kann jedoch für bestimmte Straßen anders sein. In diesem Fall ist es notwendig, dass beim Erstellung des Straßen-Objektes die zulässige Höchstgeschwindigkeit hinzufügt wird. Dies geschieht mit einer speziellen Eigenschaft oder mit einem speziellen Tag. Nebenbei haben auch andere Faktoren, wie Kurven, Steigungen oder Straßenbelag einen Einfluss auf die Geschwindigkeit – und dieser ist je nach Profil noch einmal unterschiedlich. Eine Steigung verringert die Geschwindigkeit eines Fahrrades stärker, als die eines Autos. Dafür wird der Fußgänger in Kurven nicht so viel an Geschwindigkeit verlieren wie ein Fahrrad.

Aber auch dann, wenn die Kartendaten sehr gut und fehlerfrei sind, ist es nicht trivial die ideale Software zur Routen-Berechnung zu erstellen. Hinzu kommen nämlich noch die Besonderheiten des Personenkreises, für den die Route erstellt werden soll. Welche Wege sollen für Radfahrer berücksichtigt werden? Es gibt Radfahrer, die nicht gerne durch die Stadt fahren sondern lieber im Wald unterwegs ist. Andere ziehen eine asphaltierte Straße mitten durch die Stadt einem matschigen Feldweg vor. Wie wählen wir die beste Strecke für einen Radfahrer, der überwiegend bei Dunkelheit trainiert? Oft kommt es sicher auch vor, dass eine Radtour geplant wird, bei der so viele Sehenswürdigkeiten wie möglich unmittelbar am Weg liegen sollten.

Sie erkennen: Die Berechnung einer optimalen Route ist etwas sehr Individuelles!

Sehen wir uns also an inwieweit die Dienste, die das Plugin Leaflet Routing Machine nutzt, diese Anforderungen erfüllt.

## Leaflet Routing Maching

Nachfolgende finden Sie das erste Beispiel für diesen Themenbereich.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/6/index_932a.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="leaflet-routing-machine.js"></script>
    <link rel="stylesheet" href="leaflet-routing-machine.css" />
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 13)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var control = L.Routing.control({
        waypoints: [
          L.latLng(50.273543, 7.262993),
          L.latLng(50.281168, 7.276211),
        ],
      }).addTo(mymap)
    </script>
  </body>
</html>
```

Was haben wir genau gemacht? Zunächst einmal haben wir die für die Verwendung der [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine)[^liedman.net/leaflet-routing-machine] erforderlichen Dateien eingebunden. Verantwortlich hierfür sind die Zeilen

```js
<script src="leaflet-routing-machine.js"></script>
<link rel="stylesheet" href="leaflet-routing-machine.css"/>
```

Die aktuellen Dateien zum Plugin finden Sie unter der Adresse [https://github.com/perliedman/leaflet-routing-machine/releases](https://github.com/perliedman/leaflet-routing-machine/releases). Als nächstes haben wir mit dem Textblock

```js
var control = L.Routing.control({
  waypoints: [L.latLng(50.273543, 7.262993), L.latLng(50.281168, 7.276211)],
}).addTo(mymap)
```

ein `L.Routing.control` erstellt und dieses zur Karte hinzugefügt. Die Koordinaten, zwischen denen eine Route berechnet werden soll, haben wir mit der Option `waypoints` an das Control übergeben.

Sie können einen Router, also eine Software, die die Route berechnen soll, mit dem Eintrag `router: L.Routing.mapbox('pk.ihrkey')` festgelegt. Für die Nutzung des Mapbox Routers benötigen Sie ein Zugriffstoken. Dieses können Sie unter der Adresse [https://www.mapbox.com](https://www.mapbox.com/api-documentation/#access-tokens)[^mapbox.com/api-documentation/#access-tokens] anfordern. In dieser Dokumentation finden Sie auch weitere Informationen zum Router und zu den Lizenzbedingungen. Im nächsten Programmcodeblock habe ich das vorhergehende Beispiel so abgeändert, dass der Router von Mapbox angewendet wird.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/6/index_932b.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="leaflet-routing-machine.js"></script>
    <link rel="stylesheet" href="leaflet-routing-machine.css" />
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 13)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var control = L.Routing.control({
        waypoints: [
          L.latLng(50.273543, 7.262993),
          L.latLng(50.281168, 7.276211),
        ],
        router: L.Routing.mapbox(
          'pk.eyJ1IjoiYXNlbG5pZ3UiLCJhIjoiVi0zVHJBQSJ9.9fUKqRI4g5v59l9C-tM55w'
        ),
      }).addTo(mymap)
    </script>
  </body>
</html>
```

> Wenn Sie die Option `router` nicht belegen, wird standardmäßig die Open Source Routing Machine – [http://project-osrm.org](http://project-osrm.org) – genutzt. Für diesen freien Router benötigen Sie kein Zugriffstoken. Leider ist dieser aber nicht so zuverlässig wie Mapbox. Bedenken Sie, es handelt sich um eine Demoversion, die Sie frei nutzen können und einem geschenkten Gaul schaut man schließlich nicht ins Maul!

Die nächste Abbildung zeigt Ihnen unseren bisherigen Stand. Die Route wird berechnet und im rechten oberen Teil angezeigt. Anders als gewünscht werden Sie aber über eine Straße, auf der viele Autos fahren, geführt. Dabei möchten Sie gerne wandern. Außerdem sind die Texte in englischer Sprache. Das geht sicher besser!

![Eine Karte auf der eine Route angezeigt wird.](/images/927.png)

## Options

Der nächste Programmcode zeigt Ihnen am Beispiel von Mapbox, wie Sie die Sprache und das Routing Profil verändern können.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/6/index_931b.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="leaflet-routing-machine.js"></script>
    <link rel="stylesheet" href="leaflet-routing-machine.css" />
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 13)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var control = L.Routing.control({
        waypoints: [
          L.latLng(50.273543, 7.262993),
          L.latLng(50.281168, 7.276211),
        ],
        router: L.Routing.mapbox(
          'pk.eyJ1IjoiYXNlbG5pZ3UiLCJhIjoiVi0zVHJBQSJ9.9fUKqRI4g5v59l9C-tM55w',
          {
            profile: 'mapbox/walking',
            language: 'de',
          }
        ),
      }).addTo(mymap)
    </script>
  </body>
</html>
```

Der Mapbox Router bietet Ihnen unter anderem die Optionen `profil` und `language`. Die Namen sagen es schon aus. Als [Profil](https://www.mapbox.com/api-documentation/#retrieve-directions)[^mapbox.com/api-documentation/#retrieve-directions] können Sie einstellen, ob Sie wandern, radeln oder lieber mit dem Auto fahren möchten. Die [Option `language`](https://www.mapbox.com/api-documentation/#instructions-languages)[^mapbox.com/api-documentation/#instructions-languages] bietet Ihnen eine Menge unterschiedlicher Sprachen. Möchten Sie noch etwas anderes ändern? Die Dokumentation zum Router von Mapbox finden Sie unter der Adresse [https://www.mapbox.com/](https://www.mapbox.com/api-documentation/#introduction)[^mapbox.com/api-documentation/#introduction].

> Wenn Sie lieber eine andere Software zur Berechnung der Route nutzen möchten, können Sie dies tun. Die Leaflet Routing Machine bietet Ihnen viele Möglichkeiten. Weitere Informationen, Demos und Tutorials zur Leaflet Routing Machine finden Sie auf der Website: [http://www.liedman.net/leaflet-routing-machine](http://www.liedman.net/leaflet-routing-machine).

Auch der Router des Projektes [http://project-osrm.org](http://project-osrm.org) bietet Ihnen Optionen. Soweit ich weiß, kann auf dem Demoserver aber nur das Profil `driving` genutzt werden. Aber die Sprache können Sie benutzerdefiniert anpassen. Wie dies geht zeigt Ihnen das nächste Beispiel.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/6/index_931.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="leaflet-routing-machine.js"></script>
    <link rel="stylesheet" href="leaflet-routing-machine.css" />
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 13)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var control = L.Routing.control({
        waypoints: [
          L.latLng(50.273543, 7.262993),
          L.latLng(50.281168, 7.276211),
        ],
        router: new L.Routing.OSRMv1({
          language: 'de',
        }),
      }).addTo(mymap)
    </script>
  </body>
</html>
```

> Sie können die URL, von der die Route abgefragt wird, auch direkt eingeben. Im Falle von [http://project-osrm.org](http://project-osrm.org) könnte dies wie folgt aussehen: [https://router.project-osrm.org/route/v1/driving/7.262993,50.273543;7.276211,50.281168](https://router.project-osrm.org/route/v1/driving/7.262993,50.273543;7.276211,50.281168).

![Direkter erfolgreicher Aufruf OSRM-Server.](/images/926a.png)

Falls Ihnen die Meldung _'Too Many Requests'_ angezeigt wird, müssen Sie nichts falsch gemacht haben. In dem Fall ist der Server gerade überlastet. Versuchen Sie es einfach später noch einmal.

![Direkter fehlerhafter Aufruf OSRM-Server.](/images/926b.png)

Im nächsten Bild sehen Sie, dass das Routing im Mapbox Beispiel nun eher zu einem Wanderer passt und die Texte sind auch in deutscher Sprache. Das ist schon einmal gut. Aber es geht ja meist noch besser.

![Eine Karte auf der eine Route für Wanderer in deutscher Sprache angezeigt wird.](/images/926.png)

Wahrscheinlich möchten Sie, dass die Adressen, zwischen denen geroutet wird, variabel auf der Karte verändert werden können. Genau das wollte ich als nächstes umsetzen und deshalb habe ich dies im nächsten Beispiel auch gemacht.

## Geocoding und Routing

Bisher wurde die Route ausschließlich anhand von Koordinaten berechnet. Menschen nutzen aber lieber Texte in Form von Adressen. Das Sie mithilfe von Geocoding Adressen in Koordinaten verwandelt können – beziehungsweise Koordinaten in Adressen verwandeln können – haben Sie im Kapitel _Geocoding ESRI_ schon lesen können. Hier im Beispiel kombinieren wir nun Routing und Geocoding. Sehen Sie selbst:

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/6/index_930.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="leaflet-routing-machine.js"></script>
    <script src="Control.Geocoder.js"></script>
    <link rel="stylesheet" href="Control.Geocoder.css" />
    <link rel="stylesheet" href="leaflet-routing-machine.css" />
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 13)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var control = L.Routing.control({
        waypoints: [
          L.latLng(50.273543, 7.262993),
          L.latLng(50.281168, 7.276211),
        ],
        router: L.Routing.mapbox(
          'pk.eyJ1IjoiYXNlbG5pZ3UiLCJhIjoiVi0zVHJBQSJ9.9fUKqRI4g5v59l9C-tM55w',
          {
            language: 'de',
          }
        ),
        geocoder: L.Control.Geocoder.nominatim({}),
      }).addTo(mymap)
    </script>
  </body>
</html>
```

In diesem Beispiel haben wir das vorhergehende Beispiel mit dem Plugin [Geocoder Control](https://github.com/perliedman/leaflet-control-geocoder)[^github.com/perliedman/leaflet-control-geocoder] erweitert. Konkret haben wir mithilfe der Zeilen

```js
<script src="Control.Geocoder.js"></script>
<link rel="stylesheet" href="Control.Geocoder.css"/>
```

die Skript-Datei und die CSS-Datei des Plugin [Geocoder Control](https://github.com/perliedman/leaflet-control-geocoder)[^github.com/perliedman/leaflet-control-geocoder] von Per Liedmann eingebunden. Die aktuellste Version dieses Plugins können Sie unter der Adresse [https://github.com/perliedman/leaflet-control-geocoder/releases](https://github.com/perliedman/leaflet-control-geocoder/releases) herunterladen. Danach haben wir die Option `geocoder` des Plugins Leaflet Routing Machine mit dem Wert `L.Control.Geocoder.nominatim({})` belegt. Und das war es schon!

Als Ergebnis sehen Sie nun zwei Textfelder im oberen rechten Bereich auf Ihrer Karte. In diese können Sie Adressen eingeben und so Ihre Route benutzerfreundlich abändern.

![Eine Karte auf der eine Route angezeigt wird. Sie können die Route ändern, indem Sie eine Adresse in einem der Textfelder rechts oben eingeben.](/images/925.png)

## In diesem Kapitel haben wir …

Gegenstand dieses Kapitels war Routing. Wir haben uns kurz angesehen, was Kartendaten bieten müssen, um die Berechnung einer Route zu ermöglichen. Dass die Kartendaten aber nicht alles sind und eine Route etwas sehr Individuelles sein kann, wurde dabei auch klar. Danach haben wir das Plugin Leaflet Routing Machine in unsere Leaflet Karte integriert und mithilfe von Optionen und Geocoding flexibler und benutzerfreundlicher gemacht.
<img src="https://vg07.met.vgwort.de/na/80b98b10fda043cc99b59ea9c06c7afc" width="1" height="1" alt="">
