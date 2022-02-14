---
description: 'desc'
shortTitle: 'short'
date: 2021-02-14
title: 'Eine Joomla-Datenbank-Tabelle für deine Erweiterung'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: eine-joomla-datenbank-fuer-deine-erweiterung
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Deine Ansicht im Administrationsbereich enthält in der Regel nicht nur statischen Text. Du zeigst hier Daten an, die dynamisch sind. So arbeiten zumindest die meisten Erweiterungen. Deshalb legen wir in diesem Teil eine Datenbank für deine Komponente an. In der Datenbank speichern wir bei der Einrichtung drei Datensätze und zeigen diese im Administrationsbereich an. Es wird eine statische Liste ausgegeben. Änderbar sind die einzelnen Einträge über das Backend nicht. Daran arbeiten wir im nächsten Teil.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t5...t6)[^github.com/astridx/boilerplate/compare/t5...t6] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t5...t6#diff-896f245bc8e493f91277fd33913ef974)

Wir legen eine Datei an, die SQL-Befehle für das Erstellen der Datenbanktabelle<!-- \index{Datenbank} --> enthält. Damit diese Statements aufgerufen werden, fügen wir den Namen der Datei später im Manifest ein.

Neben der `id`, über welche wir das Element eindeutig auffindbar machen und dem Namen `name`, der optional ist und den Datensatz in unserer Erweiterung benennt, gibt es den Alias `alias`. Letzterer bereitet die Daten unter anderem für das Routing vor. Stell dir eine System-URL wie `http://www.example.com/index.php?option=com_foos&view=foo&id=1` vor. Diese ist für Menschen schlecht lesbar. Auch Maschinen wie Suchmaschinen verarbeiten eine solche URL schlecht. Eine textuelle Beschreibung ist zwingend. In Joomla geschieht dies mithilfe des Alias. Dieser kann vom Benutzer selbst festgelegt werden. Damit der Text für die URL ausschließlich gültige Zeichen enthält, gibt es automatische Abläufe in der Hintergrundverarbeitung von Joomla.<!-- \index{Alias} --><!-- \index{Suchmaschinenfreundlich (SEF)!Alias} -->

Mit `CREATE TABLE IF NOT EXISTS ...` legen wir die Datenbanktabelle an, falls sie nicht schon exisiert. Mit `INSERT INTO ...` speichern wir Beispielinhalte in der Datenbanktabelle. In einer realen Erweiterung würde ich Beispieldaten nicht über die SQL-Datei bei der Installation hinzufügen. In Joomla 4 bietet sich ein Plugin des Typs `sampledata` an. Zur Inspiration findest du Plugins in Joomla im Verzeichnis `plugins/sampledata`.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t6/src/administrator/components/com_foos/sql/install.mysql.utf8.sql -->

CREATE TABLE IF NOT EXISTS `#__foos_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE=utf8mb4_unicode_ci;

INSERT INTO `#__foos_details` (`name`) VALUES
('Nina'),
('Astrid'),
('Elmar');
```

> Lies im Vorwort dieses Tutorials, was genau das Präfix `#__` bedeutet, falls dir dieses unbekannt ist.

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ sql/uninstall.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t5...t6#diff-e256ea429d6d414897f4bfe1730b9d8a)

Damit Joomla im Falle einer Deinstallation keine unnötigen Daten enthält, erstellen wir eine Datei, die den SQL-Befehl zum Löschen der Datenbanktabelle beinhaltet. Diese wird beim Deinstallieren automatisch ausgeführt.

[administrator/components/com_foos/ sql/uninstall.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/sql/uninstall.mysql.utf8.sql)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t6/src/administrator/components/com_foos/sql/uninstall.mysql.utf8.sql -->

