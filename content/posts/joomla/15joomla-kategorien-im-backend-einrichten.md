---
date: 2020-12-15
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Kategorien im Backend einrichten'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-kategorien-im-backend-einrichten
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Fast jede Website unterteilt ihre Inhalte in Kategorien. Joomla! bietet dieses nützliche Feature ebenfalls. Der aktuelle Teil des Tutorials zeigt dir, wie du Kategorien idealerweise in eine Joomla! Komponente integrierst. Erfinde das Rad nicht selbst neu. Nutze das, was Joomla! dir bietet.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t11b...t12) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-d7cb057651fb85156ba13996b6a045c8)

Wir speichern die Daten in der Datenbank, die zur Einordnung eines Elementes in eine Kategorie notwendig sind. Im Falle einer Aktualisierung ist es deshalb wichtig, die Datenbank um eine Spalte zu erweitern.

[src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql)

```sql {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/734d9acdc946880086984444ffad4b557bc2c39e/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_catid` (`catid`);

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-e5dfd09c647ca1e552c9016cf918acf3)

Die Einträge in der `access.xml` sind notwendig, um Berechtigungen für die Kategorie zu setzen. Der nachfolgende Code bewirkt die Anzeige eines Tabulators zur Festlegung der Benutzerrechte pro Kategorie im Administrationsbereich.

[https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/access.xml)

```xml {diff}

 		<action name="core.edit" title="JACTION_EDIT" />
 		<action name="core.edit.state" title="JACTION_EDITSTATE" />
 		<action name="core.edit.own" title="JACTION_EDITOWN" />
+		<action name="core.edit.value" title="JACTION_EDITVALUE" />
+	</section>
+	<section name="category">
+		<action name="core.create" title="JACTION_CREATE" />
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.own" title="JACTION_EDITOWN" />
 	</section>
 </access>

```

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-1ff20be1dacde6c4c8e68e90161e0578)

Der Eintrag `<menu link="option=com_categories&amp;extension=com_foos"` bewirkt, dass im Menu des Administrationsbereichs ein Menüpunkt zur Bearbeitung der Kategorie hinzugefügt wird.

[src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/foos.xml)

```xml {diff}

 		<menu view="foos">COM_FOOS</menu>
 		<submenu>
 			<menu link="option=com_foos">COM_FOOS</menu>
+			<menu link="option=com_categories&amp;extension=com_foos"
+				view="categories" img="class:foos-cat" alt="Foos/Categories">JCATEGORY</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>access.xml</filename>

```

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-262e27353fbe755d3813ea2df19cd0ed)

Das Formular, mit dem ein Foo-Item angelegt wird, ergänzen wir um ein Auswahlfeld mit passenden Kategorien. Wir nutzen hierzu das Joomla eigenes Feld `categoryedit`. Beachte die Zeile `extension="com_foos"`. Diese bewirkt, dass ausschließlich Kategorien angezeigt werden, die zu deiner Komponente gehören.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/forms/foo.xml)

```php {diff}
 			hint="JFIELD_ALIAS_PLACEHOLDER"
 		/>

+		<field
+			name="catid"
+			type="categoryedit"
+			label="JCATEGORY"
+			extension="com_foos"
+			addfieldprefix="Joomla\Component\Categories\Administrator\Field"
+			required="true"
+			default=""
+		/>
+
 		<field
 			name="access"
 			type="accesslevel"

```

#### [src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-7aceee287e50092f4d9e6caaec3b8b40)

Damit zu Beginn schon eine Kategorie vorhanden ist, ergänzen wir das Skript, welches bei der Installation aufgerufen wird. Über die Methode `install` legen wir mithilfe der Datenbank bei einer Neuinstallation eine Kategorie mit dem Titel `Uncategorised` für die Komponente an.

Um bei der Kategorie einen Benutzer als Ersteller angeben zu können, fragen wir die ID des Administrator in der Methode `getAdminId()` ab.

[https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/script.php)

