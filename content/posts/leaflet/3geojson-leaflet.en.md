---
date: 2018-12-15
title: 'GeoJSON'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: en/geojson-leaflet
langKey: en
categories:
  - Leaflet
tags:
  - geografische Daten
  - Leaflet
---

In the last chapter you learned about points, markers, lines and polygons. You can now draw these on a leaflet map and know when which object is the right one. You can distinguish [layer groups](https://leafletjs.com/reference.html#layergroup)[^https://leafletjs.com/reference.html#layergroup] and [feature groups](https://leafletjs.com/reference.html#featuregroup)[^https://leafletjs.com/reference.html#featuregroup] from each other and you know what to look for when displaying a leaflet map on a small display. In addition, you can now react appropriately to a mouse click or other event.

The next chapter is about the format [GeoJson](https://de.wikipedia.org/w/index.php?title=GeoJSON&oldid=183228442)[^https://de.wikipedia.org/w/index.php?title=geojson&oldid=183228442] and how to handle data well even in large quantities.

GeoJSON is an open format that makes it easy to describe geographic data. It follows a specification - namely the [Simple Feature Access Specification](https://de.wikipedia.org/w/index.php?title=Simple_Feature_Access&oldid=171319596)[^https://de.wikipedia.org/w/index.php?title=simple_feature_access&oldid=171319596]. For the description of the geodata GeoJSON uses
uses the [JavaScript Object Notation (JSON)](https://en.wikipedia.org/w/index.php?title=JSON&oldid=1018029384)[^https://en.wikipedia.org/wiki/json].

> The term _Simple Feature Access Specification_ hides a specification of the [Open Geospatial Consortium (OGC)](https://de.wikipedia.org/w/index.php?title=Open_Geospatial_Consortium&oldid=180537320)[^https://de.wikipedia.org/w/index.php?title=open_geospatial_consortium&oldid=180537320]. This specification contains a generally valid description for geodata and their geometries. The fact that the specification is universally valid means that this data can be exchanged easily. The OGC is a non-profit organisation that aims to develop universally valid standards for geodata.

## In this chapter we will …

First, we look at why GeoJSON was developed. Next, we compare the individual GeoJSON elements with the objects that the Leaflet provides. And last but not least, we try out the methods Leaflet offers us specifically for processing GeoJSON data.

## The history of GeoJSON

[GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) builds on [JSON](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070)[^https://de.wikipedia.org/w/index.php?title=javascript_object_notation&oldid=183718070]. Before JSON was specified as a data format, there was the extensible markup language [XML](https://en.wikipedia.org/w/index.php?title=XML&oldid=1016987270)[^https://en.wikipedia.org/w/index.php?title=xml&oldid=1016987270].

Whenever something new is created, there is a reason for it!

XML was [published in 1998](https://www.w3.org/TR/1998/REC-xml-19980210)[^https://www.w3.org/tr/1998/rec-xml-19980210] in order to be able to exchange data between machines without humans having to rework it. This became more and more important in times of the internet. Now there must also be a reason why JSON and GeoJSON why JSON and GeoJSON came into being.

### Why did the GeoJSON format come into being?

Why did the GeoJSON format come into being? Obviously there were things where XML was not optimal for the exchange of data. Why was this the case and what advantages does JSON, or GeoJSON, offer? First of all, all three formats offer the following:

- All three formats can be read and understood by a human.
- All three formats are hierarchically structured. This means that values can be represented within other values.
- All three formats are relatively easy to learn.
- All three formats can be analysed and used by many programming languages.
- All three formats can be exchanged with the help of the Hypertext Transfer Protocol (HTTP) - i.e. via the Internet.

Sehen wir uns in diesem Kapitel die einzelnen Formate einmal genauer an um zu erkennen, welche Vorteile das Format JSON – beim Arbeiten mit
[Geodaten](https://de.wikipedia.org/w/index.php?title=Geodaten&oldid=181076558)[^https://de.wikipedia.org/w/index.php?title=geodaten&oldid=181076558] das Format GeoJSON – gegenüber XML bringt.

#### XML

XML beschreibt die Struktur von Daten.
Anhand der _Tags_ wird den Daten eine Bedeutung – eine
[Semantik](https://de.wikipedia.org/w/index.php?title=Semantik&oldid=184048296)[^https://de.wikipedia.org/w/index.php?title=semantik&oldid=184048296] – gegeben.
Durch das Tag-System von XML werden oft kleine Datenbes (nde sehr aufgebläht un)] – gegeben.
Durch das Tag-System von XML werden oft kleine Datenbestände sehr aufgebläht und
dadurch unübersichtlich.
Außerdem ist das Ansprechen einzelner Tags in einer XML-Datei teilweise recht kompliziert.

#### JSON

JSON ist im Grunde genommen nichts anderes als die Festlegung auf eine bestimmte Syntax –
also eine _Syntax-Konvention_. Den Daten wird keine bestimmte Bedeutung geben,
vielmehr geht es um die syntaktische Anordnung.
Da JSON Daten strukturiert, können leicht Objekte aus diesen Daten definiert werden.
JSON wird fortwährend weiterentwickelt. Im Dezember 1999 wurde die erste JSON Format-Spezifikation verabschiedet.
Aktuell wird es durch zwei konkurrierende Standards spezifiziert,
[RFC 8259](https://tools.ietf.org/html/rfc8259)[^https://tools.ietf.org/html/rfc8259] und [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf)[^.

Der große Vorteil von JSON im Vergleich zu XML liegt in der einfachen (ndhabung. Da JSON selb)].

Der große Vorteil von JSON im Vergleich zu XML liegt in der einfachen Handhabung. Da JSON selbst gültiges Javascript darstellt, kann es direkt ausgeführt und somit in ein Javascript-Objekt überführt werden. Auf die einzelnen Eigenschaften dieser Objekte kann dann über die Attribute zugegriffen werden. Im Kapitel _Heatmaps in Leaflet – Dichte_ werden wir eine Datei, die GeoJSON Objekte enthält, als Skript einbinden. Allein durch das Einbinden der Datei können wir innerhalb anderer Skripte auf die GeoJSON Objekte der eingebundenen Datei zugreifen. Im Gegensatz dazu muss eine XML-Datei erst mit einem XML-Parser analysiert werden.

Ein weiterer Vorteil von JSON: In JSON gibt es kein Ende-Tag.
Hauptsächlich deshalb ist JSON kompakter. Dies hat nämlich zur Folge,
dass JSON schneller gelesen und verarbeitet werden kann.

> Die Daten einer jeden GeoJson-Datei, die sich in einem GitHub Repository befindet, werden – wenn man die Datei im Repository anklickt – automatisch auf einer interaktiven Karte angezeigt. [Github](https://github.com/blog/1528-there-s-a-map-for-that) erstellt diese Karten schon seit 2013 mit Leaflet. Dies können Sie sich beispielsweise im Repository [world.geo.json](https://github.com/astridx/world.geo.json/blob/master/countries.geo.json)[^https://github.com/astridx/world.geo.json/blob/master/countries.geo.json]ansehen.

Schon ein kleines Beispiel veranschaulicht, dass XML für das (schreiben des gleichen)] ansehen.

Schon ein kleines Beispiel veranschaulicht, dass XML für das Beschreiben des gleichen Objektes mehr Zeichen benötigt als JSON. Ein, in XML mit 95 Zeichen kodiertes, Objekt benötigt in JSON gerade einmal 73 Zeichen. Bei einem Objekt ist dieser Unterschied vernachlässigbar. In der Regel werden eine Vielzahl von Objekten digital beschrieben. Bei einer Vielzahl von Objekten kann dieser Unterschied stark ins Gewicht fallen.

Hier sehen Sie zunächst den aus 95 Zeichen bestehende XML Ausschnitt.

```
<joomlers>
  <number>1721</number>
  <vorname>Astrid</vorname>
  <nachname>Günther</nachname>
</joomlers>
```

Das gleiche Objekt kann mit 73 Zeichen im JSON Format beschrieben werden.

```
„joomlers“: {
„number“: „1721“,
„vorname“: „Astrid“,
„nachname“: „Günther“
},
```

#### Und warum nach JSON nun auch noch GeoJSON?

Geodaten könnten in JSON beschrieben und verarbeitet werden. Welchen Vorteil bringt das spezielle **Geo**JSON-Format? GeoJSON ist JSON – allerdings auf Geodaten spezialisiert. GeoJSON gibt den Geodaten wieder eine Semantik – also eine Bedeutung. Nun fragen Sie sich sicher, was dieses Hin und Her soll. Macht das Sinn? Ja, es macht Sinn: GeoJSON pickt sich nur die positiven Eigenschaften der Formate JSON und XML heraus.

GeoJSON beschreibt Punkte, Linien und Polygone und kann gut mit diesen Formen in einem Koordinatensystem gut umgehen. Im vorausgehenden Kapitel haben wir gesehen, dass das Arbeiten mit Geodaten im Grunde genommen nichts anderes ist. GeoJSON hat sich zu einem sehr beliebten Datenformat vieler Geoninformationssysteme entwickelt. In diesem Buch erwähne ich GeoJSON speziell, weil auch Leaflet sehr gut im Umgang mit Daten im GeoJSON Format ist. Hier sehen wir uns zunächst die GeoJSON Objekte einmal genauer an. Wenn Sie lieber sofort praktisch arbeiten möchten, dann Blättern Sie am besten ein Kapitel weiter. Im Kapitel _GeoJSON in Leaflet_ erfahren Sie, wie Sie GeoJSON-Elemente auf Ihrer Karte anzeigen und weiter
bearbeiten können.

Zur zeitlichen Einordnung: GoeJSON ist noch recht jung.

- Im Juni 2008 wurde die erste GeoJSON Format-Spezifikation verabschiedet.
- Im August 2016 wurde die [RFC (Requests for Comments) 7946](http://geojson.org/)[^http://geojson.org/] veröffentlicht.

> Die formale Spezifikation des GeoJSON Formates finden Sie unter der
> Adresse [https://tools.ietf.org/html/rfc7946](https://tools.ietf.org/html/rfc7946)
> im Internet.

### GeoJSON erkunden

Sie wissen nun, dass Sie mit GeoJSON viele geografische Datenstrukturen
in einer maschinenlesbaren Sprache kodieren können.
Ein GeoJSON-Objekt kann dabei eine einfache Geometrie,
zum Beispiel einen Punkt eine Linie oder ein Polygon, darstellen.
Zusätzlich können Sie einer Geometrie eine Bedeutung geben.
Sie können jedem Element Eigenschaften zuordnen. Zum Beispiel können Sie einer
Linie die Eigenschaft `typ=straße` oder `name=Kirchstraße` mitgeben.
In diesem Fall erstellen Sie ein GeoJSON Objekt vom Typ
[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)[^https://tools.ietf.org/html/rfc7946#section-3.2].
Wenn Sie mehrere Feature-Objekte zu einer Gruppe zusammen fassen möchten,
können Sie diese zu einer Sammlung von Features zusammen fassen.
Hierfür gibt es den GeoJSON Typ
[FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)[^https://tools.ietf.org/html/rfc7946#section-3.3].
Das Verständnis dieser Konzepte bringt viele Vorteile.
Es hilft Ihnen auch, die Arbeit mit Geodaten im Allgemeinen zu verstehen:
Die Grundkonzepte, die in GeoJSON angewandt werden,
sind schon seit vielen Jahren ein Teil
von [Geoinformationssystemen](https://de.wikipedia.org/w/index.php?title=Geoinformationssystem&oldid=183596912)[^https://github.com/astridx/world.geo.json/blob/master/countries.geo.json].
Beginnen wir von vorne.

#### Eine Geometrie

Eine [Geometrie](https://de (ikipedia.org/w/index.p)].
Beginnen wir von vorne.

#### Eine Geometrie

Eine [Geometrie](https://de.wikipedia.org/w/index.php?title=GeoJSON&oldid=183228442#Geometrien)[^https://de.wikipedia.org/w/index.php?title=geojson&oldid=183228442#geometrien]
ist eine Form.
Alle Formen in GeoJSON werden mit einer oder mehrerer Koordin (en beschrieben.
Eine K)]
ist eine Form.
Alle Formen in GeoJSON werden mit einer oder mehrerer Koordinaten beschrieben.
Eine Koordinate heißt in GeoJSON _Position_.

GeoJSON unterstützt die Geometriearten

1. Point,
2. LineString,
3. Polygon,
4. MultiPoint,
5. MultiLineString, und
6. MultiPolygon

– und eine jede dieser Geometriearten beinhaltet Positionen.

##### Position

Das wichtigste Element beim Arbeiten mit Geodaten ist die Beschreibung des
Punktes auf der Erde.
Der Punkt auf der Erde ist der, dem die Geodaten zugeordnet werden.
Diesen Wert kennen wir auch unter dem Namen Koordinate.
Im Kapitel _Das Koordinatensystem der Erde_ habe ich schon eine ganze Menge zum Thema Koordinaten auf der Erde geschrieben.
Hier noch einmal kurz: Eine Koordinate ist eine Zahlenkombination.
Jede Zahl einer Koordinate steht für eine Dimension.
Wir beschränken uns in diesem Buch auf zwei Dimensionen,
nämlich die geografische Längen und die geografische Breite.
GeoJSON unterstützt drei Dimensionen – neben der geografischen Länge
und der geografischen Breite können Sie zusätzlich die Höhe auf der Erde angeben.

> Beim [globalen Navigationssatellitensystem (GPS)](https://wiki.openstreetmap.org/w/index.php?title=DE:Genauigkeit_von_GPS-Daten&oldid=1581004)[^https://wiki.openstreetmap.org/w/index.php?title=de:genauigkeit_von_gps-daten&oldid=1581004]
> ist noch eine vierte Große relevant.
> Neben der horizontalen Position und der Höhe spie ( auch
> die aktuelle Z)]
> ist noch eine vierte Große relevant.
> Neben der horizontalen Position und der Höhe spielt auch
> die aktuelle Zeit eine Rolle.

Die Koordinaten werden in GeoJSON im Dezimalformat formatiert.
Die erste Zahl steht für die Longitude – also die geografische Länge –
und die zweite Zahl für die Latitude – also die geografische Breite.
Konkret sieht eine Position in GeoJSON so aus:

```
[Länge, Breite, Höhe]
```

oder

```
[50.254, 7.5847, 324.1]
```

> Vielleicht haben Sie in der Vergangenheit schon öfter mit Geodaten gearbeitet und wundern sich nun über die Reihenfolge, in der die Dimensionen im Format GeoJSON stehen? Viele Systeme geben zuerst die geografische Länge und erst dann die geografische Breite an. Auch in Leaflet wird bei der Koordinate zuerst die Latitude - also die geografische Breite - und erste dann die Longitude - also die geografische Länge - angegeben: `Breitengrad | Längengrad`. Um dieses Durcheinander zu verstehen, müssen Sie das Folgende bedenken: Früher war es üblich, dass die erste Stelle einer Koordinate den Breitengrad und die zweite Stelle den Längengrad beschrieb. In der Mathematik ist die übliche Reihenfolge beim Arbeiten mit Koordinatensystemen: `X-Wert | Y-Wert`. Wenn man eine Landkarte mit einem Koordinatensystem vergleicht, erkennt man schnell, dass der Breitengrad dem `X-Wert` und der Längengrad der dem `Y-Wert` entspricht. Dies hat zur Folge, dass es beim Rechnen mit einem Computer viele Vorteile bringt, wenn man die Reihenfolge `Längengrad | Breitengrad` einhält. In der digitalen Welt gibt es momentan noch keine Einigkeit über die Reihenfolge. Es sieht so aus, als ob wir mitten in einem Umbruch stecken. Eine Übersicht, die zeigt, welche Anwendung die Dimensionen in welcher Reihenfolge verwendet finden Sie unter anderem unter der Adresse https://macwright.org/lonlat/.

Früher erlaubte GeoJSON die Speicherung von mehr als drei Zahlen pro Position.
Diese Möglichkeit wurde auch genutzt.
Es wurden beispielsweise Sportdaten wie die Herzfrequenz zusammen
mit der Position gespeichert. So konnte ein Sportler später nachsehen, wie
sich sein Puls am Berg und im Tal unterscheidet. Da dies nicht der Sinn
einer Position ist, führte dieses Vorgehen teilweise zu Problemen
in anderen GeoJSON Anwendungen.
In der [neuen GeoJSON Spezifikation](https://tools.ietf.org/html/rfc7946#section-3.1.1)[^https://tools.ietf.org/html/rfc7946#section-3.1.1]
ist das Speichern von mehr als drei Werten pro Position nun nicht mehr zulässig.

##### Point

Der Typ Point – also Punkt – ist die einfachste Geometrie in GeoJSON.
Er gibt die Koordinaten einer bestimmten Position im Raum an.
Die genaue Schreibweise sehen Sie nachfolgend.

```
{
    "type": "Point",
    "coordinates": [30.0, 10.0]
}
```

In Leaflet wird der Typ [Point](https://tools.ietf.org/html/rfc7946#section-3.1.2)[^https://tools.ietf.org/html/rfc7946#section-3.1.2]
als [Marker](https://leafletjs.com/reference.html#marker)[^https://leafletjs.com/reference.html#marker] zur Karte hinzugefügt.

##### Multipoint

Der Typ MultiPoint wird mit einem Array von Positionen beschrieben.
Mit ihm können mehrere Punkte auf der Erde angegeben werden.

```
{
    "type": "MultiPoint",
    "coordinates": [
        [100.0, 2.0],
        [50.0, 21.0],
        [101.0, 1.0]
    ]
}
```

Mit dem Typ Multipoint können Sie mehrere Marker auf einen Schlag zu
Ihrer Leaflet Karte hinzufügen.

##### LineString

Um eine Linie darzustellen, benötigen Sie mindestens zwei Punkte.
Die Linie ist die Verbindung zwischen diesen Punkten.
Eine Linie wird mit einem Array von zwei oder mehr Positionen gebildet.
In GeoJSON wird eine Linie mit dem Typ LineString dargestellt.

```
{
    "type": "LineString",
    "coordinates": [
        [100.0, 0.0],
        [20.0, 5.0],
        [101.0, 1.0]
    ]
}
```

Ein GeoJSON Objekt vom Typ [LineString](https://tools.ietf.org/html/rfc7946#section-3.1.4)[^https://tools.ietf.org/html/rfc7946#section-3.1.4] entspricht einem
[Polyline Objekt](https://leafletjs.com/reference.html#polyline)[^https://leafletjs.com/reference.html#polyline] in Leaflet.

##### MultiLineString

Beim Typ MultiLineString werden die Koordinaten mit einem Array von
LineString-Koordinaten-Arrays angegeben.

```
{
    "type": "MultiLineString",
    "coordinates": [
        [
            [100.0, 0.0],
            [101.0, 1.0]
        ],
        [
            [10.0, 5.0],
            [11.0, 1.1]
        ],
        [
            [102.0, 2.0],
            [103.0, 3.0]
        ]
    ]
}
```

Ein GeoJSON Objekt vom Typ
[MultiLineString](https://tools.ietf.org/html/rfc7946#section-3.1.5)[^https://tools.ietf.org/html/rfc7946#section-3.1.5]
entspricht einem Leaflet [Polyline Objekt](https://leafletjs.com/reference.html#polyline)[^https://leafletjs.com/reference.html#polyline], welches mehr als eine abgeschlossene
Linie definiert.
Das bedeute, dass alle Linien zusammen auf einem Layer gezeichnet werden.

> Wie bei den Objekten in Leaflet gilt auch hier: Linien und Punkte
> sind die einfachsten Geometrieformen. Bei beiden müssen Sie nicht
> viele geometrische Regeln beachten. Ein Punkt kann irgendwo an einem
> Ort liegen und eine Linie kann eine beliebige Anzahl an Punkten
> enthalten. Eine Linie darf sich selbst überqueren. Punkte und Linien
> haben keine Fläche – somit gibt es auch kein _Außen_ und kein
> _Innen_.

##### Polygone

Im Vergleich zu Linien sind Polygone komplexe Geometrien. Polygone verfügen über eine Fläche. Es gibt also einen Innenbereich, der sich von einem Außenbereich unterscheidet. Und hinzu kommt: Der Innenbereich kann Löcher haben! Wie die Löcher in einem Polygon entstehen, habe ich Ihnen im Kapitel _Die Karte mit Daten bestücken_ im Unterkapitel _Polygone_ erklärt. Ein GeoJSON Objekt vom Typ [Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6)[^https://tools.ietf.org/html/rfc7946#section-3.1.6] entspricht einem [Polygon Objekt](https://leafletjs.com/reference.html#polygon)[^https://leafletjs.com/reference.html#polygon] in Leaflet. Die Koordinatenliste enthält bei einem Polygon – analog zu Leaflets Polygon – eine Ebene mehr als die Koordinatenliste des Typs LineString.

```
    {
        "type": "Polygon",
        "coordinates": [
*           [
                [30.0, 10.0],
                [40.0, 40.0],
                [20.0, 40.0],
                [10.0, 20.0],
                [30.0, 10.0]
*           ]
        ]
    }
```

Bei einem einfachen Polygon ist der Sinn dieser Ebene nicht offensichtlich.
Auf den ersten Blick könnten Sie der Meinung sein, dass es einfacher wäre,
das Polygon genau wie die Linie zu erstellen.
Dass es sich um ein Polygon handelt, ist über den Eintrag bei der Eigenschaft
Typ klar. Und, wenn es sich um den Typ Polygon handelt,
wird die Linie einfach geschlossen!
Der erste Blick ist oft trügerisch.
Wir benötigen diese zusätzliche Möglichkeit der Klammerung oder
Verschachtelung um Löcher in die Fläche zeichnen zu können.
Polygone sind in GeoJSON mehr als nur geschlossene Linien.
Ich wiederhole mich.
Polygone haben einen Innenbereich, und dieser Innenbereich kann Löcher haben.
Aus diesem Grund ist beim Typ Polygone in der GeoJSON Spezifikation ein
neuer Begriff zu lesen, nämlich der Begriff
[LinearRing](https://tools.ietf.org/html/rfc7946#section-3.1.6)[^https://tools.ietf.org/html/rfc7946#section-3.1.6].
Ein LinearRing ist ein geschlossener LineString mit vier oder mehr Positionen.
Obwohl ein LinearRing nicht explizit als GeoJSON-Geometrie-Typ eingeführt ist,
wird der Begriff in der
[Polygon-Geometrie-Typ-Definition](https://tools.ietf.org/html/rfc7946#section-3.1.6)[^https://tools.ietf.org/html/rfc7946#section-3.1.6]
der Spezifikation erwähnt.

Ein _LinearRing_ ist entweder die äußere Ringposition, die die äußere Kante des Polygons bildet und definiert, welche Flächen gefüllt sind. Ein _LinearRing_ kann auch ein Innenring sein, der die Flächen des Polygons definieren, die leer sind. Es kann eine beliebige Anzahl von Innenringen geben,
einschließlich null Innenringe. Wenn das Polygon über keinen Innenring verfügt bedeutet dies, dass das Polygon nur einen Innenbereich und einen Außenbereich hat – also keine Löcher hat.

```
{
    "type": "Polygon",
    "coordinates": [
        [
            [1.0, 1.0],
            [1.0, 10.0],
            [10.0, 10.0],
            [10.0, 1.0],
            [1.0, 1.0]
        ]
        [
            [2.0, 2.0],
            [2.0, 5.0],
            [5.0, 5.0],
            [5.0, 2.0],
            [2.0, 2.0]
        ]
    ]
}

```

![Ein Polygon mit einem Innenring. Der Innenring definiert einen Außenbereich im Polygon – er schneidet quasi ein Loch in das Polygon .](/images/928b.png)

```
{
    "type": "Polygon",
    "coordinates": [
        [
            [1.0, 1.0],
            [1.0, 10.0],
            [10.0, 10.0],
            [10.0, 1.0],
            [1.0, 1.0]
        ]
        [
            [2.0, 2.0],
            [2.0, 5.0],
            [5.0, 5.0],
            [5.0, 2.0],
            [2.0, 2.0]
        ]
        [
            [3.0, 3.0],
            [3.0, 4.0],
            [4.0, 4.0],
            [4.0, 3.0],
            [3.0, 3.0]
        ]
    ]
}

```

![Ein Polygon mit zwei Innenringen – der zweite Innenring wird innerhalb des ersten Innenringes gezeichnet. Dieser zweite Innenring zeichnet einen neuen Innenbereich in den Außenbereich der durch den ersten Innenring entstanden ist.](/images/928c.png)

> Vielleicht
> ist Ihnen aufgefallen, das die erste und die letzte Koordinate jedes
> LinearRings gleich ist. Die Wiederholung der Koordinate ist bei einem
> Leaflet Objekt nicht erwünscht. Hier werden die Ringe eines Polygone
> automatisch geschlossen. Die erste und letzte Position eines GeoJSON
> LinearRing muss im Gegensatz dazu identisch sein.

##### MultiPolygon

Beim Typ MultiPolygon werden die Koordinaten mit einem Array von
Polygon-Koordinaten-Arrays angegeben.
Hier sehen Sie zunächst ein Beispiel, dass zwei einfache Polygone darstellt.

```
{
    "type": "MultiPolygon",
    "coordinates": [
        [
            [
                [102.0, 2.0],
                [103.0, 2.0],
                [103.0, 3.0],
                [102.0, 3.0],
                [102.0, 2.0]
            ]
        ],
        [
            [
                [100.2, 0.2],
                [100.2, 0.8],
                [100.8, 0.8],
                [100.8, 0.2],
                [100.2, 0.2]
            ]
        ]
    ]
}
```

Es geht komplizierter. Sie können auch mehr als ein Polygon mit Löchern – also mehr als einem LinearString – zusammen als MultiPolygon gruppieren.

```
{
    "type": "MultiPolygon",
    "coordinates": [
        [
            [
                [102.0, 2.0],
                [103.0, 2.0],
                [103.0, 3.0],
                [102.0, 3.0],
                [102.0, 2.0]
            ]
        ],
        [
            [
                [100.0, 0.0],
                [101.0, 0.0],
                [101.0, 1.0],
                [100.0, 1.0],
                [100.0, 0.0]
            ],
            [
                [100.2, 0.2],
                [100.2, 0.8],
                [100.8, 0.8],
                [100.8, 0.2],
                [100.2, 0.2]
            ]
        ]
    ]
}
```

Ein GeoJSON Objekt vom Typ
[MultiPolygon](https://tools.ietf.org/html/rfc7946#section-3.1.7)[^https://tools.ietf.org/html/rfc7946#section-3.1.7] entspricht einem
[Leaflet Polygon Objekt](https://leafletjs.com/reference.html#polygon)[^https://leafletjs.com/reference.html#polygon],
welches mehr als ein Polygon definiert.
Das bedeute, dass alle Formen zusammen auf einen Layer gezeichnet werden.

##### Mehrere Geometrien zusammenfassen - GeometryCollection

Geodaten wollen die Welt beschreiben.
Jeder der grundlegenden GeoJSON Typen ist ideal für die Darstellung
eines Objektes auf der Erde. Unsere Welt enthält eine Menge Objekte,
die gemeinsame Eigenschaften haben.
Wenn wir diesen Objekten diese gemeinsamen Eigenschaften auf einen
Schlag zuordnen möchten, können wir diese Objekte mit dem
Typ [GeometryCollection](https://tools.ietf.org/html/rfc7946#section-3.1.8)[^https://tools.ietf.org/html/rfc7946#section-3.1.8]
zusammenfassen. Zum Beispiel haben die beiden Geometrien im nachfolgenden Beispiel
denselben Namen.

```
{
    "type": "Feature",
    "geometry": {
        "type": "GeometryCollection",
        "geometries": [{
            "type": "Point",
            "coordinates": [100.0, 0.0]
        }, {
            "type": "LineString",
            "coordinates": [
                [101.0, 0.0],
                [102.0, 1.0]
            ]
        }]
    },
    "properties": {
        "name": "Der Name dieser GeometryCollection"
    }
}
```

Einen Anwendungsfall für eine Geometriekollektion gibt es in der
Praxis allerdings nur sehr selten: Meist ist es so,
dass jede Geometrie auch eigene Eigenschaften besitzt.
Im nächsten Kapitel werden Sie lesen, dass Sie eine Geometrie mit
eigenen Eigenschaften im Typ Feature beschreiben können
und Feature Objekte werden mit dem Typ FeatureCollection zusammengefasst.

#### Einer GeoJSON Geometrie Eigenschaften zuordnen

Geometrien sind Formen – nicht mehr und nicht weniger. Sie sind ein zentraler Teil von GeoJSON, die meisten Daten, die etwas mit der Welt zu tun haben, sind nicht einfach nur eine Form. Die Formen haben auch eine Identität und Attribute. Ein Polygon stellt beispielsweise den Reichstag dar. Ein anderes Polygone ist die Grenze von Deutschland. Und bei der Arbeit mit den Geometrien ist es wichtig zu wissen, welche Geometrie was ist und, welche Eigenschaften die Geometrie hat. In GeoJSON kann genau dies mit einem Objekt des Typs Feature erreicht werden.

Das nachfolgende Programmcodebeispiel enthält ein ganz einfaches Feature Element.

```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [0, 0]
  },
  "properties": {
    "name": "Der Name des Punktes"
  }
}
```

Im nächsten Beispiel sehen Sie ein etwas komplexeres Feature. Sie erkennen hier, dass eine Eigenschaft eines Feature Elements
mit jedem [JSON-Objekt Datentyp](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070#Datenstruktur_und_Formatdefinition)[^https://de.wikipedia.org/w/index.php?title=javascript_object_notation&oldid=183718070#datenstruktur_und_formatdefinition] beschrieben werden kann.

```
  {
  "type": "Feature",
  "geometry": {
  "type": "Polygon",
  "coordinates": [
                    [30, 20],
                    [45, 40],
                    [10, 40],
                    [30, 20]
                 ]
  },
  "properties": {
  "prop0": "value0",
  "prop1": {"this": "that"},
  "prop2": true,
  "prop3": null,
  "prop4": ["wert1", "wert2", "wert3"],
  "prop5": 0.0
  }
  }

```

JSON kennt folgende Datentypen:

- Nullwert  
  Ein Nullwert wird durch das Schlüsselwort `null` dargestellt.
- Boolescher Wert  
  Ein Boolescher Wert wird durch die Schlüsselwörter `true` und `false` dargestellt.
- Zahl  
  Eine Zahl ist eine Folge der Ziffern `0`–`9`.
- Zeichenkette  
  Eine Zeichenkette beginnt und endet mit doppelten geraden Anführungszeichen `"`.
- Array  
  Ein Array beginnt mit `[` und endet mit `]`.
- Objekt  
  Ein Objekt beginnt mit `{` und endet mit `}`.

#### FeatureCollection

So nun haben wir jede Menge Typen kennen gelernt.
Den Typ, den Sie sicherlich am meisten nutzen werden,
habe ich für den Schluss aufgehoben. Die Syntax einer FeatureCollection
können Sie im nachfolgenden Beispiel ablesen.

```
{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [102.0, 0.5]
        },
        "properties": {
            "prop0": "value0"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [102.0, 0.0],
                [103.0, 1.0],
                [104.0, 0.0],
                [105.0, 1.0]
            ]
        },
        "properties": {
            "prop0": "value0",
            "prop1": 0.0
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [50.0, 7.0],
                    [60.0, 8.0],
                    [70.0, 9.0]
                ]
            ]
        },
        "properties": {
            "name": "Luisenturm",
            "prop1": {
                "this": "that"
            }
        }
    }]
}
```

Ein Objekt vom Typ [FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3) enthält ein Schlüssel-Wert-Paar. Der Wert ist ein Array das aus Feature Objekten besteht und der Schlüssel lautet Features. Wie der Name schon sagt, darf das Array ausschließlich Objekte vom Typ Feature enthalten.

Welche Vorteile bring ein Objekt vom Typ FeatureCollection zusätzlich zu
den einzelnen Feature Objekten? Ein Objekt vom Typ FeatureCollections ist
sehr sinnvoll, wenn Sie mit GeoJSON-Typen arbeiten,
die gemeinsame Eigenschaften haben.
Im nächsten Kapitel wird Ihnen dies anhand von praktischen Beispielen klar werden.

> **Hinweis:**  
> Sie möchten gerne GeoJSON nutzen und
> haben auch schon die ersten Dateien erstellt.
> Vielleicht sind Sie auch schon auf das ein oder andere Problem
> gestoßen oder möchten einfach nur mit der Syntax vertraut werden.
> Auf der Website [http://geojsonlint.com](http://geojsonlint.com)[^http://geojsonlint.com]
> können Sie Ihre GeoJSON Daten testen.

### Die Grenzen von GeoJSON

Die Vorteile von GeoJSON hatte ich Ihnen weiter vorne in diesem
Kapitel näher gebracht. Wie jedes andere Format hat GeoJSON auch seine Grenzen.
Diese sind nun Thema dieses Kapitels.

- GeoJSON hat kein Konstrukt das eine Komprimierung unterstützt
  wie beispielsweise [TopoJSON](https://github.com/topojson/topojson)[^https://github.com/topojson/topojson]
  oder [OSM XML](https://wiki.openstreetmap.org/w/index.php?title=OSM_XML&oldid=1419416)[^https://wiki.openstreetmap.org/w/index.php?title=de:genauigkeit_von_gps-daten&oldid=1581004].
- GeoJSON unterstützt die gleichen Datentypen wie JSON.
  JSON unter (ützt nicht jeden Daten)].
- GeoJSON unterstützt die gleichen Datentypen wie JSON.
  JSON unterstützt nicht jeden Datentyp. Zum Beispiel gibt es keinen Typ
  für Datumswerte in JSON.
- GeoJSON hat kein Konstrukt für die Anzeige von Pop-up Fenstern wie Titel
  oder Beschreibung.
- GeoJSON hat keine Geometrie vom Typ Kreis – oder irgendeine andere Art von Kurve.
- In GeoJSON können Sie den einzelnen Koordinaten – also den Positionen –
  keine eigene Eigenschaft zuweisen. Wenn Sie die _LineString_ Darstellung
  eines Trainingslaufs haben und Ihr GPS Gerät mehr als 1000 verschiedene
  Punkte während dieses Laufs zusammen mit Ihrer Herzfrequenz protokolliert hat,
  bietet GeoJSON keine klare Antwort auf die Frage, wie Sie diese Daten am
  besten darstellen. Sie könnten eine zusätzliche Eigenschafte als
  Array mit der gleichen Länge wie das Array der Koordinaten speichern –
  eine klare und einheitliche Regelung gibt es nicht. Jeder muss für sich selbst
  das Rad neu erfinden.

## GeoJson in Leaflet

Leaflet unterstützt alle GeoJSON-Typen. In der Regel werden Sie überwiegend den Typ _Feature_ und _FeatureCollection_ nutzen. Sie möchten ja sicher nicht nur Geometrie Objekte auf Ihrer Karte anzeigen, sondern auch die Eigenschaften – also weitere Informationen – zu diesen Objekten.

### Ein GeoJSON Feature in Leaflet einbinden

Beginnen wir mit einem übersichtlichen Beispiel:
Die einfachste Art GeoJSON in Ihrer Karte zu nutzen,
ist die Verwendung als Variable direkt – fest programmiert.
So etwas sollte man in der Praxis nicht machen. Ein Programm mit fix
programmierten Variablen ist in der Regel starr und unflexibel. Etwas größere
Anwendungen werden so auch schnell unübersichtlich, weil alles durcheinander
geschrieben ist.  
Übungsbeispiele sollen nur einen bestimmten Punkt hervorheben. Außerdem lassen sich die Beispiele so möglichst einfach darstellen.
Deshalb nutze ich in den Programmcodebeispielen in
diesem Buch fest programmierte Variablen.

> Eine andere alternative Art GeoJSON Daten in ein HTML-Dokument einzubinden finden Sie im Kapitel _Choroplethenkarte_ im Unterkapitel _Open Data_.

Das nachfolgende Programmcodebeispiel enthält einen _Punkt_. Sobald Sie diesen – in GeoJSON formatierten – Punkt in einer JSON-Variablen gespeichert haben, können Sie diesen ganz einfach zur Karte hinzufügen. Leaflet zeigt auf der Karte als Ergebnis einen Marker an.

> Wir haben im Kapitel _GeoJSON erkunden_ festgestellt, dass Leaflet Koordinaten in einer anderen Reihenfolge als GeoJSON schreibt. Wenn Sie die Standardfunktionen in Leaflet verwenden, müssen Sie sich hierüber keine Sorgen machen. Leaflet setzt die Koordinaten selbständig in die passende Form.

Hier also nun das erste praktische Beispiel zum Thema GeoJSON und Leaflet.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version2_2021/2/index_973.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px;" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 7)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var geojsonFeature1 = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [7.26469, 50.27264],
        },
        properties: {
          name: 'Gering',
        },
      }
      L.geoJSON(geojsonFeature1).addTo(mymap)
    </script>
  </body>
</html>
```

<!--index_973.html-->

Was passiert hier genau? Als erste haben wir den GeoJSON Code fest
in der Variablen `geojsonFeature1` gespeichert.
Als nächstes haben wir ein Leaflet Objekt vom Typ GeoJSON erstellt und
diesem unseren GeoJSON Code, also die Variable `geojsonFeature1`, übergeben.
Das GeoJSON Objekt haben wir gleichzeitig mithilfe der Methode `addTo()`
zum Leaflet-Kartenobjekt hinzugefügt.  
Mehr mussten wir nicht tun! Das Ergebnis ist ein Standard Marker
an der Stelle auf der Erde, die das GeoJSON Point Element beschreibt.

> Das Leaflet-Objekt [GeoJSON](http://leafletjs.com/reference#geojson)[^http://leafletjs.com/reference#geojson]
> ist ein Leaflet-Layer. Also eine Ebene.
> Ganz konkret erweitert die Klasse GeoJSON die Klasse
> [FeatureGroup](http://leafletjs.com/reference#featuregroup).

Auf der nachfolgenden Abbildung können Sie sich das Ergebnis ansehen.

![Ein Marker auf einer Leaflet Karte mithilfe von GeoJSON eingefügt.](/images/955.png)

> Wenn Sie an die Zeile  
> `L.geoJSON(geojsonFeature1).addTo(mymap);`  
> den Text  
> `.bindPopup('Pop-up Text');`  
> anhängen, also  
> `L.geoJSON(geojsonFeature1).addTo(mymap).bindPopup('Pop-up Text');`  
> schreiben, öffnet sich ein Pop-up Fenster, wenn Sie den Marker anklicken.

### Eine GeoJSON FeatureCollection in Leaflet einbinden

Das Beispiel des letzten Kapitels enthielt ausschließlich einen Punkt –
also ein Feature. Geodaten bestehen in der Regel aus mehreren Geometrien
mit dazugehörigen Eigenschaften – also FeatureCollections.
Leaflet liest eine FeatureCollection genauso ein, wie Sie es im letzten Beispiel
anhand des einen Features gesehen haben. Das nächste Beispiel zeigt Ihnen,
wie Sie einen Punkt, ein Polygon und eine Linie in einem Schritt auf
Ihrer Karte anzeigen könnten.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version2_2021/2/index_972.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px;" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 7)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var geojsonFeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [7, 50] },
            properties: { prop0: 'value0' },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [7, 50],
                [7, 51],
                [6, 51],
                [6, 52],
              ],
            },
            properties: { prop0: 'value0', prop1: 0.0 },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [6, 49],
                  [5, 49],
                  [5, 48],
                  [4, 49],
                  [4, 50],
                ],
              ],
            },
            properties: { prop0: 'value0', prop1: { this: 'that' } },
          },
        ],
      }
      L.geoJSON(geojsonFeatureCollection).addTo(mymap)
    </script>
  </body>
</html>
```

<!--index_972.html-->

Voila! Drei Elemente mit Standardeigenschaften auf der Leaflet Karte.

![Drei Element auf einer Leaflet Karte mithilfe von GeoJSON eingefügt.](/images/961.png)

### GeoJSON aus Leaflet exportieren

So, und nun machen wir genau das Gegenteil. Ein jedes Leaflet Objekt, das wir uns im Kapitel _Die Karte mit Daten bestücken_ angesehen haben, verfügt über eine Leaflet Methode mit dem Namen `toGeoJson()`. Und diese Methode tut genau das, was der Name schon vermuten lässt: Das übergebene Leaflet Objekt wird in ein GeoJSON Objekt umgewandelt und ausgegeben. Sehen Sie sich im nächsten Beispiel die Anwendung der Methode `toGeoJson()` an.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version2_2021/2/index_971.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px;" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 7)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var myMarker = L.marker([50.27264, 7.26469])
      var markerAsGeoJSON = myMarker.toGeoJSON()
      var geoJsonLayer = L.geoJson().addTo(mymap)
      geoJsonLayer
        .addData(markerAsGeoJSON)
        .bindPopup(
          'Ich bin mit der Methode .addData() zur Karte hinzugefügt worden. In GeoJson sehe ich so aus:<br> ' +
            JSON.stringify(markerAsGeoJSON)
        )
    </script>
  </body>
</html>
```

<!--index_971.html-->

Was zeigt Ihnen dieses Beispiel genau?
Das folgende Beispiel zeigt Ihnen, wie Sie einen Marker ins GeoJSON
Format konvertieren können.
Dazu erstellen Sie zunächst mit var `myMarker=L.marker([50.27264, 7.26469])`
einen Leaflet Marker. Danach rufen Sie die Methode `toGeoJSON()`
des Markers auf und speichern das zurückgegeben GeoJSON Objekt in der Variablen
`markerAsGeoJSON`. Als Nächstes erstellen Sie einen leeren GeoJSON Layer
und fügen diesen zum Kartenobjekt hinzu:
`var geoJsonLayer = L.geoJson().addTo(mymap)`.
Sie hätten den GeoJSON Code in der Variablen `markerAsGeoJSON`
wie in vorherigen Beispielen sofort beim Erstellen des Layers als
Parameter mitgeben können. Hier wollte ich ihnen die Methode `addData()`
zeigen, mit der Sie auch nachträglich noch GeoJSON Objekte zur GeoJSON Ebene
hinzufügen können.

> Im vorausgehenden Beispiel habe ich die Methode `JSON.stringify()`
> beim Erstellen des Textes im Pop-up Fenster angewandt. Mit
> der Methode [JSON.stringify()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)[^https://developer.mozilla.org/de/docs/web/javascript/reference/global_objects/json/stringify]
> können Sie eine JavaScript Variable in einen Text im JSON-Format
> konvertieren.

Die nac (olgende Abbildung zeig)]

> können Sie eine JavaScript Variable in einen Text im JSON-Format
> konvertieren.

Die nachfolgende Abbildung zeigt das Bild, welches Sie im Browser sehen,
wenn Sie die HTML-Datei des vorausgehenden Beispiels im Browser öffnen.

![Ein Marker auf einer Leaflet Karte, der seinen eigenen - ins GeoJSON Format konvertieren - Programmcode zeigt.](/images/960.png)

Sie werden nun sicher mein Beispiel als umständlich ansehen.
Ich habe einen Marker, denn ich ohne zusätzliche Schritte auf der Karten hätte
anzeigen könnte, vorher umgewandelt dann in umgewandelter Form zur
Karte hinzugefügt. Diese Vorgehensweise ist nicht Sinn und Zweck der Leaflet
Methode `toGeoJSON()`. Sinn und Zweck ist es eher, Daten
der Karte zum Export anzubieten.

> Wenn Sie möchten, dass die Methode `toGeoJSON()` Eigenschaften zu
> Ihren eigenen Leaflet Objekten exportiert, müssen Sie diese
> in einer bestimmten Form mit Ihrem Leaflet Objekt speichern. Möchten
> Sie beispielsweise ein `Polyline` Objekt exportieren, dann müssen
> Sie mit diesem Polyline-Objekt eine Variable `feature` speichern.
> Die Variablen `feature` enthält den Text Feature in der Variablen `type` und
> die zu exportierenden Eigenschaften in der Variablen `properties`.  
> `var polyline = L.polyline([`  
> `[50.27264, 7.26469], [51.27264, 7.26469], [51.27264, 6.26469]`  
> `]);`  
> `polyline.`**`feature`**`= {};`  
> `polyline.`**`feature.type`**`= "Feature";`  
> `polyline.`**`feature.properties`**`= {};`  
> `polyline.feature.properties["Foo"] = "Bar";`  
> Der Export des Polyline Objektes würde wie folgt aussehen:  
> `{"type":"FeatureCollection",`  
> `"features":[`  
> `{`  
> `"type":"Feature",`  
> `"properties":{"Foo":"Bar"}`  
> `"geometry":{"type":"LineString",`  
> `"coordinates":[[7.26469,50.27264],[7.26469,51.27264],[6.26469,51.27264]]`  
> `}}`  
> `]`  
> `}`

### Stylen

Ein GeoJSON Layer biete Ihnen mit der
[Methode `setStyle()`](https://leafletjs.com/reference.html#geojson-setstyle)[^https://leafletjs.com/reference.html#geojson-setstyle]
die Möglichkeit das Aussehen der Kartenschicht zu gestalten.

Sie können neben den hier beschriebenen Optionen auf eine große Auswahl weiterer Stil Optionen zugreifen. Die vollständige Liste finden Sie in der
Dokumentation von Leaflet. Sehen Sie sich dazu die Optionen zur [Klasse `Path`](http://leafletjs.com/reference.html#path)[^http://leafletjs.com/reference.html#path] an.

#### Beim Erstellen eines GeoJSON Layer einen Stil mitgeben

Der nachfolgende Programmcode zeigt Ihnen, wie Sie
Stylesheets beim Erstellen eines GeoJSON Layer als Parameter mitgeben können.
Im nachfolgenden Programmcode finden Sie eine Funktion,
die je nach GeoJSON Objekt eine andere Farbe zurück gibt.
Wenn es sich um den Typ LineString handelt,
gibt die Funktion die Farbe Rot zurück, falls ein Polygon vorliegt,
antwortet die Funktion mit der Farbe Violett.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version2_2021/2/index_970.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px;" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([49.3264, 7.26469], 6)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      function styleFunction(feature) {
        switch (feature.geometry.type) {
          case 'LineString':
            return { color: 'red' }
          case 'Polygon':
            return { color: 'purple' }
        }
      }
      var geojsonFeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [7, 50] },
            properties: { prop0: 'value0' },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [7, 50],
                [7, 51],
                [6, 51],
                [6, 52],
              ],
            },
            properties: { prop0: 'value0', prop1: 0.0 },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [6, 49],
                  [5, 49],
                  [5, 48],
                  [4, 49],
                  [4, 50],
                ],
              ],
            },
            properties: { prop0: 'value0', prop1: { this: 'that' } },
          },
        ],
      }
      //var geoJsonLayer = L.geoJson(geojsonFeatureCollection,{color: "purple"}).addTo(mymap);
      var geoJsonLayer = L.geoJson(geojsonFeatureCollection, {
        style: styleFunction,
      }).addTo(mymap)
    </script>
  </body>
</html>
```

<!--index_970.html-->

> Wenn Sie einen Stil auf alle Objekte > anwenden möchten, dann ist es nicht notwendig eine Funktion zu erstellen. Die Zeile `var geoJsonLayer = L.geoJson(geojsonFeatureCollection,{color: "purple"}).addTo(mymap);` reicht völlig aus.

Auf der Karte sehen Sie nun die Objekte in der für sie bestimmten Farbe.

![Drei Element auf einer Karte in unterschiedlichen Farben mithilfe der Option `style`.](/images/959.png)

##### Praxisbeispiel

In der Regel werden CSS-Stile verwendet, um in GeoJSON

- Punkte,
- Linien und
- Polygone
  mit
- Farbe,
- Dicke, und
- Sichtbarkeit
  zu stylen.

Ein Beispiel zeigt der nachfolgende Ausschnitt aus einer GeoJSON-Datei.

```js
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "stroke": "#000000",
        "stroke-width": 1.3,
        "stroke-opacity": 1,
        "fill": "#00ff1e",
        "fill-opacity": 0.1
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
...
...
```

Wir müssen für die Verwendung in Leaflet `stroke`, `stroke-width`, `stroke-opacity`, `fill` und `fill-opacity` in die CSS-Eigenschaften `color`, `weight`, `opacity`, `fillColor` und `fillOpacity` umwandeln. Eine mögliche Umsetzung zeigt der nachfolgende Codeausschnitt.

```js
...
...
function areaStyle(feature){
  return {
    fillColor: getAreaFill(feature),
    color: getAreaStroke(feature),
    weight: getAreaStrokeWidth(feature),
    opacity: getAreaStrokeOpacity(feature),
    fillOpacity: getAreaFillOpacity(feature)
  }
};
function getAreaFill(feature){
  if (feature.properties.fill) {
    return feature.properties.fill;
  } else {
    return 'blue';
  }
};
function getAreaStroke(feature){
  if (feature.properties.stroke) {
    return feature.properties.stroke;
  } else {
    return 'blue';
  }
};
function getAreaStrokeWidth(feature){
  if (feature.properties["stroke-width"]) {
    return feature.properties["stroke-width"];
  } else {
    return 2;
  }
};
function getAreaStrokeOpacity(feature){
  if (feature.properties["stroke-opacity"]) {
    return feature.properties["stroke-opacity"];
  } else {
    return 1;
  }
};
function getAreaFillOpacity(feature){
  if (feature.properties["fill-opacity"]) {
    return feature.properties["fill-opacity"];
  } else {
    return 0.7;
  }
};
...
...
L.geoJSON(geojsonText, {style: areaStyle}).addTo(mymap);
...
...
```

> https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Working_with_Objects

#### Ein komplexeres Beispiel: Eine andere Farbe beim Überrollen mit der Maus

Im vorherigen Kapitel haben Sie gelernt, wie Sie mit der Option
`style` des GeoJSON Layers ein Aussehen festlegen können.
Sicherlich ändert sich das Aussehen Ihrer Objekte im Laufe der Zeit.
Ganz häufig kommt es vor, dass man Objekte, die anklickbar sind und angeklickt
wurden, als schon besucht kennzeichnen möchte. Oder Sie möchten ein Objekt,
über dem sich die Maus gerade befindet, hervorheben.
Genau diese beiden Anwendungsfälle sind Thema im nachfolgenden Beispielcode.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version2_2021/2/index_969.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px;" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([49.27264, 7.26469], 6)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      function styleFunction(feature) {
        switch (feature.geometry.type) {
          case 'LineString':
            return { color: 'red' }
          case 'Polygon':
            return { color: 'purple' }
        }
      }
      var geojsonFeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [7, 50] },
            properties: { prop0: 'value0' },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [7, 50],
                [7, 51],
                [6, 51],
                [6, 52],
              ],
            },
            properties: { prop0: 'value0', prop1: 0.0 },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [6, 49],
                  [5, 49],
                  [5, 48],
                  [4, 49],
                  [4, 50],
                ],
              ],
            },
            properties: { prop0: 'value0', prop1: { this: 'that' } },
          },
        ],
      }
      var geoJsonLayer = L.geoJson(geojsonFeatureCollection, {
        style: styleFunction,
      }).addTo(mymap)
      geoJsonLayer.on('mouseover', styleWhenMouseOver)
      geoJsonLayer.on('mouseout', styleWhenMouseOut)
      function styleWhenMouseOver(e) {
        geoJsonLayer.setStyle({ color: 'green' })
      }
      function styleWhenMouseOut(e) {
        //geoJsonLayer.setStyle({color:"gray"});
        geoJsonLayer.eachLayer(function (layer) {
          geoJsonLayer.resetStyle(layer)
        })
      }
    </script>
  </body>
</html>
```

<!--index_969.html-->

Auf den ersten Blick hat sich im Vergleich zum vorherigen Beispiel nichts geändert.
Wenn Sie allerdings die Maus über ein Objekt bewegen, sehen Sie eine Änderung.
Das Polygon und die Linie verfärben sich nun grün.
Der Marker kann seine Farbe nicht ändern.
Im Grunde genommen handelt sich bei dem Marker um ein Image.
Das HTML-Element Image verfügt nicht über die CSS Eigenschaft `color`.
Wenn Sie das Aussehen des Markers ändern möchten,
dann müssten Sie diesem eine andere Bilddatei zuordnen.

![Drei Element auf einer Karte die sich grün färben, wenn man die Maus über sie bewegt.](/images/958.png)

Wenn Sie ein schon angeklicktes Element
mit der Farbe Grau einfärben möchten, dann könnten Sie dies über
die Funktion

```
function styleWhenMouseOut(e){
geoJsonLayer.setStyle({color:"gray"});
});
}
```

anstelle von

```
function styleWhenMouseOut(e){
geoJsonLayer.eachLayer(function (layer) {
geoJsonLayer.resetStyle(layer);
});
}
```

erreichen.

> **Achtung:**  
> Wenn Sie  
> `function styleWhenMouseOut(e){`  
> `geoJsonLayer.eachLayer(function (layer) {`  
> `geoJsonLayer.resetStyle(layer);`  
> `});`  
> `}`  
> anstelle von  
> `geoJsonLayer.on('mouseout',function(e){`  
> `geoJsonLayer.resetStyle(e.layer);`  
> `});`  
> schreiben würden, würde nur ein Layer – nämlich der, der gerade
> überrollt wird – geändert.

### Iterieren

Interessant werden Karten, wenn Sie viele Informationen bieten. Eine Karte mit vielen Informationen setzt die Arbeit mit vielen Daten für den Kartenersteller voraus. Und, beim Arbeiten mit vielen Daten werden Sie die Möglichkeit, alle Features mit einem Schlag zu bearbeiten, zu schätzen lernen. Iterieren können sie in Leaflet durch GeoJSON Objekte mithilfe der [Methode `onEachFeature()`](http://leafletjs.com/reference.html#geojson-oneachfeature).

#### OnEachFeature() – Bearbeite jedes Feature

[`onEachFeature()`](http://leafletjs.com/reference.html#geojson-oneachfeature)[^http://leafletjs.com/reference.html#geojson-oneachfeature]
ist eine Methode, die einmal für jedes im Layer vorhandene GeoJSON Objekt
vom Typ Feature aufgerufen wird.
Nützlich ist diese Option zum Anhängen von Ereignissen oder Pop-up Fenstern
an jedes Feature Objekt.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version2_2021/2/index_968.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px;" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 7)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var geojsonFeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [6, 50] },
            properties: { name: 'Dorf 1' },
          },
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [7, 50] },
            properties: { name: 'Dorf 2' },
          },
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [7, 51] },
            properties: { name: 'Dorf 3' },
          },
        ],
      }
      L.geoJson(geojsonFeatureCollection, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.name)
        },
      }).addTo(mymap)
    </script>
  </body>
</html>
```

<!--index_968.html-->

Der vorhergehende Programmcode zeigt Ihnen, wie Sie jedem Feature Objekt,
das über die hart kodiert eingefügten GeoJSON Daten eingelesen wird,
ein Pop-up anhängen können – und zwar jedem ein individuelles.
Der Text für das Pop-up wird aus den GeoJSON Daten ausgelesen,
er versteckt sich in der Eigenschaft `feature.properties.name`.

Das nachfolgende Bild stellt die drei Marker dar.

![Drei Marker mit individuellem Pop-up Text.](/images/957.png)

Nun würden wir dem Marker vielleicht auch gerne ein spezielles Aussehen geben.
Vielleicht möchten Sie sogar jeden Marker unterschiedlich gestalten.
`onEachFeature()` bietet Ihnen hierzu keine Möglichkeit.
Der Marker wird automatisch mit Standardwerten erstellt.
Leaflet wäre nicht Leaflet, wenn es hierfür keine Lösung hätte.
Leaflet bietet Ihnen eine andere Methode für diesen Zweck an.
Die [Methode heißt `pointtoLayer()`](https://leafletjs.com/reference.html#geojson-pointtolayer) und ein Beispiel dazu,
wie Sie mit dieser Methode einen eigenen Marker erstellen und mit individuellen Optionen versehen können, finden Sie im nächsten Kapitel.

#### PointToLayer – Punkt zu Ebene

Die [Methode `pointtoLayer()`](https://leafletjs.com/reference.html#geojson-pointtolayer)[^https://leafletjs.com/reference.html#geojson-pointtolayer],
die wir uns in diesem Kapitel ansehen, ist spezielle für die Arbeit mit einem GeoJSON Objekten vom Typ `Point` gemacht. Dieses Objekt ist das GeoJSON Pendant zum Leaflet-Marker. Wenn wir einen Point beim Erstellen des GeoJSON Layers als Parameter übergeben, dann wird ein Standard Marker erstellt.
Wollen wir diesen Marker individuell gestalten, dann brauchten wir entweder einen Variablennamen, den wir ansprechen können, oder wir müssen den Marker selbst instanziieren.
Für das Instanziieren brauchen wir eine Position oder einen Point.
Und nun schließt sich der Kreis. Die Option `pointtoLayer` gibt uns Zugriff
auf die Koordinaten. Sehen Sie sich das nächste Beispiel an.
Ein Beispiel erklärt oft mehr als viele Worte.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version2_2021/2/index_967.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px;" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 7)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var geojsonFeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [6, 50] },
            properties: { name: 'Dorf 1' },
          },
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [7, 50] },
            properties: { name: 'Dorf 2' },
          },
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [7, 51] },
            properties: { name: 'Dorf 3' },
          },
        ],
      }
      var options_draggable = {
        draggable: true,
        title: 'Ein Ort in der Nähe von Gering',
      }
      var options_notdraggable = {
        draggable: false,
        title: 'Ein Ort in der Nähe von Gering',
      }
      L.geoJson(geojsonFeatureCollection, {
        pointToLayer: function (feature, latlng) {
          switch (feature.properties.name) {
            case 'Dorf 1':
              return L.marker(latlng, options_draggable).bindPopup(
                feature.properties.name
              )
            case 'Dorf 2':
              return L.marker(latlng, options_notdraggable).bindPopup(
                feature.properties.name
              )
            case 'Dorf 3':
              return L.marker(latlng, options_notdraggable).bindPopup(
                feature.properties.name
              )
          }
        },
      }).addTo(mymap)
    </script>
  </body>
</html>
```

<!--index_967.html-->

Im vorhergehenden Programmcodebeispiel sehen Sie,
wie ein Marker erstellt und mit einem individuellen Pop-up Text versehen wird.
Das Ergebnis ist auf den ersten Blick genau das Gleiche,
wie im vorhergehenden Kapitel.
Welcher Pop-up Text dem Marker genau zugewiesen wird,
ist in dem Beispiel auch von der Eigenschaft `feature.properties.name` abhängig.
Zusätzlich werden in diesem Beispiel Optionen von dem Namen abhängig gemacht.
Nur der Marker von Dorf 1 kann auf der Karte verschoben werden.
Der größte Unterschied ist, dass wir den Marker hier selbst erstellen
und deshalb Einfluss auf die Optionen haben.

Sehen Sie sich die Karte, die Sie in der folgenden Abbildung sehen,
in Ihrem Browser an.
Auf den ersten Blick hat sich nichts zu dem Beispiel des vorherigen Kapitels geändert.
Auf den zweiten Blick werden Sie feststellen, dass Sie nur den Marker von
Dorf 1 auf der Karte verschieben können.

![Drei Marker auf einer Karte. Sie können nur einen Marker mit der Maus bewegen.](/images/956.png)

#### Filtern mit der Option filter

Mithilfe der Option `filter` können Sie große Datenbestände auf das
Wesentliche beschränken. Sehen Sie sich dies _im Kleinen_ im nächsten Beispiel an.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version2_2021/2/index_966.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px;" id="mapid"></div>
    <script>
      var mymap = L.map('mapid').setView([50.27264, 7.26469], 7)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var geojsonFeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [6, 50] },
            properties: { name: 'Dorf 1' },
          },
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [7, 50] },
            properties: { name: 'Dorf 2' },
          },
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [7, 51] },
            properties: { name: 'Dorf 3' },
          },
        ],
      }
      var options = {
        draggable: true,
        title: 'Ein Ort in der Nähe von Gering',
      }
      L.geoJson(geojsonFeatureCollection, {
        filter: function (feature, latlng) {
          switch (feature.properties.name) {
            case 'Dorf 1':
              return true
            default:
              return false
          }
        },
      }).addTo(mymap)
    </script>
  </body>
</html>
```

<!--index_966.html-->

Im Beispiel sehen Sie, dass auf einem GeoJSON Layer nur die Elemente angezeigt werden,
deren Rückgabewert beim Filtern positiv oder `true` ist. Im Beispiel bedeutet dies genau,
das nur die Marker angezeigt werden, bei den
`feature.properties.name` gleich `Dorf 1` ist. Nur hier wird, wegen  
`case "Dorf 1": return true` ein positiver Wert, also `true`, zurück gegeben.
Ansonsten, ist die Ausgabe der Filterfunktion wegen `default: return false;` gleich `false`.

Die nachfolgende Abbildung zeigt es Ihnen: Nur Dorf 1 wird angezeigt.
Die beiden anderen Orte, die sich in den GeoJSON Daten befinden,
werden heraus gefiltert. Sie sehen nur einen Marker.

![Nur ein Marker wird angezeigt! Alle anderen Marker werden herausgefiltert.](/images/955.png)

## In diesem Kapitel haben wir …

In diesem Kapitel haben wir uns das Format GeoJSON genau angesehen. Wir haben die GeoJSON Typen mit den Objekten, die wir mit Leaflet erstellen können, verglichen. Außerdem haben wir viele der Methoden und Optionen, die Leaflet zum Arbeiten mit GeoJSON bietet, angewandt. Wir können nun eine Karte mit Daten füllen! Im nächsten Kapitel sehen wir uns an, wie wir mit den Daten auch

- Aussagen treffen oder
- Fragen beantworten

können.
