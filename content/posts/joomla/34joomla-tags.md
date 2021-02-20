---
date: 2021-01-03
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Tags'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-tags
categories:
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

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Da wir im Installationsskript Dinge geändert haben, ist dies erforderlich.

3. Erstelle mithilfe der Schlagwort Komponente ein Tag.

4. Wähle das Tag bei einem Foo-Element aus.

https://docs.joomla.org/J3.x:Using_Tags_in_an_Extension

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t28...t29.diff

diff --git a/src/administrator/components/com_foos/forms/filter_foos.xml b/src/administrator/components/com_foos/forms/filter_foos.xml
index 613db7b4..b84939cd 100644
--- a/src/administrator/components/com_foos/forms/filter_foos.xml
+++ b/src/administrator/components/com_foos/forms/filter_foos.xml
@@ -62,6 +62,16 @@
 			<option value="*">JALL</option>
 		</field>
 
+		<field
+			name="tag"
+			type="tag"
+			label="JTAG"
+			multiple="true"
+			mode="nested"
+			custom="false"
+			hint="JOPTION_SELECT_TAG"
+			onchange="this.form.submit();"
+		/>
 	</fields>
 
 	<fields name="list">
diff --git a/src/administrator/components/com_foos/forms/foo.xml b/src/administrator/components/com_foos/forms/foo.xml
index 37a9c36b..e25cde6f 100644
--- a/src/administrator/components/com_foos/forms/foo.xml
+++ b/src/administrator/components/com_foos/forms/foo.xml
@@ -120,6 +120,14 @@
 			label="JFIELD_ORDERING_LABEL"
 			content_type="com_foos.foo"
 		/>
+
+		<field
+			name="tags"
+			type="tag"
+			label="JTAG"
+			class="advancedSelect"
+			multiple="true"
+		/>
 	</fieldset>
 	<fields name="params" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
 		<fieldset name="display" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
diff --git a/src/administrator/components/com_foos/script.php b/src/administrator/components/com_foos/script.php
index c5f6cf10..18b0741c 100644
--- a/src/administrator/components/com_foos/script.php
+++ b/src/administrator/components/com_foos/script.php
@@ -197,6 +197,8 @@ public function postflight($type, $parent)
 	{
 		echo Text::_('COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT');
 
+		$this->saveContentTypes();
+
 		return true;
 	}
 
@@ -244,4 +246,69 @@ private function getAdminId()
 
 		return $id;
 	}
