---
date: 2020-12-16
title: 'Joomla 4.x Tutorial - Extension Development - Publish and Unpublish / Hide'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-veröeffentlichen-und-erstecken
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Wenn du mit Joomla arbeitetest, kennst du es aus anderen Komponenten: Elemente haben einen Status, der veränderbar ist. Dieser Abschnitt zeigt dir, wie du Items versteckst, veröffentlichst, terminierst, archivierst und löschst.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t12...t13) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/13.0.0.sql](https://github.com/astridx/boilerplate/compare/t12...t13#diff-87ec143942c0f306b40e69e84076afef)

Im Falle eines Updates, wird die Datenbank mihilfe dieser Datei auf den neuesten Stand gebracht. Konkret werden Spalten für das Speichern der Daten zur Veröffentlichung eingefügt.

[src/administrator/components/com_foos/sql/updates/mysql/13.0.0.sql](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/sql/updates/mysql/13.0.0.sql)

```sql {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/c971c9161aef0ddd16642ca077fc3bd21c4e555c/src/administrator/components/com_foos/sql/updates/mysql/13.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `published` tinyint(1) NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD COLUMN  `publish_up` datetime AFTER `alias`;

ALTER TABLE `#__foos_details` ADD COLUMN  `publish_down` datetime AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_state` (`published`);
```

#### [src/administrator/components/com_foos/src/Controller/FoosController.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-83275f4e46bde5a95cd61ce239609370)

Jetzt benötigen wir die Klasse `AdminController`. Deshalb erstellen wir die Klasse `FoosController`, welche von `AdminController` erbt.

[src/administrator/components/com_foos/src/Controller/FoosController.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Controller/FoosController.php)

```php {numberLines: -2}
<?php
// https://raw.githubusercontent.com/astridx/boilerplate/c971c9161aef0ddd16642ca077fc3bd21c4e555c/src/administrator/components/com_foos/src/Controller/FoosController.php

namespace FooNamespace\Component\Foos\Administrator\Controller;

use Joomla\CMS\Application\CMSApplication;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
use Joomla\Input\Input;

defined('_JEXEC') or die;

class FoosController extends AdminController
{
	public function __construct($config = array(), MVCFactoryInterface $factory = null, $app = null, $input = null)
	{
		parent::__construct($config, $factory, $app, $input);
	}

	public function getModel($name = 'Foo', $prefix = 'Administrator', $config = array('ignore_request' => true))
	{
		return parent::getModel($name, $prefix, $config);
	}
}
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t12...t13#diff-262e27353fbe755d3813ea2df19cd0ed)

Im Formular kommen drei Felder hinzu. Eines, in dem der Status festgelegt wird und zwei, über die eine terminierte Veröffentlichung mithilfe eines Kalenders erreicht wird.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/forms/foo.xml)

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

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t12...t13#diff-896f245bc8e493f91277fd33913ef974)

Wir implementieren die notwendigen Informationen in der Datenbank für den Fall einer Neuinstallation.

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql {diff}
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

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-38764f2b1343234561c0d02cd2991ea1)

Die Komponentenklasse erhält die neue Funktion `getStateColumnForSection`.

[src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}
 		return ($section === 'category' ? 'categories' : 'foos_details');

 	}
+
+	/**
+	 * Returns the state column for the count items functions for the given section.
+	 *
+	 * @param   string  $section  The section
+	 *
+	 * @return  string|null
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function getStateColumnForSection(string $section = null)
+	{
+		return 'published';
+	}
 }

```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-2daf62ad6c51630353e31eaa3cc28626)

Das Model erweitern wir, damit die Information über den Status geladen wird.

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}

 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access', 'a.catid'))
+			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access', 'a.catid', 'a.published', 'a.publish_up', 'a.publish_down'))
 		);

 		$query->from($db->quoteName('#__foos_details', 'a'));

```

#### [src/administrator/components/com_foos/src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-19bf55010e1963bede0668355cebb307)

In der Klasse, die die Datenbanktabelle verwaltet, fügen wir Prüfungen hinzu. So stellen wir sicher, dass keine unmöglichen Daten gespeichert werden.

[src/administrator/components/com_foos/src/Table/FooTable.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Table/FooTable.php)

```php {diff}

 		return $this->alias;
 	}
+
+	/**
+	 * Overloaded check function
+	 *
+	 * @return  boolean
+	 *
+	 * @see     Table::check
+	 * @since   __BUMP_VERSION__
+	 */
+	public function check()
+	{
+		try
+		{
+			parent::check();
+		}
+		catch (\Exception $e)
+		{
+			$this->setError($e->getMessage());
+
+			return false;
+		}
+
+		// Check the publish down date is not earlier than publish up.
+		if ($this->publish_down > $this->_db->getNullDate() && $this->publish_down < $this->publish_up)
+		{
+			$this->setError(Text::_('JGLOBAL_START_PUBLISH_AFTER_FINISH'));
+
+			return false;
+		}
+
+		// Set publish_up, publish_down to null if not set
+		if (!$this->publish_up)
+		{
+			$this->publish_up = null;
+		}
+
+		if (!$this->publish_down)
+		{
+			$this->publish_down = null;
+		}
+
+		return true;
+	}
 }

```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-1637778e5f7d1d56dd1751af1970f01b)

Im Formular zum Bearbeiten eines Elements, sorgen wir dafür, dass die neuen Felder gerendert werden.

[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/tmpl/foo/edit.php)

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

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-3186af99ea4e3321b497b86fcd1cd757)

Wir nehmen zum Schluß die Felder in der Übersicht auf.

> Wunderst du dich über die Verteilung der Tags `<td>` und `th`. Das erscheint auf den ersten Blick ein Fehler. Es ist aber korrekt. Weitere Informationen findest du in diesem [Github-Issue](https://github.com/joomla/joomla-cms/pull/24546).

[https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/tmpl/foos/default.php)

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
@@ -41,6 +47,9 @@
 						foreach ($this->items as $i => $item) :
 							?>
 							<tr class="row<?php echo $i % 2; ?>">
+								<td class="text-center">
+									<?php echo HTMLHelper::_('grid.id', $i, $item->id); ?>
+								</td>
 								<th scope="row" class="has-context">
 									<div>
 										<?php echo $this->escape($item->name); ?>
@@ -53,6 +62,11 @@
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

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

2. Die Datenbank ist wieder geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Deinstallieren und Neuinstallieren ist aufwendig. Deshalb verrate ich dir eine einfachere Methode.

3. Öffne den Bereich `System | Information | Database`.

![Joomla Published](/images/j4x16x1.png)

4. Wähle deine Komponente aus und klicke auf `Update Structure`. Das war es! Damit hast du die Datenbank auf den neuesten Stand gebracht.

5. Öffne die Ansicht deiner Komponente im Administrationsbereich und überzeuge dich davon, dass du hier eine Spalte die mit Status überschrieben ist, siehst. Klicke auf das Symbol in dieser und wechsele so den Zustand von `veröffentlicht` in `versteckt` und umgekehrt.

![Joomla Published](/images/j4x16x2.png)

6. Öffne ein Element und sieh, dass der Status in dieser Ansicht ebenfalls editierbar ist. Außerdem ist es möglich, ein Datum anzugeben, zu das Item veröffentlich und/oder versteckt wird.

![Joomla Validierung](/images/j4x16x3.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// github.com/astridx/boilerplate/compare/t12...t13.diff

```

## Links
