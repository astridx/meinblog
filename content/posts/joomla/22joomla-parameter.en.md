---
date: 2020-12-22
title: 'Joomla 4.x Tutorial - Extension Development - Parameters'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-parameter
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Are there settings that apply to all items in your component that a user can customize to their needs? For example, do you display digital maps and do you want to allow the user to determine the display of the license for all maps? In Joomla there are parameters for this purpose.

Parameters exist for

- one item in particular,
- for the whole component (all items of the component) and
- for a menu item.

If a parameter is set for the three possibilities, the following hierarchy applies in Joomla by default:

- The menu item beats everything.
- After that, the parameter that applies specifically to the item takes precedence.
- The parameter that is set for the component has the lowest priority.

![Joomla Parameters](/images/parameter.png)

For the menu item we already had a parameter set and for the component as a whole there is one in the options. Now it's the turn of the item in particular.

## For the impatient

Look at the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t17...t18) and take over these changes into your development version.

## Step by step

### New files

#### [administrator/components/com_foos/ sql/updates/mysql/18.0.0.sql](https://github.com/astridx/boilerplate/compare/t17...t18#diff-61df23203c29920003ce39f96f2fb2f7)

In order to create the column in the database where the parameters are stored when the component is updated, we need the following SQL file.

[administrator/components/com_foos/ sql/updates/mysql/18.0.0.sql](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql)

```sql {numberLines: -2}
/* https://raw.githubusercontent.com/astridx/boilerplate/39598941015020537d51ccb6ca4098f019d76b04/src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql */

ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;
```

### Modified files

#### [administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t17...t18#diff-9be56d6cedb2c832265e47642f0afb25)

In the configuration, the parameter is usually stored to set a default value. We will add a field `show_name` to the configuration. Then we will create the possibility to override it for an element or a menu item.

[administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/config.xml)

```xml {diff}
 			<option value="0">JNO</option>
 			<option value="1">JYES</option>
 		</field>
+
+		<field
+			name="show_name"
+			type="radio"
+			label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
+			default="1"
+			class="switcher"
+			>
+			<option value="0">JHIDE</option>
+			<option value="1">JSHOW</option>
+		</field>
 	</fieldset>
 	<fieldset
 		name="permissions"

```

#### [administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t17...t18#diff-262e27353fbe755d3813ea2df19cd0ed)

In the form we use to edit an element, we add the `params` field. So `show_name` is also configurable for a single element.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
 			content_type="com_foos.foo"
 		/>
 	</fieldset>
+	<fields name="params" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
+		<fieldset name="display" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
+			<field
+				name="show_name"
+				type="list"
+				label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
+				useglobal="true"
+			>
+				<option value="0">JHIDE</option>
+				<option value="1">JSHOW</option>
+			</field>
+		</fieldset>
+	</fields>
 </form>

```

> In Joomla there is the possibility to set the parmeter to the value [global](https://docs.joomla.org/How_do_you_set_parameters_for_articles_and_other_content_items%3F). The benefit is that when you configure it, it shows what is set globally. Use `useglobal="true"` like [com_contact](https://github.com/joomla/joomla-cms/blob/8053386a7c9c1c1f1766748aae3c5161662aaf2d/administrator/components/com_contact/forms/contact.xml#L395).

#### [administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t17...t18#diff-896f245bc8e493f91277fd33913ef974)

In order for a new installation to create the column where the parameters are stored, we add a line to the following SQL file.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql {diff}
 ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);

 ALTER TABLE `#__foos_details` ADD COLUMN  `ordering` int(11) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;

```

#### [administrator/components/com_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t17...t18#diff-19bf55010e1963bede0668355cebb307)

In the class that managed the table, we make sure that the parameters are stored in the correct form.

[administrator/components/com_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/src/Table/FooTable.php)

```php {diff}
use Joomla\CMS\Application\ApplicationHelper;
use Joomla\CMS\Table\Table;
use Joomla\Database\DatabaseDriver;
+use Joomla\CMS\Language\Text;
+use Joomla\Registry\Registry;

