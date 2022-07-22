---
description: 'desc'
shortTitle: 'short'
date: 2021-01-17
title: 'Tags'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-tags
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Mit Schlagwörtern oder Tags sind Inhalte in Joomla! flexibel organisierbar. Es ist möglich, ein Tag vielen unterschiedlichen Elementen zuzuweisen. Umgekehrt kann jedes Item über eine unbegrenzte Anzahl an Schlagwörtern verfügen.

Das Tag-System von Joomla wird in allen Kern-Erweiterungen verwendet. Es ist so konzipiert, dass es bequem in andere Komponenten integrierbar ist. Zumindest dann, wenn diese die Standard-Joomla-Design-Muster verwenden. Die Nutzung von Tags in einer Drittanbieter-Erweiterung ist unkompliziert. Für die Integration in eine eigene Komponente reichen die in diesem Kapitel erläuterten Ergänzungen aus.<!-- \index{Schlagworte} --><!-- \index{Tags} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t28...t29)[^github.com/astridx/boilerplate/compare/t28...t29] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

In diesem Kapitel kommen keine Dateien hinzu.

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ forms/filter_foos.xml

Das Formular `forms/filter_foos.xml`, über das die Suchwergzeuge verwaltet werden, erhält einen Eintrag für die Schlagwörter.

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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ forms/foo.xml

Im dem XML-Formular `forms/foo.xml`, welches ein Foo-Item beschreibt, ergänzen wir das Formularfeld, in dem die Informationen zum Tag enthalten sind. Da wir Joomla Standard nutzen, können wir viele vorgefertigte Funktionen Out-of-the-Box nutzen. Beispielsweise sorgt `type="tag"` dafür, dass ein Auswahlfeld mit allen verfügbaren Schlagworten angezeigt wird.

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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ script.php

Im Installationsskript sorgen wir dafür, dass unsere Erweiterung in Joomla als eigener Inhaltstyp erkannt wird. Joomla Typen sind beispielsweise Content, Kontakt oder Banner. Im Skript sorgen wir jetzt dafür, dass ein Eintrag in der Tabelle `Contenttype` für die Foo Komponente ergänzt wird. Dies hat zur Folge, dass Joomla `com_foo` bei speziellen Abläufen berücksichtig, beispielsweise bei der Prüfung welches Element welches Schlagwort enthält.

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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Model/FooModel.php

Im Model des Elements fügen wir die Tags in die Stapelverarbeitung (Batch) ein und sorgen dafür, dass die zugehörigen Tags geladen werden.

