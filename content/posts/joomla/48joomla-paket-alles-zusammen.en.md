---
date: 2021-01-16
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Paket - Alle Erweiterungen in einer Installationsdatei'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-paket-alles-zusammen
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

We have created a lot of different extensions. It is annoying to do a separate installation for each one. This is not reasonable for a user. Moreover, some of these extensions build on each other and it is important to make sure that everything is installed and nothing has been forgotten. Therefore, in this concluding chapter I show how different extensions are packed together into one installation package.

## For the impatient

Look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t41...t42)[^github.com/astridx/boilerplate/compare/t41...t42] and apply these changes to your development version.

## Step by step

In this section we will create an installation package. In the following overview, the newly added files are marked with a background and the changed ones are outlined.

![Overview of the files edited in this chapter](/images/tree42.png)

### New files

#### Package

##### [administrator/manifests/ packages/foos/script.php](https://github.com/astridx/boilerplate/blob/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/foos/script.php)

Like the component, a package can be extended with an optional script. In our case, we check whether the installation requirements are met in terms of minimum versions for Joomla and PHP.

[administrator/manifests/ packages/foos/script.php](https://github.com/astridx/boilerplate/blob/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/foos/script.php)

```php
// https://github.com/astridx/boilerplate/raw/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/foos/script.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  pkg_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Astrid Günther, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later;
 * @link        astrid-guenther.de
 */

\defined('_JEXEC') or die;

/**
 * Installation class to perform additional changes during install/uninstall/update
 *
 * @since  __BUMP_VERSION__
 */
class Pkg_FoosInstallerScript
{
	/**
	 * Extension script constructor.
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function __construct()
	{
		$this->minimumJoomla = '4.0';
		$this->minimumPhp    = JOOMLA_MINIMUM_PHP;
	}
}

```

##### [administrator/manifests/ packages/pkg_foos.xml](https://github.com/astridx/boilerplate/blob/t42/src/administrator/manifests/packages/pkg_foos.xml)

You already know the manifest. In the case of a package, there is little new here. In the area of the files to be copied, you specify the installation packages of the extensions that are to be installed.

[administrator/manifests/ packages/pkg_foos.xml](https://github.com/astridx/boilerplate/blob/t42/src/administrator/manifests/packages/pkg_foos.xml)

```XML
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t42/src/administrator/manifests/packages/pkg_foos.xml -->
<?xml version="1.0" encoding="UTF-8" ?>
<extension type="package" version="1.0" method="upgrade">
	<name>pkg_foos</name>
	<packagename>agosms</packagename>
	<creationDate>##DATE##</creationDate>
	<packager>Astrid Günther</packager>
	<copyright>(C) ##YEAR## Astrid Günther. All rights reserved.</copyright>
	<packageremail>info@astrid-guenther.de</packageremail>
	<packagerurl>www.astrid-guenther.de</packagerurl>
	<author>Astrid Günther</author>
	<authorEmail>info@astrid-guenther.de</authorEmail>
	<authorUrl>www.astrid-guenther.de</authorUrl>
	<version>##VERSION##</version>
	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<description>PKG_FOOS_XML_DESCRIPTION</description>
	<scriptfile>script.php</scriptfile>
	<files>
		<!-- The id for each extension is the element stored in the DB -->
		<file type="component" id="com_foos">com_foos.zip</file>
		<file type="module" id="mod_foo" client="site">mod_foo.zip</file>
		<file type="plugin" id="plg_webservices_foos" group="webservices">plg_webservices_foos.zip</file>
		<file type="template" id="tpl_facile" client="site">tpl_facile.zip</file>
	</files>
	<updateservers>
		<server type="extension" name="Foo Updates">https://raw.githubusercontent.com/astridx/boilerplate/tutorial/foo_update.xml</server>
	</updateservers>
	<dlid prefix="dlid=" suffix="" />
</extension>
```

## Teste dein Joomla-Template

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation.

2. Erstelle für jede Erweiterung ein ZIP-Archiv

3. Erstelle ein ZIP Archiv das alle ZIP-Dateien und die Dateien dieses Kapitels enthält.

4. Installiere das in Punkt 3 erstellt ZIP in Joomla.

5. Stelle sicher, dass alle im Bereich Files angegebenen Erweiterungen installiert wurden.
