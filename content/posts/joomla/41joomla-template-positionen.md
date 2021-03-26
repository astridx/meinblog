---
date: 2021-01-09
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Modul Positionen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-positionen
langKey: de
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Template
  - Joomla
---


Wir kreieren ein Front-End-Template. Dieses steuert die Art und Weise, wie die Website dem Benutzer präsentiert wird.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t35...t36) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Beim Template ist es ebenfalls so, dass du das Rad nicht neu erfindest. Du kannst viele Dinge nutzen, die Joomla von Haus aus zur Verfügung stellt. Das hat Vorteile. Nachteilig ist, dass individuelle Wünsche schwerer umzusetzten sind. Deshalb beginnen wir rudimentär. Es geht eher darum, hinter die Funktionen zu blicken und diese zu verstehen, als etwas "Schönes" zu erschaffen.

### Neue Dateien

In diesem Abschnitt wurden lediglich Änderungen.

### Geänderte Dateien

#### Template

Bisher haben wir eine stasche Website. In diesem Teil fügen wir mithilfe von Modulpositionen dynamsich Inhalte hinzu.

##### [templates/facile/component.php](https://github.com/astridx/boilerplate/blob/161043cf57d9bd06df1d23803db2cd1ed7aacbca/src/templates/facile/component.php)

Die Datei `index.php` ist das Herzstück. Sie sorgt dafür, dass alles zusammenarbeitet. Ein minimaler Aufbau sieht wie folgt aus.

