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

In the last chapter you learned about points, markers, lines and polygons. You can now draw these on a leaflet map and know when which object is the right one. You can distinguish [layer groups](https://leafletjs.com/reference.html#layergroup)[^leafletjs.com/reference.html#layergroup] and [feature groups](https://leafletjs.com/reference.html#featuregroup)[^leafletjs.com/reference.html#featuregroup] from each other and you know what to look for when displaying a leaflet map on a small display. In addition, you can now react appropriately to a mouse click or other event.

The next chapter is about the format [GeoJson](https://en.wikipedia.org/wiki/GeoJSON)[^en.wikipedia.org/wiki/geojson] and how to handle data well even in large quantities.

GeoJSON is an open format that makes it easy to describe geographic data. It follows a specification - namely the [Simple Feature Access Specification](https://en.wikipedia.org/wiki/Simple_Features)[^en.wikipedia.org/wiki/simple_features]. For the description of the geodata GeoJSON uses the [JavaScript Object Notation (JSON)](https://en.wikipedia.org/wiki/JSON)[^en.wikipedia.org/wiki/json].

> The term _Simple Feature Access Specification_ hides a specification of the [Open Geospatial Consortium (OGC)](https://de.wikipedia.org/w/index.php?title=Open_Geospatial_Consortium)[^de.wikipedia.org/w/index.php?title=open_geospatial_consortium]. This specification contains a generally valid description for geodata and their geometries. The fact that the specification is universally valid means that this data can be exchanged easily. The OGC is a non-profit organisation that aims to develop universally valid standards for geodata.

## In this chapter we will …

First, we look at why GeoJSON was built. Then we compare the individual GeoJSON elements with the objects Leaflet provides. And last but not least, we try out the methods Leaflet provides specifically for processing GeoJSON data.

## The history of GeoJSON

[GeoJSON](https://de.wikipedia.org/wiki/GeoJSON)[^en.wikipedia.org/wiki/geojson] extended [JSON](https://en.wikipedia.org/wiki/JSON)[^en.wikipedia.org/wiki/json]. Before JSON was established as a data format, there was the extensible markup language [XML](https://en.wikipedia.org/wiki/XML)[^en.wikipedia.org/wiki/xml].

Whenever something new is created, there is a reason for it!

XML was [published in 1998](https://www.w3.org/TR/1998/REC-xml-19980210)[^www.w3.org/tr/1998/rec-xml-19980210] to allow data to be exchanged between machines without the need for post-processing by humans. This became more and more important in times of the internet. Why did JSON - and later GeoJSON - arise besides XML?

### Why was the GeoJSON format introduced?

What was the motivation for the development of the GeoJSON format? Obviously, there were situations where XML was not optimal for data exchange. Why is this the case, and what are the advantages of JSON or GeoJSON? First of all, all three formats offer the following:

- All three formats can be read and understood by a human.
- All three formats are hierarchically structured. This means that values can be represented within other values.
- All three formats are relatively easy to learn.
- All three formats can be analyzed and used by many programming languages.
- All three formats are interchangeable over the Hypertext Transfer Protocol (HTTP), i.e., via the Internet.

Let's take a closer look at each format in this chapter to see what advantages the JSON format has over XML and what possibilities the GeoJSON format offers when working with [geodata](https://en.wikipedia.org/wiki/Geographic_data_and_information)[^en.wikipedia.org/wiki/geographic_data_and_information].

#### XML

XML describes the structure of data. With the help of _tags_ a meaning is given to the data - a [semantics](https://en.wikipedia.org/wiki/Semantics)[^en.wikipedia.org/wiki/semantics]. Because of XML's tag system, small data sets often become blown up and thus confusing. In addition, the addressing of individual tags in an XML file is sometimes quite complicated.

#### JSON

JSON is basically nothing more than the specification of a [syntax](https://en.wikipedia.org/wiki/Syntax)[^en.wikipedia.org/wiki/syntax]. No meaning is given to the data, rather it is a pure syntactic structure. Because JSON structures data, objects can be easily defined from that data. JSON is under constant development. In December 1999, the first JSON format specification was adopted. Currently, there are two different but similar standards in terms of content, [[RFC 8259](https://tools.ietf.org/pdf/rfc8259.pdf)[^tools.ietf.org/pdf/rfc8259.pdf] and [ECMA-404](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/)[^ecma-international.org/publications-and-standards/standards/ecma-404].

The main advantage of JSON over XML is its ease of use. Since JSON represents valid JavaScript by itself, it can be called directly and thus converted into a JavaScript object. The individual properties of these objects are accessed via the attributes. In the next chapter, we will include a file containing GeoJSON objects. Just by including it, it is possible to access the GeoJSON objects inside. In comparison, an XML file must first be parsed with an XML parser! Another advantage of JSON is that no end tag is required. Mainly for this reason JSON is more compact and is read and executed faster.

> Data from a GeoJSON file located in a GitHub repository is automatically displayed on an interactive map when the file is clicked in the repository. [Github](https://github.com/blog/1528-there-s-a-map-for-that)[^https://github.com/blog/1528-there-s-a-map-for-that] creates these maps using Leaflet. For example, check out the [world.geo.json](https://github.com/astridx/world.geo.json/blob/master/countries.geo.json)[^github.com/astridx/world.geo.json/blob/master/countries.geo.json] repository to see for yourself.

A small example illustrates that XML requires more characters than JSON to describe the same object. An object encoded with 95 characters in XML requires 73 characters in JSON. For one object, this difference is marginal. Usually, a large number of objects are represented digitally. For a large number of objects, this difference can be very important. In the following, you will first see the XML snippet which consists of 95 characters.

```xml
<joomlers>
  <number>1721</number>
  <vorname>Astrid</vorname>
  <nachname>Günther</nachname>
</joomlers>
```

The same object can be described with 73 characters in JSON format.

```js
„joomlers“: {
„number“: „1721“,
„vorname“: „Astrid“,
„nachname“: „Günther“
},
```

#### And why after JSON even GeoJSON?

Geodata could be described and processed in JSON. What is the advantage of the special _Geo_-JSON format? GeoJSON is JSON - but optimized for geodata. GeoJSON gives the geodata semantics once again - i.e. a meaning. Now you are probably wondering what this back and forth is all about. Does it make sense? Yes, it makes sense: GeoJSON only picks out the positive features of the JSON and XML formats.

GeoJSON describes points, lines, and polygons and does well with these shapes in a coordinate system. In the previous chapter we saw that working with geodata is basically nothing different. GeoJSON has become a very popular data format for many geospatial information systems. In this book, I mention GeoJSON specifically because Leaflet is also very good at handling data in GeoJSON format. Here, we'll start by taking a closer look at GeoJSON objects. If you'd prefer to get practical right away, it's best to keep scrolling. In the next part, you will learn how to display and edit GeoJSON elements on your map.

To put it in time chronology: GeoJSON is still quite young:

- In June 2008, the first GeoJSON format specification was announced.
- In August 2016, the [RFC (Requests for Comments) 7946](http://geojson.org/)[^geojson.org] was published.

> The formal specification of the GeoJSON format can be found at [https://tools.ietf.org/html/rfc7946](https://tools.ietf.org/html/rfc7946)[^tools.ietf.org/html/rfc7946] online.

### Explore GeoJSON

You now know that you can use GeoJSON to encode many geographic data structures in a machine-readable language. A GeoJSON object can represent a simple geometry, for example a point, a line or a polygon. In addition, you can give a geometry a meaning. You can assign properties to each element. For example, you can give a line the property 'type=street' or 'name=church street'. In this case, you create a GeoJSON object of type [Feature](https://tools.ietf.org/html/rfc7946#section-3.2)[^tools.ietf.org/html/rfc7946#section-3.2]. If you want to group multiple feature objects together, you can group them into a collection of features. For this, there is a GeoJSON type called [FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)[^tools.ietf.org/html/rfc7946#section-3.3]. Understanding these concepts has many advantages. It also helps you understand how to work with geospatial data in general. This is because the basic concepts applied in GeoJSON have been a part of [geoinformation systems](https://en.wikipedia.org/wiki/Geographic_information_system)[^en.wikipedia.org/wiki/geographic_information_system] for many years.

Let's start from the beginning:

#### A geometry

A [geometry](https://en.wikipedia.org/wiki/GeoJSON#Geometries)[^en.wikipedia.org/wiki/geojson#geometries] is a shape. All shapes in GeoJSON are described using one or more coordinates. A coordinate is called _position_ in GeoJSON.

GeoJSON does support the geometry types

1. Point,
2. LineString,
3. Polygon,
4. MultiPoint,
5. MultiLineString, und
6. MultiPolygon

– and each of these geometry types contains positions.

##### Positions

The most important element when working with geodata is the definition of the point on the Earth. The point on the earth is the one to which the geodata is assigned. We know this data also under the name coordinate. In the chapter about the coordinate system I have already written quite a lot about coordinates on the earth. Here again briefly: A coordinate is a number combination. Each number of a coordinate is for a dimension. We'll limit ourselves to two dimensions in this book, namely the geographic longitude and the geographic latitude. GeoJSON supports three dimensions - in addition to longitude and latitude, you can also specify the Elevation on Earth.

> With the [global navigation satellite system (GPS)](https://wiki.openstreetmap.org/w/index.php?title=DE:Genauigkeit_von_GPS-Daten)[^wiki.openstreetmap.org/w/index.php?title=de:genauigkeit_von_gps-daten] a fourth dimension is relevant. Besides longitude, latitude and altitude, the time matters.

The coordinates are formatted in GeoJSON in decimal format. The first number is the geographical longitude and the second number is the geographical latitude. Concretely, a position in GeoJSON looks like this:

```js
;[longitude, latitude, altitude]
```

or

```js
;[50.254, 7.5847, 324.1]
```
<img src="https://vg07.met.vgwort.de/na/7bbe8e9e57fa47bab5021a13965b0ee7" width="1" height="1" alt="">
