---
date: 2020-01-06
title: 'Module - Namespace und Helper'
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

```php
// https://github.com/astridx/boilerplate/compare/t31...t32.diff
}
```

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

### Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)
