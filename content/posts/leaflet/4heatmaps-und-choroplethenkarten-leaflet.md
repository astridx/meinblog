---
date: 2018-12-16
title: 'Heatmaps und Choroplethenkarten'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: heatmaps-und-choroplethenkarten-leaflet
langKey: de
categories:
  - Leaflet
tags:
  - geografische Daten
  - Leaflet
---

In den vorherigen Kapiteln haben wir uns angesehen,
wie Sie Elemente direkt – oder mithilfe von in GeoJSON formatierten Daten –
zu Ihrer Karte hinzugefügt können.
Jetzt geht es darum, dieses Wissen in die Tat umzusetzen und eigene
Vorstellungen umzusetzen.

## In diesem Kapitel werden wir …

In diesem Kapitel werden wir nicht nur einfach Elemente auf die Karte zeichnen.
Wir werden mit der Karte Informationen weitergeben und Fragen beantworten.
Insbesondere statistische Daten können auf Karten viel besser veranschaulicht werden,
als in einer trockenen Tabelle – und nebenbei macht es sogar Spaß
eine solche Karte zu erkunden.

Zwei Typen von Karten – nämlich Heatmaps und Choroplethenkarten – sehen wir uns
nun in diesem Kapitel näher an. Beginnen wir mit der Heatmap.

## Heatmaps

