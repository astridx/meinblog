---
date: 2020-12-07
title: 'Joomla 4.x Tutorial - Extension Development - A Joomla database for your extension'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/eine-joomla-datenbank-fuer-deine-erweiterung
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Deine Ansicht im Administrationsbereich enthält in der Regel nicht nur statischen Text. Du zeigst hier Daten an, die dynamisch sind. So arbeiten zumindest die meisten Erweiterungen. Deshalb legen wir in diesem Teil eine Datenbank für deine Komponente an.

In der Datenbank speichern wir bei der Einrichtung drei Datensätze und zeigen diese im Administrationsbereich an. Es wird eine statische Liste ausgegeben. Änderbar sind die einzelnen Einträge über das Backend nicht. Daran arbeiten wir im nächsten Teil.

![Joomla Componente mit Datenbank](/images/j4x7x1.png)

## For impatient people

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t5...t6) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t5...t6#diff-896f245bc8e493f91277fd33913ef974)

Wir legen eine Datei an, die SQL-Befehle für das Erstellen der Datenbanktabelle enthält. Damit diese Statements aufgerufen werden, fügen wir den Namen später im Manifest ein. Gleichzeitig speichern wir mit `INSERT INTO ...` Beispielinhalte in der Datenbanktabelle.

> Lies im [Vorwort](joomla-tutorial-vorwort), was das Präfix `#__` genau bedeutet, wenn du dies nicht weißt.

[administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/def59ca5735b6f55423e7003ae8bb6be82f75dea/src/administrator/components/com_foos/sql/install.mysql.utf8.sql -->

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

#### [administrator/components/com_foos/sql/uninstall.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t5...t6#diff-e256ea429d6d414897f4bfe1730b9d8a)

Damit Joomla im Falle einer Deinstallation keine unnötigen Daten enthält, erstellen wir gleichzeitig eine Datei, die den SQL-Befehl zum Löschen der Datenbanktabelle beinhaltet.

[administrator/components/com_foos/sql/uninstall.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/sql/uninstall.mysql.utf8.sql)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/def59ca5735b6f55423e7003ae8bb6be82f75dea/src/administrator/components/com_foos/sql/uninstall.mysql.utf8.sql -->

DROP TABLE IF EXISTS `#__foos_details`;
```

> Vielleicht denkst du weiter und fragst dich schon jetzt, wie du potenitelle zukünftige Datenbankänderungen handhabst. Was ist notwendig, um in einer späteren Version neben dem Namen auch den Vornamen zu speichern. SQL-Updates sind in Joomla namensbasiert. Für jede Version der Komponente muss eine Datei angelegt werden, deren Name aus der Versionsnummer und der Dateiendung `.sql` besteht. Praktisch wirst du dies im weiteren Verlauf dieser Tutorialreihe erleben.

#### [administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-2daf62ad6c51630353e31eaa3cc28626)

Als Nächstes erstellen wir ein _Model_ für den Administrationsbereich. Da wir die Klasse `ListModel` erweitern, ist es nicht erforderlich, dass wir uns um die Verbindung zur Datenbank kümmern. Wir legen die Methode `getListQuery()` an und geben hier unsere spezifischen Anforderungen an.

> Falls bisher nicht geschehen, wird dir hier klar, warum die Trennung von Model und View sinnvoll ist. Sieh dir einmal die Methode `getListQuery()` in Joomla-Komponenten an, zum Beispiel in com_content. Das SQL-Statement ist meist umfangreich.

[administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/def59ca5735b6f55423e7003ae8bb6be82f75dea/src/administrator/components/com_foos/src/Model/FoosModel.php

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
	public function __construct($config = array())
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
			$db->quoteName(array('id', 'name', 'alias'))
		);
		$query->from($db->quoteName('#__foos_details'));

		return $query;
	}
}

```

### Modified files

#### [administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t5...t6#diff-1ff20be1dacde6c4c8e68e90161e0578)

Der nachfolgende Eintrag im Installationsmanifest bewirkt, dass die SQL-Statements in den genannten Dateien zum passenden Zeitpunkt aufgerufen werden:

[administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/foos.xml)

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
@@ -26,6 +36,7 @@
 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
 			<folder>services</folder>
+			<folder>sql</folder>
 			<folder>src</folder>
 			<folder>tmpl</folder>
 		</files>

```

> Ich unterstütze in diesem Beispiel ausschließlich eine MySQL-Datenbank. [Joomla unterstützt](https://www.joomla.de/news/joomla/612-joomla-4-on-the-move) neben MySQL (ab 5.6) genauso PostgreSQL (ab 11). Wenn du ebenfalls beide Datenbanken unterstüzt, findest du eine Implementierung zum Abgucken in der [Weblinks Komponenten](https://github.com/joomla-extensions/weblinks). Wie du die [Treiber benennst](https://github.com/joomla/joomla-cms/blob/e5db43948ed703492c99fa1f932247a9f611b058/libraries/src/Installer/Installer.php#L948) ist flexibel. `postgresql` und `mysql` sind korrekt, `mysqli`, `pdomysql` und `pgsql` werden angepasst.

##### Aktualisierungen

Der Vollständigkeit halber nehme ich hier Änderungen eines nachfolgenden Kapitels bezügltich Aktualisierunge vorweg:

Wenn sich etwas ändert, reicht es aus, in der Datenbank nur die Änderungen aufzunehmen. Diese speicherst du in einer separaten Datei pro Version ab. Das Verzeichnis, in dem die Dateien für die Áktualisierung abgelegt sind, schreibst du in das folgende Tag.

```xml
  ...
  <update>  <!-- Runs on update -->
		<schemas>
			<schemapath type="mysql">sql/updates/mysql</schemapath>
		</schemas>
  </update>
  ...
```

Nachfolgend siehst du die Aktualisierungsdatei `src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql` als Beispiel. Diese Datei wird später in diesem Beispiel hinzugefügt.

```sql
ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
```

#### [administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

Bisher war es nicht notwendig, jetzt ist es erforderlich, die `MVC factory` zu setzten. Andernfalls siehst du die nachfolgende Fehlermeldung oder bist gezwungen, die Verbindung zur Datenbank selbst zu programmieren: `MVC factory not set in Joomla\CMS\Extension\MVCComponent`.

[administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/services/provider.php)

```php {diff}
 use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
 use Joomla\CMS\Extension\Service\Provider\MVCFactory;
 use Joomla\CMS\HTML\Registry;
+use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
 use Joomla\DI\Container;
 use Joomla\DI\ServiceProviderInterface;
 use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;
@@ -49,6 +50,7 @@ function (Container $container)
 				$component = new FoosComponent($container->get(ComponentDispatcherFactoryInterface::class));

 				$component->setRegistry($container->get(Registry::class));
+				$component->setMVCFactory($container->get(MVCFactoryInterface::class));

 				return $component;
 			}
