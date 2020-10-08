---
date: 2019-12-15
title: 'Kategorien im Backend einrichten'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-kategorien-im-backend-einrichten
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Fast jede Website teilt ihre Inhalte in Kategorien ein. Joomla! bietet dieses nützliche Feature ebenfalls. Der aktuelle Teil des Tutorials zeigt dir, wie du Kategorien idealerweise in eine Joomla! Komponente integrierst. Erfinde das Rad nicht selbst neu. Nutze das, was Joomla! dir bietet.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t11b...t12) an und übernimm diese Änderungen in deine Entwicklungsversion.

```php
// https://github.com/astridx/boilerplate/compare/t11b...t12.diff
}
```

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-d7cb057651fb85156ba13996b6a045c8)

Im Falle einer Aktualisierung ist es wichtig, die Datenbank um eine Spalte zu

[src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql)

```sql
ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_catid` (`catid`);

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-e5dfd09c647ca1e552c9016cf918acf3)

Die Einträge in der `access.xml` sind notwendig, um Berechtigungen für die Kategorie zu setzen.

[https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/access.xml)

```xml
...
  <section name="category">
		<action name="core.create" title="JACTION_CREATE" />
		<action name="core.delete" title="JACTION_DELETE" />
		<action name="core.edit" title="JACTION_EDIT" />
		<action name="core.edit.state" title="JACTION_EDITSTATE" />
		<action name="core.edit.own" title="JACTION_EDITOWN" />
	</section>
...

```

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-1ff20be1dacde6c4c8e68e90161e0578)

Der Eintrag `<menu link="option=com_categories&amp;extension=com_foos"` bewirkt, dass im Menu des Administrationsbereichs ein Menüpunkt zur Bearbeitung der Kategorie hinzugefügt wird.

[src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/foos.xml)

```xml
...
<submenu>
		<menu link="option=com_foos">COM_FOOS</menu>
		<menu link="option=com_categories&amp;extension=com_foos"
			view="categories" img="class:foos-cat" alt="Foos/Categories">JCATEGORY</menu>
	</submenu>
...
```

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-262e27353fbe755d3813ea2df19cd0ed)

Das Formular, mit dem ein Foo-Item angelegt wird, ergänzen wir um ein Auswahlfeld mit passenden Kategorien. Wir nutzen hierzu das Joomla eigenes Feld `categoryedit`. Beachte die Zeile `extension="com_foos"`. Diese bewirkt, dass ausschließlich Kategorien angezeigt werden, die zu deiner Komponente gehören.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/forms/foo.xml)

```xml
...
<field
	name="catid"
	type="categoryedit"
	label="JCATEGORY"
	extension="com_foos"
	addfieldprefix="Joomla\Component\Categories\Administrator\Field"
	required="true"
	default=""
/>
...

```

#### [src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-7aceee287e50092f4d9e6caaec3b8b40)

Damit zu Beginn schon eine Kategorie vorhanden ist, ergänzen wir das Skript, welches bei der Installation aufgerufen wird. Über die Methode `install` legen wir mithilfe der Datenbank ab jetzt bei einer Neuinstallation eine Kategorie mit dem Titel `Uncategorised` für die Komponente an.

[https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/script.php)

```php
...
public function install($parent): bool
	{
		echo Text::_('COM_FOOS_INSTALLERSCRIPT_INSTALL');

		$db = Factory::getDbo();

		$category = Table::getInstance('Category');

		$data = array(
			'extension'       => 'com_foos',
			'title'           => 'Uncategorised',
		);

		if (!$category->bind($data))
		{
			return false;
		}

		if (!$category->check())
		{
			return false;
		}

		if (!$category->store(true))
		{
			return false;
		}

		return true;
	}

...
```

Um bei der Kategorie einen Benutzer als Ersteller angeben zu können, fragen wir die ID des Administrators ab.

```php
...
	private function getAdminId()
	{
		$db    = Factory::getDbo();
		$query = $db->getQuery(true);

		// Select the admin user ID
		$query
			->clear()
			->select($db->quoteName('u') . '.' . $db->quoteName('id'))
			->from($db->quoteName('#__users', 'u'))
			->join(
				'LEFT',
				$db->quoteName('#__user_usergroup_map', 'map')
				. ' ON ' . $db->quoteName('map') . '.' . $db->quoteName('user_id')
				. ' = ' . $db->quoteName('u') . '.' . $db->quoteName('id')
			)
			->join(
				'LEFT',
				$db->quoteName('#__usergroups', 'g')
				. ' ON ' . $db->quoteName('map') . '.' . $db->quoteName('group_id')
				. ' = ' . $db->quoteName('g') . '.' . $db->quoteName('id')
			)
			->where(
				$db->quoteName('g') . '.' . $db->quoteName('title')
				. ' = ' . $db->quote('Super Users')
			);

		$db->setQuery($query);
		$id = $db->loadResult();

		if (!$id || $id instanceof \Exception)
		{
			return false;
		}

		return $id;
	}
...

```

