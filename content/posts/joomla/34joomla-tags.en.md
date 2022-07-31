---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-01-17
title: 'Tags'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-tags
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

Tags or Keywords are a flexible solution to organise content in Joomla A keyword can be assigned to many different elements of different content types. Each element can have unlimited tags.

Joomla's tagging system is used in all core extensions. It is designed to be easily integrated into other extensions that use standard Joomla design patterns. Using tags in a third-party extension is quite simple. Using it in your own extension requires the modifications explained in this section.<!-- \index{tags} -->

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t28...t29)[^codeberg.org/astrid/j4examplecode/compare/t28...t29] and copy these changes into your development version.

## Step by step

### New files

No new files.

### Modified files

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ forms/filter_foos.xml

The form through which the search tools are managed receives an entry for the keywords.

[administrator/components/com_foos/ forms/filter_foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/forms/filter_foos.xml)

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

In the XML form, we add the form field that contains the information about the tag. Since we use Joomla Standard, we can use many ready-made functions out-of-the-box.

[administrator/components/com_foos/ forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/forms/foo.xml)

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

In the installation script, we make sure that our extension is recognised as a separate content type in Joomla.

[administrator/components/com_foos/ script.php](https://codeberg.org/astrid/j4examplecode/src/branch/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/script.php)

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

In the model of the element, we insert the tags into the batch processing batch and ensure that the associated tags are loaded.

[administrator/components/com_foos/ src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/Model/FooModel.php)

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

We change the model of the overview list of our extension in the backend regarding the filters and the database query.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/Model/FoosModel.php)

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

In the view, we ensure that the keywords matching the language are loaded.

[administrator/components/com_foos/ src/View/Foo/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/80d1b3b77d0bbcf9d401ec7a992ea2a08761d408/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

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

So that the batch processing can also be used for the tags, we insert a form field. With the help of this field it is possible to select a keyword that will be assigned to all selected items.

[administrator/components/com_foos/ tmpl/foos/default_batch_body.php](https://codeberg.org/astrid/j4examplecode/src/branch/t29/src/administrator/components/com_foos/tmpl/foos/default_batch_body.php)

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

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.

2. install your component as described in part one, after copying all files. As we have changed things in the installation script, this is necessary.

3. create a tag using the keyword component.

![Create a tag in Joomla 4](/images/j4x34x1.png)

4. set the just created keyword at a Foo element.

![A keyword in a custom Joomla 4 extension](/images/j4x34x2.png)

5. convince yourself that filtering by keywords works.

![A keyword filtering in the list view of a Joomla 4 extension](/images/j4x34x3.png)

6. create a menu item that shows all elements that are assigned to a certain keyword and see the display in the frontend.

![A keyword in a custom Joomla 4 extension via menu item](/images/j4x34x4.png)

![A keyword in a custom Joomla 4 extension in a frontend view](/images/j4x34x5.png)

If you have tagged a Foo element and are now surprised that it is not displayed, first check whether the Foo element is published. Only published elements are displayed in the frontend.

7. Create a new tag and assign it to several Foo items by batch processing.

![Assign a keyword in a custom Joomla 4 extension by batch processing - open batch processing](/images/j4x34x7.png)

![Assign a keyword in a custom Joomla 4 extension by batch processing - submit form](/images/j4x34x6.png)

8. think about how and where you show the keywords in the frontend of your own extension. com_contact' provides a parameter that allows the website owner to set whether tags are displayed. The display is done with the help of the layout `joomla.content.tags`.

```php
<?php if ($tparams->get('show_tags', 1) && !empty($this->item->tags->itemTags)) : ?>
	<div class="com-contact__tags">
		<?php $this->item->tagLayout = new FileLayout('joomla.content.tags'); ?>
		<?php echo $this->item->tagLayout->render($this->item->tags->itemTags); ?>
	</div>
<?php endif; ?>
```

> You want to tag Joomla elements in order to build a keyword directory. You make the assignment by opening the element (article, category ...) and entering the keywords on the right. Do you have any problems? Are not all keywords saved. Do you also notice that not all keywords are displayed in the selection menu of other components? The reason is that the display of the keywords is limited to 30. I have searched for documentation. I have not found anything. Maybe it's because I'm not searching properly. I sometimes find it easier to look directly in the code: The place that answers the question is in the file [libraries/src/Form/Field/TagField.php](https://github.com/joomla/joomla-cms/blob/ba5fc69400c2fb2a27e56d0b8bec0db10c8705df/libraries/src/Form/Field/TagField.php#L136)[^github.com/joomla/joomla-cms/blob/ba5fc69400c2fb2a27e56d0b8bec0db10c8705df/libraries/src/form/field/tagfield.php#l136]. The PR, where you can also read out the reasons for the introduction, is [PR 31481](https://github.com/joomla/joomla-cms/pull/31481)[^github.com/joomla/joomla-cms/pull/31481]. The workaround is to change the display mode in the Tags component.<!-- \index{tags!limit} -->

## Links

[Using Tags in a Extension](https://docs.joomla.org/J3.x:Using_Tags_in_an_Extension)[^docs.joomla.org/j3.x:using_tags_in_an_extension]
<img src="https://vg08.met.vgwort.de/na/4925cd18616c4bd0b5482098f135e4d6" width="1" height="1" alt="">
