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

Das Arbeiten mit Geodaten und digitalen Karten hat durch das [**g**lobale **P**ositionsbestimmung**s**system GPS](https://de.wikipedia.org/w/index.php?title=Global_Positioning_System)[^https://de.wikipedia.org/w/index.php?title=global_positioning_system] immer mehr an Relevanz gewonnen. Viele Anwendungen bieten heute sogar online geografische Informationen in Echtzeit an. So finden Sie auch im Internet immer mehr digitale Karten und Anwendungen die mit Geodaten arbeiten.

> [Geodaten](https://de.wikipedia.org/w/index.php?title=Geodaten)[^https://de.wikipedia.org/w/index.php?title=geodaten] sind Informationen, die eine Zuordnung zu einer räumlichen Lage besitzen. aller Daten können einem Ort zugeordnet werden und sind somit Geodaten.

Sie lesen dieses Buch sicherlich, weil Sie mit dem Gedanken spielen eine digitale Karte anzubieten - höchstwahrscheinlich auf einer Website. Die Grundlagen zu dem, was ich in diesem Buch geschrieben habe, finden Sie alle in der [Dokumentation zu Leaflet](https://leafletjs.com/reference)[^https://leafletjs.com/reference] - oder zu den jeweiligen Plugins - öffentlich im Internet. Diese Dokumentationen habe ich hier im Buch verlinkt. Warum habe ich trotzdem dieses Buch geschrieben?

Ich habe das Buch geschrieben, weil ich manchmal gerne mit Beispielen lerne. Oft komme ich hierbei auf Ideen, die trockene Dokumentationen nicht hergeben. Vielleicht geht es Ihnen ja auch so und dieses Buch bringt Ihnen einen Mehrwert zu den vorhandenen Dokumentationen. Die Quellcode-Dateien zu den im Buch verwendeten Beispielen finden Sie auf der Website [https://astrid-guenther.de](https://astrid-guenther.de).

Außerdem finde ich es immer sehr hilfreich, wenn ich ein bisschen über den Tellerrand hinaus blicke. Hier im Buch finden Sie ein paar solcher Blicke. Wenn es Sie interessiert, können Sie mit mir etwas tiefer in die Welt der geografische Koordinaten blicken. Ich erkläre Ihnen auch die unterschiedlichen Techniken beim Erstellen der Grafiken für die digitalen Karten. Außerdem sehe ich mir mit Ihnen GeoJSON, über die reine Anwendung hinaus, etwas genauer an. Ich zeigen Ihnen wie Sie der Karte mit individuellen Markern eine persönliche Note geben können. Neben diesen grundlegenden Elementen kommen die Visualisierung der Daten mit Heatmaps, Geocoding und Routing nicht zu kurz.

## Wichtiges zum Buch

Ich erkläre Ihnen hier Schritt für Schritt alles das, was ich rund um Leaflet als wichtig ansehe – also alles das, was Sie als Entwickler brauchen, um kreativ arbeiten zu können.

Ich hoffe, dass Ihnen meine Art zu schreiben gefällt. Ich persönlich hätte mir genau dieses Buch zum Start mit Leaflet gewünscht.

## Was ist Leaflet?

[Leaflet](https://leafletjs.com/reference) ist eine Open Source [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)-Bibliothek[^https://de.wikipedia.org/w/index.php?title=javascript_object_notation], die Ihnen das Bereitstellen von Karten auf Ihrer Webseite einfach macht. [Open Source](https://de.wikipedia.org/wiki/Open_Source)[^https://de.wikipedia.org/wiki/open_source] bedeutet unter anderem, dass der Programmcode einsehbar ist. Jeder mit den notwendigen Kenntnissen kann prüfen, wie die Anwendung genau funktioniert. Und was noch wichtiger ist: Jeder kann Leaflet verwenden, an seine Bedürfnisse anpassen und verbessern.

Was müssen Sie tun, wenn Sie Leaflet auf Ihrer Website einsetzen möchten? Im Grunde genommen müssen Sie nur zwei Dateien – eine JavaScript Datei und die dazugehörige CSS-Datei einbinden. Wie Sie das genau machen erkläre ich Ihnen im Kapitel _Integrieren Sie die notwendigen JavaScript und Cascading Style Sheet
(CSS) Dateien_ ganz genau.

Das Einbinden der Dateien bietet Ihnen den Zugriff auf eine Reihe von Funktionen. Mithilfe dieser Funktionen können sie unkompliziert eine digitale Karte auf Ihrer Website integrieren. Leaflet unterstützt alle modernen Browser – auch die mobilen Versionen. Das bedeute, dass Sie Ihre Karte so ziemlich überall einsetzen können.

Leaflet selbst legt den Schwerpunkt auf die einfache Bedienbarkeit und die Performance. Außerdem ist es den Entwicklern von Leaflet wichtig, dass die JavaScript Bibliothek unkompliziert von anderen Entwicklern mit einem Plugin erweitert werden kann. Die Programmierschnittstelle ist sehr gut dokumentiert. Als Erweiterungsprogrammierer muss man keine Geheimnisse lüften, um Leaflet erfolgreich mit einem Plugin zu erweitern. Dies ist meiner Meinung nach eine der bedeutendsten Stärken von Leaflet.

Viele namhafte Unternehmen setzten Leaflet ein. Darunter sind Namen wie

- [Flickr](https://www.flickr.com),
- [Github](https://github.com/),
- [Pinterest](https://www.pinterest.com/),
- [Wikimedia](https://www.wikimedia.de/) und
- [Spiegel](http://www.spiegel.de/).

Out-of-the-box können Sie mit Leaflet Marker, Popups, Linien und Formen auf unterschiedlichen Ebenen auf Ihrer Karte anzeigen. Sie können Zoomen, Entfernungen berechnen und das Zentrum der Karte zu bestimmten Koordinaten schieben.

Todo Vorteil in bezug zu vectorkacheln

## Was sollten Sie mitbringen?

Ich gehe davon aus, dass Sie über grundlegende [HTML](https://de.wikipedia.org/w/index.php?title=HTML5)[^https://de.wikipedia.org/w/index.php?title=html5] und [CSS](https://de.wikipedia.org/w/index.php?title=Cascading_Style_Sheets)[^https://de.wikipedia.org/w/index.php?title=cascading_style_sheets] Kenntnisse verfügen. Sie sollten auf alle Fälle wissen, wie Sie CSS und ein [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)-Skript in ein HTML-Dokument einbinden und wie Sie mit einfachen HTML-Elementen arbeiten.

> [CSS](http://www.w3.org/Style/CSS/) ist eine Stylesheet-Sprache für digitale Dokumente. Stylesheet-Sprachen werden verwendet, um Dokumente und Benutzeroberflächen zu gestalten. Dabei ist ein Stylesheet mit einer [Formatvorlage](https://de.wikipedia.org/w/index.php?title=Formatvorlage)[^https://de.wikipedia.org/w/index.php?title=formatvorlage] zu > vergleichen. Grundidee hierbei ist die Trennung von Dateninhalten und Design. Zusammen mit HTML und dem [DOM](https://wiki.selfhtml.org/index.php?title=JavaScript/DOM)[^https://wiki.selfhtml.org/index.php?title=javascript/dom] ist CSS eines der wichtigsten Elemente im Internet. CSS ist ein so genannter lebendiger Standard und wird vom [W3C](https://www.w3.org/)[^www.w3.org/] und dem [WHATWG](https://whatwg.org/)[^whatwg.org] permanent weiterentwickelt.

> [HTML](https://de.wikipedia.org/w/index.php?title=HTML5)[^de.wikipedia.org/w/index.php?title=html5] ist eine textbasierte Auszeichnungssprache zur Strukturierung digitaler Dokumente wie Texte mit Hyperlinks, Bildern und anderen Inhalten. HTML-Dokumente sind die Grundlage des World Wide Web und werden von Webbrowsern dargestellt.

Für das Verständnis der Beispiele sind darüber hinaus grundlegende [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)[^de.wikipedia.org/w/index.php?title=javascript_object_notation] Kenntnisse hilfreich. Für die Entwicklung dynamischer Webseiten ist JavaScript unerlässlich.

> Mit [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation)[^de.wikipedia.org/w/index.php?title=javascript_object_notation] lassen sich kleine Hilfsroutinen und auch komplexen Bibliotheken schreiben.