#### [src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

Im Service Provider registrieren wir `CategoryFactoryInterface`. Es ist nicht notwendig, `CategoryFactoryInterface` selbst zu erstellen. Wir nutzen die Joomla eigene Funktionen.

[src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/services/provider.php)

```php
...
	public function register(Container $container)
	{
		$container->registerServiceProvider(new CategoryFactory('\\Joomla\\Component\\Foos'));
		$container->registerServiceProvider(new MVCFactory('\\Joomla\\Component\\Foos'));
		$container->registerServiceProvider(new ComponentDispatcherFactory('\\Joomla\\Component\\Foos'));

		$container->set(
			ComponentInterface::class,
			function (Container $container)
			{
				$component = new FoosComponent($container->get(ComponentDispatcherFactoryInterface::class));

				$component->setRegistry($container->get(Registry::class));
				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));

				return $component;
			}
		);
  }
...
```

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-896f245bc8e493f91277fd33913ef974)

Damit bei einer Installation die TAbellenspalte angelegt wird, in der die Kategorie eines Foo-Elements gespeichert wird, fügen wir in SQL-Datei die bei der Installation aufgerufen wird, den Eintrag `ALTER TABLE`#\_\_foos_details`ADD COLUMN`catid`int(11) NOT NULL DEFAULT 0 AFTER`alias`;` hinzu.

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```
...
ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

```

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-38764f2b1343234561c0d02cd2991ea1)

Zusätzlich sind der Komponentenklasse Implementierungen erforderlich.

[src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php
	public function countItems(array $items, string $section)
	{
		try
		{
			$config = (object) array(
				'related_tbl'   => $this->getTableNameForSection($section),
				'state_col'     => 'published',
				'group_col'     => 'catid',
				'relation_type' => 'category_or_group',
			);

			ContentHelper::countRelations($items, $config);
		}
		catch (\Exception $e)
		{
			// Ignore it
		}
	}

	protected function getTableNameForSection(string $section = null)
	{
		return ($section === 'category' ? 'categories' : 'foos_details');

	}

```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-2daf62ad6c51630353e31eaa3cc28626)

Im Model fügen wir bei der Datenbankabfrage die Tabelle hinzu, in der Kategorien in Joomla gespeichert werden.

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/src/Model/FoosModel.php)

```
...
$query->select($db->quoteName('c.title', 'category_title'))
->join(
	'LEFT',
	$db->quoteName('#__categories', 'c') . ' ON ' . $db->quoteName('c.id') . ' = ' . $db->quoteName('a.catid')
);
...
```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-1637778e5f7d1d56dd1751af1970f01b)

Das Formular zum Editieren eines Elements erhält die Anweisung, das Feld mithilfe der Angaben in der XML-Datei zu erstellen.

[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php
...
	<?php echo $this->getForm()->renderField('catid'); ?>
...

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-3186af99ea4e3321b497b86fcd1cd757)

In der Übersichtstabelle fügen wir eine Spalte für die Anzeige der Kategorie hinzu.

[src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/tmpl/foos/default.php)

```php
...
<div class="small">
	<?php echo Text::_('JCATEGORY') . ': ' . $this->escape($item->category_title); ?>
</div>
...

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Datenbank für dich.

2. Öffne die Ansicht deiner Komponenten im Administrationsbereich.

3. In der Seitenleiste siehst du einen neuen Menüpunkt. Dieser bietet dir alles, was du zum Anlegen und Bearbeiten der Kategorien deiner Komponente benötigst.

![Joomla! Validierung](/images/j4x15x1.png)

4. Öffne als Nächstes ein Element. Überzeuge dich davon, dass es möglich ist, diesem eine Kategorie zuzuordnen.

![Joomla! Validierung](/images/j4x15x2.png)

Die Kategorien helfen dir, im Frontend deine Daten strukturiert anzuzeigen. Die Ansichten erstellen wir im weiteren Verlauf dieser Artikelserie.

## Geänderte Dateien

### Übersicht
