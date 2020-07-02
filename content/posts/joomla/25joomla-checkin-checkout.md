---
date: 2019-12-25
title: 'Checkin und Checkout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-checkin-checkout
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Durch die Checkout-Funktion werden unerwartete Ergebnisse vermieden, die auftreten, wenn zwei Benutzer denselben Datensatz gleichzeitig editieren. Das Auschecken sperrt ein Item, wenn ein Anwender dieses zu Bearbeitung öffnet. Beim Speichern und Schließen wird es dann wieder freigegeben. Eine sinnvolle Funktion, die wir in dem Teil der Artikelserie integrieren.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t20...t21) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Öffne ein Item in der Bearbeitungsansicht.

4. Wechsele in einen anderen Browser und versuche, das Item erneut zu bearbeiten.

5. Vergewissere dich, dass du ein Symbol siehst, dass dich darauf hinweist, dass dieses Item gesperrt ist.

![Joomla! Sperren/Freigeben](/images/j4x25x1.png)

## Geänderte Dateien

### Übersicht
