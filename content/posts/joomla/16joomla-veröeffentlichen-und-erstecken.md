---
description: 'desc'
shortTitle: 'short'
date: 2021-02-05
title: 'Veröffentlichen und Verstecken'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-veröeffentlichen-und-erstecken
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Wenn du mit Joomla arbeitetest, kennst du es aus anderen Komponenten: Elemente haben einen Status, der veränderbar ist. Dieser Abschnitt zeigt dir, wie du Items

- versteckst,
- veröffentlichst,
- terminierst,
- archivierst und
- löschst.<!-- \index{verstecken} --><!-- \index{veröffentlichen} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t12...t13)[^github.com/astridx/boilerplate/compare/t12...t13] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ sql/updates/mysql/13.0.0.sql

Im Falle eines Updates, wird die Datenbank mithilfe der Datei `administrator/components/com_foos/ sql/updates/mysql/13.0.0.sql` auf den neuesten Stand für Version 13 gebracht. Konkret werden Spalten für das Speichern der Daten zur Veröffentlichung eingefügt.

[administrator/components/com_foos/ sql/updates/mysql/13.0.0.sql](https://github.com/astridx/boilerplate/blob/t13/src/administrator/components/com_foos/sql/updates/mysql/13.0.0.sql)

```xml {numberLines: -2}
<!--  https://codeberg.org/astrid/j4examplecode/raw/branch/t13/src/administrator/components/com_foos/sql/updates/mysql/13.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `published` tinyint(1) NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD COLUMN  `publish_up` datetime AFTER `alias`;

ALTER TABLE `#__foos_details` ADD COLUMN  `publish_down` datetime AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_state` (`published`);
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Controller/FoosController.php

Jetzt benötigt Joomla die Klasse `AdminController`. Deshalb erstellen wir die Klasse `FoosController`, welche von `AdminController` erbt. `FoosController` enthält momentan keine eigenen Implementierungen. Der Controller ruft lediglich Methoden der Elternklasse auf.

[administrator/components/com_foos/ src/Controller/FoosController.php](https://github.com/astridx/boilerplate/blob/t13/src/administrator/components/com_foos/src/Controller/FoosController.php)

```php {numberLines: -2}
<?php
// https://codeberg.org/astrid/j4examplecode/raw/branch/t13/src/administrator/components/com_foos/src/Controller/FoosController.php

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

use Joomla\CMS\Application\CMSApplication;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
use Joomla\Input\Input;

/**
 * Foos list controller class.
 *
 * @since  __BUMP_VERSION__
 */
class FoosController extends AdminController
{
	/**
	 * Constructor.
	 *
	 * @param   array                $config   An optional associative array of configuration settings.
	 * Recognized key values include 'name', 'default_task', 'model_path', and
	 * 'view_path' (this list is not meant to be comprehensive).
	 * @param   MVCFactoryInterface  $factory  The factory.
	 * @param   CMSApplication       $app      The JApplication for the dispatcher
	 * @param   Input                $input    Input
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function __construct($config = [], MVCFactoryInterface $factory = null, $app = null, $input = null)
	{
		parent::__construct($config, $factory, $app, $input);
	}

	/**
	 * Proxy for getModel.
	 *
	 * @param   string  $name    The name of the model.
	 * @param   string  $prefix  The prefix for the PHP class name.
	 * @param   array   $config  Array of configuration parameters.
	 *
	 * @return  \Joomla\CMS\MVC\Model\BaseDatabaseModel
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function getModel($name = 'Foo', $prefix = 'Administrator', $config = ['ignore_request' => true])
	{
		return parent::getModel($name, $prefix, $config);
	}
}
```

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ forms/foo.xml

Im Formular kommen drei Felder hinzu. Eines, in dem der Status festgelegt wird und zwei, über die eine terminierte Veröffentlichung mithilfe eines Kalenders erreicht wird.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
 			hint="JFIELD_ALIAS_PLACEHOLDER"
 		/>

+		<field
+			name="published"
+			type="list"
+			label="JSTATUS"
+			default="1"
+			id="published"
+			class="custom-select-color-state"
+			size="1"
+			>
+			<option value="1">JPUBLISHED</option>
+			<option value="0">JUNPUBLISHED</option>
+			<option value="2">JARCHIVED</option>
+			<option value="-2">JTRASHED</option>
+		</field>
+
+		<field
+			name="publish_up"
+			type="calendar"
+			label="COM_FOOS_FIELD_PUBLISH_UP_LABEL"
+			translateformat="true"
+			showtime="true"
+			size="22"
+			filter="user_utc"
+		/>
+
+		<field
+			name="publish_down"
+			type="calendar"
+			label="COM_FOOS_FIELD_PUBLISH_DOWN_LABEL"
+			translateformat="true"
+			showtime="true"
+			size="22"
+			filter="user_utc"
+		/>
+
 		<field
 			name="catid"
 			type="categoryedit"
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ sql/install.mysql.utf8.sql

`administrator/components/com_foos/ sql/install.mysql.utf8.sql` wird im Falle einer neuen Installation verwendet, um die Datenbank anzulegen. Deshalb ergänzen wir hier die notwendigen Informationen. In der Datei `administrator/components/com_foos/ sql/updates/mysql/13.0.0.sql` hatten wir diese schon ergänzt. Diese Datei wird lediglich bei einer Aktualisierung angewendet.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/t13/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {diff}
 ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEF
 ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);

 ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `state` tinyint(3) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_catid` (`catid`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `published` tinyint(1) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `publish_up` datetime AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `publish_down` datetime AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_state` (`published`);
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Extension/FoosComponent.php

Die Komponentenklasse erhält die neue Funktion `getStateColumnForSection`. Diese wird verwendet um in der Kategorie-Ansicht anzuzeigen, wie viele Elemente veröffentlich oder versteckt sind. Erinnerst du dich. Kategorien hatten wir im vorherigen Teil eingeführt. Da hat dieser Teil in der Kategorie-Ansicht nicht funktioniert. Jetzt wird korrekt gezählt. Überzeuge dich selbst davon, nachdem du die Komponente um diese Funktion in Joomla ergänzt hast.

[administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}
 protected function getTableNameForSection(string $section = null)
 	{
 		return ($section === 'category' ? 'categories' : 'foos_details');
 	}
+
+	protected function getStateColumnForSection(string $section = null)
+	{
+		return 'published';
+	}
 }
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Model/FoosModel.php

