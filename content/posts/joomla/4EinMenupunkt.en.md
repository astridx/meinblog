---
date: 2020-12-04
title: 'Joomla 4.x Tutorial - Extension Development - A Menu Item'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/ein-menuepunkt
langKey: en
categories:
  - Code
  - JoomlaEn
tags:
  - CMS
  - Joomla
---


In this article you will learn how to create a menu item for the frontend view of your component. This way, you don't need to know the exact URL. Later, a conversion to search engine friendly URLs is possible automatically.

![Joomla Einen Menüpunkt erstellen](/images/j4x4x2.png)

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t2...t3) and incorporate these changes into your development version.

## Step by step

In the current section a file is added and none is changed.

![Übersicht über die Dateien im vierten Kapitel](/images/j4xvier.png)

### Neue Dateien

Der Menüpunkt im Frontend funktioniert anders, als der im Administrationsbereich. Wir erstellen eine separate XML-Datei. Später nutzen wir Parameter. Aber im Moment halten wir es unkompliziert. Wir fügen einige Sprachstrings für Text hinzu. Später werden wir sehen, wie wir diese übersetzen.

#### [src/components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t2...t3#diff-35fa310ee8efa91ecb0e9f7c604d413f)

Erstelle die Datei `default.xml` unter `components/com_foos/tmpl/foo` und füge den folgenden Code hinzu:

[components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/0b9e39042dea67221aabcda2d226b0b8816cabd6/src/components/com_foos/tmpl/foo/default.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/ce0e5277606e146de4044e6fa0c54af836bd7dd9/src/components/com_foos/tmpl/foo/default.xml -->

<?xml version="1.0" encoding="utf-8"?>
<metadata>
	<layout title="COM_FOOS_FOO_VIEW_DEFAULT_TITLE">
		<message>
			<![CDATA[COM_FOOS_FOO_VIEW_DEFAULT_DESC]]>
		</message>
	</layout>
</metadata>

```

> The [term CDATA](https://en.wikipedia.org/w/index.php?title=CDATA&oldid=1010130060), meaning character data, is used for distinct, but related, purposes in the markup language XML. The term indicates that a certain portion of the document is general character data, rather than non-character data or character data with a more specific, limited structure. The CDATA section may contain markup characters (`<`, `>` and `&`). These are not interpreted further by the parser.

Das `title`-Attribut hier wird verwendet, wenn wir im Administrationsbereich einen neuen Menüpunkt für diese Komponente erstellen.
Der Text im `message`-Tag wird als Beschreibung angezeigt.

> Der Sprachstring bleibt nicht so. Er wird in unterschiedliche Sprachen übersetzt. Daran werden wir später arbeiten. Hier bereiten wir alles vor.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne den Menümanager, um einen Menüpunkt anzulegen. Klicke dazu in der linken Seitenleite auf `Menü` und dann auf `All Menu Items`.

Klicke danach auf die Schaltfläche `New` und fülle alle notwendigen Felder aus.

![Joomla Einen Menüpunkt erstellen](/images/j4x4x1.png)

3. Den passenden `Menu Item Typ` findest du über die `Select` Schaltfläche.

![Joomla Einen Menüpunkt erstellen](/images/j4x4x2.png)

4. Speichere den Menüpunkt.

5. Wechsele anschließend ins Frontend und überzeuge dich davon, dass der Menüpunkt korrekt angelegt ist und funktioniert.

![Joomla Einen Menüpunkt erstellen](/images/j4x4x3.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// github.com/astridx/boilerplate/compare/t2...t3.diff

```

## Links
