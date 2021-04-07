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

Das Arbeiten mit Geodaten und digitalen Landkarten hat durch das
[**g**lobale **P**ositionsbestimmung**s**system GPS](https://de.wikipedia.org/w/index.php?title=Global_Positioning_System&oldid=183579881)[^1]
immer mehr an Relevanz gewonnen.
Viele Anwendungen bieten heute sogar online geografische Informationen in Echtzeit an.
So finden Sie auch im Internet immer mehr digitale Karten und Anwendungen
die mit Geodaten arbeiten.

> [Geodaten](https://de.wikipedia.org/w/index.php?title=Geodaten&oldid=181076558)[^2]
> sind Informationen, die eine Zuordnung zu einer räumlichen Lage besitzen.
> 90 % aller Daten können einem Ort zugeordnet werden und sind somit Geodaten.

Sie lesen dieses Buch sicherlich, weil Sie mit dem Gedanken spielen eine digitale Karte
anzubieten - höchstwahrscheinlich auf einer Website. Die Grundlagen zu dem,
was ich in diesem Buch geschrieben habe, finden Sie alle in der
[Dokumentation zu Leaflet](https://leafletjs.com/reference)[^3] - oder zu den
jeweiligen Plugins - öffentlich im Internet.
Diese Dokumentationen habe ich hier im Buch verlinkt. Warum habe ich trotzdem
dieses Buch geschrieben?

Ich habe das Buch geschrieben,
weil ich manchmal gerne mit Beispielen lerne. Oft komme ich hierbei auf Ideen,
die trockene Dokumentationen nicht hergeben. Vielleicht geht es Ihnen ja auch
so und dieses Buch bringt Ihnen einen Mehrwert zu den vorhandenen Dokumentationen.
Die Quellcode-Dateien zu den im Buch verwendeten Beispielen finden Sie auf der
Website [https://astrid-guenther.de](https://astrid-guenther.de).

Außerdem finde ich es immer sehr hilfreich, wenn ich ein bisschen über den
Tellerrand hinaus blicke. Hier im Buch finden Sie ein paar solcher Blicke.
Wenn es Sie interessiert, können Sie mit mir etwas tiefer in die Welt der
geografische Koordinaten blicken. Ich erkläre Ihnen auch die unterschiedlichen
Techniken beim Erstellen der Grafiken für die digitalen Karten.
Außerdem sehe ich mir mit Ihnen GeoJSON, über die reine Anwendung hinaus,
etwas genauer an. Ich zeigen Ihnen wie Sie der Karte mit individuellen Markern
eine persönliche Note geben können. Neben diesen grundlegenden Elementen kommen
die Visualisierung der Daten mit Heatmaps, Geocoding und Routing nicht zu kurz.

## Wichtiges zum Buch

Ich erkläre Ihnen hier Schritt für Schritt alles das, was ich rund um Leaflet
als wichtig ansehe – also alles das, was Sie als Entwickler brauchen, um kreativ
arbeiten zu können.

Ich hoffe, dass Ihnen meine Art zu schreiben gefällt. Ich persönlich hätte mir
genau dieses Buch zum Start mit Leaflet gewünscht.

## Was ist Leaflet?

[Leaflet](https://leafletjs.com/reference) ist eine
Open Source [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070)-Bibliothek[^4],
die Ihnen das
Bereitstellen von Karten auf Ihrer Webseite einfach macht.
[Open Source](https://www.bsi-fuer-buerger.de/BSIFB/DE/Empfehlungen/EinrichtungSoftware/OpenSource/OpenSource.html)[^5]
bedeutet unter anderem, dass der Programmcode einsehbar ist.
Jeder mit den notwendigen Kenntnissen kann prüfen, wie die Anwendung genau
funktioniert. Und was noch wichtiger ist: Jeder kann Leaflet verwenden,
an seine Bedürfnisse anpassen und verbessern.

Was müssen Sie tun, wenn Sie Leaflet auf Ihrer Website einsetzen möchten?
Im Grunde genommen müssen Sie nur zwei Dateien – eine JavaScript Datei und die
dazugehörige CSS-Datei einbinden. Wie Sie das genau machen erkläre ich Ihnen
im Kapitel [Integrieren Sie die notwendigen JavaScript und Cascading Style Sheet
(CSS) Dateien](../eine-erste-karte/wir-beginnen-mit-einer-einfachen-karte#IntegrierenSiedienotwendigenJavaScriptundCascadingStyleSheet)
ganz genau.

Das Einbinden der Dateien bietet Ihnen den Zugriff auf eine Reihe von Funktionen. Mithilfe dieser Funktionen können sie unkompliziert eine digitale Karte auf Ihrer Website integrieren. Leaflet unterstützt alle modernen Browser – auch die mobilen Versionen. Das bedeute, dass Sie Ihre Karte so ziemlich überall einsetzen können.

Leaflet selbst legt den Schwerpunkt auf die einfache Bedienbarkeit und die Performance. Außerdem ist es den Entwicklern von Leaflet wichtig, dass die JavaScript Bibliothek unkompliziert von anderen Entwicklern mit einem Plugin erweitert werden kann. Die Programmierschnittstelle ist sehr gut dokumentiert. Als Erweiterungsprogrammierer muss man keine Geheimnisse lüften, um Leaflet erfolgreich mit einem Plugin zu erweitern. Dies ist meiner Meinung nach eine der bedeutendsten Stärken von Leaflet.

Viele namhafte Unternehmen setzten Leaflet ein.
Darunter sind Namen wie

- [Flickr](https://www.flickr.com),
- [Github](https://github.com/),
- [Pinterest](https://www.pinterest.com/),
- [Wikimedia](https://www.wikimedia.de/) und
- [Spiegel](http://www.spiegel.de/).

Out-of-the-box können Sie mit Leaflet Marker, Popups, Linien und Formen auf
unterschiedlichen Ebenen auf Ihrer Karte anzeigen.
Sie können Zoomen, Entfernungen berechnen und das Zentrum der Karte zu
bestimmten Koordinaten schieben.

## Was sollten Sie mitbringen?

Ich gehe davon aus, dass Sie über grundlegende [HTML](https://de.wikipedia.org/w/index.php?title=HTML5&oldid=182888530)[^6]
und [CSS](https://de.wikipedia.org/w/index.php?title=Cascading_Style_Sheets&oldid=181828388)[^7]
Kenntnisse verfügen.
Sie sollten auf alle Fälle wissen, wie Sie CSS und ein
[JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070)-Skript
in ein HTML-Dokument einbinden und wie Sie mit einfachen HTML-Elementen
arbeiten.

> [CSS](http://www.w3.org/Style/CSS/)
> ist eine Stylesheet-Sprache für digitale Dokumente. Stylesheet-Sprachen werden
> verwendet, um Dokumente und Benutzeroberflächen zu gestalten. Dabei ist ein
> Stylesheet mit einer [Formatvorlage](https://de.wikipedia.org/w/index.php?title=Formatvorlage&oldid=183843814)[^8] zu
> vergleichen. Grundidee hierbei ist die Trennung von Dateninhalten und Design.
> Zusammen mit HTML und dem [DOM](https://wiki.selfhtml.org/index.php?title=JavaScript/DOM&oldid=61063)[^9] ist CSS
> eines der wichtigsten Elemente im Internet. CSS ist ein so genannter lebendiger
> Standard und wird vom [W3C](https://www.w3.org/)[^10] und dem [WHATWG](https://whatwg.org/)[^11] permanent
> weiterentwickelt.

.

> [HTML](https://de.wikipedia.org/w/index.php?title=HTML5&oldid=182888530)[^12]
> ist eine textbasierte Auszeichnungssprache zur Strukturierung digitaler
> Dokumente wie Texte mit Hyperlinks, Bildern und anderen Inhalten. HTML-Dokumente
> sind die Grundlage des World Wide Web und werden von Webbrowsern dargestellt.

Für das Verständnis der Beispiele sind darüber hinaus grundlegende [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070)[^13]
Kenntnisse hilfreich. Für die Entwicklung dynamischer Webseiten ist JavaScript unerlässlich.

> Mit [JavaScript](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070)[^14]
> lassen sich kleine Hilfsroutinen und auch komplexen Bibliotheken schreiben.

## Die Autorin

Ich habe über 30 Jahre im öffentlichen Dienst gearbeitet. Die meiste Zeit
als Systemadministratorin in einer Bank.

In dieser Zeit habe ich nebenberuflich das Abitur nachgeholt und im
Anschluss ein Studium mit dem Abschluss Master of Computer Science bei der
Fernuni Hagen abgeschlossen.

Heute arbeite ich freiberuflich unter anderem mit Leaflet, lebe mit
meinem Mann, meiner Tochter, meinem Hund und meiner Katze in einem kleinen Dorf
in der Eifel.

Fragen zum Buch, konstruktive Kritik, Anregungen und Hinweise auf Tippfehler können
gerne per E-Mail an die E-Mail-Adresse
[info@astrid-guenther.de](mailto:info@astrid-guenther.de) gesandt werden.

[^1]: https://de.wikipedia.org/w/index.php?title=Global_Positioning_System&oldid=183579881 (https://bit.ly/2Rko7MC)
[^2]: https://de.wikipedia.org/w/index.php?title=Geodaten&oldid=181076558 (https://bit.ly/2RkeBZT)
[^3]: https://leafletjs.com/reference
[^4]: https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070 (https://bit.ly/2Tc84hc)
[^5]: https://www.bsi-fuer-buerger.de/BSIFB/DE/Empfehlungen/EinrichtungSoftware/OpenSource/OpenSource.html (https://bit.ly/2EWuWNB)
[^6]: https://de.wikipedia.org/w/index.php?title=HTML5&oldid=182888530 (https://bit.ly/2GMpjnY)
[^7]: https://de.wikipedia.org/w/index.php?title=Cascading_Style_Sheets&oldid=181828388 (https://bit.ly/2BNqmyh)
[^8]: https://de.wikipedia.org/w/index.php?title=Formatvorlage&oldid=183843814 (https://bit.ly/2BKOul8)
[^9]: https://wiki.selfhtml.org/index.php?title=JavaScript/DOM&oldid=61063 (https://bit.ly/2LJJCkQ)
[^10]: https://www.w3.org/
[^11]: https://whatwg.org
[^12]: https://de.wikipedia.org/w/index.php?title=HTML5&oldid=182888530 (https://bit.ly/2RszPoi)
[^13]: https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070 (https://bit.ly/2Tc84hc)
[^14]: https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070 (https://bit.ly/2Tc84hc)
