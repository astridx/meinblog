---
date: 2019-12-06
title: 'Den Menüpunkt mit einer Variablen versehen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: den-menuepunkt-mit-einer-vriablen-versehen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Es kommt vor, dass du die Ausgabe im Frontend für einen Menüpunkt individuell gestaltest. Hierzu benötigst du eine Variable. In diesem Teil des Tutorials fügen wir eine Textvariable zum Menüpunkt hinzu.

![Joomla Request Variable beim Joomla Menü Item](/images/j4x6x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t4...t5) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Wechsele wieder in den Menü Manager und öffne den in Teil 4 erstellen Menüpunkt. Hier siehst du jetzt ein Textfeld, in das du einen beliebigen Text einfügst.

![Joomla Request Variable beim Joomla Menü Item](/images/j4x6x1.png)

3. Welche jetzt in die Frontendansicht. Überzeuge dich davon, dass der von dir beim Menüpunkt eingegebene Text im Frontend an der richtigen Stelle ausgegeben wird.

![Joomla Request Variable beim Joomla Menü Item](/images/j4x6x2.png)

Ich entschuldige mich für meine Einfallslosigkeit. Dir fallen sicher lustigere oder sinnvollere Beispiele ein. Der Sinn und die Funktion der Variablen werden aber klar, oder?

So erstellst du mehrere Menüpunkte, die jeweils einen anderen Text enthalten. Ein beliebter Anwendungsfall ist es, das Design der Ausgabe mithilfe von Variablen zu beeinflussen. Über die Variable fragst du beispielsweise ab, ob der Inhalt in einer Liste oder in einer Tabelle auszugeben ist.

## Geänderte Dateien

### Übersicht
