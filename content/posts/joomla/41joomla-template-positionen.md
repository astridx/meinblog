---
date: 2021-01-10
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
  - Joomla
---

Unser Template soll die Inhalte von Joomla an verschiedenen Positionen anzeigen. Wie Modul Positionen im Template integriert werden, ist Thema dieses Kapitels.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t35...t36) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

We will proceed step by step. In this part we add the module positions so that Joomla displays content dynamically. We will take care of the design in the next part.

### Neue Dateien

In diesem Abschnitt wurde lediglich geändert.

### Geänderte Dateien

#### Template

##### [templates/facile/ component.php](https://github.com/astridx/boilerplate/blob/161043cf57d9bd06df1d23803db2cd1ed7aacbca/src/templates/facile/component.php)

Die Datei `component.php` zeigt lediglich den Content vom Type `component` an. Also den Hauptinhalt. Die Navigation und die Inhalte in Seitenleisten werden ausgelassen. Sinnvoll ist diese Anzeige besonders für Ausdrucke auf Papier. Ein minimaler Aufbau sieht wie folgt aus.

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

> [`<jdoc:include type="head" />`](https://docs.joomla.org/Jdoc_statements#jdoc:include) lädt Inhalte, die Erweiterungen benötigen und über spezielle Befehle einbinden. Das sind überwiegend Skripte und Styles.

##### [templates/facile/index.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

Ich hatte es bereits geschrieben: Die Datei `index.php` ist das Herzstück. Sie sorgt dafür, dass alles zusammenarbeitet. Im vorhergehenden Kapitel hatten wir die Joomla-eigenen Inhalte nicht integriert. Dies hole ich hier nach. Ein minimaler Aufbau, der Joomla Inhalte lädt, sieht wie folgt aus.

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

> Innerhalb des Header-Bereichs laden Joomla Templates normalerweise Header-Informationen mit `<jdoc: include type="head" />` aus der Joomla API. Wir nutzen dies weiter oben in der Datei `component.php`. So ist man auf der sicheren Seite. Dieser `jdoc:include`-Befehl fügt die normalen Header-Informationen ein, die eine Website benötigt. Ich nutze diesen Befehl hier nicht, weil ich in der Hauptansicht selbst auswählen möchte, was ich benötige.

Den Befehl `jdoc:include` finden wir noch öfter in der `index.php`. Beispielsweise sehen wir `<jdoc:include type="message" />`, damit funktionieren die Systemmeldungen. Wann immer Joomla dem Websitebetrachter etwas mitteilt, wird diese Zeile es auf dem Bildschirm anzeigen. Wenn man beispielsweise eine E-Mail über ein Kontaktformular sendet, wird man die Nachricht "Ihre Nachricht wurde erfolgreich gesendet" sehen.

Ein weiteres zu besprechendes Element ist `<jdoc:include type="component" />`. Dieses Element sollte nur einmal im `<body>`-Element erscheinen, um den Hauptinhalt der Seite in Bezug auf die aktuell angezeigte Seite darzustellen.

Das letzte erwähnenswerte Element ist `<jdoc:include type="modules" />`. Wie der Name schon sagt, werden hierüber Module eingebunden.

So, genug erklärt. Alle Inhalte sind eingebunden. Sie werden allerdings nicht schön dargestellt. Erschrecke nicht, wenn du später diese Version im Browser öffnest. Du siehst alle Inhalt in ungestylter Form.

##### [templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/compare/t35...t36#diff-764a4776e5fab4421733468c2fc87d67e612f3d84297fb83ed0495d4c04b27d2)

Über die Sprachdateien ist es möglich, die Positionen genau zu beschreiben. Beachte die Zeile `TPL_FACILE_POSITION_TOP-A="Area under banner"`. `TOP-A"` sagt einem Benutzer nicht viel. Mit `Area under banner` kann er etwas anfangen.

![Joomla Template erstellen - Modul Positionen besonders benennen](/images/j4x41x1.png)

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

Die der Datei `templateDetails.xml`werden die Modulpositionen angelegt, um beim Anlegen eines Modules als Position auswählbar zu sein. So ist ein Modul über den Befehl `jdoc:include` in der `index.php` einbindbar.

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

1. Installiere dein Template in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

3. Installiere die Beispieldaten, so dass du über die gleichen Voraussetzungen verfügst, wie ich.

![Joomla Template erstellen - Beispieldateien installieren](/images/j4x41x2.png)

4. Teste nun, ob die Beispieldateien korrekt angezeigt werde. Aktiviere dazu den Template Style Cassiopei und rufe die URL `joomla-cms4/index.php` auf. Wie du einen Template Style änderst, hatte ich im vorherigen Kapitel mit einem Bild gezeigt. Deine Ansicht sollte wie im folgenden Bild sein.

![Joomla Template erstellen - Ansicht in Cassiopeia](/images/j4x41x4.png)

5. Teste als Nächstes, ob unser Template Facile fehlerfrei arbeitet. Aktiviere dazu den Template Style Facile und rufe wieder die URL `joomla-cms4/index.php` auf. Deine Ansicht sollte wie im folgenden Bild sein.

![Joomla Template erstellen - Ansicht Facil ungestyled](/images/j4x41x3.png)

Du kannst dir die Modulpositionen im Frontend ansehen. Aktiviere dazu die Anzeige in der globalen Konfiguration im Backend und rufe dann die URL `joomla-cms4/index.php?tp=1` auf. Das Anhängsel `?tp=1` ist entscheidend.

![Joomla Template erstellen - Modul Positionen anzeigen - Backend](/images/j4x41x5.png)

![Joomla Template erstellen - Modul Positionen anzeigen - Frontend](/images/j4x41x6.png)

Das sieht nicht einladend aus. Da gebe ich dir recht. Deshalb peppen wir das Tempalte als nächstes mit CSS und JavaScipt auf und passen die Standard Ansichten von Joomla an.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t34...t35.diff

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)
[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)
