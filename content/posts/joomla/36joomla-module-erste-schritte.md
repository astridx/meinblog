---
date: 2021-01-05
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Module - Erste Schritte'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-module-erste-schritte
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wir erstellen ein Modul. Das ist ein Add-On zur Site, das die Funktionalität erweitert. Man verwendet es, wenn ein Inhalt nicht der Hauptinhalt ist und an unterschiedlichen Positionen dargestellt wird. Nebenbei ist es möglich, die Menüpunkte auszuwählen, unter denen das Modul sichtbar ist.

In Joomla gibt es eine Vielzahl von Modulen, an denen ich mich orientiere. Beispielsweise:

- Menüs (mod_menu)
- Login Formular (mod_login)
- und viele mehr.

Dieser Abschnitt erklärt, wie du das Grundgerüst für ein simples Modul erstellst. Dieses gibt im ersten Schritt lediglich einen Text aus. Darauf bauen wir im weiteren Verlauf auf.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t30...t31) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt fügen wir ein Module hinzu. Es gibt einige grundlegende Dateien, die im Standardmuster der Modulentwicklung verwendet werden. Diese erstellen wir in diesem Teil.

### Neue Dateien

#### Module

##### [src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini)

Diese Datei stellt die Texte für für die allgemeine Übersetzung bereit bereit.

```xml
<!-- https://raw.githubusercontent.com/astridx/boilerplate/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini -->

MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"
```

##### [src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini)

Diese Datei stellt die Texte für Menü und Installationsroutine bereit.

```xml
<!-- https://raw.githubusercontent.com/astridx/boilerplate/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini -->

MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"

```

##### [src/modules/mod_foo/mod_foo.php](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/mod_foo.php)

`mod_foo.php` ist der Haupteinstiegspunkt ins Modul. Die Datei führt die Initialisierungsroutinen aus, ruft Hilfsroutinen auf, um alle erforderlichen Daten zu erfassen, und ruft das Template auf, in dem die Modulausgabe angezeigt wird.

```php
// https://github.com/astridx/boilerplate/raw/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/mod_foo.php

<?php
/**
/**
 * @package     Joomla.Administrator
 * @subpackage  mod_foo
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;

require ModuleHelper::getLayoutPath('mod_foo', $params->get('layout', 'default'));

```

