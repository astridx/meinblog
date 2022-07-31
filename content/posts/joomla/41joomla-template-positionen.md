---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-01-09
title: 'Template - Modul Positionen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-positionen
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Das Template soll die Joomla Inhalte aus Komponenten, Modulen und Plugins an verschiedenen Positionen dynamisch anzeigen. Wie dieses Ziel in Joomla erreicht wird, ist Thema dieses Kapitels. Also: Wie werden Modul Positionen im Joomla Template integriert.<!-- \index{Template!Positionen} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t35...t36)[^codeberg.org/astrid/j4examplecode/compare/t35...t36] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Wir werden Schritt für Schritt vorgehen. In diesem Teil fügen wir die Modulpositionen hinzu, damit Joomla Inhalte dynamisch anzeigt. Um das Design werden wir uns im nächsten Teil kümmern.

### Neue Dateien

In diesem Abschnitt wurde lediglich Dateien geändert und keine neuen hinzugefügt.

### Geänderte Dateien

#### Template

Bisher haben wir mehr oder weniger eine statische Website. In diesem Teil fügen wir mithilfe von Modulpositionen dynamisch Inhalte hinzu.

##### templates/facile/ component.php

Ich hatte es im vorherigen Teil schon erwähnt: Die Datei `component.php` zeigt lediglich Hauptinhalt an. Das ist der Content vom Type `component` an. Die Navigation und die Inhalte in Seitenleisten werden ausgelassen. Zum Testen hatten wir diese Datei angelegt. Bisher enthielt sie lediglich den statischen Text `Component`. Nun erweitern wir sie um ihre tatsächliche Aufgabe. Ein minimaler Aufbau sieht wie folgt aus.

