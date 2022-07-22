---
description: 'desc'
shortTitle: 'short'
date: 2021-01-01
title: 'Package - Putting several extensions together in one installable package'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-paket-alles-zusammen
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

We have created a lot of different extensions. It is annoying to do a separate installation for each one. This is not reasonable for a user. Moreover, some of these extensions build on each other and it is important to make sure that everything is installed and nothing has been forgotten. Therefore, in this concluding chapter I show how different extensions are packed together into one installation package.<!-- \index{package} -->

> For impatient people: Look at the changed programme code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t41...t42)[^github.com/astridx/boilerplate/compare/t41...t42] and apply these changes to your development version.

## Step by step

In this section we will create an installation package.

### New files

#### Package

##### administrator/manifests/ packages/foos/script.php

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

##### administrator/manifests/ packages/pkg_foos.xml

You already know the manifest. In the case of a package, there is little new here. In the area of the files to be copied, you specify the installation packages of the extensions that are to be installed.

[administrator/manifests/ packages/pkg_foos.xml](https://github.com/astridx/boilerplate/blob/t42/src/administrator/manifests/packages/pkg_foos.xml)

```XML
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t42/src/administrator/manifests/packages/pkg_foos.xml -->
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
		<server type="extension" name="Foo Updates">https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/foo_update.xml</server>
	</updateservers>
	<dlid prefix="dlid=" suffix="" />
</extension>
```

## Test your Joomla Template

1. make a new installation. To do this, uninstall your previous installation.

2. create a ZIP file for each extension.

3. create a ZIP that contains all ZIP files and the files of this chapter.

4. install the ZIP created in point 3 in Joomla.

5. make sure that all the extensions specified in the files section have been installed.

<img src="https://vg08.met.vgwort.de/na/3051e43724e44c9b9dd9ff8428a29ffd" width="1" height="1" alt="">
