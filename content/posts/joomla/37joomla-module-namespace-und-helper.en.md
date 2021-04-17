---
date: 2021-01-06
title: 'Joomla 4.x Tutorial - Extension Development - Modules - Namespace and Helper'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-module-namespace-und-helper
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

We add namespace and helper.

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t31...t32) and incorporate these changes into your development version.

## Step by step

### New files

#### Modules

The logic in the module may be complex. Therefore it is good to structure the code clearly. This is done by jnnhelper files. We create these in the directory `Helper`.

##### [modules/mod_foo/ Helper/FooHelper.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/Helper/FooHelper.php)

> I named the file `FooHelper` in general. Good style is to give it a speaking name. Each helper file has a specific task and it should be named after it. For example, the file that loads the latest articles is called `ArticlesLatestHelper`. This way you can see at first sight what is in the file.

To access the file easily, we add the namespace `namespace FooNamespace\Module\Foo\Site\Helper;`.

[modules/mod_foo/ Helper/FooHelper.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/Helper/FooHelper.php)

```php
// https://raw.githubusercontent.com/astridx/boilerplate/415dd9b0521abb3e2626309d595c80d2cafb8f30/src/modules/mod_foo/Helper/FooHelper.php

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

To use the contents of `FooHelper` in the `mod_foo.php` entry point, we import them using `use FooNamespace\Module\Foo\Site\Helper\FooHelper;`. Then we call the function `FooHelper::getText()` and store the result in the variable `$test`.

##### [modules/mod_foo/ mod_foo.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/mod_foo.php)

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\Helper\ModuleHelper;
+use FooNamespace\Module\Foo\Site\Helper\FooHelper;
+
+$test  = FooHelper::getText();

 require ModuleHelper::getLayoutPath('mod_foo', $params->get('layout', 'default'));
```

##### [modules/mod_foo/ mod_foo.xml](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/mod_foo.xml)

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

##### [modules/mod_foo/tmpl/default.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/tmpl/default.php)

In the layout, we finally access the variable. The logic for calculating the variable value is encapsulated. This keeps the layout clear.

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

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module)[^https://docs.joomla.org/j4.x:creating_a_simple_module]