/**
 * Foos Table class.
@@ -36,6 +38,26 @@ public function __construct(DatabaseDriver $db)
		parent::__construct('#__foos_details', 'id', $db);
	}

+	/**
+	 * Stores a foo.
+	 *
+	 * @param   boolean  $updateNulls  True to update fields even if they are null.
+	 *
+	 * @return  boolean  True on success, false on failure.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function store($updateNulls = false)
+	{
+		// Transform the params field
+		if (is_array($this->params)) {
+			$registry = new Registry($this->params);
+			$this->params = (string) $registry;
+		}
+
+		return parent::store($updateNulls);
+	}

	/**
	 * Generate a valid alias from title / date.
	 * Remains public to be able to check for duplicated alias before saving
```

#### [components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t17...t18#diff-c77adeff4ff9e321c996e0e12c54b656)

The view mixes the data to the parameters so that the display fits.

> In Joomla it is usual that the setting at the menu item overwrites everything. If there is no parameter here, the value that was saved for the element is used. Last but not least the value of the configuration is used. You query the active menu item via `$active = $app->getMenu()->getActive();`.

Sometimes it is more intuitive to use the display at the element as priority. This is what I implemented here. `$state->get('params')` returns the value stored at the menu item. `$item->params` is the parameter that was stored at the element. The code below shows how you mix the two so that the value at the item takes precedence.

[components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
 use Joomla\CMS\Factory;
+use Joomla\Registry\Registry;

 /**
  * HTML Foos View class for the Foo component
@@ -21,6 +22,22 @@
  */
 class HtmlView extends BaseHtmlView
 {
+	/**
+	 * The page parameters
+	 *
+	 * @var    \Joomla\Registry\Registry|null
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $params = null;
+
+	/**
+	 * The item model state
+	 *
+	 * @var    \Joomla\Registry\Registry
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $state;
+
 	/**
 	 * The item object details
 	 *
@@ -40,6 +57,23 @@ public function display($tpl = null)
 	{
 		$item = $this->item = $this->get('Item');

+		$state = $this->State = $this->get('State');
+		$params = $this->Params = $state->get('params');
+		$itemparams = new Registry(json_decode($item->params));
+
+		$temp = clone $params;
+
+		/**
+		 * $item->params are the foo params, $temp are the menu item params
+		 * Merge so that the menu item params take priority
+		 *
+		 * $itemparams->merge($temp);
+		 */
+
+		// Merge so that foo params take priority
+		$temp->merge($itemparams);
+		$item->params = $temp;
+
 		Factory::getApplication()->triggerEvent('onContentPrepare', array ('com_foos.foo', &$item));

 		// Store the events for later
```

> Ein [Pull Request](https://github.com/joomla/joomla-cms/pull/32538/files) als Inspiration.

#### [components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t17...t18#diff-a33732ebd6992540b8adca5615b51a1f)

At the end we use the parameter for display in the template. If there is the parameter and it is set to show the name, then the name will be shown. The label `$this->params->get('show_foo_name_label')` will also be displayed only then:

[components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 use Joomla\CMS\Language\Text;

-if ($this->get('State')->get('params')->get('show_foo_name_label'))
-{
-	echo Text::_('COM_FOOS_NAME');
-}
+if ($this->item->params->get('show_name')) {
+
+	if ($this->Params->get('show_foo_name_label')) {
+		echo Text::_('COM_FOOS_NAME');
+	}

-echo $this->item->name;
+	echo $this->item->name;
+}

 echo $this->item->event->afterDisplayTitle;
 echo $this->item->event->beforeDisplayContent;
```

#### [components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t17...t18#diff-35fa310ee8efa91ecb0e9f7c604d413f)

[https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/tmpl/foo/default.xml)

To make it possible to store the parameter at the menu item, we add a field in the XML file. It is important that it is placed under `fields` and is called `params` - at least for using the Joomla standard functions.!

```xml {diff}
 			/>
 		</fieldset>
 	</fields>
+	<!-- Add fields to the parameters object for the layout. -->
+	<fields name="params">
+		<fieldset name="basic" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
+			<field
+				name="show_name"
+				type="radio"
+				label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
+				default="1"
+				class=""
+				>
+				<option value="0">JHIDE</option>
+				<option value="1">JSHOW</option>
+			</field>
+		</fieldset>
+	</fields>
 </metadata>

```

> The form element `Input` with the type `radio` has a typical look in Joomla. It is called switcher and you create the look using the layout `joomla.form.field.radio.switcher`.
> ![Joomla Parameter in einem Menüpunkt](/images/j4x22x8.png)

```
<field
	name="show_name"
	type="radio"
	label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
	layout="joomla.form.field.radio.switcher"
	default="1"
	class=""
	>
	<option value="0">JHIDE</option>
	<option value="1">JSHOW</option>
</field>
```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

2. The database has been changed, so it is necessary to update it. Open the 'System | Information | Database' area as described in part 16. Select your component and click `Update Structure`.

![Joomla Published](/images/j4x16x1.png)

3. Open the view of your component in the administration area. When editing an item, there is now the `Display` tab and the `Show Name` parameter.

![Joomla Parameter in einem Element](/images/j4x22x1.png)

![Joomla Parameter in einem Element](/images/j4x22x2.png)

4. Open the global options of your component in the administration area. Here there is now the parameter `Show Name`.

![Joomla Parameter/Optionen in einer Komponente](/images/j4x22x3.png)

![Joomla Parameter/Optionen in einem Komponente](/images/j4x22x4.png)

5. Open the menu manager to create a menu item. To do this, click on `Menu` in the left sidebar and then on `All Menu Items`. Then click on the `New` button and fill in all necessary fields. You can find the appropriate `Menu Item Type` by clicking the `Select` button. Now there is the tab `Display` and the parameter `Show Name`.

![Joomla Parameter in einem Menüpunkt](/images/j4x22x5.png)

![Joomla Parameter in einem Menüpunkt](/images/j4x22x6.png)

![Joomla Parameter in einem Menüpunkt](/images/j4x22x7.png)

6. Set the `Show Name` parameter in different combinations and make sure that the display in the frontend is correct.

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t17...t18.diff

## Links
