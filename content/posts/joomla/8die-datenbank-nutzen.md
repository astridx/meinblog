---
date: 2019-12-08
title: 'Die Datenbank nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-datenbank-nutzen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Im vorhergehenden Teil hatten wir eine Datenbank für deine Joomla!-Komponenten eingerichtet. In diesem Teil lernst du, wie du mithilfe eines Formulars im Administrationsbereich die Daten änderst oder ergänzt.

Am Ende enthält die Ansicht deiner Komponente im Administrationsbereich eine Schaltfläche zum Hinzufügen von neuen Elementen. Du änderst ein vorhandenes Item, indem du auf den Titel klickst.

![Joomla Componente im Backend bearbeiten](/images/j4x8x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t6...t6b) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne als Nächstes, die Ansicht im Administrationsbereich für deine Komponente. Sind die drei Einträge mit Links versehen? Siehst du eine Schaltfläche zum Anlegen eines neuen Items?

![Joomla Componente im Backend bearbeiten](/images/j4x8x1.png)

3. Klicke als Letztes auf die Schaltfläche `Neu` oder auf den Titel eines Elements. Siehst du das Formular zum Anlegen oder Bearbeiten der Items.

![Joomla Componente im Backend bearbeiten](/images/j4x8x2.png)

## Geänderte Dateien

### Übersicht
