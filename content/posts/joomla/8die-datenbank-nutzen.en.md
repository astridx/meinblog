---
date: 2020-12-08
title: 'Joomla 4.x Tutorial - Extension Development - Using the Database'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/die-datenbank-nutzen
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

In the previous part we set up a database for your Joomla components. In this part you will learn how to change or add data using a form in the administration area.

At the end, the view of your component in the administration area contains a button to add new items. You change an existing item by clicking on the title in the list view.

![Joomla Componente im Backend bearbeiten](/images/j4x8x1.png)

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t6...t6b)[^github.com/astridx/boilerplate/compare/t6...t6b] and incorporate these changes into your development version.

## Step by step

In the following overview, the newly added files are marked with a background and the changed ones are outlined.

![Overview of the files edited in this chapter](/images/tree6b.png)

### New files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-262e27353fbe755d3813ea2df19cd0ed)

Joomla creates the form for you if you give it the requirements in an XML file. Below you can see this for our example.

> You want an overview of all possible form elements? In the [Joomla documentation](https://docs.joomla.org/Form_field) all standard form fields are listed.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/forms/foo.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/forms/foo.xml -->

<?xml version="1.0" encoding="utf-8"?>
<form>
	<fieldset>
		<field
			name="id"
			type="number"
			label="JGLOBAL_FIELD_ID_LABEL"
			default="0"
			class="readonly"
			readonly="true"
		/>

		<field
			name="name"
			type="text"
			label="COM_FOOS_FIELD_NAME_LABEL"
			size="40"
			required="true"
		 />

		<field
			name="alias"
			type="text"
			label="JFIELD_ALIAS_LABEL"
			size="45"
			hint="JFIELD_ALIAS_PLACEHOLDER"
		/>
	</fieldset>
</form>
```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-181b1576846350fbb4a7a1a73291de4b)

We create here more or less an empty class. Although it contains nothing, we need it because it inherits from `FormController`. Joomla expects `FooController` as controller of the extension in the place under the name.

[administrator/components/com_foos/ src/Controller/FooController.php](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/src/Controller/FooController.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/src/Controller/FooController.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\FormController;

/**
 * Controller for a single foo
 *
 * @since  __BUMP_VERSION__
 */
class FooController extends FormController
{
}

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-c1b8160bef2d2b36367dc59381d6bcb7)

Now we create the model to fetch the data for an element. This we call `FooModel`. It inherits the main implementations from `AdminModel`. We add our own special requirements. With `$typeAlias` we set the typalias for the content type. This way Joomla knows for all inherited functions to which element it has to apply them exactly. For example, the alias in `loadFormData()` is used to convert the matching XML file into a form. Remember, you created the file in the current chapter. And for the correct mapping of the table, the alias is essential when you reuse Joomla functions. The typalias plays a big role in the background without you noticing it.

[administrator/components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/src/Model/FooModel.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Model;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\MVC\Model\AdminModel;

/**
 * Item Model for a Foo.
 *
 * @since  __BUMP_VERSION__
 */
class FooModel extends AdminModel
{
	/**
	 * The type alias for this content type.
	 *
	 * @var    string
	 * @since  __BUMP_VERSION__
	 */
	public $typeAlias = 'com_foos.foo';

	/**
	 * Method to get the row form.
	 *
	 * @param   array    $data      Data for the form.
	 * @param   boolean  $loadData  True if the form is to load its own data (default case), false if not.
	 *
	 * @return  \JForm|boolean  A \JForm object on success, false on failure
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function getForm($data = array(), $loadData = true)
	{
		// Get the form.
		$form = $this->loadForm($this->typeAlias, 'foo', array('control' => 'jform', 'load_data' => $loadData));

		if (empty($form))
		{
			return false;
		}

		return $form;
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @return  mixed  The data for the form.
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function loadFormData()
	{
		$app = Factory::getApplication();

		$data = $this->getItem();

		$this->preprocessData($this->typeAlias, $data);

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param   \Joomla\CMS\Table\Table  $table  The Table object
	 *
	 * @return  void
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function prepareTable($table)
	{
		$table->generateAlias();
	}
}

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-19bf55010e1963bede0668355cebb307)

We implement the access to the database table. It is important to set `$this->typeAlias` and to specify the name of the table `#__foos_details`.

> Read in the preface what the prefix `#__` exactly means if you don`t know.

[administrator/components/com_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/src/Table/FooTable.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/src/Table/FooTable.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Table;

\defined('_JEXEC') or die;

use Joomla\CMS\Application\ApplicationHelper;
use Joomla\CMS\Table\Table;
use Joomla\Database\DatabaseDriver;

/**
 * Foos Table class.
 *
 * @since  __BUMP_VERSION__
 */
class FooTable extends Table
{
	/**
	 * Constructor
	 *
	 * @param   DatabaseDriver  $db  Database connector object
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function __construct(DatabaseDriver $db)
	{
		$this->typeAlias = 'com_foos.foo';

		parent::__construct('#__foos_details', 'id', $db);
	}

	/**
	 * Generate a valid alias from title / date.
	 * Remains public to be able to check for duplicated alias before saving
	 *
	 * @return  string
	 */
	public function generateAlias()
	{
		if (empty($this->alias))
		{
			$this->alias = $this->name;
		}

		$this->alias = ApplicationHelper::stringURLSafe($this->alias, $this->language);

		if (trim(str_replace('-', '', $this->alias)) == '')
		{
			$this->alias = Factory::getDate()->format('Y-m-d-H-i-s');
		}

		return $this->alias;
	}
}

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

[administrator/components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\View\Foo;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

/**
 * View to edit a foo.
 *
 * @since  __BUMP_VERSION__
 */
class HtmlView extends BaseHtmlView
{
	/**
	 * The \JForm object
	 *
	 * @var  \JForm
	 */
	protected $form;

	/**
	 * The active item
	 *
	 * @var  object
	 */
	protected $item;

	/**
	 * Display the view.
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  mixed  A string if successful, otherwise an Error object.
	 */
	public function display($tpl = null)
	{
		$this->form  = $this->get('Form');
		$this->item = $this->get('Item');

		$this->addToolbar();

		return parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar.
	 *
	 * @return  void
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function addToolbar()
	{
		Factory::getApplication()->input->set('hidemainmenu', true);

		$isNew = ($this->item->id == 0);

		ToolbarHelper::title($isNew ? Text::_('COM_FOOS_MANAGER_FOO_NEW') : Text::_('COM_FOOS_MANAGER_FOO_EDIT'), 'address foo');

		ToolbarHelper::apply('foo.apply');
		ToolbarHelper::cancel('foo.cancel', 'JTOOLBAR_CLOSE');
	}
}

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-1637778e5f7d1d56dd1751af1970f01b)

In the file `edit.php` is the view implemented, which is called for editing. It is important for me to address the [Webassetmanager](https://docs.joomla.org/J4.x:Web_Assets) `$wa = $this->document->getWebAssetManager();`. This is new in Joomla 4. You load two JavaScript files via Webassetmanager. `useScript('keepalive')` loads `media/system/js/keepalive.js` and keeps your session alive while you edit or create an article. `useScript('form.validate')` loads a lot of helpful functions with `media/system/js/core.js`. For example, validation, which we'll look at in more detail later.

> If you do not include webassets correctly, you will get the following error in the console of your browser when you save the form: `joomla document.formvalidator is undefined`.

> Are you more interested in the files [Core.js](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/js/core.es6.js) or [Keepalive.js](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/js/keepalive.es6.js)? Then click on the names. This will lead you to the JavaScript files.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/tmpl/foo/edit.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Router\Route;

$app = Factory::getApplication();
$input = $app->input;

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
	->useScript('form.validate');

$layout  = 'edit';
$tmpl = $input->get('tmpl', '', 'cmd') === 'component' ? '&tmpl=component' : '';
?>

<form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
	<?php echo $this->getForm()->renderField('name'); ?>
	<?php echo $this->getForm()->renderField('alias'); ?>
	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>

```

### Modified files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-1ff20be1dacde6c4c8e68e90161e0578)

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/foos.xml)

