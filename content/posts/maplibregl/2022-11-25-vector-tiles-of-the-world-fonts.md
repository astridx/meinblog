---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-25
title: 'Selbst gehostete Vector-Tiles mit eigener Schriftart - Glyphs - Benutzerdefinierte Glyphen erstellen'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: maplibre-vector-tiles-self-host-own-font-glyphs
langKey: de
categories:
  - MapLibre
tags:
  - geografische Daten
  - Vector Kacheln
  - Selbst gehostet
  - Openstreetmap
---

Du verfügst über Vector Kacheln, die du mit einem eigenen Stil verstehen magst. Als erstes möchtst du die Schriftart an das Design deiner Website anpassen.

Ich verwende hier Google Fonts als Beispiel. Wenn du eine ttf-Datei aus einer anderen Quelle hast, passe meine Erklärung einfach an deine Gegebenheiten an.

> Die Überschrift dieses Beitrags beinhaltet das Wort Glyphs. Was sind Glyphs? Die Glyphe ist die grafische Darstellung eines Zeichens in einer Schriftart - also ein Buchstabe oder eine Zahl, ein Sonderzeichen oder eine Ligatur. Unsere Vector-Tiles enthalten Punkte, Linien und Flächen. Jedes der drei Elemente verfügt über Eigenschaften. Diese Eigenschaften möchten wie auf der Karte teilweise mit Schrift anzeigen. In meinen Beispielen zeige ich die Karten mithilfe von MapLibre an. Wie MapLibre Text, also Glyphs, erwartet, ist der [Spezifikation](https://maplibre.org/maplibre-gl-js-docs/style-spec/glyphs/)[^maplibre.org/maplibre-gl-js-docs/style-spec/glyphs/] beschrieben. Erwartet werden Dateien mit der Endund PBF.


## PBF Dateien einer benutzerdefinierten Schriftart erstellen.

Du verwaltest eine Website, die die Schriftart [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)[^fonts.google.com/specimen/Playfair+Display] verwendet und möchtest gerne, dass die Karte auf deiner Website ebenfalls diese Schrift verwendet. Du hast die Schrift bei Google heruntergeladen.

![Download von Google Fonts](/images/fonts1.png)

Im Downlaod befindet sich eine Datei mit der Endung TTF. Eine PBF-Datei befindet sich nicht unter den verfügbaren Dateien.  

### Umwandeln einer TTF in eine PBF 

Auf github gibt ein Repository, welches Funktionen zum Umwandeln einer TTF-Datei in eine PBF-Datei bietet. Klone als erstes dieses Repo.

```
git clone https://github.com/openmaptiles/fonts
```

Installiere danach die erforderlichen Abhängigkeiten und wechsele in dieses Verzeichnis.

```
npm install
cd fonts
```

> Falls dir beim Installieren Fehler angezeigt werden, könnte es an der Node-Version liegen. Die Software ist älter. Ich habe die Installation mit Node in Version 10. durchgeführt. Ist auf deinem Rechner eine neuere Node-Version installiert? Mehrere Node Versionen kannst du mit dem [Node-Versions-Manager nvm](https://github.com/nvm-sh/nvm)[^github.com/nvm-sh/nvm] parallel auf einem Rechner verwenden.


In dem Repository sind bereits andere Schriftarte enthalten. Lege ein Verzeichnis mit dem Namen `Playfair_Display` an und kopiere die TTF-Datei, die du von Google heruntergeladen hast, in dieses Verzeichnis. Starte dann die Generierung der PDF-Dateien.

```
node ./generate.js
```

Wenn alles korrekt verläuft befindet sich am Ende die PDF-Dateien in einem Unterverzeichnis des Ordners `_output`. Das Unterverzeichnis heißt `Playfair Display Variable Font_wght`, wenn du alles beim Standard belassen hast.

### Benutzerdefinierte PDF-Dateien in den Vector-Tiles verwenden

Ich gehe davon aus, dass du ein Projekt bearbeitest, wie unter http://blog.astrid-guenther.de/maplibre-vector-tiles-self-host/ beschrieben. Kopiere das gerade erstellte Verzeichnis `Playfair Display Variable Font_wght` mit den PBF-Dateien in das Verzeichnis `fonts` in deinem Webprojekt. 

Ändere dann in der `styles.json`-Datei den Eintrag Eintrag `Regular` und `Bold`. Diese Worte hatten wir vorher verwendet. Wir hatten Symlinks erstellt. So waren die Schriften flexibel anpassbar. Nun ist die Flexibilität nicht mehr wichtig. Wir möchten die Schrift gezielt setzen. Deshalb fügen wir anstelle von `Regular` und `Bold` den Namen des Verzeichnisses `Playfair Display Variable Font_wght` für die Eigenschaft `text-font` ein. 

> Ich habe hier der Einfachheit halber nur eine Schrift verwendet. Es ist natürlich möglich, die Eigenschaft `text-font` pro Element unterschiedlich zu setzen.

Der nachfolgende Code Schnipsel enthält die relevaten Abschnitte der `styles.json`-Datei.  

```js
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

      {
        "id": "housenumber",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "housenumber",
        "minzoom": 17,
        "filter": ["==", "$type", "Point"],
        "layout": {
          "text-field": "{housenumber}",
          "text-font": ["Playfair Display Variable Font_wght"],
          "text-size": 10
        },
        "paint": {"text-color": "rgba(212, 177, 146, 1)"}
      },
      ...
      {
        "id": "poi_label",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "poi",
        "minzoom": 14,
        "filter": ["all", ["==", "$type", "Point"], ["==", "rank", 1]],
        "layout": {
          "icon-size": 1,
          "text-anchor": "top",
          "text-field": "{name:latin}\n{name:nonlatin}",
          "text-font": ["Playfair Display Variable Font_wght"],
          "text-max-width": 8,
          "text-offset": [0, 0.5],
          "text-size": 11,
          "visibility": "visible"
        },
        "paint": {
          "text-color": "#666",
          "text-halo-blur": 1,
          "text-halo-color": "rgba(255,255,255,0.75)",
          "text-halo-width": 1
        }
      },
      {
        "id": "airport-label",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "aerodrome_label",
        "minzoom": 10,
        "filter": ["all", ["has", "iata"]],
        "layout": {
          "icon-size": 1,
          "text-anchor": "top",
          "text-field": "{name:latin}\n{name:nonlatin}",
          "text-font": ["Playfair Display Variable Font_wght"],
          "text-max-width": 8,
          "text-offset": [0, 0.5],
          "text-size": 11,
          "visibility": "visible"
        },
        "paint": {
          "text-color": "#666",
          "text-halo-blur": 1,
          "text-halo-color": "rgba(255,255,255,0.75)",
          "text-halo-width": 1
        }
      },
      {
        "id": "road_major_label",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "transportation_name",
        "minzoom": 13,
        "filter": ["==", "$type", "LineString"],
        "layout": {
          "symbol-placement": "line",
          "text-field": "{name:latin} {name:nonlatin}",
          "text-font": ["Playfair Display Variable Font_wght"],
          "text-letter-spacing": 0.1,
          "text-rotation-alignment": "map",
          "text-size": {"base": 1.4, "stops": [[10, 8], [20, 14]]},
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": "#000",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 2
        }
      },
      {
        "id": "place_label_other",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "minzoom": 8,
        "filter": [
          "all",
          ["==", "$type", "Point"],
          ["!in", "class", "city", "state", "country", "continent"]
        ],
        "layout": {
          "text-anchor": "center",
          "text-field": "{name:latin}\n{name:nonlatin}",
          "text-font": ["Playfair Display Variable Font_wght"],
          "text-max-width": 6,
          "text-size": {"stops": [[6, 10], [12, 14]]},
          "visibility": "visible"
        },
        "paint": {
          "text-color": "hsl(0, 0%, 25%)",
          "text-halo-blur": 0,
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 2
        }
      },
      {
        "id": "place_label_city",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 16,
        "filter": ["all", ["==", "$type", "Point"], ["==", "class", "city"]],
        "layout": {
          "text-field": "{name:latin}\n{name:nonlatin}",
          "text-font": ["Playfair Display Variable Font_wght"],
          "text-max-width": 10,
          "text-size": {"stops": [[3, 12], [8, 16]]}
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-blur": 0,
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 2
        }
      },
      {
        "id": "country_label-other",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 12,
        "filter": [
          "all",
          ["==", "$type", "Point"],
          ["==", "class", "country"],
          ["!has", "iso_a2"]
        ],
        "layout": {
          "text-field": "{name:latin}",
          "text-font": ["Playfair Display Variable Font_wght"],
          "text-max-width": 10,
          "text-size": {"stops": [[3, 12], [8, 22]]},
          "visibility": "visible"
        },
        "paint": {
          "text-color": "hsl(0, 0%, 13%)",
          "text-halo-blur": 0,
          "text-halo-color": "rgba(255,255,255,0.75)",
          "text-halo-width": 2
        }
      },
      {
        "id": "country_label",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 12,
        "filter": [
          "all",
          ["==", "$type", "Point"],
          ["==", "class", "country"],
          ["has", "iso_a2"]
        ],
        "layout": {
          "text-field": "{name:latin}",
          "text-font": ["Playfair Display Variable Font_wght"],
          "text-max-width": 10,
          "text-size": {"stops": [[3, 12], [8, 22]]},
          "visibility": "visible"
        },
        "paint": {
          "text-color": "hsl(0, 0%, 13%)",
          "text-halo-blur": 0,
          "text-halo-color": "rgba(255,255,255,0.75)",
          "text-halo-width": 2
        }
      }
    ],
    "id": "basic"
  }

```


Alternativ kannst du auch die Symlinks anpassen.

```
ln -sf 'Playfair Display Variable Font_wght'/fonts/Regular
ln -sf 'Playfair Display Variable Font_wght'/fonts/Bold
```





### Prüfe Lizenz

Wenn alle funktioniert und die Schriften korrekt angezeigt werden, ist das Rechtliche zu klären. Bei Google Fonts ist es so, dass beim Download eine Datei mitgeliefert wird, die die Lizenz enthält. 

### Das Ergebnis

Das eine benutzerdefnierte Schrift den Stil einer Website deutlich beeinflusst, zeigen die nachfolgenden Bilder und die Demo. 

#### Playfair Display Variable Font_wght

![Download von Google Fonts](/images/font2a.png)

#### Rubik Marker Hatch Regular
![Download von Google Fonts](/images/font2b.png)

#### PatrickHandRegular

![Download von Google Fonts](/images/font2c.png)

#### Demo

https://astridx.github.io/vectortiles_mit_unterschiedlichen_glyphs/index.html

<img src="https://vg01.met.vgwort.de/na/aed48fb5bbac41928ae1a6293c630eca" width="1" height="1" alt="">