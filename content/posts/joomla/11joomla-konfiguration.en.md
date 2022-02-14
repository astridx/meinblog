---
description: 'desc'
shortTitle: 'short'
date: 2021-02-10
title: 'Configuration'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-konfiguration
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

Are there things you plan to offer configurable? Then this part is important for you. Here I show you how to add a configuration to your component in the Joomla typical way. We create the global configuration for our component!<!-- \index{configuration (global)} -->

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t8...t9)[^github.com/astridx/boilerplate/compare/t8...t9] and copy these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ config.xml](https://github.com/astridx/boilerplate/compare/t8...t9#diff-e5092e959d796cdfa6ef6301d9b819ad13c851b4925d5fd20047e197e5139b39)

We add the `config.xml` file. This implements the configuration parameters. In this XML file you can use all [standard form field types](https://docs.joomla.org/Form_field)[^docs.joomla.org/form_field] as usual or implement your own types analogous to the already created modal field FieldFoo.

We use a selection field of type `type="list"`. We minimise the translation work by using the global language strings `JNO` and `JYES`. All texts that Joomla translates in the file [`language/en-GB/joomla.ini`](https://github.com/joomla/joomla-cms/blob/4.0-dev/language/en-GB/joomla.ini) can be used globally.

[administrator/components/com_foos/ config.xml](https://github.com/astridx/boilerplate/blob/52cb451c657729ff06d3cf35c6c8f9cabc86b809/src/administrator/components/com_foos/config.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t9/src/administrator/components/com_foos/config.xml -->

<?xml version="1.0" encoding="utf-8"?>
<config>
	<fieldset
		name="foo"
		label="COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DISPLAY"
		description="COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DESC"
		>
		<field
			name="show_foo_name_label"
			type="list"
			label="COM_FOOS_FIELD_FOO_SHOW_CATEGORY_LABEL"
			default="1"
			>
			<option value="0">JNO</option>
			<option value="1">JYES</option>
		</field>
	</fieldset>
</config>

```

### Modified files

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t8...t9#diff-1ff20be1dacde6c4c8e68e90161e0578)

The addition in the `foos.xml` file ensures that the `config.xml` file is copied during installation and Joomla can thus access it later.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/administrator/components/com_foos/foos.xml)

```xml {diff}
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
+			<filename>config.xml</filename>
 			<folder>forms</folder>
 			<folder>language</folder>
 			<folder>services</folder>

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-8e3d37bbd99544f976bf8fd323eb5250)

The line `$toolbar->preferences('com_foos');` ensures that the button `Options' is inserted at the top of the administration area. This way, the configuration is easily accessible later in the backend.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');

 		$toolbar->addNew('foo.add');
+
+		$toolbar->preferences('com_foos');
 	}

 }

```

<!-- prettier-ignore -->
#### [components/com\_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-599caddf64a6ed0c335bc9c9f828f029)

The `populateState` method ensures that the `State` object is populated and accessible to all code. We add the new parameter here for the site area.

`populateState()` is called automatically when we use `getState()` for the first time. If we need something special in the method, we override it in our own model - as in the following code example.

> You may wonder which `populateState()` method is called when nothing is implemented in our own extension. Quite simple: `FooModel` (`components/com_foos/src/Model/FooModel.php`) extends `BaseDatabaseModel` (`libraries/src/MVC/Model/BaseDatabaseModel.php`), which in turn extends `BaseModel` (`libraries/src/MVC/Model/BaseModel.php`). The latter implements `StateBehaviorTrait` (`libraries/src/MVC/Model/StateBehaviorTrait.php`) in which you find the method `protected function populateState() {}`. This method is empty and does nothing. But: It is callable. It is extremely helpful to follow up on such questions. This is how you get to know Joomla.

[components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/components/com_foos/src/Model/FooModel.php)

```php {diff}
 		return $this->_item[$pk];
 	}
+
+	protected function populateState()
+	{
+		$app = Factory::getApplication();
+
+		$this->setState('foo.id', $app->input->getInt('id'));
+		$this->setState('params', $app->getParams());
+	}
 }

```

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-a33732ebd6992540b8adca5615b51a1f)

Finally, we replace `echo Text::_('COM_FOOS_NAME') . $this->item->name;`. We only show the label if in the status the parameter is set to `true` or `1`.

[components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 use Joomla\CMS\Language\Text;

-echo Text::_('COM_FOOS_NAME') . $this->item->name;
+if ($this->get('State')->get('params')->get('show_foo_name_label'))
+{
+	echo Text::_('COM_FOOS_NAME');
+}
+
+echo $this->item->name;

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation. A new installation is not necessary. Continue using the files from the previous part.

2. open the view of your component in the administration area and make sure that you see the button `Options` in the upper right corner.

![Joomla Configuration - Button in Backend](/images/j4x11x1.png)

3. click on `Options` and adjust the display of the label according to your wishes.

![Joomla Configuration - Global configuration](/images/j4x11x2.png)

4. open as last, the view in the frontend. Does the display of the label behave as you have set it in the administration area?

![Joomla Configuration - Frontend](/images/j4x11x3.png)
<img src="https://vg08.met.vgwort.de/na/2acbdddd8c0c44a1be1ec497a6bcb26a" width="1" height="1" alt="">