[Heatmaps](https://de.wikipedia.org/w/index.php?title=Heatmap&oldid=181851051)[^1] kennen wir im Deutschen auch
unter dem Namen Wärmebild.

### Was ist eine Heatmap?

Eine Heatmap ist im Grunde genommen ein Diagramm,
mit dem Daten visualisiert werden.
Diese Visualisierung dient dazu, in einer großen Datenmenge intuitiv
und schnell einen Überblick zu bekommen.
In der grafischen Darstellung kristallisieren sich besonders
markante Werte oft schnell heraus.

Heatmaps färben Bereich unterschiedlich, wenn die _Intensität_ oder die _Dichte_
des untersuchten Objektes unterschiedlich ist.

> Möchten
> Sie gerne wissen, wie die Darstellung einer Heatmap technisch
> umgesetzt wird? Vereinfacht ausgedrückt wird zunächst ein
> Gitternetz über die Karte gelegt. Im nächsten Schritt wird die Anzahl
> der Punkte in jedem Bereich des Gitternetzes gezählt. Je nach Punktanzahl
> wird zum Schluss die
> Anzeige angepasst. Ist in einem Bereich kein Punkt vorhanden, wird
> dieser Bereich nicht mit Farbe gefüllt. Bei den anderen Bereichen
> wird je nach Anzahl der Punkte die passende Farbe im Bereich eingeblendet.
> Dieses Verfahren nennt man Multivariate Kerndichte Schätzung
> (englisch: Multivariate kernel density estimation). Detaillierter
> können Sie dies beispielsweise bei
> [Wikipedia](https://de.wikipedia.org/w/index.php?title=Kerndichtesch%C3%A4tzer&oldid=182712162)[^2]
> nachlesen.

![(By Drleft (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons)](/images/946.png)

_Abbildung: (By Drleft (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons)._

Meist werden bei geringer Intensität oder geringer Dichte kalte Farben verwendet.
Bei einem hohen Aufkommen wird der Bereich mit warmen Farben eingefärbt.
Dies erklärt auch den Namen Heatmap – der englische Begriff für Hitze ist _heat_.
Blau gilt als [kalte Farbe](https://de.wikipedia.org/w/index.php?title=Kalte_Farbe&oldid=182760035)[^3],
Rot, Orange und Gelb gelten als [warme Farben](https://de.wikipedia.org/w/index.php?title=Warme_Farbe&oldid=137765311)[^4].

### Heatmaps in Leaflet – Dichte

Unser erstes Beispiel zeigt eine Heatmap, die die unterschiedliche Dichte
von Punkten sichtbar macht. Die Funktionen zum Anzeigen einer Heatmap werden nicht
im Standardumfang von Leaflet mitgeliefert.
Es handelt sich hierbei um eine besondere Funktion,
die im Normalfall nicht zur Darstellung einer digitalen Karte benötigt wird.
Leaflet selbst konzentriert sich auf die Anwendungsfälle,
die üblicherweise beim Anzeigen einer Karte benötigt werden –
ist aber offen für Plugins.
Eines dieser Plugins ist [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat)[^5].

> Weitere Plugins, mit denen Sie
> Wärmeabbildungen oder ähnliche Visualisierungen aus Vektordaten
> erstellen können, finden Sie auf der Website von Leaflet im Bereich
> Plugins: [http://leafletjs.com/plugins.html#heatmaps](http://leafletjs.com/plugins.html#heatmaps)[^6].

Nachfolgende finden Sie das erste Beispiel für diesen Themenbereich.

```
<!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
*<script src="leaflet-heat.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([50.00555, 7.591838], 10);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
*var points = [
*[50.1555, 7.591838, 0.2],
*[50.0931, 7.664177, 0.2],
*...
*[50.088041, 7.652033, 0.2],
*[50.088041, 7.652033, 0.2],
*[50.088041, 7.652033, 0.2],
*[50.088041, 7.652033, 0.2]
*];
*var heat = L.heatLayer(points,
*{
*minOpacity: 0.95,
*blur: 15,
*maxZoom: 15,
*max: 1,
*radius: 15,
*gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
*}).addTo(mymap);
 </script>
 </body>
 </html>
<!--index_965.html-->
```

Was zeigt Ihnen dieses Beispiel?
Als Erstes haben wir die Skript-Datei zum Plugin mit
`<script src="leaflet-heat.js"></script>` eingebunden.
Ich hatte die Datei von der oben verlinkten Website kopiert und unter dem Namen
`leaflet-heat.js` im gleichen Verzeichnis wie die Datei `index.html` abgelegt.
Danach habe ich eine Variable mit dem Namen `points` vom Typ `Array` erstellt.
In dieser Variablen habe ich 700 Koordinaten gespeichert.
Zu guter Letzt habe ich ein Objekt der Klasse `L.heatLayer` instanziiert
und diesem die Koordinaten in der Variablen `points` und einige Optionen übergeben.

> Der Dritte Wert bei der Übergabe der
> Koordinaten steht für die Intensität.  
> `var points = [`  
> `[50.1555 , 7.591838 ,`**`0.2`**`],`  
> `…`  
> Ich habe diesen Wert hier absichtlich immer mit der gleichen Zahl belegt.
> Ich nutze dieses Plugin nicht für die Visualisierung der Intensität.
> Hierfür zeige ich Ihnen im nächsten Kapitel eine andere Leaflet Erweiterung.

Das Ergebnis sehen Sie im nachfolgenden Bild.
Da wir noch nichts gestaltet haben, sehen Sie die Standardansicht.
Diese ist noch sehr rudimentär. Das geht besser, Sie werden sehen.

![Heatmap](/images/950.png)

_Abbildung: Heatmap zur Anzeige der Dichte von Punkten._

#### Stile und Optionen

Das [Plugin Leaflet.heat](https://github.com/Leaflet/Leaflet.heat)[^5]
erlaubt es Ihnen Parameter zu übergeben. Dabei haben Sie folgende Möglichkeiten:

- `minOpacity:`  
  Die Option `minOpacity` gibt die minimale Dichte an, ab der die Anzeige beginnt.
- `maxZoom:`  
  Die Opiton `maxZoom` sollte auf die Zoomstufe gesetzt werden,
  bei der die Punkte die maximale Intensität erreichen.
  Als Standard wird der Wert, der für `maxZoom` in der Karte gesetzt ist,
  verwendet.
  Auf die Darstellung der Heatmap Ebene hat diese Option keine Auswirkungen.
  Sie sollten den Wert so setzten, dass Ihre Karte die beste Aussagekraft hat.
  Wenn der Wert zu hoch ist, kann es sein, dass die Punkte so weit auseinander liegen,
  dass der dichteste Bereich nicht mehr deutlich erkennbar ist.
  Setzen Sie den Wert zu niedrig an, kann man die Daten vielleicht nicht mehr
  zusammenhängend im Überblick sehen.
- `max:`  
  Der Standardwert der maximalen Punktintensität ist 1.0.
- `radius:`  
  Diese Option erklärt sich meiner Meinung nach von selbst.
  Mit dem Wert `radius` geben Sie die Größe an, in der die Punkte angezeigt
  werden sollen. 25 ist der Standardwert.
- `blur:`  
  Mit der Option `blur` können Sie die Schärfe beeinflussen.
  Der Wert bestimmt, wie viele Punkte zusammen gefasst werden.
  Ein niedriger `blur` Wert erzeugt einzelne Punkte, wohingegen ein hoher Wert
  Punkte zusammenfasst. Standardmäßig ist der Wert auf 15 festgesetzt.
- `gradient:`  
  Die Option `gradient` steht für die Konfiguration des Farbverlaufs.
  Standardwert ist `{0.4: 'blue', 0.65: 'lime', 1: 'red'}`.
  Sie können beliebig viele Werte zwischen 0 und 1 zwischen den Klammern angeben.
  Die Farbe, die am Rand angezeigt werden soll,
  sollten Sie mit dem niedrigen Wert angeben.
  Der Rand ist der Bereich in dem die Punkte nicht dicht beieinander sind.
  Die Farbe, die im Zentrum zu sehen sein soll,
  geben Sie idealerweise nahe beim Wert 1 an.
  Das Zentrum ist der Bereich in dem die Punkte am dichtesten beieinander liegen.

##### Nachfolgend sehen Sie einen Vergleich einer Ansichten mit unterschiedlichen Werten für die Optionen blur, gradient und maxZoom

![`blur` *= 1*](/images/980a.png)

_Abbildung: `blur` _= 1* - Es werden soviele Punkte zusammengefasst, dass jeder Hitzepunkt der Heatmap sehr scharf dargestellt wird. Ein Zentrum ist nicht mehr auszumachen.*

![`blur` *= 40*](/images/980b.png)

_Abbildung: `blur` _= 40* - Randbereiche und Zentrum sind erkennbar.*

![`maxZoom` * = 6*](/images/980c.png)

_Abbildung: `maxZoom` _ = 6* - Bei dieser niedrigen Zoomstufe kann die Verteilung nicht visualisiert werden. Alles liegt so nah beieinander, dass nur ein Punkt zu sehen ist.*

![`maxZoom` * = 15*](/images/980d.png)

_Abbildung: `maxZoom` _ = 15* - Bei dieser Zoomstufe kann eine Verteilung dargestellt werden.*

![`gradien {0.1: '#edf8fb', 0.2: '#ccece6', 0.3: '#99d8c9', 0.5: '#66c2a4', 0.7: '#2ca25f', 1: '#006d2c'}`](/images/980e.png)

_Abbildung: Eine Heatmap mit benutzerdefinierten Farben: `gradien {0.1: '#edf8fb', 0.2: '#ccece6', 0.3: '#99d8c9',` `0.5: '#66c2a4', 0.7: '#2ca25f', 1: '#006d2c'}`._

> Gefallen Ihnen die standardmäßig gesetzten kalten und warmen
> Farben nicht? Möchten Sie lieber Ihre eigene Farbzusammenstellung
> nutzen? Die Website [http://colorbrewer2.org](http://colorbrewer2.org)[^7]
> hilft beim Auswählen von Farben.

#### Methoden

Zusätzlich zu den Stylesheet Optionen bietet Ihnen das Plugin `Leaflet.heat` vier Methoden:

- `setOptions(options):`  
  Diese Methode setzt die Optionen der Heatmap neu und zeichnet die Heatmap neu.
- `addLatLng(latlng):`  
  Diese Methode fügt einen Punkt zur Heatmap hinzu und aktualisiert
  die Ansicht gleichzeitig.
- `setLatLngs(latlngs):`  
  Diese Methode liest die Daten neu ein und aktualisiert danach die Ansicht.
- `redraw():`  
  Diese Methode zeichnet die Heatmap neu.
  Sie wird beim Ausführen der drei vorher genannten Methoden automatisch ausgeführt,
  so das Sie dies nicht selbst veranlassen müssen.

##### Ein Beispiel zur Anwendung der Methoden - Die Methode addLatLng()

Mithilfe der Methode `addLatLng()` können Sie nachträglich
einen Punkt zum Heatmap Layer hinzufügen.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
*<script src="../leaflet/leaflet.js"></script>
 <script src="leaflet-heat.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([50.27264, 7.26469], 10);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
 var points = [
 [50.1555, 7.591838, 0.2],
 [50.0931, 7.664177, 0.2],
 ...
 [50.088041, 7.652033, 0.2],
 [50.088041, 7.652033, 0.2],
 [50.088041, 7.652033, 0.2]
 ];
 var heat = L.heatLayer(points,
 {
 minOpacity: 0.95,
 blur: 15,
 maxZoom: 15,
 max: 1.0,
 radius: 25,
 gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
 }).addTo(mymap);
*heat.addLatLng([50.27264, 7.26469, 0.2]);
 </script>
 </body>
 </html>
<!--index_964.html-->
```

In der nächsten Abbildung können Sie den neu hinzugefügten Punkt erkennen.

![Heatmap mit einem mithilfe der Methode `addLatLng` hinzugefügten Punkt.](/images/979.png)

_Abbildung: Heatmap mit einem mithilfe der Methode `addLatLng` hinzugefügten Punkt._

> Möchten Sie es Website Besuchern
> ermöglichen selbst Punkte zur Heatmap auf ihrer Karte hinzuzufügen? Eine
> Demo auf der Website zum Plugin zeigt genau solch ein Beispiel:
> [http://leaflet.github.io/Leaflet.heat/demo/draw.html](http://leaflet.github.io/Leaflet.heat/demo/draw.html)[^8]

##### Die Methoden addLatLng(), addLatLngs() und setOptions() der Klasse L.heatLayer zusammen in einem Beispiel

In diesem Kapitel stelle ich Ihnen ein Beispiel vor,
das per Schaltfläche die verschiedenen Methoden anwendet.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
*<script src="leaflet-heat.js"></script>
 </head>
 <body>
*<button onclick="add()">
*Punkt hinzufügen
*</button>
*<br>
*<button onclick="newPoint()">
*Daten neu setzen
*</button>
*<br>
*<button onclick="reset()">
*Reset
*</button>
*<br>
*<button onclick="setOptions()">
*Farben ändern
*</button>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([49.07264, 7.26469], 7);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
 var points = [
 [50.1555, 7.591838, 0.2],
 [50.0931, 7.664177, 0.2],
 ...
 [50.088041, 7.652033, 0.2],
 [50.088041, 7.652033, 0.2],
 [50.088041, 7.652033, 0.2]
 ];
 var heat = L.heatLayer(points,
 {
 minOpacity: 0.95,
 blur: 15,
 maxZoom: 15,
 max: 1.0,
 radius: 25,
 gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
 }).addTo(mymap);
*function add()
*{
*heat.addLatLng([50.1, 7.1, 0.2]);
*}
*function newPoint()
*{
*heat.setLatLngs([[50.5, 7, 0.2]]);
*}
*function reset()
*{
*heat.setLatLngs(points);
*}
*function setOptions()
*{
*heat.setOptions({gradient: {0.4: 'black', 0.65: 'gray', 1: 'white'}
*});
*}
 </script>
 </body>
 </html>
<!--index_963.html-->
```

Was passiert genau in diesem Beispiel?
Zunächst fügen wir vier Schaltflächen in das HTML-Dokument ein.
Jede Schaltfläche führt eine der Methoden `add()`, `newPoint()`, `reset()`
oder `setOptions()` der Klasse L.heatLayer aus, wenn sie angeklickt wird.

- Der Aufruf von `add()` führt den Code `heat.addLatLng([50.1, 7.1, 0.2]);` aus
  und fügt dabei den Punkt `[50.1, 7.1, 0.2]` zu den Daten der Heatmap Ebene hinzu.
- Die Methode `newPoint()` führt die Programmcodezeile
  `heat.setLatLngs([[50.5, 7, 0.2]]);` aus und setzt
  dabei die Daten der Heatmap Ebene neu.
  Die Heatmap Ebene enthält nun nur den einen Punkt `[[50.5, 7, 0.2]]` im Array.
- Die Methode `reset()` führt den Code
  `heat.setLatLngs(points);` aus und ersetzt damit die Daten der
  Heatmap Ebene wieder mit den Daten der Variablen `points`.  
  **Achtung:** Wenn Sie einen Punkt zum Layer hinzugefügt haben,
  als die Variable `points` Datenbestand des Layers war,
  dann ist dieser Punkt nun auch in der Variablen `points` enthalten!
- Die Methode `setOptions()` ist meiner Meinung nach selbsterklärend.
  Sie ändert einfach das Aussehen, also die CSS-Eigenschaften der Ebene.

Einen Screenshot der Karte zu diesem Beispiel sehen Sie in der nachfolgenden
Abbildung.

![Eine Karte mit Schaltfläche die die Methoden `add()`, `newPoint()`, `reset()` oder `setOptions()` per Klick ausführen.](/images/953.png)

_Abbildung: Eine Karte mit Schaltfläche die die Methoden `add()`, `newPoint()`, `reset()` oder `setOptions()` der Klasse L.heatLayer per Klick ausführen._

#### Marker

Im nächsten Beispiel zeige ich Ihnen, wie Sie zu jedem Punkt in einer Heatmap
einen Marker hinzufügen können. Das ist ganz praktisch, wenn Sie die Eigenschaften
der einzelnen Punkte aufzeigen möchten.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 <script src="leaflet-heat.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([50.1555 , 7.591838], 10);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
 var points = [
*[50.1555 , 7.591838 , "<img src='http://lorempixel.com/200/200/'>"],
* [50.0931 , 7.664177 , "<img src='http://lorempixel.com/200/200/'>"],
 ...
*[50.088041 , 7.652033 , "<img src='http://lorempixel.com/200/200/'>"],
*[50.088041 , 7.652033 , "<img src='http://lorempixel.com/200/200/'>"]
 ];
*for(var i=0;i<points.length;i++)
*{
*L.marker(
*[parseFloat(points[i][0]),parseFloat(points[i][1])],
*{opacity:0}).bindPopup(points[i][2],{keepInView:true}).addTo(mymap);
*}

 var heat = L.heatLayer(points,
 {
 minOpacity: 0.95,
 blur: 15,
 maxZoom: 15,
 max: 1,
 radius: 15,
 gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
 }).addTo(mymap);
 </script>
 </body>
 </html>
<!--index_962.html-->
```

Was ist in diesem Beispiel anders? Wir haben der Variablen `point`
einen dritten Wert mitgegeben. Dieser dritte Wert beschreibt
die Adresse zu einem Image. Dies hätte aber auch ein gewöhnlicher Text sein können.
Diesen dritten Wert haben wir dann in der Methode
`bindPopup(points[i][2],{keepInView)`
dazu genutzt, einen individuellen Marker zu kreieren.

So wie in der nächsten Abbildung könnte die fertige Karte auch bei Ihnen aussehen.

![Eine Heatmap mit benutzerdefinierten Markern pro Hitzepunkt.](/images/980.png)

_Abbildung: Eine Heatmap mit benutzerdefinierten Markern pro Hitzepunkt._

### Heatmaps mit Leaflet – Intensität

Im vorhergehenden Kapitel haben wir eine Heatmap mithilfe des
Plugins [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat)[^5] erstellt.
Diese Heatmap hat die Dichte von Punkten auf einer Karte visualisierte.
Wir haben bisher die Möglichkeit die Intensität zu visualisieren nicht genutzt.
Ich stelle Ihnen hier ein anderes Plugin für diesen Zweck vor.
Als nächstes möchte ich nun mit Ihnen eine Heatmap, die die Intensität
der Eigenschaft eines Punktes darstellt, mithilfe des Plugins
[heatmap.js](https://github.com/pa7/heatmap.js)[^9] erarbeiten.
Herunterladen können Sie das Plugin unter der Adresse
[https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html](https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html)[^10].
Hier finden Sie auch die Dokumentation zum Plugin.

Nachfolgende sehen Sie das erste Beispiel.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
*<script src="heatmap.js"></script>
*<script src="leaflet-heatmap.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var myData={
 max: 100,
*data: [
*{lat: 51.0934, lon:8.666819, value: 99},
*{lat: 51.0972, lon:8.667964, value: 99},
*...
*{lat: 50.088041, lon:7.652033, value: 23},
*{lat: 50.088041, lon:7.652033, value: 23}]
*};
 var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
*var cfg = {
*"radius": .1,
*"maxOpacity": .5,
*"scaleRadius": true,
*"useLocalExtrema": true,
*latField: 'lat',
*lngField: 'lon',
*valueField: 'value'
*};
*var heatmapLayer = new HeatmapOverlay(cfg);
*heatmapLayer.setData(myData);
*var map = new L.Map('mapid', {
*center: new L.LatLng(50.0586, 7.6568),
*zoom: 8,
*layers: [baseLayer, heatmapLayer]
*});
 </script>
 </body>
 </html>
<!--index_961.html-->
```

Was zeigt Ihnen dieses Beispiel genau? Sie sehen, dass Sie neben dem Skript
`leaflet.heat.js` auch das Skript `heat.js` einbinden können oder müssen.
Als nächstes müssen Sie die Daten, die Sie visualisieren möchten,
angeben – diese müssen eine Angabe zu dem maximal möglichen Wert enthalten:
`var myData={`**`max:100`**`, data: [ {lat: 51.0934, lon:8.666819, value: 99} ….`.
Danach können Sie die Heatmap Ebene erstellen.
Der Übersicht halber habe ich die Optionen der Heatmap Ebene in einer separaten Variablen,
nämlich der Variablen `cfg`, definiert.
Die Anweisung zum Erstellen der Heatmap Ebene mit den Optionen in der Variablen
`cfg` lautet `var heatmapLayer = new HeatmapOverlay(cfg);`.
Dieser Ebene können Sie nun die Daten mit dem Befehl
`heatmapLayer.setData(myData);` hinzufügen.
Zum Schluss fügen Sie diesen Layer nun zum Kartenobjekt hinzu.
Die Anweisung hierfür lautet:
`L.Map('mapid', { center: new L.LatLng(50.0586, 7.6568),` `zoom: 8, layers: [baseLayer,`**`heatmapLayer`**`]});`.

Wie das aussehen sollte, können Sie sich in der nächsten Abbildung ansehen.

![Eine Heatmap - erstellt mithilfe des Plugins [heatmap.js](https://github.com/pa7/heatmap.js) - die die Intensität darstellt.](/images/952.png)

_Abbildung: Eine Heatmap - erstellt mithilfe des Plugins [heatmap.js](https://github.com/pa7/heatmap.js) - die die Intensität darstellt._

#### Dokumentation und Methoden

Das nachfolgende Beispiel demonstriert Ihnen, wie unterschiedlich Punkte
mit unterschiedlicher Intensität aussehen können.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 <script src="heatmap.js"></script>
 <script src="leaflet-heatmap.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var myData={
*max: 100,
 data: [
 {lat: 51.0934, lon:8.666819, value: 99},
 {lat: 51.0972, lon:8.667964, value: 99},
 ...
 {lat: 50.088041, lon:7.652033, value: 23},
 {lat: 50.088041, lon:7.652033, value: 23}]
 };
 var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
 var cfg = {
 "radius": .1,
 "maxOpacity": .5,
 "scaleRadius": true,
 "useLocalExtrema": true,
 latField: 'lat',
 lngField: 'lon',
 valueField: 'value',
 gradient: {
 '.4': 'blue',
 '.8': 'lime',
 '.95': 'red'
 },
 blur: 0.75
 };
 var heatmapLayer = new HeatmapOverlay(cfg);
 var map = new L.Map('mapid', {
 center: new L.LatLng(50.0586, 7.6568),
 zoom: 8,
 layers: [baseLayer, heatmapLayer]
 });
 heatmapLayer.setData(myData);
*var test1 = {lat:51,lon:6,value:99};
*var test2 = {lat:50.5,lon:6,value:60};
*var test3 = {lat:50,lon:6,value:40};
*var test4 = {lat:49.5,lon:6,value:20};
*heatmapLayer.addData(test1);
* heatmapLayer.addData(test2);
*heatmapLayer.addData(test3);
*heatmapLayer.addData(test4);
 </script>
 </body>
 </html>
<!--index_960.html-->
```

Im vorhergehen Codebeispiel haben wir 4 Punkte mit unterschiedlicher
Intensität zur Karte hinzugefügt.
Die Werte für die Intensität betragen 99, 60, 40 und 20 bei einem maximalen Wert
von 100.
In der nachfolgenden Abbildung sehen Sie die unterschiedliche Darstellung
auf der Karte.

![Punkte mit unterschiedlicher Intensität auf einer Heatmap.](/images/949.png)

_Abbildung: Punkte mit unterschiedlicher Intensität auf einer Heatmap._

### Interaktive Heatmaps

Besonders spannend sind Karten, wenn wenn man sie bearbeiten und somit verändern kann.
Auch eine Heatmap kann interaktiv programmiert werden.
Sie können es beispielsweise Benutzern ermöglichen,
Daten zur Heatmap Ebene hinzuzufügen.
Wie das geht sehen Sie im nachfolgenden Beispiel.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
*<script src="../leaflet/leaflet.js"></script>
*<script src="leaflet-heat.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid', {doubleClickZoom:false}).setView([50.1555 , 7.591838], 15);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
 var points = [];
 var heat = L.heatLayer(points,
 {
 blur: 15,
 maxZoom: 15,
 max: 1.0,
 radius: 25,
 gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
 }).addTo(mymap);
*function addpoint(e){
*heat.addLatLng(e.latlng);
*}
*mymap.on('click', addpoint);
 </script>
 </body>
 </html>
<!--index_959.html-->
```

Was haben wir genau gemacht?
Als erstes haben wir mit der Zeile `<script src="leaflet-heat.js"></script>`
das Plugin `leaflet.heat` eingebunden. In diesem konkreten Beispiel ist es wichtig,
dass ein Doppelklick keine Änderung der Zoom-Stufen auf der Karte auslöst.
Deshalb stellen wir sicher, dass jemand nicht versehentlich zu schnell klickt
und ungewollt die Zoom-Stufe ändert, obwohl er eigentlich zwei Punkte hinzufügen
möchte.
Dies verhindern wir, indem wir die Option `doubleClickZoom` auf `false` setzen.
Zu Beginn sollen in unserem Beispiel noch keine Daten auf der Karte angezeigt werden.
Deshalb haben wir zunächst einen leeren Datensatz mit `var points = [];` erstellt.
Diesen leeren Datensatz geben wir einem `L.heatLayer` Objekt bei der
Instanziierung als Parameter mit: `var heat = L.heatLayer(points, {…}`.
Nun fehlt noch die Methode, mit der ein Punkt hinzugefügt wird.
Diese Methode ist mit der Anweisung
`function addpoint(e){ heat.addLatLng(e.latlng); }` schnell erstellt.
Und `mymap.on('click', addpoint);` bewirkt, dass diese auch ausgeführt wird,
wenn jemand auf die Karte klickt.

Das Ergebnis sehen Sie im Browser, wenn Sie die HTML Datei dieses Beispiels öffnen.
Zunächst wird die Karte ganz normal angezeigt. Sie sehen keinen Wärmepunkt.
Wenn Sie mit der Maus eine Stelle auf der Karte klicken,
wird an dieser Koordinate ein Wärmepunkt hinzugefügt.

![Die Leaflet Karte dieses Beispiels, nachdem mit der Maus einmal auf sie geklickt wurde.](/images/951.png)

_Abbildung: Die Leaflet Karte dieses Beispiels, nachdem mit der Maus einmal auf sie geklickt wurde._

### Animierte Heatmaps

Das ist fast wie Kino – im nächsten Beispiel verändert sich die Karte automatisch.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
*<script src="../leaflet/leaflet.js"></script>
*<script src="leaflet-heat.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid', {doubleClickZoom:false}).setView([50.1555 , 7.591838], 10);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
*var points = [];
*var points1 = [
*[50.1555 , 7.591838 ],
*...
*[50.088041 , 7.652033 ],
*[50.088041 , 7.652033 ]
*];
*var points2 = [
*[50.0371 , 7.618306 ],
*...
*[50.088041 , 7.652033 ],
*[50.088041 , 7.652033 ]
*];
*var points3 = [
*[50.088 , 7.65159 ],
*...
*[50.088041 , 7.652033 ],
*[50.088041 , 7.652033 ]
*];
*var heat = L.heatLayer(points).addTo(mymap);
*x=1;
*var name='';
*var interval = setInterval(function(){run()},2000);
*function run(){
*mymap.removeLayer(heat);
*name="points"+x.toString();
*heat = L.heatLayer(
*window[name],
*{blur:15,maxZoom:10,radius:25,
*gradient:{0.4: 'blue', 0.65: 'lime', 1: 'red'}})
*.addTo(mymap);
*if (x == 3)
*{
*x=1;
*}
*else
*{
*x++;
*}
*}
 </script>
 </body>
 </html>
<!--index_958.html>
```

Wie entsteht die Animation im Beispiel genau? Als erstes integrieren wir wieder
die notwendigen Skripte. Danach erstellen wir die vier Daten-Arrays und nennen diese
`points`, `points1`, `points2` und `points3`. Jedes Array enthält unterschiedliche
Daten. Mit dem ersten leeren Array erstellen wir die Schicht mit den Daten für
die Heatmap - also das Objekt des Typs `heatLayer`.
Die Hilfsvariable `x` in Verbindung mit der Methode `setIntervall()`
ermöglicht es uns dann, die Heatmap Ebenen fortlaufend mit anderen Daten
zu belegen und somit andere Daten anzuzeigen.

> In diesem Beispiel habe ich zwei
> JavaScript Elemente verwendet, die vielleicht erklärungsbedürftig
> sind. Als erstes habe ich den Variablennamen mit `window[name]` zusammengesetzt.
> Was bedeutet dies genau? Da es sich um JavaScript Objekte handelt,
> wird jede Variable in einem globalen JavaScript Object gespeichert.
> Wenn Sie also die Variable `points1` im globalen Bereich initialisieren –
> also nicht in einem Funktionskontext –,
> dann schreiben Sie diese Variablen implizit in ein
> globales Objekt. In einem Browser ist dies das [Objekt
> `window`](https://developer.mozilla.org/de/docs/Web/API/Window)[^11].
> Der Wert dieser Variablen kann mit der Punkt Notation oder der Klammer Notation
> abgerufen werden. Also entweder mit var `name = window.points1;` oder mit
> `var name = window['points1'];`.
> Außerdem haben wir die [Methode `setInterval()`](https://developer.mozilla.org/de/docs/Web/API/WindowTimers/setInterval)[^12]
> eingesetzt. Mit dieser Methode können Sie eine Funktion
> wiederholt aufrufen. Hierbei können Sie ein Intervall zwischen den
> einzelnen Aufrufen definieren.

So wie im nachfolgenden Bild sieht die Karte nur alle 6 Sekunden aus.
In der Zwischenzeit wechselt die Ansicht zweimal.

![Eine Heatmap mit wechselnden Daten - hier sehen Sie die Daten der Variablen `point1`.](/images/950.png)

_Abbildung: Eine Heatmap mit wechselnden Daten - hier sehen Sie die Daten der Variablen `point1`._

## Choroplethenkarte

[](#){#inChoroplethenkarte}

Im vorherigen Kapitel haben wir eine Heatmap zum visualisieren von Daten verwendet.
Wir haben zunächst mithilfe des Plugin `leaflet.heat` Bereiche,
in denen Punkte dichter vorkommen, farblich hervorgehoben.
Dann haben wir zusätzlich das Plugin `heat.js` geladen und Bereiche,
in denen die Punkte eine hohe Intensität haben, farblich besonders markiert.

Eine [Choroplethenkarte](https://de.wikipedia.org/w/index.php?title=Choroplethenkarte&oldid=175744569)[^13]
macht erst einmal nichts anderes.
Sie visualisiert die Dichte oder die Intensität bestimmter Objekte.
Sie tut dies aber auf eine andere Art und Weise als die Heatmap.

### Was genau unterscheidet eine Choroplethenkarte von einer Heatmap?

Ich hatte Ihnen erklärt, das eine Heatmap ein Raster über die Karte legt.
Je nachdem wie die zu visualisierenden Punkte in diesem Raster verteilt sind,
werden Farben sichtbar.
Eine Choroplethenkarte verwendet kein separates Raster.
Sie verwendet ein Polygon. Ein Polygon kann zum Beispiel ein Land
oder das Einzugsgebiet eines Unternehmens sein.
Im Kapitel [Die Karte mit Daten bestücken](#DieKarteMitDatenBestuecken)
hatte ich die Besonderheit eines Polygons beschrieben.
Dieses Vieleck hat eine Grenzlinie die einen Innenbereich und einen
Außenbereich voneinander abgrenzt.
Eine populäre Choroplethenkarte, die Sie sicherlich schon einmal gesehen haben,
ist die Darstellung der Bevölkerungsdichte eines Gebietes auf der Erde.
Ich habe hier ein Beispiel erstellt, welches genau dies tut.
Ich zeige Ihnen, wie Sie eine Karte, die die Verteilung der Bevölkerung in
Rheinland-Pfalz grafisch darstellt, selbst erstellen können.

### Choroplethenkarten in Leaflet

Das Schöne ist, dass wir mit Leaflet keine zusätzlichen Plugins für das
Erstellen einer Choroplethenkarte benötigen.
Leaflet ist wie dafür gemacht, GeoJSON Daten als Choroplethenkarte anzuzeigen.
Beginnen tun wir ganz vorne mit dem Klären der Frage: Wo bekommen Sie die Daten her?

#### Open Data

[](#){#ChoroplethenkarteOpenData}

Wenn Sie nicht selbst über Daten verfügen, können sie auf jede Menge
offener Data zugreifen.

> [Open Data](https://de.wikipedia.org/w/index.php?title=Open_Data&oldid=182539018)[^14],
> also offene Daten, sind Daten, die von jedem ohne jegliche
> Einschränkungen verwendet und weitergegeben werden dürfen. Warum
> gibt es Open Data? Viele Menschen vertreten die Meinung, dass frei
> nutzbare Daten zu mehr Transparenz und Zusammenarbeit führen. Die
> Bereitstellung offener Daten durch öffentliche Einrichtungen wird
> als eine Voraussetzung für
> [Open Government](https://de.wikipedia.org/w/index.php?title=Open_Government&oldid=180459228)[^15],
> also der Öffnung von Regierung und Verwaltung
> gegenüber der Bevölkerung und der Wirtschaft, angesehen. Die
> Befürworter von Open Data teilen somit viele Argumente mit den
> Befürwortern von [Open-Source](https://de.wikipedia.org/w/index.php?title=Open_Source&oldid=183919330)[^16].
> Open Data und Leaflet als Open Source Software passen gut zusammen.

[GeoJSON Utilities](http://opendatalab.de/projects/geojson-utilities/)[^17]
ist ein Projekt, welches den Export von Gemeindeflächen, Landkreisflächen und
Bundeslandflächen in Deutschland im GeoJSON Format ermöglicht.
Jede exportierte Fläche enthält zusätzliche Eigenschaften wie die Einwohnerzahl
und die Größe der Fläche in Quadratmetern.
Ich habe diese Daten für Rheinland-Pfalz in eine Datei exportiert.
Im nächsten Beispiel zeige ich Ihnen, wie Sie mithilfe dieser Datei
eine Chorophletenkarte erstellen können.
[GeoJSON Utilities](http://opendatalab.de/projects/geojson-utilities/)
ist übrigens auch eine mit Leaflet erstellte Anwendung.

Die Datei, die ich heruntergeladen haben, ist relativ groß.
Deshalb habe ich die Daten in einer separaten Datei abgelegt.
Ich schlage Ihnen vor, dies auch zu tun.
So bleibt Ihre HTML-Datei übersichtlich und Sie können sich voll und ganz auf das
Erstellen der Karte konzentrieren.
Wenn Sie die Daten in einer JavaSript Datei ablegen,
können Sie diese gleichzeitig als Variabel deklarieren.
Wie das geht, zeigt ihnen das nachfolgende Beispiel.
Zunächst sehen Sie die Datei, die die GeoJSON Daten enthält.
Dieser Datei habe ich den Namen `gemeinden.js` gegeben.
Die GeoJSON Daten werden in der Datei `gemeinden.js` in die Variable `ct` geladen.

```
*var ct =
 {
 "type":"**FeatureCollection**",
 "crs":{
 "type":"name",
 "properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},
 "source":"© GeoBasis-DE / BKG 2013 (Daten verändert)",
*"features":[
*{"type":"Feature",**
 "properties":
 {
 "ADE":6,
 "GF":4,
 "BSG":1,
 "RS":"073345001001",
 "AGS":"07334001","SDV_RS":"073345001001",
 "GEN":"Bellheim",
 "BEZ":"Gemeinde",
 "IBZ":64,
 "BEM":"gemeinschaftsangehörig",
 "NBD":"ja",
 "SN_L":"07",
 "SN_R":"3",
 ...,
*"destatis":{
  "RS":"073345001001",
* "area":20.44,
  "area_date":"31.12.2014",
* "population":8519,
  "population_m":4198,
  "population_w":4321,
  "population_density":417,
  "zip":"76756",
  "center_lon":"8,284042",
  ..,
*"geometry":{
* "type":"Polygon",
* "coordinates":**[[[8.276302148832034,49.21145214735215],
   [8.295112386392997,49.21205183793759],
  ...
 ]]}},

*{"type":"Feature",*
 "properties":{"ADE":6,
 "GF":4,
 "BSG":1,
 "RS":"073405003205",
 "AGS":"07340205",
 "SDV_RS":"073405003205",
 ...
<!--gemeinden.js>
```

In den Properties der einzelnen GeoJSON
Features sind unter anderem der Regionalschlüssel (`RS`), der
geographische Name (`GEN`), die amtliche Bezeichnung der
Verwaltungseinheit (`BEZ`) und die Destatis-Daten – insbesondere die Werte für
die Größe der Fläche in Quadratmetern (`area`) und die Einwohnerzahl (`population`) –
enthalten. Das vorherige Programmcodebeispiel zeigt nur einen Ausschnitt
der Datei `gemeinden.js`. Beachten Sie, dass es sich nicht um reines GeoJSON handelt.
Ganz genau handelt es sich um JavaScript.
Dieser JavaScript Code deklariert eine Variable, nämlich die Variable `ct`.
Einbinden können Sie die JavaScript Datei genau wie jedes andere Skript in Ihre
HTML-Datei mit der Zeile

`<script src="gemeinden.js"></script>`

Wenn die Datei `gemeinden.js` richtig eingebunden ist,
können Sie auf die GeoJSON Daten in dieser Datei ab nun über die Variable `ct`
zugreifen.

#### Farben

Der nächste Schritt zum Fertigstellen der Choroplethenkarte ist die Farbauswahl.
Beim Erstellen der Heatmaps im vorhergehenden Kapitel haben wir Farben übergeben
und das jeweilige Plugin hat diese entsprechend zugewiesen.
Beim Erstellen der Choroplethenkarte müssen wir uns selbst um diese Aufgabe kümmern.
Deshalb definieren wir eine Funktion,
die je nach Wert eine bestimmte Farbe errechnet und zurück gibt.
Idealerweise kennen Sie den höchsten Wert und den niedrigsten Wert in der Datenmenge.
Dann können Sie, je nach Verteilung der Werte,
bestimmten Wertbereichen eine Farbe zuordnen.

Der nachfolgende Programmcodeausschnitt nimmt den Parameter `x` entgegen und
berechnet anhand des Wertes dieses Parameters eine Farbe.
Die Funktion `color(x)` gibt bei einem höhere `x` Werte eine dunklere Farben aus.
Bei einem niedrigeren `x` Wert gibt die Funktion eine hellere Farben zurück.

```
function color(x) {
return x > 1000 ? '#990000' :
x > 750 ? '#d7301f' :
x > 500 ? '#ef6548' :
x > 250 ? '#fc8d59' :
x > 200 ? '#fdbb84' :
x > 100 ? '#fdd49e' :
x > 0   ? '#fee8c8' :'#fff7ec';
}
```

#### Stile

Nun benötigen wir noch eine Funktion, die das Zuweisen des passenden CSS
Stylesheets zu den Daten übernimmt.
Nur so können wir jedes GeoJSON Feature individuell ansehen und
ihm den passenden Stil zuweisen. Im nachfolgenden Programmcodeausschnitt
sehen Sie eine Funktion, die als Parameter ein GeoJSON Feature erwartet.
Je nach Eigenschaft im Feature gibt die Funktion die passenden Optionen zurück.
Sie erkennen sicherlich sofort, dass die wesentliche Option die mit dem Namen
`fillColor` ist.
Hier ist genau die Stelle, an der wir die eben erstellte Funktion `color()`
aufrufen und dieser als Parameter den Wert `feature.properties.destatis.population`,
also die Bevölkerungsanzahl, mitgeben.

```
function myStyle(feature) {
return {
fillColor: color(feature.properties.destatis.population),
weight: 1,
opacity: 1,
color: 'white',
fillOpacity: 0.85
};
}
```

#### Das vollständige Beispiel

Nachfolgenden habe ich die gerade besprochenen Codeschnipsel in einem
vollständigen Beispiel zusammengesetzt.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
*<script src="../leaflet/leaflet.js"></script>
*<script src="gemeinden.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid', {doubleClickZoom:false}).setView([49.9555 , 7.591838], 8);
*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
*function color(x) {
*return x > 1000 ? '#990000' :
*x > 750 ? '#d7301f' :
*x > 500 ? '#ef6548' :
*x > 250 ? '#fc8d59' :
*x > 200 ? '#fdbb84' :
*x > 100 ? '#fdd49e' :
*x > 0   ? '#fee8c8' :'#fff7ec';
*}
*function myStyle(feature) {
*return {
*fillColor: color(feature.properties.destatis.population),
*weight: 1,
*opacity: 1,
*color: 'white',
*fillOpacity: 0.85
*};
*}
*var geoJsonLayer = L.geoJson(ct, {style: myStyle}).addTo(mymap);
 </script>
 </body>
 </html>
<!--index_957.html-->
```

In Ihrem Browser sollte die Karte nun so wie in der nächsten Abbildung aussehen.

![Choroplethenkarten - Verteilung der Bevölkerung in Rheinland-Pfalz.](/images/947.png)

_Abbildung: Choroplethenkarten - Verteilung der Bevölkerung in Rheinland-Pfalz._

In diesem Beispiel haben wir einen festen Wert ganz unabhängig von anderen Werten
verwendet. Wir haben die Bevölkerungszahl unabhängig von der Flächengröße
der Gemeinde als Wert für die Farbe verwendet.
In dieser Karte können wir zwar ablesen, wo die Gemeinden mit hoher Bevölkerungszahl
sich befinden und wo die Gemeinden mit niedriger Bevölkerungsanzahl sind.
Wie dicht die Besiedelung ist, sagt diese Karte aber nicht aus.
Hierzu müssten wir die Bevölkerungszahl noch relativ zur Fläche der Gemeinde setzten.
Dies tun wir nun im nächsten Beispiel.

### Normalisierte Choroplethenkarten

Es kommt sicherlich sehr oft vor, dass Sie mit einer Choroplethenkarten
nicht nur einen absoluten Wert darstellen möchten.
Oft möchten Sie die Daten zu anderen Daten ins Verhältnis stellen.
Zum Beispiel könnten Sie den Anteil von Menschen,
die älter als 60 Jahre sind, darstellen wollen.
Da Geodaten einen Bezug zu einer Fläche haben, wird es in der Regel so sein,
dass Sie die Daten in Relation zu dieser Fläche visualisieren möchten – diese also
normalisieren möchten.

In unser GeoJSON Datei ist die Fläche der Gemeinde in der Eigenschaft
`area` gespeichert. Wir können es uns also einfach machen und auf die Zahl
die für die Fläche einer Gemeinde gespeichert ist, zugreifen.
Um die Choroplethenkarte, die wir im vorhergehenden Kapitel erstellt haben zu
normalisieren, ist somit nur ein Schritt –
nämlich das Teilen der Bevölkerungsanzahl durch die Fläche des betreffenden Bereichs –
erforderlich. Sehen wir uns das ganze Beispiel zusammenhängend an.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
*<script src="../leaflet/leaflet.js"></script>
*<script src="gemeinden.js"></script>
 </head>
 <body>
*<button onclick="total()">Population</button>
*<button onclick="density()">Population/Fläche</button>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid', {doubleClickZoom:false}).setView([49.9555 , 7.591838], 8);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
 function color(x) {
 return x > 1000 ? '#990000' :
 x > 750 ? '#d7301f' :
 x > 500 ? '#ef6548' :
 x > 250 ? '#fc8d59' :
 x > 200 ? '#fdbb84' :
 x > 100 ? '#fdd49e' :
 x > 0   ? '#fee8c8' :'#fff7ec';
 }
 function densityColor(x) {
 return x > 500 ? '#990000' :
 x > 400 ? '#d7301f' :
 x > 300 ? '#ef6548' :
 x > 200 ? '#fc8d59' :
 x > 100 ? '#fdbb84' :
 x > 50  ? '#fdd49e' :
 x > 0   ? '#fee8c8' :'#fff7ec';
 }
 function myStyle(feature) {
 return {
 fillColor: color(feature.properties.destatis.population),
 weight: 1,
 opacity: 1,
 color: 'white',
 fillOpacity: 0.85
 };
 }
*function myDensityStyle(feature) {
*return {
*fillColor:
*densityColor(feature.properties.destatis.population/feature.properties.destatis.area),
*weight: 1,
*opacity: 1,
*color: 'white',
*fillOpacity: 0.85
*};
*}
 function total(){
 var geoJsonLayer = L.geoJson(ct, {style: myStyle}).addTo(mymap);
 removeLayer(densitylayer);
 }
 function density(){
 var densitylayer=L.geoJson(ct, {style: myDensityStyle}).addTo(mymap);
 removeLayer(geoJsonLayer);
 }
 </script>
 </body>
 </html>
<!--index_956.html-->
```

Das vorhergehende Codebeispiel baut auf dem davor erstellten Codebeispiel auf.
Neben der `style` Funktion fügen wir eine weitere Funktion,
nämlich die Funktion `densityStyle()`, ein.
Die Funktion `densityStyle()` gibt, wie der Name schon sagt,
die Farbe für die _relative Angabe_ zurück.
Damit wir die Choroplethenkarten Ebenen der beiden vorhergehenden Beispiele
vergleichen können,
habe ich eine Schaltfläche in das HTML Dokument integriert.
Je nachdem welche Schaltfläche angeklickt wird, wird die passende Formel ausgeführt.
Einmal die, die absoluten Werte anzeigt, ein anderes mal die,
die die relativen Werte ausgibt.

Nun werden Sie feststellen, dass viele große Bereiche in ländlichen Gegenden,
nicht mehr dunkel eingefärbt sind. Im ersten Beispiel,
in dem wir mit den absoluten Zahlen gearbeitet haben,
waren diese Bereiche teilweise dunkel.
Die Bevölkerungszahl ist aber in Relation zur Fläche dort gar nicht hoch.

![Choroplethenkarten - Dichte der Bevölkerung in Rheinland-Pfalz.](/images/948.png)

_Abbildung: Choroplethenkarten - Dichte der Bevölkerung in Rheinland-Pfalz._

## In diesem Kapitel haben wir …

In diesem Kapitel haben Sie alles das,
was Sie in den ersten Teilen kennengelernt haben, zum visualisieren eingesetzt.
Sie haben Plugins kennen gelernt, die Sie beim Erstellen von Heatmaps unterstützen.
Sie können nun eine Heatmap erstellen, mit der interagiert werden kann.
Außerdem können Sie eine animierte Heatmap erstellen.
Sie kennen die Besonderheiten von Choroplethenkarten und wissen,
wann absolute und wann relative Werte sinnvoll sind.
Sie können nun die Anzeige von absoluten und relativen Werten selbst umsetzten.

Im nächsten Kapitel werden wir noch einmal den Schwerpunkt auf
die individuelle Gestaltung setzten.
Hier geht es um benutzerdefinierte Marker.

[^1]: https://de.wikipedia.org/w/index.php?title=Heatmap&oldid=181851051 (https://bit.ly/2QfyE7m)
[^2]: https://de.wikipedia.org/w/index.php?title=Kerndichtesch%C3%A4tzer&oldid=182712162 (https://bit.ly/2TgsRjy)
[^3]: https://de.wikipedia.org/w/index.php?title=Kalte_Farbe&oldid=182760035 (https://bit.ly/2ApvMiS)
[^4]: https://de.wikipedia.org/w/index.php?title=Warme_Farbe&oldid=137765311 (https://bit.ly/2Qb78I7)
[^5]: https://github.com/Leaflet/Leaflet.heat
[^6]: http://leafletjs.com/plugins.html#heatmaps
[^7]: http://colorbrewer2.org
[^8]: http://leaflet.github.io/Leaflet.heat/demo/draw.html
[^9]: https://github.com/pa7/heatmap.js
[^10]: https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html
[^11]: https://developer.mozilla.org/de/docs/Web/API/Window
[^12]: https://developer.mozilla.org/de/docs/Web/API/WindowTimers/setInterval
[^13]: https://de.wikipedia.org/w/index.php?title=Choroplethenkarte&oldid=175744569 (https://bit.ly/2EWbx0d)
[^14]: https://de.wikipedia.org/w/index.php?title=Open_Data&oldid=182539018 (https://bit.ly/2ViIEQT)
[^15]: https://de.wikipedia.org/w/index.php?title=Open_Government&oldid=180459228 (https://bit.ly/2EWqgsa)
[^16]: https://de.wikipedia.org/w/index.php?title=Open_Source&oldid=183919330 (https://bit.ly/2BQ7r5E)
[^17]: http://opendatalab.de/projects/geojson-utilities/
