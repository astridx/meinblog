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

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t1c...t2) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Im aktuellen Abschnitte kommen drei Datei hinzu und zwei werden geändert.

![Übersicht über die Dateien im dritten Kapitel](/images/j4xdrei.png)

### Neue Dateien

Der Administrationsbereich unserer Komponente ist im Ordner `com_foos` unter `/administrator/component`. Jetzt arbeiten wir am Frontend, das im Ordner `com_foos` direkt unter `/components` gespeichert ist.

#### [components/com_foos/ src/Controller/DisplayController.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-6eec124cbd4d68394d1ef4a09898e702) - Einstiegspunkt ins Frontend

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

#### [components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-c77adeff4ff9e321c996e0e12c54b656) - Die Ansicht

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

> Joomla logging offers the possibility to log messages in a file and on the screen. In the case of the screen, you will find this within the Joomla debug console at the bottom of the web page when debugging is active. This function may be helpful when developing, so I mention it here. The entry 'Log::add('Log me.', Log::DEBUG);`causes a line to be added to the log file. It is important that the necessary functions are loaded in the head of the file with`use Joomla\CMS\Log\Log;`. The following image shows where the logging is set in the Joomla backend.
> ![Settings for logging in the Joomla backend](/images/j4x3x2.png)

#### [components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-a33732ebd6992540b8adca5615b51a1f) - Template

In dieser Datei ist der Text, den wir anzeigen. Alles was ich in Kapitel zur _ersten Ansicht im Backend_ geschrieben habe, trifft hier analog zu.

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

#### [administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-1ff20be1dacde6c4c8e68e90161e0578) - XML-Datei (Manifest)

Dies ist die Datei, die Joomla mitteilt, wie unsere Komponente installiert wird. Deshalb tragen wie die beiden neuen Dateien hier ein, so weiß Joomla bei einer Installatin, dass es die Verzeichnisse `src` und `tmpl` gibt und wo `components/com_foos` es sie hin kopieren soll.

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

#### Die Behelfsdatei - components/com_foos/index.html

Diese Datei war nur ein Behelf und sie kann nun gelöscht werden.

## Teste deine Joomla-Komponente

1. Installiere am Ende deine Komponente in Joomla Version 4, um sie zu testen:

Führe eine neue Installation durch. Dies ist erforderlich, da die neuen Dateien im Frontend sonst nicht erkannt werden. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla richtet bei der bei der Installation Namespaces für dich ein.

2. Öffne dann in einem Browser die Adresse `JOOMLA4/index.php?option=com_foos&view=foo`. Du siehst die eben erstelle Frontend-Ansicht.

![Joomla Ansicht im Frontend](/images/j4x3x1.png)

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t1c...t2.diff

## Links
