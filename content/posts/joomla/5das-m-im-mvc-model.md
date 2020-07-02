---
date: 2019-12-05
title: 'Das M im MVC: Model'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: das-m-im-mvc-model
categories:
  - Code
tags:
  - CMS
  - Joomla
---

In diesem Teil kommt keine neue Funktion hinzu. Wir bessern den bisherigen Aufbau. Jede Web-Anwendung besteht aus Eingaben, Daten und der Darstellung.
Problematisch wäre es vor allem bei größeren Projekten die drei Elemente in einer Klasse zusammenzufassen. Joomla! verwendet das Model-View-Controller-Konzept für die Aufteilung. In diesem Tutorial-Teil fügen wir ein Model zum Frontend hinzu.
Das Model-Objekt ist für die Daten und deren Verarbeitung verantwortlich.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t3...t4) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Sieh dir die Frontendansicht deiner Komponente an. Die Daten für die Ausgabe werden vom Model erzeugt.

![Joomla Model im Frontend](/images/j4x5x1.png)

## Geänderte Dateien

### Übersicht
