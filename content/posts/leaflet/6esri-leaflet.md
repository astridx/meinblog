---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2018-12-18
title: 'ESRI - Environmental Systems Research Institute'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: esri-leaflet
langKey: de
categories:
  - Leaflet
tags:
  - geografische Daten
  - Leaflet
---

Wenn Sie intensiver mit digitalen Landkarten arbeiten, möchten Sie sicherlich auch einmal Daten eines Geoinformationssystems (GIS) auf Ihrer Karte anzeigen.

> Ein [Geoinformationssystem](https://de.wikipedia.org/w/index.php?title=Geoinformationssystem)[^de.wikipedia.org/w/index.php?title=geoinformationssystem] ist ein Informationssystem zur Erfassung, Bearbeitung, Organisation, Analyse und Präsentation von Daten, die einen Bezug zu einer Stelle auf unserer Erde haben. Zu einem Geoinformationssystem gehören dabei die notwendige Hardware, die notwendige Software, die Daten und die Anwendungen selbst.

Wenn Sie Daten eines Geoinformationssystems nutzen möchten, werden Sie früher oder später über den Begriff [Shapefile](https://de.wikipedia.org/w/index.php?title=Shapefile)[^de.wikipedia.org/w/index.php?title=shapefile] oder Shape Datei stolpern. Aber auch wenn Sie nie auf den Begriff Shape Datei stoßen werden Sie vielleicht einmal einen Webservice nutzen, der Endpunkt eines ARCServers ist. Außerdem werden Sie sicher auch das [ESRI Inc (Environmental Systems Research Institute)](https://de.wikipedia.org/w/index.php?title=ESRI)[^de.wikipedia.org/w/index.php?title=esri] kennenlernen. Dieses Institut ist ein US-amerikanischer Softwarehersteller. Das ESRI hat sich auf Geoinformationssysteme spezialisiert. Das Unternehmen hat unter anderem die Anwendung [ArcGIS](https://de.wikipedia.org/w/index.php?title=ArcGIS)[^de.wikipedia.org/w/index.php?title=arcgis] erstellt und das Dateiformat Shapefiles eingeführt.

> Die wesentlichen Produkte des ESRI sind
> Geoinformationssysteme. Die Namen der verschiedenen
> Geoinformationssysteme des ESRI enthalten in der Regel den Namensteil
> ArcGIS. Es gibt ArcGIS Anwendungen für Server und für Clients.

Bitte lassen Sie sich durch die vielen neuen Begriffe nicht verunsichern. Natürlich gibt es Leaflet Plugins, die Ihnen beim Integrieren dieser Services zur Hand geht. Außerdem sehen wir uns alles Schritt für Schritt und nacheinander an.

## In diesem Kapitel werden wir …

In diesem Teil werden wir uns als erstes die Karten, die das ESRI anbietet, ansehen. Danach schauen wir, was sich hinter dem Begriff Shapefile versteckt. Außerdem werden wir ESRI Webservices kennen lernen. Unter anderem einen `L.esri.DynamicMapLayer`, Geocoding und einen `L.esri.FeatureLayer` – hier konkret einen `Query Layer`. Mit letztgenanntem können Sie Daten, die Sie nicht benötigen, einfach aus der gegebenen Datenmenge herausfiltern. Das kann bei großen Datenmenge praktisch sein.

## L.esri.BasemapLayer erweitert L.TileLayer

Mit der Klasse `L.esri.BasemapLayer` können Sie Karten, die das Esri anbietet, auf Ihrer Website als Leaflet Karte anzeigen.

> Die [Nutzungsbedingungen](https://github.com/esri/esri-leaflet#terms) für ESRI Dienste gelten für Leaflet Anwendungen. Diese können Sie auf der Website [https://github.com/esri/esri-leaflet#terms](https://github.com/esri/esri-leaflet#terms) nachlesen.

### Basemaps und optionale Layer von ESRI

Sie möchten Basemaps von ESRI verwenden. Wir haben im Kapitel _Schöne Kartenlayer_ schon Karten von anderen Kartenanbietern eingebunden. Dieses Kapitel erweitert die Erklärungen im Kapitel _Schöne Kartenlayer_ um ein weiteres Beispiel – nämlich die Karten des ESRI Instituts.

#### Basemaps

Basemaps von ESRI bieten eine weltweite Abdeckung bei einer Vielzahl von Zoom Stufen. Dabei können die folgenden Themenbereiche wählen.

- Streets
- Topographic
- NationalGeographic
- Oceans
- Gray
- DarkGray
- Imagery
- ShadedRelief
- Terrain
- USATopo (Diese Karte wird nur für die USA angeboten)

Wenn Ihnen eine der Basiskarten grundsätzlich gut gefällt, diese Ihnen aber zu wenig Informationen bietet, können Sie weitere optionale Ebenen über diese Basisebene einblenden. ESRI bietet speziell für jede Basisebene eine optionale Ebene mit weiteren Informationen.

#### Optionale Label Layer

Label Layer sind optionale Ebenen, die zusätzliche Textbeschriftungen zu den Basiskarten hinzufügen. ESRI bietet Ihnen sieben verschiedene optionale Schichten. Jede Ebene ist speziell für eine Basiskarte kreiert worden. Wenn Sie möchten, können Sie diese aber auch quer Beet kombinieren. Konkret bietet ESRI die Layer

- OceansLabels:
- GrayLabels:
- DarkGrayLabels:
- ImageryLabels:
- ImageryTransportation:
- ShadedReliefLabels
- TerrainLabels

Alle möglichen Basiskarten mit optionalen Ebenen können Sie auch in der Dokumentation des Leaflet Plugins nachlesen. Genau finden Sie diese Informationen unter der Adresse [https://esri.github.io/esri-leaflet](https://esri.github.io/esri-leaflet/api-reference/layers/basemap-layer.html)[^esri.github.io/esri-leaflet/api-reference/layers/basemap-layer.html].

> Wenn Sie möchten, können Sie die Anzeige von Basemaps bei höheren Auflösungen auf Retina-Geräten mit der Option `detectRetina` optimal einstellen. Im nachfolgenden Programmcodeausschnitt wird die Basemap auf einem Retina Display in Retina-Auflösungen ausgegeben. Was ein Retina Display ist, habe ich Ihnen im Kapitel _Custom Markers_ in einem Hinweis erklärt. Die [Option `detectRetina`](https://leafletjs.com/reference.html#tilelayer-detectretina)[^leafletjs.com/reference.html#tilelayer-detectretina] ist eine Leaflet Funktion.

```js
…
L.esri.basemapLayer('DarkGray', {
detectRetina: true
}).addTo(map);
…
```

Wenn Sie die Option `detectRetina` mit `true` belegt haben und ein Website-Besucher Ihre Karte auf einem Geräte mit einem Retina-Display öffnet, wird Leaflet anstelle der Bilddateien zur aktuellen Zoom-Stufe die vierfache Anzahl der Bildkacheln der nächsthöheren Zoom-Stufe anfordern und anzeigen. Wie die Bilddateien für eine Zoom-Stufe berechnet werden, können Sie im Kapitel _Wie weiß Leaflet welche Kacheln angezeigt werden sollen_ nachlesen.

### Ein erstes Beispiel

Das nachfolgende Beispiel zeigt Ihnen, wie Sie eine ESRI Basiskarte in Leaflet anzeigen können.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_945.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="esri-leaflet-debug.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.26469], 7)
      var gray = L.esri.basemapLayer('Gray').addTo(mymap)
      var graylabels = L.esri.basemapLayer('GrayLabels').addTo(mymap)
      gray.setOpacity(0.5)
      gray.on('load', alertme)
      function alertme() {
        alert('Fertig!')
      }
    </script>
  </body>
</html>
```

Was haben wir gemacht? Wichtig ist, dass wir das Skript zum ESRI Leaflet Plugin einbinden. Ich habe dies mit der Zeile `<script src="esri-leaflet-debug.js"></script>` getan. Im Echtsystem können Sie die komprimierte Version verwenden, also `<script src="esri-leaflet.js"></script>`. Die aktuellste Version dieses Skripts können Sie von der Adresse [http://esri.github.io/esri-leaflet/download](http://esri.github.io/esri-leaflet/download/) kopieren. Nach dem Einbinden des Plugins haben wir mit der Zeile `var gray = L.esri.basemapLayer('Gray').addTo(mymap);` das `L.esri.basemapLayer` Objekt erstellt und es auch sofort zur Karte hinzugefügt. Zusätzlich haben wir die Karte mit `gray.setOpacity(0.5);` transparent dargestellt und dem Ereignis `on('load')` die Funktion `alertme()` zugeordnet. Immer dann, wenn die Karte fertig geladen ist, soll die Funktion `alertme()` ausgeführt werden. Genau bedeutet das, dass immer, wenn die Karte fertig geladen ist, ein Hinweisfenster erscheint. Verschieben Sie die Karte einmal. Dabei werden Sie sehen, dass das Ereignis `on('load')` auch immer dann, wenn die Karte erschoben wird, eintritt.

Die beiden nachfolgenden Abbildungen zeigen Ihnen die Basiskarte mit dem Namen gray – einmal mit und einmal ohne optionale Ebene.

![Die Basiskarte Gray mit optionale Ebene](/images/943.png)

---

![Die Basiskarte Gray ohne optionale Ebene](/images/944.png)

### Unterschiedliche Basemaps auswählen

Im nächsten Beispiel habe ich im HTML-Dokument eine Auswahllist über der Karte eingefügt. So können Sie zwischen den verschiedenen ESRI Karten schnell hin und her wechseln und sich so einen Überblick über das Kartenangebot verschaffen.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_944.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="esri-leaflet-debug.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <select
      style="position: absolute; top: 10px; right: 10px; z-index: 400"
      id="basemaps"
      onChange="changeBasemap(basemaps)"
    >
      <option value="Topographic">Topographic</option>
      <option value="Streets">Streets</option>
      <option value="NationalGeographic">National Geographic</option>
      <option value="Oceans">Oceans</option>
      <option value="Gray">Gray</option>
      <option value="DarkGray">Dark Gray</option>
      <option value="Imagery">Imagery</option>
      <option value="ShadedRelief">Shaded Relief</option>
      <option value="Terrain">Terrain</option>
      <option value="USATopo">USATopo</option>
    </select>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.26469], 7)
      var layer = L.esri.basemapLayer('Gray').addTo(mymap)
      function changeBasemap(basemaps) {
        var basemap = basemaps.value
        if (layer) {
          mymap.removeLayer(layer)
        }
        layer = L.esri.basemapLayer(basemap)
        mymap.addLayer(layer)
      }
    </script>
  </body>
</html>
```

Was haben wir genau gemacht? Hier gibt es nichts weltbewegend Neues. Eine Auswahlliste haben wir schon oft im Buch verwendet. Wenn ein Website-Besucher den aktiven Listeneintrag der Auswahlliste ändert, wird die aktuelle Kartenebene mit `mymap.removeLayer(layer)` entfernt. Danach wird eine neue Ebene mit der gewünschten Option erstellt – `layer = L.esri.basemapLayer(basemap)` – und diese wird dann zum Kartenobjekt hinzugefügt `mymap.addLayer(layer)`.

Im Ergebnis können Sie sich mithilfe der Auswahlliste alle ESRI Karten ansehen. Oder Sie können es einem Website-Besucher ermöglichen die Karte, die dieser am schönsten findet, für seine Ansicht zu aktivieren.

![Dieses Bild zeigt die ESRI Basiskarte Imagery.](/images/942.png)

## Shapefiles

Das Dateiformat Shapefile wurde von der Firma ESRI für die Software ArcView entwickelt. Shape Dateien sind speziell für die Verarbeitung von Geodaten entwickelt worden.

### Was genau verbirgt sich hinter dem Begriff Shapefile

Ein [Shapefile](https://de.wikipedia.org/w/index.php?title=Shapefile)[^de.wikipedia.org/w/index.php?title=shapefile] ist keine einzelne Datei. In der Regel handelt es sich um mehrere Dateien, die zu einem Zip-Archiv zusammengefasst sind. In diesem Zip-Archiv müssen mindestens die drei nachfolgend genannten Dateitypen vorhanden sein:

- Eine Datei mit der Endung `.shp` dient zur Speicherung der Geometriedaten.
- Eine Datei mit der Endung `.dbf` enthält Attribute oder Eigenschaften.
- Eine Datei mit der Endung `.shx` dient als eine Art Index. Mithilfe dieser Datei sind die Geometriedaten in der Datei `.shp` mit den Eigenschaften in der `.dbf`-Datei verknüpft.

> Weitere Informationen zu Shapefiles und wie Sie diese selbst erstellen können, finden Sie auf der Website [http://desktop.arcgis.com](http://desktop.arcgis.com/de/arcmap/10.3/manage-data/shapefiles/creating-a-new-shapefile.htm)[^desktop.arcgis.com/de/arcmap/10.3/manage-data/shapefiles/creating-a-new-shapefile.htm].

### Wie kommen Sie an ein Shapefiles

Natürlich können Sie selbst ein Shapefile erstellen. Das ist aber gar nicht einfach und außerdem nicht Thema dieses Buches. Einfach ist es aber, an Shapefiles von anderen heranzukommen. Insbesondere Daten, die von öffentlichem Interesse sind, werden oft zum Download als Shapefile angeboten. Suchen einfach einmal in einer Suchmaschine nach Websites, die den Text _Open Data_ enthalten.

Bei einer Suche nach _Open Data_ in einer Suchmaschine im Internet habe ich unter anderem das Schienennetz der Deutschen Bahn als Shapefile gefunden: [http://data.deutschebahn.com/dataset/geo-strecke](http://data.deutschebahn.com/dataset/geo-strecke). Höchstwahrscheinlich interessieren Sie sich für Daten in der Nähe Ihres Wohnortes. Dann geben Sie zum Suchbegriff _Open Data_ einfach den Namen einer Stadt in der Nähe Ihres Wohnortes ein. Eine Suche nach _Open Data_ in der Nähe von _Koblenz_ hat mich zu einer Website des Landesvermessungsamtes Koblenz geführt. Die Website [https://lvermgeo.rlp.de/de/geodaten/opendata/](https://lvermgeo.rlp.de/de/geodaten/opendata/) informiert über das Angebot des Landesvermessungsamtes - insbesondere über das Angebot an offenen Daten. Einige dieser Daten, zum Beispiel die Flurgrenzen, stehen als Shapefile zur Verfügung.

Wenn Sie per Internetsuche keine passenden Daten finden, können Sie auf der Website von Openstreetmap, insbesondere auf der Unterseite [https://wiki.openstreetmap.org/wiki/Shapefiles](https://wiki.openstreetmap.org/w/index.php?title=Shapefiles)[^wiki.openstreetmap.org/w/index.php?title=shapefiles] nach weiteren Anbietern suchen. Neben weiteren Informationen zum Shapefile Format gibt es hier auch eine Liste mit Anbietern von Shapefiles.

> Es muss nicht an Ihnen liegen, wenn Sie bei der Arbeit mit Geodaten auf einen Fehler stoßen. Insbesondere dann nicht, wenn Sie Daten von anderen in Ihre Arbeit einbinden. Da das Shapefile Format kompliziert ist, ist es gut, dass es im Internet Websites gibt, auf denen man eine Shapefile Datei testen kann. Eine dieser Websites ist [http://leaflet.calvinmetcalf.com](http://leaflet.calvinmetcalf.com)[^leaflet.calvinmetcalf.com].

![Test eines Shapefiles mithilfe der Website [http://leaflet.calvinmetcalf.com](http://leaflet.calvinmetcalf.com). Das getestet Shapefile `vg2500_geo84.zip` finden Sie in den Beispieldateien.](/images/969.png)

### Wie binden Sie Shapefiles in Ihre Leaflet Karte ein?

#### Deutsche Verwaltungsgrenzen als Shapefile in der Leaflet Karte

Die Shape Datei, die ich im nächsten Beispiel verwende, habe ich von der Website [https://www.arcgis.com](https://www.arcgis.com/home/item.html?id=ae25571c60d94ce5b7fcbf74e27c00e0)[^arcgis.com/home/item.html?id=ae25571c60d94ce5b7fcbf74e27c00e0 (bit.ly/3giIh50)] kopiert. Die Firma ESRI bietet auf dieser Website mit ArcGIS ein Geoinformationssystem, dass die Verwendung, Erstellung und Freigabe von Geodaten einfach macht. Ich habe mir den oben verlinkten Datensatz mit den Verwaltungsgrenzen von Deutschland kopiert. Die Datei landet unter dem Namen `vg2500_geo84.zip` bei mir auf dem Computer.

![Download eines Shapefiles von der Adresse arcgis.com.](/images/970.png)

Wie ich die Shape Datei mit Leaflet in eine Karte integriere, zeigt Ihnen das nachfolgende Beispiel. Natürlich gibt es dafür auch wieder ein Leaflet Plugin. Die Website zum Plugin `Leaflet.Shapefile` finden Sie auf Github unter der Adresse [https://github.com/calvinmetcalf/leaflet.shapefile](https://github.com/calvinmetcalf/leaflet.shapefile). Die Datei zum Plugin heißt `leaflet.shpfile.js`. Der gleiche Entwickler bietet auch ein Skript zum Analysieren der Shape Datei unter der Adresse [https://github.com/calvinmetcalf/shapefile-js](https://github.com/calvinmetcalf/shapefile-js) an. Diese Datei heißt `shp.js`. Diese beiden Dateien müssen Sie in Ihre HTML-Datei einbinden.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_943.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="shp.js"></script>
    <script src="leaflet.shpfile.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.26469], 6)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var shpfile = new L.Shapefile('vg2500_geo84.zip')
      shpfile.addTo(mymap)
    </script>
  </body>
</html>
```

Die Zeilen

```js
…
<script src="shp.js"></script>
<script src="leaflet.shpfile.js"></script>
…
var shpfile = new L.Shapefile('vg2500_geo84.zip');
shpfile.addTo(mymap);
…
```

zeigen schon alles Notwendige.

Und was haben wir genau gemacht? Im Kopfbereich unserer Beispiel HTML-Datei haben wir zwei Skripte eingebunden. Einmal das Skript `leaflet.shpfile.js` zum Leaflet Plugin und dann das Skript `shp.js` zum Analysieren der Shape Datei. Danach haben wir mit der Zeile `var shpfile = new L.Shapefile('vg2500_geo84.zip')` eine Ebene mit den Daten der Shape Datei erstellt. Zum Schluss haben wir diese Ebene zum Kartenobjekt hinzugefügt: `shpfile.addTo(mymap)`. Als Ergebnis sehen Sie nun alle Verwaltungsgrenzen, also die reinen Geometrien. Eigenschaften, die in der Shape Datei enthalten sind, werden in diesem Beispiel noch nicht angezeigt. Das Anzeigen von Eigenschaften und das Zuordnen anderer Stile habe ich für das nächste Beispiel aufgehoben.

![Eine Karte auf der ein Shapefile, dass die deutschen Verwaltungsgrenzen enthält, angezeigt wird.](/images/967.png)

#### Deutsche Verwaltungsgrenzen mit Optionen

Im nächsten Beispiel sehen Sie, wie Sie das Aussehen der Formen in der Shape Datei beeinflussen könne.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_942.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="shp.js"></script>
    <script src="leaflet.shpfile.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.26469], 6)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var shpfile = new L.Shapefile('vg2500_geo84.zip', {
        style: function (feature) {
          return { color: 'black', fillColor: 'red', fillOpacity: 0.75 }
        },
      })
      shpfile.addTo(mymap)
    </script>
  </body>
</html>
```

Das vorhergehende Beispiel manipuliert die Option `style`. Die Belegung der Option `style` mit `color:"black",fillColor:"red",fillOpacity:.75` färbt die Grenzen der Shape Datei schwarz und füllt die Formen mit der Farbe Rot – bei einer Transparenz von 75 Prozent. Das rot gefärbte Deutschland können Sie sich in der nächsten Abbildung ansehen.

![Eine Karte, auf der ein Shapefile, dass die deutschen Verwaltungsgrenzen enthält, angezeigt wird. In diesem Beispiel wurden die Farben geändert.](/images/968.png)

#### Ein Pop-up-Fenster

Schön wäre es, wenn man für jede Verwaltungseinheit den Namen in einem Pop-up Fenster angezeigt bekommen würde – und zwar genau dann, wenn man die Fläche auf der Karte anklickt. Im nächsten Beispiel sehen Sie, wie Sie dies umsetzen können.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_941.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="shp.js"></script>
    <script src="leaflet.shpfile.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.26469], 5)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var shpfile = new L.Shapefile('vg2500_geo84.zip', {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.GEN)
        },
      })
      shpfile.addTo(mymap)
    </script>
  </body>
</html>
```

In diesem Beispiel haben wir die Option `onEachFeature` verwendet. Wir haben dieser Option eine anonyme Funktion zugeordnet in der wir jedem Feature in der Shape Datei mithilfe von `layer.bindPopup(feature.properties.GEN)` ein Pop-up Fenster zugewiesen haben. Im Pop-up Fenster erscheint der Text, der bei dem Feature im Attribut `GEN` als Eigenschaft eingetragen ist. Wenn Sie sich nun fragen, woher Sie wissen können, dass es als Eigenschaft ein Attribut `GEN` gibt, dann warten Sie bis zum nächsten Beispiel. Dort werde ich Ihnen zeigen, wie Sie alle Optionen auslesen können. Probieren Sie aber zunächst dieses Beispiel selbst aus. Öffnen Sie die Karte und klicken Sie einen Landkreis an. Wie in der nachfolgenden Abbildung zu sehen ist, sollte sich auch auf Ihrer Karte ein Pop-up Fenster öffnen.

Auf diese Art und Weise können Sie auch das Aussehen einer Form, abhängig vom Wert eines Attributes gestalten.

![Eine Karte, auf der ein Shapefile, dass die deutschen Verwaltungsgrenzen enthält, angezeigt wird. In diesem Beispiel wird der Name der Verwaltungseinheit angezeigt, wenn man mit der Maus die entsprechende Form anklickt.](/images/966.png)

#### Ein Pop-up-Fenster mit allen Informationen des Features

Sie wissen nicht, welche Eigenschaften in der Shape Datei genau für die Geometrien enthalten sind – Sie möchten sich aber gerne einen Überblick über diese Eigenschaften verschaffen. Das nächste Beispiel zeigt Ihnen, wie Sie die Informationen nur mit JavaScript in Erfahrung bringen können.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_940.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="shp.js"></script>
    <script src="leaflet.shpfile.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.26469], 5)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var shpfile = new L.Shapefile('vg2500_geo84.zip', {
        onEachFeature: function (feature, layer) {
          var holder = []
          for (var key in feature.properties) {
            holder.push(key + ': ' + feature.properties[key] + '<br>')
            popupContent = holder.join('')
          }
          layer.bindPopup(popupContent)
        },
      })
      shpfile.addTo(mymap)
    </script>
  </body>
</html>
```

Für die Beantwortung dieser Fragestellung nutzen wir auch wieder die Option `onEachFeature`. In dieser Option erstellen wir eine Variable, genau ein Array, mit dem Namen `holder`. Als nächstes durchlaufen wir in einer Schleife alle Schlüssel, die in den Eigenschaften der Shape Datei, also in `feature.properties` enthalten sind. Wir fügen mit [`push()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/push)[^developer.mozilla.org/de/docs/web/javascript/reference/global_objects/array/push] jeden Eintrag in das Array `holder` ein und separieren diesen von dem nächsten Eintrag mit [`join()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/join)[^developer.mozilla.org/de/docs/web/javascript/reference/global_objects/array/join]. Den Text mit allen Schlüssel-Wert-Paaren fügen wir am Schluss als Pop-up Text zum Layer hinzu.

Als Ergebnis sehen Sie alle möglichen Schlüssel-Wert-Paare in einem Pop-up Fenster über Ihrer Karte, sobald Sie eine Fläche anklicken.

![Eine Karte, auf der ein Shapefile, dass die deutschen Verwaltungsgrenzen enthält, angezeigt wird. In diesem Beispiel werden alle Informationen zur Verwaltungseinheit angezeigt, wenn man mit der Maus die entsprechende Form anklickt.](/images/965.png)

## ESRI Services

Sie wissen nun wie Sie eine ESRI Basiskarte laden, wie Sie mit dem Plugin ESRI-Leaflet grundsätzlich umgehen und wie Sie Dateien im Format Shapefile nutzen können.

ESRI bietet aber noch eine ganze Menge mehr. Sie können ArcGIS Server-Web-Services nutzen. Das ESRI Plugin unterstützt Sie auch bei der Verbindung mit einem Web Service, der sich auf einer ArcGIS Server-Website befindet und für Client-Anwendungen zur Verfügung gestellt wird. Mit einem ArcGIS Web Service kann entweder eine weitere [Ebene](http://esri.github.io/esri-leaflet/api-reference/#layers) für eine Karte zur Verfügung gestellt oder eine bestimmte [Aufgabe](http://esri.github.io/esri-leaflet/api-reference/#tasks) bearbeitet werden.

Eine Ebene kann dabei neben dem

- `L.esri.BasemapLayer`, den Sie ja schon kennengelernt haben,
- ein `L.esri.DynamicMapLayer,`
- ein `L.esri.ImageMapLayer`,
- ein `L.esri.RasterLayer`,
- ein `L.esri.TiledMapLayer`,
- ein `L.esri.FeatureLayer`,
- ein `L.esri.Cluster.FeatureLayer` oder
- ein `L.esri.Heat.FeatureLayer` sein.

Eine Aufgabe könnte das Einschränken der Anzeige auf bestimmte Objekte mit `L.esri.Query` sein oder das Zuordnen von Adressen zu Koordinaten mit `L.esri.Geocoding`.

Im nächsten Kapitel beginnen wir damit, das wir eine Ebene, nämlich einen `L.esri.DynamicMapLayer`, mithilfe eines Web Services nutzen. Wenn Sie dieses Beispiel durchgearbeitet haben, können Sie alle anderen Layer ebenfalls verwenden. Die Vorgehensweise ist bei jedem einheitlich. Der einzige Unterschied besteht im Angebot der möglichen Methoden und Optionen. Da aber die Dokumentation zum Plugin sehr gut ist, dürfte dies keine Schwierigkeit darstellen. Die Dokumentation zu den Layern finden Sie unter der Adresse [http://esri.github.io/esri-leaflet/api-reference/#layers](http://esri.github.io/esri-leaflet/api-reference/#layers).

### L.esri.DynamicMapLayer

Für das nachfolgende Beispiel habe ich Daten des Geoportals Köln genutzt. Dieses Portal bietet den Zugriff auf offene Daten, Dienste und Anwendungen verschiedener Herkunft. Das Geoportal Köln zentralisieren nach eigenen Angaben Informationen aus den Bereichen Umwelt, Verkehr, Vermessung und Planung. Jeder hat die Möglichkeit die Geodaten des Geoportal Köln zu nutzen, anzusehen und zu analysieren. Informationen zum Geoportal Köln finden Sie auf der Website der [Stadt Köln](http://www.stadt-koeln.de/politik-und-verwaltung/geoportal/)[^stadt-koeln.de/politik-und-verwaltung/geoportal]. Die Dokumentation zur Schnittstelle des Web Services finden Sie unter der Adresse [https://geoportal.stadt-koeln.de/arcgis/](https://geoportal.stadt-koeln.de/arcgis/). Wenn Sie dann auf den Eintrag _Behindertenparkplätze_ klicken sehen Sie die Angaben, die speziell unser nachfolgendes Beispiel betreffen.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_939.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="esri-leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.97264, 7.00469], 12)
      //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
      L.esri.basemapLayer('Gray').addTo(mymap)
      var url =
        'https://geoportal.stadt-koeln.de/arcgis/rest/services/Behindertenparkplaetze/MapServer'
      var dMap = L.esri
        .dynamicMapLayer({
          url: url,
          opacity: 0.25,
          useCors: false,
        })
        .addTo(mymap)
      dMap.bindPopup(function (err, featureCollection, response) {
        return (
          featureCollection.features[0].properties.Bezeichnung +
          '<br>Anzahl: ' +
          featureCollection.features[0].properties.Anzahl
        )
      })
    </script>
  </body>
</html>
```

Als erstes haben wir im vorherigen Beispiel das Skript zum Esri Leaflet Plugin eingebunden. Als nächstes haben wir die URL, unter welcher der betreffende Service angeboten wird, in die Variabel `url` gespeichert. Danach haben wir mit dem Code

```js
var dMap = L.esri
  .dynamicMapLayer({
    url: url,
    opacity: 0.25,
    useCors: false,
  })
  .addTo(mymap)
```

ein `L.esri.dynamicMapLayer`-Objekt erstellt und diesem gleichzeitig Optionen übergeben. Unter anderem die URL. Zuletzt haben wir dann mit dem Code

```js
dMap.bindPopup(function (err, featureCollection, response) {
  return (
    featureCollection.features[0].properties.Bezeichnung +
    '<br>Anzahl: ' +
    featureCollection.features[0].properties.Anzahl
  )
})
```

jedem Feature ein Pop-up hinzugefügt und in dieses Pop-up die Eigenschaften `Bezeichnung` und `Anzahl` als Text eingetragen. Welche Eigenschaften Ihnen ein Web Service zur Verfügung stellt, finden Sie in der Dokumentation zum jeweiligen Service. Die Adresse zur Dokumentation des hier verwendeten Services hatte ich Ihnen weiter oben schon genannt.

Die nachfolgende Abbildung zeigt Ihnen alle Parkplätze, die im Web Service Behindertenparkplätze des Geoportals Köln eingetragenen sind.

![Eine Karte auf der die Behindertenparkplatze in der Stadt Köln mithilfe eines Webservices angezeigt werden. Sie können Informationen zum Parkplatz in einem Pop-up einsehen.](/images/938.png)

### Geocoding

Was ist [Geocoding](https://de.wikipedia.org/w/index.php?title=Georeferenzierung)[^de.wikipedia.org/w/index.php?title=georeferenzierung]? Geocoding bezeichnet die Umwandlung von Adressen wie _'Kirchstraße 13, 56571 Muster'_ in geografische Koordinaten wie _'50.423021 Breite'_ und _'7.083739 Länge'_. Nur so können Sie nämlich einen Marker auf einer Karte platzieren oder die Karte an einer bestimmten Adresse zentriert öffnen.

> Nicht nur ESRI bietet Geocoding Dienste an. Auch OpenStreetMap bietet Ihnen diesen Service. [Nominatim](https://nominatim.openstreetmap.org)[^nominatim.openstreetmap.org] ist eine Anwendung, mithilfe derer OpenStreetMap Daten anhand von Texten durchsucht werden können. Diese Texte sind in der Regel eine Adresse oder ein Teil einer Adresse. Falls der Suchtext mit einer Eigenschaft eines OpenStreetMap-Objektes, übereinstimmt, wird die Koordinate zu diesem Objekt auf eine Suchanfrage hin zurückgegeben.

> Da Nominatim auf OpenStreetMap Daten beruht, können Sie sich nicht darauf verlassen, dass alle Adressen eingetragen sind. OSM ist keine kommerzielle Firma, sondern ein Projekt das auf der Mitarbeit von Freiwilligen beruht. Dafür können Sie aber selbst Einfluss auf den Datenbestand nehmen. Bei OpenStreetMap kann jeder mitmachen: [http://wiki.openstreetmap.org/wiki/DE:Getting_Involved](http://wiki.openstreetmap.org/wiki/DE:Getting_Involved)[^wiki.openstreetmap.org/wiki/de:getting_involved]. Ein Pluign, dass unter anderem Nominatim als Service nutze, ist das Plugin [Leaflet Control Geocoder](https://github.com/perliedman/leaflet-control-geocoder)[^github.com/perliedman/leaflet-control-geocoder]. Letzteres sehen wir uns im nächsten Kapitel an.

Ich zeige Ihnen in diesem Kapitel anhand des [ESRI Leaflet Geocoder Plugins](https://github.com/Esri/esri-leaflet-geocoder)[^github.com/esri/esri-leaflet-geocoder] folgendes:

- Ich zeige Ihnen, wie Sie eine Adresse in eine Koordinate umwandeln können.
- Ich zeige Ihnen, wie Sie eine Koordinate in eine Adresse umwandeln können.
- Ich zeige Ihnen, wie Sie eine Karte so öffnen können,
  dass eine bestimmte Adresse zentriert angezeigt wird.

#### Nach Eingabe einer Adresse den passenden Ort auf der Karte finden

Sie zeigen eine Karte auf Ihrer Website an und möchten es anderen ermöglichen, zu einer bestimmten Adresse auf der Karte zu navigieren, nachdem Sie diese Adresse in einem Textfeld eingetragen haben. Dann integrieren Sie doch einfach ein ESRI Leaflet Geocoder Control in Ihre Karte. Wie Sie dies tun können zeigt Ihnen das nächste Beispiel.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_938.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="esri-leaflet.js"></script>
    <link rel="stylesheet" href="esri-leaflet-geocoder.css" />
    <script src="esri-leaflet-geocoder.js"></script>
  </head>
  <body>
    <div style="height: 300px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.97264, 7.00469], 12)
      L.esri.basemapLayer('Gray').addTo(mymap)
      var searchControl = L.esri.Geocoding.geosearch().addTo(mymap)
      var results = L.layerGroup().addTo(mymap)
      searchControl.on('results', function (data) {
        results.clearLayers()
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng))
        }
      })
    </script>
  </body>
</html>
```

Zur Darstellung des Textfeldes für die Eingabe der Adresse ist es notwendig zwei weitere Skripte einzubinden. Neben dem Skript `esri-leaflet.js` sollten Sie auch noch die Dateien `esri-leaflet-geocoder.css` und `esri-leaflet-geocoder.js` in Ihr HTML-Dokument einbinden. Die notwendigen Dateien hierfür finden Sie unter der Adresse https://github.com/Esri/esri-leaflet-geocoder. Als nächstes wird dann mit `var searchControl = L.esri.Geocoding.geosearch().addTo(mymap);` das Eingabefeld für die zu suchende Adresse erstellt und zur Karte hinzugefügt. Dieses Eingabefeld nennt Leaflet auch Control. Wir brauchen eine Ebene, die die Suchergebnisse richtig verarbeitet. Diese erstellen wir mit der Zeile `var results = L.layerGroup().addTo(mymap);`. Zum Schluss können wir dann das Ereignis `on("results")` des Objektes `searchControl` mit einer Funktion belegen.

```js
searchControl.on('results', function (data) {
  results.clearLayers()
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng))
  }
})
```

Wenn es neue Suchergebnisse gibt, dann werden alle alten Suchergebnisse von der Ebene entfernt und die neuen Suchergebnisse als Marker auf der Ebene platziert.

> Ihre Adresse wird nicht auf der Karte gefunden? Das ESRI Leaflet Geocoder Control findet mithilfe der [Methode `geosearch()`](http://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html)[^esri.github.io/esri-leaflet/api-reference/controls/geosearch.html] standardmäßig nur Adressen, die aktuell auch sichtbar auf der Karte sind. Erst wenn Ihre - sicher vorhandene - Adresse auch bei einer Zoom-Stufe von 0 nicht gefunden wird, stimmt etwas nicht. Falls Sie lieber sofort die ganze Welt durchsuchen möchten, dann sollten Sie die Option `useMapBounds` des Objektes, das Ihnen die Funktion `L.esri.Geocoding.geosearch()` liefert, mit `false` belegen.

Die erste Ansicht der Karte nach dem Hinzufügen des ESRI Leaflet Geocoder Control Plugins ist nicht spektakulär. Sie sehen in der linken oberen Ecke eine kleine Lupe. Wenn Sie diese anklicken, öffnet sich ein Textfeld. In dieses Textfeld können Sie nun die Adresse eingeben, nach der Sie suchen möchten. Standardmäßig werden Ihnen alternative Eingaben vorgeschlagen. Sie können das Verhalten des Plugins mit vielen Optionen beeinflussen. Sehen sich die Dokumentation unter Adresse [http://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html](http://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html) an. Vielleicht ist da sogar eine Option dabei, auf die Sie selbst nicht gekommen wären, die sie aber als nützlich ansehen.

![Nach Eingabe einer Adresse den passenden Ort auf der Karte finden.](/images/937.png)

#### Mithilfe eines Parameters in der URL den passenden Ort finden

Manchmal kommt es vor, dass Sie eine Karte schon an einer bestimmten Adresse zentriert öffnen möchten. Wie Sie so etwas umsetzten können, zeigt Ihnen das nächste Beispiel.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_937.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="esri-leaflet.js"></script>
    <script src="esri-leaflet-geocoder.js"></script>
  </head>
  <body>
    <div style="height: 300px" id="mapid"></div>
    <script>
      var x = location.search
      var y = x.split('=')
      var temp = y[1]
      var address = decodeURIComponent(temp)
      var mymap = L.map('mapid', {}).setView([50.97264, 7.00469], 3)
      L.esri.basemapLayer('Gray').addTo(mymap)
      L.esri.Geocoding.geocode()
        .text(address)
        .run(function (err, result, response) {
          L.marker(result.results[0].latlng).addTo(mymap)
          mymap.setView(result[0].latlng, 13)
        })
    </script>
  </body>
</html>
```

Was haben wir genau gemacht? Angenommen, wir haben in der Adresszeile des Browsers den Text `?test=56751 Gering` an die URL angefügt. Dieser Text würde im Beispiel als erstes in der Variablen `x` gespeichert. Hierzu wird die [Eigenschaft `location.search`](https://wiki.selfhtml.org/index.php?title=JavaScript/Location/search)[^wiki.selfhtml.org/index.php?title=javascript/location/search] zu Hilfe genommen. Diese Eigenschaft speichert eine Zeichenkette die, durch ein Fragezeichen getrennt, zur aktuellen URL gehört. Die Variable `x` enthält also nun den Text `test=56729 Kehrig`. Diesen Text haben wir dann mithilfe von `x.split("=")` an der Position des Gleichheitszeichens getrennt und die beiden Teile als Array in der Variablen `y` gespeichert. Den Adressteil können wir nun über `y[1]` abrufen. Wir müssen die Adresse vor der Eingabe in eine Suchfunktion aber noch dekodieren. In der URL wurde diese nämlich kodiert. `var address = decodeURIComponent(temp)` macht aus `56729%20Kehrig` wieder `56729 Kehrig` und speichert den dekodierten Text in der Variablen `address` ab. Und diesen Text können wir nun als Suchtext in die Methode `text()` des Geocode Objektes eingeben und auf dem Ergebnis die Methode `run()` ausführen.

> Weitere Informationen zu `decodeURIComponent()` finden Sie unter der Adresse [https://wiki.selfhtml.org/](https://wiki.selfhtml.org/index.php?title=JavaScript/decodeURIComponent)[^wiki.selfhtml.org/index.php?title=javascript/decodeuricomponent].

```js
L.esri.Geocoding.geocode()
.text(address)
.run(function(err, result, response){
L.marker(result.results[0].latlng)
.addTo(mymap);
}
);
mymap.setView(result.results[0].latlng,13);
});
```

Die Rückruffunktion, die daraufhin ausgeführt wird, erstellt einen Marker für das erste Ergebnis und zentriert diesen Marker, bei einer Zoom-Stufe von 13, in der Karte. Eine [Rückruffunktion](https://de.wikipedia.org/w/index.php?title=R%C3%BCckruffunktion)[^de.wikipedia.org/w/index.php?title=r%c3%bcckruffunktion] ist eine Funktion, die einer anderen Funktion als Parameter übergeben und von dieser erst später, unter definierten Bedingungen mit definierten Argumenten, aufgerufen wird. Eine solche Funktion kennen Sie sicher auch unter dem englischen Namen `callback function`.

Möchten Sie die Suchanfrage genauer formulieren? Dann ersetzen Sie den Text

```js
L.esri.Geocoding.geocode()
.text('Amselweg 7, Koblenz, Rheinland Pfalz, 65065')
.run(function(err, results, response){
…
});
```

mit

```js
L.esri.Geocoding.geocode()
.address('Amselweg 7')
.city('Koblenz').region('Rheinland Pfalz')
.postal(65065)
.run(function(err, results, response){
…
});
```

Welche Funktionen Sie genau verwenden können, ist in der Dokumentation beschrieben: [https://esri.github.io/](https://esri.github.io/esri-leaflet/api-reference/tasks/geocode.html)[^esri.github.io/esri-leaflet/api-reference/tasks/geocode.html].

Voilà! Wenn sie an die URL, unter der Sie Ihre Leaflet Karte abegelegt haben, den Text `?test=56751 Gering` anhängen, wird Ihnen die in der nachfolgenden Abbildung dargestellte Karte angezeigt.

![Mithilfe eines Parameters in der URL den passenden Ort finden.](/images/936.png)

#### Nach Klick auf die Karte die passende Adresse ausgeben

Umgekehrtes Geocoding ist die Bezeichnung für die Umwandlung geografischer Koordinaten in, für Menschen gut lesbare, Adressen. Sie wissen ja schon, dass Leaflet bei einem Klick mit der Maus auf die Karte die Koordinaten in einem Objekt speichert. Nun möchten Sie aber gerne anstelle der Koordinaten wissen, welche Adresse Sie gerade angeklickt haben. Das nächste Beispiel zeigt ihnen, wie Sie dies erreichen können.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_936.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="esri-leaflet.js"></script>
    <script src="esri-leaflet-geocoder.js"></script>
  </head>
  <body>
    <div style="height: 300px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', { doubleClickZoom: false }).setView(
        [50.97264, 7.00469],
        12
      )
      L.esri.basemapLayer('Gray').addTo(mymap)
      mymap.on('click', function (e) {
        var r = L.marker()
        L.esri.Geocoding.reverseGeocode()
          .latlng(e.latlng)
          .run(function (error, result, response) {
            mymap.removeLayer(r)
            r = L.marker(result.latlng)
              .addTo(mymap)
              .bindPopup(result.address.Match_addr)
              .openPopup()
          })
      })
    </script>
  </body>
</html>
```

Das haben wir gemacht? Wir haben veranlasst, dass immer zu dem Zeitpunkt, zu dem jemand auf die Karte klickt, eine umgekehrte Geocoding Suche gestartet wird. Genau habe wir dies mit dem Programmcode, der in der Funktion `mymap.on('click', function(e){}` ausgeführt wird, erreicht. Gleichzeitig wird ein Marker an der Position, die angeklickt wurde, erstellt. Das Ergebnis der Suche – also die gefundene Adresse – wird schlussendlich als Text in einem Pop-up zum Marker angezeigt. Wie dieses Pop-up aussieht, können Sie sich in der nächsten Abbildung ansehen.

![Nach Klick auf die Karte die passende Adresse ausgeben.](/images/936.png)

Die Dokumentation zum ESRI Reverse Geocoding finden Sie unter der Internetadresse [http://esri.github.io/](http://esri.github.io/esri-leaflet/api-reference/tasks/reverse-geocode.html][^esri.github.io/esri-leaflet/api-reference/tasks/reverse-geocode.html].

### Feature Services

Im vorletzten Kapitel haben wir mit dem `L.esri.dynamicMapLayer` Daten über einen Webservice geladen. Dabei wurden alle zur Verfügung stehenden Daten auf der Karte angezeigt. Das kann sehr unübersichtlich werden. Meist bietet ein Webservice große Datenmengen an. Sie möchten sicherlich nur die für Sie und Ihre Anwender relevanten Daten auf Ihrer Karte anzeigen. Eine Lösung für diese Aufgabe erarbeiten wir in diesem Kapitel.

In diesem Beispiel werden wir die [Klasse `L.esri.featureLayer`](https://esri.github.io/esri-leaflet/api-reference/layers/feature-layer.html)[^esri.github.io/esri-leaflet/api-reference/layers/feature-layer.html] instanziieren. Vorher haben wir mit der Klasse [`L.esri.dynamicMapLayer`](https://esri.github.io/esri-leaflet/api-reference/layers/dynamic-map-layer.html)[^esri.github.io/esri-leaflet/api-reference/layers/dynamic-map-layer.html] gearbeitet. Vielleicht fragen Sie sich nun, wie die beiden Klassen sich genau unterscheiden. ESRI erklärt dies wie folgt: Mit einem [Feature-Service](http://resources.arcgis.com/de/help/main/10.2/index.html#//0154000002w8000000)[^resources.arcgis.com/de/help/main/10.2/index.html#//0154000002w8000000]
können Sie Funktionen über das Internet bereitstellen. Mit dem [Karten-Service](http://resources.arcgis.com/de/help/main/10.2/index.html#//0154000002m7000000)[^resources.arcgis.com/de/help/main/10.2/index.html#//0154000002m7000000] können Sie Karten im Web bereitstellen. Meiner Meinung nach ist ein _Feature Service_ ein spezieller _Karten-Service_ – denn ein Feature Service setzt eine Karte voraus.

> Interessieren Sie sich für die technologische Entwicklung beim ESRI? Die wichtigsten Informationen zur ArcGIS Plattform und zu ergänzenden Technologien können Sie auf dem Blog GIS IQ – [https://gis-iq.esri.de/](https://gis-iq.esri.de) – mitverfolgen.

#### Attribute

So, nun kommen wir zum praktischen Beispiel. Wir konfigurieren eine Abfrage zum Filtern von Daten. Konkret verwenden wir Daten zur Bodengeologie, deren Daten über die Adresse [https://services.arcgis.com](https://services.arcgis.com/OLiydejKCZTGhvWg/ArcGIS/rest/services/BodenGeologie/FeatureServer)[^services.arcgis.com/OLiydejKCZTGhvWg/ArcGIS/rest/services/BodenGeologie/FeatureServer (t*beispieldateien_zum*)] bereit gestellt werden.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_935.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="esri-leaflet.js"></script>
  </head>
  <body>
    <select id="bodengeologieID">
      <option value="">Reset</option>
      <option value="PARAMADOTXT='Saure regionalmetamorphe Gesteine'">
        Saure regionalmetamorphe Gesteine
      </option>
      <option value="PARAMADOTXT='fluvioglaziale Sedimente'">
        fluvioglaziale Sedimente
      </option>
      <option value="PARAMADOTXT='Kalkstein'">Kalkstein</option>
      <option value="PARAMADOTXT='Geschiebelehm/Geschiebemergel'">
        Geschiebelehm/Geschiebemergel
      </option>
      <option value="PARAMADOTXT='Mergel'">Mergel</option>
      <option value="PARAMADOTXT='Toniger Lehm'">Toniger Lehm</option>
      <option value="PARAMADOTXT='Tiefengesteine bzw. Plutonite'">
        Tiefengesteine bzw. Plutonite
      </option>
      <option value="PARAMADOTXT='keine Informationen'">
        keine Informationen
      </option>
      <option
        value="PARAMADOTXT='Basische bis ultrabasische vulkanischen Gesteine (Vulkanite)'"
      >
        Basische bis ultrabasische vulkanischen Gesteine (Vulkanite)
      </option>
      <option value="PARAMADOTXT='Löss'">Löss</option>
      <option value="PARAMADOTXT='Residualton'">Residualton</option>
      <option value="PARAMADOTXT='Fluviale Tone, Schluffe und Lehme'">
        Fluviale Tone, Schluffe und Lehme
      </option>
      <option value="PARAMADOTXT='Sandstein'">Sandstein</option>
      <option value="PARAMADOTXT='Sande der Flussterrassen'">
        Sande der Flussterrassen
      </option>
      <option value="PARAMADOTXT='Tonstein'">Tonstein</option>
      <option value="PARAMADOTXT='Steiniger Lehm'">Steiniger Lehm</option>
      <option value="PARAMADOTXT='Residuallehm'">Residuallehm</option>
      <option value="PARAMADOTXT='Schiefer'">Schiefer</option>
    </select>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.26469], 12)
      L.esri.basemapLayer('Gray').addTo(mymap)
      var url =
        'http://services.arcgis.com/OLiydejKCZTGhvWg/ArcGIS/rest/services/BodenGeologie/FeatureServer/0'
      var bodengeologie = document.getElementById('bodengeologieID')
      var bodengeologieLayer = L.esri
        .featureLayer({
          url: url,
        })
        .addTo(mymap)
      var popupTemplate =
        '<h3>Details:</h3>\n\
PARAMADOTXT: {PARAMADOTXT}<br>'
      bodengeologieLayer.bindPopup(function (layer) {
        console.log(layer.feature.properties)
        return L.Util.template(popupTemplate, layer.feature.properties)
      })
      bodengeologie.addEventListener('change', function () {
        bodengeologieLayer.setWhere(bodengeologie.value)
      })
    </script>
  </body>
</html>
```

Was macht der Programmcode in diesem Beispiel konkret. Zunächst wird mit dem Befehl `var bodengeologieLayer = L.esri.featureLayer({ url: url }).addTo(mymap);` ein `L.esri.featureLayer` Objekt erstellt und dieses zur Karte hinzugefügt. Der nächste Schritt ist das Filtern der Daten. Dies erreichen wir mit der Zeile `bodengeologieLayer.setWhere(bodengeologie.value);`, wichti ist der Einschub `setWhere`. Das Ergebnis sehen Sie in der nächsten Abbildung. Wenn Sie in der Auswahlliste den Eintrag _Schiefer_ auswählen, werden nur die Regionen in denen Schiefer vorkommt, auf der Karte als Bereich angezeigt.

![Karte zur Veranschaulichung der Bodengeologie mithilfe eines Feature Layer Service.](/images/935a.png)

#### Abstand visualisieren

Ein weiteres Merkmal, das auf Landkarten oft wichtig ist, ist die Entfernung zu einem Punkt. Oft möchte man gerne wissen, welche Objekte sich innerhalb eines bestimmten Abstands zu einer bestimmten Koordinate befinden. Diese Fragestellung beantwortet das nächste Beispiel.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/5/index_934.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="esri-leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.26469], 12)
      L.esri.basemapLayer('Gray').addTo(mymap)
      var url =
        'http://services.arcgis.com/OLiydejKCZTGhvWg/ArcGIS/rest/services/BodenGeologie/FeatureServer/0'
      var bodengeologie = document.getElementById('bodengeologieID')
      var bodengeologieLayer = L.esri
        .featureLayer({
          url: url,
        })
        .addTo(mymap)
      var nearbyIds = []
      mymap.on('click', function (e) {
        bodengeologieLayer
          .query()
          .nearby(e.latlng, 5000)
          .ids(function (error, ids) {
            for (var j = 0; j < nearbyIds.length; j++) {
              bodengeologieLayer.setFeatureStyle(nearbyIds[j], {
                color: '#3388FF',
              })
            }
            nearbyIds = ids
            for (var i = 0; i < ids.length; i++) {
              bodengeologieLayer.setFeatureStyle(ids[i], {
                color: '#BA454E',
              })
            }
          })
      })
    </script>
  </body>
</html>
```

Was passiert hier? Zunächst werden im Beispiel Bodengeologien mithilfe des Objektes `L.esri.featureLayer` zur Karte hinzugefügt. Soweit gibt es keinen Unterschied zum vorherigen Beispiel. Danach rufen wir die Funktion `nearby()` des [Objektes `L.esri.Query()`](https://esri.github.io/esri-leaflet/api-reference/tasks/query.html)[^esri.github.io/esri-leaflet/api-reference/tasks/query.html] für jeden Marker auf. Alle die Marker, die sich in einem Abstand von 5000 Metern befinden, werden im Anschluss rot (#BA454E) gefärbt. Alle anderen bekommen die Farbe Blau (#3388FF);

Das Ergebnis sehen Sie im nächsten Bild. Sobald Sie einen Punkt auf der Karte anklicken, werden alle Geologien im Abstand von 5000 Metern um die angeklickte Stelle rot hervorgehoben.

![Karte zur Veranschaulichung der Bodengeologie mithilfe eines [Feature Layer Service](https://esri.github.io/esri-leaflet/api-reference/services/feature-layer-service.html). Außerdem werden per Klick die Bodengeologien die in einem bestimmten Abstand zur angeklickten Position liegen farblich hervorgehoben.](/images/935b.png)

## In diesem Kapitel haben wir …

In diesem Teil haben wir uns als erstes die Karten, die ESRI anbietet, angesehen. Danach haben wir mit einem Shapefile gearbeitet und ESRI Webservices genutzt. Sie wissen nun was ein `L.esri.DynamicMapLayer,` was Geocoding und was ein `L.esri.FeatureLayer` ist.
<img src="https://vg07.met.vgwort.de/na/d3cd58a707a94d5d96054dc2915f26c1" width="1" height="1" alt="">
