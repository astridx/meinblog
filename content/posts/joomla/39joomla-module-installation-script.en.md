---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2021-01-11
title: 'Modules - Installation script'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-module-installation-script
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

In this chapter we add an installation script. In the explanations of the component, I described what you use it for.<!-- \index{module!installation script} -->

> For impatient people: Look at the changed program code in the [diff view](https://codeberg.org/astrid/j4examplecode/compare/t33...t34)[^codeberg.org/astrid/j4examplecode/compare/t33...t34] and copy these changes into your development version.

## Step by step

In this section we will create a script that will be executed on specific events during the installation.

### New fiels

#### Module

<!-- prettier-ignore -->
##### modules/mod\_foo/ script.php

Using the example of the script file, I show that many things are applied in the same way in the case of a module as in the case of a component.

> You can use many things in the module in the same way as in the component. For example, the update server, the changelog, help pages.

The point is to clarify the procedure. That's why this script file only takes care of setting minimum requirements and outputting texts. There are no limits to your imagination to extend this file.

[modules/mod_foo/script.php](https://codeberg.org/astrid/j4examplecode/src/branch/t34/src/modules/mod_foo/script.php)

```php
// https://codeberg.org/astrid/j4examplecode/raw/branch/t34/src/modules/mod_foo/script.php

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
		echo Text::_('MOD_FOO_INSTALLERSCRIPT_INSTALL');

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
		if (!empty($this->minimumPhp) && version_compare(PHP_VERSION, $this->minimumPhp, '<')) {
			Log::add(Text::sprintf('JLIB_INSTALLER_MINIMUM_PHP', $this->minimumPhp), Log::WARNING, 'jerror');

			return false;
		}

		// Check for the minimum Joomla version before continuing
		if (!empty($this->minimumJoomla) && version_compare(JVERSION, $this->minimumJoomla, '<')) {
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

### Modified files

#### Module

##### src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini

The language strings for the display of the language strings in the active language, we insert into the `en-GB.mod_foo.sys.ini`. Yes, this time the language file with the extension `*.sys.ini`, because the texts are used during the installation.

[src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini](https://codeberg.org/astrid/j4examplecode/src/branch/08652f6b419a4e3443d4d1e4f589bca46a8100e9/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini)

```ini {diff}
MOD_FOO="[PROJECT_NAME]"
MOD_FOO_XML_DESCRIPTION="Foo Module"
+ MOD_FOO_INSTALLERSCRIPT_PREFLIGHT="<p>Anything here happens before the + installation/update/uninstallation of the module</p>"
+ MOD_FOO_INSTALLERSCRIPT_UPDATE="<p>The module has been updated</p>"
+ MOD_FOO_INSTALLERSCRIPT_UNINSTALL="<p>The module has been uninstalled</p>"
+ MOD_FOO_INSTALLERSCRIPT_INSTALL="<p>The module has been installed</p>"
+ MOD_FOO_INSTALLERSCRIPT_POSTFLIGHT="<p>Anything here happens after the installation/update/uninstallation of the module</p>"
```

<!-- prettier-ignore -->
##### modules/mod\_foo/ mod_foo.xml

Finally, we enter the name of the script file in the manifest so that the installation routine will copy it to the right place and call it.

[modules/mod_foo/ mod_foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/08652f6b419a4e3443d4d1e4f589bca46a8100e9/src/modules/mod_foo/mod_foo.xml)

```xml {diff}
<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<version>__BUMP_VERSION__</version>
	<description>MOD_FOO_XML_DESCRIPTION</description>
+ 	<scriptfile>script.php</scriptfile>
	<namespace>FooNamespace\Module\Foo</namespace>
	<files>
<filename module="mod_foo">mod_foo.php</filename
```

## Test your Joomla modules

1. Create a new Installation. Uninstall your previous installation and copy all files again.

Copy the files in the `modules` folder into the `modules` folder of your Joomla 4 installation.

Install your module as described in part one, after you have copied all the files. Joomla will execute the script file for you during the installation. Convince yourself of this by checking the output of the language strings.

![Testing the Joomla Module - The Installation Script](/images/j4x39x1.png)

![Testing the Joomla Module - The Installation Script](/images/j4x39x2.png)

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module)[^docs.joomla.org/j4.x:creating_a_simple_module]
<img src="https://vg08.met.vgwort.de/na/529afe3503034a5b9985f4f80061963d" width="1" height="1" alt="">
