---
date: 2019-12-20
title: 'Filtern, Sortieren, Suchen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-filtern-sortieren-suchen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Filtern, Sortieren und Suchen - jetzt bringen wir Ordnung in deine Joomla! 4 Komponente! Joomla bietet Ansichtsfilter und Suchwerkzeuge, mit denen du die Anzahl der sichtbaren Items einschränkst. Wenn der Statusfilter entsprechend gesetzt ist, werden nur Elemente angezeigt, deren Status veröffentlicht ist. Neben dem Statusfilter bieten die Suchwerkzeuge die Suche nach Titel oder Inhalt und die Möglichkeit die Tabelle zu sortieren, sprich die Reihenfolge zu ändern.

![Joomla! Filtern Sortieren und Suchen -Searchtools](/images/j4x20x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t15a...t16) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Öffne die Ansicht deiner Komponente im Administrationsbereich und filter, sortiere und suche nach Items in deiner Komponente.

![Joomla! Filtern Sortieren und Suchen -Searchtools](/images/j4x20x1.png)

## Geänderte Dateien

### Übersicht