Damit bei einer neuen Installation das Verzeichnis `forms` an Joomla übergeben wird, tragen wird diese im Installationsmanifest ein.

```php {diff}
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
+			<folder>forms</folder>
 			<folder>services</folder>
 			<folder>sql</folder>
 			<folder>src</folder>

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-8e3d37bbd99544f976bf8fd323eb5250)

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
\defined('_JEXEC') or die;

+use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+use Joomla\CMS\Toolbar\Toolbar;
+use Joomla\CMS\Toolbar\ToolbarHelper;

 /**
  * View class for a list of foos.

 	public function display($tpl = null): void
 	{
 		$this->items = $this->get('Items');
+
+		$this->addToolbar();
+
 		parent::display($tpl);
 	}
+
+	/**
+	 * Add the page title and toolbar.
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function addToolbar()
+	{
+		// Get the toolbar object instance
+		$toolbar = Toolbar::getInstance('toolbar');
+
+		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');
+
+		$toolbar->addNew('foo.add');
+	}
+
 }

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-3186af99ea4e3321b497b86fcd1cd757)

In the overview of the component we replace the simple text. We also add a new form.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 \defined('_JEXEC') or die;
+
+use Joomla\CMS\HTML\HTMLHelper;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Router\Route;
 ?>
-<?php foreach ($this->items as $i => $item) : ?>
-<?php echo $item->name; ?>
-</br>
-<?php endforeach; ?>
+<form action="<?php echo Route::_('index.php?option=com_foos'); ?>" method="post" name="adminForm" id="adminForm">
+	<div class="row">
+        <div class="col-md-12">
+			<div id="j-main-container" class="j-main-container">
+				<?php if (empty($this->items)) : ?>
+					<div class="alert alert-warning">
+						<?php echo Text::_('JGLOBAL_NO_MATCHING_RESULTS'); ?>
+					</div>
+				<?php else : ?>
+					<table class="table" id="fooList">
+						<thead>
+							<tr>
+								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
+									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_NAME'); ?>
+								</th>
+								<th scope="col">
+									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_ID'); ?>
+								</th>
+							</tr>
+						</thead>
+						<tbody>
+						<?php
+						$n = count($this->items);
+						foreach ($this->items as $i => $item) :
+							?>
+							<tr class="row<?php echo $i % 2; ?>">
+								<th scope="row" class="has-context">
+									<div>
+										<?php echo $this->escape($item->name); ?>
+									</div>
+									<?php $editIcon = '<span class="fa fa-pencil-square mr-2" aria-hidden="true"></span>'; ?>
+									<a class="hasTooltip" href="<?php echo Route::_('index.php?option=com_foos&task=foo.edit&id=' . (int) $item->id); ?>" title="<?php echo Text::_('JACTION_EDIT'); ?> <?php echo $this->escape(addslashes($item->name)); ?>">
+										<?php echo $editIcon; ?><?php echo $this->escape($item->name); ?></a>
+
+								</th>
+								<td class="d-none d-md-table-cell">
+									<?php echo $item->id; ?>
+								</td>
+							</tr>
+							<?php endforeach; ?>
+						</tbody>
+					</table>
+
+				<?php endif; ?>
+				<input type="hidden" name="task" value="">
+				<input type="hidden" name="boxchecked" value="0">
+				<?php echo HTMLHelper::_('form.token'); ?>
+			</div>
+		</div>
+	</div>
+</form>

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from the previous part.

2. next open the view in the administration area for your component. Are the three entries provided with links? Do you see a button to create a new item?

![Edit Joomla Component in Backend](/images/j4x8x1.png)

3. last click on the button 'New' or on the title of an item. You will see the form for creating or editing items. Add a new item.

![Edit Joomla Component in Backend](/images/j4x8x2.png)

4. change existing items via click on the name.

![Edit Joomla component in the backend](/images/j4x8x3.png)
