---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-05-17
title: 'Kategorien im Backend einrichten'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-kategorien-im-backend-einrichten
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Fast jede Website unterteilt ihre Inhalte in Kategorien. Joomla bietet dieses nützliche Feature ebenfalls. Der aktuelle Teil des Tutorials zeigt dir, wie du Kategorien idealerweise in eine Joomla Komponente integrierst. Erfinde das Rad nicht selbst neu. Nutze das, was Joomla dir bietet.<!-- \index{Kategorien!Backend} -->

> [Kategorien](https://docs.joomla.org/Special:MyLanguage/Category 'Special:MyLanguage/Category') sind eine Möglichkeit, Inhalte in Joomla zu organisieren. Eine Kategorie enthält Beiträge und andere Kategorien. Ein Beitrag kann nur in einer Kategorie sein. Wenn eine Kategorie in einer anderen enthalten ist, ist sie eine Unterkategorie der Kategorie.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t11b...t12)[^codeberg.org/astrid/j4examplecode/compare/t11b...t12] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### administrator/components/com_foos/sql/updates/mysql/12.0.0.sql

Wir speichern die Daten, die zur Einordnung eines Elementes in eine Kategorie notwendig sind, in der Datenbank. Im Falle einer Aktualisierung ist es deshalb wichtig, die Datenbank um eine Spalte zu erweitern. Hierzu legen wir die Datei `administrator/components/com_foos/sql/updates/mysql/12.0.0.sql` an und tragen in sie das notwendige SQL-Statement ein. Den Namen wählen wir, weil wir gerade an Version 12 unserer Erweiterung arbeiten.

[administrator/components/com_foos/sql/updates/mysql/12.0.0.sql](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t12/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_catid` (`catid`);

```

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/com_foos/access.xml

Die nachfolgend mit einem Pluszeichen markierten Einträge in der Datei `access.xml` sind notwendig, um Berechtigungen für die Kategorien zu setzen. Der neue Code bewirkt die Anzeige eines Tabulators zur Festlegung der Benutzerrechte pro Kategorie im Administrationsbereich.

[administrator/components/com_foos/access.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/access.xml)

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

<!-- prettier-ignore -->
#### administrator/components/com_foos/foos.xml

Der Eintrag `<menu link="option=com_ categories&amp;extension=com_foos"` bewirkt, dass im Menu des Administrationsbereichs ein Menüpunkt zur Bearbeitung der Kategorie hinzugefügt wird.

[administrator/components/com_foos/foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/foos.xml)

```xml {diff}

 		<menu view="foos">COM_FOOS</menu>
 		<submenu>
 			<menu link="option=com_foos">COM_FOOS</menu>
+			<menu link="option=com_categories&amp;extension=com_foos">JCATEGORY</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>access.xml</filename>

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/forms/foo.xml

Das Formular, mit dem ein Foo-Item angelegt wird, ergänzen wir um ein Auswahlfeld mit passenden Kategorien. Wir nutzen hierzu das Joomla eigene Feld `categoryedit`. Beachte die Zeile `extension="com_foos"`. Diese bewirkt, dass ausschließlich Kategorien angezeigt werden, die zur Komponente `com_foos` gehören.

[administrator/components/com_foos/forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/forms/foo.xml)

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

<!-- prettier-ignore -->
#### administrator/components/com_foos/script.php

Damit zu Beginn schon eine Kategorie vorhanden ist, ergänzen wir das Skript, welches bei der Installation aufgerufen wird. Über die Methode `install` legen wir bei einer Neuinstallation eine Kategorie mit dem Titel `Uncategorised` für die Komponente an. Wir speichern diese direkt in der Datenbank. Um bei der Kategorie einen Benutzer als Ersteller angeben zu können, fragen wir die ID des Administrator in der Methode `getAdminId()` ab.

[administrator/components/com_foos/script.php](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/script.php)

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



 		return true;
 	}
+
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

<!-- \index{Alias} -->

<!-- prettier-ignore -->
#### administrator/components/com_foos/services/provider.php

Im Service Provider registrieren wir die Schnittstelle `CategoryFactoryInterface`. Es ist nicht notwendig, `CategoryFactory Interface` selbst zu erstellen. Wir nutzen die Joomla eigene Funktionen.

[administrator/components/com_foos/services/provider.php](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/services/provider.php)

```php {diff}

 \defined('_JEXEC') or die;

+use Joomla\CMS\Categories\CategoryFactoryInterface;
 use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
 use Joomla\CMS\Extension\ComponentInterface;
 use Joomla\CMS\Extension\Service\Provider\CategoryFactory;


 				$component->setRegistry($container->get(Registry::class));
 				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
+				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));

 				return $component;
 			}

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/sql/install.mysql.utf8.sql

