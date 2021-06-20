---
date: 2021-01-08
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Module - Installationsskript'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-module-installation-script
langKey: de
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

Wir ergänzen in diesem Kapitel ein Installationsskript. Bei den Erklärungen zur Komponente hatte ich beschrieben, wofür du dieses verwendest.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t33...t34)[^github.com/astridx/boilerplate/compare/t33...t34] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt erstellen wir ein Skript, welches bei der Installation zu bestimmten Ereignissen ausgeführt wird.

In der nachfolgenden Übersicht sind die neu hinzugekommenen Dateien mit einem Hintergrund versehen und die geänderten umrandet.

![Übersicht über die in diesem Kapitel bearbeiteten Dateien](/images/tree34.png)

### Neue Dateien

#### Module

##### [modules/mod_foo/ script.php](https://github.com/astridx/boilerplate/compare/t33...t34#diff-51e87e73a4a4e48c5330711fcea56a42a45d750bc2a3b19c92169d9eb595cdc4)

Am Beispiel der Skriptdatei zeige ich, dass Vieles im Falle eines Moduls genauso angewendet wird, wie bei einer Komponente.

> Vieles kannst du im Modul genauso anwenden, wie in der Komponente. Beispielsweise den Updateserver, das Changelog, Hilfeseiten.

Es geht darum, die Vorgehensweise zu verdeutliche. deshalb übernimmt diese Skriptdatei nur das Setzen von Mindestvoraussetzungen und die Ausgabe von Texten. Deiner Phantasie sind keine Grenzen gesetzt, um diese Datei zu erweitern.

[modules/mod_foo/script.php](https://github.com/astridx/boilerplate/blob/t34/src/modules/mod_foo/script.php)

```php
// https://raw.githubusercontent.com/astridx/boilerplate/t34/src/modules/mod_foo/script.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access to this file
\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Log\Log;

/**
 * Script file of Foo module
 */
class mod_fooInstallerScript
{

	/**
	 * Extension script constructor.
	 *
	 * @return  void
	 */
	public function __construct()
	{
		$this->minimumJoomla = '4.0';
		$this->minimumPhp = JOOMLA_MINIMUM_PHP;
	}

	/**
	 * Method to install the extension
	 *
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 */
	function install($parent)
	{
		echo Text::_('MOD_FOO_INSTALLERSCRIPT_UNINSTALL');

		return true;
	}

	/**
	 * Method to uninstall the extension
	 *
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 */
	function uninstall($parent)
	{
		echo Text::_('MOD_FOO_INSTALLERSCRIPT_UNINSTALL');

		return true;
	}

	/**
	 * Method to update the extension
	 *
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 */
	function update($parent)
	{
		echo Text::_('MOD_FOO_INSTALLERSCRIPT_UPDATE');

		return true;
	}

	/**
	 * Function called before extension installation/update/removal procedure commences
	 *
	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 */
	function preflight($type, $parent)
	{
		// Check for the minimum PHP version before continuing
		if (!empty($this->minimumPhp) && version_compare(PHP_VERSION, $this->minimumPhp, '<'))
		{
			Log::add(Text::sprintf('JLIB_INSTALLER_MINIMUM_PHP', $this->minimumPhp), Log::WARNING, 'jerror');

			return false;
		}

		// Check for the minimum Joomla version before continuing
		if (!empty($this->minimumJoomla) && version_compare(JVERSION, $this->minimumJoomla, '<'))
		{
			Log::add(Text::sprintf('JLIB_INSTALLER_MINIMUM_JOOMLA', $this->minimumJoomla), Log::WARNING, 'jerror');

			return false;
		}

		echo Text::_('MOD_FOO_INSTALLERSCRIPT_PREFLIGHT');

		return true;
	}

	/**
	 * Function called after extension installation/update/removal procedure commences
	 *
	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 */
	function postflight($type, $parent)
	{
		echo Text::_('MOD_FOO_INSTALLERSCRIPT_POSTFLIGHT');

		return true;
	}
}

```

### Geänderte Dateien

#### Module

##### [src/modules/mod\_foo/language/en-GB/en-GB.mod\_foo.sys.ini](https://github.com/astridx/boilerplate/compare/t33...t34#diff-a8517bbc527ed7d7e05fcc84325ccbd031a5f0f0f271e25c2a534bd7355ef4c3)

Die Sprachstrings für die Anzeige der Sprachstrings in der aktiven Sprache, fügen wir in die `en-GB.mod_foo.sys.ini` ein. Jawohl, dieses Mal die Sprachdatei mit der Endung `*.sys.ini`, weil die Texte bei der Installation verwendet werden.

[src/modules/mod\_foo/language/en-GB/en-GB.mod\_foo.sys.ini](https://github.com/astridx/boilerplate/blob/08652f6b419a4e3443d4d1e4f589bca46a8100e9/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini)

```ini {diff}
MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"
+ MOD_FOO_INSTALLERSCRIPT_PREFLIGHT="<p>Anything here happens before the + installation/update/uninstallation of the module</p>"
+ MOD_FOO_INSTALLERSCRIPT_UPDATE="<p>The module has been updated</p>"
+ MOD_FOO_INSTALLERSCRIPT_UNINSTALL="<p>The module has been uninstalled</p>"
+ MOD_FOO_INSTALLERSCRIPT_INSTALL="<p>The module has been installed</p>"
+ MOD_FOO_INSTALLERSCRIPT_POSTFLIGHT="<p>Anything here happens after the installation/update/uninstallation of the module</p>"
```

##### [modules/mod_foo/ mod_foo.xml](https://github.com/astridx/boilerplate/compare/t33...t34#diff-c111dcc16cb14017dbacf97ab7d495ac6e7225b2b2097774adc23a977d5cc3c3)

Im Manifest tragen wir abschließen den Namen der Skriptdatei ein, damit die Installationsroutine weiß, dass sie dieses an die richtige Stelle zu kopieren und aufzurufen hat.

[modules/mod_foo/ mod_foo.xml](https://github.com/astridx/boilerplate/blob/08652f6b419a4e3443d4d1e4f589bca46a8100e9/src/modules/mod_foo/mod_foo.xml)

```xml {diff}
<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<version>__BUMP_VERSION__</version>
	<description>MOD_FOO_XML_DESCRIPTION</description>
+ 	<scriptfile>script.php</scriptfile>
	<namespace>FooNamespace\Module\Foo</namespace>
	<files>
<filename module="mod_foo">mod_foo.php</filename
```

## Teste dein Joomla-Module

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla 4 Installation.

Installiere dein Module wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla führt bei der Installation die Skriptdatei für dich aus. Überzeuge dich davon, indem du die Ausgabe der Sprachstrings überprüfst.

![Joomla Modul testen - Das Installationsskript](/images/j4x39x1.png)

![Joomla Modul testen - Das Installationsskript](/images/j4x39x2.png)

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)[^https://docs.joomla.org/j4.x:creating_a_simple_module/de]