> In Joomla 3x war eine Zeile wie `$ moduleclass_sfx = htmlspecialchars ($ params-> get (‚moduleclass_sfx‘));` notwendig. Diese Zeile ist nicht mehr erforderlich. Siehe [PR 17447](https://github.com/joomla/joomla-cms/pull/17447).

##### [src/modules/mod_foo/mod_foo.xml](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/mod_foo.xml)

`mod_foo.xml` definiert die Dateien, die von der Installationsroutine kopiert werden und gibt Konfigurationsparameter für das Modul an. Du kennst dies bereits von den vorher erstellten Erweiterungen.

```xml
<!-- https://raw.githubusercontent.com/astridx/boilerplate/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/mod_foo.xml -->

<?xml version="1.0" encoding="utf-8"?>
<extension type="module" client="site" method="upgrade">
	<name>MOD_FOO</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<version>__BUMP_VERSION__</version>
	<description>MOD_FOO_XML_DESCRIPTION</description>

	<files>
		<filename module="mod_foo">mod_foo.php</filename>
		<folder>tmpl</folder>
		<folder>language</folder>
		<filename>mod_foo.xml</filename>
	</files>
</extension>

```

##### [src/modules/mod_foo/tmpl/default.php](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/tmpl/default.php)

`default.php` ist das Template. Diese Datei nimmt die von `mod_foo.php` gesammelten Daten und generiert den HTML-Code, der auf der Seite angezeigt wird.

```php
// https://github.com/astridx/boilerplate/raw/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/tmpl/default.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  mod_foo
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

echo '[PROJECT_NAME]';

```

> Beachte: In der Templatedatei ist es möglich, alle in `mod_foo.php` definierten Variablen zu verwenden.

### Geänderte Dateien

Es gibt keine geänderten Dateien.

## Teste dein Joomla-Module

1. Installiere dein Modul in Joomla! Version 4, um es zu testen. Am Anfang ist es das Einfachste, die Dateien manuell an Ort und Stelle zu kopieren:

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla! 4 Installation.

2. Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Öffne dazu das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu dem eben kopierten Template. Wähle diesen aus und klicke auf die Schaltfläche `Install`.

3. Teste als Nächstes, ob dein Modul fehlerfrei arbeitet. Öffne das Menü `Content | Site Modules` und klicke im sich öffnenden Fenster in der Werkzeugleiste `New`.

![Joomla Modul testen](/images/j4x36x1.png)

4. Trage einen Titel im entsprechenden Feld ein und wähle eine Position. Stelle im Tabulator `Menu Assignment` sicher, dass das Modul auf allen Seiten angezeigt wird. Klicke am Ende in der Werkzeugleiste die Schaltfläche `Save`.

![Joomla Modul erstellen](/images/j4x36x3.png)

5. Und das ist es. Wechsel in die Frontendansicht deines Modules und überzeuge dich davon, dass alles richtig angezeigt wird.

![Joomla Modul im Frontend](/images/j4x36x4.png)

> Alternativ ist es möglich, dass Modul in einen Beitrag einzufügen. ![Joomla Modul im Frontend](/images/j4x36x5.png)

Wir haben eine solide Grundlage für die weiteren Schritte.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t30...t31.diff

diff --git a/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini b/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini
new file mode 100644
index 00000000..e20c4602
--- /dev/null
+++ b/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini
@@ -0,0 +1,2 @@
+MOD_FOO="[PROJECT_NAME]"
+MOD_FOO_XML_DESCRIPTION="Foo Module"
diff --git a/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini b/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini
new file mode 100644
index 00000000..e20c4602
--- /dev/null
+++ b/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini
@@ -0,0 +1,2 @@
+MOD_FOO="[PROJECT_NAME]"
+MOD_FOO_XML_DESCRIPTION="Foo Module"
diff --git a/src/modules/mod_foo/mod_foo.php b/src/modules/mod_foo/mod_foo.php
new file mode 100644
index 00000000..918a2313
--- /dev/null
+++ b/src/modules/mod_foo/mod_foo.php
@@ -0,0 +1,15 @@
+<?php
+/**
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  mod_foo
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Helper\ModuleHelper;
+
+require ModuleHelper::getLayoutPath('mod_foo', $params->get('layout', 'default'));
diff --git a/src/modules/mod_foo/mod_foo.xml b/src/modules/mod_foo/mod_foo.xml
new file mode 100644
index 00000000..482aa45e
--- /dev/null
+++ b/src/modules/mod_foo/mod_foo.xml
@@ -0,0 +1,19 @@
+<?xml version="1.0" encoding="utf-8"?>
+<extension type="module" client="site" method="upgrade">
+	<name>MOD_FOO</name>
+	<creationDate>[DATE]</creationDate>
+	<author>[AUTHOR]</author>
+	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
+	<authorUrl>[AUTHOR_URL]</authorUrl>
+	<copyright>[COPYRIGHT]</copyright>
+	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
+	<version>__BUMP_VERSION__</version>
+	<description>MOD_FOO_XML_DESCRIPTION</description>
+
+	<files>
+		<filename module="mod_foo">mod_foo.php</filename>
+		<folder>tmpl</folder>
+		<folder>language</folder>
+		<filename>mod_foo.xml</filename>
+	</files>
+</extension>
diff --git a/src/modules/mod_foo/tmpl/default.php b/src/modules/mod_foo/tmpl/default.php
new file mode 100644
index 00000000..c2256e7e
--- /dev/null
+++ b/src/modules/mod_foo/tmpl/default.php
@@ -0,0 +1,12 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  mod_foo
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+\defined('_JEXEC') or die;
+
+echo '[PROJECT_NAME]';

```

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)
