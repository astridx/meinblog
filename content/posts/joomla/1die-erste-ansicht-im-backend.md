---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-07-13
title: 'Die erste Ansicht im Backend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-erste-ansicht-im-backend
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Wir fangen mit den Grundlagen an. Dazu erstellen wir die _View_ im Administrationsbereich rudimentär. Am Ende dieses Textes weißt du, wie du einen Menüpunkt<!-- \index{Menüpunkt!Backend} --> im Menü des Administrationsbereichs einfügst. Über den Menüeintrag öffnest du die Ansicht zu deiner Komponente. Sei nicht enttäuscht: Diese enthält bisher nichts weiter als einen kurzen statischen Text. Du hast eine Grundlage für die weiteren Schritte.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t0...t1)[^codeberg.org/astrid/j4examplecode/compare/t0...t1] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ foos.xml

Die Datei `foos.xml` teilt Joomla mit, wie unsere Komponente installiert wird. Genau wie Module und Plugins verfügen Komponenten über eine XML-Installationsdatei<!-- \index{Installationsmanifest} -->, die Joomla über die zu installierende Erweiterung informiert. Diese Datei wird als Manifest bezeichnet und enthält Details wie

- die Versionsnummer,
- alle von der Komponente verwendeten Dateien und Ordner,
- Details zur Datenbank,
- und Komponentenparameter.

Erstelle eine neue Datei und nennen Sie sie `foos.xml`. Dies ist der Name der Erweiterung ohne das Präfix `com_`. Wir werden dann jede Zeile durchgehen und uns ansehen, was sie bewirkt.

Die erste Zeile ist nicht spezifisch für Joomla. Sie sagt uns, dass dies eine XML-Datei ist.

```xml
<?xml version="1.0" encoding="utf-8" ?>
```

Dann teilen wir Joomla mit, dass wir eine Komponente erstellen. Und wir wünschen, dass die Upgrade-Installationsmethode verwendet wird. So ist es möglich, dieses Paket nicht nur für die Installation, sondern ebenfalls für ein Update zu nutzen.

```xml
<extension type="component" method="upgrade">
```

