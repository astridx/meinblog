---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2022-07-13
title: 'Die erste Ansicht im Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-erste-ansicht-im-frontend
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Nachdem du über ein funktionierendes Backend für deine Komponente verfügst, implementierst du das Frontend. Aktuell ist es mit der Erweiterung möglich, einen statischen Text anzuzeigen. Wir haben bisher keine dynamischen Daten. Das wird sich bald ändern. Zunächst bauen wir jedoch die grobe Struktur auf.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t1...t2)[^codeberg.org/astrid/j4examplecode/compare/t1...t2] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Der Administrationsbereich unserer Komponente ist im Ordner `com_foos` unter `/administrator/component` gespeichert. Jetzt arbeiten wir am Frontend. Die Daten der Frontend-Ansicht befinden sich im Ordner `com_foos` direkt unter `/components`.

<!-- prettier-ignore -->
#### components/com_foos/src/Controller/DisplayController.php

Der DisplayController im Verzeichnis `components/com_foos/src/Controller/` ist der Einstiegspunkt für den Model-View-Controller-Teil im Frontend der Foo-Komponente. Nenne die Klasse _DisplayController_. Joomla erwartet das so. Erweitere _BaseController_, um viele Dinge Out-of-the-Box zu nutzen. Alles was ich im Kapitel zur _Ersten Ansicht im Backend_ geschrieben habe, trifft hier analog zu.

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

Im Moment ist die Ansicht unserer Komponente einfach gehalten. Es wird nur ein statischer Text angezeigt. Dies wird sich ändern!

Es gibt mehrere Dateien, die zusammenarbeiten, um die Ansicht im Frontend zu generieren. Beispielsweise der Controller, der sie aufruft. Den erstellten wir vorher im aktuellen Kapitel. Später kommt ein spezielles Modell hinzu, welches die Daten vorbereitet. Momentan nutzen wir das Model der Elternklassen, weil wir auf Joomla Standard aufbauen. Die Datei `HtmlView.php` ruft das vererbte Modell auf, um die Daten für die Ansicht vorzubereiten.

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

##### Protokollierung und Fehlersuche

Die Joomla-Protokollierung bietet die Möglichkeit, Meldungen in einer Datei und auf dem Bildschirm zu protokollieren. Bei der Anzeige Computer-Bildschirm findest du diese innerhalb der Joomla-Debug-Konsole<!-- \index{Debug Konsole} --><!-- \index{Logging} --><!-- \index{Protokollierung} --><!-- \index{Fehlersuche} --> am unteren Rand der Webseite, wenn das Debugging aktiv ist. Diese Funktion ist beim Entwickeln unter Umständen hilfreich, deshalb erwähne ich sie hier. Der Eintrag `Log::add('Log me.', Log::DEBUG);` bewirkt eine Zeile in der Logdatei. Wichtig ist dabei, dass im Kopf der Datei mit `use Joomla\CMS\Log\Log;` die notwendigen Funktionen geladen werden. Die nachfolgenden Bilder zeigt, wo die Protokollierung im Joomla Backend eingestellt wird und die Debuganzeige aktiviert wird.

![Einstellungen zur Protokollierung im Joomal Backend](/images/j4x3x2.png)

![Aktivierung der Debug Anzeige im Joomal Backend](/images/j4x3x2a.png)

> Wir nutzen die Datei hier nicht, nur weil es passt ein Hinweis: Die Datei `libraries/src/Log/DelegatingPsrLogger.php` wird in Joomla 5 final und kann nicht weiter überschrieben werden. Siehe PR 39134[^github.com/joomla/joomla-cms/pull/39134].

<!-- prettier-ignore -->
#### components/com_foos/ tmpl/foo/default.php

Die Datei `components/com_foos/ tmpl/foo/default.php` beinhaltet den Text, welchen wir anzeigen. Alles was ich in Kapitel zur _ersten Ansicht im Backend_ geschrieben habe, trifft hier ebenfalls zu.

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

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/com_foos/foos.xml

`administrator/components/com_foos/foos.xml` ist die Datei, die Joomla mitteilt, wie unsere Komponente installiert wird. Aus diesem Grund ergänzen wir die beiden neu hinzugekommenen Dateien. So weiß Joomla bei einer Installation oder einer Aktualisierung, dass es die Verzeichnisse `src` und `tmpl` gibt und wohin es sie kopieren soll. Kopier-Ziel ist aufgrund von `folder="components/com_foos"` das Verzeichnis `components/com_foos`.

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

#### Die Behelfsdatei - components/com_foos/index.html

Diese Datei war nur ein Behelf und sie wird nun gelöscht.

## Teste deine Joomla-Komponente

1. Installiere am Ende deine Komponente in Joomla Version 4, um sie zu testen. Führe eine neue Installation durch. Dies ist erforderlich, da die neuen Dateien im Frontend sonst nicht erkannt werden. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut. Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla richtet Während der Installation die Namespaces im Frontend für dich ein.

2. Öffne dann in einem Browser die Adresse `JOOMLA4/index.php?option=com_foos&view=foo`. Du siehst die eben erstelle Frontend-Ansicht.

> Denkst du schon einen Schritt weiter und sorgst dich um [Suchmaschinenfreundliche (SEF) URLs](<https://docs.joomla.org/Enabling_Search_Engine_Friendly_(SEF)_URLs/de>)[^docs.joomla.org/enabling_search_engine_friendly_(sef)_urls/de]. Aktiviere diese Funktion bitte noch nicht. Diese Version der Beispielerweiterung unterstützt SEF noch nicht. Das Joomla-konforme Routing ergänzen wir später.<!-- \index{Suchmaschinenfreundlich (SEF)} --><!-- \index{Routing} -->

![Joomla Ansicht im Frontend](/images/j4x3x1.png)
<img src="https://vg08.met.vgwort.de/na/ce485e712b234b46b545f0639b312589" width="1" height="1" alt="">
