---
date: 2019-12-26
title: 'Stapelverarbeitung/Batch'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-batch
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Joomla! bietet eine Reihe von Funktionen, mit denen es Administratoren möglich ist, mehrere Items auf einen Schlag zu bearbeiten. Diese Stapelverarbeitung (englisch Batch) fügen wir jetzt zur Komponente hinzu. Darauf aufbauend ist dir möglich, eigenen Funktionen hinzuzufügen.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t21...t22) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. In der Werkzeugleiste siehst du eine Auswahlliste zum Anstoßen von verschiedenen Aktionen. Klicke den Eintrag `Batch`.

![Joomla! Stapelverarbeitung](/images/j4x26x1.png)

3. Teste die Stapelverarbeitung.

![Joomla! Stapelverarbeitung](/images/j4x26x2.png)

## Geänderte Dateien

### Übersicht
