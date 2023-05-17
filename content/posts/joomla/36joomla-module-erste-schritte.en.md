---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2023-05-16
title: 'Modules - First Steps'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-module-erste-schritte
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











We create a module.H This is an add-on that extends the display of the actual content. It is used when a content is not the main content and is displayed in different positions. Besides, it is possible to select the menu items under which the module is visible.<!-- \index{module} --><!-- \index{Modul!namespace} -->

In Joomla, there are a variety of modules that I use as a guide. For example:

- Menus (mod_menu)
- Login form (mod_login)
- and many more.

This section explains how you create the basic framework for a simple module. In the first step it only outputs a text. We will build on this in the further course. The structure of the modules was improved in Joomla 4.3. I use the new approach here. When working out I have oriented myself to the core module `mod_articles_latest`.

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t30a...t31)[^codeberg.org/astrid/j4examplecode/compare/t30...t31] and copy these changes into your development version.

## Step by step

In this section we will add a module. There are some basic files that are used in the standard module development pattern. We create these in this part.

### New files

#### Module

<!-- prettier-ignore -->
##### modules/mod_foo/language/en-GB/mod_foo.ini

This file provides the texts for for general translation.

```xml
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t31/src/modules/mod_foo/language/en-GB/mod_foo.ini -->

MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"
```

<!-- prettier-ignore -->
##### modules/mod_foo/language/en-GB/mod_foo.sys.ini

This file provides the texts for menu and installation routine.

```xml
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t31/src/modules/mod_foo/language/en-GB/mod_foo.sys.ini -->

MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"

```

<!-- prettier-ignore -->
##### modules/mod_foo/services/provider.php

`provider.php` is the main entry point into the module. The file executes the registers the providers, initialization routines, calls helper routines to collect all the required data, and calls the template where the module output is displayed. The file is created in a new folder that is outside the "src" directory. This folder and the file must be named in lowercase and follow the new structure. The predefined namespace, which has two backslashes before each of the elements of the "path", is also specified. It is identical to the master namespace of the module specified in the manifest file.

The use lines define Joomla classes that will be used in further code. It is important that they are present, otherwise error messages will be displayed. Joomla loads the "provider.php" magically if we follow the conventions of the basic structure.

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

Der `Dispatcher` sammelt die Variablen, die wir später im Modullayout `tmpl/default.php` verwenden können. Im nächsten Kapitel werden wir sehen, wie Hilfsdateien hier verwendet werden

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

`mod_foo.xml` defines the files that are copied by the installation routine and specifies configuration parameters for the module. You already know this from the previously created extensions.

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

`default.php` is the template. This file takes the data collected by `mod_foo.php` and generates the HTML code that is displayed on the page. `echo '[PROJECT_NAME]';` ensures that the name of the project is displayed in the frontend at the position where the module is published.

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

> Note: In the template file it is possible to use all variables defined in `mod_foo.php`.

### Changed files

There are no changed files.

## Test your Joomla module

1. install your module in Joomla version 4 to test it. In the beginning, the easiest thing to do is to copy the files manually in place:

Copy the files in the `modules` folder to the `modules` folder of your Joomla 4 installation.

2. install your module as described in part one, after you have copied all files. Open the menu `System | Install | Discover`. Here you will see an entry for the module you just copied. Select it and click on the button `Install`. 3.

Next, test if your module works properly. Open the menu 'Content | Site Modules' and click in the toolbar `New`.

![Test Joomla Module](/images/j4x36x1.png)

![Test Joomla Module](/images/j4x36x1b.png)

4. enter a title in the appropriate field and choose a position. In the tab 'Menu Assignment' make sure that the module is displayed on all pages. At the end click the button `Save` in the toolbar.

![Create Joomla Module](/images/j4x36x2.png)

5. That's it. Switch to the frontend view and make sure that everything is displayed correctly.

![Joomla module in frontend](/images/j4x36x3.png)

Alternatively it is possible to insert the module into a post.

![Joomla module in frontend](/images/j4x36x4.png)

We have a solid basis for the further steps in the development of the module.

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module)[^docs.joomla.org/j4.x:creating_a_simple_module] - In May 2023, here is the procedure explained before Joomla 4.3.
<img src="https://vg08.met.vgwort.de/na/cf3d0b5495de4c67b886abc709a61739" width="1" height="1" alt="">