Damit bei einer Neuinstallation die Tabellenspalte angelegt wird, in der die Kategorie eines Foo-Elements gespeichert wird, fügen wir in der SQL-Datei die bei der Installation aufgerufen wird, den erforderlichen SQL-Befehl hinzu.

[administrator/components/com_foos/sql/install.mysql.utf8.sql](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```php {diff}
 ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/Extension/FoosComponent.php

Zusätzlich sind in der Komponentenklasse Implementierungen erforderlich, um die Joomla eigenen Funktionen zu verwenden. Die Methode `countItems` ist notwendig, damit in der Kategorieansicht eine Übersicht über zugeordnete Items erscheint. Die Methode `getTableNameForSection` sorgt dafür, dass immer die richtige Datenbanktabelle abgefragt wird.

[administrator/components/com_foos/src/Extension/FoosComponent.php](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}
 use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
 use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;
 use Psr\Container\ContainerInterface;
+use Joomla\CMS\Helper\ContentHelper;

 /**
  * Component class for com_foos

 	{
 		$this->getRegistry()->register('foosadministrator', new AdministratorService);
 	}
+
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
+	protected function getTableNameForSection(string $section = null)
+	{
+		return ($section === 'category' ? 'categories' : 'foos_details');
+
+	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/Model/FoosModel.php

Im Model fügen wir bei der Datenbankabfrage die Tabelle hinzu, in der Joomla Kategorien speichert. So werden im Administrationsbereich bei Auswahl einer Kategorie nur die zu dieser gehörenden Elemente angezeigt.

[administrator/components/com_foos/src/Model/FoosModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}

 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access'))
+			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access', 'a.catid'))
 		);

 		$query->from($db->quoteName('#__foos_details', 'a'));

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

<!-- prettier-ignore -->
#### administrator/components/com_foos/tmpl/foo/edit.php

Das Formular zum Editieren eines Elements ergänzen wir um das Kategorie-Feld. Es wird mithilfe der Angaben im XML-Formular `administrator/components/com_foos/forms/foo.xml` gerendert, welches wir vorher hier im Kapitel bearbeitet haben.

[administrator/components/com_foos/tmpl/foo/edit.php](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 	<?php echo $this->getForm()->renderField('name'); ?>
 	<?php echo $this->getForm()->renderField('alias'); ?>
 	<?php echo $this->getForm()->renderField('access'); ?>
+	<?php echo $this->getForm()->renderField('catid'); ?>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/tmpl/foos/default.php

In der Übersichtstabelle der Ansicht im Backend fügen wir eine Spalte für die Anzeige der Kategorie hinzu.

[administrator/components/com_foos/tmpl/foos/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t12/src/administrator/components/com_foos/tmpl/foos/default.php)

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

> Die Kategorien helfen dir, im Frontend deine Daten strukturiert anzuzeigen. Die Frontend-Ansichten erstellen wir im weiteren Verlauf dieses Tutorials.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla aktualisiert bei der Installation die Datenbank für dich.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich.

3. In der Seitenleiste siehst du einen neuen Menüpunkt. Dieser bietet dir alles, was du zum Anlegen und Bearbeiten der Kategorien deiner Komponente benötigst. Im rechten Bereich der Tabelle ist eine Übersicht, die auflistet, wie viele Elemente veröffentlicht oder versteckt sind. Diese funktioniert noch nicht. Veröffentlichen und verstecken nehmen wir uns im nächsten Teil vor.

![Joomla Kategorie Menüpunkt](/images/j4x15x1.png)

4. Öffne als nächstes ein Element. Überzeuge dich davon, dass es möglich ist, diesem eine Kategorie zuzuordnen.

![Joomla Kategorie zuordnen](/images/j4x15x2.png)

5. Stelle sicher, dass die Foo-spezifischen Kategorien nicht in anderen Komponenten erscheinen, zum Beispiel in `com_contact`.

<img src="https://vg08.met.vgwort.de/na/8f13d433b093497c8779ad67c826486f" width="1" height="1" alt="">
