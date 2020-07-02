---
date: 2019-12-23
title: 'Pagination'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-pagination
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Schnell gibt eine Menge Inhalte. Alle Elemente auf einer Seite anzuzeigen ist nicht sinnvoll. Es schadet der Übersicht und der Performance. Deshalb teilen wir die Items auf Unterseiten auf und fügen eine Paginierung zum Navigieren im unteren Bereich hinzu.

![Joomla! Pagination](/images/j4x23x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t18...t19) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und erstelle so viele Items, dass diese nicht mehr auf einer Seite angezeigt werden. Im unteren Bereich siehst du eine Navigation, um durch die Inhalte zu blättern.

![Joomla! Pagination](/images/j4x23x1.png)

## Geänderte Dateien

### Übersicht
