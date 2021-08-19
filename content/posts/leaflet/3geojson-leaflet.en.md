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

The next chapter is about the format [GeoJson](https://de.wikipedia.org/w/index.php?title=GeoJSON)[^de.wikipedia.org/w/index.php?title=geojson] and how to handle data well even in large quantities.

GeoJSON is an open format that makes it easy to describe geographic data. It follows a specification - namely the [Simple Feature Access Specification](https://de.wikipedia.org/w/index.php?title=Simple_Feature_Access)[^de.wikipedia.org/w/index.php?title=simple_feature_access]. For the description of the geodata GeoJSON uses
uses the [JavaScript Object Notation (JSON)](https://en.wikipedia.org/w/index.php?title=JSON)[^en.wikipedia.org/wiki/json].

> The term _Simple Feature Access Specification_ hides a specification of the [Open Geospatial Consortium (OGC)](https://de.wikipedia.org/w/index.php?title=Open_Geospatial_Consortium)[^de.wikipedia.org/w/index.php?title=open_geospatial_consortium]. This specification contains a generally valid description for geodata and their geometries. The fact that the specification is universally valid means that this data can be exchanged easily. The OGC is a non-profit organisation that aims to develop universally valid standards for geodata.

## In this chapter we will …

First, we look at why GeoJSON was developed. Next, we compare the individual GeoJSON elements with the objects that the Leaflet provides. And last but not least, we try out the methods Leaflet offers us specifically for processing GeoJSON data.

## The history of GeoJSON

[GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) builds on [JSON](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)[^de.wikipedia.org/w/index.php?title=javascript_object_notation]. Before JSON was specified as a data format, there was the extensible markup language [XML](https://en.wikipedia.org/w/index.php?title=XML)[^en.wikipedia.org/w/index.php?title=xml].

Whenever something new is created, there is a reason for it!

XML was [published in 1998](https://www.w3.org/TR/1998/REC-xml-19980210)[^www.w3.org/tr/1998/rec-xml-19980210] in order to be able to exchange data between machines without humans having to rework it. This became more and more important in times of the internet. Now there must also be a reason why JSON and GeoJSON why JSON and GeoJSON came into being.

### Why did the GeoJSON format come into being?

Why did the GeoJSON format come into being? Obviously there were things where XML was not optimal for the exchange of data. Why was this the case and what advantages does JSON, or GeoJSON, offer? First of all, all three formats offer the following:

- All three formats can be read and understood by a human.
- All three formats are hierarchically structured. This means that values can be represented within other values.
- All three formats are relatively easy to learn.
- All three formats can be analysed and used by many programming languages.
- All three formats can be exchanged with the help of the Hypertext Transfer Protocol (HTTP) - i.e. via the Internet.

Let's take a closer look at the individual formats in this chapter to see what advantages the JSON format - when working with
[Geodata](https://de.wikipedia.org/wiki/Geodaten)[^en.wikipedia.org/wiki/geodata] the format GeoJSON - compared to XML.

#### XML

XML describes the structure of data.
By means of the _tags_, the data is given a meaning - a [semantics](https://de.wikipedia.org/wiki/Semantik)[^en.wikipedia.org/wiki/semantics].
Due to the tag system of XML, small data sets often become bloated and thus confusing. In addition, addressing individual tags in an XML file is sometimes quite complicated.

#### JSON

JSON is basically nothing more than the specification of a certain syntax -- i.e. a _syntax convention_. No particular meaning is given to the data, rather it is a matter of syntactic arrangement. Since JSON structures data, objects can easily be defined from that data. JSON is under continuous development. In December 1999, the first JSON format specification was adopted. Currently it is specified by two competing standards, [RFC 8259](https://tools.ietf.org/html/rfc8259)[^tools.ietf.org/html/rfc8259] and [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf)[^ecma-international.org/publications/files/ecma-st/ecma-404.pdf].

The big advantage of JSON compared to XML is its ease of use. Since JSON itself represents valid Javascript, it can be executed directly and thus converted into a Javascript object. The individual properties of these objects can then be accessed via the attributes. In the chapter _Heatmaps in Leaflet - Density_ we will include a file containing GeoJSON objects as a script. Just by including the file, we can access the GeoJSON objects of the included file within other scripts. In contrast, an XML file must first be parsed with an XML parser.

Another advantage of JSON: There is no end tag in JSON. This is the main reason why JSON is more compact. The result is that JSON can be read and processed more quickly.

> The data of any GeoJson file located in a GitHub repository is automatically displayed on an interactive map when the file is clicked in the repository. [Github](https://github.com/blog/1528-there-s-a-map-for-that) has been creating these maps with Leaflet since 2013. You can see this in the repository [world.geo.json](https://github.com/astridx/world.geo.json/blob/master/countries.geo.json)[^github.com/astridx/world.geo.json/blob/master/countries.geo.json] for example.

Even a small example illustrates that XML requires more characters than JSON to describe the same object. An object encoded in XML with 95 characters requires just 73 characters in JSON. This difference is negligible for one object. As a rule, a large number of objects are described digitally. With a large number of objects, this difference can be very significant.

Here you can see the XML excerpt consisting of 95 characters.

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

#### And why after JSON now also GeoJSON?

Geodata could be described and processed in JSON. What is the advantage of the special **Geo**JSON format? GeoJSON is JSON - but specialised for geodata. GeoJSON gives the geodata semantics again - i.e. a meaning. Now you are probably wondering what this back and forth is all about. Does it make sense? Yes, it makes sense: GeoJSON only picks out the positive properties of the JSON and XML formats.

GeoJSON describes points, lines and polygons and does well with these shapes in a coordinate system. In the previous chapter we saw that working with geodata is basically no different. GeoJSON has become a very popular data format for many geospatial information systems. In this book I mention GeoJSON specifically because Leaflet is also very good at handling data in GeoJSON format. Here we will first take a closer look at GeoJSON objects. If you'd rather get practical right away, it's best to scroll one chapter further. In the chapter _GeoJSON in Leaflet_ you will learn how to display and edit GeoJSON elements on your map.
edit them.

To put it in perspective: GoeJSON is still quite young.

- In June 2008, the first GeoJSON format specification was adopted.
- In August 2016, the [RFC (Requests for Comments) 7946](http://geojson.org/)[^geojson.org/] was published.

> The formal specification of the GeoJSON format can be found on the internet at [https://tools.ietf.org/html/rfc7946](https://tools.ietf.org/html/rfc7946).

### Exploring GeoJSON

You now know that GeoJSON allows you to encode many geographic data structures in a machine-readable language. A GeoJSON object can represent a simple geometry, for example a point, a line or a polygon. In addition, you can give a geometry a meaning. You can assign properties to each element. For example, you can give a line the property 'type=street' or 'name=church street'. In this case you create a GeoJSON object of type [Feature](https://tools.ietf.org/html/rfc7946#section-3.2)[^tools.ietf.org/html/rfc7946#section-3.2]. If you want to combine several feature objects into a group, you can combine them into a collection of features. For this, there is the GeoJSON type [FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)[^tools.ietf.org/html/rfc7946#section-3.3]. Understanding these concepts brings many benefits. It also helps you to understand how to work with geodata in general. This is because the basic concepts applied in GeoJSON have been a part of [geoinformation systems](https://de.wikipedia.org/wiki/Geoinformationssystem)[^en.wikipedia.org/wiki/geoinformation-system] for many years.

Let's start from the beginning.

#### A geometry

