---
description: 'desc'
set: ''
booklink: ''
syndication:
  - https://github.com/astridx/meinblog/issues/71
shortTitle: 'short'
date: 2022-11-24
title: 'Selbst gehostete Karten und VectorTiles für einen begrenzten Bereich mit Tilemaker erstellen'
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



## Selbst gehostete Karten und Vector-Tiles mit Tilemaker erstellen und nutzen

Wenn eine digitale Karte in einer Webanwendung angezeigt wird, verwenden Webentwickler in der Regel Online-Dienste. Für viele Anwendungen ist dies jedoch nicht erforderlich. Es ist gar nicht so kompliziert, selbst Karten zu erstellen und sie auf dem eigenen Webspace zu hosten. Frei verfügbare Daten von OpenStreetmap und Open-Source-Tools unterstützen beim Erstellen von individuellen Vektor-Kacheln für eine Website. Problematisch ist in meinen Augen lediglich die Datenmenge. Aber meist ist es nicht erforderlich die ganze Welt in der Karte aufzunehmen.

> Das Hosting des gesamten Planeten erfordert erhebliche Mengen an Speicherplatz. Im November 2022 liegt die Dateigröße bei [66 GB](https://planet.osm.org/)[^planet.osm.org/]. 

In diesem Beitrag zeige, wie ich eine Karten mit Daten von OpenStreetmap und _Tilemaker_ für das deutsche Bundesland Rheinland-Pfalz auf meinem lokalen Rechner erstellt habe. Ich arbeite zur Zeit unter Ubuntu 22.04.

### Erstellen eines regionalen Openstreetmap-Daten-Exports

> Die Bounding Box[^wiki.openstreetmap.org/wiki/DE:Bounding_Box] von Rheinland-Pfalz ist `bbox=6.1173598760,48.9662745077,8.5084754437,50.9404435711`. Ein praktisches Werkzeug zum bestimmen der Bounding-Box-Koordinaten ist boundingbox[^boundingbox.klokantech.com] oder calc[^tools.geofabrik.de/calc/].

Als erstes benötigen wir die Daten zur Erstellung der Karte. Wenn man einen begrenzten Bereich anzeigen mag, ist es nicht erforderlich, die Daten vom ganzen Planeten herunterzuladen. Wir benötigen einen Export der Daten der Region, die wir hosten möchten. Verschiedene Anbieter, bieten immer aktuelle vorgefertigte Exporte. Die [GeoFabrik](http://download.geofabrik.de/)[download.geofabrik.de] ist einer von diesen. Beachte dabei jedoch, dass wir, wenn wir eine Region exportieren möchten, eigentlich einen rechteckigen Export wünschen. Wir möchten also auch einige Teile rund um die Grenze mit einbeziehen. Die Exporte der Geofabrik werden um die Grenzen der Region herum extrahiert und die angrenzenden Bereiche erscheinen als graue Flächen, wenn wir die Karte auf einem rechteckigen Bereich anzeigen. Und dann ist es nicht selten so, dass der Bereich, den man anzeigen möchte, nicht als Export zur Verfügung steht. 

Wir wollen also ein deutsches Bundesland exportieren, Rheinland-Pfalz. Wir können einen rechteckigen Ausschnitt aus einer größeren Region generieren, beispielsweise aus Deutschland. Den Ausschnitt erstelle ich mit dem Werkzeug Osmium. Wir laden also zunächst die Daten zu dem umgebenden Gebiet von der GeoFabrik herunter. Der nächste Schritt besteht darin, den Begrenzungsrahmen der Region zu bestimmen, die wir extrahieren möchten.

> Weil Rheinland-Pfalz am westlichen Rand von Deutschland liegt, muss ich Europa als größere Datenquelle wählen, damit es tatsächlich rechteckig ist.

Die von mir gewählte Begrenzung ist: `6.1173598760 48.9662745077 8.5084754437 50.940443571`[^tools.geofabrik.de/calc/#type=geofabrik_standard&bbox=6.1173598760,48.9662745077,8.5084754437,50.9404435711&tab=1&proj=EPSG:4326&places=2]

Unter Ubuntu installiere ich das Tool _Osmium_ via:

```
$ sudo apt-get install osmium-tool
```

Dann erstelle ich den regionalen Export für das deutschge Bundesland Rheinland-Pfalz:

```
$ osmium extract --bbox=6.1173598760,48.9662745077,8.5084754437,50.9404435711 --set-bounds --strategy=smart europe-latest.osm.pbf  --output rlp.osm.pbf
```

Am Ende verfüge ich über einen rechteckigen Ausschnitt der Daten der von mir gewünschten Region in der Datei `rlp.osm.pbf`. Diese kann ich zum selbst hosten weiterbearbeiten.

### Erzeugen der Vector-Tiles

Der nächste Schritt ist die Erstellung der Vektorkacheln aus dem regionalen Export. Hierfür verwende ich Tilemaker[^github.com/systemed/tilemaker]. 

```
git clone https://github.com/systemed/tilemaker.git
cd tilemaker
```

Installiere die notwendigen Pakete.

```
sudo apt install build-essential libboost-dev libboost-filesystem-dev libboost-iostreams-dev libboost-program-options-dev libboost-system-dev liblua5.1-0-dev libprotobuf-dev libshp-dev libsqlite3-dev protobuf-compiler rapidjson-dev
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

Für Rheinland-Pfalz ist es nicht relevant, aber manchmal ergänzen Daten aus internationalen Gewässern und Küstengebieten oder Daten von National Earth die Ausgabe positiv. 

Openstreetmap stellt die Coastlines auf der Website `osmdata.openstreetmap.de` zur Verfügung. 

```
wget https://osmdata.openstreetmap.de/download/water-polygons-split-4326.zip
unzip water-polygons-split-4326.zip
```

[National Earth](https://www.naturalearthdata.com/downloads/)[^naturalearthdata.com/downloads/] bietet Downloadmöglichkeiten über ihre [Website](https://www.naturalearthdata.com/downloads/)[^naturalearthdata.com/downloads/] oder [Github](https://github.com/nvkelso/natural-earth-vector)[^github.com/nvkelso/natural-earth-vector] an. Besorge dir hier die Daten zu ne_10m_urban_areas, ne_10m_glaciated_areas und ne_10m_antarctic_ice_shelves_polys. Lege ein Unterverzeichnis mit dem Namen landcover an und endpacke die Daten hier.

Wenn dir diese Daten wichtig sind, dann innerhalb von tilemaker nun folgende Daten hinzugekommen sein. Falls nicht, kannst du diesen Text weiter bearbeiten. Dir wird lediglich bei der Erstellung der Vector-Kacheln gemeldet, dass die Daten fehlen.


```
.../tilemaker/coastline$ ll
insgesamt 1106544
drwxrwxr-x  2 youruser youruser       4096 Nov 19 19:20 ./
drwxrwxr-x 12 youruser youruser       4096 Nov 20 12:23 ../
-rwxrwxrwx  1 youruser youruser        836 Nov 18 06:25 README.txt*
-rwxrwxrwx  1 youruser youruser          6 Nov 18 04:43 water_polygons.cpg*
-rwxrwxrwx  1 youruser youruser    1013349 Nov 18 04:43 water_polygons.dbf*
-rwxrwxrwx  1 youruser youruser        145 Nov 18 04:40 water_polygons.prj*
-rwxrwxrwx  1 youruser youruser 1131628636 Nov 18 04:43 water_polygons.shp*
-rwxrwxrwx  1 youruser youruser     426732 Nov 18 04:43 water_polygons.shx*


.../tilemaker/landcover$ ll
insgesamt 20
drwxrwxr-x  5 youruser youruser 4096 Nov 24 19:25 ./
drwxrwxr-x 12 youruser youruser 4096 Nov 20 12:23 ../
drwxrwxrwx  2 youruser youruser 4096 Nov 24 19:25 ne_10m_antarctic_ice_shelves_polys/
drwxrwxrwx  2 youruser youruser 4096 Nov 19 19:26 ne_10m_glaciated_areas/
drwxrwxrwx  2 youruser youruser 4096 Nov 19 19:01 ne_10m_urban_areas/

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

Mit _Tilemaker_ ist es möglich, die Kacheldateien als einzelne Dateien in ein Verzeichnis zu generieren. 

> Achte darauf, in der Konfigurations-Datei `"compress":` mit `"none"` zu belegen. In diesem Beispiel ist dies die Datei `config-openmaptiles.json`!

Möchtest du alle `pbf`-Dateien einzeln in ein Verzeichnis erstellen? Dann reicht es aus, im Parameter `Output` keine Endung zu verwenden. `--output rlp.mbtiles` packt beispielsweise alle `pbf`-Dateien in die Datei `rlp.mbtiles`. `--output rlp` legt alle pbf-Dateien einzeln im Verzeichnis `rlp` an.

```
$ ./tilemaker --input /mnt/hgfs/Downloads/osm/rlp.osm.pbf --output rlp --process ./resources/process-example.lua --config ./resources/config-example.json
```

Wenn die Konvertierung abgeschlossen ist und alles fehlerfrei verlief steht am Ende 

```
Filled the tileset with good things at rlp
```

In diesem Beispiel werden die Dateien im Verzeichnis `rlp` erzeugt. In diesem Verzeichnis gibt es eine Reihe von Verzeichnissen und eine Datei namens `metadata.json`.

##### mbtiles

Die `mbtiles`-Datei ist eine `sqlite3`-Datenbank, die von serverseitigen Skriptsprachen wie PHP LUA oder NodeJs gelesen werden kann. Tileserver wie tileserver-php öffnen diese Datei und lesen die Kacheldaten aus, sobald der Client sie anfordert. Diese Umgebung wähle ich für meinen Arbeitsumgebung.

Ich rufe den nachfolgenden Befehl auf, wobei ich der Einfachheit halber die mitgelieferten Beispielkonfigurationen verwende. 

> Falls du so wie ich vor hast, die Vector Tiles später nicht als eine Datei anzubieten, sondern in ein Verzeichnis entpacken möchtest, ist es wichtig in der Datei `config-openmaptiles.json` die Eigenschaft `"compress":` mit `"none"` zu belegen!

```
$ ./tilemaker --input /mnt/hgfs/Downloads/osm/rlp.osm.pbf --output rlp.mbtiles --process ./resources/process-example.lua --config ./resources/config-example.json
```

Wenn die Konvertierung abgeschlossen ist und alles fehlerfrei verlief steht am Ende 

```
Filled the tileset with good things at rlp.mbtiles
```

### Hosting der Vector-Tiles

#### Tileserver.php von Maptiler

Für das Hosting der Vector-Tiles benötigen wir einen Webserver mit aktiviertem PHP. Außerdem sollte der PHP-Server sqlite-fähig sein, da die mbtiles-Dateien im Grunde genommen eine sqlite-Datenbankdatei sind, die von unserem Tileserver geöffnet wird. 

Um die Karte zu hosten, verwenden werden wir [Tileserver-php](https://github.com/maptiler/tileserver-php)[^github.com/maptiler/tileserver-php]. Klone dieses Repository via git auf deinen Webserver:

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

Im Beispiel ist `/srv/www` die Webserver-Root. Passe diese Angabe bitte an deine Gegebenheiten an.

Kopiere die eben erstellten Dateien in das Verzeichnis tileserver-php. In unserem Beispiel ist das konkret das Verzeichnis `rlp`. Dieses soll sich am Ende im Verzeichnis `/srv/www/tileserver-php` befinden.

Passe den Pfad zu den Tiles in der Datei `srv/www/tileserver-php/rlp/metadata.json` an. In meinem lokalen Beispiel befindet sich die Datei im Verzeichnis `srv/www/tileserver-php/rlp/metadata.json` und ich setzte den Pfad zu den Tiles auf `http://localhost/tileserver-php/rlp/{z}/{x}/{y}.pbf`.

```js
{
    "tilejson": "2.0.0",
    "scheme": "xyz",
    "type": "baselayer",
    "format": "pbf",
    "tiles": [
        "http://localhost/tileserver-php/rlp/{z}/{x}/{y}.pbf"
    ],
    "bounds": [
        6.1173599,
        48.9662745,
        8.5084754,
        50.94044360000001
    ],
...
}
```

Wenn du den Apache-Webserver verwendest, ist jetzt alles eingestellt. Öffne die Url zur `tileserver.php` und schau dir deine Karte an. In meinem Fall ist dies die URL `https://localhost/tileserver-php/tileserver.php`. Du siehst die rohe Version der Linien und Punkte. Der Funktionstest ist bestanden.

![Ansicht der Linestrings und Points auf dem Tileserver PHP](/images/maplibrevector1.png)

Sieh dir die Eigenschaften an, indem du mit der Maus über ein Element navigierst.

![Ansicht der Eigenschaften wenn man mit der Maus über ein Element navigiert.](/images/tileserverprops.png)

### Vector Tiles auf deiner Website

Nun sind wir bereit, die generierten Kacheln auf unserer eigenen Website zu verwenden. Hierfür verwenden wir die Bibliothek _MapLibre GL JS_[^maplibre.org/] zusammen mit einem Stil von OpenMapTiles[^openmaptiles.org/styles/]. Erstelle ein kleines HTML-Dokument, welches die Karte anzeigt. Der nachfolgende Code zeigt ein einfaches Beispiel:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Display a map on a webpage</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src='https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js'></script>
    <link href='https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css' rel='stylesheet' />
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

Weiterhin benötigst du Styles, um die rohen Linien und Punkte zu gestalten. Fürs erste wähle eine fertige Style-Datei. Du kannst diese von der Demo zu diesem Beitrag[astridx.github.io/vectortiles/rlp.json] herunterladen oder einen anderen Stil von [OpenMapTiles](https://openmaptiles.org/styles/) verwenden. Passe zwei URLs an deine individuelle Umgebung an. Die URLs verweisen auf deinen Tileserver. Der Name `rlp.json` ist zwingend, wenn die `mbtiles`-Datei oder das Verzeichnis `rlp` heißt: Der Name der `mbtiles`-Datei muss mit dem Namen der `json`-Style-Datei übereinstimmen!

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

In meinem Webserver-Verzeichnis verfüge ich nun über folgende Dateien:

![Webserver Verzeichnis zum Veröffentlichen einer mbtiles Datei](/images/maplibrevector2.png)

Falls du eine mbtiles-Datei anstelle der einzelnen Kacheln verwendest, sieht es wie auf nächsten Bild aus.

![Webserver Verzeichnis zum Veröffentlichen einer mbtiles Datei](/images/maplibrevector3.png)

Sieh dir jetzt deine eigene gehostete Karte an. Ich habe die Karte unter der Adresse `https://localhost/tileserver-php/` abgelegt:

![Webserver view to of the mbtiles file](/images/maplibrevector4.png)

### MBTiles entpacken

Du hast gesehen: Es ist möglich die von Tilemaker generierte `mbtile`-Datei zu hosten, nämlich via  Tileserver wie _tileserver-php_. Dies ist für eine Entwicklungsumgebung praktisch. Performanter ist es allerdings, die Vector-Tiles direkt von einem statischen Webserver zu laden. Nebenbei ist die Handhabung von großen Dateien in bestimmten Umgebungen problematisch. Beispielsweise sind besondere Schritte notwendig, um eine Demo[astridx.github.io/vectortiles/index.html] auf _github.io_ zu veröffentlichen, wenn sich eine Datei mit mehr als 100 MB im Paket befindet. 

Wie schon erwähnt, kannst du mit _Tilemaker_ einzelne `pbf`-Dateien in einem Verzeichnis anlegen. In meinem Workaround bevorzuge ich es, mit `mbtiles`-Dateien zu arbeiten und die zum Veröffentlichen vorgesehene Datei am Ende zu entpacken. Hierfür gibt es das Werkzeug _mbutil_. 

Installiere _mbutil_ und _Python_ und verschaffe dir einen Überblick über die Optionen von _mbutil_.




/usr/bin/env: »python“: Datei oder Verzeichnis nicht gefunden
https://www.bitblokes.de/usr-bin-env-python-datei-oder-verzeichnis-nicht-gefunden/



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

- Generating self-hosted maps using tilemaker[^blog.kleunen.nl/blog/tilemaker-generate-map]
- VectorTiles mithilfe von Tilemaker erstellen und nutzen[^youtube.com/watch?v=8J0J41YsAbc]
- Tipps zur Performance[^blog.kleunen.nl/blog/improving-tilemaker-hosting-speed]
- Planet[^wiki.openstreetmap.org/wiki/Planet.osm]
- GeoFabrik[^download.geofabrik.de]
- OSMData[^osmdata.openstreetmap.de/download/water-polygons-split-4326.zip]
- GeoFabrik Calc[^tools.geofabrik.de/calc]
- Osmium-tool[^github.com/osmcode/osmium-tool]
- OSMConvert[^wiki.openstreetmap.org/wiki/Osmconvert]
- Tilemaker[^github.com/systemed/tilemaker]
- Tileserver-php[^github.com/maptiler/tileserver-php]
- MapLibre[^maplibre.org]
- Klokantech GL fonts[^github.com/klokantech/klokantech-gl-fonts]
- OpenMapTiles styles[^openmaptiles.org/styles]
<img src="https://vg06.met.vgwort.de/na/3b6dd19bd051405dad2a8ee659388218" width="1" height="1" alt="">