[templates/facile/component.php](https://codeberg.org/astrid/j4examplecode/src/branch/t36/src/templates/facile/component.php)

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

Der wesentliche neue Eintrag ist `<jdoc:include type="component" />`. Der Befehl fügt den Hauptinhalt der aktuelle Seite ein.

Zusätzlich nutzen wir `<jdoc:include type="message" />` und `<jdoc:include type="head" />`. `<jdoc:include type="message" />` zeigt System- und Fehlermeldungen an, die während der Anfrage aufgetreten sind.

> Fragst du dich was System- und Fehlermeldungen genau sind? In Joomla werden diese mittels `$this->setMessage(Text::sprintf('MESSAGE_TEXT', $id), 'error');` in einem Objekt vom Typ [BaseController](https://github.com/joomla/joomla-cms/blob/2aed571ad8b58ec8f187e68d0e66ce04af88d475/libraries/src/MVC/Controller/BaseController.php#L1066)[^libraries/src/mvc/controller/basecontroller.php #l1066] generiert. In der Datei `administrator/components/com_content/src/Controller/DisplayController.php` findest du ein [Beispiel](https://github.com/joomla/joomla-cms/blob/91bb57b83a2f5a35693000d88a50a100b62144aa/administrator/components/com_content/src/Controller/DisplayController.php#L55)[^administrator/components/com_content/src/controller/displaycontroller.php#l55]. Dieses gibt den Text `You are not permitted to use that link to directly access that page.` im Frontend aus. Und zwar genau an der Stelle, an der `<jdoc:include type="message" />` im Template eingefügt ist.<!-- \index{Template!Fehlermeldungen} --><!-- \index{Template!Systemmeldungen} --><!-- \index{Systemmeldungen} -->

`<jdoc:include type="head" />` lädt Inhalte, die Erweiterungen benötigen und über spezielle Befehle einbinden. Das sind überwiegend Skripte und Styles.

> `<jdoc:include type="head" />`, `<jdoc:include type="message" />` und `<jdoc:include type="component" />` sollte nur einmal im `<body>` Element des Templates vorkommen. Weitere Informationen zu den Befehlen findest du in der Joomla Dokumentation [docs.joomla.org/Jdoc_statements/de](https://docs.joomla.org/Jdoc_statements/de)[^docs.joomla.org/jdoc_statements/de].

##### templates/facile/index.php

Du weißt es schon: Die Datei `index.php` ist das Herzstück des Templates. Sie sorgt dafür, dass alles zusammenarbeitet. Im vorhergehenden Kapitel hatten wir die Joomla-eigenen Inhalte nicht integriert. Dies hole ich hier nach. Ein minimaler Aufbau, welcher die Joomla Inhalte einfügt, sieht wie folgt aus.

[templates/facile/index.php](https://codeberg.org/astrid/j4examplecode/src/branch/t36/src/templates/facile/index.php)

```php {diff}
 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
 	<title>Titel</title>
   </head>
+
   <body>
-	Hallo Joomla
-  </body>
+  <header>
+	<div>
+	  <nav>
+	      <div>
+		     <jdoc:include type="modules" name="topbar" />
+	      </div>
+
+	      <div>
+		     <jdoc:include type="modules" name="below-topbar" />
+	      </div>
+
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

> Innerhalb des Header-Bereichs laden Joomla Templates Header-Informationen mit `<jdoc: include type="head" />` per Joomla API. Wir nutzen dies schon weiter oben in der Datei `component.php`. Der `jdoc:include`-Befehl fügt die notwendigen Header-Informationen ein. So ist man auf der sicheren Seite. Ich nutze diesen Befehl momentan in der index.php noch nicht, weil ich zeigen möchte, dass man auch selbst auswählen kann, was man benötigt.

Den Befehl `jdoc:include` finden wir an anderen Stellen in der `index.php`. Beispielsweise sehen wir `<jdoc:include type="message" />`, damit funktionieren die Systemmeldungen. Wann immer Joomla dem Websitebesucher etwas mitzuteilen hat, wird diese Zeile es auf dem Bildschirm anzeigen. Wenn man beispielsweise eine E-Mail über ein Kontaktformular sendet, wird man die Nachricht "Ihre Nachricht wurde erfolgreich gesendet" sehen.

Ein weiteres zu besprechendes Element ist `<jdoc:include type="component" />`. Dieses Element fügt den Hauptinhalt in die Site ein.

Das letzte erwähnenswerte Element ist `<jdoc:include type="modules" />`. Wie der Name schon sagt, werden hiermit Module eingebunden.

So, genug erklärt. Alle Inhalte sind über Modul Positionen integriert. Sie werden bisher nicht schön dargestellt. Erschrecke nicht, wenn du später diese Version im Browser öffnest. Du siehst alle Inhalt momentan noch in ungestylter Form.

> Unter Umständen ist es wichtig für dich, dass eine Modulposition nur dann eingefügt wird, wenn ein Modul darunter veröffentlicht ist, denn so lässt sich das unnötige Setzen von HTML-Elementen für einen Wrapper leichter verhindern. Wie man das erreicht, ist Thema des nächsten Kapitels. Oder du möchtest im Template optional festlegen, welche Modulposition verwendet wird. Ist es beispielsweise für dich wichtig, dass eine Sidebar komplett deaktiviert werden kann, erreichst du dies mit Hilfe von Parametern. Parameter sind Thema des übernächsten Kapitels.

##### templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini

Über die Sprachdateien ist es möglich, die Positionen genau zu beschreiben. Beachte die Zeile `TPL_FACILE_POSITION_TOP-A="Area under banner"`. `TOP-A"` sagt einem Benutzer nicht viel. Mit `Area under banner` kann er etwas anfangen.

![Joomla Template erstellen - Modul Positionen benennen](/images/j4x41x1.png)

[templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini](https://codeberg.org/astrid/j4examplecode/compare/t35...t36#diff-764a4776e5fab4421733468c2fc87d67e612f3d84297fb83ed0495d4c04b27d2)

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
+TPL_FACILE_POSITION_TOPBAR="Top Bar"
+TPL_FACILE_POSITION_BELOW-TOP="Below Top"
```

##### templates/facile/templateDetails.xml

In der Datei `templateDetails.xml` werden die Modulpositionen eingefügt, um beim Anlegen eines Modules als Position auswählbar zu sein. So ist ein Modul über den Befehl `jdoc:include` in der `index.php` einbindbar.

[src/templates/facile/templateDetails.xml](https://codeberg.org/astrid/j4examplecode/src/branch/8238130b429378f62cf6652b2f77255a62a7380d/src/templates/facile/templateDetails.xml)

```xml {diff}

 		<filename>template_thumbnail.png</filename>
 		<folder>language</folder>
 	</files>
+
+	<positions>
+		<position>topbar</position>
+		<position>below-top</position>
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

### Geänderte Dateien

In diesem Abschnitt wurden lediglich Dateien hinzugefügt.

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

3. Installiere die Beispieldaten, so dass du über die gleichen Voraussetzungen verfügst, wie ich.

![Joomla Template erstellen - Beispieldateien installieren](/images/j4x41x2.png)

4. Teste nun, ob die Beispieldateien korrekt angezeigt werden. Aktiviere dazu den Template Style Cassiopei und rufe die URL `joomla-cms4/index.php` auf. Wie du einen Template Style änderst, hatte ich im vorherigen Kapitel mit einem Bild gezeigt. Deine Ansicht sollte wie im folgenden Bild sein.

![Joomla Template erstellen - Ansicht in Cassiopeia](/images/j4x41x4.png)

5. Teste als nächstes, ob unser Template Facile fehlerfrei arbeitet. Aktiviere dazu den Template Style Facile und rufe wieder die URL `joomla-cms4/index.php` auf. Deine Ansicht sollte wie im folgenden Bild sein.

![Joomla Template erstellen - Ansicht Facil ungestyled](/images/j4x41x3.png)

Du kannst dir die Modulpositionen im Frontend ansehen. Aktiviere dazu die Anzeige in der globalen Konfiguration im Backend und rufe dann die URL `joomla-cms4/index.php?tp=1` auf. Das Anhängsel `?tp=1` ist entscheidend.

![Joomla Template erstellen - Modul Positionen anzeigen - Backend](/images/j4x41x5.png)

![Joomla Template erstellen - Modul Positionen anzeigen - Frontend](/images/j4x41x6.png)

Das sieht nicht einladend aus. Da gebe ich dir recht. Deshalb peppen wir das Template als nächstes mit CSS und JavaScipt auf und passen die Standard Ansichten von Joomla an.
<img src="https://vg08.met.vgwort.de/na/15b4bdca6616488599c7bc8d03f077c7" width="1" height="1" alt="">
