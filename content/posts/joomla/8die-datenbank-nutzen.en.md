---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2023-05-13
title: 'Using the Database'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/die-datenbank-nutzen
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











In the previous part we set up a database for the Joomla components. In this part you will learn how to change or add data using a form in the administration area. At the end, the view of your component in the administration area contains a button to add new items. You change an existing item by clicking on the title in the list view.<!-- \index{database!using} -->

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t6...t6b)[^codeberg.org/astrid/j4examplecode/compare/t6...t6b] and copy these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### administrator/components/com_foos/forms/foo.xml

Joomla creates the form for you if you give it the requirements in an XML file. Below you can see this for our example.

[administrator/components/com_foos/forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/forms/foo.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/forms/foo.xml -->

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

<!-- \index{alias} -->
<!-- \index{forms} -->

> You want an overview of all possible form elements? In the [Joomla documentation](https://docs.joomla.org/Form_field)[^docs.joomla.org/form_field] all standard form fields are listed.

> Further tip: We have a simple form so far. Later, more specific requirements will surely be added. For example: What is the best way to place JavaScript in a Joomla form? A quick and simple but messy solution is this: You create a field `type=note` in the XML definition and then write the JavaScript code into the language constant of the description. I found a more elegant solution in Allrounder template by Bakual [^github.com/Bakual/Allrounder]. First he creates a new [field of type `loadjscss`](https://github.com/Bakual/Allrounder/blob/master/fields/loadjscss.php)[^github.com/Bakual/Allrounder/blob/master/fields/loadjscss.php]. He then includes this in the file [`templateDetails.xml`](https://github.com/Bakual/Allrounder/blob/57bb030ec0e243c776e758daeade898abbbb9c10/templateDetails.xml#L51)[^github.com/Bakual/Allrounder/blob/master/templateDetails.xml#L51]. Don't worry if you don't see through the last variant right away. We will create more fields as we go along.<!-- \index{JavaScript! form} --><!-- \index{form! JavaScript} -->

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/Controller/FooController.php

We create more or less an empty class with `FooController`. Although it contains no logic of its own, we need it because it inherits from `FormController`. Joomla expects `FooController` as the controller of the extension in this place under this name.

[administrator/components/com_foos/src/Controller/FooController.php](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/src/Controller/FooController.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/src/Controller/FooController.php

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

When should you add something to the file `administrator/components/com_foos/src/Controller/FooController.php`? 
Did you rename your component and now you have the problem that your _Views_ are not found correctly by Joomla? For example, did you create a new _View_ called `Katze` and your list view is called `Katzen`. Now you are sometimes redirected by Joomla to the _View_ `Katzes`. Especially when you create a new record or cancel an editing. You wonder where the `S` in the end of `Katzes` comes from? You can find the solution in the file [libraries/src/MVC/Controller/ FormController.php](https://github.com/joomla/joomla-cms/blob/73ae0235c25a489bac64613ba3d4837aec406fda/libraries/src/MVC/Controller/FormController.php#L136)[^libraries/src/MVC/Controller/FormController.php]. In the constructor of this file, the `view_item` variable is automatically made plural. However, the English grammar is used. In the case of the English word cat, it fits. Cats is plural of cat. Your controller inherits these values because of `use Joomla\CMS\MVC\Controller\FormController` and `extends FormController`. This does not always fit. You have just experienced an example with the name `cat`. Set in your `FormController` the variables `view_item` and `view_list` yourself to use custom values. <!-- \index{view! name in plural} --><!-- \index{plural} -->
 

```php
class KatzeController extends FormController
{
protected $view_item = 'katze';
protected $view_list = 'katzen';
}
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/Model/FooModel.php

Now we create the model to fetch the data for an element from the database. This we call `FooModel`. It inherits the main implementations from `AdminModel`. We add our own special requirements. With `$typeAlias` we set the typalias for the content type. This way Joomla knows for all inherited functions to which element it has to apply them exactly. For example, the alias in `loadFormData()` is used to convert the matching XML file into a form. Remember, you created the file in the current chapter. And for the correct mapping of the table, the alias is essential when you reuse Joomla functions. The typalias plays a big role in the background without you noticing it.

[administrator/components/com_foos/src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/src/Model/FooModel.php

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
	public function getForm($data = [], $loadData = true)
	{
		// Get the form.
		$form = $this->loadForm($this->typeAlias, 'foo', ['control' => 'jform', 'load_data' => $loadData]);

		if (empty($form)) {
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
#### administrator/components/com_foos/src/Table/FooTable.php

We implement the access to the database table. It is important to set `$this->typeAlias` and to specify the name of the table `#__foos_details`.

[administrator/components/com_foos/src/Table/FooTable.php](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/src/Table/FooTable.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/src/Table/FooTable.php

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
		if (empty($this->alias)) {
			$this->alias = $this->name;
		}

		$this->alias = ApplicationHelper::stringURLSafe($this->alias, $this->language);

		if (trim(str_replace('-', '', $this->alias)) == '') {
			$this->alias = Factory::getDate()->format('Y-m-d-H-i-s');
		}

		return $this->alias;
	}
}

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/View/Foo/HtmlView.php

The file `administrator/components/com_foos/src/View/Foo/HtmlView.php` organises the view of an element. Be careful not to mix this up this with the file `administrator/components/com_foos/src/View/Foo s /HtmlView.php`, which displays all elements in an overview list. To edit an element, we need a toolbar just like in the list view. The display itself is done as usual via the method `display` of the class `BaseHtmlView`. Only our special features are given via `$this->form = $this->get('Form');` and `$this->item = $this->get('Item');`.

[administrator/components/com_foos/src/View/Foo/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php

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
#### administrator/components/com_foos/tmpl/foo/edit.php

In the file `edit.php` is the view implemented, which is called for editing. It is important for me to address the [Webassetmanager](https://docs.joomla.org/J4.x:Web_Assets)[^docs.joomla.org/j4.x:web_assets] `$wa = $this->document->getWebAssetManager();` here. This is new in Joomla 4. You load two JavaScript files via Webassetmanager. `useScript('keepalive')` loads `media/system/js/keepalive.js` and keeps your session alive while you edit or create an article. `useScript('form.validate')` loads a lot of helpful functions with `media/system/js/core.js`. For example, validation, which we'll look at in more detail later.

> If you do not include webassets correctly, you will get the following error in the console of your browser when you save the form: `joomla document.formvalidator is undefined`. Joomla validates the forms by default and expects the file `media/system/js/core.js` to be loaded.

[administrator/components/com_foos/tmpl/foo/edit.php](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/tmpl/foo/edit.php

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

> Are you interested in the content of the files `Core.js`[^build/media_source/system/js/core.es6.js] or `Keepalive.js`[^build/media_source/system/js/keepalive.es6.js]? In this case, look at them directly in Joomla. In the development version, they are located in the directory `build/media_source/system/js/` and are prepared for installation with the help of scripts, [Node.js](https://nodejs.org/en/)[^nodejs.org] and [Composer](https://getcomposer.org/)[^getcomposer.org/] in the directory `media/system/js`. For further information, please refer to the [Joomla Documentation](https://docs.joomla.org/J4.x:Setting_Up_Your_Local_Environment)[^docs.joomla.org/j4.x:setting_up_your_local_environment].

<!-- prettier-ignore -->
#### administrator/components/com_foos/tmpl/foos/emptystate.php<!-- \index{Empty State} -->

With the file `administrator/components/com_foos/tmpl/foos/emptystate.php` we create a special layout for the case that the component contains no element and is therefore empty.

[administrator/components/com_foos/tmpl/foos/emptystate.php](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php

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
use Joomla\CMS\Layout\LayoutHelper;

$displayData = [
	'textPrefix' => 'COM_FOOS',
	'formURL' => 'index.php?option=com_foos',
	'helpURL' => 'https://codeberg.org/astrid/j4examplecode/src/branch/main/README.md',
	'icon' => 'icon-copy',
];

$user = Factory::getApplication()->getIdentity();

if ($user->authorise('core.create', 'com_foos') || count($user->getAuthorisedCategories('com_foos', 'core.create')) > 0) {
	$displayData['createURL'] = 'index.php?option=com_foos&task=foo.add';
}

echo LayoutHelper::render('joomla.content.emptystate', $displayData);

```

> `'icon' => 'icon-copy'` only works with icons that are included by name in the file `build/media_source/system/scss/_icomoon.scss`[^build/media_source/system/scss/_icomoon.scss]. I explained in the preface why this is like it is. Adjust the layout for the icon if you want to display a different symbol.<!-- \index{icons} --><!-- \index{icomoon} -->

The Empty State layout has been integrated into Joomla in [PR 33264](https://github.com/joomla/joomla-cms/pull/33264)[^github.com/joomla/joomla-cms/pull/33264]. The implementation of the Empty-State-Layout here in the tutorial takes the hint from [Issue 35712](https://github.com/joomla/joomla-cms/issues/35712) into account and inserts the code `if (count($errors = $this->get('Errors'))) { throw new GenericDataException(implode("\n", $errors), 500);}` before the code `if (!count($this->items) && $this->get('IsEmptyState')) { $this->setLayout('emptystate');}` in the file `administrator/components/com_foos/src/View/Foos/HtmlView.php`. This is done in a later chapter.<!-- \index{empty state} --><!-- \index{layout!empty state} -->

> Good design is already a challenge when there is data to display. It is even more difficult to implement an empty page in a user-friendly way. Have a look at [emptystat.es](https://emptystat.es/) if you want to get inspired about your Empty State implementation.

### Modified files

<!-- prettier-ignore -->
#### administrator/components/com_foos/foos.xml

To ensure that the 'forms' directory is passed to Joomla during a new installation, enter it in the installation manifest.

[administrator/components/com_foos/foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/foos.xml)

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
#### administrator/components/com_foos/src/View/Foos/HtmlView.php

In the view that displays the overview list, we add the toolbar. Here we insert a button that creates a new element. We also query with `if (!count($this->items) && $this->get('IsEmptyState'))` whether there are items to display. If the view is empty, we display the user-friendly Empty State layout `$this->setLayout('emptystate');`.

[administrator/components/com_foos/src/View/Foos/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}

 \defined('_JEXEC') or die;

+use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+use Joomla\CMS\Toolbar\Toolbar;
+use Joomla\CMS\Toolbar\ToolbarHelper;

 /**
  * View class for a list of foos.
 class HtmlView extends BaseHtmlView
 	public function display($tpl = null): void
 	{
 		$this->items = $this->get('Items');
+
+		if (!count($this->items) && $this->get('IsEmptyState')) {
+			$this->setLayout('emptystate');
+		}
+
+		$this->addToolbar();
+
 		parent::display($tpl);
 	}
+
+	protected function addToolbar()
+	{
+		// Get the toolbar object instance
+		$toolbar = Toolbar::getInstance('toolbar');
+
+		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');
+
+		$toolbar->addNew('foo.add');
+	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/tmpl/foos/default.php

In the template of the overview list, we replace the simple text with a form. The form contains a form field for each column in the database table and makes it possible to create or change data.

[administrator/components/com_foos/tmpl/foos/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t6b/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
  * @license     GNU General Public License version 2 or later; see LICENSE.txt
  */
 \defined('_JEXEC') or die;
+
+use Joomla\CMS\HTML\HTMLHelper;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Router\Route;
 ?>
-<?php foreach ($this->items as $i => $item) : ?>
-	<?php echo $item->name; ?>
-</br>
-<?php endforeach; ?>
+<form action="<?php echo Route::_('index.php?option=com_foos'); ?>" method="post" name="adminForm" id="adminForm">
+	<div class="row">
+		<div class="col-md-12">
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
+						<?php endforeach; ?>
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

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation. A new installation is not necessary. Continue using the files from the previous part.

2. next, open the list view of your component in the administration area. Are the three items provided with links? Do you see a button to create a new item?

![Edit Joomla Component in Backend - List View](/images/j4x8x1.png)

3. then click on the button `New` or on the title of an item. You will see the form for creating or editing items. Add a new item.

![Edit Joomla Component in Backend - Open View of an Item](/images/j4x8x2.png)

4. change existing items by clicking on the name.

![Edit Joomla Component in the Backend - Edit an Element](/images/j4x8x3.png)

5. delete all Foo-Items via the database and make sure that the Empty-State layout is displayed. Have you not yet edited the database yourself? In the previous section I suggested [phpmyadmin.net](https://www.phpmyadmin.net/) as a tool. In the following you will see the standard view followed by our user-friendly Empty State version for comparison. In the next but one section we will take care of the language files, then the layout will be more friendly. Later, the button for deleting items is also added.

![Edit Joomla Component in Backend - Empty View without Empty State Layout](/images/j4x8x10.png)

![Edit Joomla Component in Backend - Empty View with Empty State Layout](/images/j4x8x11.png)
<img src="https://vg08.met.vgwort.de/na/e84adb76518f4eda8cae811c531a12a3" width="1" height="1" alt="">