```

#### [administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-8e3d37bbd99544f976bf8fd323eb5250)

In der View holen wir am Ende die Elemente. Hierzu rufen wir die passende Methode im Model auf:

[administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
  */
 class HtmlView extends BaseHtmlView
 {
+	/**
+	 * An array of items
+	 *
+	 * @var  array
+	 */
+	protected $items;
+
 	/**
 	 * Method to display the view.
 	 *
@@ -31,6 +38,7 @@ class HtmlView extends BaseHtmlView
 	 */
 	public function display($tpl = null): void
 	{
+		$this->items = $this->get('Items');
 		parent::display($tpl);
 	}
 }

```

#### [administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-3186af99ea4e3321b497b86fcd1cd757)

Last but not least zeigen wir alles mithilfe der Templatedatei an. Anstelle des statischen Textes `Hello Foos` steht jetzt eine Schleife, die alle Elemente durchläuft.

[administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/tmpl/foos/default.php)

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

> Wunderst du dich über die Schreibweise? Im [Vorwort](/joomla-tutorial-vorwort) hatte ich erklärt, warum ich in einer Template-Datei die [alternative Syntax](https://www.php.net/manual/de/control-structures.alternative-syntax.php) für PHP wähle und die einzelnen Zeilen in PHP-Tags einschließe.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla erstellt bei der Installation die Datenbank für dich.

2. Teste als Nächstes, ob du die Ansicht im Administrationsbereich für deine Komponente fehlerfrei angezeigt bekommst. Siehst du drei Einträge? Diese hatten wir beim Einrichten der Datenbank als Beispieldaten in der SQL-Datei angelegt.

![Joomla Componente mit Datenbank](/images/j4x7x1.png)

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t5...t6.diff

## Links
