---
date: 2020-12-17
title: 'Joomla 4.x Tutorial - Extension Development - Integrate Custom Fields in Backend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-custom-fields-im-backend-integrieren
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Custom fields in Joomla have been the talk of the town since Joomla version 3.7. They offer a lot of additional possibilities independently from third party providers. That's why our component supports custom fields.

This part shows you how to program the support in the administration area. In the next chapter we will integrate Custom Fields in the frontend.

![Integrate Joomla Custom Fields into a custom component](/images/j4x17x1.png)

> I create a separate submenu here for the custom fields. The Joomla custom components create a menu item in the administration menu. If you prefer this way, look in one of the core components.

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t13...t14a) and incorporate these changes into your development version.

## Step by step

### New files

#### [administrator/components/com_foos/ src/Helper/FooHelper.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-e2ec43fec6e2c22254228beb71e9c787)

In a help file we create a sidebar - a separate submenu - for the custom fields.

[administrator/components/com_foos/ src/Helper/FooHelper.php](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/src/Helper/FooHelper.php)

```php {numberLines: -3}
// https://raw.githubusercontent.com/astridx/boilerplate/02dd34246bf4a070fcc7b2d7b1dfe5015d0d6c54/src/administrator/components/com_foos/src/Helper/FooHelper.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Helper\ContentHelper;
use Joomla\CMS\Language\Text;

/**
 * Foo component helper.
 *
 * @since  __BUMP_VERSION__
 */
class FooHelper extends ContentHelper
{
	/**
	 * Configure the Linkbar.
	 *
	 * @param   string  $vName  The name of the active view.
	 *
	 * @return  void
	 *
	 * @since   __BUMP_VERSION__
	 */
	public static function addSubmenu($vName)
	{
		if (ComponentHelper::isEnabled('com_fields') && ComponentHelper::getParams('com_foos')->get('custom_fields_enable', '1'))
		{
			\JHtmlSidebar::addEntry(
				Text::_('JGLOBAL_FIELDS'),
				'index.php?option=com_fields&context=com_foos.foo',
				$vName == 'fields.fields'
			);
			\JHtmlSidebar::addEntry(
				Text::_('JGLOBAL_FIELD_GROUPS'),
				'index.php?option=com_fields&view=groups&context=com_foos.foo',
				$vName == 'fields.groups'
			);
		}
	}
}

```

### Modified files

#### [administrator/components/com_foos/ access.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-e5dfd09c647ca1e552c9016cf918acf3)

The user-defined fields are also assigned permissions. So it is possible that changing or viewing a field is allowed only for certain users. For this we add everything necessary in the `access.xml` file.

[administrator/components/com_foos/ access.xml](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/access.xml)

```xml {diff}
 		<action name="core.edit.state" title="JACTION_EDITSTATE" />
 		<action name="core.edit.own" title="JACTION_EDITOWN" />
 	</section>
+	<section name="fieldgroup">
+		<action name="core.create" title="JACTION_CREATE" />
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.own" title="JACTION_EDITOWN" />
+		<action name="core.edit.value" title="JACTION_EDITVALUE" />
+	</section>
+	<section name="field">
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.value" title="JACTION_EDITVALUE" />
+	</section>
 </access>

```

#### [administrator/components/com_foos/ config.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-9be56d6cedb2c832265e47642f0afb25)

The configuration `config.xml` uses a paramer to specify whether the extension uses custom fields.

> Do you wonder why this parameter exists? It is [not mandatory](https://joomla.stackexchange.com/questions/28672/reason-for-parameter-for-using-custom-fields-in-configuration/28680#28680).

[administrator/components/com_foos/ config.xml](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/config.xml)

```php {diff}
 			<option value="0">JNO</option>
 			<option value="1">JYES</option>
 		</field>
+
+		<field
+			name="custom_fields_enable"
+			type="radio"
+			class="switcher"
+			label="JGLOBAL_CUSTOM_FIELDS_ENABLE_LABEL"
+			default="1"
+			>
+			<option value="0">JNO</option>
+			<option value="1">JYES</option>
+		</field>
 	</fieldset>
 	<fieldset
 		name="permissions"

```

#### [administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-8e3d37bbd99544f976bf8fd323eb5250)

In the `View` we prepare everything necessary for displaying the submenu.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}

 \defined('_JEXEC') or die;

+use Joomla\CMS\HTML\HTMLHelper;
 use Joomla\CMS\Helper\ContentHelper;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
 use Joomla\CMS\Toolbar\Toolbar;
 use Joomla\CMS\Toolbar\ToolbarHelper;
+use FooNamespace\Component\Foos\Administrator\Helper\FooHelper;

 /**
  * View class for a list of foos.
@@ -31,6 +33,13 @@ class HtmlView extends BaseHtmlView
 	 */
 	protected $items;

+	/**
+	 * The sidebar markup
+	 *
+	 * @var  string
+	 */
+	protected $sidebar;
+
 	/**
 	 * Method to display the view.
 	 *
@@ -58,6 +67,9 @@ public function display($tpl = null): void
 	 */
 	protected function addToolbar()
 	{
+		FooHelper::addSubmenu('foos');
+		$this->sidebar = \JHtmlSidebar::render();
+
 		$canDo = ContentHelper::getActions('com_foos');

 		// Get the toolbar object instance
@@ -74,5 +86,7 @@ protected function addToolbar()
 		{
 			$toolbar->preferences('com_foos');
 		}
+
+		HTMLHelper::_('sidebar.setAction', 'index.php?option=com_foos');
 	}
 }

