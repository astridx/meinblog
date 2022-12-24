---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-26
title: 'Selbst gehosteten Karten und VectorTiles von der ganzen Welt erstellen'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: maplibre-vector-tiles-self-host-world-example
langKey: de
categories:
  - MapLibre
tags:
  - geografische Daten
  - MapTiler
  - National Earth
  - Openstreetmap
---


Wir haben bereits eigene selbst gehostete Vector Kacheln für einen kleinen Bereich der Erde erstellt. Dabei haben wir einen Eindruck davon bekommen, wie aufwendig es sein könnte, den ganzen Planeten Erde in Vektor Kacheln abzubilden. Hinzu kommt, dass die Informationen sich permanent ändern. Gerade bei den Details veraltern die Geodaten recht schnell. Es entstehen Neubaugebiete und Straßen ändern sich, Geschäfte und Ärzte ziehen um und sogar die Erde selbt ist nicht unveränderlich [^nationalgeographic.de/wissenschaft/2020/12/warum-der-mount-everest-waechst-und-schrumpft].

Die Datei, die alle Openstreetmap-Daten enthält, beinhaltet 2022 im November 66 GB. Diese 66 GB muss man mal 12 rechnen, um auf den notwendigen Arbeitsspeicher zu kommen. 12 mal 66 GB sind 792 GB. Soviel Arbeitsspeicher haben nicht viele zur Verfügung. [^wheregroup.com/blog/details/tilemaker-am-limit/]

![Download OSM Planet File](/images/spannend.png)

Wenn man nun die Standorte einer weltweit tätigen Organisation auf einer Karte darzustellen möchte, benötigt man nicht unbedingt alle Details der Erde. Ob in der Kirchstraße in Kleindorf kürzlich ein Poller gesetzt wurde, interessiert nicht. Im Grunde genommen reicht es für die grobe Orientierung aus, die Ländergrenzen zu sehen. Die Details zum Standort sind über Marker und Popups zu den Markern transferierbar. Eine solche Karte wäre auch unkompliziert an die Corporate Identity der Organisation anpassbar.

## Natural Earth Data, freie Daten für individuelle digitale Karten

Was ist Natural Earth Data? Naturalearthdata.com ist eine Website, die Quelldaten für die Kartenproduktion im `Shape`-Vektorformat und einige Rasterdatensätze kostenlos zur Verfügung stellt. Das Angebot wird unter _Public Domain_ geführt und ist somit unter sehr wenigen Bedingungen für alle Nutzungsarten freigegeben.

Was bietet Natural Earth Data? Grundsätzlich ist Natural Earth in drei Maßstabsebenen (1:10 Mio., 1:50 Mio. und 1:110 Mio.) und drei Themenbereiche (Cultural, Physical und Raster) unterteilt. Hinter diesen Kategorien stecken aufbereitete Datensätze. 

Ich habe die Ländergrenzen im Format 1:50 heruntergeladen. Konkret ist das die Datei `ne_50m_admin_0_countries.zip`. Nach dem Entpacken verfüge ich über mehrere Dateien. Unter anderem eine mit der Endung `.shp`. Ein `Shape`-Vektorformat.


## Shape-Vektorformat in Vector Kacheln überführen

> Die `Shape`-Datei kann ich auf unterschiedliche Weise nutzen. Wie man dies mittels Leaflet.js tun kann, hatte ich unter [esri-leaflet](https://blog.astrid-guenther.de/esri-leaflet/)[^blog.astrid-guenther.de/esri-leaflet/] bereits beschrieben.

Momentan ist mein Ziel, Vektor-Kacheln zu erzeugen. Software für die Erstellung von Karten-Kacheln bietet maptiler.com. [MapTiler Engine](https://www.maptiler.com/news/2022/10/maptiler-desktop-becomes-engine/) verwandelt laut Website Rasterbilder und geografischen Vektordaten in interaktive Karten. Das probiere ich aus. Zum Testen ist die Software zum freien Download verfügbar. 

> Die Maplibre Demotiles [github.com/maplibre/demotiles] wurden mit dem Vorgänger von [MapTiler Engine](https://www.maptiler.com/news/2022/10/maptiler-desktop-becomes-engine/) erstellt.

Der Download und die Installation von [MapTiler Engine](https://www.maptiler.com/news/2022/10/maptiler-desktop-becomes-engine/) sind problemlos. Ich kann meine `Shape`-Datei `ne_50m_admin_0_countries.shp` via Schaltfläche `Add` importieren. Die Schaltfläche `Export` führt mich dann zum Export des gewünschten Formats. Ich wähle die Option, die die Kacheln einzeln in einem Verzeichnis anlegt.

![MapTiler Engine](/images/maptilerengine.png)

Im nächsten Schritt kann ich den Layer benennen und die Attribute bearbeiten.

![MapTiler Engine](/images/maptilerengine2.png)

Am Ende verfüge ich über ein Verzeichnis mit dem von mir gewählten Namen.

![MapTiler Engine](/images/maptilerengine3.png)

Ich kopiere das Verzeichnis auf einen Webserver und öffne die Datei `openlayers.html`. Der Webbrowser zeigt mir alle Länder der Welt.

![MapTiler Engine](/images/maptilerengine4.png)

##

<img src="https://vg01.met.vgwort.de/na/b67e937711394ba8b6213d01ab18bc2c" width="1" height="1" alt="">