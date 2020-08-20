---
date: 2019-12-20
title: 'Filtern, Sortieren, Suchen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-filtern-sortieren-suchen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Filtern, Sortieren und Suchen - jetzt bringen wir Ordnung in deine Joomla! 4 Komponente! Joomla bietet Ansichtsfilter und Suchwerkzeuge, mit denen du die Anzahl der sichtbaren Items einschränkst. Wenn der Statusfilter entsprechend gesetzt ist, werden nur Elemente angezeigt, deren Status veröffentlicht ist. Neben dem Statusfilter bieten die Suchwerkzeuge die Suche nach Titel oder Inhalt und die Möglichkeit die Tabelle zu sortieren, sprich die Reihenfolge zu ändern.

![Joomla! Filtern Sortieren und Suchen -Searchtools](/images/j4x20x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t15a...t16) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/forms/filter_foos.xml](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-680833320598887b6d6cc4feb95d4408)

[src/administrator/components/com_foos/forms/filter_foos.xml](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/forms/filter_foos.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<form>

	<fields name="filter">

		<field
			name="search"
			type="text"
			inputmode="search"
			label="COM_FOOS_FILTER_SEARCH_LABEL"
			description="COM_FOOS_FILTER_SEARCH_DESC"
			hint="JSEARCH_FILTER"
		/>

		<field
			name="featured"
			type="list"
			onchange="this.form.submit();"
			default=""
			>
			<option value="">JOPTION_SELECT_FEATURED</option>
			<option value="0">JUNFEATURED</option>
			<option value="1">JFEATURED</option>
		</field>

		<field
			name="published"
			type="status"
			label="JOPTION_SELECT_PUBLISHED"
			onchange="this.form.submit();"
			>
			<option value="">JOPTION_SELECT_PUBLISHED</option>
		</field>

		<field
			name="category_id"
			type="category"
			label="JOPTION_SELECT_CATEGORY"
			extension="com_foos"
			published="0,1,2"
			onchange="this.form.submit();"
			>
			<option value="">JOPTION_SELECT_CATEGORY</option>
		</field>

		<field
			name="access"
			type="accesslevel"
			label="JOPTION_SELECT_ACCESS"
			onchange="this.form.submit();"
			>
			<option value="">JOPTION_SELECT_ACCESS</option>
		</field>

		<field
			name="language"
			type="contentlanguage"
			label="JOPTION_SELECT_LANGUAGE"
			onchange="this.form.submit();"
			>
			<option value="">JOPTION_SELECT_LANGUAGE</option>
			<option value="*">JALL</option>
		</field>

	</fields>

	<fields name="list">

		<field
			name="fullordering"
			type="list"
			label="JGLOBAL_SORT_BY"
			default="a.name ASC"
			onchange="this.form.submit();"
			>
			<option value="">JGLOBAL_SORT_BY</option>
			<option value="a.ordering ASC">JGRID_HEADING_ORDERING_ASC</option>
			<option value="a.ordering DESC">JGRID_HEADING_ORDERING_DESC</option>
			<option value="a.published ASC">JSTATUS_ASC</option>
			<option value="a.published DESC">JSTATUS_DESC</option>
			<option value="a.name ASC">JGLOBAL_TITLE_ASC</option>
			<option value="a.name DESC">JGLOBAL_TITLE_DESC</option>
			<option value="category_title ASC">JCATEGORY_ASC</option>
			<option value="category_title DESC">JCATEGORY_DESC</option>
			<option value="access_level ASC">JGRID_HEADING_ACCESS_ASC</option>
			<option value="access_level DESC">JGRID_HEADING_ACCESS_DESC</option>
			<option value="association ASC" requires="associations">JASSOCIATIONS_ASC</option>
			<option value="association DESC" requires="associations">JASSOCIATIONS_DESC</option>
			<option value="language_title ASC" requires="multilanguage">JGRID_HEADING_LANGUAGE_ASC</option>
			<option value="language_title DESC" requires="multilanguage">JGRID_HEADING_LANGUAGE_DESC</option>
			<option value="a.id ASC">JGRID_HEADING_ID_ASC</option>
			<option value="a.id DESC">JGRID_HEADING_ID_DESC</option>
		</field>

		<field
			name="limit"
			type="limitbox"
			label="JGLOBAL_LIST_LIMIT"
			default="25"
			onchange="this.form.submit();"
		/>
	</fields>
</form>
```

> `featured` ist hier der Vollständigkeit halber als Filterfeld aufgenommen, obwohl wir das in der Erweiterung noch nicht unterstützen.

#### [src/administrator/components/com_foos/sql/updates/mysql/16.0.0.sql](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-49ec0cc94fa89db6f20d60195f94c0fe)

Im Falle eines Updates deiner Komponente, fügt die Datei `16.0.0.sql` eine Spalte zur Speicherung der Reihenfolge hinzu.

[src/administrator/components/com_foos/sql/updates/mysql/16.0.0.sql](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/sql/updates/mysql/16.0.0.sql)

```sql
ALTER TABLE `#__foos_details` ADD COLUMN  `ordering` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-262e27353fbe755d3813ea2df19cd0ed)

Das Formular mit dem ein Element angelegt beziehungsweise geändert wird, ergänzen wir mit einem Feld zur Festlegung der Reihenfolge.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/forms/foo.xml)

```xml
...
<field
			name="ordering"
			type="ordering"
			label="JFIELD_ORDERING_LABEL"
			content_type="com_foos.foo"
/>
...

```

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-896f245bc8e493f91277fd33913ef974)

