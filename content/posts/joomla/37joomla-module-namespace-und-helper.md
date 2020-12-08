---
date: 2021-01-06
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Module - Namespace und Helper'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-module-namespace-und-helper
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wir ergänzen Namespace und Helper.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t31...t32) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### Module

##### [src/modules/mod_foo/Helper/FooHelper.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/Helper/FooHelper.php)

```php
namespace FooNamespace\Module\Foo\Site\Helper;

\defined('_JEXEC') or die;

class FooHelper
{
  	public static function getText()
	{
		return 'FooHelpertest';
	}
}
```

### Geänderte Dateien

##### [src/modules/mod_foo/mod_foo.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/mod_foo.php)

```php
...
use FooNamespace\Module\Foo\Site\Helper\FooHelper;
...
...
$test  = FooHelper::getText();
...

```

##### [src/modules/mod_foo/mod_foo.xml](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/mod_foo.xml)

```xml
...
<namespace>FooNamespace\Module\Foo</namespace>
...
...
	<files>
...
		<folder>Helper</folder>
...
```

##### [src/modules/mod_foo/tmpl/default.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/tmpl/default.php)

```php
...
'[PROJECT_NAME]' . $test;
```

> Eigentlich gibt es keine Helper. Wie meine ich das?

## Teste dein Joomla-Module

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla! 4 Installation.

Installiere dein Module wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Namespaces für dich. Da eine Datei und Namespaces hinzugekommen sind, ist dies erforderlich.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t31...t32.diff

diff --git a/src/modules/mod_foo/Helper/FooHelper.php b/src/modules/mod_foo/Helper/FooHelper.php
new file mode 100644
index 00000000..847d403b
--- /dev/null
+++ b/src/modules/mod_foo/Helper/FooHelper.php
@@ -0,0 +1,33 @@
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  mod_foo
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Module\Foo\Site\Helper;
+
+\defined('_JEXEC') or die;
+
+/**
+ * Helper for mod_foo
+ *
+ * @since  __BUMP_VERSION__
+ */
+class FooHelper
+{
+	/**
+	 * Retrieve foo test
+	 *
+	 * @param   Registry        $params  The module parameters
+	 * @param   CMSApplication  $app     The application
+	 *
+	 * @return  array
+	 */
+	public static function getText()
+	{
+		return 'FooHelpertest';
+	}
+}
diff --git a/src/modules/mod_foo/mod_foo.php b/src/modules/mod_foo/mod_foo.php
index 918a2313..153977ef 100644
--- a/src/modules/mod_foo/mod_foo.php
+++ b/src/modules/mod_foo/mod_foo.php
@@ -11,5 +11,8 @@
 \defined('_JEXEC') or die;

 use Joomla\CMS\Helper\ModuleHelper;
+use FooNamespace\Module\Foo\Site\Helper\FooHelper;
+
+$test  = FooHelper::getText();

 require ModuleHelper::getLayoutPath('mod_foo', $params->get('layout', 'default'));
diff --git a/src/modules/mod_foo/mod_foo.xml b/src/modules/mod_foo/mod_foo.xml
index 482aa45e..afd93ad1 100644
--- a/src/modules/mod_foo/mod_foo.xml
+++ b/src/modules/mod_foo/mod_foo.xml
@@ -9,10 +9,11 @@
 	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
 	<version>__BUMP_VERSION__</version>
 	<description>MOD_FOO_XML_DESCRIPTION</description>
-
+	<namespace>FooNamespace\Module\Foo</namespace>
 	<files>
 		<filename module="mod_foo">mod_foo.php</filename>
 		<folder>tmpl</folder>
+		<folder>Helper</folder>
 		<folder>language</folder>
 		<filename>mod_foo.xml</filename>
 	</files>
diff --git a/src/modules/mod_foo/tmpl/default.php b/src/modules/mod_foo/tmpl/default.php
index c2256e7e..70d865c4 100644
--- a/src/modules/mod_foo/tmpl/default.php
+++ b/src/modules/mod_foo/tmpl/default.php
@@ -9,4 +9,4 @@

 \defined('_JEXEC') or die;

-echo '[PROJECT_NAME]';
+echo '[PROJECT_NAME]' . $test;

```

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)
