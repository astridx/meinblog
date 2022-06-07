---
description: 'desc'
shortTitle: 'short'
date: 2022-06-05
title: 'Selbst gehosteten Karten und VectorTiles mit Tilemaker erstellen'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: maplibre-vector-tiles-self-host
langKey: de
categories:
  - MapLibre
tags:
  - geografische Daten
  - Tilemaker
  - Openstreetmap
---



## Selbst gehosteten Karten und Vector-Tiles mit Tilemaker erstellen und nutzen

Wenn eine digitale Karte in einer Webanwendung angezeigt wird, verwenden Webentwickler in der Regel Online-Dienste. Für viele Anwendungen ist dies jedoch nicht erforderlich. Es ist gar nicht so kompliziert, selbst Karten zu erstellen und sie auf dem eigenen Webspace zu hosten. Frei verfügbare Daten von OpenStreetmap und Open-Source-Tools unterstützen beim Erstellen von individuellen Vektorgrafik-Karten für eine Website/Webanwendung. Problematisch ist in meinen Augen lediglich die Datenmenge. Aber meist ist es nicht erforderlich die ganze Welt in der Karte aufzunehmen.

> Das Hosting des gesamten Planeten erfordert erhebliche Mengen an Speicherplatz. Im April 2022 liegt die Dateigröße bei 63 GB[^wiki.openstreetmap.org/wiki/DE:Planet.osm]. 

In diesem Beitrag zeige, wie ich eine Karten mit Daten von OpenStreetmap und _Tilemaker_ für das deutsche Bundesland Rheinland-Pfalz auf meinem lokalen Rechner erstellt habe. Ich arbeite zur Zeit unter Ubuntu 20.04.

### Erstellen eines regionalen Openstreetmap-Daten-Exports

> Die Bounding Box[^wiki.openstreetmap.org/wiki/DE:Bounding_Box] von Rheinland-Pfalz ist `bbox=6.1173598760,48.9662745077,8.5084754437,50.9404435711`. Ein praktisches Werkzeug zum bestimmen der Bounding-Box-Koordinaten ist boundingbox[^boundingbox.klokantech.com] oder calc[^tools.geofabrik.de/calc/].

Als erstes müssen wir einen Export der Region erstellen, die wir hosten möchten. Es ist möglich, vorgefertigte Exporte von hier zu erhalten: GeoFabrik[download.geofabrik.de]. Beachte dabei jedoch, dass wir, wenn wir eine Region exportieren möchten, eigentlich einen rechteckigen Export wünschen. Wir möchten also auch einige Teile rund um die Grenze mit einbeziehen. Die Exporte von Geofabrik werden um die Grenzen der Region herum extrahiert und die angrenzenden Bereiche erscheinen als graue Flächen, wenn wir die Karte auf einen rechteckigen Bereich anzeigen.

Wir wollen also ein Land exportieren, zum Beispiel Rheinland-Pfalz. Wir können einen rechteckigen Ausschnitt aus einer größeren Region generieren, beispielsweise Deutschland. Den Ausschnitt erstelle ich mit dem Werkzeug Osmium. Wir laden also zunächst das Gebiet Deutschland aus der GeoFabrik herunter. Der nächste Schritt besteht darin, den Begrenzungsrahmen der Region zu bestimmen, die wir extrahieren möchten.

> Weil Rheinland-Pfalz am Rand von Deutschland liegt, hätte ich Europa als größere Datenquelle wählen müssen, damit es tatsächlich rechteckig ist.

