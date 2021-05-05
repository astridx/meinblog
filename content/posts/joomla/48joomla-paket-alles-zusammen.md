---
date: 2021-01-16
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Paket - Alle Erweiterungen in einer Installationsdatei'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-paket-alles-zusammen
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Wir haben eine Menge unterschiedlicher Erweiterung erstellt. Es ist lästig, für jede einzelne eine separate Installation durchzuführen. Dies möchte man einem Benutzer ungern zumuten. Außerdem bauen Erweiterungen teilweise aufeinander auf und es ist wichtig sicherzustellen, das alles installiert ist und nichts vergessen wurde. Deshalb zeige ich in diesem abschießenden Kapitel, wie unterschiedliche Extensions zu einem einem Installationspaket zusammengepackt werden.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t41...t42)[^github.com/astridx/boilerplate/compare/t41...t42] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt erstellen wir ein Installationspaket. In der nachfolgenden Übersicht sind die neu hinzugekommenen Dateien mit einem Hintergrund versehen und die geänderten umrandet.

![Übersicht über die in diesem Kapitel bearbeiteten Dateien](/images/tree42.png)

### Neue Dateien

#### Paket

##### [/administrator/manifests/ packages/foos/script.php](https://github.com/astridx/boilerplate/blob/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/foos/script.php)

[/administrator/manifests/ packages/foos/script.php](https://github.com/astridx/boilerplate/blob/210867f3a4211ecff2c364f292bc4250cd75bc71/src/administrator/manifests/packages/foos/script.php)

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