DROP TABLE IF EXISTS `#__foos_details`;
```

> Vielleicht denkst du weiter und fragst dich schon jetzt, wie du potentielle zukünftige Datenbankänderungen handhabst. Was ist notwendig, um in einer späteren Version neben dem Namen auch den Vornamen zu speichern. SQL-Updates sind in Joomla namensbasiert. Genau bedeutet das: Für jede Version der Komponente ist eine Datei anzulegen, deren Name aus der Versionsnummer und der Dateiendung `.sql` besteht, falls sich Datenbankinhalte ändern. Praktisch wirst du dies im weiteren Verlauf dieses Tutorials erleben.

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-2daf62ad6c51630353e31eaa3cc28626)

Als nächstes erstellen wir ein _Model_ für den Administrationsbereich. Da wir die Klasse `ListModel` erweitern, ist es nicht erforderlich, dass wir uns selbst um die Verbindung zur Datenbank kümmern. Wir legen die Methode `getListQuery()` an und geben hier unsere spezifischen Anforderungen an. Spezifisch sind beispielsweise die Namen der Datenbanktabelle und der Spalte.

> Falls bisher nicht geschehen, wird dir hier klar, warum die Trennung von Model und View sinnvoll ist. Sieh dir einmal die Methode `getListQuery()` in Joomla-Komponenten an, zum Beispiel in `com_content`. Das SQL-Statement ist meist umfangreich. Deshalb ist es übersichtlicher, dieses vom gestalterischen Teil abzukapseln.

Der nachfolgende Code zeigt dir das in unserem Falle noch recht übersichtliche Model.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6/src/administrator/components/com_foos/src/Model/FoosModel.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Model;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Model\ListModel;

/**
 * Methods supporting a list of foo records.
 *
 * @since  __BUMP_VERSION__
 */
class FoosModel extends ListModel
{
	/**
	 * Constructor.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @see     \JControllerLegacy
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function __construct($config = [])
	{
		parent::__construct($config);
	}
	/**
	 * Build an SQL query to load the list data.
	 *
	 * @return  \JDatabaseQuery
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function getListQuery()
	{
		// Create a new query object.
		$db = $this->getDbo();
		$query = $db->getQuery(true);

		// Select the required fields from the table.
		$query->select(
			$db->quoteName(['id', 'name', 'alias'])
		);
		$query->from($db->quoteName('#__foos_details'));

		return $query;
	}
}

```

### Geänderte Dateien

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t5...t6#diff-1ff20be1dacde6c4c8e68e90161e0578)

Der mit Pluszeichen markierte Eintrag im Installationsmanifest bewirkt, dass die SQL-Statements in den genannten Dateien zum passenden Zeitpunkt aufgerufen werden, nämlich während einer Installation oder während einer Deinstallation.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/foos.xml)

```xml {diff}
 	<description>COM_FOOS_XML_DESCRIPTION</description>
 	<namespace path="src">FooNamespace\Component\Foos</namespace>
 	<scriptfile>script.php</scriptfile>
+	<install> <!-- Runs on install -->
+		<sql>
+			<file driver="mysql" charset="utf8">sql/install.mysql.utf8.sql</file>
+		</sql>
+	</install>
+	<uninstall> <!-- Runs on uninstall -->
+		<sql>
+			<file driver="mysql" charset="utf8">sql/uninstall.mysql.utf8.sql</file>
+		</sql>
+	</uninstall>
 	<!-- Frond-end files -->
 	<files folder="components/com_foos">
 		<folder>src</folder>

 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
 			<folder>services</folder>
+			<folder>sql</folder>
 			<folder>src</folder>
 			<folder>tmpl</folder>
 		</files>

```