Das Model erweitern wir, damit die Information über den Status aus der Datenbank abgefragt werden, wenn die Listenansicht für das Backend erstellt wird.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}
 protected function getListQuery()

 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(['a.id', 'a.name', 'a.alias', 'a.access', 'a.catid'])
+			$db->quoteName(['a.id', 'a.name', 'a.alias', 'a.access', 'a.catid', 'a.published', 'a.publish_up', 'a.publish_down'])
 		);

 		$query->from($db->quoteName('#__foos_details', 'a'));
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Table/FooTable.php

In der Datei `administrator/components/com_foos/ src/Table/FooTable.php`, die die Datenbanktabelle verwaltet, fügen wir Prüfungen hinzu. So stellen wir sicher, dass keine unmöglichen Daten gespeichert werden.

`store($updateNulls = true)` benötigen wir, weil die Elternklasse `Table` die Variable `$updateNulls` auf `false` setzt. Dies bewirkt, dass Formularfelder, die den Wert `null` führen, nicht in der Datenbank verändert werden. Meist ist dies korrekt. Der häufigste Fall ist wohl, dass ein Wert von Anfang an nicht gesetzt ist und im Formular beim Bearbeiten den Elements nicht geändert wurde. Weil ein leeres Datumfeld in der Datenbank mit `null` abgespeichert wird, ist es in unserem Fall erforderlich, dass wir das Speichern von `null`-Werten erzwingen. Dies geschieht, indem wir die Variable `$updateNulls` auf `true` setzten.

[administrator/components/com_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Table/FooTable.php)

