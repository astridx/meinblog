---
description: 'desc'
shortTitle: 'short'
date: 2021-01-13
title: 'Modules - Namespace and Helper'
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

We add namespace and helper.<!-- \index{module!helper} --><!-- \index{module!namespace} -->

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t31...t32)[^github.com/astridx/boilerplate/compare/t31...t32] and copy these changes into your development version.

## Step by step

### New files

#### Modules

The logic in the module may be complex. Therefore it is good to structure the code clearly. This is done by jnnhelper files. We create these in the directory `Helper`.

<!-- prettier-ignore -->
##### modules/mod\_foo/ Helper/FooHelper.php

> I named the file `FooHelper` in general. Good style is to give it a speaking name. Each helper file has a specific task and it should be named after it. For example, the file that loads the latest articles is called `ArticlesLatestHelper`. This way you can see at first sight what is in the file.

To access the file easily, we add the namespace `namespace FooNamespace\Module\Foo\Site\Helper;`.

[modules/mod_foo/ Helper/FooHelper.php](https://codeberg.org/astrid/j4examplecode/raw/branch/t32/src/modules/mod_foo/src/Helper/FooHelper.php)

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

### Modified files

<!-- prettier-ignore -->
##### modules/mod\_foo/ mod_foo.php

To use the contents of `FooHelper` in the `mod_foo.php` entry point, we import them using `use FooNamespace\Module\Foo\Site\Helper\FooHelper;`. Then we call the function `FooHelper::getText()` and store the result in the variable `$test`.

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\Helper\ModuleHelper;
+use FooNamespace\Module\Foo\Site\Helper\FooHelper;
+
+$test  = FooHelper::getText();

 require ModuleHelper::getLayoutPath('mod_foo', $params->get('layout', 'default'));
```

<!-- prettier-ignore -->
##### modules/mod\_foo/ mod_foo.xml

We enter the namespace in the manifest. This way it will be registered in Joomla during the installation. We also add the new directory so that it is copied to the right place during installation.

```xml {diff}
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

```

<!-- prettier-ignore -->
##### modules/mod\_foo/tmpl/default.php

In the layout, we finally access the variable. The logic for calculating the variable value is encapsulated. This keeps the layout clear. We only insert the text `$test` here. If we want to know more about what is behind `$test`, we look in the helper.

```php {diff}
\defined('_JEXEC') or die;

-echo '[PROJECT_NAME]';
+echo '[PROJECT_NAME]' . $test;
```

## Test your Joomla module

1. install the module in Joomla version 4 to test it:

Copy the files in the `modules` folder into the `modules` folder of your Joomla 4 installation.

Install your module as described in part one, after copying all files. Joomla will update the namespaces for you during the installation. Since a file and namespaces have been added, this is necessary.

2. Check whether the text calculated via the function `FooHelper::getText()` is displayed in the frontend.

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module)[^docs.joomla.org/j4.x:creating_a_simple_module]
<img src="https://vg08.met.vgwort.de/na/dcdcb2f87a6d452abb0a600b37f839a4" width="1" height="1" alt="">
