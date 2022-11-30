---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-09-21
title: 'Welcome'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: en/willkommen-leaflet
langKey: en
categories:
  - Leaflet English
tags:
  - geografische Daten
  - Leaflet
---

Working with geodata and digital maps has become increasingly relevant thanks to the [global positioning system GPS](https://en.wikipedia.org/wiki/Global_Positioning_System)[^en.wikipedia.org/wiki/global_positioning_system]. Many applications now offer real-time geographic information online. Thus, you will find more and more digital maps and applications that work with geodata on the Internet as well.

> [Geodata](https://en.wikipedia.org/wiki/Geographic_data_and_information)[^en.wikipedia.org/wiki/geographic_data_and_information] is information that has an mapping to a spatial location. Almost all data can be assigned to a location and are therefore geodata.

You are certainly reading this book because you are considering offering a digital map - most likely on a website. The basics of what I have written in this book can all be found in the [documentation for Leaflet](https://leafletjs.com/reference)[^leafletjs.com/reference] or for the respective plugins publicly on the Internet. I have linked these documentations here in the book. Why did I write this book anyway? I wrote the book because I like to learn with examples. Often I get ideas that dry documentations don't give. Maybe you feel the same way and this book will add value to the existing documentation. The source code files for the examples used in the book can be found on the website [https://github.com/astridx/leaflet_beispieldateien_zum_Buch/](github.com/astridx/leaflet_example_files_for_book/).

Also, I always find it very helpful to think outside the box. You'll find a few such outside-the-box looks here in the book. If you're interested, you can look a little deeper into the world of geographic coordinates with me. I'll also explain the different techniques in creating the graphics for the digital maps. I'll also take a closer look with you at GeoJSON, beyond just its pure use. I'll show you how to add a personal touch to the map with custom markers. Besides these basic elements, the visualization of the data with heatmaps, geocoding and routing are not missed out.

## Important things about the book

I explain here step by step everything I consider important around Leaflet - that is, everything you need as a developer to be able to work creatively.

I hope you like my way of writing. Personally, I would have liked to have this very same book to get started with Leaflet.

## What is Leaflet?

[Leaflet](https://leafletjs.com/reference) is an open source [JavaScript library](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)[^https://de.wikipedia.org/w/index.php?title=javascript_object_notation] that makes it easy for you to provide maps on your website. [Open Source](https://en.wikipedia.org/wiki/Open_source)[^en.wikipedia.org/wiki/open_source] means, among other things, that the program code is visible. Anyone with the necessary knowledge can check how exactly the application works. And more importantly, anyone can use Leaflet, adapt it to their needs and improve it.

What do you have to do if you want to use Leaflet on your website? Basically, you only need to include two files - a JavaScript file and the corresponding CSS file. I explain exactly how to do this in the first part of this text.

Including the files gives you access to a number of functions. With the help of these functions you can easily integrate a digital map on your website. Leaflet supports all modern browsers - including mobile versions. This means that you can use your map pretty much anywhere.

Leaflet itself focuses on ease of use and performance. It is also important to the developers of Leaflet that the JavaScript library can be easily extended by other developers with a plugin. The programming interface is very well documented. As an extension programmer, you don't have to reveal any secrets to successfully extend Leaflet with a plugin. This is, in my opinion, one of Leaflet's most significant strengths.

Out-of-the-box, Leaflet lets you display markers, popups, lines and shapes on different layers on your map. You can zoom, calculate distances and push the centre of the map to specific coordinates.

Todo Vorteil in bezug zu vectorkacheln

## Was sollten Sie mitbringen?

Ich gehe davon aus, dass Sie über grundlegende [HTML](https://de.wikipedia.org/w/index.php?title=HTML5)[^https://de.wikipedia.org/w/index.php?title=html5] und [CSS](https://de.wikipedia.org/w/index.php?title=Cascading_Style_Sheets)[^https://de.wikipedia.org/w/index.php?title=cascading_style_sheets] Kenntnisse verfügen. Sie sollten auf alle Fälle wissen, wie Sie CSS und ein [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)-Skript in ein HTML-Dokument einbinden und wie Sie mit einfachen HTML-Elementen arbeiten.

> [CSS](http://www.w3.org/Style/CSS/) ist eine Stylesheet-Sprache für digitale Dokumente. Stylesheet-Sprachen werden verwendet, um Dokumente und Benutzeroberflächen zu gestalten. Dabei ist ein Stylesheet mit einer [Formatvorlage](https://de.wikipedia.org/w/index.php?title=Formatvorlage)[^https://de.wikipedia.org/w/index.php?title=formatvorlage] zu > vergleichen. Grundidee hierbei ist die Trennung von Dateninhalten und Design. Zusammen mit HTML und dem [DOM](https://wiki.selfhtml.org/index.php?title=JavaScript/DOM)[^https://wiki.selfhtml.org/index.php?title=javascript/dom] ist CSS eines der wichtigsten Elemente im Internet. CSS ist ein so genannter lebendiger Standard und wird vom [W3C](https://www.w3.org/)[^www.w3.org/] und dem [WHATWG](https://whatwg.org/)[^whatwg.org] permanent weiterentwickelt.

> [HTML](https://de.wikipedia.org/w/index.php?title=HTML5)[^de.wikipedia.org/w/index.php?title=html5] ist eine textbasierte Auszeichnungssprache zur Strukturierung digitaler Dokumente wie Texte mit Hyperlinks, Bildern und anderen Inhalten. HTML-Dokumente sind die Grundlage des World Wide Web und werden von Webbrowsern dargestellt.

Für das Verständnis der Beispiele sind darüber hinaus grundlegende [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)[^de.wikipedia.org/w/index.php?title=javascript_object_notation] Kenntnisse hilfreich. Für die Entwicklung dynamischer Webseiten ist JavaScript unerlässlich.

> Mit [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)[^de.wikipedia.org/w/index.php?title=javascript_object_notation] lassen sich kleine Hilfsroutinen und auch komplexen Bibliotheken schreiben.

## Is it possible to use Openstreetmap in connection with Leaflet DSGVO compliant without consent.

As a German website owner nowadays it is necessary to deal with the German Data Protection Regulation DSGVO[^dsgvo-gesetz.de/art-1-dsgvo/]. In customer projects I always make clear that I am not a lawyer, but a web programmer, and do not give legal advice. Nevertheless, it is important to me to keep my websites DSGVO-compliant and to refrain from using third-party services, especially if they cache data outside of Europe. I also feel that asking for consent before viewing a website is not user-friendly and am looking for a way to avoid this in a DSGVO compliant way. 

Openstreetmap would be a third party service. Is it possible to use this in conjunction with Leaflet in a DSGVO compliant way without consent, ergo without an upstream `consent tool`? In my research, I keep coming across conflicting information. 

### Do I need a consent tool?

If you use services that require consent from the user, then there are alternatives to consent tools, ergo: to queries upstream of a website. One option is to ask for consent in a targeted way. For example, I like to use the way it is done on pages of _spiegel.de_. A general 'consent tool' is not available. Exclusively before content that requires consent is obtained. I see this as a practicable possibility. A user is shown all essential content without a barrier and at the same time has the option to activate additional information via consent. In our case, the digital map is the additional information. Consent is therefore only required when he requests a page with content in the browser that requires consent.

### Where does the data for Openstreetmap digital maps come from?

There are often misunderstandings regarding the map providers. Openstreetmap.de and Openstreetmap.org are considered to be the same thing. But these are different providers. I consider here the version of the German top-level domain Openstreetmap.de. 

Openstreetmap.de informs about server locations on the website fossgis.de/wiki/IT-Technik. I get to the fossgis.de/wiki/IT-Technik website via openstreetmap.de/faq/#how-can-I-use-the-data, which links to wiki.openstreetmap.org/wiki/FOSSGIS/Server.

If I read that correctly, it is Potsdam and Hetzner Cloud[^docs.hetzner.com/en/cloud/general/locations/#:~:text=Bisher%20betreiben%20wir%20drei%20Datacenter,wir%20derzeit%20kein%20eigenes%20Datacenter] and that is Europe.

In my legal opinion, it is therefore sufficient to include a note in your own privacy policy that the website uses services from OpenStreetMap.de and additionally a reference to the privacy policy there. This is [fossgis.de/datenschutzerklerkl%C3%A4rung](https://fossgis.de/datenschutzerkl%C3%A4rung/). The use of a Consent Tool is not necessary in my eyes. I am not a lawyer and share here solely my lay opinion. 

## Own tile server

From a privacy point of view, it is best to set up your own tile server. This way website visitors will not be redirected to a third party provider. Another alternative is a proxy. With the latter, you control the flow of data without setting up a Tile server yourself. 

For those who only need a limited subset of the world, these options come in handy. Both options involve costs and are usually not worthwhile for small projects. At least if the map contains the whole world. 

<img src="https://vg07.met.vgwort.de/na/fe9162034db2414897f95f2b64e9cb97" width="1" height="1" alt="">
