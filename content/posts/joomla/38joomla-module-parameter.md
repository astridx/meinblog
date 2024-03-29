---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-05-16
title: 'Module - Parameter'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-module-parameter
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Über [Parameter](<https://de.wikipedia.org/wiki/Parameter_(Informatik)>) ist das Joomla-Modul für Endbenutzer flexibel anpassbar. Parameter sind Übergabewerte, mit deren Hilfe Joomla auf die Verarbeitung bestimmter Werte eingestellt wird. Anders ausgedrückt sind Parameter extern gesetzte Einflussfaktoren. Sie werden verwendet, um dem Modul von außen mitzuteilen, welche Daten wie verarbeitet werden sollen.<!-- \index{Modul!Parameter} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t32...t33)[^codeberg.org/astrid/j4examplecode/compare/t32...t33] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt fügen wir Parameter zum Modul hinzu.

### Neue Dateien

In diesem Teil wurden lediglich Dateien geändert. Es gibt keine neuen Dateien.

### Geänderte Dateien

#### Modul

<!-- prettier-ignore -->
##### modules/mod_foo/language/en-GB/mod_foo.ini

[modules/mod_foo/language/en-GB/mod_foo.ini](https://codeberg.org/astrid/j4examplecode/src/branch/b8c783812c9acf66a6c0c0a534d5d43b987510c5/src/modules/mod_foo/language/en-GB/mod_foo.ini)

Die Beschriftung des Parameters im Administrationsbereich soll sich an die aktive Sprache anpassen. Aus diesem Grund nutzen wir die Sprachdatei.

> Wunderst du dich über den Präfix `COM_` in `COM_MODULES_FOOPARAMS_FIELDSET_LABEL`? Der Sprachstring wird von Joomla automatisch erstellt, weil ein Fieldset mit dem Namen `fooparams` hinzukommt.

```php {diff}
MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"
+MOD_FOO_FIELD_URL_LABEL="URL"
+COM_MODULES_FOOPARAMS_FIELDSET_LABEL="Foo Parameter"

```

<!-- prettier-ignore -->
##### modules/mod_foo/mod_foo.xml

Im Manifest fügen wir den neuen Paramter hinzu, so dass dieser im Joomla Backend bearbeitbar ist.

[modules/mod_foo/ mod_foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/b8c783812c9acf66a6c0c0a534d5d43b987510c5/src/modules/mod_foo/mod_foo.xml)

```php {diff}
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

> Verwende `<fieldset name="basic">`. um die Parameter im ersten sich unmittelbar öffnenden Tabulator anzuzeigen.

Neben den Parametern, die ein Entwickler in sein Modul einfügt, gib es Standardparameter, die Joomla selbst handhabt. Zum Beispiel `/administrator/components/com_modules/forms/advanced.xml`.

![Joomla Modul Parameter](/images/j4x38x1.png)

<!-- prettier-ignore -->
##### modules/mod_foo/tmpl/default.php

In der moduleigenen Template-Datei können wir nun auf den Wert des Parameters zugreifen. Im nachfolgenden Beispiel geben wir den Wert als Text aus. Meist wird ein Parameter in einer komplexeren Art verwendet, zum Beispiel innerhalb von Kontrollstrukturen wie If-Anweisungen oder Schleifen.

> Ein Beispiel für die komplexere Anwendung eines Parameters ist eine digitale Landkarte, auf der anhand von Parametern Steuerelemente wie `Lokalisiere mich` oder eine Auswahl des Kartentyps ermöglicht wird.

[modules/mod_foo/tmpl/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/b8c783812c9acf66a6c0c0a534d5d43b987510c5/src/modules/mod_foo/tmpl/default.php)

```php {diff}
 \defined('_JEXEC') or die;

-echo '[PROJECT_NAME]' . $test;
+echo '[PROJECT_NAME]' . $test . '<br />' . $url;

```

<!-- prettier-ignore -->
##### modules/mod_foo/src/Dispatcher/Dispatcher.php

Der `Dispatcher` sammelt alle Variablen, um sie später im Layout `tmpl/default.php` zu verwenden. Hier ergänzen wir den Parameter.

```php {diff}

     {
         $data = parent::getLayoutData();
 
-        $data['text'] = $this->getHelperFactory()->getHelper('FooHelper')->getText();
+        $data['text'] = $this->getHelperFactory()->getHelper('FooHelper')->getText($data['params']);
 
         return $data;
     }
```

<!-- prettier-ignore -->
##### modules/mod_foo/src/Helper/FooHelper.php

```php {diff}
 namespace FooNamespace\Module\Foo\Site\Helper;
 
+use Joomla\Registry\Registry;
+
 \defined('_JEXEC') or die;
 
-       public function getText()
+       public function getText(Registry $params)
        {
-               return ' FooHelpertest';
+               $url = $params->get('domain', '-');
+
+               return ' FooHelpertest: ' . $url;
        }
 }

```

## Teste dein Joomla-Module

1. Installiere das Modul in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Überprüfe das Vorhandensein des Parameters im Backend.

![Joomla Modul testen](/images/j4x38x4.png)

3. Überzeuge dich davon, dass der Wert des Parameters bei der Anzeige im Frontend berücksichtigt wird.

![Joomla Modul testen](/images/j4x38x2.png)

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)[^docs.joomla.org/j4.x:creating_a_simple_module/de]
<img src="https://vg08.met.vgwort.de/na/b1b369a8350048bcb862ba7bc25cfa44" width="1" height="1" alt="">
