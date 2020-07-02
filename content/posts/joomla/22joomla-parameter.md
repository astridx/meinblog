---
date: 2019-12-22
title: 'Parameter'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-parameter
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Gibt es Einstellungen, die für alle Items deiner Komponente gelten und ein Anwender an seine Erfordernisse anpasst? In Joomla! gibt für diesen Zweck Parameter.

Parameter gibt es für

- ein Item speziell,
- für die ganze Komponente und
- für einen Menüpunkt.

Wenn ein Parameter bei den drei Möglichkeiten gesetzt ist, dann gilt folgende Hierarchie:

- Der Menüpunkt schlägt alles.
- Danach zieht der Parameter, der für das Item speziell gilt.
- Die niedrigst Priorität hat der Parameter, der für die ganze Komponente gilt.

Beim Menüpunkt hatten wir schon einen Parameter gesetzt und für die Komponente als Ganzes gibt es diesen in den Optionen. Das Item im Speziellen ist jetzt an der Reihe.

![Joomla! Published](/images/j4x22x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t17...t18) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Öffne die Ansicht deiner Komponente im Administrationsbereich. Beim Bearbeiten eines Items steht der Tabulator.

![Joomla! Published](/images/j4x22x1.png)

## Geänderte Dateien

### Übersicht