```php {diff}

  * @license     GNU General Public License version 2 or later; see LICENSE.txt
  */
 \defined('_JEXEC') or die;
+
+use Joomla\CMS\Application\ApplicationHelper;
+use Joomla\CMS\Factory;
 use Joomla\CMS\Installer\InstallerAdapter;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\Log\Log;
+use Joomla\CMS\Table\Table;

 /**
  * Script file of Foo Component
@@ -47,6 +51,50 @@ public function install($parent): bool
 	{
 		echo Text::_('COM_FOOS_INSTALLERSCRIPT_INSTALL');

+		$db = Factory::getDbo();
+		$alias   = ApplicationHelper::stringURLSafe('FooUncategorised');
+
+		// Initialize a new category.
+		$category = Table::getInstance('Category');
+
+		$data = array(
+			'extension' => 'com_foos',
+			'title' => 'FooUncategorised',
+			'alias' => $alias . '(en-GB)',
+			'description' => '',
+			'published' => 1,
+			'access' => 1,
+			'params' => '{"target":"","image":""}',
+			'metadesc' => '',
+			'metakey' => '',
+			'metadata' => '{"page_title":"","author":"","robots":""}',
+			'created_time' => Factory::getDate()->toSql(),
+			'created_user_id' => (int) $this->getAdminId(),
+			'language' => 'en-GB',
+			'rules' => array(),
+			'parent_id' => 1,
+		);
+
+		$category->setLocation(1, 'last-child');
+
+		// Bind the data to the table
+		if (!$category->bind($data))
+		{
+			return false;
+		}
+
+		// Check to make sure our data is valid.
+		if (!$category->check())
+		{
+			return false;
+		}
+
+		// Store the category.
+		if (!$category->store(true))
+		{
+			return false;
+		}
+
 		return true;
 	}

@@ -146,4 +194,49 @@ public function postflight($type, $parent)

 		return true;
 	}
+
+	/**
+	 * Retrieve the admin user id.
+	 *
+	 * @return  integer|boolean  One Administrator ID.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	private function getAdminId()
+	{
+		$db    = Factory::getDbo();
+		$query = $db->getQuery(true);
+
+		// Select the admin user ID
+		$query
+			->clear()
+			->select($db->quoteName('u') . '.' . $db->quoteName('id'))
+			->from($db->quoteName('#__users', 'u'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__user_usergroup_map', 'map')
+				. ' ON ' . $db->quoteName('map') . '.' . $db->quoteName('user_id')
+				. ' = ' . $db->quoteName('u') . '.' . $db->quoteName('id')
+			)
+			->join(
+				'LEFT',
+				$db->quoteName('#__usergroups', 'g')
+				. ' ON ' . $db->quoteName('map') . '.' . $db->quoteName('group_id')
+				. ' = ' . $db->quoteName('g') . '.' . $db->quoteName('id')
+			)
+			->where(
+				$db->quoteName('g') . '.' . $db->quoteName('title')
+				. ' = ' . $db->quote('Super Users')
+			);
+
+		$db->setQuery($query);
+		$id = $db->loadResult();
+
+		if (!$id || $id instanceof \Exception)
+		{
+			return false;
+		}
+
+		return $id;
+	}
 }

```

#### [src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

Im Service Provider registrieren wir die Schnittstelle `CategoryFactoryInterface`. Es ist nicht notwendig, `CategoryFactoryInterface` selbst zu erstellen. Wir nutzen die Joomla eigene Funktionen.

[src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/services/provider.php)

```php {diff}

 \defined('_JEXEC') or die;

+use Joomla\CMS\Categories\CategoryFactoryInterface;
 use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
 use Joomla\CMS\Extension\ComponentInterface;
 use Joomla\CMS\Extension\Service\Provider\CategoryFactory;
@@ -51,6 +52,7 @@ function (Container $container)

 				$component->setRegistry($container->get(Registry::class));
 				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
+				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));

 				return $component;
 			}

```

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-896f245bc8e493f91277fd33913ef974)