Im Falle einer neuen Installtion, wird über das Skript in der Datei `install.mysql.utf8.sql` die Datenbank erstellt. Hier fügen wir eine Spalte zur Speicherung der Reihenfolge hinzu.

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql
...
ALTER TABLE `#__foos_details` ADD COLUMN  `ordering` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-2daf62ad6c51630353e31eaa3cc28626)

Im Model für die Liste gibt es eine Menge Änderungen. Im Konstruktor speichern wir zunächst die Filterfelder in die Konfiguration. 

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php
...
	public function __construct($config = array())
	{

		if (empty($config['filter_fields']))
		{
			$config['filter_fields'] = array(
				'id', 'a.id',
				'name', 'a.name',
				'catid', 'a.catid', 'category_id', 'category_title',
				'published', 'a.published',
				'access', 'a.access', 'access_level',
				'ordering', 'a.ordering',
				'language', 'a.language', 'language_title',
				'publish_up', 'a.publish_up',
				'publish_down', 'a.publish_down',
			);

			$assoc = Associations::isEnabled();

			if ($assoc)
			{
				$config['filter_fields'][] = 'association';
			}
		}

		parent::__construct($config);
	}
...
```

Und in der Methode `getListQuery()` passen wir die Datenbankabfrage so an, dass sie die die Filter und Sortierung beachtet. So sind die Daten sofort in der Form, in der wir sie anzeigen.

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php
...
...
		if ($access = $this->getState('filter.access'))
		{
			$query->where($db->quoteName('a.access') . ' = ' . (int) $access);
		}

		$published = (string) $this->getState('filter.published');

		if (is_numeric($published))
		{
			$query->where($db->quoteName('a.published') . ' = ' . (int) $published);
		}
		elseif ($published === '')
		{
			$query->where('(' . $db->quoteName('a.published') . ' = 0 OR ' . $db->quoteName('a.published') . ' = 1)');
		}

		$categoryId = $this->getState('filter.category_id');

		if (is_numeric($categoryId))
		{
			$query->where($db->quoteName('a.catid') . ' = ' . (int) $categoryId);
		}
		elseif (is_array($categoryId))
		{
			$query->where($db->quoteName('a.catid') . ' IN (' . implode(',', ArrayHelper::toInteger($categoryId)) . ')');
		}

		$search = $this->getState('filter.search');

		if (!empty($search))
		{
			if (stripos($search, 'id:') === 0)
			{
				$query->where('a.id = ' . (int) substr($search, 3));
			}
			else
			{
				$search = $db->quote('%' . str_replace(' ', '%', $db->escape(trim($search), true) . '%'));
				$query->where(
					'(' . $db->quoteName('a.name') . ' LIKE ' . $search . ')'
				);
			}
		}

		$orderCol = $this->state->get('list.ordering', 'a.name');
		$orderDirn = $this->state->get('list.direction', 'asc');

		if ($orderCol == 'a.ordering' || $orderCol == 'category_title')
		{
			$orderCol = $db->quoteName('c.title') . ' ' . $orderDirn . ', ' . $db->quoteName('a.ordering');
		}

		$query->order($db->escape($orderCol . ' ' . $orderDirn));
...
```

####  [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-8e3d37bbd99544f976bf8fd323eb5250)

Die View lädt das Filterformular, welches im oberen Bereich angezeigt wird.

[src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php
...
$this->filterForm = $this->get('FilterForm');
$this->activeFilters = $this->get('ActiveFilters');
$this->state = $this->get('State');

if (count($errors = $this->get('Errors')))
{
	throw new GenericDataException(implode("\n", $errors), 500);
}

foreach ($this->items as &$item)
{
	$item->order_up = true;
	$item->order_dn = true;
}
...		
```

####  [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-3186af99ea4e3321b497b86fcd1cd757)


`<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>` mit `<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ACCESS', 'access_level', $listDirn, $listOrder); ?>`


[src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/tmpl/foos/default.php)

```php
...
$listOrder = $this->escape($this->state->get('list.ordering'));
$listDirn  = $this->escape($this->state->get('list.direction'));
$saveOrder = $listOrder == 'a.ordering';

if ($saveOrder && !empty($this->items))
{
	$saveOrderingUrl = 'index.php?option=com_foos&task=foos.saveOrderAjax&tmpl=component&' . Session::getFormToken() . '=1';
}
...

```

#### [src/administrator/components/com_foos/tmpl/foos/modal.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-aeba8d42de72372f42f890d454bf928e)

Die Icons zeigen uns an, ob und in welche Richtung sortiert ist. Damit die Sortierung für jemanden klar ist, der diese nicht sieht, fügen wir ein caption Element hinzu. Das wird nicht angezeigt, da die Pfeile sichtbar sind - es wird vorgelesen.

> Die [Klasse `sr-only`](https://getbootstrap.com/docs/4.0/utilities/screenreaders/) verbirgt ein Element für alle Geräte außer Bildschirmleseprogrammen.

[src/administrator/components/com_foos/tmpl/foos/modal.php](https://github.com/astridx/boilerplate/blob/9a7f1349a8b8371a96e93056d7764c557686f7c1/src/administrator/components/com_foos/tmpl/foos/modal.php)

```php
...
<caption id="captionTable" class="sr-only">
	<?php echo Text::_('COM_FOOS_TABLE_CAPTION'); ?>, <?php echo Text::_('JGLOBAL_SORTED_BY'); ?>
</caption>
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Öffne die Ansicht deiner Komponente im Administrationsbereich und filter, sortiere und suche nach Items in deiner Komponente.

![Joomla! Filtern Sortieren und Suchen -Searchtools](/images/j4x20x1.png)

## Geänderte Dateien

### Übersicht