+
+	/**
+	 * Adding content_type for tags.
+	 *
+	 * @return  integer|boolean  One Administrator ID.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	private function saveContentTypes()
+	{
+		$table = Table::getInstance('Contenttype', 'JTable');
+
+		$table->load(array('type_alias' => 'com_foos.foo'));
+
+		$tablestring = '{
+			"special": {
+			  "dbtable": "#__foos",
+			  "key": "id",
+			  "type": "FooTable",
+			  "prefix": "Joomla\\\\Component\\\\Foos\\\\Administrator\\\\Table\\\\",
+			  "config": "array()"
+			},
+			"common": {
+			  "dbtable": "#__ucm_content",
+			  "key": "ucm_id",
+			  "type": "Corecontent",
+			  "prefix": "JTable",
+			  "config": "array()"
+			}
+		  }';
+
+		$fieldmapping = '{
+			"common": {
+			  "core_content_item_id": "id",
+			  "core_title": "name",
+			  "core_state": "published",
+			  "core_alias": "alias",
+			  "core_publish_up": "publish_up",
+			  "core_publish_down": "publish_down",
+			  "core_access": "access",
+			  "core_params": "params",
+			  "core_featured": "featured",
+			  "core_language": "language",
+			  "core_ordering": "ordering",
+			  "core_catid": "catid",
+			  "asset_id": "null"
+			},
+			"special": {
+			}
+		  }';
+
+		$contenttype = array();
+		$contenttype['type_id'] = ($table->type_id) ? $table->type_id : 0;
+		$contenttype['type_title'] = 'Foos';
+		$contenttype['type_alias'] = 'com_foos.foo';
+		$contenttype['table'] = $tablestring;
+		$contenttype['rules'] = '';
+		$contenttype['router'] = 'RouteHelper::getFooRoute';
+		$contenttype['field_mappings'] = $fieldmapping;
+		$contenttype['content_history_options'] = '';
+
+		$table->save($contenttype);
+
+		return;
+	}
 }
diff --git a/src/administrator/components/com_foos/src/Model/FooModel.php b/src/administrator/components/com_foos/src/Model/FooModel.php
index 8a27f382..679e94e5 100644
--- a/src/administrator/components/com_foos/src/Model/FooModel.php
+++ b/src/administrator/components/com_foos/src/Model/FooModel.php
@@ -17,6 +17,7 @@
 use Joomla\CMS\Language\LanguageHelper;
 use Joomla\Database\ParameterType;
 use Joomla\Utilities\ArrayHelper;
+use Joomla\CMS\Helper\TagsHelper;
 
 /**
  * Item Model for a Foo.
@@ -56,6 +57,7 @@ class FooModel extends AdminModel
 	protected $batch_commands = array(
 		'assetgroup_id' => 'batchAccess',
 		'language_id'   => 'batchLanguage',
+		'tag'           => 'batchTag',
 		'user_id'       => 'batchUser',
 	);
 
@@ -131,6 +133,13 @@ public function getItem($pk = null)
 			}
 		}
 
+		// Load item tags
+		if (!empty($item->id))
+		{
+			$item->tags = new TagsHelper;
+			$item->tags->getTagIds($item->id, 'com_foos.foo');
+		}
+
 		return $item;
 	}
 
diff --git a/src/administrator/components/com_foos/src/Model/FoosModel.php b/src/administrator/components/com_foos/src/Model/FoosModel.php
index c5f62f0c..0faa7542 100644
--- a/src/administrator/components/com_foos/src/Model/FoosModel.php
+++ b/src/administrator/components/com_foos/src/Model/FoosModel.php
@@ -48,6 +48,7 @@ public function __construct($config = array())
 				'language', 'a.language', 'language_title',
 				'publish_up', 'a.publish_up',
 				'publish_down', 'a.publish_down',
+				'tag',
 			);
 
 			$assoc = Associations::isEnabled();
@@ -150,6 +151,51 @@ protected function getListQuery()
 			$query->where($db->quoteName('a.language') . ' = ' . $db->quote($language));
 		}
 
+		// Filter by a single or group of tags.
+		$tag = $this->getState('filter.tag');
+
+		// Run simplified query when filtering by one tag.
+		if (\is_array($tag) && \count($tag) === 1)
+		{
+			$tag = $tag[0];
+		}
+
+		if ($tag && \is_array($tag))
+		{
+			$tag = ArrayHelper::toInteger($tag);
+
+			$subQuery = $db->getQuery(true)
+				->select('DISTINCT ' . $db->quoteName('content_item_id'))
+				->from($db->quoteName('#__contentitem_tag_map'))
+				->where(
+					[
+						$db->quoteName('tag_id') . ' IN (' . implode(',', $query->bindArray($tag)) . ')',
+						$db->quoteName('type_alias') . ' = ' . $db->quote('com_foos.foo'),
+					]
+				);
+
+			$query->join(
+				'INNER',
+				'(' . $subQuery . ') AS ' . $db->quoteName('tagmap'),
+				$db->quoteName('tagmap.content_item_id') . ' = ' . $db->quoteName('a.id')
+			);
+		}
+		elseif ($tag = (int) $tag)
+		{
+			$query->join(
+				'INNER',
+				$db->quoteName('#__contentitem_tag_map', 'tagmap'),
+				$db->quoteName('tagmap.content_item_id') . ' = ' . $db->quoteName('a.id')
+			)
+				->where(
+					[
+						$db->quoteName('tagmap.tag_id') . ' = :tag',
+						$db->quoteName('tagmap.type_alias') . ' = ' . $db->quote('com_foos.foo'),
+					]
+				)
+				->bind(':tag', $tag, ParameterType::INTEGER);
+		}
+
 		// Filter by access level.
 		if ($access = $this->getState('filter.access'))
 		{
diff --git a/src/administrator/components/com_foos/src/View/Foo/HtmlView.php b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php
index 4d35af80..cf90c330 100644
--- a/src/administrator/components/com_foos/src/View/Foo/HtmlView.php
+++ b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php
@@ -61,6 +61,9 @@ public function display($tpl = null)
 
 			// Only allow to select categories with All language or with the forced language.
 			$this->form->setFieldAttribute('catid', 'language', '*,' . $forcedLanguage);
+
+			// Only allow to select tags with All language or with the forced language.
+			$this->form->setFieldAttribute('tags', 'language', '*,' . $forcedLanguage);
 		}
 
 		$this->addToolbar();

```

## Links
