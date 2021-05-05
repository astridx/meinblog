---
date: 2021-01-03
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Tags'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-tags
langKey: de
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

Schlagwörter oder Tags sind eine flexible Lösung, Inhalte in Joomla! zu organisieren. Ein Schlagwort kann vielen unterschiedlichen Elementen unterschiedlicher Inhaltstypen zugewiesen werden. Jedes Element kann unbegrenzt Schlagwörter haben.

Das Tag-System von Joomla wird in allen Kern-Erweiterungen verwendet. Es ist so konzipiert, dass es leicht in andere Erweiterungen integriert werden kann, die Standard-Joomla-Design-Muster verwenden. Die Verwendung von Tags in einer Drittanbieter-Erweiterung ist ziemlich einfach. Für die Verwendung in einer eigenen Erweiterung sind die hier erläuterten Änderungen erforderlich.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t28...t29)[^github.com/astridx/boilerplate/compare/t28...t29] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In der nachfolgenden Übersicht sind die neu hinzugekommenen Dateien mit einem Hintergrund versehen und die geänderten umrandet.

![Übersicht über die in diesem Kapitel bearbeiteten Dateien](/images/tree29.png)

### Neue Dateien

Keinen neuen Dateien.

### Geänderte Dateien

#### [administrator/components/com_foos/ forms/filter_foos.xml](https://github.com/astridx/boilerplate/compare/t28...t29#diff-680833320598887b6d6cc4feb95d4408)

Das Formular über das die Suchwergzeuge verwaltet werden erhält einen Eintrag für die Schlagwörter.

[administrator/components/com_foos/ forms/filter_foos.xml](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/forms/filter_foos.xml)

```xml {diff}
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

```

#### [administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t28...t29#diff-262e27353fbe755d3813ea2df19cd0ed)

Im XML-Formular ergänzen wir das Formularfeld, in dem die Informationen zum Tag enthalten sind. Da wir Joomla Standard nutzen, können wir viele vorgefertigte Funktionen Out-of-the-Box nutzen.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
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

```

#### [administrator/components/com_foos/ script.php](https://github.com/astridx/boilerplate/compare/t28...t29#diff-7aceee287e50092f4d9e6caaec3b8b40)

Im Installationsskript sorgen wir dafür, dass unsere Erweiterung in Joomla als eigener Inhaltstyp erkannt wird.

[administrator/components/com_foos/ script.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/script.php)

```php {diff}
 	{
 		echo Text::_('COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT');

+		$this->saveContentTypes();
+
 		return true;
 	}



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
+		$table->load(['type_alias' => 'com_foos.foo']);
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
+		$contenttype = [];
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

```

#### [administrator/components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t28...t29#diff-c1b8160bef2d2b36367dc59381d6bcb7)

Im Model des Elements fügen wir die Tags in die Stapelverarbeitung Batch ein und sorgen dafür, dass die zugehörigen Tags geladen werden.

[administrator/components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {diff}
use Joomla\CMS\Language\LanguageHelper;
 use Joomla\Database\ParameterType;
 use Joomla\Utilities\ArrayHelper;
+use Joomla\CMS\Helper\TagsHelper;

 /**
  * Item Model for a Foo.

 	protected $batch_commands = [
 		'assetgroup_id' => 'batchAccess',
 		'language_id'   => 'batchLanguage',
+		'tag'           => 'batchTag',
 		'user_id'       => 'batchUser',
 	];


 			}
 		}

+		// Load item tags
+		if (!empty($item->id)) {
+			$item->tags = new TagsHelper;
+			$item->tags->getTagIds($item->id, 'com_foos.foo');
+		}
+
 		return $item;
 	}

```

#### [administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t28...t29#diff-2daf62ad6c51630353e31eaa3cc28626)

Das Model der Übersichtsliste unserer Erweiterung im Backend ändern wir bezüglich der Filter und der Datenbankabfrage.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}
 				'publish_down', 'a.publish_down',
 			];

-			$assoc = Associations::isEnabled();
-
 			if ($assoc) {
 				$config['filter_fields'][] = 'association';
 			}

 			$query->where($db->quoteName('a.language') . ' = ' . $db->quote($language));
 		}

+		// Filter by a single or group of tags.
+		$tag = $this->getState('filter.tag');
+
+		// Run simplified query when filtering by one tag.
+		if (\is_array($tag) && \count($tag) === 1) {
+			$tag = $tag[0];
+		}
+
+		if ($tag && \is_array($tag)) {
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
+		} else if ($tag = (int) $tag) {
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
 		if ($access = $this->getState('filter.access')) {
 			$query->where($db->quoteName('a.access') . ' = ' . (int) $access);

```

#### [administrator/components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t28...t29#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

In der Datenorganisation der View stellen wir sicher, dass die zur Sprache passenden Schlagworte geladen werden.

[administrator/components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}

 			// Only allow to select categories with All language or with the forced language.
 			$this->form->setFieldAttribute('catid', 'language', '*,' . $forcedLanguage);
+
+			// Only allow to select tags with All language or with the forced language.
+			$this->form->setFieldAttribute('tags', 'language', '*,' . $forcedLanguage);
 		}

 		$this->addToolbar();

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

2. Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Da wir im Installationsskript Dinge geändert haben, ist dies erforderlich.

3. Erstelle mithilfe der Schlagwort Komponente ein Tag.

![Ein Schlagwort in Joomla 4 erstellen](/images/j4x34x1.png)

4. Setze das gerade erstellte Schlagwort bei einem Foo-Element.

![Ein Schlagwort in einer eigenen Joomla 4 Eweiterung](/images/j4x34x2.png)

5. Überzeuge dich davon, dass das Filtern anhand der Schlagwörter funktioniert.

![Ein Schlagwort beim Filtern in der Listenansicht einer Joomla 4 Eweiterung](/images/j4x34x3.png)

6. Erstelle einen Menüpunkt, der alle Elemente anzeigt, die einem bestimmten Schlagwort zugeordnet sind und sieh dir die Anzeige im Frontend an.

![Ein Schlagwort in einer eigenen Joomla 4 Eweiterung](/images/j4x34x4.png)

![Ein Schlagwort in einer eigenen Joomla 4 Eweiterung](/images/j4x34x5.png)

> In der Anzeige siehst du lediglich veröffentlichte Elemente.

> Ich überlasse dir die Entscheidung, wie und wo du die Schlagworte in Frontendansichten deiner eigenen Erweiterung anzeigst.

## Links

[Verwendung von Tags in einer Erweiterung](https://docs.joomla.org/J3.x:Using_Tags_in_an_Extension)[^https://docs.joomla.org/j3.x:using_tags_in_an_extension]
