---
date: 2020-12-24
title: 'Joomla 4.x Tutorial - Extension Development - Layout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-layout
langKey: em
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Sometimes it is necessary to design the display differently in the frontend. This is basically the responsibility of the template. A component is responsible for the output of content, no more and no less. The template ensures a uniform appearance. Nevertheless, there are use cases for different layouts. How you incorporate them for a view is the topic of the following article.<!-- \index{layout} -->

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t19...t20)[^github.com/astridx/boilerplate/compare/t19...t20] and incorporate these changes into your development version.

## Step by step

We already use layouts. The Empty State Layout (`administrator/components/com_foos/tmpl/foos/emptystate.php`)[https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php] is an example. This part of the text is about looking at all the steps to integrate a layout as a whole.

### New files

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/withhead.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-cf093e47c9ffd0b7b3b78ec39042ac8f)

[components/com_foos/ tmpl/foo/withhead.php](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/tmpl/foo/withhead.php)

```php {numberLines: -2}
<?php
// https://raw.githubusercontent.com/astridx/boilerplate/t24/src/components/com_foos/tmpl/foo/withhead.php

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

echo $this->item->event->afterDisplayTitle;
echo $this->item->event->beforeDisplayContent;
echo $this->item->event->afterDisplayContent;

```

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/withhead.xml](https://github.com/astridx/boilerplate/compare/t19...t20#diff-7176b16bc7f23a2478b1d0755d568b83)

[components/com_foos/ tmpl/foo/withhead.xml](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/tmpl/foo/withhead.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t24/src/components/com_foos/tmpl/foo/withhead.xml -->

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
#### [components/com\_foos/ tmpl/foo/withheadandfoot.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-51b2e02f000a9a06e0fc5a6cfd9456c9)

[components/com_foos/ tmpl/foo/withheadandfoot.php](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/tmpl/foo/withheadandfoot.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t24/src/components/com_foos/tmpl/foo/withheadandfoot.php

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
#### [administrator/components/com\_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t19...t20#diff-262e27353fbe755d3813ea2df19cd0ed)

In the form of the element we add a field to select the layout.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/administrator/components/com_foos/forms/foo.xml)

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
#### [components/com\_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/85d92ab0e9f18bfb01341ffec184818b0a2f5545/src/components/com_foos/src/Model/FooModel.php)

This is what happens during development. Basically we would not have to change the file `components/com_foos/src/Model/FooModel.php`. In this chapter I noticed that a `use` entry is missing. Therefore a change is made after all.

[components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-0e3fb820d763e729d9d47b22936ce4bdba051e8494fe32f68ae7f7c939103cb8)

```php {diff}
 use Joomla\CMS\Factory;
 use Joomla\CMS\MVC\Model\BaseDatabaseModel;
+use Joomla\CMS\Language\Text;

 /**
  * Foo model for the Joomla Foos component.

```

<!-- prettier-ignore -->
#### [components/com\_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-c77adeff4ff9e321c996e0e12c54b656)

In the case of a menu item, I find it important that it - or the content - is always displayed consistently. Therefore we query the active menu item. For example, if elements are displayed via a category view, then a uniform layout is possible. If the content is displayed as a single element, a different layout can be used.

[components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/src/View/Foo/HtmlView.php)

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
