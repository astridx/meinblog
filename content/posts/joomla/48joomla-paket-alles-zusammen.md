---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2021-01-01
title: 'Paket - Alle Erweiterungen in einer Installationsdatei'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-paket-alles-zusammen
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Wir haben eine Menge unterschiedlicher Erweiterung erstellt. Es ist lästig, für jede einzelne eine separate Installation durchzuführen. Dies ist einem Benutzer nicht zumutbar. Außerdem bauen diese teilweise aufeinander auf und es ist wichtig, sicherzustellen, dass alles installiert ist und nichts vergessen wurde. Deshalb zeige ich in diesem abschießenden Kapitel, wie unterschiedliche Erweiterungen zu einem Installationspaket zusammengepackt werden.<!-- \index{Paket} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t41...t42)[^codeberg.org/astrid/j4examplecode/compare/t41...t42] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt erstellen wir ein Installationspaket.

### Neue Dateien

#### Paket

##### /administrator/manifests/ packages/foos/script.php

Ein Paket ist wie die Komponente mit einem optionalen Skript erweiterbar. In unserem Fall prüfen wir, ob die Installationsvoraussetzungen in Bezug auf minimale Versionen für Joomla und PHP gegeben sind.

[/administrator/manifests/ packages/foos/script.php](https://codeberg.org/astrid/j4examplecode/src/branch/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/foos/script.php)

```php
// https://codeberg.org/astrid/j4examplecode/raw/branch/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/foos/script.php

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

Das Manifest kennst du schon. Im Falle eines Paketes gibt es hier wenig Neues. Im Bereich der zu kopierenden Dateien gibst du die Installationspakete der Erweiterungen an, die zu installieren sind.

[administrator/manifests/ packages/pkg_foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t42/src/administrator/manifests/packages/pkg_foos.xml)

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

## Teste dein Joomla-Template

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation.

2. Erstelle für jede Erweiterung ein ZIP-Archiv

3. Erstelle ein ZIP Archiv das alle ZIP-Dateien und die Dateien dieses Kapitels enthält.

4. Installiere das in Punkt 3 erstellt ZIP in Joomla.

5. Stelle sicher, dass alle Erweiterungen installiert wurden.

<img src="https://vg08.met.vgwort.de/na/66914574f5524d9e842fa1d6a75517f5" width="1" height="1" alt="">
