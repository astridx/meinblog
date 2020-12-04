---
date: 2021-01-07
title: 'Module - Parameter'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-module-parameter
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wir ergänzen Namespace und Helper.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t32...t33) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt bearbeiten wir die Komponenten und fügen ein Plugin hinzu.

### Neue Dateien

#### Module

##### []()

> Parameter aus einer Komponente nutzen.

```php

```

## Teste dein Joomla-Module

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla! 4 Installation.

Installiere dein Module wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Namespaces für dich. Da eine Datei und Namespaces hinzugekommen sind, ist dies erforderlich.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t32...t33.diff

diff --git a/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini b/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini
index e20c4602..e3dc5fc4 100644
--- a/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini
+++ b/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini
@@ -1,2 +1,3 @@
 MOD_FOO="[PROJECT_NAME]"
 MOD_FOO_XML_DESCRIPTION="Foo Module"
+MOD_FOO_FIELD_URL_LABEL="URL"
diff --git a/src/modules/mod_foo/mod_foo.php b/src/modules/mod_foo/mod_foo.php
index 153977ef..4763eb19 100644
--- a/src/modules/mod_foo/mod_foo.php
+++ b/src/modules/mod_foo/mod_foo.php
@@ -15,4 +15,6 @@

 $test  = FooHelper::getText();

+$url = $params->get('domain');
+
 require ModuleHelper::getLayoutPath('mod_foo', $params->get('layout', 'default'));
diff --git a/src/modules/mod_foo/mod_foo.xml b/src/modules/mod_foo/mod_foo.xml
index afd93ad1..826039ad 100644
--- a/src/modules/mod_foo/mod_foo.xml
+++ b/src/modules/mod_foo/mod_foo.xml
@@ -13,8 +13,63 @@
 	<files>
 		<filename module="mod_foo">mod_foo.php</filename>
 		<folder>tmpl</folder>
-		<folder>Helper</folder>
+		<folder>Helper</folder>
 		<folder>language</folder>
 		<filename>mod_foo.xml</filename>
 	</files>
+	<config>
+		<fields name="params">
+			<fieldset name="basic">
+				<field
+					name="domain"
+					type="url"
+					label="MOD_FOO_FIELD_URL_LABEL"
+					filter="url"
+				/>
+			</fieldset>
+			<fieldset name="advanced">
+				<field
+					name="layout"
+					type="modulelayout"
+					label="JFIELD_ALT_LAYOUT_LABEL"
+					class="custom-select"
+				/>
+
+				<field
+					name="moduleclass_sfx"
+					type="textarea"
+					label="COM_MODULES_FIELD_MODULECLASS_SFX_LABEL"
+					rows="3"
+				/>
+
+				<field
+					name="cache"
+					type="list"
+					label="COM_MODULES_FIELD_CACHING_LABEL"
+					default="1"
+					filter="integer"
+					validate="options"
+				>
+					<option value="1">JGLOBAL_USE_GLOBAL</option>
+					<option value="0">COM_MODULES_FIELD_VALUE_NOCACHING</option>
+				</field>
+
+				<field
+					name="cache_time"
+					type="number"
+					label="COM_MODULES_FIELD_CACHE_TIME_LABEL"
+					default="900"
+					filter="integer"
+				/>
+
+				<field
+					name="cachemode"
+					type="hidden"
+					default="static"
+				>
+					<option value="static"></option>
+				</field>
+			</fieldset>
+		</fields>
+	</config>
 </extension>
diff --git a/src/modules/mod_foo/tmpl/default.php b/src/modules/mod_foo/tmpl/default.php
index 70d865c4..2fc95b64 100644
--- a/src/modules/mod_foo/tmpl/default.php
+++ b/src/modules/mod_foo/tmpl/default.php
@@ -9,4 +9,4 @@

 \defined('_JEXEC') or die;

-echo '[PROJECT_NAME]' . $test;
+echo '[PROJECT_NAME]' . $test . '<br />' . $url;

```

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)
