---
date: 2021-01-05
title: 'Joomla 4.x Tutorial - Extension Development - Modules - First Steps'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-module-erste-schritte
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

We create a module.H This is an add-on that extends the display of the actual content. It is used when a content is not the main content and is displayed in different positions. Besides, it is possible to select the menu items under which the module is visible.

In Joomla, there are a variety of modules that I use as a guide. For example:

- Menus (mod_menu)
- Login form (mod_login)
- and many more.

This section explains how you create the basic framework for a simple module. In the first step it only outputs a text. We will build on this in the further course.

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t30...t31)[^github.com/astridx/boilerplate/compare/t30...t31] and incorporate these changes into your development version.

## Step by step

In this section we will add a module. There are some basic files that are used in the standard module development pattern. We create these in this part.

In the following overview, the newly added files are marked with a background and the changed ones are outlined.

![Overview of the files edited in this chapter](/images/tree31.png)

### New files

#### Module

##### [modules/mod\_foo/language/en-GB/en-GB.mod\_foo.ini](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini)

This file provides the texts for for general translation.

```xml
<!-- https://raw.githubusercontent.com/astridx/boilerplate/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini -->

MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"
```

##### [modules/mod\_foo/language/en-GB/en-GB.mod\_foo.sys.ini](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini)

This file provides the texts for menu and installation routine.

```xml
<!-- https://raw.githubusercontent.com/astridx/boilerplate/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini -->

MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"

```

##### [modules/mod\_foo/ mod\_foo.php](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/mod_foo.php)

`mod_foo.php` is the main entry point into the module. The file executes the initialization routines, calls helper routines to collect all the required data, and calls the template where the module output is displayed.

```php
// https://raw.githubusercontent.com/astridx/boilerplate/tutorial/src/modules/mod_foo/mod_foo.php

<?php
/**
/**
 * @package     Joomla.Administrator
 * @subpackage  mod_foo
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
use FooNamespace\Module\Foo\Site\Helper\FooHelper;

$test  = FooHelper::getText();

$url = $params->get('domain');

require ModuleHelper::getLayoutPath('mod_foo', $params->get('layout', 'default'));

```

> In Joomla 3x a line like `$ moduleclass_sfx = htmlspecialchars ($ params-> get ('moduleclass_sfx'));` was necessary. This line is no longer required. See [PR 17447](https://github.com/joomla/joomla-cms/pull/17447).

##### [modules/mod\_foo/ mod\_foo.xml](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/mod_foo.xml)

`mod_foo.xml` defines the files that are copied by the installation routine and specifies configuration parameters for the module. You already know this from the previously created extensions.

```xml
<!-- https://raw.githubusercontent.com/astridx/boilerplate/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/mod_foo.xml -->

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

	<files>
		<filename module="mod_foo">mod_foo.php</filename>
		<folder>tmpl</folder>
		<folder>language</folder>
		<filename>mod_foo.xml</filename>
	</files>
</extension>

```

##### [modules/mod\_foo/tmpl/default.php](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/tmpl/default.php)

`default.php` is the template. This file takes the data collected by `mod_foo.php` and generates the HTML code that is displayed on the page. `echo '[PROJECT_NAME]';` ensures that the name of the project is displayed in the frontend at the position where the module is published.

```php
// https://github.com/astridx/boilerplate/raw/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/tmpl/default.php

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

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module)[^https://docs.joomla.org/j4.x:creating_a_simple_module]
