---
date: 2019-12-10
title: 'Sprachdateien nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: sprachdateien-nutzen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Dein Ziel war, dass deine Erweiterung mehrsprachig ist! Deshalb hast du die Texte, die im Frontend angezeigt werden, nicht direkt in den Programmcode eingegeben. Du hattest alles so vorbereitet, dass du spezielle Dateien nutzt, die austauschbar sind. Bisher hast du deshalb lange kryptische Texte gesehen. In diesem Teil übersetzten wir die unschönen Sprachstrings.

> Selbst wenn deine Zielgruppe die englisch Sprache spricht und du ausschließlich diese Sprache unterstützt ist es wichtig, eine Sprachdatei für den gesamten Text zu verwenden, den du im Front-End oder im Back-End der Komponente anzeigst. So ist es potentiellen Nutzern möglich, Texte zu überschreiben, ohne den Quellcode zu bearbeiten.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t7...t8) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und Frontend und überzeuge dich davon, dass die Texte lesbar und nicht mehr kryptisch sind.

![Joomla! Sprachdateien werden genutzt](/images/j4x10x1.png)

## Geänderte Dateien

### Übersicht