[templates/facile/component.php](https://github.com/astridx/boilerplate/blob/161043cf57d9bd06df1d23803db2cd1ed7aacbca/src/templates/facile/component.php)

```php {diff}
-Component
+<!DOCTYPE html>
+<html lang="de">
+<head>
+	<meta name="viewport" content="width=device-width, initial-scale=1">
+	<jdoc:include type="head" />
+</head>
+<body>
+	<jdoc:include type="message" />
+	<jdoc:include type="component" />
+</body>
+</html>
+
```


##### [templates/facile/index.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

Die Datei `index.php` ist das Herzstück. Sie sorgt dafür, dass alles zusammenarbeitet. Ein minimaler Aufbau sieht wie folgt aus.

[templates/facile/index.php](https://github.com/astridx/boilerplate/blob/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/index.php)

```php {diff}
 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
 	<title>Titel</title>
   </head>
+
   <body>
-	Hallo Joomla!
-  </body>
+  <header>
+	<div>
+	  <nav>
+				<div>
+					<jdoc:include type="modules" name="menu" />
+				</div>
+			</nav>
+			<div>
+				<jdoc:include type="modules" name="search" />
+			</div>
+		</div>
+	</header>
+
+	<div>
+		<jdoc:include type="modules" name="banner" />
+	</div>
+
+	<div>
+		<jdoc:include type="modules" name="top-a" />
+	</div>
+
+	<div>
+		<jdoc:include type="modules" name="top-b" />
+	</div>
+
+	<div>
+		<jdoc:include type="modules" name="sidebar-left" />
+	</div>
+
+	<div>
+		<jdoc:include type="modules" name="breadcrumbs" />
+		<jdoc:include type="modules" name="main-top" />
+		<jdoc:include type="message" />
+		<main>
+		<jdoc:include type="component" />
+		</main>
+		<jdoc:include type="modules" name="main-bottom" />
+	</div>
+
+	<div>
+		<jdoc:include type="modules" name="sidebar-right" />
+	</div>
+
+	<div>
+		<jdoc:include type="modules" name="bottom-a" />
+	</div>
+
+	<div>
+		<jdoc:include type="modules" name="bottom-b" />
+	</div>
+
+	<footer>
+		<jdoc:include type="modules" name="footer" />
+	</footer>
+
+  <jdoc:include type="modules" name="debug" />
+
+</body>
 </html>
```

Die erste Zeile ist in PHP geschrieben. Das Gute an PHP und HTML ist, dass es zusammen geschrieben werden kann. Wir können PHP-Anweisungen in eine HMTL-Datei einfügen, und umgekehrt. `<?php` öffnet eine PHP-Anweisung - egal wo - und `?>` schließt sie wieder. In der ersten Zeile verbieten wir den direkten Zugriff auf diese Datei. Dies geschieht über die Joomla API mit dem Befehl `_JEXEC`. Diese Anweisung prüft, ob die Datei aus einer Joomla-Sitzung heraus aufgerufen wird, und sie schützt di Seite, indem sie es einem Hacker schwerer macht.

Später deklarieren wir mit `<!doctype html>` den [Dokumententyp](https://www.w3.org/QA/2002/04/valid-dtd-list.html). Dies stellt sicher, dass das Dokument von verschiedenen Browsern auf die gleiche Weise geparst wird. Die einfachste und zuverlässigste Doctype-Deklaration, die verwendet werden kann, ist die in HTML5 definierte. Diese verwenden wir.

Was dann folgt, ist ein kleinstmöglicher Aufbau einer HTML-Seite. Diese Seite wird mit `<html>` eröffnet und endet mit `</html>`. Der Kopfbereich beginnt mit `<head>` und endet mit `</head>`. Der Body beginnt mit `<body>` und endet mit `</body>`. Innerhalb des Header-Bereichs, während wir die Header-Informationen mit `<jdoc: include type="head" />` aus der Joomla API laden. Dieser `jdoc:include`-Befehl fügt die normalen Header-Informationen ein, die eine Website benötigt.

Den Befehl `jdoc:include` finden wir noch öfter in der `index.php`. Beispielsweise sehen wir `<jdoc:include type="message" />`, damit funktionieren die Systemmeldungen. Wann immer Joomla dem Websitebetrachter etwas mitteilt, wird diese Zeile es auf Ihrem Bildschirm anzeigen. Wenn man beispielsweise eine E-Mail über ein Kontaktformular senden, wir man die Nachricht "Ihre Nachricht wurde erfolgreich gesendet" sehen.

Ein weiteres zu besprechendes Element ist `<jdoc:include type="component" />`. Dieses Element sollte nur einmal im `<body>`-Element erscheinen, um den Hauptinhalt der Seite in Bezug auf die aktuell angezeigte Seite darzustellen.

Das letzte erwähnenswerte Element ist `<jdoc:include type="modules" />`.

So, genug erklärt. So sieht die Website minimal aus.

##### [templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/compare/t35...t36#diff-764a4776e5fab4421733468c2fc87d67e612f3d84297fb83ed0495d4c04b27d2)

Über die Sprachdateien ist es möglich, die Positionen genau zu beschreiben. Beachte die Zeile `TPL_FACILE_POSITION_TOP-A="Area under banner"`.

[templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/compare/t35...t36#diff-764a4776e5fab4421733468c2fc87d67e612f3d84297fb83ed0495d4c04b27d2)

```php {diff}

 FACILE="Facile - Site template"
+TPL_FACILE_POSITION_MENU="Menu"
+TPL_FACILE_POSITION_SEARCH="Search"
+TPL_FACILE_POSITION_BANNER="Banner"
+TPL_FACILE_POSITION_TOP-A="Area under banner"
+TPL_FACILE_POSITION_TOP-B="Area above the content"
+TPL_FACILE_POSITION_MAIN-TOP="Main-top"
+TPL_FACILE_POSITION_BREADCRUMBS="Breadcrumbs"
+TPL_FACILE_POSITION_MAIN-BOTTOM="Main-bottom"
+TPL_FACILE_POSITION_SIDEBAR-LEFT="Sidebar-left"
+TPL_FACILE_POSITION_SIDEBAR-RIGHT="Sidebar-right"
+TPL_FACILE_POSITION_BOTTOM-A="Bottom-a"
+TPL_FACILE_POSITION_BOTTOM-B="Bottom-b"
+TPL_FACILE_POSITION_FOOTER="Footer"
+TPL_FACILE_POSITION_DEBUG="Debug"

```

##### [templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/compare/t35...t36#diff-7d97de6b92def4b5a42a0052c815e6fada268a2e2dda9e3ea805eb87e0076dc1)

Die der Datei `templateDetails.xml`werden die Modulpositionen angelegt, um über den Befehl `jdoc:include` in der `index.php` eingebunden zu werden. 

[ssrc/templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/blob/8238130b429378f62cf6652b2f77255a62a7380d/src/templates/facile/templateDetails.xml)

```xml {diff}

 		<filename>template_thumbnail.png</filename>
 		<folder>language</folder>
 	</files>
+
+	<positions>
+		<position>menu</position>
+		<position>search</position>
+		<position>banner</position>
+		<position>top-a</position>
+		<position>top-b</position>
+		<position>main-top</position>
+		<position>main-bottom</position>
+		<position>breadcrumbs</position>
+		<position>sidebar-left</position>
+		<position>sidebar-right</position>
+		<position>bottom-a</position>
+		<position>bottom-b</position>
+		<position>footer</position>
+		<position>debug</position>
+	</positions>
 </extension>

```

##### src/templates/facile/template_preview.png und src/templates/facile/template_thumbnail.png

### Geänderte Dateien

In diesem Abschnitt wurden lediglich Dateien hinzugefügt.

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen. Am Anfang ist das Einfachste, die Dateien manuell an Ort und Stelle zu kopieren:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

2. Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Öffne dazu das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu deinem eben kopierten Template. Wähle diesen aus und klicke auf die Schaltfläche `Install`.
![Joomla Template erstellen - Die Installation](/images/j4x40x2.png)

3. Teste als Nächstes, ob das Template fehlerfrei arbeitet. Aktiviere dazu den Template Style Facile.
![Joomla Template erstellen - Template Style aktivieren](/images/j4x40x3.png)

5. Installiere die Beispieldaten.

6. Rufe die URL `joomla-cms4/index.php?tp=1` auf. Öffne die Frontend-Ansicht. 
![Joomla Template erstellen - Frontend Ansicht](/images/j4x40x2.png)


![Joomla Template erstellen - Modul Positionen besonders benennen](/images/j4x41x1.png)

![Joomla Template erstellen - Beispieldateien installieren](/images/j4x41x2.png)

![Joomla Template erstellen - Ansicht Facil ungestyled](/images/j4x41x3.png)

![Joomla Template erstellen - Ansicht in Cassiopeia](/images/j4x41x4.png)


## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t34...t35.diff

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)
[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)
