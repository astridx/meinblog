---
date: 2020-12-03
title: 'Joomla 4.x Tutorial - Extension Development - The First View in the Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/die-erste-ansicht-im-frontend
langKey: en
categories:
  - Code
  - JoomlaEn
tags:
  - CMS
  - Joomla
---

After you have a working backend for your component, you implement the frontend. Currently, with the extension it is possible to display a static text. We don't have dynamic data yet. But this will change soon. First we build the rough structure.

Below you can see the first simple view.

![Joomla Ansicht im Frontend](/images/j4x3x1.png)

## For impatient people

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t1c...t2)[^github.com/astridx/boilerplate/compare/t1c...t2] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In the following overview, the newly added files are marked with a background and the changed ones are outlined.

![Overview of the files edited in this chapter](/images/tree2.png)

### Neue Dateien

Der Administrationsbereich unserer Komponente ist im Ordner `com_foos` unter `/administrator/component`. Jetzt arbeiten wir am Frontend, das im Ordner `com_foos` direkt unter `/components` gespeichert ist.

<!-- prettier-ignore -->
#### [components/com\_foos/ src/Controller/DisplayController.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-6eec124cbd4d68394d1ef4a09898e702) - Einstiegspunkt ins Frontend

Dies ist der Einstiegspunkt für den Model-View-Controller-Teil im Frontend der Foo-Komponente. Nenne die Klasse _DisplayController_. Joomla erwartet das so. Erweitere _BaseController_, um viele Dinge Out-of-the-Box zu nutzen.

Alles was ich in Kapitel zur _ersten Ansicht im Backend_ geschrieben habe, trifft hier analog zu.

[components/com_foos/ src/Controller/DisplayController.php](https://github.com/astridx/boilerplate/blob/21105d93f46c44fc76033e8825b8b31f35c1581c/src/components/com_foos/src/Controller/DisplayController.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t2/src/components/com_foos/src/Controller/DisplayController.php

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
#### [components/com\_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-c77adeff4ff9e321c996e0e12c54b656) - Die Ansicht

Im Moment hat unsere Komponente eine rudimentäre Ansicht. Es wird nur ein statischer Text angezeigt. Dies wird sich ändern!

Es gibt mehrere Dateien, die zusammenarbeiten, um die Ansicht im Frontend zu generieren. Beispielsweise der Controller, der sie aufruft. Den erstellen wir im aktuellen Kapitel. Später kommt das Modell hinzu, welches die Daten vorbereitet.

In der Datei `HtmlView.php` wir das Modell wird aufgerufen, um die Daten für die Ansicht vorzubereiten.

Alles was ich in Kapitel zur _ersten Ansicht im Backend_ geschrieben habe, trifft hier analog zu.

[components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/21105d93f46c44fc76033e8825b8b31f35c1581c/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t2/src/components/com_foos/src/View/Foo/HtmlView.php

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

> Joomla logging offers the possibility to log messages in a file and on the screen. In the case of the screen, you will find this within the Joomla debug console at the bottom of the web page when debugging is active. This function may be helpful when developing, so I mention it here. The entry `Log::add('Log me.', Log::DEBUG);` causes a line to be added to the log file. It is important that the necessary functions are loaded in the head of the file via `use Joomla\CMS\Log\Log;`. The following image shows where the logging is set in the Joomla backend.
> ![Settings for logging in the Joomla backend](/images/j4x3x2.png)

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-a33732ebd6992540b8adca5615b51a1f) - Template

In this file is the text that we display. Everything I wrote in the chapter on the _The First View in the Backend_ applies here analogously.

[components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/21105d93f46c44fc76033e8825b8b31f35c1581c/src/components/com_foos/tmpl/foo/default.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t2/src/components/com_foos/tmpl/foo/default.php

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
#### [administrator/components/com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-1ff20be1dacde6c4c8e68e90161e0578) - XML-Datei (Manifest)

This is the file that tells Joomla how to install our component. That is why we enter the two new files here, so that Joomla knows when it installs that the directories `src` and `tmpl` exist and where `components/com_foos` it should copy them to.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/21105d93f46c44fc76033e8825b8b31f35c1581c/src/administrator/components/com_foos/foos.xml)

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

1. at the end, install your component in Joomla version 4 to test it:

Perform a new installation. This is necessary, otherwise the new files will not be recognised in the frontend. To do this, uninstall your previous installation and copy all files again.

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

Install your component as described in part one, after you have copied all the files. Joomla will set up namespaces for you during installation. 2.

Then open the address 'JOOMLA4/index.php?option=com_foos&view=foo' in a browser. You will see the frontend view you just created.

![Joomla View in Frontend](/images/j4x3x1.png)