Die von mir gewählte Begrenzung ist: `6.1173598760 48.9662745077 8.5084754437 50.940443571`[^tools.geofabrik.de/calc/#type=geofabrik_standard&bbox=6.1173598760,48.9662745077,8.5084754437,50.9404435711&tab=1&proj=EPSG:4326&places=2]

Unter Ubuntu installiere ich das Tool _Osmium_ via:

```
$ sudo apt-get install osmium-tool
```

Dann erstelle ich den regionalen Export für das deutschge Bundesland Rheinland-Pfalz:

```
$ osmium extract --bbox=6.1173598760,48.9662745077,8.5084754437,50.9404435711 --set-bounds --strategy=smart germany-latest.osm.pbf  --output rlp.osm.pbf
```

Am Ende verfüge ich über einen rechteckigen Ausschnitt der Region zum selbst hosten in der Datei `rlp.osm.pbf`.

### Erzeugen von Vector-Tiles

Der nächste Schritt ist die Erstellung von Vektorkacheln aus dem regionalen Export. Hierfür verwende ich Tilemaker[^github.com/systemed/tilemaker]. 

```
git clone https://github.com/systemed/tilemaker.git
cd tilemaker

```
Danach kompiliere und installiere ich Tilemaker via `make` und `sudo make install`.

```
$ make
...
$ sudo make install
Using Lua 5.1 (include path is -I/usr/include/lua5.1, library path is -llua5.1)
install -m 0755 -d /usr/local/bin/
install -m 0755 tilemaker /usr/local/bin/
install -d /usr/share/man/man1/
install docs/man/tilemaker.1 /usr/share/man/man1/
```

Für Rheinland-Pfalz ist es nicht relevant, aber manchmal benötigt man Daten aus internationalen Gewässern und Küstengebieten. Openstreetmap stellt diese auf der Website `osmdata.openstreetmap.de` zur Verfügung.

```
wget https://osmdata.openstreetmap.de/download/water-polygons-split-4326.zip
unzip water-polygons-split-4326.zip
```

Jetzt habe ich alles notwendige und erstelle die Karte mithilfe von Tilemaker. Als erstes verschaffe ich mir einen Überblick über die Optionen:

```
$ ./tilemaker --help
tilemaker v2.2.0
Convert OpenStreetMap .pbf files into vector tiles

Available options:
  --help                       show help message
  --input arg                  source .osm.pbf file
  --output arg                 target directory or .mbtiles/.sqlite file
  --bbox arg                   bounding box to use if input file does not have 
                               a bbox header set, example: 
                               minlon,minlat,maxlon,maxlat
  --merge                      merge with existing .mbtiles (overwrites 
                               otherwise)
  --config arg (=config.json)  config JSON file
  --process arg (=process.lua) tag-processing Lua file
  --store arg                  temporary storage for node/ways/relations data
  --compact                    Reduce overall memory usage (compact mode).
                               NOTE: This requires the input to be renumbered 
                               (osmium renumber)
  --verbose                    verbose error output
  --skip-integrity             don't enforce way/node integrity
  --threads arg (=0)           number of threads (automatically detected if 0)
```

#### Ausgabeoptionen

Wenn du deine Karten mit Tilemaker generierst, gibt es zwei Ausgabeoptionen: _directory_ und _mbtiles_.

##### Directory

Mit _Tilemaker_ ist es möglich, die Kacheldateien als einzelne Dateien in ein Verzeichnis zu generieren. Diese Möglichkeit werde ich zunächst nicht verwenden. Ich verwende _mbtiles_ und werde die mbtiles-Datei später auf einem anderen Server zum Veröffentlichen entpacken. Beim Stylen auf meinem Entwicklungsserver ist eine einzige Datei besser handhabbar.

> Achte darauf, in der Konfigurations-Datei `"compress":` mit `"none"` zu belegen. In diesem Beispiel ist dies die Datei `config-openmaptiles.json`!

Möchtest du alle `pbf`-Dateien einzeln in ein Verzeichnis erstellen? Dann reicht es aus, im Parameter `Output` keine Endung zu verwenden. `--output rlp.mbtiles` packt beispielsweise alle `pbf`-Dateien in die Datei `rlp.mbtiles`. `--output rlp` legt alle pbf-Dateien einzeln im Verzeichnis `rlp` an.

```
$ ./tilemaker --input ./rlp.osm.pbf --output rlp --process ./resources/process-openmaptiles.lua --config ./resources/config-openmaptiles.json
```

In diesem Beispiel werden die Dateien im Verzeichnis `rlp` erzeugt. In diesem Verzeichnis gibt es eine Reihe von Verzeichnissen und eine Datei namens `metadata.json`.

##### mbtiles

Die `mbtiles`-Datei ist eine `sqlite3`-Datenbank, die von serverseitigen Skriptsprachen wie PHP LUA oder NodeJs gelesen werden kann. Tileserver wie tileserver-php öffnen diese Datei und lesen die Kacheldaten aus, sobald der Client sie anfordert. Diese Umgebung wähle ich für meinen Arbeitsumgebung.

Ich rufe den nachfolgenden Befehl auf, wobei ich der Einfachheit halber die mitgelieferten Beispielkonfigurationen von openmaptiles.org verwende. 

> Falls du so wie ich vor hast, die Vector Tiles später nicht als eine Datei anzubieten, sondern in ein Verzeichnis entpacken möchtest, ist es wichtig in der Datei `config-openmaptiles.json` die Eigenschaft `"compress":` mit `"none"` zu belegen!

```
$ ./tilemaker --input ./rlp.osm.pbf --output rlp.mbtiles --process ./resources/process-openmaptiles.lua --config ./resources/config-openmaptiles.json
```

Wenn die Konvertierung abgeschlossen ist und alles fehlerfrei verlief steht am Ende 

```
Filled the tileset with good things at rlp.mbtiles
```

Voila! Die Kachel sind nun für den Webserver fertig vorbereitet!

### Hosting der Vector-Tiles

Für das Hosting der Vector-Tiles benötigen wir einen Webserver mit aktiviertem PHP. Außerdem sollte der PHP-Server sqlite-fähig sein, da die mbtiles-Dateien im Grunde genommen eine sqlite-Datenbankdatei sind, die von unserem Tileserver geöffnet wird. Um die Karte zu hosten, werden wir Tileserver-php[^github.com/maptiler/tileserver-php] verwenden. Klone dieses Repository mit git auf deinen Webserver:

```
/srv/www$ git clone  https://github.com/maptiler/tileserver-php
Klone nach 'tileserver-php' …
remote: Enumerating objects: 574, done.
remote: Counting objects: 100% (7/7), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 574 (delta 2), reused 0 (delta 0), pack-reused 567
Empfange Objekte: 100% (574/574), 1.47 MiB | 739.00 KiB/s, fertig.
Löse Unterschiede auf: 100% (290/290), fertig.
```

Kopiere die eben erstellte mbtiles-Datei in das Verzeichnis tileserver-php. In unserem Beispiel ist das konkret die Datei `rlp.mbtiles` und diese soll sich am Ende im Verzeichnis `/srv/www/tileserver-php` befinden.

Wenn du den Apache-Webserver verwendest, ist jetzt alles eingestellt. Öffne die Url zur `tileserver.php` und schau dir deine Karte an. In meinem Fall ist dies konkret die URL `https://localhost/tileserver-php/tileserver.php`. Du siehst die rohe Version der Linien und Punkte.

![Ansicht der Linestrings und Points auf dem Tileserver PHP](/images/maplibrevector1.png)

### Vector Tiles auf deiner Website

Nun sind wir bereit, die generierten Kacheln auf unserer eigenen Website zu verwenden. Hierfür verwenden wir die Bibliothek _MapLibre GL JS_[^maplibre.org/] zusammen mit einem Stil von OpenMapTiles[^https://openmaptiles.org/styles/]. Erstelle ein kleines HTML-Dokument, welches die Karte anzeigt:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Display a map on a webpage</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src='https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.js'></script>
    <link href='https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.css' rel='stylesheet' />
</head>

<body>
    <div id='map' style='width: 800px; height: 800px;'></div>
    <script>
        var map = new maplibregl.Map({
            container: 'map',
            style: 'rlp.json',
            center: [7, 50],
            zoom: 4
        });
        map.addControl(new maplibregl.NavigationControl());
    </script>
</body>

</html>
```

Weiterhin benötigst du Styles, um die rohen Linien und Punkte ansprechend zu gestalten. Fürs erste wähle eine fertige Style-Datei. Du kannst diese von der Demo zu diesem Beitrag[astridx.github.io/vectortiles/rlp.json] herunterladen oder einen anderen Stil von [OpenMapTiles](https://openmaptiles.org/styles/) verwenden. Passe zwei URLs an deine individuelle Umgebung an. Die URLs verweisen auf deinen Tileserver. Der Name `rlp.json` ist zwingend, wenn die `mbtiles`-Datei `rlp` heißt: Der Name der `mbtiles`-Datei muss mit dem Namen der `json`-Style-Datei übereinstimmen!

In der Datei `rlp.json` ist wichtig, dass die URL in der Eigenschaft `glyphs` auf Schriften zeigt. Diese Schriften werden wir im nächsten Schritt besorgen. Außerdem ist die URL in der Eigenschaft `sources` eventuell in deiner Umgebung eine andere und deshalb anzupassen.

```
{
    "version": 8,
    "name": "Basic",
    "metadata": {
      "mapbox:autocomposite": false,
      "mapbox:type": "template",
      "maputnik:renderer": "mbgljs",
      "openmaptiles:version": "3.x",
      "openmaptiles:mapbox:owner": "openmaptiles",
      "openmaptiles:mapbox:source:url": "mapbox://openmaptiles.4qljc88t"
    },
    "sources": {
      "openmaptiles": {
        "type": "vector",
          "url": "metadata.json"
      }
    },
    "glyphs": "fonts/{fontstack}/{range}.pbf",
    "layers": [
...      

```

Die Daten zur Eigenschaft `sources` lagere ich in die Datei `metadata.json` aus, welche ich im gleichen Verzeichnis wie die `rlp.json` abspeichere. Passe in dieser Datei die URL in der Eigenschaft `tiles` an.

```
{
    "tilejson": "2.0.0",
    "scheme": "xyz",
    "type": "baselayer",
    "format": "pbf",
    "tiles": [
        "https://localhost/tileserver-php/tileserver.php?/index.json?/rlp/{z}/{x}/{y}.pbf"
    ],
...
```

Beim Anpassen der Eigenschaft `glyphs` hast du schon gesehen, dass Schriftarten auf deinem Server notwendig sind. Auch hier kannst du fürs Erste auf Fertiges zurückgreifen. klokantech[^github.com/klokantech/klokantech-gl-fonts] bietet auf Github ein Paket mit Fonts. Klone es in dein Webserver-Verzeichnis und setze Symlinks.

```
git clone https://github.com/klokantech/klokantech-gl-fonts fonts
ln -sf 'KlokanTech Noto Sans Bold' fonts/Bold
ln -sf 'KlokanTech Noto Sans Regular' fonts/Regular
```

In meinem Webserverzeichnis verfüge ich nun über folgende Dateien:

![Webserver Verzeichnis zum Veröffentlichen einer mbtiles Datei](/images/maplibrevector3.png)

Sieh dir jetzt deine eigene gehostete Karte an. Ich habe die Karte unter der Adresse `https://localhost/tileserver-php/` abgelegt:

![Webserver view to of the mbtiles file](/images/maplibrevector4.png)

### MBTiles entpacken

Du hast gesehen: Es ist möglich die von Tilemaker generierte `mbtile`-Datei zu hosten, nämlich via  Tileserver wie _tileserver-php_. Dies ist für eine Entwicklungsumgebung praktisch. Performanter ist es allerdings, die Vector-Tiles direkt von einem statischen Webserver zu laden. Nebenbei ist die Handhabung von großen Dateien in bestimmten Umgebungen problematisch. Beispielsweise sind besondere Schritte notwendig, um eine Demo[astridx.github.io/vectortiles/index.html] auf _github.io_ zu veröffentlichen, wenn sich eine Datei mit mehr als 100 MB im Paket befindet. 

Wie schon erwähnt, kannst du mit _Tilemaker_ einzelne `pbf`-Dateien in einem Verzeichnis anlegen. In meinem Workaround bevorzuge ich es, mit `mbtiles`-Dateien zu arbeiten und die zum Veröffentlichen vorgesehene Datei am Ende zu entpacken. Hierfür gibt es das Werkzeug _mbutil_. 

Installiere _mbutil_ und _Python_ und verschaffe dir einen Überblick über die Optionen von _mbutil_.

```
git clone https://github.com/mapbox/mbutil.git

sudo apt-get install python3 

cd mbutil/

./mbutil/mb-util -h
```

Die Datei `rlp.mbtiles` entpacke ich via 

```
./mbutil/mb-util rlp.mbtiles rlpdir --image_format=pbf 
```

> Zur Erinnerung: Zum statischen hosten dürfen die Tiles nicht komprimiert sein! Beim Erstellen muss `"compress": "none"` in der Konfiguration von Tilemaker aktiviert gewesen sein.

In meinem Webserver-Verzeichnis verfüge ich nun über folgende Dateien:

![Webserver Verzeichnis zum Veröffentlichen von statischen Vector Tiles](/images/maplibrevector2.png)

Die Datei `tileserver.php` benötige ich nicht mehr. Anstelle der Datei `rlp.mptiles` ist das Verzeichnis `rlp` getreten. Anpassen muss ich die URL zu den `tiles` in der Datei `metadata.json`. Diese lautet nun `"https://localhost/tileserver-php/rlp/{z}/{x}/{y}.pbf"` anstelle von `"https://localhost/tileserver-php/tileserver.php?/index.json?/rlp/{z}/{x}/{y}.pbf"`. 

```
{
    "tilejson": "2.0.0",
    "scheme": "xyz",
    "type": "baselayer",
    "format": "pbf",
    "tiles": [
        "https://localhost/tileserver-php/rlp/{z}/{x}/{y}.pbf"
    ],
...
```

Das Ergebnis kannst du dir in der [Demo](https://astridx.github.io/vectortiles/index.html)[^astridx.github.io/vectortiles/index.html] ansehen.

### Links 

Generating self-hosted maps using tilemaker[^https://blog.kleunen.nl/blog/tilemaker-generate-map]
VectorTiles mithilfe von Tilemaker erstellen und nutzen[^https://www.youtube.com/watch?v=8J0J41YsAbc]
Tipps zur Performance[blog.kleunen.nl/blog/improving-tilemaker-hosting-speed]
Planet[wiki.openstreetmap.org/wiki/Planet.osm]
GeoFabrik[download.geofabrik.de]
OSMData[osmdata.openstreetmap.de/download/water-polygons-split-4326.zip]
GeoFabrik Calc[tools.geofabrik.de/calc]
Osmium-tool[https://github.com/osmcode/osmium-tool]
OSMConvert[https://wiki.openstreetmap.org/wiki/Osmconvert]
Tilemaker[https://github.com/systemed/tilemaker]
Tileserver-php[https://github.com/maptiler/tileserver-php]
MapLibre[maplibre.org]
Klokantech GL fonts[https://github.com/klokantech/klokantech-gl-fonts]
OpenMapTiles styles[openmaptiles.org/styles]