[administrator/components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {diff}
 use Joomla\CMS\Language\LanguageHelper;
 use Joomla\Database\ParameterType;
 use Joomla\Utilities\ArrayHelper;
+use Joomla\CMS\Helper\TagsHelper;

 /**
  * Item Model for a Foo.
... class FooModel extends AdminModel
 	protected $batch_commands = [
 		'assetgroup_id' => 'batchAccess',
 		'language_id'   => 'batchLanguage',
+		'tag'           => 'batchTag',
 		'user_id'       => 'batchUser',
 	];

...  public function getItem($pk = null)
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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Model/FoosModel.php

Das Model eines einzelnen Items haben wir schon bearbeitet. Als nächstes erweitern wir das Model der Übersichtsliste. Wir passen dieses bezüglich der Filter und der Datenbankabfrage an.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}
 use Joomla\CMS\Language\Associations;
 use Joomla\CMS\Factory;
 use Joomla\Utilities\ArrayHelper;
+use Joomla\Database\ParameterType;

 /**
  * Methods supporting a list of foo records.
... protected function getListQuery()
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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foo/HtmlView.php

Kurz vor Schluss kümmern wir uns um die Anzeige. In der View stellen wir sicher, dass die zur Sprache passenden Schlagworte geladen werden.

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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foos/default\_batch\_body.php

Damit die Stapelverarbeitung auch für die Tags nutzbar ist, fügen wir ein Formularfeld ein. Mithilfe dieses Feldes ist es möglich ein Schlagwort auszuwählen, dass allen selektierten Items zugeordnet wird.

[administrator/components/com_foos/ tmpl/foos/default_batch_body.php](https://github.com/astridx/boilerplate/blob/t29/src/administrator/components/com_foos/tmpl/foos/default_batch_body.php)

```php {diff}
 				</div>
 			</div>
 		<?php endif; ?>
+		<div class="form-group col-md-6">
+			<div class="controls">
+				<?php echo LayoutHelper::render('joomla.html.batch.tag', []); ?>
+			</div>
+		</div>
 	</div>
 </div>
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

2. Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Da wir im Installationsskript Dinge geändert haben, ist eine neue Installation erforderlich.

3. Erstelle mithilfe der Schlagwort Komponente ein Tag.

![Ein Schlagwort in Joomla 4 erstellen](/images/j4x34x1.png)

4. Setze das gerade erstellte Schlagwort bei einem Foo-Element.

![Ein Schlagwort in einer eigenen Joomla 4 Erweiterung](/images/j4x34x2.png)

5. Überzeuge dich davon, dass das Filtern anhand der Schlagwörter funktioniert.

![Ein Schlagwort beim Filtern in der Listenansicht einer Joomla 4 Erweiterung](/images/j4x34x3.png)

6. Erstelle einen Menüpunkt, der alle Elemente anzeigt, die einem bestimmten Schlagwort zugeordnet sind und sieh dir die Anzeige im Frontend an.

![Ein Schlagwort in einer eigenen Joomla 4 Erweiterung](/images/j4x34x4.png)

![Ein Schlagwort in einer eigenen Joomla 4 Erweiterung](/images/j4x34x5.png)

Falls du ein Foo-Element mit einem Tag versehen hast und dich nun wunderst, dass dieses nicht angezeigt wird prüfe als erstes, ob das Foo Element veröffentlicht ist. Im Frontend werden lediglich veröffentlichte Elemente angezeigt.

7. Erstelle ein neues Schlagwort und ordne es per Stapelverarbeitung mehreren Foo Items zu.

![Ein Schlagwort in einer eigenen Joomla 4 Erweiterung per Stapelverarbeitung zuweisen - Stapelverarbeitung öffnen](/images/j4x34x7.png)

![Ein Schlagwort in einer eigenen Joomla 4 Erweiterung per Stapelverarbeitung zuweisen - Formular absenden](/images/j4x34x6.png)

8. Überlege, wie und wo du die Schlagworte in der Frontendansichten deiner eigenen Erweiterung anzeigst. `com_contact` bietet einen Parameter über den der Websitebetreiber einstellen kann. ob Tags angezeigt werden. Die Anzeige erfolgt mit Hilfe des Layouts `joomla.content.tags`.

```php
<?php if ($tparams->get('show_tags', 1) && !empty($this->item->tags->itemTags)) : ?>
	<div class="com-contact__tags">
		<?php $this->item->tagLayout = new FileLayout('joomla.content.tags'); ?>
		<?php echo $this->item->tagLayout->render($this->item->tags->itemTags); ?>
	</div>
<?php endif; ?>
```

> Möchtest du Joomla Elemente taggen um damit ein Stichwortverzeichnis zu bauen. Die Zuweisung machst du, indem du das Element (Artiikel, Kategorie ...) öffnest und die Schlagworte rechts einträgst. Hast du dabei Probleme? Werden nicht alle Schlagworte gespeichert. Fällt dir außerdem auf, dass auch bei anderen Komponenten im Auswahlmenü nicht alle Schlagworte angezeigt werden? Die Ursache ist, das die Anzeige der Schlagworte auf 30 limitiert ist. Ich habe nach einer Dokumentation gesucht. Ich habe nichts gefunden. Vielleicht liegt es daran, dass ich nicht richtig suche. Mir fällt es manchmal einfacher, direkt im Code zu schauen: Die Stelle, welche die Frage beantwortet, ist in der Datei [libraries/src/Form/Field/TagField.php](https://github.com/joomla/joomla-cms/blob/ba5fc69400c2fb2a27e56d0b8bec0db10c8705df/libraries/src/Form/Field/TagField.php#L136)[^github.com/joomla/joomla-cms/blob/ba5fc69400c2fb2a27e56d0b8bec0db10c8705df/libraries/src/form/field/tagfield.php#l136]. Der PR, in dem auch die Gründe für die Einführung herauslesen kann, ist [PR 31481](https://github.com/joomla/joomla-cms/pull/31481)[^github.com/joomla/joomla-cms/pull/31481]. Abhilfe schafft die Änderung des Anzeigemodus in der Komponente Tags.<!-- \index{Schlagworte!Limit} --><!-- \index{Tags!Limit} -->

## Links

[Verwendung von Tags in einer Erweiterung](https://docs.joomla.org/J3.x:Using_Tags_in_an_Extension)[^docs.joomla.org/j3.x:using_tags_in_an_extension]
<img src="https://vg08.met.vgwort.de/na/20bf6c7b62bb4ae7850abdcad3d6c386" width="1" height="1" alt="">