Damit bei einer Neuinstallation die Tabellenspalte angelegt wird, in der die Kategorie eines Foo-Elements gespeichert wird, fügen wir in der SQL-Datei die bei der Installation aufgerufen wird, den erforderlichen SQL-Befehl hinzu.

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```php {diff}
 ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

```

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-38764f2b1343234561c0d02cd2991ea1)

Zusätzlich sind in der Komponentenklasse Implementierungen erforderlich, um die Joomla eigenen Funktionen zu verwenden.

[src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}
 use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
 use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;
 use Psr\Container\ContainerInterface;
+use Joomla\CMS\Helper\ContentHelper;

 /**
  * Component class for com_foos
@@ -46,4 +47,48 @@ public function boot(ContainerInterface $container)
 	{
 		$this->getRegistry()->register('foosadministrator', new AdministratorService);
 	}
+
+	/**
+	 * Adds Count Items for Category Manager.
+	 *
+	 * @param   \stdClass[]  $items    The category objects
+	 * @param   string       $section  The section
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function countItems(array $items, string $section)
+	{
+		try
+		{
+			$config = (object) array(
+				'related_tbl'   => $this->getTableNameForSection($section),
+				'state_col'     => 'published',
+				'group_col'     => 'catid',
+				'relation_type' => 'category_or_group',
+			);
+
+			ContentHelper::countRelations($items, $config);
+		}
+		catch (\Exception $e)
+		{
+			// Ignore it
+		}
+	}
+
+	/**
+	 * Returns the table for the count items functions for the given section.
+	 *
+	 * @param   string  $section  The section
+	 *
+	 * @return  string|null
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function getTableNameForSection(string $section = null)
+	{
+		return ($section === 'category' ? 'categories' : 'foos_details');
+
+	}
 }

```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-2daf62ad6c51630353e31eaa3cc28626)

Im Model fügen wir bei der Datenbankabfrage die Tabelle hinzu, in der Joomla-Kategorien speichert. So werden im Administrationsbereich bei Auswahl einer Kategorie nur die zu dieser gehörenden Elemente angezeigt.

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}

 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access'))
+			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access', 'a.catid'))
 		);

 		$query->from($db->quoteName('#__foos_details', 'a'));
@@ -60,6 +60,13 @@ protected function getListQuery()
 				$db->quoteName('#__viewlevels', 'ag') . ' ON ' . $db->quoteName('ag.id') . ' = ' . $db->quoteName('a.access')
 			);

+		// Join over the categories.
+		$query->select($db->quoteName('c.title', 'category_title'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__categories', 'c') . ' ON ' . $db->quoteName('c.id') . ' = ' . $db->quoteName('a.catid')
+			);
+
 		return $query;
 	}
 }

```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-1637778e5f7d1d56dd1751af1970f01b)

Das Formular zum Editieren eines Elements erhält die Anweisung, das Kategorie-Feld mithilfe der Angaben in der XML-Datei anzuzeigen.

[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 	<?php echo $this->getForm()->renderField('name'); ?>
 	<?php echo $this->getForm()->renderField('alias'); ?>
 	<?php echo $this->getForm()->renderField('access'); ?>
+	<?php echo $this->getForm()->renderField('catid'); ?>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-3186af99ea4e3321b497b86fcd1cd757)

In der Übersichtstabelle fügen wir eine Spalte für die Anzeige der Kategorie hinzu.

[src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}

		<a class="hasTooltip" href="<?php echo Route::_('index.php?option=com_foos&task=foo.edit&id=' . (int) $item->id); ?>" title="<?php echo Text::_('JACTION_EDIT'); ?> <?php echo $this->escape(addslashes($item->name)); ?>">
			<?php echo $editIcon; ?><?php echo $this->escape($item->name); ?></a>

+		<div class="small">
+			<?php echo Text::_('JCATEGORY') . ': ' . $this->escape($item->category_title); ?>
+ 		</div>
	</th>
	<td class="small d-none d-md-table-cell">
		<?php echo $item->access_level; ?>

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Datenbank für dich.

2. Öffne die Ansicht deiner Komponenten im Administrationsbereich.

3. In der Seitenleiste siehst du einen neuen Menüpunkt. Dieser bietet dir alles, was du zum Anlegen und Bearbeiten der Kategorien deiner Komponente benötigst.

![Joomla! Kategorie Menüpunkt](/images/j4x15x1.png)

4. Öffne als Nächstes ein Element. Überzeuge dich davon, dass es möglich ist, diesem eine Kategorie zuzuordnen.

![Joomla! Kategorie zuordnen](/images/j4x15x2.png)

Die Kategorien helfen dir, im Frontend deine Daten strukturiert anzuzeigen. Die Ansichten erstellen wir im weiteren Verlauf dieser Artikelserie.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t11b...t12.diff

diff --git a/src/administrator/components/com_foos/access.xml b/src/administrator/components/com_foos/access.xml
index fa1d9b04..8ab72721 100644
--- a/src/administrator/components/com_foos/access.xml
+++ b/src/administrator/components/com_foos/access.xml
@@ -9,5 +9,13 @@
 		<action name="core.edit" title="JACTION_EDIT" />
 		<action name="core.edit.state" title="JACTION_EDITSTATE" />
 		<action name="core.edit.own" title="JACTION_EDITOWN" />
+		<action name="core.edit.value" title="JACTION_EDITVALUE" />
+	</section>
+	<section name="category">
+		<action name="core.create" title="JACTION_CREATE" />
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.own" title="JACTION_EDITOWN" />
 	</section>
 </access>
diff --git a/src/administrator/components/com_foos/foos.xml b/src/administrator/components/com_foos/foos.xml
index a18f1c25..1fe73eb1 100644
--- a/src/administrator/components/com_foos/foos.xml
+++ b/src/administrator/components/com_foos/foos.xml
@@ -42,6 +42,8 @@
 		<menu view="foos">COM_FOOS</menu>
 		<submenu>
 			<menu link="option=com_foos">COM_FOOS</menu>
+			<menu link="option=com_categories&amp;extension=com_foos"
+				view="categories" img="class:foos-cat" alt="Foos/Categories">JCATEGORY</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>access.xml</filename>
diff --git a/src/administrator/components/com_foos/forms/foo.xml b/src/administrator/components/com_foos/forms/foo.xml
index ca0f0090..75acaa0e 100644
--- a/src/administrator/components/com_foos/forms/foo.xml
+++ b/src/administrator/components/com_foos/forms/foo.xml
@@ -28,6 +28,16 @@
 			hint="JFIELD_ALIAS_PLACEHOLDER"
 		/>
 
+		<field
+			name="catid"
+			type="categoryedit"
+			label="JCATEGORY"
+			extension="com_foos"
+			addfieldprefix="Joomla\Component\Categories\Administrator\Field"
+			required="true"
+			default=""
+		/>
+
 		<field
 			name="access"
 			type="accesslevel"
diff --git a/src/administrator/components/com_foos/script.php b/src/administrator/components/com_foos/script.php
index bda68ee3..4e74d518 100644
--- a/src/administrator/components/com_foos/script.php
+++ b/src/administrator/components/com_foos/script.php
@@ -7,9 +7,13 @@
  * @license     GNU General Public License version 2 or later; see LICENSE.txt
  */
 \defined('_JEXEC') or die;
