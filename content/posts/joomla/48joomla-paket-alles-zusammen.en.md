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

We have created a lot of different extensions. It is annoying to do a separate installation for each one. One does not want to burden a user with this. In addition, extensions sometimes build on each other and it is important to make sure that everything is installed and nothing has been forgotten. Therefore, in this concluding chapter, I will show how different extensions are packed together into one installation package.

## For the impatient

Look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t41...t42)[^github.com/astridx/boilerplate/compare/t41...t42] and apply these changes to your development version.

## Step by step

In this section we will create an installation package. In the following overview, the newly added files are marked with a background and the changed ones are outlined.

![Overview of the files edited in this chapter](/images/tree42.png)

### New files

#### Package

##### [administrator/manifests/ packages/foos/script.php](https://github.com/astridx/boilerplate/blob/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/foos/script.php)

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

##### [administrator/manifests/ packages/pkg_foos.xml](https://github.com/astridx/boilerplate/blob/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/pkg_foos.xml)

[administrator/manifests/ packages/pkg_foos.xml](https://github.com/astridx/boilerplate/blob/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/pkg_foos.xml)

```XML
<!-- https://github.com/astridx/boilerplate/raw/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/pkg_foos.xml -->

```

## Teste dein Joomla-Template

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation.

2. Erstelle für jede Erweiterung ein ZIP-Archiv

3. Erstelle ein ZIP Archiv das alle ZIP-Dateien und die Dateien dieses Kapitels enthält.

4. Installiere das in Punkt 3 erstellt ZIP in Joomla.

5. Stelle sicher, dass alle Erweiterungen installiert wurden.
