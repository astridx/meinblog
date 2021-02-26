---
date: 2020-12-01
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Die erste Ansicht im Backend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-erste-ansicht-im-backend
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wir fangen mit den Grundlagen an. Dazu erstellen wir die _View_ im Administrationsbereich rudimentär. Am Ende dieses Textes weißt du, wie du einen Menüpunkt im Menü des Administrationsbereichs einfügst. Über den Menüeintrag öffnest du die Ansicht zu deiner Komponente. Sei nicht enttäuscht: Diese enthält bisher nichts weiter als einen kurzen Text. Du hast eine Grundlage für die weiteren Schritte.

![Die erste Ansicht im Backend](/images/j4x1x3.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t0...t1) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

![Übersicht über die Dateien im ersten Kapitel](/images/j4xeins.png)

### Neue Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-1ff20be1dacde6c4c8e68e90161e0578) - Blaupause für die Installation

Dies ist eine XML-Datei (Manifest), die Joomla! mitteilt, wie unsere Komponente installiert wird.

Genau wie Module und Plugins verfügen Komponenten über eine XML-Installationsdatei, die Joomla alles über die zu installierende Erweiterung erzählt. Diese Datei wird als XML-Manifest bezeichnet.
Die Installations-XML-Datei enthält Details wie

- die Versionsnummer,
- alle von der Komponente verwendeten Dateien und Ordner,
- Details zur Datenbankinstallationsdatei,
- und Komponentenparameter.

Erstelle eine neue Datei und nennen Sie sie `foos.xml`. Dies ist der Name der Erweiterung ohne das Präfix `com_`. Wir werden dann jede Zeile durchgehen und uns ansehen, was sie bewirkt.

Die erste Zeile ist nicht spezifisch für Joomla!. Es sagt uns, dass dies eine XML-Datei ist `<?xml version="1.0" encoding="utf-8" ?>`.

Dann teilen wir Joomla! mit, dass dies eine Komponente ist. Und wir wünschen uns, dass die Upgrade-Installationsmethode verwendet wird. So ist es möglich, dieses Paket nicht nur für die Installation, sondern ebenfalls für ein Update zu nutzen `<extension type="component" method="upgrade">`.

