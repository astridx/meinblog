---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2023-03-29
title: 'The First View in the Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/die-erste-ansicht-im-frontend
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











After you have a working backend for your component, you implement the frontend. Currently, with the extension it is possible to display a static text. We don't have dynamic data yet. This will change soon. First, however, we build the rough structure.

> For impatient people: Look at the changed program code in the [diff view](https://codeberg.org/astrid/j4examplecode/compare/t1...t2)[^codeberg.org/astrid/j4examplecode/compare/t1...t2] and copy these changes into your development version.

## Step by step

### New files

The administration area of our component is located in the folder `com_foos` under `/administrator/component`. Now we work on the frontend. The data of the frontend view are stored in the folder `com_foos` directly under `/components`.

<!-- prettier-ignore -->
#### components/com_foos/src/Controller/DisplayController.php

The DisplayController in the directory `components/com_foos/src/Controller/` is the entry point for the Model-View-Controller part in the frontend of the Foo component. Name the class _DisplayController_. Joomla expects this. Extend _BaseController_ to use many things out-of-the-box. Everything I wrote in the chapter on the _First View in the Backend_ applies here analogously.

[components/com_foos/src/Controller/DisplayController.php](https://codeberg.org/astrid/j4examplecode/src/branch/t2/src/components/com_foos/src/Controller/DisplayController.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t2/src/components/com_foos/src/Controller/DisplayController.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;

/**
 * Foos Component Controller
 *
 * @since  __BUMP_VERSION__
 */
class DisplayController extends BaseController
{
	/**
	 * Constructor.
	 *
	 * @param   array                $config   An optional associative array of configuration settings.
	 * Recognized key values include 'name', 'default_task', 'model_path', and
	 * 'view_path' (this list is not meant to be comprehensive).
	 * @param   MVCFactoryInterface  $factory  The factory.
	 * @param   CMSApplication       $app      The JApplication for the dispatcher
	 * @param   \JInput              $input    Input
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function __construct($config = [], MVCFactoryInterface $factory = null, $app = null, $input = null)
	{
		parent::__construct($config, $factory, $app, $input);
	}

	/**
	 * Method to display a view.
	 *
	 * @param   boolean  $cachable   If true, the view output will be cached
	 * @param   array    $urlparams  An array of safe URL parameters and their variable types, for valid values see {@link \JFilterInput::clean()}.
	 *
	 * @return  static  This object to support chaining.
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function display($cachable = false, $urlparams = [])
	{
		parent::display($cachable);

		return $this;
	}
}

```

<!-- prettier-ignore -->
#### components/com_foos/src/View/Foo/HtmlView.php

At the moment, the view of our component is simple. Only a static text is displayed. This will change!

There are several files that work together to generate the view in the frontend. For example, the controller that calls it. We created this earlier in the current chapter. Later on, we will add a special cell model that prepares the data. At the moment we use the model of the parent classes, because we build on Joomla standard. The parent class file `BaseHtmlView` of `HtmlView.php` works together with the Joomla standard model to prepare the data for the view. It is not yet necessary to code that at this point itself. The following short code snippet is sufficient to generate a display in the frontend.

[components/com_foos/src/View/Foo/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t2/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t2/src/components/com_foos/src/View/Foo/HtmlView.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\View\Foo;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;

/**
 * HTML Foos View class for the Foo component
 *
 * @since  __BUMP_VERSION__
 */
class HtmlView extends BaseHtmlView
{
	/**
	 * Execute and display a template script.
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  mixed  A string if successful, otherwise an Error object.
	 */
	public function display($tpl = null)
	{
		return parent::display($tpl);
	}
}

```

##### Logging and debugging

Joomla logging offers the possibility to log messages in a file and on the screen. In the case of the screen, you will find this within the Joomla debug console<!-- \index{Logging} --><!-- \index{Debug Console} --> at the bottom of the web page when debugging is active. This function may be helpful when developing, so I mention it here. The entry `Log::add('Log me.', Log::DEBUG);` causes a line to be added to the log file. It is important that the necessary functions are loaded in the head of the file via `use Joomla\CMS\Log\Log;`. The following images show where the logging and the debugging are set in the Joomla backend.

![Settings for logging in the Joomla backend](/images/j4x3x2.png)

![Activate debugging in the Joomla backend](/images/j4x3x2a.png)

> We do not use the file here. But maybe you are already thinking outside the box. Therefore here a hint: The file `libraries/src/Log/DelegatingPsrLogger.php` becomes final in Joomla 5 and cannot be overwritten further. See PR 39134[^github.com/joomla/joomla-cms/pull/39134].

<!-- prettier-ignore -->
#### components/com_foos/tmpl/foo/default.php

The file `components/com_foos/tmpl/foo/default.php` contains the text we display. Everything I wrote in the chapter about the _first view in the backend_ also applies here.

[components/com_foos/tmpl/foo/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t2/src/components/com_foos/tmpl/foo/default.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t2/src/components/com_foos/tmpl/foo/default.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
\defined('_JEXEC') or die;
?>
Hello Foos

```

### Modified files

<!-- prettier-ignore -->
#### administrator/components/com_foos/foos.xml

Administrator/components/com_foos/foos.xml' is the file that tells Joomla how to install our component. Therefore, we add the two newly added files here. This way, when installing or updating, Joomla knows that the directories `src` and `tmpl` exist and where to copy them to. The copy destination is the directory `components/com_foos` because of `folder="components/com_foos"`.

[administrator/components/com_foos/foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t2/src/administrator/components/com_foos/foos.xml)

```php {diff}
 	<description>COM_FOOS_XML_DESCRIPTION</description>
 	<namespace path="src">FooNamespace\Component\Foos</namespace>
 	<scriptfile>script.php</scriptfile>
+	<!-- Frond-end files -->
+	<files folder="components/com_foos">
+		<folder>src</folder>
+		<folder>tmpl</folder>
+	</files>
 	<!-- Back-end files -->
 	<administration>
 		<!-- Menu entries -->

```

#### The file - components/com_foos/index.html

This file was only a workaround and it can now be deleted.

## Test your Joomla component

1. at the end, install your component in Joomla version 4 to test it: Perform a new installation. This is necessary, otherwise the new files will not be recognised in the frontend. Before reinstalling you can also try if it is just enough to delete the file `/joomla-cms/administrator/cache/autoload_psr4.php`. To do this, uninstall your previous installation and copy all files again. Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation. Install your component as described in part one, after you have copied all the files. Joomla will set up namespaces for you during installation.

2. then open the address `JOOMLA4/index.php?option=com_foos&view=foo` in a browser. You will see the frontend view you just created.

> Do you care about [Search Engine Friendly (SEF) URLs](<https://docs.joomla.org/Enabling_Search_Engine_Friendly_(SEF)_URLs>)[^docs.joomla.org/enabling_search_engine_friendly_(sef)_urls]. Please do not enable this feature yet. This sample extension does not support SEF yet. We will add the Joomla conform routing later.<!-- \index{Search Engine Friendly (SEF)} --><!-- \index{routing} -->

![Joomla View in Frontend](/images/j4x3x1.png)
<img src="https://vg08.met.vgwort.de/na/26e873a7656a46679abf66e15c8908ac" width="1" height="1" alt="">
