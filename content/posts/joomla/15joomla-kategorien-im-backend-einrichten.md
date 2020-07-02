---
date: 2019-12-15
title: 'Kategorien im Backend einrichten'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-kategorien-im-backend-einrichten
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Fast jede Website teilt ihre Inhalte in Kategorien ein. Joomla! bietet dieses nützliche Feature ebenfalls. Der aktuelle Teil des Tutorials zeigt dir, wie du Kategorien idealerweise in eine Joomla! Komponente integrierst. Erfinde das Rad nicht selbst neu. Nutze das, was Joomla! dir bietet.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t12a...t12b) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Datenbank für dich.

2. Öffne die Ansicht deiner Komponenten im Administrationsbereich.

3. In der Seitenleiste siehst du einen neuen Menüpunkt. Dieser bietet dir alles, was du zum Anlegen und Bearbeiten der Kategorien deiner Komponente benötigst.

![Joomla! Validierung](/images/j4x15x1.png)

4. Öffne als Nächstes ein Element. Überzeuge dich davon, dass es möglich ist, diesem eine Kategorie zuzuordnen.

![Joomla! Validierung](/images/j4x15x2.png)

Die Kategorien helfen dir, im Frontend deine Daten strukturiert anzuzeigen. Die Ansichten erstellen wir im weiteren Verlauf dieser Artikelserie.

## Geänderte Dateien

### Übersicht