+
+use Joomla\CMS\Application\ApplicationHelper;
+use Joomla\CMS\Factory;
 use Joomla\CMS\Installer\InstallerAdapter;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\Log\Log;
+use Joomla\CMS\Table\Table;
 
 /**
  * Script file of Foo Component
@@ -47,6 +51,50 @@ public function install($parent): bool
 	{
 		echo Text::_('COM_FOOS_INSTALLERSCRIPT_INSTALL');
 
+		$db = Factory::getDbo();
+		$alias   = ApplicationHelper::stringURLSafe('FooUncategorised');
+
+		// Initialize a new category.
+		$category = Table::getInstance('Category');
+
+		$data = array(
+			'extension' => 'com_foos',
+			'title' => 'FooUncategorised',
+			'alias' => $alias . '(en-GB)',
+			'description' => '',
+			'published' => 1,
+			'access' => 1,
+			'params' => '{"target":"","image":""}',
+			'metadesc' => '',
+			'metakey' => '',
+			'metadata' => '{"page_title":"","author":"","robots":""}',
+			'created_time' => Factory::getDate()->toSql(),
+			'created_user_id' => (int) $this->getAdminId(),
+			'language' => 'en-GB',
+			'rules' => array(),
+			'parent_id' => 1,
+		);
+
+		$category->setLocation(1, 'last-child');
+
+		// Bind the data to the table
+		if (!$category->bind($data))
+		{
+			return false;
+		}
+
+		// Check to make sure our data is valid.
+		if (!$category->check())
+		{
+			return false;
+		}
+
+		// Store the category.
+		if (!$category->store(true))
+		{
+			return false;
+		}
+
 		return true;
 	}
 
@@ -146,4 +194,49 @@ public function postflight($type, $parent)
 
 		return true;
 	}
+
+	/**
+	 * Retrieve the admin user id.
+	 *
+	 * @return  integer|boolean  One Administrator ID.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	private function getAdminId()
+	{
+		$db    = Factory::getDbo();
+		$query = $db->getQuery(true);
+
+		// Select the admin user ID
+		$query
+			->clear()
+			->select($db->quoteName('u') . '.' . $db->quoteName('id'))
+			->from($db->quoteName('#__users', 'u'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__user_usergroup_map', 'map')
+				. ' ON ' . $db->quoteName('map') . '.' . $db->quoteName('user_id')
+				. ' = ' . $db->quoteName('u') . '.' . $db->quoteName('id')
+			)
+			->join(
+				'LEFT',
+				$db->quoteName('#__usergroups', 'g')
+				. ' ON ' . $db->quoteName('map') . '.' . $db->quoteName('group_id')
+				. ' = ' . $db->quoteName('g') . '.' . $db->quoteName('id')
+			)
+			->where(
+				$db->quoteName('g') . '.' . $db->quoteName('title')
+				. ' = ' . $db->quote('Super Users')
+			);
+
+		$db->setQuery($query);
+		$id = $db->loadResult();
+
+		if (!$id || $id instanceof \Exception)
+		{
+			return false;
+		}
+
+		return $id;
+	}
 }
diff --git a/src/administrator/components/com_foos/services/provider.php b/src/administrator/components/com_foos/services/provider.php
index b67c35d4..47fb5974 100644
--- a/src/administrator/components/com_foos/services/provider.php
+++ b/src/administrator/components/com_foos/services/provider.php
@@ -9,6 +9,7 @@
 
 \defined('_JEXEC') or die;
 
+use Joomla\CMS\Categories\CategoryFactoryInterface;
 use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
 use Joomla\CMS\Extension\ComponentInterface;
 use Joomla\CMS\Extension\Service\Provider\CategoryFactory;
@@ -51,6 +52,7 @@ function (Container $container)
 
 				$component->setRegistry($container->get(Registry::class));
 				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
+				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));
 
 				return $component;
 			}
diff --git a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
index 4c925493..72b267ef 100644
--- a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
+++ b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
@@ -13,3 +13,5 @@ INSERT INTO `#__foos_details` (`name`) VALUES
 ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
 
 ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;
diff --git a/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql b/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql
new file mode 100644
index 00000000..05b3b565
--- /dev/null
+++ b/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql
@@ -0,0 +1,3 @@
+ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_catid` (`catid`);
diff --git a/src/administrator/components/com_foos/src/Extension/FoosComponent.php b/src/administrator/components/com_foos/src/Extension/FoosComponent.php
index 5c8cc6ba..44e1255a 100644
--- a/src/administrator/components/com_foos/src/Extension/FoosComponent.php
+++ b/src/administrator/components/com_foos/src/Extension/FoosComponent.php
@@ -18,6 +18,7 @@
 use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
 use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;
 use Psr\Container\ContainerInterface;
+use Joomla\CMS\Helper\ContentHelper;
 
 /**
  * Component class for com_foos
@@ -46,4 +47,48 @@ public function boot(ContainerInterface $container)
 	{
 		$this->getRegistry()->register('foosadministrator', new AdministratorService);
 	}
+
+	/**
+	 * Adds Count Items for Category Manager.
+	 *
+	 * @param   \stdClass[]  $items    The category objects
+	 * @param   string       $section  The section
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function countItems(array $items, string $section)
+	{
+		try
+		{
+			$config = (object) array(
+				'related_tbl'   => $this->getTableNameForSection($section),
+				'state_col'     => 'published',
+				'group_col'     => 'catid',
+				'relation_type' => 'category_or_group',
+			);
+
+			ContentHelper::countRelations($items, $config);
+		}
+		catch (\Exception $e)
+		{
+			// Ignore it
+		}
+	}
+
+	/**
+	 * Returns the table for the count items functions for the given section.
+	 *
+	 * @param   string  $section  The section
+	 *
+	 * @return  string|null
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function getTableNameForSection(string $section = null)
+	{
+		return ($section === 'category' ? 'categories' : 'foos_details');
+
+	}
 }
diff --git a/src/administrator/components/com_foos/src/Model/FoosModel.php b/src/administrator/components/com_foos/src/Model/FoosModel.php
index 0038575c..163953b2 100644
--- a/src/administrator/components/com_foos/src/Model/FoosModel.php
+++ b/src/administrator/components/com_foos/src/Model/FoosModel.php
@@ -48,7 +48,7 @@ protected function getListQuery()
 
 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access'))
+			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access', 'a.catid'))
 		);
 
 		$query->from($db->quoteName('#__foos_details', 'a'));
@@ -60,6 +60,13 @@ protected function getListQuery()
 				$db->quoteName('#__viewlevels', 'ag') . ' ON ' . $db->quoteName('ag.id') . ' = ' . $db->quoteName('a.access')
 			);
 
+		// Join over the categories.
+		$query->select($db->quoteName('c.title', 'category_title'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__categories', 'c') . ' ON ' . $db->quoteName('c.id') . ' = ' . $db->quoteName('a.catid')
+			);
+
 		return $query;
 	}
 }
diff --git a/src/administrator/components/com_foos/tmpl/foo/edit.php b/src/administrator/components/com_foos/tmpl/foo/edit.php
index 70e17c50..de3327e9 100644
--- a/src/administrator/components/com_foos/tmpl/foo/edit.php
+++ b/src/administrator/components/com_foos/tmpl/foo/edit.php
@@ -29,6 +29,7 @@
 	<?php echo $this->getForm()->renderField('name'); ?>
 	<?php echo $this->getForm()->renderField('alias'); ?>
 	<?php echo $this->getForm()->renderField('access'); ?>
+	<?php echo $this->getForm()->renderField('catid'); ?>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>
diff --git a/src/administrator/components/com_foos/tmpl/foos/default.php b/src/administrator/components/com_foos/tmpl/foos/default.php
index e597fc4c..628d268d 100644
--- a/src/administrator/components/com_foos/tmpl/foos/default.php
+++ b/src/administrator/components/com_foos/tmpl/foos/default.php
@@ -49,6 +49,9 @@
 									<a class="hasTooltip" href="<?php echo Route::_('index.php?option=com_foos&task=foo.edit&id=' . (int) $item->id); ?>" title="<?php echo Text::_('JACTION_EDIT'); ?> <?php echo $this->escape(addslashes($item->name)); ?>">
 										<?php echo $editIcon; ?><?php echo $this->escape($item->name); ?></a>
 
+									<div class="small">
+										<?php echo Text::_('JCATEGORY') . ': ' . $this->escape($item->category_title); ?>
+ 									</div>
 								</th>
 								<td class="small d-none d-md-table-cell">
 									<?php echo $item->access_level; ?>

```

## Links
