---
date: 2019-12-28
title: 'Featured'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-featured
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Manche Items sind etwas Besonderes und für sie gibt es in Joomla! ein spezielles Attribut: `featured`. Dieser Teil der Artikelserie fügt `featured` zu unserer Komponente hinzu.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t23...t24) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Die Liste enthält eine Spalte die mit `featured` überschrieben ist.

![Joomla! Featured](/images/j4x28x2.png)

3. Öffne ein Item in der Bearbeitungsansicht und überzeuge dich davon, dass du hier das Attribut `featured` zum Bearbeiten angeboten bekommst.

![Joomla! Featured](/images/j4x28x2.png)

4. Lege einen Menüpunkt vom Type `featured` an.

![Joomla! Featured](/images/j4x28x3.png)

5. Wechsele ins Frontend und stelle sicher, dass unter dem Menüpunkt `featured` ausschließlich Items angezeigt werden, bei denen das Attribut gesetzt ist.

![Joomla! Featured](/images/j4x28x4.png)

## Geänderte Dateien

### Übersicht