> Ich unterstütze in diesem Beispiel ausschließlich eine MySQL-Datenbank. [Joomla unterstützt](https://downloads.joomla.org/de/technical-requirements-de)[^downloads.joomla.org/de/technical-requirements-de] neben MySQL (ab 5.6) genauso PostgreSQL (ab 11). Wenn du ebenfalls beide Datenbanken unterstützt, findest du eine Implementierung zum Abgucken in der [Weblinks Komponente](https://github.com/joomla-extensions/weblinks)[^github.com/joomla-extensions/weblinks]. Wie du die [Treiber benennst](https://github.com/joomla/joomla-cms/blob/e5db43948ed703492c99fa1f932247a9f611b058/libraries/src/Installer/Installer.php#L948) ist flexibel. `postgresql` und `mysql` sind korrekt, `mysqli`, `pdomysql` und `pgsql` werden von Joomla in der Datei `/libraries/src/ Installer/Installer.php` angepasst.

##### Aktualisierungen<!-- \index{Datenbank!Aktualisierung} -->

Der Vollständigkeit halber nehme ich hier Änderungen eines nachfolgenden Kapitels bezüglich Aktualisierung vorweg. Wenn sich etwas ändert, reicht es aus, in der Datenbank nur die Änderungen aufzunehmen. Dabei sollte darauf geachtet werden, dass bestehende Daten nicht tangiert werden. Die Neuerungen speicherst du für jede Version deiner Erweiterung in einer separaten Datei ab. Das Verzeichnis, in dem die Dateien für die Aktualisierungen abzulegen sind, schreibst du in das `<update>`-Tag.

```xml
  ...
  <update>  <!-- Runs on update -->
		<schemas>
			<schemapath type="mysql">sql/updates/mysql</schemapath>
		</schemas>
  </update>
  ...
```

Nachfolgend siehst du den Inhalt der Datei `src/administrator/components/ com_foos/sql/updates/mysql/10.0.0.sql` als Beispiel. Diese Datei kommt einem späteren Kapitel zu den Beispieldateien hinzu.

```xml
ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ services/provider.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

Bisher war es nicht notwendig die `MVC factory` in der Datei `provider.php` zu setzten, jetzt ist es erforderlich. Andernfalls siehst du die folgende Fehlermeldung oder bist gezwungen, die Verbindung zur Datenbank selbst zu programmieren: `MVC factory not set in Joomla\CMS\Extension\MVCComponent`.<!-- \index{Service!Provider} -->

[administrator/components/com_foos/ services/provider.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/services/provider.php)

```php {diff}
 use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
 use Joomla\CMS\Extension\Service\Provider\MVCFactory;
 use Joomla\CMS\HTML\Registry;
+use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
 use Joomla\DI\Container;
 use Joomla\DI\ServiceProviderInterface;
 use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;

 				$component = new FoosComponent($container->get(ComponentDispatcherFactoryInterface::class));

 				$component->setRegistry($container->get(Registry::class));
+				$component->setMVCFactory($container->get(MVCFactoryInterface::class));

 				return $component;
 			}
```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-8e3d37bbd99544f976bf8fd323eb5250)

In der View ziehen wir am Ende alle Elemente. Hierzu rufen wir die Methode `$this->get('Items')` des Models auf:

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
  */
 class HtmlView extends BaseHtmlView
 {
+	protected $items;
+
 	/**
 	 * Method to display the view.
 	 *

 	 */
 	public function display($tpl = null): void
 	{
+		$this->items = $this->get('Items');
 		parent::display($tpl);
 	}
 }

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-3186af99ea4e3321b497b86fcd1cd757)

Last but not least zeigen wir alles mithilfe der Template-Datei an. Anstelle des statischen Textes `Hello Foos` steht jetzt eine Schleife, die alle Elemente durchläuft.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
  */
 \defined('_JEXEC') or die;
 ?>
-Hello Foos
+<?php foreach ($this->items as $i => $item) : ?>
+<?php echo $item->name; ?>
+</br>
+<?php endforeach; ?>

```

> Wunderst du dich über die Syntax in der Schreibweise? Im Vorwort hatte ich erklärt, warum ich in einer Template-Datei die [alternative Syntax](https://www.php.net/manual/de/control-structures.alternative-syntax.php) für PHP wähle und die einzelnen Zeilen in PHP-Tags einschließe.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla legt bei der Installation die Datenbank an.

2. Teste als nächstes, ob die Ansicht deiner Komponente im Administrationsbereich fehlerfrei ist. Siehst du drei Einträge? Diese hatten wir beim Einrichten der Datenbank als Beispieldaten in der SQL-Datei eingetragen.

![Joomla Componente mit Datenbank](/images/j4x7x1.png)

3. Vergewissere dich, dass die Elemente in der Datenbank gespeichert sind.

Ich nutze lokal [phpmyadmin.net](https://www.phpmyadmin.net/) für die Administration der Datenbank.

![Joomla Datenbankansicht in phpMyAdmin](/images/j4x7x2.png)
<img src="https://vg08.met.vgwort.de/na/5004a41d12614f53a293be3f98c4ad6a" width="1" height="1" alt="">
