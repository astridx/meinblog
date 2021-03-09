---
date: 2021-01-07
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Module - Parameter'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-module-parameter
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---



Über Parameter ist das Modul für Endbenutzer flexibel anpassbar.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t32...t33) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt fügen wir Parameter zum Modul hinzu.

### Neue Dateien

In diesem Teil wurden lediglich Dateien geändert. Es gibt keine neuen Dateien.

### Geänderte Dateien

#### Module

##### [src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini](https://github.com/astridx/boilerplate/compare/t32...t33#diff-9c4225bbdf2ea51af1036568f0f1e8817ecc47e86d001366d2278a2e7281281a)

[src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini](https://github.com/astridx/boilerplate/blob/b8c783812c9acf66a6c0c0a534d5d43b987510c5/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini)

Die Beschriftung des Parameters soll sich an die aktive Sprache anpassen. Aus diesem Grund nutzen wir die Sprachdatei.

> Beachte `COM_MODULES_FOOPARAMS_FIELDSET_LABEL="Foo Parameter"`

```php {diff}
MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"
+MOD_FOO_FIELD_URL_LABEL="URL"
+COM_MODULES_FOOPARAMS_FIELDSET_LABEL="Foo Parameter"

```

##### [src/modules/mod_foo/mod_foo.php](https://github.com/astridx/boilerplate/compare/t32...t33#diff-43348bdc6a37cd697897d234acd68a56c191ded22f30b54aa8de2e9c099b9c84)

In der Einstiegsdatei des Moduls prüfen wir, auf welchen Wert der Parameter gestzt ist und laden ihn in eine Variable.

[src/modules/mod_foo/mod_foo.php]()

```php {diff}
$test  = FooHelper::getText();

+$url = $params->get('domain');
+
 require ModuleHelper::getLayoutPath('mod_foo', $params->get('layout', 'default'));
```

##### [src/modules/mod_foo/mod_foo.xml](https://github.com/astridx/boilerplate/compare/t32...t33#diff-c111dcc16cb14017dbacf97ab7d495ac6e7225b2b2097774adc23a977d5cc3c3)

Im Manifest fügen wir neben dem aktuellen noch weitere Paramter hinzu, nämlich die Standardparameter. Die Logik für diese wird von Joomla für alle Module übernommen.

[src/modules/mod_foo/mod_foo.xml](https://github.com/astridx/boilerplate/blob/b8c783812c9acf66a6c0c0a534d5d43b987510c5/src/modules/mod_foo/mod_foo.xml)

```php {diff}
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
+			<fieldset name="fooparams">
+				<field
+					name="domain"
+					type="url"
+					label="MOD_FOO_FIELD_URL_LABEL"
+					filter="url"
+				/>
+			</fieldset>
+		</fields>
+	</config>
 </extension>

```

> Verwende `<fieldset name="basic">`. um die Parameter im ersten Tabulator anzuzeigen.

Neben den Parametern die ein Entwickler in sein Modul einfügt, gib es Standardparameter, die Joomla selbst handhabt. ![Joomla Modul testen](/images/j4x38x1.png)

##### [src/modules/mod_foo/tmpl/default.php](https://github.com/astridx/boilerplate/compare/t32...t33#diff-5dc488d0a39079a73583a37bf1b465fcf99ca183970958084a2eac52f723a4ba)

In der Templatedatei fügen wie die Variable ein, in der der Paramterwert gespeichert ist.

[src/modules/mod_foo/tmpl/default.php](https://github.com/astridx/boilerplate/blob/b8c783812c9acf66a6c0c0a534d5d43b987510c5/src/modules/mod_foo/tmpl/default.php)

```php {diff}
 \defined('_JEXEC') or die;

-echo '[PROJECT_NAME]' . $test;
+echo '[PROJECT_NAME]' . $test . '<br />' . $url;

```

## Teste dein Joomla-Module

1. Installiere das Modul in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Überprüfe das Vorhandensein des Parameters im Backend.

![Joomla Modul testen](/images/j4x38x4.png)

3. Überzeuge dich davon, dass der Wert des Parameters bei der Anzeige im Frontend berücksichtigt wird.

![Joomla Modul testen](/images/j4x38x2.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// github.com/astridx/boilerplate/compare/t32...t33.diff

```

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)
