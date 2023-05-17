---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2023-05-16
title: 'Modules - Helper'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-module-namespace-und-helper
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











We add helper.<!-- \index{module!helper} -->

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t31...t32)[^codeberg.org/astrid/j4examplecode/compare/t31...t32] and copy these changes into your development version.

## Step by step

### New files

#### Modules

The logic in the module may be complex. Therefore it is good to structure the code clearly. This is done by jnnhelper files. We create these in the directory `Helper`.

<!-- prettier-ignore -->
##### modules/mod_foo/Helper/FooHelper.php

> I named the file `FooHelper` in general. Good style is to give it a speaking name. Each helper file has a specific task and it should be named after it. For example, the file that loads the latest articles is called `ArticlesLatestHelper`. This way you can see at first sight what is in the file.

To access the file easily, we add the namespace `namespace FooNamespace\Module\Foo\Site\Helper;`.

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
	public function getText()
	{
		return ' FooHelpertest';
	}
}

```

### Modified files

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

The `Dispatcher` collects the variables that we can use later in the module layout `tmpl/default.php`. Here we see how helper files are used.


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

In the layout, we finally access the variable. The logic for calculating the variable value is encapsulated. This keeps the layout clear. We only insert the text `$test` here. If we want to know more about what is behind `$test`, we look in the helper.

```php {diff}
\defined('_JEXEC') or die;

-echo '[PROJECT_NAME]';
+echo '[PROJECT_NAME]' . $text;
```

## Test your Joomla module

1. install the module in Joomla version 4 to test it:

Copy the files in the `modules` folder into the `modules` folder of your Joomla 4 installation.

Install your module as described in part one, after copying all files.

2. Check whether the text calculated via the function `FooHelper::getText()` is displayed in the frontend.

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module)[^docs.joomla.org/j4.x:creating_a_simple_module]
[Private Demo Module](https://github.com/GHSVS-de/mod_demoghsvs)[^github.com/GHSVS-de/mod_demoghsvs]
<img src="https://vg08.met.vgwort.de/na/dcdcb2f87a6d452abb0a600b37f839a4" width="1" height="1" alt="">