> Manchmal findest du einen Parameter mit einer Versionsnummer. Diese wird nirgendwo verwendet, deshalb ist sie unnötig. Weitere Informationen dazu findest du [hier](https://github.com/joomla/joomla-cms/pull/25820).

Dann definieren wir den Namen der Komponente. In diesem Fall `COM_FOOS`. Mehr [Informationen](https://github.com/joomla/joomla-cms/issues/26221) zum Namen.

Die nächsten Zeilen sind selbsterklärend. Ergänze deine Daten.

```xml
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
```

Dies ist die erste Version der Komponente. Wir werden ihr die Versionsnummer `1.0.0` geben: `<version>1.0.0</version>`. Wenn wir einen kleinen Fehler beheben, wäre die nächste Nummer `1.0.1`. Wenn wir eine neue Funktion einführen, wählen wir `1.1.0`. Wenn wir größere Änderungen vorgenommen haben, die Auswirkungen auf frühere Versionen haben, heißt die nächste Version `2.0.0`. Es ist wichtig, dass du die dreiteilige Versionsnummerierung verwendest, da dies das spätere Erstellen von Updates mithilfe der semantischen Versionierung erleichtert.

Joomla folgt strikt der [semantischen Versionierung](https://developer.joomla.org/news/586-joomla-development-strategy.html#version_numbering). Ich empfehle dir, dies ebenfalls.

Im Beschreibungsfeld verwenden wir einen Sprachstring `<description>COM_FOOS_XML_DESCRIPTION</description>`. Daher ändert sich dieser Text basierend auf den Sprachdateien, die wir in einem der nächsten [Kapitel](#sprachdateiennutzen) einführen.
Die Beschreibung der Komponente wird bei der Installation angezeigt und, wenn du das Menü `System` klickst und `Manage | Extensions` öffnest.

Als Nächstes setzen wir das Namespace `tag`: `<namespace>FooNamespace\Component\Foos</namespace>`. Im [Vorwort](joomla-tutorial-vorwort) habe ich erklärt, warum wir Namespaces verwenden.

Wie benennst du deinen Namespace?

- Das erste Element des Namespaces ist dein "Firmenname". Für dieses Tutorial habe ich `Joomla` verwendet. Er wird genutzt, um den Code von dem Code in anderen Erweiterungen zu unterscheiden. So ist es möglich, identische Klassennamen ohne Konflikte zu verwenden. Der Namespace wird ebenso zum Registrieren eines Dienstanbieters verwendet.

- Das zweite Element ist die Art der Erweiterung: Component, Module, Plugin or Template.

- Das dritte Element ist der Name der Erweiterung ohne vorherige com*, mod* oder tpl\_, in unserem Fall `Foos`.

Mit der `script`-datei rufst du Code auf, wenn deine Komponente installiert, deinstalliert oder aktualisiert wird: `<scriptfile>script.php</scriptfile>`.

Wie Joomla! selbst haben Komponenten ein Frontend und einen Administrationsbereich. Der Ordner `administrator/components/com_foos` enthält alle vom Backend verwendeten Dateien. Einzelne fügst du mit dem Tag `filename` hinzu. Für ein vollständiges Verzeichnis verwendest du besser das Tag `folder`. Die Dateien für den Administrationsbereich deiner Komponente sind alle innerhalb des Tags `administration`. Hier ist ebenfalls ein `menu`-Tag. Dies ist der Menüpunkt, der in der Seitenleiste im Backend angezeigt wird. Wir verwenden den Sprachstring `COM_FOOS`, den wir später mit Text aus einer Sprachdatei ersetzen werden.

```xml
	<administration>
		<!-- Menu entries -->
		<menu view="foos">COM_FOOS</menu>
		<submenu>
			<menu link="option=com_foos">COM_FOOS</menu>
		</submenu>
		<files folder="administrator/components/com_foos">
			<filename>foos.xml</filename>
			<folder>Controller</folder>
			<folder>Extension</folder>
			<folder>Service</folder>
			<folder>View</folder>
			<folder>services</folder>
			<folder>tmpl</folder>
		</files>
	</administration>
```

Kommen wir zum _dlid_-tag `<dlid prefix=“dlid=“ suffix=““ />`. Du benötigst dieses, wenn du den "Download Key Manager" verwendest. Im Allgemeinen ist dies nur bei kommerziellen Erweiterungen der Fall. Mehr Informationen findest du auf [Github](https://github.com/joomla/joomla-cms/pull/25553).

Wir schließen zuletzt das `</extension>`-Tag.

Zusätzlich zur XML-Installationsdatei sind weitere Dateien notwendig, um eine Komponente zu erstellen. Hier aber erst einmal der vollständige Code:

[administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/foos.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/54d970c93d75807f3d1e4b73e8ba5b40b02cd3af/src/administrator/components/com_foos/foos.xml -->

<?xml version="1.0" encoding="utf-8" ?>
<extension type="component" method="upgrade">
	<name>COM_FOOS</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>1.0.0</version>
	<description>COM_FOOS_XML_DESCRIPTION</description>
	<namespace path="src">FooNamespace\Component\Foos</namespace>
	<scriptfile>script.php</scriptfile>
	<!-- Back-end files -->
	<administration>
		<!-- Menu entries -->
		<menu view="foos">COM_FOOS</menu>
		<submenu>
			<menu link="option=com_foos">COM_FOOS</menu>
		</submenu>
		<files folder="administrator/components/com_foos">
			<filename>foos.xml</filename>
			<folder>services</folder>
			<folder>src</folder>
			<folder>tmpl</folder>
		</files>
	</administration>
	<changelogurl>https://raw.githubusercontent.com/astridx/boilerplate/tutorial/changelog.xml</changelogurl>
	<updateservers>
		<server type="extension" name="Foo Updates">https://raw.githubusercontent.com/astridx/boilerplate/tutorial/foo_update.xml</server>
	</updateservers>
	<dlid prefix="dlid=" suffix="" />
</extension>

```

#### [src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-7aceee287e50092f4d9e6caaec3b8b40) - Code während der Installation aufrufen

Mit der Installationsskriptdatei rufst du Code auf

- wenn deine Komponente installiert wird,
- bevor deine Komponente installiert wird,
- wenn deine Komponente deinstalliert wird,
- bevor deine Komponente deinstalliert wird,
- oder wenn deine Komponente aktualisiert wird.

Erstelle die Datei `script.php` mit folgendem Inhalt:

[administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/script.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/54d970c93d75807f3d1e4b73e8ba5b40b02cd3af/src/administrator/components/com_foos/script.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
\defined('_JEXEC') or die;
use Joomla\CMS\Installer\InstallerAdapter;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Log\Log;

/**
 * Script file of Foo Component
 *
 * @since  1.0.0
 */
class Com_FoosInstallerScript
{
	/**
	 * Minimum Joomla version to check
	 *
	 * @var    string
	 * @since  1.0.0
	 */
	private $minimumJoomlaVersion = '4.0';

	/**
	 * Minimum PHP version to check
	 *
	 * @var    string
	 * @since  1.0.0
	 */
	private $minimumPHPVersion = JOOMLA_MINIMUM_PHP;

	/**
	 * Method to install the extension
	 *
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 */
	public function install($parent): bool
	{
		echo Text::_('COM_FOOS_INSTALLERSCRIPT_INSTALL');

		return true;
	}

	/**
	 * Method to uninstall the extension
	 *
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 */
	public function uninstall($parent): bool
	{
		echo Text::_('COM_FOOS_INSTALLERSCRIPT_UNINSTALL');

		return true;
	}

	/**
	 * Method to update the extension
	 *
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 *
	 */
	public function update($parent): bool
	{
		echo Text::_('COM_FOOS_INSTALLERSCRIPT_UPDATE');

		return true;
	}

	/**
	 * Function called before extension installation/update/removal procedure commences
	 *
	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 *
	 * @throws Exception
	 */
	public function preflight($type, $parent): bool
	{
		if ($type !== 'uninstall')
		{
			// Check for the minimum PHP version before continuing
			if (!empty($this->minimumPHPVersion) && version_compare(PHP_VERSION, $this->minimumPHPVersion, '<'))
			{
				Log::add(
					Text::sprintf('JLIB_INSTALLER_MINIMUM_PHP', $this->minimumPHPVersion),
					Log::WARNING,
					'jerror'
				);

				return false;
			}

			// Check for the minimum Joomla version before continuing
			if (!empty($this->minimumJoomlaVersion) && version_compare(JVERSION, $this->minimumJoomlaVersion, '<'))
			{
				Log::add(
					Text::sprintf('JLIB_INSTALLER_MINIMUM_JOOMLA', $this->minimumJoomlaVersion),
					Log::WARNING,
					'jerror'
				);

				return false;
			}
		}

		echo Text::_('COM_FOOS_INSTALLERSCRIPT_PREFLIGHT');

		return true;
	}

	/**
	 * Function called after extension installation/update/removal procedure commences
	 *
	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 *
	 */
	public function postflight($type, $parent)
	{
		echo Text::_('COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT');

		return true;
	}
}

```

Die `install`-Funktion wird, wie der Name schon sagt, aufgerufen, wenn die Komponente installiert wird. Im Moment werden Text ausgegeben. Möglich ist es Beispieldaten zu installieren.

`uninstall` wird aufgerufen, wenn jemand die Komponente deinstalliert. Derzeit wird auch nur Text angezeigt.

Die Aktualisierungsfunktion `update` wird immer dann aufgerufen, wenn du die Komponente aktualisierst.

Die `preflight`-Funktion wird aufgerufen, bevor die Komponente installiert wird. Sie können hier Code hinzufügen, um die Voraussetzungen wie die PHP-Version zu überprüfen oder um zu prüfen, ob eine andere Erweiterung installiert ist oder nicht.

Die `postflight`-Funktion wird aufgerufen, nachdem die Komponente installiert wurde. Mit dieser Funktion werden Standardwerte für Komponentenparameter festlegen.

#### [src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-6f6a8e05c359293ccc2ab0a2046bce7f) - Funktionen / Dienste implementieren

`provider.php` wird zum Implementieren der Komponentendienste verwendet. Über eine Schnittstelle definiert die Komponentenklasse, welche Dienste sie bereitstellt. Hierzu wird ein Abhängigkeitsinjektionscontainer oder DI-Container verwendet. Zum Registrieren sind `ComponentDispatcherFactory` und `MVCFactory` für jede Komponente obligatorisch. Die Registrierung von `CategoryFactory` ist optional, wir benötigen die `CategoryFactory`, wenn wir [Kategorien integrieren](#kategorienimbackend). Mithilfe von provider.php ist es möglich, später neue Dienste ohne Unterbrechung der Abwärtskompatibilität (BC) einführen.

Wenn du mit dem Konzept von DI Container nicht vertraut bist, findest du hier Erklärung und einige Beispiele:

- [joomla-framework/di](https://github.com/joomla-framework/di)^[https://github.com/joomla-framework/di].
- [docs/why-dependency-injection.md](https://github.com/joomla-framework/di/blob/master/docs/why-dependency-injection.md)^[https://github.com/joomla-framework/di/blob/master/docs/why-dependency-injection.md].

Weitere Informationen zu Implementierung findest du auf Github(https://github.com/joomla/joomla-cms/pull/20217)^[https://github.com/joomla/joomla-cms/pull/20217];

[administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/services/provider.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/54d970c93d75807f3d1e4b73e8ba5b40b02cd3af/src/administrator/components/com_foos/services/provider.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
use Joomla\CMS\Extension\ComponentInterface;
use Joomla\CMS\Extension\Service\Provider\CategoryFactory;
use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
use Joomla\CMS\Extension\Service\Provider\MVCFactory;
use Joomla\CMS\HTML\Registry;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;

/**
 * The foos service provider.
 * https://github.com/joomla/joomla-cms/pull/20217
 *
 * @since  1.0.0
 */
return new class implements ServiceProviderInterface
{
	/**
	 * Registers the service provider with a DI container.
	 *
	 * @param   Container  $container  The DI container.
	 *
	 * @return  void
	 *
	 * @since   1.0.0
	 */
	public function register(Container $container)
	{
		$container->registerServiceProvider(new CategoryFactory('\\FooNamespace\\Component\\Foos'));
		$container->registerServiceProvider(new MVCFactory('\\FooNamespace\\Component\\Foos'));
		$container->registerServiceProvider(new ComponentDispatcherFactory('\\FooNamespace\\Component\\Foos'));

		$container->set(
			ComponentInterface::class,
			function (Container $container)
			{
				$component = new FoosComponent($container->get(ComponentDispatcherFactoryInterface::class));

				$component->setRegistry($container->get(Registry::class));

				return $component;
			}
		);
	}
};

```

#### [src/administrator/components/com_foos/src/Controller/DisplayController.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-7b7a67cba037a3dcac6cccb6d456cc19) Einstiegspunkt in den Administrationsbereich - administrator/components/com_foos/Controller/DisplayController.php - {#einsdisplaycontroller}

Dies ist der Einstiegspunkt für den Model-View-Controller-Teil in den Administrationsbereich der Foo-Komponente. Nenne die Klasse _DisplayController_. Joomla! erwartet das so. Erweitere _BaseController_, um viele Dinge Out-of-the-Box zu nutzen.

Die Hauptaufgabe dieses Controllers ist es, die Anzeige vorzubereiten. Daher heißt der Standardcontroller DisplayController. Er ruft die Methode `display()` der Elternklasse `BaseController` im Namespace `Joomla\CMS\MVC\Controller` - genau ist dies die Datei `/var/www/html/joomla-cms4/libraries/src/MVC/Controller/BaseController.php` - auf. Im Model-View-Controller-Modell werden Controller oft zum Einrichten der Startumgebung genutzt.

Erstellen wir den _DisplayController_. Wie immer legen wir zunächst den den _DocBlock_ an. Hier ist ein Beispiel für einen typischen Dokumentarblock.

[administrator/components/com_foos/Controller/DisplayController.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/Controller/DisplayController.php)

```php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
```

Wie du DocBlocks für Joomla erstellst, erklärten die Joomla! [Codierungsstandards](https://developer.joomla.org/coding-standards/docblocks.html) und der [Pull Request](https://github.com/joomla/joomla-cms/pull/31504)

> Vor jeder Klasse und Funktion wird ein DocBlock angezeigt. Der gesamte Code enthält diese DocBlock-Kommentare, die es automatisierten Tools erleichtern, die Dokumentation von APIs zu generieren. Dies hilft einigen IDEs, die Code-Vervollständigung bereitzustellen. Und manchmal ist der Kommentar für Programmierer hilfreich. Ich drucke die Dokumentarblöcke hier nicht weiter ab. In den Code-Beispielen auf Github sind sie vorhanden.

Nach dem DocBlock fügst du den _Namespace_ ein: `namespace FooNamespace\Component\Foos\Administrator\Controller;`. Diesen deklarierst du mit dem entsprechenden Schlüsselwort. Namespaces wurde in Joomla 4 eingeführt. Wenn diesses Konzept dir neu ist, lese die [Übersicht über Namespace](https://www.php.net/manual/de/language.namespaces.php). Es zwingend, dass er vor allem anderen Code in der Datei steht. Ich werde dir später erklären, wie sich der Name des Namespaces zusammensetzt:

Nach dem Namespace fügen wir `\defined('_JEXEC') or die;` ein, sodass diese PHP-Datei nicht direkt aufrufbar ist.

Als Nächstes importieren wir mit dem Schlüsselwort `use` den Namespace der vererbenden Klasse `BaseController` um diese nutzen zu können: `use Joomla\CMS\MVC\Controller\BaseController;`.

Anschließend erstellen wir die Klasse für den Controller. Ich hatte schon geschrieben, dass du diese am besten DisplayController nennst und die Klasse BaseController erweiterst. Definiere dann die Variable `$default_view` in der du die Standardansicht mit `foos`. Du wählst `foos` als Ansicht, weil der Name der Komponente `foos` ist und aus dem Grund auch das Verzeichnis `/administrator/components/com_foos/src/View/ F o o s` angelegt haben. Wenn nichts definiert ist, wird standardmäßig die Foos-Ansicht mit dem Standardlayout verwendet. Das setzten dieser Variable erforderlich. Aber ich denke, es ist immer besser, dies einzufügen.

Wenn du die URL ansiehst, während du eine Komponente im Administrationsbereich verwendest, bemerkst du gegebenenfalls die Ansichts- und Layoutvariablen. Beispiel: `index.php?option=com_foos&view=foos&layout=default` weist uns an, die foos-Ansicht mit dem Standardlayout zu laden, sodass `components/` + `com_foos/tmpl/foos/` + `default.php` aufgerufen wird, wenn du dich im Front-End und `administrator/components/` + `com_foos/tmpl/foos/` + default.php`, wenn du dich im Backend befindest.

> Die Sichtbarkeit wird in PHP mit `public`, `private` oder `protected` definiert. Wann du was einsetzt erklärt das [PHP-Handbuch](https://www.php.net/manual/de/language.oop5.visibility.php)^[https://www.php.net/manual/de/language.oop5.visibility.php].

Legen alles so an, wie es in Joomla vorgesehen ist. Dies bringt dir Vorteile, wenn du Joomla Funktionen verwendest. Für viele oft benutze Funktionen erfindest du das Rad nicht neu. Praktisch siehst du das anhand der Methode `display`. In deiner implementierst du keine Aktion. Alle Arbeit wird von `parent::display()` erledigt.

```php  {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/54d970c93d75807f3d1e4b73e8ba5b40b02cd3af/src/administrator/components/com_foos/src/Controller/DisplayController.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\BaseController;

/**
 * Foos master display controller.
 *
 * @since  1.0.0
 */
class DisplayController extends BaseController
{
	/**
	 * The default view.
	 *
	 * @var    string
	 * @since  1.0.0
	 */
	protected $default_view = 'foos';

	/**
	 * Method to display a view.
	 *
	 * @param   boolean  $cachable   If true, the view output will be cached
	 * @param   array    $urlparams  An array of safe URL parameters and their variable types, for valid values see {@link \JFilterInput::clean()}.
	 *
	 * @return  BaseController|bool  This object to support chaining.
	 *
	 * @since   1.0.0
	 *
	 * @throws  \Exception
	 */
	public function display($cachable = false, $urlparams = array())
	{
		return parent::display();
	}
}

```

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-38764f2b1343234561c0d02cd2991ea1) - Die Datei zum Booten der Erweiterung

`FoosComponent.php` ist der Code zum Booten der Erweiterung. Es ist die erste Datei, die aufgerufen wird, wenn Joomla! die Komponente lädt. `boot` ist die Funktion zum Einrichten der Umgebung der Erweiterung wie beispielsweise das Registrieren neuer Klassen. Weitere Informationen findest du in diesem [Pull Request](https://github.com/joomla/joomla-cms/pull/20217)^[https://github.com/joomla/joomla-cms/pull/20217].

[administrator/components/com_foos/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/Extension/FoosComponent.php)

```php  {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/54d970c93d75807f3d1e4b73e8ba5b40b02cd3af/src/administrator/components/com_foos/src/Extension/FoosComponent.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Extension;

defined('JPATH_PLATFORM') or die;

use Joomla\CMS\Categories\CategoryServiceInterface;
use Joomla\CMS\Categories\CategoryServiceTrait;
use Joomla\CMS\Extension\BootableExtensionInterface;
use Joomla\CMS\Extension\MVCComponent;
use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;
use Psr\Container\ContainerInterface;

/**
 * Component class for com_foos
 *
 * @since  1.0.0
 */
class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface
{
	use CategoryServiceTrait;
	use HTMLRegistryAwareTrait;

	/**
	 * Booting the extension. This is the function to set up the environment of the extension like
	 * registering new class loaders, etc.
	 *
	 * If required, some initial set up can be done from services of the container, eg.
	 * registering HTML services.
	 *
	 * @param   ContainerInterface  $container  The container
	 *
	 * @return  void
	 *
	 * @since   1.0.0
	 */
	public function boot(ContainerInterface $container)
	{
		$this->getRegistry()->register('foosadministrator', new AdministratorService);
	}
}

```

#### [src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-66f0a18f94a16b0a790b4c8f20a4dd6e) - Funktionen / Dienste hinzufügen

Obwohl wir den Code für eine minimale Komponente entwickeln, werden einige Administratordateien benötigt. Die Datei `AdministratorService.php` wird später verwendet, um Funktionen wie die Mehrsprachigkeit oder Haupteinträge/Featured hinzuzufügen. Im Moment brauchen wir diese Funktionen nicht. Aber wir bereiten hier schon alles vor.

[administrator/components/com_foos/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/Service/HTML/AdministratorService.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/54d970c93d75807f3d1e4b73e8ba5b40b02cd3af/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Service\HTML;

defined('JPATH_BASE') or die;

/**
 * Foo HTML class.
 *
 * @since  1.0.0
 */
class AdministratorService
{
}

```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-8e3d37bbd99544f976bf8fd323eb5250) - Die Ansicht - administrator/components/com_foos/View/Foos/HtmlView.php

Hier sind Objekte (Symbolleiste, Titel) definiert, und das Modell (Daten) wird aufgerufen.

Im Moment hat unsere Komponente eine rudimentäre Ansicht. Es wird nur ein statischer Text angezeigt. Dies wird sich ändern!

Es gibt mehrere Dateien, die zusammenarbeiten, um die Ansicht im Frontend zu generieren. Beispielsweise der Controller, der sie aufruft. Den erstellen wir im aktuellen Kapitel. Später kommt das Modell hinzu, welches die Daten vorbereitet.

In der Datei `HtmlView.php` werden alle Schaltflächen und Titel der Symbolleiste definiert. Das Modell wird aufgerufen, um die Daten für die Ansicht vorzubereiten. Im Moment rufen wir nur die Funktion der Eltern-Klasse auf, um das Standardtemplate anzuzeigen: `parent::display($tpl);`. Warum selbst Hand anlegen, wenn es Funktionen in Joomla! gibt.

[administrator/components/com_foos/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/View/Foos/HtmlView.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/54d970c93d75807f3d1e4b73e8ba5b40b02cd3af/src/administrator/components/com_foos/src/View/Foos/HtmlView.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\View\Foos;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;

/**
 * View class for a list of foos.
 *
 * @since  1.0.0
 */
class HtmlView extends BaseHtmlView
{
	/**
	 * Method to display the view.
	 *
	 * @param   string  $tpl  A template file to load. [optional]
	 *
	 * @return  void
	 *
	 * @since   1.0.0
	 */
	public function display($tpl = null): void
	{
		parent::display($tpl);
	}
}

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-3186af99ea4e3321b497b86fcd1cd757) - Das layout/Template zum Rendern der Ansicht

In dieser Datei ist der Text, den wir anzeigen. Der ganze Aufwand für die Ausgabe des Textes "Hello Foos".

[administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/54d970c93d75807f3d1e4b73e8ba5b40b02cd3af/src/administrator/components/com_foos/tmpl/foos/default.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
\defined('_JEXEC') or die;
?>
Hello Foos

```

#### [src/components/com_foos/index.html](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-c39948fdaabc9d988523b05f98585e15) ... damit das Installationspaket vollständig ist

Ich habe im [Vorwort](joomla-tutorial-vorwort) geschrieben, dass die Datei `index.html` nicht benötigt wird. Das ist korrekt so! Hier habe ich diese nur hinzugefügt, weil ich ein Installationspaket zusammenstelle, aber Joomla meldet einen Fehler während der Installation, wenn kein Ordner für das Frontend vorhanden ist oder wenn ein leeres Verzeichnis im Installationspaket übergeben wird. Und im Moment haben wir keinen Inhalt für das Frontend. Das Einfügen der Datei ist an dieser Stelle nur eine Hilfe, um Fehlermeldungen während der Installation zu vermeiden.

[components/com_foos/index.html](https://github.com/astridx/boilerplate/blob/t1/src/components/com_foos/index.html)

```html {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/54d970c93d75807f3d1e4b73e8ba5b40b02cd3af/src/api/com_foos/index.html -- >

<!DOCTYPE html><title></title>
```

### Geänderte Dateien

Alles ist neu. Es gibt noch keine geänderten Dateien.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen. Am Anfang ist das Einfachste, die Dateien manuell an Ort und Stelle zu kopieren:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

2. Öffne das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu deiner eben kopierten Komponente. Wähle diese aus und klicke auf die Schaltfläche `Install`.

![Ansicht, die es erlaubt, Erweiterungen zu finden, die nicht über die normale Joomla!-Installation installiert wurden.](/images/j4x1x1.png)

3. Wenn alles funktioniert, siehst du nach der Installation diese Anzeigen vor dir.

![Ansicht nach der Installation](/images/j4x1x2.png)

4. Teste als Nächstes, ob du die Ansicht für deine Komponente fehlerfrei angezeigt bekommst.

![Die erste Ansicht im Backend](/images/j4x1x3.png)

Bis hierhin war das kein Hexenwerk. Wir haben eine solide Grundlage für die weiteren Schritte.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t0...t1.diff

diff --git a/src/administrator/components/com_foos/foos.xml b/src/administrator/components/com_foos/foos.xml
new file mode 100644
index 00000000..b41bb7c4
--- /dev/null
+++ b/src/administrator/components/com_foos/foos.xml
@@ -0,0 +1,33 @@
+<?xml version="1.0" encoding="utf-8" ?>
+<extension type="component" method="upgrade">
+	<name>COM_FOOS</name>
+	<creationDate>[DATE]</creationDate>
+	<author>[AUTHOR]</author>
+	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
+	<authorUrl>[AUTHOR_URL]</authorUrl>
+	<copyright>[COPYRIGHT]</copyright>
+	<license>GNU General Public License version 2 or later;</license>
+	<version>1.0.0</version>
+	<description>COM_FOOS_XML_DESCRIPTION</description>
+	<namespace path="src">FooNamespace\Component\Foos</namespace>
+	<scriptfile>script.php</scriptfile>
+	<!-- Back-end files -->
+	<administration>
+		<!-- Menu entries -->
+		<menu view="foos">COM_FOOS</menu>
+		<submenu>
+			<menu link="option=com_foos">COM_FOOS</menu>
+		</submenu>
+		<files folder="administrator/components/com_foos">
+			<filename>foos.xml</filename>
+			<folder>services</folder>
+			<folder>src</folder>
+			<folder>tmpl</folder>
+		</files>
+	</administration>
+	<changelogurl>https://raw.githubusercontent.com/astridx/boilerplate/tutorial/changelog.xml</changelogurl>
+	<updateservers>
+		<server type="extension" name="Foo Updates">https://raw.githubusercontent.com/astridx/boilerplate/tutorial/foo_update.xml</server>
+	</updateservers>
+	<dlid prefix="dlid=" suffix="" />
+</extension>
diff --git a/src/administrator/components/com_foos/script.php b/src/administrator/components/com_foos/script.php
new file mode 100644
index 00000000..2136559d
--- /dev/null
+++ b/src/administrator/components/com_foos/script.php
@@ -0,0 +1,149 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+\defined('_JEXEC') or die;
+use Joomla\CMS\Installer\InstallerAdapter;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Log\Log;
+
+/**
+ * Script file of Foo Component
+ *
+ * @since  1.0.0
+ */
+class Com_FoosInstallerScript
+{
+	/**
+	 * Minimum Joomla version to check
+	 *
+	 * @var    string
+	 * @since  1.0.0
+	 */
+	private $minimumJoomlaVersion = '4.0';
+
+	/**
+	 * Minimum PHP version to check
+	 *
+	 * @var    string
+	 * @since  1.0.0
+	 */
+	private $minimumPHPVersion = JOOMLA_MINIMUM_PHP;
+
+	/**
+	 * Method to install the extension
+	 *
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 *
+	 * @since  1.0.0
+	 */
+	public function install($parent): bool
+	{
+		echo Text::_('COM_FOOS_INSTALLERSCRIPT_INSTALL');
+
+		return true;
+	}
+
+	/**
+	 * Method to uninstall the extension
+	 *
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 *
+	 * @since  1.0.0
+	 */
+	public function uninstall($parent): bool
+	{
+		echo Text::_('COM_FOOS_INSTALLERSCRIPT_UNINSTALL');
+
+		return true;
+	}
+
+	/**
+	 * Method to update the extension
+	 *
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 *
+	 * @since  1.0.0
+	 *
+	 */
+	public function update($parent): bool
+	{
+		echo Text::_('COM_FOOS_INSTALLERSCRIPT_UPDATE');
+
+		return true;
+	}
+
+	/**
+	 * Function called before extension installation/update/removal procedure commences
+	 *
+	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 *
+	 * @since  1.0.0
+	 *
+	 * @throws Exception
+	 */
+	public function preflight($type, $parent): bool
+	{
+		if ($type !== 'uninstall')
+		{
+			// Check for the minimum PHP version before continuing
+			if (!empty($this->minimumPHPVersion) && version_compare(PHP_VERSION, $this->minimumPHPVersion, '<'))
+			{
+				Log::add(
+					Text::sprintf('JLIB_INSTALLER_MINIMUM_PHP', $this->minimumPHPVersion),
+					Log::WARNING,
+					'jerror'
+				);
+
+				return false;
+			}
+
+			// Check for the minimum Joomla version before continuing
+			if (!empty($this->minimumJoomlaVersion) && version_compare(JVERSION, $this->minimumJoomlaVersion, '<'))
+			{
+				Log::add(
+					Text::sprintf('JLIB_INSTALLER_MINIMUM_JOOMLA', $this->minimumJoomlaVersion),
+					Log::WARNING,
+					'jerror'
+				);
+
+				return false;
+			}
+		}
+
+		echo Text::_('COM_FOOS_INSTALLERSCRIPT_PREFLIGHT');
+
+		return true;
+	}
+
+	/**
+	 * Function called after extension installation/update/removal procedure commences
+	 *
+	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 *
+	 * @since  1.0.0
+	 *
+	 */
+	public function postflight($type, $parent)
+	{
+		echo Text::_('COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT');
+
+		return true;
+	}
+}
diff --git a/src/administrator/components/com_foos/services/provider.php b/src/administrator/components/com_foos/services/provider.php
new file mode 100644
index 00000000..b1467814
--- /dev/null
+++ b/src/administrator/components/com_foos/services/provider.php
@@ -0,0 +1,57 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
+use Joomla\CMS\Extension\ComponentInterface;
+use Joomla\CMS\Extension\Service\Provider\CategoryFactory;
+use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
+use Joomla\CMS\Extension\Service\Provider\MVCFactory;
+use Joomla\CMS\HTML\Registry;
+use Joomla\DI\Container;
+use Joomla\DI\ServiceProviderInterface;
+use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;
+
+/**
+ * The foos service provider.
+ * https://github.com/joomla/joomla-cms/pull/20217
+ *
+ * @since  1.0.0
+ */
+return new class implements ServiceProviderInterface
+{
+	/**
+	 * Registers the service provider with a DI container.
+	 *
+	 * @param   Container  $container  The DI container.
+	 *
+	 * @return  void
+	 *
+	 * @since   1.0.0
+	 */
+	public function register(Container $container)
+	{
+		$container->registerServiceProvider(new CategoryFactory('\\FooNamespace\\Component\\Foos'));
+		$container->registerServiceProvider(new MVCFactory('\\FooNamespace\\Component\\Foos'));
+		$container->registerServiceProvider(new ComponentDispatcherFactory('\\FooNamespace\\Component\\Foos'));
+
+		$container->set(
+			ComponentInterface::class,
+			function (Container $container)
+			{
+				$component = new FoosComponent($container->get(ComponentDispatcherFactoryInterface::class));
+
+				$component->setRegistry($container->get(Registry::class));
+
+				return $component;
+			}
+		);
+	}
+};
diff --git a/src/administrator/components/com_foos/src/Controller/DisplayController.php b/src/administrator/components/com_foos/src/Controller/DisplayController.php
new file mode 100644
index 00000000..048864f7
--- /dev/null
+++ b/src/administrator/components/com_foos/src/Controller/DisplayController.php
@@ -0,0 +1,47 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Controller;
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\MVC\Controller\BaseController;
+
+/**
+ * Foos master display controller.
+ *
+ * @since  1.0.0
+ */
+class DisplayController extends BaseController
+{
+	/**
+	 * The default view.
+	 *
+	 * @var    string
+	 * @since  1.0.0
+	 */
+	protected $default_view = 'foos';
+
+	/**
+	 * Method to display a view.
+	 *
+	 * @param   boolean  $cachable   If true, the view output will be cached
+	 * @param   array    $urlparams  An array of safe URL parameters and their variable types, for valid values see {@link \JFilterInput::clean()}.
+	 *
+	 * @return  BaseController|bool  This object to support chaining.
+	 *
+	 * @since   1.0.0
+	 *
+	 * @throws  \Exception
+	 */
+	public function display($cachable = false, $urlparams = array())
+	{
+		return parent::display();
+	}
+}
diff --git a/src/administrator/components/com_foos/src/Extension/FoosComponent.php b/src/administrator/components/com_foos/src/Extension/FoosComponent.php
new file mode 100644
index 00000000..aaad21ec
--- /dev/null
+++ b/src/administrator/components/com_foos/src/Extension/FoosComponent.php
@@ -0,0 +1,49 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Extension;
+
+defined('JPATH_PLATFORM') or die;
+
+use Joomla\CMS\Categories\CategoryServiceInterface;
+use Joomla\CMS\Categories\CategoryServiceTrait;
+use Joomla\CMS\Extension\BootableExtensionInterface;
+use Joomla\CMS\Extension\MVCComponent;
+use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
+use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;
+use Psr\Container\ContainerInterface;
+
+/**
+ * Component class for com_foos
+ *
+ * @since  1.0.0
+ */
+class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface
+{
+	use CategoryServiceTrait;
+	use HTMLRegistryAwareTrait;
+
+	/**
+	 * Booting the extension. This is the function to set up the environment of the extension like
+	 * registering new class loaders, etc.
+	 *
+	 * If required, some initial set up can be done from services of the container, eg.
+	 * registering HTML services.
+	 *
+	 * @param   ContainerInterface  $container  The container
+	 *
+	 * @return  void
+	 *
+	 * @since   1.0.0
+	 */
+	public function boot(ContainerInterface $container)
+	{
+		$this->getRegistry()->register('foosadministrator', new AdministratorService);
+	}
+}
diff --git a/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php b/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php
new file mode 100644
index 00000000..b598e7fe
--- /dev/null
+++ b/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php
@@ -0,0 +1,21 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Service\HTML;
+
+defined('JPATH_BASE') or die;
+
+/**
+ * Foo HTML class.
+ *
+ * @since  1.0.0
+ */
+class AdministratorService
+{
+}
diff --git a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
new file mode 100644
index 00000000..e7bb0120
--- /dev/null
+++ b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
@@ -0,0 +1,36 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\View\Foos;
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+
+/**
+ * View class for a list of foos.
+ *
+ * @since  1.0.0
+ */
+class HtmlView extends BaseHtmlView
+{
+	/**
+	 * Method to display the view.
+	 *
+	 * @param   string  $tpl  A template file to load. [optional]
+	 *
+	 * @return  void
+	 *
+	 * @since   1.0.0
+	 */
+	public function display($tpl = null): void
+	{
+		parent::display($tpl);
+	}
+}
diff --git a/src/administrator/components/com_foos/tmpl/foos/default.php b/src/administrator/components/com_foos/tmpl/foos/default.php
new file mode 100644
index 00000000..4796008d
--- /dev/null
+++ b/src/administrator/components/com_foos/tmpl/foos/default.php
@@ -0,0 +1,11 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+\defined('_JEXEC') or die;
+?>
+Hello Foos
diff --git a/src/api/com_foos/index.html b/src/api/com_foos/index.html
new file mode 100644
index 00000000..2efb97f3
--- /dev/null
+++ b/src/api/com_foos/index.html
@@ -0,0 +1 @@
+<!DOCTYPE html><title></title>
diff --git a/src/components/com_foos/index.html b/src/components/com_foos/index.html
new file mode 100644
index 00000000..2efb97f3
--- /dev/null
+++ b/src/components/com_foos/index.html
@@ -0,0 +1 @@
+<!DOCTYPE html><title></title>

```
