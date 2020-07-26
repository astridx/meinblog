---
date: 2019-12-18
title: 'Custom Fields im Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-custom-fields-im-frontend-integrieren
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Die wenigsten benutzerdefinierten Felder leben alleine im Administrationsbereich. In der Regel ist eine Ausgabe im Frontend erforderlich. Dieser Frage widmen wir uns im aktuellen Teil der Artikelserie.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x18x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t14a...t14b) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

In diesem Kapitel kommen keine neuen Dateien hinzu

### Geänderte Dateien

#### [src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-c77adeff4ff9e321c996e0e12c54b656)

####  [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-a33732ebd6992540b8adca5615b51a1f)


## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Klicke auf den Menüpunkt `Fields` in diesem neuen Menü.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x17x1.png)

3. Erstelle danach ein benutzerdefiniertes Feld vom Typ `Text`, falls du dies nicht im vorherigen Kapitel erledigt hast.

4. Edieren ein veröffentlichtes Foo-Item. Stelle sicher, dass du das Custom Field mit einem Wert versiehst.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x18x1.png)

5. Öffne am Ende die Detailansicht des eben bearbeiteten Foo-Items. Du siehst neben den vorher vorhanden Werten jetzt zusätzlich den Text, den du im benutzerdefinierten Feld eingetragen hast.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x18x2.png)

## Geänderte Dateien

### Übersicht
