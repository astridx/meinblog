---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2022-08-02
title: 'Layout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-layout
langKey: em
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











Sometimes it is necessary to design the display differently in the frontend. This is basically the responsibility of the template. A component is responsible for the output of content, no more and no less. The template ensures a uniform appearance. Nevertheless, there are use cases for different layouts. How you incorporate them for a view is the topic of the following article.<!-- \index{layout} -->

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t19...t20)[^codeberg.org/astrid/j4examplecode/compare/t19...t20] and copy these changes into your development version.

## Step by step

We already use layouts. The empty state Layout (`administrator/components/com_foos/tmpl/foos/emptystate.php`)[^github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php] is an example. This part of the text is about looking at all the steps to integrate a layout as a whole.

### New files

<!-- prettier-ignore -->
#### components/com_foos/tmpl/foo/withhead.php

[components/com_foos/tmpl/foo/withhead.php](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/components/com_foos/tmpl/foo/withhead.php)

```php {numberLines: -2}
<?php
// https://codeberg.org/astrid/j4examplecode/raw/branch/t24/src/components/com_foos/tmpl/foo/withhead.php

\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

echo "<hr>Hier kannst du einen Headertext anzeigen.<hr>";

if ($this->item->params->get('show_name')) {
	if ($this->params->get('show_foo_name_label')) {
		echo Text::_('COM_FOOS_NAME') . $this->item->name;
	} else {
		echo $this->item->name;
	}
}

echo $this->item->event->afterDisplayTitle;
echo $this->item->event->beforeDisplayContent;
echo $this->item->event->afterDisplayContent;

```

<!-- prettier-ignore -->
#### components/com_foos/tmpl/foo/withhead.xml

[components/com_foos/tmpl/foo/withhead.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/components/com_foos/tmpl/foo/withhead.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t24/src/components/com_foos/tmpl/foo/withhead.xml -->

<?xml version="1.0" encoding="utf-8"?>
<metadata>
	<layout title="COM_FOOS_FOO_VIEW_WITHHEAD_TITLE">
		<message>
			<![CDATA[COM_FOOS_FOO_VIEW_WITHHEAD_DESC]]>
		</message>
	</layout>
	<!-- Add fields to the request variables for the layout. -->
	<fields name="request">
		<fieldset name="request"
			addfieldprefix="FooNamespace\Component\Foos\Administrator\Field"
		>
			<field
				name="id"
				type="modal_foo"
				label="COM_FOOS_SELECT_FOO_LABEL"
				required="true"
				select="true"
				new="true"
				edit="true"
				clear="true"
			/>
		</fieldset>
	</fields>
</metadata>

```

<!-- prettier-ignore -->
#### components/com_foos/tmpl/foo/withheadandfoot.php

[components/com_foos/tmpl/foo/withheadandfoot.php](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/components/com_foos/tmpl/foo/withheadandfoot.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t24/src/components/com_foos/tmpl/foo/withheadandfoot.php

<?php

\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

echo "<hr>Hier kannst du einen Headertext anzeigen.<hr>";

if ($this->item->params->get('show_name')) {
	if ($this->Params->get('show_foo_name_label')) {
		echo Text::_('COM_FOOS_NAME') . $this->item->name;
	} else {
		echo $this->item->name;
	}
}

echo "<hr>Hier kannst du eine Fußzeile anzeigen.<hr>";

echo $this->item->event->afterDisplayTitle;
echo $this->item->event->beforeDisplayContent;
echo $this->item->event->afterDisplayContent;

```

### Modified files

<!-- prettier-ignore -->
#### administrator/components/com_foos/forms/foo.xml

In the form of the element we add a field to select the layout.

[administrator/components/com_foos/forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/administrator/components/com_foos/forms/foo.xml)

```php {diff}
 				<option value="0">JHIDE</option>
 				<option value="1">JSHOW</option>
 			</field>
+
+			<field
+				name="foos_layout"
+				type="componentlayout"
+				label="JFIELD_ALT_LAYOUT_LABEL"
+				class="custom-select"
+				extension="com_foos"
+				view="foo"
+				useglobal="true"
+			/>
 		</fieldset>
 	</fields>
 </form>

```

<!-- prettier-ignore -->
#### components/com_foos/src/Model/FooModel.php

This is what happens during development. Basically we would not have to change the file `components/com_foos/src/Model/FooModel.php`. In this chapter I noticed that a `use` entry is missing. Therefore a change is made after all.

[components/com_foos/src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/compare/t19...t20#diff-0e3fb820d763e729d9d47b22936ce4bdba051e8494fe32f68ae7f7c939103cb8)

```php {diff}
 use Joomla\CMS\Factory;
 use Joomla\CMS\MVC\Model\BaseDatabaseModel;
+use Joomla\CMS\Language\Text;

 /**
  * Foo model for the Joomla Foos component.

```

<!-- prettier-ignore -->
#### components/com_foos/src/View/Foo/HtmlView.php

In the case of a menu item, I think it is important that it - or the content and design - is always displayed consistently. That is why we query the active menu item. If, for example, elements are displayed via a category view, then a uniform layout is possible with the help of this information. If the content is displayed as a single element, a different layout can be used.

[components/com_foos/src/View/Foo/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 		$temp->merge($itemparams);
 		$item->params = $temp;

+		$active = Factory::getApplication()->getMenu()->getActive();
+
+		// Override the layout only if this is not the active menu item
+		// If it is the active menu item, then the view and item id will match
+		if ((!$active) || ((strpos($active->link, 'view=foo') === false) || (strpos($active->link, '&id=' . (string) $this->item->id) === false)))
+		{
+			if (($layout = $item->params->get('foos_layout')))
+			{
+				$this->setLayout($layout);
+			}
+		}
+		elseif (isset($active->query['layout']))
+		{
+			// We need to set the layout in case this is an alternative menu item (with an alternative layout)
+			$this->setLayout($active->query['layout']);
+		}
+
 		Factory::getApplication()->triggerEvent('onContentPrepare', array ('com_foos.foo', &$item));

 		// Store the events for later

```

## Test your Joomla component

1. perform a new installation. To do this, uninstall your previous installation and copy all files again. In a freshly installed system the explanation of the layouts is more uncomplicated.

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

Install your component as described in part one, after copying all the files.

2. set a special layout for an item. I set `withhead` at the item with ID 2.

![Joomla Layouts](/images/j4x24x1.png)

3. look at the output in the frontend. Enter the URL `JOOMLA4/?option=com_foos&id=2&view=foo` in the address bar of your browser. You will see the selected layout. Make sure that typing `JOOMLA4/?option=com_foos&id=1&view=foo` calls the default layout - if no special one is set.

4. this layout is also controllable by menu item.

![Joomla Layouts](/images/j4x24x2.png)

> An item without XML file is not selectable in the administration area. Nevertheless such layouts are useful! In the program code it is possible to assign it at any place: `$this->setLayout('withheadandfoot');`

> Since the view is expected to be uniform when controlling via a menu item, the layout set in the menu item is preferred.

<img src="https://vg08.met.vgwort.de/na/5f04a8f589c84955b4b75e7d301ed944" width="1" height="1" alt="">