```php {diff}
 public function generateAlias()

 		return $this->alias;
 	}
+
+	public function check()
+	{
+		try {
+			parent::check();
+		} catch (\Exception $e) {
+			$this->setError($e->getMessage());
+
+			return false;
+		}
+
+		// Check the publish down date is not earlier than publish up.
+		if ($this->publish_down > $this->_db->getNullDate() && $this->publish_down < $this->publish_up) {
+			$this->setError(Text::_('JGLOBAL_START_PUBLISH_AFTER_FINISH'));
+
+			return false;
+		}
+
+		// Set publish_up, publish_down to null if not set
+		if (!$this->publish_up) {
+			$this->publish_up = null;
+		}
+
+		if (!$this->publish_down) {
+			$this->publish_down = null;
+		}
+
+		return true;
+	}
+
+	public function store($updateNulls = true)
+	{
+		return parent::store($updateNulls);
+	}
 }
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foo/edit.php

Im Formular zum Bearbeiten eines Elements, sorgen wir dafür, dass die neuen Felder gerendert werden.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 	<?php echo $this->getForm()->renderField('alias'); ?>
 	<?php echo $this->getForm()->renderField('access'); ?>
 	<?php echo $this->getForm()->renderField('catid'); ?>
+	<?php echo $this->getForm()->renderField('published'); ?>
+	<?php echo $this->getForm()->renderField('publish_up'); ?>
+	<?php echo $this->getForm()->renderField('publish_down'); ?>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foos/default.php

Zum Schluss ergänzen wir die Übersichtsliste im Backend. Wir erstellen eine Spalte für die Anzeige des Veröffentlichungsstatus.

> Wunderst du dich über die Verteilung der Tags `<td>` und `<th>`. Das erscheint auf den ersten Blick ein Fehler. Es ist aber korrekt. Weitere Informationen findest du in diesem [Github-Issue](https://github.com/joomla/joomla-cms/pull/24546).

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 					<table class="table" id="fooList">
 						<thead>
 							<tr>
+								<td style="width:1%" class="text-center">
+									<?php echo HTMLHelper::_('grid.checkall'); ?>
+								</td>
 								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_NAME'); ?>
 								</th>
+								<th scope="col" style="width:1%; min-width:85px" class="text-center">
+									<?php echo TEXT::_('JSTATUS'); ?>
+								</th>
 								<th scope="col" style="width:10%" class="d-none d-md-table-cell">
 									<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>
 								</th>

 						foreach ($this->items as $i => $item) :
 							?>
 							<tr class="row<?php echo $i % 2; ?>">
+								<td class="text-center">
+									<?php echo HTMLHelper::_('grid.id', $i, $item->id); ?>
+								</td>
 								<th scope="row" class="has-context">
 									<div>
 										<?php echo $this->escape($item->name); ?>

 										<?php echo Text::_('JCATEGORY') . ': ' . $this->escape($item->category_title); ?>
 									</div>
 								</th>
+								<td class="text-center">
+									<?php
+									echo HTMLHelper::_('jgrid.published', $item->published, $i, 'foos.', true, 'cb', $item->publish_up, $item->publish_down);
+									?>
+								</td>
 								<td class="small d-none d-md-table-cell">
 									<?php echo $item->access_level; ?>
 								</td>
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere dazu die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

2. Die Datenbank ist wieder geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Deinstallieren und Neuinstallieren ist aufwendig. Deshalb verrate ich dir eine einfachere Methode.

3. Öffne den Bereich `System | Information | Database`.

![Joomla Published](/images/j4x16x1.png)

4. Wähle deine Komponente aus und klicke auf `Update Structure`. Das war es! Damit hast du die Datenbank auf den neuesten Stand gebracht.

5. Öffne die Ansicht deiner Komponente im Administrationsbereich und überzeuge dich davon, dass du hier eine Spalte siehst, die mit Status überschrieben ist. Klicke auf ein Symbol in dieser und wechsele so den Zustand des entsprechenden Elementes von `veröffentlicht` in `versteckt` und umgekehrt.

![Joomla Published](/images/j4x16x2.png)

6. Öffne ein Element und überprüfe, dass der Status in dieser Ansicht ebenfalls editierbar ist. Außerdem ist es möglich, ein Datum anzugeben, so das Items dem Datum entsprechend versteckt oder veröffentlicht werden.

![Joomla Validierung](/images/j4x16x3.png)
<img src="https://vg08.met.vgwort.de/na/4f7c2eac5b6942688fe3ecc2b1519f8d" width="1" height="1" alt="">
