---
date: 2021-01-03
title: 'Joomla 4.x Tutorial - Extension Development - Tags'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-tags
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---


Tags

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t28...t29) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Keinen neuen Dateien

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/filter_foos.xml](https://github.com/astridx/boilerplate/compare/t28...t29#diff-680833320598887b6d6cc4feb95d4408)

[src/administrator/components/com_foos/forms/filter_foos.xml](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/forms/filter_foos.xml)

```xml
...
<field
			name="tag"
			type="tag"
			label="JTAG"
			multiple="true"
			mode="nested"
			custom="false"
			hint="JOPTION_SELECT_TAG"
			onchange="this.form.submit();"
		/>
...
```

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t28...t29#diff-262e27353fbe755d3813ea2df19cd0ed)

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/forms/foo.xml)

```xml
...
<field
			name="tags"
			type="tag"
			label="JTAG"
			class="advancedSelect"
			multiple="true"
		/>
...
```

#### [src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/compare/t28...t29#diff-7aceee287e50092f4d9e6caaec3b8b40)

[src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/script.php)

```php
...
	private function saveContentTypes()
	{
		$table = Table::getInstance('Contenttype', 'JTable');

		$table->load(array('type_alias' => 'com_foos.foo'));

		$tablestring = '{
			"special": {
			  "dbtable": "#__foos",
			  "key": "id",
			  "type": "FooTable",
			  "prefix": "Joomla\\\\Component\\\\Foos\\\\Administrator\\\\Table\\\\",
			  "config": "array()"
			},
			"common": {
			  "dbtable": "#__ucm_content",
			  "key": "ucm_id",
			  "type": "Corecontent",
			  "prefix": "JTable",
			  "config": "array()"
			}
		  }';

		$fieldmapping = '{
			"common": {
			  "core_content_item_id": "id",
			  "core_title": "name",
			  "core_state": "published",
			  "core_alias": "alias",
			  "core_publish_up": "publish_up",
			  "core_publish_down": "publish_down",
			  "core_access": "access",
			  "core_params": "params",
			  "core_featured": "featured",
			  "core_language": "language",
			  "core_ordering": "ordering",
			  "core_catid": "catid",
			  "asset_id": "null"
			},
			"special": {
			}
		  }';

		$contenttype = array();
		$contenttype['type_id'] = ($table->type_id) ? $table->type_id : 0;
		$contenttype['type_title'] = 'Foos';
		$contenttype['type_alias'] = 'com_foos.foo';
		$contenttype['table'] = $tablestring;
		$contenttype['rules'] = '';
		$contenttype['router'] = 'RouteHelper::getFooRoute';
		$contenttype['field_mappings'] = $fieldmapping;
		$contenttype['content_history_options'] = '';

		$table->save($contenttype);

		return;
	}
...
```

#### [src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t28...t29#diff-c1b8160bef2d2b36367dc59381d6bcb7)

Im Model des Elements fügen wir die Tags in die Stapelverarbeitung Batch ein und sorgen dafür, dass die zugehörigen Schlagworte geladen werden.

[src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/Model/FooModel.php)

```php
...
protected $batch_commands = array(
		'assetgroup_id' => 'batchAccess',
		'language_id'   => 'batchLanguage',
		'tag'           => 'batchTag',
		'user_id'       => 'batchUser',
  );
...
...
if (!empty($item->id))
{
  $item->tags = new TagsHelper;
  $item->tags->getTagIds($item->id, 'com_foos.foo');
}
...
```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t28...t29#diff-2daf62ad6c51630353e31eaa3cc28626)

Das Model der Übersichtsliste ändern wir bezüglich der Filter und der Datenbankabfrage.

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php
...
public function __construct($config = array()) {
  if (empty($config['filter_fields']))
  {
    $config['filter_fields'] = array(
      'id', 'a.id',
      'name', 'a.name',
      'catid', 'a.catid', 'category_id', 'category_title',
      'published', 'a.published',
      'access', 'a.access', 'access_level',
      'ordering', 'a.ordering',
      'featured', 'a.featured',
      'language', 'a.language', 'language_title',
      'publish_up', 'a.publish_up',
      'publish_down', 'a.publish_down',
      'tag',
    );
  ...
...
...
protected function getListQuery() {
  $tag = $this->getState('filter.tag');

  if (\is_array($tag) && \count($tag) === 1)
  {
    $tag = $tag[0];
  }

  if ($tag && \is_array($tag))
  {
    $tag = ArrayHelper::toInteger($tag);

    $subQuery = $db->getQuery(true)
      ->select('DISTINCT ' . $db->quoteName('content_item_id'))
      ->from($db->quoteName('#__contentitem_tag_map'))
      ->where(
        [
          $db->quoteName('tag_id') . ' IN (' . implode(',', $query->bindArray($tag)) . ')',
          $db->quoteName('type_alias') . ' = ' . $db->quote('com_foos.foo'),
        ]
      );

    $query->join(
      'INNER',
      '(' . $subQuery . ') AS ' . $db->quoteName('tagmap'),
      $db->quoteName('tagmap.content_item_id') . ' = ' . $db->quoteName('a.id')
    );
  }
  elseif ($tag = (int) $tag)
  {
    $query->join(
      'INNER',
      $db->quoteName('#__contentitem_tag_map', 'tagmap'),
      $db->quoteName('tagmap.content_item_id') . ' = ' . $db->quoteName('a.id')
    )
      ->where(
        [
          $db->quoteName('tagmap.tag_id') . ' = :tag',
          $db->quoteName('tagmap.type_alias') . ' = ' . $db->quote('com_foos.foo'),
        ]
      )
      ->bind(':tag', $tag, ParameterType::INTEGER);
  }
...
```

#### [src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t28...t29#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

In der Datenorganisation der View stellen wir sicher, dass die zur Sprache passenden Schlagworte geladen werden.

[src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php
...
$this->form->setFieldAttribute('tags', 'language', '*,' . $forcedLanguage);
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

2. Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Da wir im Installationsskript Dinge geändert haben, ist dies erforderlich.

3. Erstelle mithilfe der Schlagwort Komponente ein Tag.

4. Wähle das Tag bei einem Foo-Element aus.

https://docs.joomla.org/J3.x:Using_Tags_in_an_Extension

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t28...t29.diff

## Links
