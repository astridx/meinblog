---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-05-16
title: 'Module - Helper'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-module-namespace-und-helper
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Wir ergänzen und Helper.<!-- \index{Modul!Helper} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t31...t32)[^codeberg.org/astrid/j4examplecode/compare/t31...t32] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### Module

Die Logik im Modul ist unter Umständen komplex. Deshalb ist gut, den Code übersichtlich zu strukturieren. Dies geschieht mittels Helper-Dateien. Diese legen wir im Verzeichnis `Helper` an.

<!-- prettier-ignore -->
##### modules/mod_foo/Helper/FooHelper.php

> Ich habe die Datei allgemein `FooHelper` benannt. Gute Stil ist es, ihr einen sprechenden Namen zu geben. Jede Hilfsdatei hat eine spezielle Aufgabe und nach ihr sollte sie benannt werden. Die Datei, die die neuesten Artikel lädt, heißt beispielsweise `ArticlesLatestHelper`. So erkennt man auf den ersten Blick, was in der Datei steckt.

Um unkompliziert auf die Datei zuzugreifen, ergänzen wir den Namespace `namespace FooNamespace\Module\Foo\Site\Helper;`.

[modules/mod_foo/ Helper/FooHelper.php](https://codeberg.org/astrid/j4examplecode/src/branch/t32/src/modules/mod_foo/src/Helper/FooHelper.php)

```php
// https://codeberg.org/astrid/j4examplecode/raw/branch/t32/src/modules/mod_foo/src/Helper/FooHelper.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_foo
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Module\Foo\Site\Helper;

\defined('_JEXEC') or die;

/**
 * Helper for mod_foo
 *
 * @since  __BUMP_VERSION__
 */
class FooHelper
{
	/**
	 * Retrieve foo test
	 *
	 * @param   Registry        $params  The module parameters
	 * @param   CMSApplication  $app     The application
	 *
	 * @return  array
	 */
	public static function getText()
	{
		return 'FooHelpertest';
	}
}

```

### Geänderte Dateien

<!-- prettier-ignore -->
##### modules/mod_foo/services/provider.php

We add the provider for the helper.

```php {diff}
     public function register(Container $container)
     {
         $container->registerServiceProvider(new ModuleDispatcherFactory('\\FooNamespace\\Module\\Foo'));
-
+        $container->registerServiceProvider(new HelperFactory('\\FooNamespace\\Module\\Foo\\Site\\Helper'));
+ 
         $container->registerServiceProvider(new Module());
     }
 };
```

<!-- prettier-ignore -->
##### modules/mod_foo/src/Dispatcher/Dispatcher.php

Der `Dispatcher` sammelt alle Variablen, um sie später im Layout `tmpl/default.php` zu verwenden. Hier ergänzen wir die Helper-Datei.

```php {diff}

 namespace FooNamespace\Module\Foo\Site\Dispatcher;
 
 use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;
+use Joomla\CMS\Helper\HelperFactoryAwareInterface;
+use Joomla\CMS\Helper\HelperFactoryAwareTrait;
 
 \defined('_JEXEC') or die;
 

-class Dispatcher extends AbstractModuleDispatcher
+class Dispatcher extends AbstractModuleDispatcher implements HelperFactoryAwareInterface
 {
+    use HelperFactoryAwareTrait;
+

     {
         $data = parent::getLayoutData();
 
+        $data['text'] = $this->getHelperFactory()->getHelper('FooHelper')->getText();
+
         return $data;
     }
 }

```

<!-- prettier-ignore -->
##### modules/mod_foo/tmpl/default.php

Im Layout greifen wir abschließen auf die Variable zu. Die Logik zum Errechnen des Variablenwertes ist gekapselt. So bleibt das Layout übersichtlich. Wir fügen hier lediglich den Texgt `$test` ein. Wenn wir genauer wissen möchten, was hinter `$test` steckt, dann sehen wir im Helper nach.

```php {diff}
\defined('_JEXEC') or die;

-echo '[PROJECT_NAME]';
+echo '[PROJECT_NAME]' . $text;
```

## Teste dein Joomla-Module

1. Installiere das Modul in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla 4 Installation.

Installiere dein Module wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Überprüfe, ob der über die Funktion `FooHelper::getText()` errechnete Text im Frontend angezeigt wird.

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)[^docs.joomla.org/j4.x:creating_a_simple_module/de]
[GHSVS Demo Modul](https://github.com/GHSVS-de/mod_demoghsvs)[^github.com/GHSVS-de/mod_demoghsvs]
<img src="https://vg08.met.vgwort.de/na/5c01f557afd24e3e8c499ba5f1286700" width="1" height="1" alt="">