> Manchmal findest du im `<extension>`-Tag des Manifestes einen Parameter mit einer Versionsnummer. Diese Nummer wird nirgendwo verwendet, deshalb ist sie unnötig. Weitere Informationen dazu findest du unter [github.com/joomla/joomla-cms/pull/25820](https://github.com/joomla/joomla-cms/pull/25820).

Danach definieren wir den Namen der Komponente. In diesem Fall `COM_FOOS`.

```xml
<name>COM_FOOS</name>
```

> Du findest ergänzende Informationen zum Namen unter [github.com/joomla/joomla-cms/issues/26221](https://github.com/joomla/joomla-cms/issues/26221).

Die nächsten Zeilen sind selbsterklärend. Ergänze deine Daten.

```xml
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
```

Dies ist die erste Version der Komponente. Wir werden ihr die Versionsnummer `1.0.0` geben: `<version>1.0.0</version>`. Wenn wir einen kleinen Fehler beheben, wäre die nächste Nummer `1.0.1`. Wenn wir eine neue Funktion einführen, wählen wir `1.1.0`. Wenn wir größere Änderungen vorgenommen haben, die Implementierungen in früheren Versionen ändern, heißt die nächste Version `2.0.0`. Es ist wichtig, dass du die dreiteilige Versionsnummerierung verwendest, da dies das spätere Erstellen von Updates mithilfe der semantischen Versionierung erleichtert.

> Joomla folgt der [semantischen Versionierung](https://developer.joomla.org/news/586-joomla-development-strategy.html#version_numbering)[^developer.joomla.org/news/586-joomla-development-strategy.html#version_numbering]. Ich empfehle dir dies ebenfalls.

Im Beschreibungsfeld verwenden wir einen Sprachstring.

```xml
<description>COM_FOOS_ XML_DESCRIPTION</description>
```

Im Moment hat dies noch keine Auswirkungen. Später ändert sich dieser Text basierend auf den Sprachdateien, die wir in einem der nächsten Kapitel einführen.
Die Beschreibung der Komponente wird bei der Installation angezeigt und, wenn du das Menü `System` klickst und das Untermenü `Manage | Extensions` auswählst.

Als nächstes setzen wir das HTML-Tag für den Namespace. Im Vorwort habe ich erklärt, warum wir Namespaces verwenden. Nun erstellen wir ihn praktisch. Wie benennst du deinen Namespace?

- Das erste Element des Namespaces ist dein _Firmenname_. Für dieses Tutorial habe ich `FooNamespace` verwendet. Er wird genutzt, um den Code von dem Code in anderen Erweiterungen zu unterscheiden. So ist es möglich, identische Klassennamen ohne Konflikte zu verwenden. Der Namespace wird ebenso zum Registrieren eines Service Providers verwendet. Ein Service Provider ist eine PHP-Klasse, die Dienste anbietet.

- Das zweite Element ist die Art der Erweiterung: Komponente, Modul, Plugin, Sprache oder Template.

- Das dritte Element ist der Name der Erweiterung ohne vorheriges `com_`, `mod_`, `plg_` oder `tpl_`, in unserem Fall `Foos`.

```xml
<namespace>FooNamespace\Component\Foos</namespace>
```

Mithilfe der `script`-Datei rufst du Code auf, wenn deine Komponente installiert, deinstalliert oder aktualisiert wird.

```xml
<scriptfile>script.php </scriptfile>
```

Wie Joomla selbst haben Komponenten ein Frontend und einen Administrationsbereich. Der Ordner `administrator/components/ com_foos` enthält alle vom Backend verwendeten Dateien. Einzelne fügst du mit dem Tag `filename` hinzu. Für ein vollständiges Verzeichnis verwendest du besser das Tag `folder`. Die Dateien für den Administrationsbereich deiner Komponente befinden sich alle innerhalb des Tags `administration`. Hier ist weiterhin ein `menu`-Tag. Dies ist der Menüpunkt, der in der Seitenleiste im Backend angezeigt wird. Wir verwenden den Sprachstring `COM_FOOS`, den wir später mit Text aus einer Sprachdatei ersetzen werden.

```xml
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
```

Die Tags `changelogurl` und `updateservers` werden wir im nächsten Kapitel genauer ansehen.

```xml
<changelogurl>https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/changelog.xml</changelogurl>
<updateservers>
	<server type="extension" name="Foo Updates">https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/foo_update.xml</server>
</updateservers>
```

Kommen wir zum _dlid_-tag.

```xml
<dlid prefix="dlid=" suffix="" />
```

Du benötigst dieses, wenn du den _Download Key Manager_ verwendest. Im Allgemeinen ist dies nur bei kommerziellen Erweiterungen<!-- \index{kommerzielle Erweiterungen} --> der Fall. Mehr Informationen findest du auf Github unter [github.com/joomla/joomla-cms/pull/25553](https://github.com/joomla/joomla-cms/pull/25553).

Zuletzt schließen wir das `</extension>`-Tag. Hier der vollständige Code:

[administrator/components/com_foos/ foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t1/src/administrator/components/com_foos/foos.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t1/src/administrator/components/com_foos/foos.xml -->

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
	<changelogurl>https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/changelog.xml</changelogurl>
	<updateservers>
		<server type="extension" name="Foo Updates">https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/foo_update.xml</server>
	</updateservers>
	<dlid prefix="dlid=" suffix="" />
</extension>

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ script.php

Mit der Installationsskriptdatei<!-- \index{Installationsskript} --> rufst du Code auf

- wenn deine Komponente installiert wird,
- bevor deine Komponente installiert wird,
- wenn deine Komponente deinstalliert wird,
- bevor deine Komponente deinstalliert wird,
- oder wenn deine Komponente aktualisiert wird.

Erstelle die Datei `script.php` mit folgendem Inhalt:

[administrator/components/com_foos/ script.php](https://codeberg.org/astrid/j4examplecode/src/branch/t1/src/administrator/components/com_foos/script.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t1/src/administrator/components/com_foos/script.php

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
		if ($type !== 'uninstall') {
			// Check for the minimum PHP version before continuing
			if (!empty($this->minimumPHPVersion) && version_compare(PHP_VERSION, $this->minimumPHPVersion, '<')) {
				Log::add(
					Text::sprintf('JLIB_INSTALLER_MINIMUM_PHP', $this->minimumPHPVersion),
					Log::WARNING,
					'jerror'
				);

				return false;
			}

			// Check for the minimum Joomla version before continuing
			if (!empty($this->minimumJoomlaVersion) && version_compare(JVERSION, $this->minimumJoomlaVersion, '<')) {
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

Die `install`-Funktion wird, wie der Name schon sagt, aufgerufen, wenn die Komponente installiert wird. Im Moment wird ein Text ausgegeben. Möglich ist es Beispieldaten zu installieren.

`uninstall` wird aufgerufen, wenn jemand die Komponente deinstalliert. Derzeit wird auch hier lediglich ein Text angezeigt.

Die Aktualisierungsfunktion `update` wird immer dann aufgerufen, wenn du die Komponente aktualisierst. Haben sich in der Erweiterung Speicherorte verändert? In dem Fall möchtes du unter Umständen Dateien löschen? Dann könnte die `update`-Methode wie folgt aussehen:

```php
	public function update($parent)
	{
		$this->deleteFiles[] = '/administrator/language/en-GB/?.ini';
		$this->deleteFiles[] = '/administrator/language/en-GB/?.sys.ini';

		$this->removeFiles();

		return true;
	}
```

Die `preflight`-Funktion wird aufgerufen, bevor die Komponente installiert, discover_installiert, aktualisiert oder deinstalliert wird. Du kannst an dieser Stelle Code hinzufügen, um Voraussetzungen wie die PHP-Version zu überprüfen oder um zu testen, ob eine andere Erweiterung installiert ist oder nicht.

Die `postflight`-Funktion wird aufgerufen, nachdem die Komponente installiert, discover_installiert, aktualisiert oder deinstalliert wurde. Mit dieser Funktion werden oft Standardwerte für Komponentenparameter gesetzt.

> Hinweis: In Joomla 3 haben ausschließlich Plugins die Preflight-Methode während des Deinstallationsprozesses aufgerufen und Postflight wurde nie bei der Deinstallation verwendet. Ab Joomla in Version 4.0 sind diese beiden Hooks bei der Deinstallation für alle Erweiterungstypen verfügbar. Siehe [potenzielle Abwärtskompatibilitätsprobleme in Joomla 4](https://docs.joomla.org/Potential_backward_compatibility_issues_in_Joomla_4#CMS_Libraries)[^docs.joomla.org/Potential_backward_compatibility_issues_in_Joomla_4#CMS_Libraries].

> Möchtest du ganz genau wissen, wann welche Methode aufgerufen wird? Dann sieh dir die Datei `/libraries/src/Installer/InstallerAdapter.php` an. Die Befehle `$this->triggerManifestScript('');` starten die Ausführung der entsprechenden Methode. Die `postflight`-Funktion wird beispielsweise via `$this->triggerManifestScript('postflight');` getriggert.

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ services/provider.php

`provider.php` wird zum Implementieren der Komponentendienste verwendet. Über eine Schnittstelle definiert die Komponentenklasse, welche Dienste sie bereitstellt. Hierzu wird ein Abhängigkeitsinjektionscontainer oder DI-Container verwendet. Zum Registrieren sind `ComponentDispatcherFactory` und `MVCFactory` für jede Komponente obligatorisch. Die Registrierung von `CategoryFactory` ist an dieser Stelle optional, wir benötigen die `CategoryFactory`, wenn wir später Kategorien integrieren. Mithilfe von `provider.php` ist es möglich, neue Dienste ohne Unterbrechung der Abwärtskompatibilität (Backwards compatibility BC) einzuführen. Wenn du mit dem Konzept der DI Container nicht vertraut bist aber gerne mehr erfahren möchtest, findest du unter folgenden Links Erklärungen und einige Beispiele:<!-- \index{DI Container} -->

- [joomla-framework/di](https://github.com/joomla-framework/di)[^github.com/joomla-framework/di].
- [docs/why-dependency-injection.md](https://github.com/joomla-framework/di/blob/master/docs/why-dependency-injection.md)[^github.com/joomla-framework/di/blob/master/docs/why-dependency-injection.md].

Weitere Informationen zur Implementierung findest du auf [Github](https://github.com/joomla/joomla-cms/pull/20217)[^github.com/joomla/joomla-cms/pull/20217].

Du siehst oft das Wort `Factory` im Joomla-Code. Das liegt daran, dass Joomla das [Factory-Design-Muster](https://de.wikipedia.org/wiki/Fabrikmethode)[^de.wikipedia.org/wiki/fabrikmethode] verwendet. Die Factory-Methode ist ein Muster, bei dem die Schnittstelle zur Erstellung eines Objekts eine abstrakte Methode einer vererbenden Klasse ist. Die konkrete Umsetzung der Erstellung neuer Objekte findet jedoch nicht in der Oberlasse statt, sondern in davon abgeleiteten Unterklassen. Letztere implementieren die besagte abstrakte Methode. Um Erweiterungen für Joomla zu programmieren ist es nicht zwingend, dass du die Design-Pattern kennst. Ein Blick über den Tellerrand kann aber lohnenswert sein. In der Softwaretechnik ist ein [Entwurfsmuster](https://de.wikipedia.org/wiki/Entwurfsmuster)[^de.wikipedia.org/wiki/entwurfsmuster] eine allgemeine, wieder-verwendbare Lösung für ein häufig auftretendes Problem. Jemand anderes hatte das gleiche Problem und hat eine Lösung gefunden. Wir müssen nicht das gleiche Problem lösen, sondern können darauf aufbauen.<!-- \index{Entwurfsmuster!Fabrikmethode} --><!-- \index{Entwurfsmuster} -->

[administrator/components/com_foos/ services/provider.php](https://codeberg.org/astrid/j4examplecode/src/branch/t1/src/administrator/components/com_foos/services/provider.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t1/src/administrator/components/com_foos/services/provider.php

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
			function (Container $container) {
				$component = new FoosComponent($container->get(ComponentDispatcherFactoryInterface::class));

				$component->setRegistry($container->get(Registry::class));

				return $component;
			}
		);
	}
};

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Controller/DisplayController.php

Die Datei `DisplayController.php`<!-- \index{DisplayController (Backend)} --> ist der Einstiegspunkt für den Model-View-Controller-Teil des Administrationsbereichs der Foo-Komponente. Nenne die Klasse _DisplayController_. Joomla erwartet das so. Erweitere _BaseController_, um viele Dinge Out-of-the-Box zu nutzen.

Die Hauptaufgabe dieses Controllers ist es, die Anzeige vorzubereiten. Daher heißt der Standardcontroller DisplayController. Er ruft die Methode `display()` der Elternklasse `BaseController` im Namespace `Joomla\CMS\MVC\Controller` auf. Genau ist dies die Datei `libraries/src/MVC/Controller/ BaseController.php`. Im Model-View-Controller-Modell werden Controller oft zum Einrichten der Startumgebung genutzt.

Erstellen wir den _DisplayController_. Wie immer legen wir zunächst den _DocBlock_ an<!-- \index{DocBlock} -->. Hier ist ein Beispiel für einen typischen Dokumentarblock.

![Ein Beispiel für einen typischen Dokumentarblock in Joomla](/images/dockblock.png)

> Wofür steht `__BUMP_VERSION__` oder `__DEPLOY_VERSION__`? Manchmal sieht man seltsame Texte wie diesen in einem _DocBlock_. Zum Beispiel im [PR 27712](https://github.com/joomla/joomla-cms/pull/27712/files)[^github.com/joomla/joomla-cms/pull/27712/files]. In Joomla setzen wir `__DEPLOY_VERSION__` an die Stelle der Versionsnummer einer von uns neu erstellten Methode. Da wir nicht wissen, in welcher Version dieser neue Code in Joomla akzeptiert wird, können wir keine reale Versionsnummer verwenden. Wenn der neue Code zum Kern hinzugefügt wird, wird dieser seltsame String automatisch durch die aktuelle Versionsnummer ersetzt. In anderen Systemen ist `__BUMP_VERSION__` üblich. Ich verwende hier ebenfalls `__BUMP_VERSION__`.<!-- \index{DEPLOY VERSION} --><!-- \index{BUMP VERSION} -->

Wie du DocBlocks für Joomla erstellst, erklären die Joomla Codierungsstandards<!-- \index{Codierungsstandards} --> unter [developer.joomla.org/ coding-standards/docblocks.html](https://developer.joomla.org/coding-standards/docblocks.html) und der Pull Request [github.com/joomla/joomla-cms/ pull/31504](https://github.com/joomla/joomla-cms/pull/31504).

> Vor jeder Klasse und vor jeder Funktion wird ein DocBlock eingefügt. Der gesamte Code enthält DocBlock-Kommentare, die es automatisierten Tools erleichtern, eine Dokumentation zu generieren. Zusätzlich hilft ein DocBlock IDEs, die Code-Vervollständigung bereitzustellen. Und manchmal ist der Kommentar für Programmierer hilfreich. Ich drucke die Dokumentarblöcke hier nicht weiter ab. In den Code-Beispielen auf Github sind die DocBlocks weiterhin vorhanden.

Nach dem DocBlock fügst du den _Namespace_ ein.

```php
namespace FooNamespace\Component\Foos\Administrator\Controller;
```

Diesen deklarierst du mit dem entsprechenden Schlüsselwort. Namespaces wurden in Joomla 4 eingeführt. Wenn dieses Konzept dir neu ist, lese die Übersicht über Namespace bei [php.net](https://www.php.net/manual/de/language.namespaces.php)[^php.net/manual/de/language.namespaces.php]. Es ist zwingend, dass der Namespace vor allem anderen Code in der Datei steht.

Nach dem Namespace fügen wir

```php
\defined('_JEXEC') or die;`
```

ein, sodass diese PHP-Datei nicht direkt aufrufbar ist.

Als nächstes importieren wir mit dem Schlüsselwort `use` den Namespace der Eltern-Klasse `BaseController` um diese nutzen zu können.

```php
use Joomla\CMS\MVC\Controller\BaseController;
```

Anschließend erstellen wir die Controller-Klasse. Ich hatte schon geschrieben, dass du diese am besten `DisplayController` nennst und mit ihr idealerweise die Klasse `BaseController` erweiterst. Definiere dann die Variable `$default_view`, in der du die Standardansicht mit `foos` festlegst. Du wählst `foos` als Ansicht, weil der Name der Komponente `foos` ist und wir aus dem Grund auch das Verzeichnis `/administrator/components/ com_foos/src/View/Foos` anlegen werden. Wenn nichts definiert ist, wird standardmäßig die Foos-Ansicht mit dem Standardlayout verwendet. Das setzen der Variable `$default_view` ist nicht erforderlich. Aber ich denke, es ist eindeutiger, diese Zeile einzufügen.

Wenn du die URL genauer betrachtest, während du eine Komponente im Administrationsbereich verwendest, fallen dir gegebenenfalls die Ansichts- und Layout-Variablen auf. Beispielsweise bewirkt die URL `index.php ?option=com_foos &view=foos &layout=default`, dass die `foos`-Ansicht mit dem Standardlayout `default` geladen wird. Somit wird die Datei `components/` + `com_foos/tmpl/foos/` + `default.php` aufgerufen, wenn du dich im Frontend befindest. Arbeitest du im Backend, wird `administrator/components/` + `com_foos/tmpl/foos/` + `default.php` verwendet.

> Die Sichtbarkeit wird in PHP mit `public`, `private` oder `protected` definiert. Wann du was einsetzt erklärt das [PHP-Handbuch](https://www.php.net/manual/de/language.oop5.visibility.php)[^php.net/manual/de/language.oop5.visibility.php].

Lege alles so an, wie es in Joomla vorgesehen ist. Dies bringt dir Vorteile. Für viele oft benutze Funktionen erfindest du das Rad nicht neu. Praktisch siehst du das anhand der Methode `display`. In deinem Code implementierst du keine Aktion. Alle Arbeit wird von `parent::display()` erledigt.

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t1/src/administrator/components/com_foos/src/Controller/DisplayController.php

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
	public function display($cachable = false, $urlparams = [])
	{
		return parent::display();
	}
}

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Extension/FoosComponent.php

`FoosComponent.php` ist der Code zum Booten der Erweiterung. Es ist die erste Datei, die aufgerufen wird, wenn Joomla die Komponente lädt. `boot` ist die Funktion zum Einrichten der Umgebung der Erweiterung wie beispielsweise das Registrieren neuer Klassen. Weitere Informationen findest du im Pull Request [github.com/joomla/joomla-cms/pull/20217](https://github.com/joomla/joomla-cms/pull/20217). Im weiteren Verlauf werden wir die Datei `FoosComponent.php` erweitern.

[administrator/components/com_foos/Extension/FoosComponent.php](https://codeberg.org/astrid/j4examplecode/src/branch/t1/src/administrator/components/com_foos/Extension/FoosComponent.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t1/src/administrator/components/com_foos/src/Extension/FoosComponent.php

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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Service/HTML/AdministratorService.php

Obwohl wir den Code für eine minimale Komponente entwickeln, werden einige Dateien für die Administration benötigt. Die Datei `AdministratorService.php` wird später verwendet, um Funktionen wie die Mehrsprachigkeit oder Haupteinträge/Featured hinzuzufügen. Im Moment brauchen wir diese Funktionen nicht. Aber wir bereiten hier schon alles vor.

[administrator/components/com_foos/ service/HTML/AdministratorService.php](https://codeberg.org/astrid/j4examplecode/src/branch/t1/src/administrator/components/com_foos/Service/HTML/AdministratorService.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t1/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php

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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foos/HtmlView.php

Die Ansicht `administrator/components/com_foos/ src/View/Foos/HtmlView.php` definiert Objekte (Symbolleiste, Titel) und ruft das Modell (Daten) auf. Im Moment hat unsere Komponente eine rudimentäre Ansicht. Es wird lediglich ein statischer Text angezeigt. Dies ändert sich bald! Es gibt mehrere Dateien, die zusammenarbeiten, um die Ansicht im Frontend zu generieren. Beteiligt ist beispielsweise der Controller, der die Ansicht aufruft. Den Controller erstellten wir im aktuellen Kapitel weiter vorne. In einem späteren Kapitel kommt das Modell hinzu, welches die Daten vorbereitet.

> Verwende bei den Namen für eine View am besten lediglich einen Großbuchstaben als Anfangsbuchstaben. Ich hatte ein Problem mit dem Namen einer zusätzlichen `View`. Ich verwendete `FOOPlaces`. Die Ansicht wurde unter diesem Namen nicht gefunden. Nachdem ich den View-Ordner und den Namespace in `Fooplaces` umbenannt habe, funktioniert alles einwandfrei. Ich habe eine Erklärung zu Namenskonventionen auf [Github](https://docs.joomla.org/J4.x:File_Structure_and_Naming_Conventions)[^docs.joomla.org/j4.x:file_structure_and_naming_conventions] gefunden. Laut dieser Seite sollte der Ordnername für das Template in Kleinbuchstaben geschrieben werden. Hier steht nicht, dass zusätzlich die View lediglich für Anfangsbuchstaben einen Großbuchstaben nutzen darf. Laut einer [Diskussion](https://github.com/joomla/joomla-cms/discussions/36679)[^github.com/joomla/joomla-cms/discussions/36679] ist dies aber wohl trotzdem so.

In der Datei `HtmlView.php` werden alle Schaltflächen und Titel der Symbolleiste definiert. Das Modell wird aufgerufen, um die Daten für die Ansicht vorzubereiten. Im Moment rufen wir nur die Funktion der Eltern-Klasse auf, um das Standardtemplate anzuzeigen: `parent::display($tpl);`. Warum selbst Hand anlegen, wenn es Funktionen in Joomla dafür gibt?

[administrator/components/com_foos/src/View/Foos/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t1/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t1/src/administrator/components/com_foos/src/View/Foos/HtmlView.php

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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foos/default.php

Die Datei `default.php` ist das Template zum Rendern der Ansicht. Man erkennt diese weiterhin am Verzeichnisnamen `tmpl`. In ihr befindet sich der Text, den wir anzeigen. Im Moment betreiben wir den ganze Aufwand für die Ausgabe des Textes "Hello Foos".

[administrator/components/com_foos/ tmpl/foos/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t1/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t1/src/administrator/components/com_foos/tmpl/foos/default.php

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

<!-- prettier-ignore -->
#### components/com\_foos/index.html und api/index.html

Ich habe im Vorwort geschrieben, dass die Datei `index.html`<!-- \index{index.html} --> nicht benötigt wird. Das ist korrekt so! Hier habe ich diese nur hinzugefügt, weil ich ein Installationspaket zusammenstelle, aber Joomla meldet einen Fehler während der Installation, wenn kein Ordner für das Frontend vorhanden ist oder wenn ein leeres Verzeichnis im Installationspaket übergeben wird. Im Moment haben wir keinen Inhalt für das Frontend. Das temporäre Einfügen der Datei ist an dieser Stelle also lediglich eine Hilfe, um Fehlermeldungen während der Installation zu vermeiden. Der Vollständigkeit halber lege ich den Ordner `api` an. 

[components/com_foos/index.html](https://codeberg.org/astrid/j4examplecode/src/branch/t1/src/components/com_foos/index.html)

```html {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t1/src/components/com_foos/index.html -- >

<!DOCTYPE html><title></title>
```

### Geänderte Dateien

Alles ist neu. Es gibt noch keine geänderten Dateien.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Am Anfang ist das Einfachste, die Dateien manuell an Ort und Stelle zu kopieren. Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

2. Öffne das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu deiner eben kopierten Komponente. Wähle diese aus und klicke auf die Schaltfläche `Install`.

![Ansicht, die es erlaubt, Erweiterungen zu finden, die nicht über die normale Joomla-Installation installiert wurden.](/images/j4x1x1.png)

3. Wenn alles funktioniert, siehst du nach der Installation die folgende Anzeigen vor dir.

![Ansicht nach der Installation](/images/j4x1x2.png)

4. Teste als nächstes, ob die Ansicht für deine Komponente fehlerfrei ist.

![Die erste Ansicht im Backend](/images/j4x1x3.png)

> In früheren Joomla-Versionen wurde am Ende der Installation der Text im Backend ausgegeben, der mit dem Befehl `echo Text::_('...')` in das Installationsskript eingefügt ist. Seit Joomla 4 geschieht dies nicht mehr ohne Weiteres. Weitere Informationen sind auf [Github](https://github.com/joomla/joomla-cms/issues/36343)[^github.com/joomla/joomla-cms/issues/36343] verfügbar.

Bis hierhin war das kein Hexenwerk. Wir haben eine solide Grundlage für die weiteren Schritte.
<img src="https://vg08.met.vgwort.de/na/91a964b14e904ded9ad45011c0ad492c" width="1" height="1" alt="">
