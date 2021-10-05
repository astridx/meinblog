---
date: 2018-12-12
title: 'Willkommen'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: willkommen-leaflet
langKey: de
categories:
  - Leaflet
tags:
  - geografische Daten
  - Leaflet
---

Die Arbeit mit Geodaten und digitalen Karten hat dank des [globalen Positionierungssystems GPS](https://de.wikipedia.org/w/index.php?title=Global_Positioning_System)[^de.wikipedia.org/w/index.php?title=global_positioning_system] zunehmend an Bedeutung gewonnen. Viele Anwendungen bieten geografische Informationen in Echtzeit online an. So finden Sie im Internet immer mehr digitale Karten und Anwendungen, die mit Geodaten arbeiten.

> [Geodaten](https://de.wikipedia.org/w/index.php?title=Geodaten)[^https://de.wikipedia.org/w/index.php?title=geodaten] sind Informationen, die eine Zuordnung zu einem räumlichen Ort haben. Fast alle Daten lassen sich einem Ort zuordnen und sind daher Geodaten.

Sie lesen dieses Buch sicherlich, weil Sie überlegen, eine digitale Karte anzubieten - wahrscheinlich auf einer Website. Die Grundlagen dessen, was ich in diesem Buch geschrieben habe, finden Sie alle in der [Dokumentation für Leaflet](https://leafletjs.com/reference)[^leafletjs.com/reference] oder für die jeweiligen Plugins öffentlich im Internet. Ich habe diese Dokumentationen hier im Buch verlinkt. Warum habe ich dieses Buch trotzdem geschrieben? Ich habe das Buch geschrieben, weil ich gerne mit Beispielen lerne. Oft kommen mir dabei Ideen, die trockene Dokumentationen nicht hergeben. Vielleicht geht es Ihnen auch so und dieses Buch ist für Sie eine Bereicherung neben den bestehenden Anleitungen. Die Quellcode-Dateien für die im Buch verwendeten Beispiele finden Sie auf der Website [github.com/astridx/leaflet_beispieldateien_zum_Buch/](https://github.com/astridx/leaflet_example_files_for_book/).

Außerdem finde ich es immer sehr hilfreich, über den Tellerrand zu schauen. Ein paar solcher Blicke über den Tellerrand finden Sie hier im Buch. Wenn Sie Interesse haben, können Sie mit mir ein wenig tiefer in die Welt der geografischen Koordinaten eintauchen. Ich erkläre außerdem die verschiedenen Techniken zur Erstellung der Grafiken für die digitalen Karten. Außerdem werde ich mit Ihnen einen genaueren Blick auf GeoJSON werfen, der über die reine Verwendung hinausgeht. Ich zeige Ihnen, wie Sie der Karte mit benutzerdefinierten Markern eine persönliche Note verleihen können. Neben diesen grundlegenden Elementen kommt auch die Visualisierung der Daten mit Heatmaps, Geocoding und Routing nicht zu kurz.

## Wichtige Dinge zum Buch

Ich erkläre hier Schritt für Schritt alles, was ich rund um Leaflet für wichtig halte - alles, was Sie als Entwickler brauchen, um kreativ arbeiten zu können.

Ich hoffe, meine Art zu schreiben gefällt Ihnen. Ich persönlich hätte gerne genau dieses Buch gehabt, um mit Leaflet loszulegen.

## Was ist Leaflet?

[Leaflet](https://leafletjs.com/reference) ist eine Open-Source-Bibliothek [JavaScript](https://en.wikipedia.org/wiki/JSON) [^en.wikipedia.org/wiki/json], die es Ihnen leicht macht, Karten auf Ihrer Website anzubieten. [Open Source](https://de.wikipedia.org/wiki/Open_Source)[^de.wikipedia.org/wiki/open_source] bedeutet unter anderem, dass der Programmcode einsehbar ist. Jeder, der über das nötige Wissen verfügt, kann überprüfen, wie genau die Anwendung funktioniert. Und was noch wichtiger ist: Jeder kann Leaflet nutzen, es an seine Bedürfnisse anpassen und verbessern.

Was müssen Sie tun, wenn Sie Leaflet auf Ihrer Website verwenden wollen? Im Grunde müssen Sie nur zwei Dateien einbinden - eine JavaScript-Datei und die entsprechende CSS-Datei. Wie Sie das genau machen, erkläre ich im ersten Teil dieses Textes.

Durch das Einbinden der Dateien erhalten Sie Zugang zu einer Reihe von Funktionen. Mit Hilfe dieser Funktionen können Sie eine digitale Karte in Ihre Website integrieren. Leaflet unterstützt alle modernen Browser - auch die mobilen Versionen. Das bedeutet, dass Sie Ihre Karte so gut wie überall nutzen können.

Leaflet selbst konzentriert sich auf Benutzerfreundlichkeit und Leistung. Wichtig ist den Entwicklern von Leaflet auch, dass die JavaScript-Bibliothek von anderen Entwicklern mit einem Plugin leicht erweitert werden kann. Die Programmierschnittstelle ist sehr gut dokumentiert. Als Erweiterungsprogrammierer müssen Sie keine Geheimnisse aufdecken, um Leaflet erfolgreich mit einem Plugin zu erweitern. Dies ist meiner Meinung nach eine der größten Stärken von Leaflet.

Mit Leaflet können Sie Marker, Popups, Linien und Formen auf verschiedenen Ebenen Ihrer Karte anzeigen. Sie können zoomen, Entfernungen berechnen und den Mittelpunkt der Karte auf bestimmte Koordinaten verschieben.

Todo Vorteil in bezug zu vectorkacheln

## Was sollten Sie mitbringen?

Ich gehe davon aus, dass Sie über grundlegende [HTML](https://de.wikipedia.org/w/index.php?title=HTML5)[^https://de.wikipedia.org/w/index.php?title=html5] und [CSS](https://de.wikipedia.org/w/index.php?title=Cascading_Style_Sheets)[^https://de.wikipedia.org/w/index.php?title=cascading_style_sheets] Kenntnisse verfügen. Sie sollten auf alle Fälle wissen, wie Sie CSS und ein [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)-Skript in ein HTML-Dokument einbinden und wie Sie mit einfachen HTML-Elementen arbeiten.

> [CSS](http://www.w3.org/Style/CSS/) ist eine Stylesheet-Sprache für digitale Dokumente. Stylesheet-Sprachen werden verwendet, um Dokumente und Benutzeroberflächen zu gestalten. Dabei ist ein Stylesheet mit einer [Formatvorlage](https://de.wikipedia.org/w/index.php?title=Formatvorlage)[^https://de.wikipedia.org/w/index.php?title=formatvorlage] zu > vergleichen. Grundidee hierbei ist die Trennung von Dateninhalten und Design. Zusammen mit HTML und dem [DOM](https://wiki.selfhtml.org/index.php?title=JavaScript/DOM)[^https://wiki.selfhtml.org/index.php?title=javascript/dom] ist CSS eines der wichtigsten Elemente im Internet. CSS ist ein so genannter lebendiger Standard und wird vom [W3C](https://www.w3.org/)[^www.w3.org/] und dem [WHATWG](https://whatwg.org/)[^whatwg.org] permanent weiterentwickelt.

> [HTML](https://de.wikipedia.org/w/index.php?title=HTML5)[^de.wikipedia.org/w/index.php?title=html5] ist eine textbasierte Auszeichnungssprache zur Strukturierung digitaler Dokumente wie Texte mit Hyperlinks, Bildern und anderen Inhalten. HTML-Dokumente sind die Grundlage des World Wide Web und werden von Webbrowsern dargestellt.

Für das Verständnis der Beispiele sind darüber hinaus grundlegende [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)[^de.wikipedia.org/w/index.php?title=javascript_object_notation] Kenntnisse hilfreich. Für die Entwicklung dynamischer Webseiten ist JavaScript unerlässlich.

> Mit [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)[^de.wikipedia.org/w/index.php?title=javascript_object_notation] lassen sich kleine Hilfsroutinen und auch komplexen Bibliotheken schreiben.
<img src="https://vg07.met.vgwort.de/na/5f31b63672d84ae7b5b177ae8c025742" width="1" height="1" alt="">
