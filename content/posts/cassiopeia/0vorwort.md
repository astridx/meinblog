---
date: 2021-03-02
title: 'Ein Tutorial zur Verwendung des Cassiopeia Templates für Joomla 4 - für barrierefreies und responsives Web Design'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-vorwort
langKey: de
categories:
  - Code
tags:
  - Tmplate
  - Joomla
  - Cassiopeia
---

Wenn du neu bei Joomla 4 bist, lese bitte [Erste Schritte mit Joomla 4](https://docs.joomla.org/J4.x:Getting_Started_with_Joomla!/de).

Dieses Tutorial ist für Joomla 4 gedacht. Informationen zum Erstellen eines Templates für Joomla 3 findest du unter [Erste Schritte mit Templates](https://docs.joomla.org/J3.x:Getting_Started_with_Templates/de).

Du brauchst Joomla 4.x für dieses Tutorial. Joomla 4 findest du auf [GitHub](https://github.com/joomla/joomla-cms/tags) auf der [Entwickler-Website](https://developer.joomla.org/nightly-builds.html) oder erstelle eine kostenlose Website unter [https://launch.joomla.org](https://launch.joomla.org).

## Für wen ist dieses Tutorial?

Dieses Tutorial erstellt kein praktisches Beispiel. Ich habe absichtlich alles allgemein gehalten. Mein Hauptanliegen ist es, zu zeigen, wie Cassiopeia und Joomla! funktionieren - und es dabei selbst besser zu verstehen.

> Daher ist dieses Tutorial in erster Linie für Webmaster gedacht, die eine neue Website mit Joomla 4 erstellen, Cassiopeia anpassen möchten und Joomla bisher nicht kennen.

## Was bietet Cassiopeia

Cassiopeia, das neue Frontend Template in Joomla, bietet eine optimale Basis, um die eigene Joomla Website an die individuellen Bedürfnisse anzupassen. Das Cassiopeia Template bietet Benutzerfreundlichkeit, Barrierefreiheit und Anpassbarkeit. So basiert es auf der aktuellen Version des Frontend Frameworks Bootstrap 5. Die Modulpositionen des Templates wurden umbenannt, so dass sich Module nun leichter und intuitiver den entsprechenden Positionen zuordnen lassen. Das Template ist voll WCAG 2 Level AA kompatibel und entspricht damit den Anforderungen an barrierefreie Webinhalte.

## Die Struktur dieses Tutorials

Jedes Kapitel erklärt anhand der Beispieldateien. Um gleiche Voraussetzungen zu haben, wäre es gut, wenn du diese ebenfalls in einer Testumgebung installierst. Klick dazu im Dashboard die mit `Installieren` beschriebene Schaltfläche neben Blog-Beispieldateien.

![Blog-Beispieldateien installieren](/images/c11.png)

Das Front-End sollte nun so wie in der nachfolgenden Abbildung aussehen.

![Cassiopeia im Frontend](/images/c12.png)

Wenn du dich für ein bestimmtes Thema interessierst, sieh dir gerne ein separates Kapitel an.

> Mit diesem Tutorial passt du eine Joomla! 4 Website mit Cassiopeia und Blog Beispieldaten an deine Bedürfnisse an. Du erfindest das Rad nicht neu. Joomla! und Cassiopeia bieten eine ganze Reihe.

Wenn du sofort loslegen möchtest, blättere zu [Warum Cassiopeia](/warum-cassiopeia). Nachfolgend findest du einige Dinge zu Joomla! 4, die du für die Bearbeitung nicht zwingend benötigst. Manches davon ist aber _gut zu Wissen_.

## Theoretische Grundlagen zu Joomla!

### Joomlaǃ 4 bietet fünf Arten von Erweiterungenː

- [Komponenten](https://docs.joomla.org/Special:MyLanguage/Component/de):
  Eine Komponente ist der Hauptteil der Site. Eine Komponente übernimmt die Datenmanipulation sowie die Eingabe und Speicherung in die Datenbank. Eine Komponente auf den meisten Websites steht im Mittelpunkt der Seite.
- [Module](https://docs.joomla.org/Special:MyLanguage/Module/de):
  Ein Modul ist ein Add-On zur Site, das die Funktionalität erweitert. Es nimmt einen sekundären Teil der Webseite ein und wird nicht als primärer Fokus - Hauptinhalt - einer Seite betrachtet. Es wird an verschiedenen Positionen angezeigt und es ist auswählbar, auf welchen aktiven Menüelementen es ausgegeben wird. Module sind leichte und flexible Erweiterungen. Man verwendet sie für kleine Teile der Seite, die im Allgemeinen weniger komplex sind und über verschiedene Komponenten hinweg angezeigt werden.
- [Plugins](https://docs.joomla.org/Special:MyLanguage/Plugin/de):
  Ein Plugin bearbeitet die Ausgabe, die vom System generiert wurde. Es wird normalerweise nicht als separater Teil der Site aufgerufen. Es nimmt Daten aus anderen Quellen und bearbeitet diese vor dem Anzeigen. Ein Plugin funktioniert normalerweise hinter den Kulissen.
- [Sprachen](https://docs.joomla.org/Language/de):
  Die grundlegendsten Erweiterungen sind Sprachen. Im Wesentlichen bestehen die Sprachpaketdateien aus Schlüssel/Wert-Paaren, die die Übersetzung statischer Textzeichenfolgen im Joomla! Quellcode ermöglichen.
- [Templates](https://docs.joomla.org/Special:MyLanguage/Templates/de):
  Ein Template ist das Design deiner Joomla! Website.

### Joomla! 4 besteht aus fünf verschiedenen Anwendungen:

- Installation (wird für die Installation von Joomla verwendet und muss nach der Installation gelöscht werden);
- Administrator (Backend - zum Verwalten von Inhalten);
- Öffentlich oder Website (Frontend - zur Anzeige von Inhalten);
- CLI (wird für den Zugriff auf Joomla über die Befehlszeile und für Cron-Jobs verwendet);
- API (Webdienste - zum Erstellen von APIs für maschinenzugängliche Inhalte);

### Nebensächlich aber _Gut zu wissen_

#### Benötigst du in jedem Ordner deiner Komponente eine leere Datei "index.html"?

Die `index.html` ist nicht mehr erforderlich, da das Verzeichnislisten [in der Standardkonfiguration nicht zulässig](https://github.com/joomla/joomla-cms/pull/4171) ist.
Wenn du weiter interessiert bist: Hier ist die Diskussion zum Thema in einer [Google Group](https://groups.google.com/forum/#!topic/joomla-dev-cms/en1G7QoUW2s) zu finden.

#### Alternative Syntax für Kontrollstrukturen

PHP bietet eine [weitere Schreibweise](https://www.php.net/manual/de/control-structures.alternative-syntax.php) für Kontrollstrukturen an. Diese ist vor allem praktisch, wenn man größere Blöcke HTML direkt ausgibt - ohne `echo` zu benutzen. Nutze diese in Template-Dateien. So bleiben die übersichtlich.

```php
<?php foreach ($this->items as $i => $item) : ?>
<?php echo $item->name; ?>
</br>
<?php endforeach; ?>
```

anstelle von

```php
foreach ($this->items as $i => $item) {
	echo $item->name;
	echo '</br>';
}
```

Auf diese Art und Weise ist eine einzelne Zeile in sich geschlossen und HTML-Code ist trotzdem übersichtlich strukturiert.
