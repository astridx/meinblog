---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-05-16
title: 'Module - Erste Schritte'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-module-erste-schritte
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Wir erstellen ein Modul. Das ist ein Add-On, welches die Anzeige des eigentlichen Inhalts erweitert. Man verwendet es, wenn ein Inhalt nicht der Hauptinhalt ist und an unterschiedlichen Positionen dargestellt wird. Nebenbei ist es möglich, die Menüpunkte auszuwählen, unter denen das Modul sichtbar ist.<!-- \index{Modul} --><!-- \index{Modul!Namespace} -->

In Joomla gibt es eine Vielzahl von Modulen, an denen ich mich orientiere. Beispielsweise:

- Menüs (mod_menu)
- Login Formular (mod_login)
- und viele mehr.

Dieser Abschnitt erklärt, wie du das Grundgerüst für ein simples Modul erstellst. Dieses gibt im ersten Schritt lediglich einen Text aus. Darauf bauen wir im weiteren Verlauf auf. Die Struktur der Module wurde in Joomla 4.3 überarbeitet. Ich nutze hier die neue Vorgehensweise. Beim Erarbeiten habe ich mich an dem Core Module `mod_articles_latest` orientiert.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t30a...t31)[^codeberg.org/astrid/j4examplecode/compare/t30...t31] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt fügen wir ein Module hinzu. Es gibt einige grundlegende Dateien, die im Standardmuster der Modulentwicklung verwendet werden. Diese erstellen wir in diesem Teil.

### Neue Dateien

#### Module

<!-- prettier-ignore -->
##### modules/mod_foo/language/en-GB/mod_foo.ini

Diese Datei stellt die Texte der Übersetzung allgemein bereit.

```xml
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t31/src/modules/mod_foo/language/en-GB/mod_foo.ini -->

MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"
```

<!-- prettier-ignore -->
##### modules/mod_foo/language/en-GB/mod_foo.sys.ini

Diese Datei stellt die Texte für Menü und Installationsroutine bereit.

```xml
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t31/src/modules/mod_foo/language/en-GB/mod_foo.sys.ini -->

MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"

```

<!-- prettier-ignore -->
##### modules/mod_foo/services/provider.php

`provider.php` ist der Haupteinstiegspunkt ins Modul. Die Datei führt die registriert die Provider, Initialisierungsroutinen aus, ruft Hilfsroutinen auf, um alle erforderlichen Daten zu erfassen, und ruft das Template auf, in dem die Modulausgabe angezeigt wird. Die Datei wird in einem neuen Ordner erstellt, der außerhalb des "src"-Verzeichnisses liegt. Dieser Ordner und die Datei müssen in Kleinbuchstaben benannt werden und folgen der neuen Struktur. Der vordefinierte Namespace, der jeweils zwei Rückwärtsstriche vor den Elementen des "Pfads" hat, ist ebenfalls angegeben. Er ist identisch mit dem Master-Namespace des Moduls, der in der Manifest-Datei angegeben ist.

Die use-Zeilen definieren Joomla-Klassen, die im weiteren Code verwendet werden. Es ist wichtig, dass sie vorhanden sind, da sonst Fehlermeldungen angezeigt werden. Joomla lädt die "provider.php" magisch, wenn wir uns an die Konventionen der Grundstruktur halten.

```php
// https://codeberg.org/astrid/j4examplecode/raw/branch/t31/src/modules/mod_foo/services/provider.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  mod_foo
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Extension\Service\Provider\HelperFactory;
use Joomla\CMS\Extension\Service\Provider\Module;
use Joomla\CMS\Extension\Service\Provider\ModuleDispatcherFactory;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;

/**
 * The foo module service provider.
 *
 * @since  __BUMP_VERSION__
 */
return new class () implements ServiceProviderInterface {
    /**
     * Registers the service provider with a DI container.
     *
     * @param   Container  $container  The DI container.
     *
     * @return  void
     *
     * @since   __BUMP_VERSION__
     */
    public function register(Container $container)
    {
        $container->registerServiceProvider(new ModuleDispatcherFactory('\\FooNamespace\\Module\\Foo'));

        $container->registerServiceProvider(new Module());
    }
};

```

