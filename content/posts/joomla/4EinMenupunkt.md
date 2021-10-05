---
date: 2020-12-04
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Ein Menüpunkt'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: ein-menuepunkt
langKey: de
categories:
  - Code
  - JoomlaDe
tags:
  - CMS
  - Joomla
---

In diesem Artikel erfährst du, wie du einen Menüpunkt für die Frontend-Ansicht deiner Komponente erstellst. So ist es nicht notwendig, dass du die genaue URL weißt. Später ist eine Umwandlung in [suchmaschinenfreundliche (SEF) URLs](<https://docs.joomla.org/Enabling_Search_Engine_Friendly_(SEF)_URLs/de>)[^docs.joomla.org/enabling_search_engine_friendly_(sef)_urls/de] automatisch möglich. Zur Erinnerung: Aktiviere diese Funktion bitte noch nicht. Diese Beispielerweiterung unterstützt SEF noch nicht. Das Joomla-konforme Routing ergänzen wir später.<!-- \index{Menüpunkt!Frontend} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t2...t3)[^github.com/astridx/boilerplate/compare/t2...3] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Der Menüpunkt im Frontend funktioniert anders, als der im Administrationsbereich. Wir erstellen eine separate XML-Datei. Später nutzen wir Parameter. Im Moment halten wir es unkompliziert. Wir fügen einige Sprachstrings für Texte hinzu. Im weiteren Verlauf werden wir sehen, wie wir diese übersetzen.

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t2...t3#diff-35fa310ee8efa91ecb0e9f7c604d413f)

Erstelle die Datei `default.xml` unter `components/com_foos/tmpl/foo` und füge den folgenden Code hinzu:

[components/com_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/0b9e39042dea67221aabcda2d226b0b8816cabd6/src/components/com_foos/tmpl/foo/default.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t3/src/components/com_foos/tmpl/foo/default.xml -->

<?xml version="1.0" encoding="utf-8"?>
<metadata>
	<layout title="COM_FOOS_FOO_VIEW_DEFAULT_TITLE">
		<message>
			<![CDATA[COM_FOOS_FOO_VIEW_DEFAULT_DESC]]>
		</message>
	</layout>
</metadata>

```

> Im Kapitel zum Update Server hatte ich es schon erwähnt: Der [Begriff CDATA](https://de.wikipedia.org/wiki/cdata)[^de.wikipedia.org/wiki/cdata] wird in der Auszeichnungssprache XML für verschiedene Zwecke verwendet. Er zeigt an, dass es sich bei einem bestimmten Teil des Dokuments um allgemeine Zeichen handelt und nicht um Programmcode mit einer spezifischeren, begrenzten Struktur. Der CDATA-Abschnitt kann Auszeichnungszeichen (`<`, `>` und `&`) enthalten. Diese werden vom Parser nicht weiter interpretiert. Die Verwendung von Entitäten wie `&lt;` und `&amp;` ist nicht notwendig.<!-- \index{CDATA} -->

Das `title`-Attribut im `layout`-Tag wird verwendet, wenn wir im Administrationsbereich einen neuen Menüpunkt für diese Komponente erstellen.
Der Text im `message`-Tag wird als Beschreibung angezeigt. Der Sprachstring bleibt nicht so wie er ist. Er wird in unterschiedliche Sprachen übersetzt. Daran werden wir später arbeiten. Hier bereiten wir alles vor.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne den Menümanager, um einen Menüpunkt anzulegen. Klicke dazu in der linken Seitenleite auf `Menü` und dann auf `All Menu Items`.

![Joomla - Einen Menüpunkt im Backend anlegen](/images/j4x4x1.png)

Klicke danach auf die Schaltfläche `New` und fülle alle notwendigen Felder aus.

![Joomla - Den Typ des Menüpunkt im Backend auswählen](/images/j4x4x2.png)

3. Den passenden `Menu Item Typ` findest du über die `Select` Schaltfläche.

![Joomla - Einen Menüpunkt im Backend speichern](/images/j4x4x3.png)

4. Speichere den Menüpunkt.

5. Wechsele anschließend ins Frontend und überzeuge dich davon, dass der Menüpunkt korrekt angelegt ist und funktioniert.

![Joomla - Die Ansicht des Menüpunkt im Frontend](/images/j4x4x4.png)
<img src="https://vg08.met.vgwort.de/na/75e23d8eff7e4aa8bf85935484dbc851" width="1" height="1" alt="">