```

#### [administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-1637778e5f7d1d56dd1751af1970f01b)

To make editing the custom fields work the same way as in Joomla's own extensions, we use [UiTab](https://github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/HTML/Helpers/UiTab.php). `$this->useCoreUI = true;` ensures that the [Helper](https://github.com/joomla/joomla-cms/blob/c6332d48dab0fce0d4903f206dc979e2c2c59a12/layouts/joomla/edit/params.php#L20) flexibly provides the correct tab implementation.

> A comparison between previously most used `bootstrap.tab` and `uitab` is provided by [Pull Request PR 21805](https://github.com/joomla/joomla-cms/pull/21805).

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/02dd34246bf4a070fcc7b2d7b1dfe5015d0d6c54/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 use Joomla\CMS\Factory;
 use Joomla\CMS\HTML\HTMLHelper;
 use Joomla\CMS\Router\Route;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Layout\LayoutHelper;

 $app = Factory::getApplication();
 $input = $app->input;

+$this->useCoreUI = true;
+
 $wa = $this->document->getWebAssetManager();
 $wa->useScript('keepalive')
 	->useScript('form.validate')
@@ -26,13 +30,31 @@
 ?>

 <form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
-	<?php echo $this->getForm()->renderField('name'); ?>
-	<?php echo $this->getForm()->renderField('alias'); ?>
-	<?php echo $this->getForm()->renderField('access'); ?>
-	<?php echo $this->getForm()->renderField('catid'); ?>
-	<?php echo $this->getForm()->renderField('published'); ?>
-	<?php echo $this->getForm()->renderField('publish_up'); ?>
-	<?php echo $this->getForm()->renderField('publish_down'); ?>
+	<div>
+		<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab', array('active' => 'details')); ?>
+
+		<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'details', empty($this->item->id) ? Text::_('COM_FOOS_NEW_FOO') : Text::_('COM_FOOS_EDIT_FOO')); ?>
+		<div class="row">
+			<div class="col-md-9">
+				<div class="row">
+					<div class="col-md-6">
+						<?php echo $this->getForm()->renderField('name'); ?>
+						<?php echo $this->getForm()->renderField('alias'); ?>
+						<?php echo $this->getForm()->renderField('access'); ?>
+						<?php echo $this->getForm()->renderField('published'); ?>
+						<?php echo $this->getForm()->renderField('publish_up'); ?>
+						<?php echo $this->getForm()->renderField('publish_down'); ?>
+						<?php echo $this->getForm()->renderField('catid'); ?>
+					</div>
+				</div>
+			</div>
+		</div>
+		<?php echo HTMLHelper::_('uitab.endTab'); ?>
+
+		<?php echo LayoutHelper::render('joomla.edit.params', $this); ?>
+
+		<?php echo HTMLHelper::_('uitab.endTabSet'); ?>
+	</div>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>

```

#### [administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-3186af99ea4e3321b497b86fcd1cd757)

In the overview of the component in the administration area we create space for the `sidebar`. To be precise: We insert it with the CSS class `col-md-2` if it is necessary. We then reduce the size of the main area by setting the class `col-md-10`. Without `sidebar` the main area uses the class `col-md-12` and thus the full area.

> The classes `col-md-2`, `col-md-10` and `col-md-12` don't mean anything to you? These are Boostrap classes. Joomla 4 uses the framework [Boostrap 5](https://getbootstrap.com/docs/5.0/layout/grid/) by default.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/02dd34246bf4a070fcc7b2d7b1dfe5015d0d6c54/src/administrator/components/com_foos/tmpl/foos/default.php)

```php  {diff}

 ?>
 <form action="<?php echo Route::_('index.php?option=com_foos'); ?>" method="post" name="adminForm" id="adminForm">
 	<div class="row">
-        <div class="col-md-12">
+		<?php if (!empty($this->sidebar)) : ?>
+			<div id="j-sidebar-container" class="col-md-2">
+				<?php echo $this->sidebar; ?>
+			</div>
+		<?php endif; ?>
+		<div class="<?php if (!empty($this->sidebar)) {echo 'col-md-10'; } else { echo 'col-md-12'; } ?>">
 			<div id="j-main-container" class="j-main-container">
 				<?php if (empty($this->items)) : ?>
 					<div class="alert alert-warning">

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from the previous part.

2. open the view of your component in the administration area. You will see another sidebar. Click on the menu item 'Fields' in this new menu.

![Integrate Joomla Custom Fields into a custom component](/images/j4x17x1.png)

3. after that create a custom field of type 'text'.

4. make sure that when you edit a foo item, this field is also offered for editing.

![Integrate Joomla Custom Fields into a custom component](/images/j4x17x2.png)

5. make sure that the custom fields can be turned on and off in the global configuration.

![Integrate Joomla Custom Fields into a custom component](/images/j4x17x3.png)

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t13...t14a.diff

## Links
