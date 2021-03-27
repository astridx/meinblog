---
date: 2020-12-09
title: 'Joomla 4.x Tutorial - Extension Development - Using the Database Data in the Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/die-daten-der-datenbank-im-frontend-nutzen
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

We have a database where the data about the component is stored. The next step is to display the dynamic content in the frontend. In this part, I'll show you how to output the content for an element via menu item. For this we will create our own form field.

![Joomla Componente Menüpunkt für das Frontend](/images/j4x9x1.png)

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t6b...t7) and incorporate these changes into your development version.

## Step by step

### New files

#### [administrator/components/com_foos/ src/Field/Modal/FooField.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-aa20a48089379605365184314b6cc950)

First, we create the form field through which it is possible to select or deselect a Foo element.

> It is possible to extend the field so that a Foo element is created via a button. I have left this out here for the sake of simplicity. Sample code is provided by the component `com_contact` in the file `administrator/components/com_contact/ src/Field/Modal/ContactField.php`.

[administrator/components/com_foos/ src/Field/Modal/FooField.php](https://github.com/astridx/boilerplate/blob/3bfbb76025d6b8d548e4411275ec2f6fad507628/src/administrator/components/com_foos/src/Field/Modal/FooField.php)

```php  {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/3bfbb76025d6b8d548e4411275ec2f6fad507628/src/administrator/components/com_foos/src/Field/Modal/FooField.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Field\Modal;

\defined('JPATH_BASE') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\FormField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Session\Session;

/**
 * Supports a modal foo picker.
 *
 * @since  __DEPLOY_VERSION__
 */
class FooField extends FormField
{
	/**
	 * The form field type.
	 *
	 * @var     string
	 * @since   __DEPLOY_VERSION__
	 */
	protected $type = 'Modal_Foo';

	/**
	 * Method to get the field input markup.
	 *
	 * @return  string  The field input markup.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function getInput()
	{
		$allowClear  = ((string) $this->element['clear'] != 'false');
		$allowSelect = ((string) $this->element['select'] != 'false');

		// The active foo id field.
		$value = (int) $this->value > 0 ? (int) $this->value : '';

		// Create the modal id.
		$modalId = 'Foo_' . $this->id;

		// Add the modal field script to the document head.
		HTMLHelper::_(
			'script',
			'system/fields/modal-fields.min.js',
			['version' => 'auto', 'relative' => true]
		);

		// Script to proxy the select modal function to the modal-fields.js file.
		if ($allowSelect) {
			static $scriptSelect = null;

			if (is_null($scriptSelect)) {
				$scriptSelect = [];
			}

			if (!isset($scriptSelect[$this->id])) {
				Factory::getDocument()->addScriptDeclaration("
				function jSelectFoo_"
					. $this->id
					. "(id, title, object) { window.processModalSelect('Foo', '"
					. $this->id . "', id, title, '', object);}");

				$scriptSelect[$this->id] = true;
			}
		}

		// Setup variables for display.
		$linkFoos = 'index.php?option=com_foos&amp;view=foos&amp;layout=modal&amp;tmpl=component&amp;'
			. Session::getFormToken() . '=1';
		$linkFoo  = 'index.php?option=com_foos&amp;view=foo&amp;layout=modal&amp;tmpl=component&amp;'
			. Session::getFormToken() . '=1';
		$modalTitle   = Text::_('COM_FOOS_CHANGE_FOO');

		$urlSelect = $linkFoos . '&amp;function=jSelectFoo_' . $this->id;

		if ($value) {
			$db    = Factory::getDbo();
			$query = $db->getQuery(true)
				->select($db->quoteName('name'))
				->from($db->quoteName('#__foos_details'))
				->where($db->quoteName('id') . ' = ' . (int) $value);
			$db->setQuery($query);

			try {
				$title = $db->loadResult();
			} catch (\RuntimeException $e) {
				Factory::getApplication()->enqueueMessage($e->getMessage(), 'error');
			}
		}

		$title = empty($title) ? Text::_('COM_FOOS_SELECT_A_FOO') : htmlspecialchars($title, ENT_QUOTES, 'UTF-8');

		// The current foo display field.
		$html  = '';

		if ($allowSelect || $allowNew || $allowEdit || $allowClear) {
			$html .= '<span class="input-group">';
		}

		$html .= '<input class="form-control" id="' . $this->id . '_name" type="text" value="' . $title . '" readonly size="35">';

		// Select foo button
		if ($allowSelect) {
			$html .= '<button'
				. ' class="btn btn-primary hasTooltip' . ($value ? ' hidden' : '') . '"'
				. ' id="' . $this->id . '_select"'
				. ' data-bs-toggle="modal"'
				. ' type="button"'
				. ' data-bs-target="#ModalSelect' . $modalId . '"'
				. ' title="' . HTMLHelper::tooltipText('COM_FOOS_CHANGE_FOO') . '">'
				. '<span class="icon-file" aria-hidden="true"></span> ' . Text::_('JSELECT')
				. '</button>';
		}

		// Clear foo button
		if ($allowClear) {
			$html .= '<button'
				. ' class="btn btn-secondary' . ($value ? '' : ' hidden') . '"'
				. ' id="' . $this->id . '_clear"'
				. ' type="button"'
				. ' onclick="window.processModalParent(\'' . $this->id . '\'); return false;">'
				. '<span class="icon-remove" aria-hidden="true"></span>' . Text::_('JCLEAR')
				. '</button>';
		}

		if ($allowSelect || $allowNew || $allowEdit || $allowClear) {
			$html .= '</span>';
		}

		// Select foo modal
		if ($allowSelect) {
			$html .= HTMLHelper::_(
				'bootstrap.renderModal',
				'ModalSelect' . $modalId,
				[
					'title'       => $modalTitle,
					'url'         => $urlSelect,
					'height'      => '400px',
					'width'       => '800px',
					'bodyHeight'  => 70,
					'modalWidth'  => 80,
					'footer'      => '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">'
										. Text::_('JLIB_HTML_BEHAVIOR_CLOSE') . '</button>',
				]
			);
		}

		// Note: class='required' for client side validation.
		$class = $this->required ? ' class="required modal-value"' : '';

		$html .= '<input type="hidden" id="'
			. $this->id . '_id"'
			. $class . ' data-required="' . (int) $this->required
			. '" name="' . $this->name
			. '" data-text="'
			. htmlspecialchars(Text::_('COM_FOOS_SELECT_A_FOO', true), ENT_COMPAT, 'UTF-8')
			. '" value="' . $value . '">';

		return $html;
	}

	/**
	 * Method to get the field label markup.
	 *
	 * @return  string  The field label markup.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function getLabel()
	{
		return str_replace($this->id, $this->id . '_name', parent::getLabel());
	}
}

```

> The program code for the form field is adapted to [Bootstrap 5](https://github.com/joomla/joomla-cms/pull/32037).

#### [administrator/components/com_foos/ tmpl/foos/modal.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-aeba8d42de72372f42f890d454bf928e)

We open the selection in a modal window. The following code shows you the template for this.

> A [Modal](https://en.wikipedia.org/wiki/Dialog_box) is an area that opens in the foreground of a web page and changes its state. It is required to actively close it. Modal dialogs lock the rest of the application as long as the dialog is displayed. A modal is also called a dialog or lightbox.

[administrator/components/com_foos/ tmpl/foos/modal.php](https://github.com/astridx/boilerplate/blob/ae04129fb1b65a0939d9f968c3658843ddc7292d/src/administrator/components/com_foos/tmpl/foos/modal.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/c9bb75e8bf376b012c2ee7b44745901a3f61390a/src/administrator/components/com_foos/tmpl/foos/modal.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Session\Session;

$app = Factory::getApplication();

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_foos.admin-foos-modal');

$function  = $app->input->getCmd('function', 'jSelectFoos');
$onclick   = $this->escape($function);
?>
<div class="container-popup">

	<form action="<?php echo Route::_('index.php?option=com_foos&view=foos&layout=modal&tmpl=component&function=' . $function . '&' . Session::getFormToken() . '=1'); ?>" method="post" name="adminForm" id="adminForm" class="form-inline">

		<?php if (empty($this->items)) : ?>
			<div class="alert alert-warning">
				<?php echo Text::_('JGLOBAL_NO_MATCHING_RESULTS'); ?>
			</div>
		<?php else : ?>
			<table class="table table-sm">
				<thead>
					<tr>
						<th scope="col" style="width:10%" class="d-none d-md-table-cell">
						</th>
						<th scope="col" style="width:1%">
						</th>
					</tr>
				</thead>
				<tbody>
				<?php
				$iconStates = array(
					-2 => 'icon-trash',
					0  => 'icon-unpublish',
					1  => 'icon-publish',
					2  => 'icon-archive',
				);
				?>
				<?php foreach ($this->items as $i => $item) : ?>
					<?php $lang = ''; ?>
					<tr class="row<?php echo $i % 2; ?>">
						<th scope="row">
							<a class="select-link" href="javascript:void(0)" data-function="<?php echo $this->escape($onclick); ?>" data-id="<?php echo $item->id; ?>" data-title="<?php echo $this->escape($item->name); ?>">
								<?php echo $this->escape($item->name); ?>
							</a>
						</th>
						<td>
							<?php echo (int) $item->id; ?>
						</td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>

		<?php endif; ?>

		<input type="hidden" name="task" value="">
		<input type="hidden" name="forcedLanguage" value="<?php echo $app->input->get('forcedLanguage', '', 'CMD'); ?>">
		<?php echo HTMLHelper::_('form.token'); ?>

	</form>
</div>

```

#### [media/com_foos/joomla.asset.json](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-a0586cff274e553e62750bbea954e91d)

We use the [Webassetmanager](https://docs.joomla.org/J4.x:Web_Assets) again. This time we add our own webasset. If you don't include it correctly, you will get the following error when you select a foo item for the menu item: `There is no "com_foos.admin-foos-modal" asset of a "script" type in the registry.`.

[media/com_foos/joomla.asset.json](https://github.com/astridx/boilerplate/blob/d628be528023c0b5ff1dba70ef9a07c722bb2cb9/src/media/com_foos/joomla.asset.json)

```js {numberLines: -2}
/* https://raw.githubusercontent.com/astridx/boilerplate/c9bb75e8bf376b012c2ee7b44745901a3f61390a/src/media/com_foos/joomla.asset.json */

{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "com_foos",
  "version": "1.0.0",
  "description": "Joomla CMS",
  "license": "GPL-2.0-or-later",
  "assets": [
    {
      "name": "com_foos.admin-foos-modal",
      "type": "script",
      "uri": "com_foos/admin-foos-modal.js",
      "dependencies": ["core"],
      "attributes": {
        "defer": true
      }
    }
  ]
}
```

#### [media/com_foos/js/admin-foos-modal.js](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-4edb4212d7ab2a7cb25312a4799b1c95)

The following is the JavaScript code that causes a foo element to be selectable when a menu item is created. We will assign the class `select-link` to the corresponding button in the field later.

[media/com_foos/js/admin-foos-modal.js](https://github.com/astridx/boilerplate/blob/ae04129fb1b65a0939d9f968c3658843ddc7292d/src/media/com_foos/js/admin-foos-modal.js)

```js  {numberLines: -2}
/* https://raw.githubusercontent.com/astridx/boilerplate/c9bb75e8bf376b012c2ee7b44745901a3f61390a/src/media/com_foos/js/admin-foos-modal.js */

;(function () {
  'use strict'

  document.addEventListener('DOMContentLoaded', function () {
    var elements = document.querySelectorAll('.select-link')

    for (var i = 0, l = elements.length; l > i; i += 1) {
      elements[i].addEventListener('click', function (event) {
        event.preventDefault()
        var functionName = event.target.getAttribute('data-function')

        window.parent[functionName](
          event.target.getAttribute('data-id'),
          event.target.getAttribute('data-title'),
          null,
          null,
          event.target.getAttribute('data-uri'),
          event.target.getAttribute('data-language'),
          null
        )

        if (window.parent.Joomla.Modal) {
          window.parent.Joomla.Modal.getCurrent().close()
        }
      })
    }
  })
})()
```

### Modified files

#### [administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-1ff20be1dacde6c4c8e68e90161e0578)

We have created a new JavaScript file. We place it in the `media\js` directory. So that it is copied when the component is installed, we add the `js` folder in the section `media` of the installation manifest.

> Read in the preface why you choose the `media` directory ideally for assets like JavaScript files or stylesheets.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/ae04129fb1b65a0939d9f968c3658843ddc7292d/src/administrator/components/com_foos/foos.xml)

```php {diff}
 		<folder>src</folder>
 		<folder>tmpl</folder>
 	</files>
+    <media folder="media/com_foos" destination="com_foos">
+		<folder>js</folder>
+    </media>
 	<!-- Back-end files -->
 	<administration>
 		<!-- Menu entries -->

```

#### [components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-599caddf64a6ed0c335bc9c9f828f029)

We no longer output static text. An item from the database is displayed. Therefore we rename the `getMsg` method to `getItem`. We adjust the variable names and create a database query.

[components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/ae04129fb1b65a0939d9f968c3658843ddc7292d/src/components/com_foos/src/Model/FooModel.php)

```php {diff}
 class FooModel extends BaseDatabaseModel
 {
 	/**
-	 * @var string message
+	 * @var string item
 	 */
-	protected $message;
+	protected $_item = null;

 	/**
-	 * Get the message
+	 * Gets a foo
 	 *
-	 * @return  string  The message to be displayed to the user
+	 * @param   integer  $pk  Id for the foo
+	 *
+	 * @return  mixed Object or null
+	 *
+	 * @since   __BUMP_VERSION__
 	 */
-	public function getMsg()
+	public function getItem($pk = null)
 	{
 		$app = Factory::getApplication();
-		$this->message = $app->input->get('show_text', "Hi");
+		$pk = $app->input->getInt('id');
+
+		if ($this->_item === null)
+		{
+			$this->_item = array();
+		}
+
+		if (!isset($this->_item[$pk]))
+		{
+			try
+			{
+				$db = $this->getDbo();
+				$query = $db->getQuery(true);
+
+				$query->select('*')
+					->from($db->quoteName('#__foos_details', 'a'))
+					->where('a.id = ' . (int) $pk);
+
+				$db->setQuery($query);
+				$data = $db->loadObject();
+
+				if (empty($data))
+				{
+					throw new \Exception(Text::_('COM_FOOS_ERROR_FOO_NOT_FOUND'), 404);
+				}
+
+				$this->_item[$pk] = $data;
+			}
+			catch (\Exception $e)
+			{
+				$this->setError($e);
+				$this->_item[$pk] = false;
+			}
+		}

-		return $this->message;
+		return $this->_item[$pk];
 	}
 }

```

> Joomla supports you in creating the database queries. If you use the [available statements](https://docs.joomla.org/Accessing_the_database_using_JDatabase), Joomla will take care of security or different syntax in PostgreSQL and MySQL.

#### [components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-c77adeff4ff9e321c996e0e12c54b656)

In the view we consequently replace `$this->msg = $this->get('Msg');` with `$this->item = $this->get('Item');`.

[components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/ae04129fb1b65a0939d9f968c3658843ddc7292d/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 class HtmlView extends BaseHtmlView
 {
+	/**
+	 * The item object details
+	 *
+	 * @var    \JObject
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $item;
+
 	/**
 	 * Execute and display a template script.
 	 *

 	 */
 	public function display($tpl = null)
 	{
-		$this->msg = $this->get('Msg');
+		$this->item = $this->get('Item');

 		return parent::display($tpl);
 	}

```

#### [components/com_foos/ tmpl/foo/default.php](hhttps://github.com/astridx/boilerplate/compare/t6b...t7#diff-11c9422cefaceff18372b720bf0e2f8fb05cda454054cd3bc38faf6a39e4f7d6)

We will customize the display of the name in the template. Here we access the `item` element and its `name` property. In this way we can flexibly and easily add new properties in the future.

[components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/c9bb75e8bf376b012c2ee7b44745901a3f61390a/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 \defined('_JEXEC') or die;
 ?>

-Hello Foos: <?php echo $this->msg;
+<?php
+echo $this->item->name;

```

#### [components/com_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-a33732ebd6992540b8adca5615b51a1f)

We create an entry in the `default.xml` file for the new form field. This way we enable the selection of a Foo element at the menu item. Worth mentioning are the entries `addfieldprefix="FooNamespace\Component\Foos\Administrator\Field"` and `type="modal_foo"`:

[components/com_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/ae04129fb1b65a0939d9f968c3658843ddc7292d/src/components/com_foos/tmpl/foo/default.xml)

```xml {diff}
 	</layout>
 	<!-- Add fields to the request variables for the layout. -->
 	<fields name="request">
-		<fieldset name="request">
+		<fieldset name="request"
+			addfieldprefix="FooNamespace\Component\Foos\Administrator\Field"
+		>
 			<field
-				name="show_text"
-				type="text"
-				label="COM_FOOS_FIELD_TEXT_SHOW_LABEL"
-				default="Hi"
+				name="id"
+				type="modal_foo"
+				label="COM_FOOS_SELECT_FOO_LABEL"
+				required="true"
+				select="true"
+				new="true"
+				edit="true"
+				clear="true"
 			/>
 		</fieldset>
 	</fields>

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.  
Copy the files in the `media` folder into the `media` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from the previous part.

2. open the menu manager to create a menu item. Click on `Menu` and then on `All Menu Items`.

Then click on the `New` button and fill in all the necessary fields. You can find the appropriate `Menu Item Type` by clicking the `Select` button. Make sure that you see a selection field instead of the text field for entering static text. The selection field also contains a `Select` button.

![Joomla Create a menu item](/images/j4x9x1.png)

3. click on the second `Select` and select an item. Make sure that a selected item can be cleared using `Clear`.

![Joomla Create a menu item](/images/j4x9x2.png)

4. save the menu item.

5. switch to the frontend and make sure that the menu item is created correctly. You will see the title of the element you selected in the administration area.

![Joomla Create a menu item](/images/j4x9x3.png)

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t6b...t7.diff

## Links