<!-- prettier-ignore -->
##### modules/mod_foo/src/Dispatcher/Dispatcher.php

The `Dispatcher` collects the variables that we can use later in the module layout `tmpl/default.php`. In the next chapter we will see how helper files are used here.

```php
// https://codeberg.org/astrid/j4examplecode/raw/branch/t31/src/modules/mod_foo/src/Dispatcher/Dispatcher.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  mod_foo
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Module\Foo\Site\Dispatcher;

use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;

\defined('_JEXEC') or die;

/**
 * Dispatcher class for mod_foo
 *
 * @since  __BUMP_VERSION__
 */
class Dispatcher extends AbstractModuleDispatcher
{
    /**
     * Returns the layout data.
     *
     * @return  array
     *
     * @since   __BUMP_VERSION__
     */
    protected function getLayoutData()
    {
        $data = parent::getLayoutData();

        return $data;
    }
}

```


<!-- prettier-ignore -->
##### modules/mod_foo/mod_foo.xml

`mod_foo.xml` definiert die Dateien, die von der Installationsroutine kopiert werden und gibt Konfigurationsparameter für das Modul an. Du kennst dies bereits von den vorher erstellten Erweiterungen.

```xml
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t31/src/modules/mod_foo/mod_foo.xml -->

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
	<namespace path="src">FooNamespace\Module\Foo</namespace>
	<files>
		<folder module="mod_foo">services</folder>
		<folder>src</folder>
		<folder>tmpl</folder>
		<folder>language</folder>
	</files>
</extension>

```

<!-- prettier-ignore -->
##### modules/mod_foo/tmpl/default.php

`default.php` ist das Template. Diese Datei nimmt die von `mod_foo.php` gesammelten Daten und generiert den HTML-Code, der auf der Seite angezeigt wird. `echo '[PROJECT_NAME]';` sorgt dafür, dass der Name des Projekts im Frontend an der Position angezeigt wird, an der das Modul veröffentlicht ist.

```php
// https://codeberg.org/astrid/j4examplecode/raw/branch/t31/src/modules/mod_foo/tmpl/default.php

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

1. Installiere dein Modul in Joomla Version 4, um es zu testen. Am Anfang ist es das Einfachste, die Dateien manuell an Ort und Stelle zu kopieren:

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla 4 Installation.

2. Installiere dein Modul wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Öffne dazu das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu dem eben kopierten Modul. Wähle diesen aus und klicke auf die Schaltfläche `Install`.

3. Teste als nächstes, ob dein Modul fehlerfrei arbeitet. Öffne das Menü `Content | Site Modules` und klicke in der Werkzeugleiste `New`.

![Joomla Modul testen](/images/j4x36x1.png)

![Joomla Modul testen](/images/j4x36x1b.png)

4. Trage einen Titel im entsprechenden Feld ein und wähle eine Position. Stelle im Tabulator `Menu Assignment` sicher, dass das Modul auf allen Seiten angezeigt wird. Klicke am Ende in der Werkzeugleiste die Schaltfläche `Save`.

![Joomla Modul erstellen](/images/j4x36x2.png)

5. Fertig! Wechsel in die Frontendansicht und überzeuge dich davon, dass alles richtig angezeigt wird.

![Joomla Modul im Frontend](/images/j4x36x3.png)

Alternativ ist es möglich, dass Modul in einen Beitrag einzufügen.

![Joomla Modul im Frontend](/images/j4x36x4.png)

Wir haben eine solide Grundlage für die weiteren Schritte in der Entwicklung des Modules.

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)[^docs.joomla.org/j4.x:creating_a_simple_module/de] - Im Mai 2023 ist hier die Vorgehensweise vor Joomla 4.3 erklärt.
<img src="https://vg08.met.vgwort.de/na/f21260ecd2d14b93b42a9d7c73dca41c" width="1" height="1" alt="">
