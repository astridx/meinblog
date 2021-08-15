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

In the previous part we set up a database for the Joomla components. In this part you will learn how to change or add data using a form in the administration area. At the end, the view of your component in the administration area contains a button to add new items. You change an existing item by clicking on the title in the list view.<!-- \index{Database (Using)} -->

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t6...t6b)[^github.com/astridx/boilerplate/compare/t6...t6b] and incorporate these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-262e27353fbe755d3813ea2df19cd0ed)

Joomla creates the form for you if you give it the requirements in an XML file. Below you can see this for our example.

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

> You want an overview of all possible form elements? In the [Joomla documentation](https://docs.joomla.org/Form_field)[^docs.joomla.org/form_field] all standard form fields are listed.

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-181b1576846350fbb4a7a1a73291de4b)

We create more or less an empty class with `FooController`. Although it contains no logic of its own, we need it because it inherits from `FormController`. Joomla expects `FooController` as the controller of the extension in this place under this name.

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
#### [administrator/components/com\_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-19bf55010e1963bede0668355cebb307)

We implement the access to the database table. It is important to set `$this->typeAlias` and to specify the name of the table `#__foos_details`.

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
#### [administrator/components/com\_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

The file `administrator/components/com_foos/ src/View/Foo/HtmlView.php` organises the view of an element. Be careful not to mix this up this with the file `administrator/components/com_foos/ src/View/Foo s /HtmlView.php`, which displays all elements in an overview list. To edit an element, we need a toolbar just like in the list view. The display itself is done as usual via the method `display` of the class `BaseHtmlView`. Only our special features are given via `$this->form = $this->get('Form');` and `$this->item = $this->get('Item');`.

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

In the file `edit.php` is the view implemented, which is called for editing. It is important for me to address the [Webassetmanager](https://docs.joomla.org/J4.x:Web_Assets)[^docs.joomla.org/j4.x:web_assets] `$wa = $this->document->getWebAssetManager();` here. This is new in Joomla 4. You load two JavaScript files via Webassetmanager. `useScript('keepalive')` loads `media/system/js/keepalive.js` and keeps your session alive while you edit or create an article. `useScript('form.validate')` loads a lot of helpful functions with `media/system/js/core.js`. For example, validation, which we'll look at in more detail later.

> If you do not include webassets correctly, you will get the following error in the console of your browser when you save the form: `joomla document.formvalidator is undefined`. Joomla validates the forms by default and expects the file `media/system/js/core.js` to be loaded.

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

> Are you interested in the content of the files [Core.js](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/js/core.es6.js) or [Keepalive.js](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/js/keepalive.es6.js)? In this case, look at them directly in Joomla. In the development version, they are located in the directory `build/media_source/system/js/` and are prepared for installation with the help of scripts, [Node.js](https://nodejs.org/en/)[^nodejs.org] and [Composer](https://getcomposer.org/)[^getcomposer.org/] in the directory `media/system/js`. For further information, please refer to the [Joomla Documentation](https://docs.joomla.org/J4.x:Setting_Up_Your_Local_Environment)[^docs.joomla.org/j4.x:setting_up_your_local_environment].

<!-- prettier-ignore -->
#### [administrator/components/com_foos/ tmpl/foos/emptystate.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-442a0783a9ed95c4c4b8d6ea41e2b598e8596d42f4c2f35195968a69d4cc060d)<!-- \index{Empty State} -->

With the file `administrator/components/com_foos/ tmpl/foos/emptystate.php` we create a special layout for the case that the component contains no element and is therefore empty.

[administrator/components/com_foos/ tmpl/foos/emptystate.php](https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php)

```php {numberLines: -2}
// https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php







<!DOCTYPE html>
<html lang="en" data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
  <head>
    <meta charset="utf-8">
  <link rel="dns-prefetch" href="https://github.githubassets.com">
  <link rel="dns-prefetch" href="https://avatars.githubusercontent.com">
  <link rel="dns-prefetch" href="https://github-cloud.s3.amazonaws.com">
  <link rel="dns-prefetch" href="https://user-images.githubusercontent.com/">
  <link rel="preconnect" href="https://github.githubassets.com" crossorigin>
  <link rel="preconnect" href="https://avatars.githubusercontent.com">



  <link crossorigin="anonymous" media="all" integrity="sha512-+LlYCzoIINFSwdPG8+vqo6w8TBMZRoJRBASiCU48bzL3w5EvYcA2sb9hCNg0CTnuvvQrruwwAIfQVjZPw2dqGg==" rel="stylesheet" href="https://github.githubassets.com/assets/frameworks-f8b9580b3a0820d152c1d3c6f3ebeaa3.css" />
  
    <link crossorigin="anonymous" media="all" integrity="sha512-jZzzGH5Wt7IVFAUCU/nJsbtyEt1mWb11cvXjc+68UreTfFldpRbg+wPPEbnhyiXeL1Q7QBD7aifcLBXqNkaD1g==" rel="stylesheet" href="https://github.githubassets.com/assets/behaviors-8d9cf3187e56b7b21514050253f9c9b1.css" />
    
    
    
    <link crossorigin="anonymous" media="all" integrity="sha512-gFyYfx/3EqAWGRRQLJTTi+T8ioN+qdAzlD9CUflYlcQ6b25awyXL9bRNCxgzqYRHVAu2WtoT5fRf9x+QiMhRWg==" rel="stylesheet" href="https://github.githubassets.com/assets/github-805c987f1ff712a0161914502c94d38b.css" />

  <script crossorigin="anonymous" defer="defer" integrity="sha512-DHpNa+QkQaUCk1eji+SQGDsKa8B63teT5nbKT3/TQ38T2hEDfT9B9OddmUKcMnQ8GaECHElNcJkpGhIThksyXA==" type="application/javascript" src="https://github.githubassets.com/assets/environment-0c7a4d6b.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-TZkPQbHzKQlwW+kxvQa2+1+hzGJL1lEex6ZBgQWxichlceemjfbcbmDI4XwPdks5WtONvehmrLsDlAmHhAjgWg==" type="application/javascript" src="https://github.githubassets.com/assets/chunk-frameworks-4d990f41.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-tnwEQVx3bFE+l1zTlAqGzN7AU0FENRv0o4NUl8HqIPqTt8NRaBBE+p24tf4fByTFi3pRLOmzgHZqkDX8CYibag==" type="application/javascript" src="https://github.githubassets.com/assets/chunk-vendor-b67c0441.js"></script>
  
  <script crossorigin="anonymous" defer="defer" integrity="sha512-clgqHAAv0O85BQMmY0Oi/34FOUjLH9sJQZByLzH4fCqas7bvovA4wPq1D3AtYlL0Ps+/AYK9WcjvBHGT79PVdQ==" type="application/javascript" src="https://github.githubassets.com/assets/behaviors-72582a1c.js"></script>
  
    <script crossorigin="anonymous" defer="defer" integrity="sha512-v+hxrr/7LrDH9DTy8tzqdDqKoXOnyWGr12dO4VTOYorMfADgcOjIRDVoy0RyTsLIj5gKzBTOpiFDwkze7/n8Iw==" type="application/javascript" data-module-id="./chunk-access-groups.js" data-src="https://github.githubassets.com/assets/chunk-access-groups-bfe871ae.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-BUDbrXZbK9QorUrf0KoEbZAJhTnz+BqMm10bqZCK6w5Hwy7YaORQ4F4DXhLkAVTvaJhNhxxeXgmgJLP0TB7TOw==" type="application/javascript" data-module-id="./chunk-advanced.js" data-src="https://github.githubassets.com/assets/chunk-advanced-0540dbad.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-5tWKSr7mhAzSh4Sx5YRFgKftdGxKwHKnOGYw5DlxjHhkQVURYFU3Bk5IMOGMKuAiJTlC3OXYM3xzGcyjzuEFQQ==" type="application/javascript" data-module-id="./chunk-animate-on-scroll.js" data-src="https://github.githubassets.com/assets/chunk-animate-on-scroll-e6d58a4a.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-ct3QiK2mvpg7zor9R2psdWnNMM2K32RU4RGRB/7yA5FyZ8H4iY6SNynXc7UaJqzBx6NaReg3GsWJPwW3kgAAig==" type="application/javascript" data-module-id="./chunk-codemirror.js" data-src="https://github.githubassets.com/assets/chunk-codemirror-72ddd088.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-M6W/sGLOuJXCIkw+doDl6zl7J9q2DmqdwftQCtyEiZM/UJNGRVQdyKwI/PAMxD12se/wCx3ZcyJs9nz0o0OSVw==" type="application/javascript" data-module-id="./chunk-color-modes.js" data-src="https://github.githubassets.com/assets/chunk-color-modes-33a5bfb0.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-71HZu1T5JWqRNF9wrm2NXZAqYVvzxZ8Dvor5U5l/LuEBbGCBX57Sny60Rj+qUZZAvEBGFlNsz179DEn2HFwgVA==" type="application/javascript" data-module-id="./chunk-confetti.js" data-src="https://github.githubassets.com/assets/chunk-confetti-ef51d9bb.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-P29U0lNmhUj353VrCWp6czdhNpMtF70xVKf4GBGFVKCoqGtxp0sywAM8/46+iC0kdFiRvM13EBvDnq6oyWRwiw==" type="application/javascript" data-module-id="./chunk-contributions-spider-graph.js" data-src="https://github.githubassets.com/assets/chunk-contributions-spider-graph-3f6f54d2.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-arflMFcVzVAYaP2n7m7gklPChWsVsCDtRPav2Cb6bqLeJf8pgbojWJ3EseKXILCIqfxl/v6arBduZ9SLmpMEZw==" type="application/javascript" data-module-id="./chunk-delayed-loading-element.js" data-src="https://github.githubassets.com/assets/chunk-delayed-loading-element-6ab7e530.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-6j/oSF+kbW+yetNPvI684VzAu9pzug6Vj2h+3u1LdCuRhR4jnuiHZfeQKls3nxcT/S3H+oIt7FtigE/aeoj+gg==" type="application/javascript" data-module-id="./chunk-drag-drop.js" data-src="https://github.githubassets.com/assets/chunk-drag-drop-ea3fe848.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-VSSd+Yzi2iMS+pibY6hD/WdypxAEdob5F2RMKxuKcAHS2EpFYJPeTXoVxt0NXg03tfj2dka2mEtHS+vjpYSaDw==" type="application/javascript" data-module-id="./chunk-edit-hook-secret-element.js" data-src="https://github.githubassets.com/assets/chunk-edit-hook-secret-element-55249df9.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-o98K7rYxxlUmQd7Y9Ckhc0akYwzL4lnMmiukRXrXuQUOuAaM/BuYRddD9a0oTZ052Y70W2Up4qMjeAsHLmRlKQ==" type="application/javascript" data-module-id="./chunk-edit.js" data-src="https://github.githubassets.com/assets/chunk-edit-a3df0aee.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-aiqMIGGZGo8AQMjcoImKPMTsZVVRl6htCSY7BpRmpGPG/AF+Wq+P/Oj/dthWQOIk9cCNMPEas7O2zAR6oqn0tA==" type="application/javascript" data-module-id="./chunk-emoji-picker-element.js" data-src="https://github.githubassets.com/assets/chunk-emoji-picker-element-6a2a8c20.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-qLW31c09tXeAXxFkISV7WTgrXi552Amv8JhqE1RW+1GfK8hAmuU/E24Ao/EcCpuXL5SN2c6LSAYNDAtOUsw53g==" type="application/javascript" data-module-id="./chunk-failbot.js" data-src="https://github.githubassets.com/assets/chunk-failbot-a8b5b7d5.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-KL6m1NSbDmR2ZjIqfK40Ayi9zjPHFzYFCa8r5ijNdaCT9NlbcwaPEnOFsyvPK8eYX7aYkL8f8b8zg6WjFM0dWw==" type="application/javascript" data-module-id="./chunk-feature-callout-element.js" data-src="https://github.githubassets.com/assets/chunk-feature-callout-element-28bea6d4.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-h8LRqLfdvdK2/kSKj8JYy6jyBdlTywxL4lqwV6OVOd3SCPRgUJ4/r3KHFQZPuYw0G7AWWhJY/IoitYLvAWFe5Q==" type="application/javascript" data-module-id="./chunk-filter-input.js" data-src="https://github.githubassets.com/assets/chunk-filter-input-87c2d1a8.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-ZDEs2KxFQg2a+jrEHbGKTNtzB+AQK3msBhv/KXLFiX9sV8vJaa9+9lpIW/kWd9JKtpJ63vTC/wuOJo7QJTbKKg==" type="application/javascript" data-module-id="./chunk-get-repo-element.js" data-src="https://github.githubassets.com/assets/chunk-get-repo-element-64312cd8.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-Z1wcyOFQHzyMSPqp5DLKrobr3DN2Q6Dz31cfPtw4b2vPs9PX0PrxyDXHpTbIlcZ9qT1M1BNAypHKKw8Lp6Yx/Q==" type="application/javascript" data-module-id="./chunk-insights-graph.js" data-src="https://github.githubassets.com/assets/chunk-insights-graph-675c1cc8.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-hDiTAZNldjiUNPk5eNthz6zUVY57FFqFU+n2D7WRYygzCxbDtwO9ODKDsEXxYb8kAMI7gTC8/QR3dXtHVCVgcA==" type="application/javascript" data-module-id="./chunk-insights-query.js" data-src="https://github.githubassets.com/assets/chunk-insights-query-84389301.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-lmosGyye+/xONUQs9SwGN/a9fQvUSiAFk5HrL8eLHjeuOx9DX9TW5ckRKFD+6FM54vutFf/mBmNFW/0R3KJEBw==" type="application/javascript" data-module-id="./chunk-invitations.js" data-src="https://github.githubassets.com/assets/chunk-invitations-966a2c1b.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-4MxGQhsDODvZgLbu5arO6CapfnNvZ5fXMsZ47FiklUKRmHq4B3h8uTokSIWAOAxsvCMRrZr0DVZ0i0gm3RAnsg==" type="application/javascript" data-module-id="./chunk-jump-to.js" data-src="https://github.githubassets.com/assets/chunk-jump-to-e0cc4642.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-VtdawM/OSsu+d6v25ZY6UcQa/GGLAStSESjsqdEwx+ey88GNYGkQ24o+JFFo4lY+7wLMRf7aCrLxkA5SquBoNQ==" type="application/javascript" data-module-id="./chunk-launch-code-element.js" data-src="https://github.githubassets.com/assets/chunk-launch-code-element-56d75ac0.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-RR5Uk+KE9M/CsqLcmgReChS7ZDjm8gxcOnDYWWkMdeTsrpW/xDlJHQEgUfuEC6HJXfyPNcW+oBTHqMnucNYGTQ==" type="application/javascript" data-module-id="./chunk-line-chart.js" data-src="https://github.githubassets.com/assets/chunk-line-chart-451e5493.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-RduaLAviB2ygvRK/eX5iwzYO43ie7svrJ0rYJs06x7XqpRl/IK8PPBscBWM9Moo5Z86DK2iRLE2+aR7TJ5Uc2Q==" type="application/javascript" data-module-id="./chunk-metric-selection-element.js" data-src="https://github.githubassets.com/assets/chunk-metric-selection-element-45db9a2c.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-7hZ031ngiF36wGsfcoyyCWTqwYxjX+qeTLtCV7CJ+IO+wzkzCm1RoR3WzWczfWmwLNqr+Hu3kQOgkBaGn4ntWQ==" type="application/javascript" data-module-id="./chunk-notification-list-focus.js" data-src="https://github.githubassets.com/assets/chunk-notification-list-focus-ee1674df.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-ma0OOy3nj0c1cqBx0BkcmIFsLqcSZ+MIukQxyEFM/OWTzZpG+QMgOoWPAHZz43M6fyjAUG1jH6c/6LPiiKPCyw==" type="application/javascript" data-module-id="./chunk-profile-pins-element.js" data-src="https://github.githubassets.com/assets/chunk-profile-pins-element-99ad0e3b.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-hgoSKLTlL8I3IWr/TLONCU+N4kdCtdrHCrrud4NKhgRlLrTw0XUPhqBaDdZUiFSzDQRw/nFQ1kw2VeTm0g9+lA==" type="application/javascript" data-module-id="./chunk-profile.js" data-src="https://github.githubassets.com/assets/chunk-profile-860a1228.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-W/CGm7ARGkQrOSmTAUvHx6XJH3sPfyUEY2kRDWT84K5WU9i2fNXvLxdipvaaMTQbR6AjSSxrQOBj6lR1kzgB0Q==" type="application/javascript" data-module-id="./chunk-readme-toc-element.js" data-src="https://github.githubassets.com/assets/chunk-readme-toc-element-5bf0869b.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-/Xj0UUoF3jbbyPG8kYIU32SSIcbwjCsMEcrzD8TehuXuB+/GOxxNw9427dwVYGqGkuNvhGi2m5cbSMNZI6BROA==" type="application/javascript" data-module-id="./chunk-ref-selector.js" data-src="https://github.githubassets.com/assets/chunk-ref-selector-fd78f451.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-D/MxBjtRPjes6DvnYGi2dEH7AQEnLvSvTODabEkSo+1zP6SSEZpb8oF52kFWERA97t1L19fF/P3bn4pgIsMPuA==" type="application/javascript" data-module-id="./chunk-responsive-underlinenav.js" data-src="https://github.githubassets.com/assets/chunk-responsive-underlinenav-0ff33106.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-SWy36S28Js+/YzsvYgmp+IEdC0qtMcBf6sYhXTEcj1aFPCLPOTOnOKqzFiNyH2oNVDd+u5Qi8eqYINSIu28LFQ==" type="application/javascript" data-module-id="./chunk-runner-groups.js" data-src="https://github.githubassets.com/assets/chunk-runner-groups-496cb7e9.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-SVdK0K69PnQ4FChdpl650OR+vplYWXqddxNkEGKhQf6tkehqvKkFEg5LQSZgCVKt2tfc9CnWJlmKCwbTTipEjg==" type="application/javascript" data-module-id="./chunk-series-table.js" data-src="https://github.githubassets.com/assets/chunk-series-table-49574ad0.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-tk76eoSLUqXSVZ8ANzPprrOImFIV1zQ/VBV+WzG8ZjZpVPH8cLkMH/ur5HJB1lxx9/yo+V2wjDF96t4qfUwZLA==" type="application/javascript" data-module-id="./chunk-severity-calculator-element.js" data-src="https://github.githubassets.com/assets/chunk-severity-calculator-element-b64efa7a.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-fIq9Mn7jY/bHQXnsmh+VejpDnaO+d/FDxsp+4CuZtdNLrLuO+dQCjh+m6Yd8GCYD2Cy6DWbCEyM+mH2dkB2H9A==" type="application/javascript" data-module-id="./chunk-sortable-behavior.js" data-src="https://github.githubassets.com/assets/chunk-sortable-behavior-7c8abd32.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-nKa3UdA2O7Ve4Jn24gaB20yUfJvS7wlnd8Q8C+iWD8i2tXLgaKemDWkLeexeQdrs+an98FCl5fOiy0J+izn+tQ==" type="application/javascript" data-module-id="./chunk-three.module.js" data-src="https://github.githubassets.com/assets/chunk-three.module-9ca6b751.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-WK8VXw3lfUQ/VRW0zlgKPhcMUqH0uTnB/KzePUPdZhCm/HpxfXXHKTGvj5C0Oex7+zbIM2ECzULbtTCT4ug3yg==" type="application/javascript" data-module-id="./chunk-toast.js" data-src="https://github.githubassets.com/assets/chunk-toast-58af155f.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-luqZ+mADz+7HRHtCUzlzjR5jCslW6cEOqzoa+avLS9Z1t3vX7T0PI34MJ+r7CVglMUUqLwYMN6rA/VORmmmVvQ==" type="application/javascript" data-module-id="./chunk-tweetsodium.js" data-src="https://github.githubassets.com/assets/chunk-tweetsodium-96ea99fa.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-fvcOOYapCxPkDRQWz2WQzrqL6rRhX88yHWF87fb9Xny2Fq4lri0ONaVFL7XDSTiTyu4OTp+8WoyfMVpgGUaaVg==" type="application/javascript" data-module-id="./chunk-unveil.js" data-src="https://github.githubassets.com/assets/chunk-unveil-7ef70e39.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-UOFNW/xcxynplVfC8Y3fQdFFiasmugYUUHU4N90G8sqBZGL1yR37yjVakxV8/FV5deBALx9OQMBoiba/3OHGDA==" type="application/javascript" data-module-id="./chunk-user-status-submit.js" data-src="https://github.githubassets.com/assets/chunk-user-status-submit-50e14d5b.js"></script>
    <script crossorigin="anonymous" defer="defer" integrity="sha512-cKu/+X7gT+WVH4sXKt0g3G77bfQfcgwurRObM+dt8XylPm9eEWI+/aWKhVab6VsYuvvuI5BTriKXhXfJwaSXdQ==" type="application/javascript" data-module-id="./chunk-webgl-warp.js" data-src="https://github.githubassets.com/assets/chunk-webgl-warp-70abbff9.js"></script>
  
  <script crossorigin="anonymous" defer="defer" integrity="sha512-D1XZnZOcdxbblxOHX8uohb9Szv1fEFuMPVr9j+arRLbyjskjxLhswTjE+93QTPwPosOld3mLbTvEMe72DOgVyQ==" type="application/javascript" src="https://github.githubassets.com/assets/repositories-0f55d99d.js"></script>
<script crossorigin="anonymous" defer="defer" integrity="sha512-Mgtna7Em9zv9+Ci4+hIOnqXPpHy2iqclBJW8n9zQc+0kPlO3H3frshrkxCCYvBDkrTdrhmjZ7tm6aiTSdqffzw==" type="application/javascript" src="https://github.githubassets.com/assets/diffs-320b676b.js"></script>

  <meta name="viewport" content="width=device-width">
  
  <title>boilerplate/emptystate.php at t6b · astridx/boilerplate · GitHub</title>
    <meta name="description" content="Boilerplate files for Joomla! extensions. Contribute to astridx/boilerplate development by creating an account on GitHub.">
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
  <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
  <meta property="fb:app_id" content="1401488693436528">
  <meta name="apple-itunes-app" content="app-id=1477376905" />
    <meta name="twitter:image:src" content="https://opengraph.githubassets.com/b0426a37c96b317319c769e42555c7c0e18dcc1049f37cf5ec7bb5ac1439de77/astridx/boilerplate" /><meta name="twitter:site" content="@github" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="boilerplate/emptystate.php at t6b · astridx/boilerplate" /><meta name="twitter:description" content="Boilerplate files for Joomla! extensions. Contribute to astridx/boilerplate development by creating an account on GitHub." />
    <meta property="og:image" content="https://opengraph.githubassets.com/b0426a37c96b317319c769e42555c7c0e18dcc1049f37cf5ec7bb5ac1439de77/astridx/boilerplate" /><meta property="og:image:alt" content="Boilerplate files for Joomla! extensions. Contribute to astridx/boilerplate development by creating an account on GitHub." /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="600" /><meta property="og:site_name" content="GitHub" /><meta property="og:type" content="object" /><meta property="og:title" content="boilerplate/emptystate.php at t6b · astridx/boilerplate" /><meta property="og:url" content="https://github.com/astridx/boilerplate" /><meta property="og:description" content="Boilerplate files for Joomla! extensions. Contribute to astridx/boilerplate development by creating an account on GitHub." />



    

  <link rel="assets" href="https://github.githubassets.com/">
  

  <meta name="request-id" content="C4FA:F76B:8DEBE1:9CA981:6118C533" data-pjax-transient="true"/><meta name="html-safe-nonce" content="b89d6a06d6a5bcad8aa8495cb2420e289fb45f911dfacb5f693b9595d2022365" data-pjax-transient="true"/><meta name="visitor-payload" content="eyJyZWZlcnJlciI6IiIsInJlcXVlc3RfaWQiOiJDNEZBOkY3NkI6OERFQkUxOjlDQTk4MTo2MTE4QzUzMyIsInZpc2l0b3JfaWQiOiI4Nzc2MzM3NTEwMDEwMjQyMzU1IiwicmVnaW9uX2VkZ2UiOiJmcmEiLCJyZWdpb25fcmVuZGVyIjoiZnJhIn0=" data-pjax-transient="true"/><meta name="visitor-hmac" content="0ff486ad21b4e6ad51eac5e572aee937ca0f43222e7b85a858f75cf190d0b49d" data-pjax-transient="true"/>

    <meta name="hovercard-subject-tag" content="repository:82167237" data-pjax-transient>


  <meta name="github-keyboard-shortcuts" content="repository,source-code" data-pjax-transient="true" />

  

  <meta name="selected-link" value="repo_source" data-pjax-transient>

    <meta name="google-site-verification" content="c1kuD-K2HIVF635lypcsWPoD4kilo5-jA_wBFyT4uMY">
  <meta name="google-site-verification" content="KT5gs8h0wvaagLKAVWq8bbeNwnZZK1r1XQysX3xurLU">
  <meta name="google-site-verification" content="ZzhVyEFwb7w3e0-uOTltm8Jsck2F5StVihD0exw2fsA">
  <meta name="google-site-verification" content="GXs5KoUUkNCoaAZn7wPN-t01Pywp9M3sEjnt_3_ZWPc">

  <meta name="octolytics-host" content="collector.githubapp.com" /><meta name="octolytics-app-id" content="github" /><meta name="octolytics-event-url" content="https://collector.githubapp.com/github-external/browser_event" />

  <meta name="analytics-location" content="/&lt;user-name&gt;/&lt;repo-name&gt;/blob/show" data-pjax-transient="true" />

  



  <meta name="optimizely-datafile" content="{&quot;version&quot;: &quot;4&quot;, &quot;rollouts&quot;: [], &quot;typedAudiences&quot;: [], &quot;anonymizeIP&quot;: true, &quot;projectId&quot;: &quot;16737760170&quot;, &quot;variables&quot;: [], &quot;featureFlags&quot;: [], &quot;experiments&quot;: [{&quot;status&quot;: &quot;Running&quot;, &quot;audienceIds&quot;: [], &quot;variations&quot;: [{&quot;variables&quot;: [], &quot;id&quot;: &quot;20432530142&quot;, &quot;key&quot;: &quot;control&quot;}, {&quot;variables&quot;: [], &quot;id&quot;: &quot;20418424478&quot;, &quot;key&quot;: &quot;treatment&quot;}], &quot;id&quot;: &quot;20437502121&quot;, &quot;key&quot;: &quot;recommended_plan_and_benefits_in_signup&quot;, &quot;layerId&quot;: &quot;20428035169&quot;, &quot;trafficAllocation&quot;: [{&quot;entityId&quot;: &quot;20418424478&quot;, &quot;endOfRange&quot;: 5000}, {&quot;entityId&quot;: &quot;20432530142&quot;, &quot;endOfRange&quot;: 10000}], &quot;forcedVariations&quot;: {}}, {&quot;status&quot;: &quot;Running&quot;, &quot;audienceIds&quot;: [], &quot;variations&quot;: [{&quot;variables&quot;: [], &quot;id&quot;: &quot;20489782769&quot;, &quot;key&quot;: &quot;control&quot;}, {&quot;variables&quot;: [], &quot;id&quot;: &quot;20464890159&quot;, &quot;key&quot;: &quot;calculator&quot;}], &quot;id&quot;: &quot;20470139194&quot;, &quot;key&quot;: &quot;pricing_calculator&quot;, &quot;layerId&quot;: &quot;20484939336&quot;, &quot;trafficAllocation&quot;: [{&quot;entityId&quot;: &quot;20464890159&quot;, &quot;endOfRange&quot;: 2500}, {&quot;entityId&quot;: &quot;20464890159&quot;, &quot;endOfRange&quot;: 5000}, {&quot;entityId&quot;: &quot;20489782769&quot;, &quot;endOfRange&quot;: 7500}, {&quot;entityId&quot;: &quot;20489782769&quot;, &quot;endOfRange&quot;: 10000}], &quot;forcedVariations&quot;: {&quot;1268183565.1620830370&quot;: &quot;calculator&quot;, &quot;1684648857.1628809053&quot;: &quot;calculator&quot;}}, {&quot;status&quot;: &quot;Running&quot;, &quot;audienceIds&quot;: [], &quot;variations&quot;: [{&quot;variables&quot;: [], &quot;id&quot;: &quot;20438636352&quot;, &quot;key&quot;: &quot;control&quot;}, {&quot;variables&quot;: [], &quot;id&quot;: &quot;20484957397&quot;, &quot;key&quot;: &quot;treatment&quot;}], &quot;id&quot;: &quot;20479227424&quot;, &quot;key&quot;: &quot;growth_ghec_onboarding_experience&quot;, &quot;layerId&quot;: &quot;20467848595&quot;, &quot;trafficAllocation&quot;: [{&quot;entityId&quot;: &quot;20484957397&quot;, &quot;endOfRange&quot;: 1000}, {&quot;entityId&quot;: &quot;20438636352&quot;, &quot;endOfRange&quot;: 5000}, {&quot;entityId&quot;: &quot;20438636352&quot;, &quot;endOfRange&quot;: 6000}, {&quot;entityId&quot;: &quot;20484957397&quot;, &quot;endOfRange&quot;: 8000}, {&quot;entityId&quot;: &quot;20484957397&quot;, &quot;endOfRange&quot;: 10000}], &quot;forcedVariations&quot;: {}}], &quot;audiences&quot;: [{&quot;conditions&quot;: &quot;[\&quot;or\&quot;, {\&quot;match\&quot;: \&quot;exact\&quot;, \&quot;name\&quot;: \&quot;$opt_dummy_attribute\&quot;, \&quot;type\&quot;: \&quot;custom_attribute\&quot;, \&quot;value\&quot;: \&quot;$opt_dummy_value\&quot;}]&quot;, &quot;id&quot;: &quot;$opt_dummy_audience&quot;, &quot;name&quot;: &quot;Optimizely-Generated Audience for Backwards Compatibility&quot;}], &quot;groups&quot;: [], &quot;attributes&quot;: [{&quot;id&quot;: &quot;16822470375&quot;, &quot;key&quot;: &quot;user_id&quot;}, {&quot;id&quot;: &quot;17143601254&quot;, &quot;key&quot;: &quot;spammy&quot;}, {&quot;id&quot;: &quot;18175660309&quot;, &quot;key&quot;: &quot;organization_plan&quot;}, {&quot;id&quot;: &quot;18813001570&quot;, &quot;key&quot;: &quot;is_logged_in&quot;}, {&quot;id&quot;: &quot;19073851829&quot;, &quot;key&quot;: &quot;geo&quot;}, {&quot;id&quot;: &quot;20175462351&quot;, &quot;key&quot;: &quot;requestedCurrency&quot;}], &quot;botFiltering&quot;: false, &quot;accountId&quot;: &quot;16737760170&quot;, &quot;events&quot;: [{&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;17911811441&quot;, &quot;key&quot;: &quot;hydro_click.dashboard.teacher_toolbox_cta&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18124116703&quot;, &quot;key&quot;: &quot;submit.organizations.complete_sign_up&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18145892387&quot;, &quot;key&quot;: &quot;no_metric.tracked_outside_of_optimizely&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18178755568&quot;, &quot;key&quot;: &quot;click.org_onboarding_checklist.add_repo&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18180553241&quot;, &quot;key&quot;: &quot;submit.repository_imports.create&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18186103728&quot;, &quot;key&quot;: &quot;click.help.learn_more_about_repository_creation&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18188530140&quot;, &quot;key&quot;: &quot;test_event.do_not_use_in_production&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18191963644&quot;, &quot;key&quot;: &quot;click.empty_org_repo_cta.transfer_repository&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18195612788&quot;, &quot;key&quot;: &quot;click.empty_org_repo_cta.import_repository&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18210945499&quot;, &quot;key&quot;: &quot;click.org_onboarding_checklist.invite_members&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18211063248&quot;, &quot;key&quot;: &quot;click.empty_org_repo_cta.create_repository&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18215721889&quot;, &quot;key&quot;: &quot;click.org_onboarding_checklist.update_profile&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18224360785&quot;, &quot;key&quot;: &quot;click.org_onboarding_checklist.dismiss&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18234832286&quot;, &quot;key&quot;: &quot;submit.organization_activation.complete&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18252392383&quot;, &quot;key&quot;: &quot;submit.org_repository.create&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18257551537&quot;, &quot;key&quot;: &quot;submit.org_member_invitation.create&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18259522260&quot;, &quot;key&quot;: &quot;submit.organization_profile.update&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18564603625&quot;, &quot;key&quot;: &quot;view.classroom_select_organization&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18568612016&quot;, &quot;key&quot;: &quot;click.classroom_sign_in_click&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18572592540&quot;, &quot;key&quot;: &quot;view.classroom_name&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18574203855&quot;, &quot;key&quot;: &quot;click.classroom_create_organization&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18582053415&quot;, &quot;key&quot;: &quot;click.classroom_select_organization&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18589463420&quot;, &quot;key&quot;: &quot;click.classroom_create_classroom&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18591323364&quot;, &quot;key&quot;: &quot;click.classroom_create_first_classroom&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18591652321&quot;, &quot;key&quot;: &quot;click.classroom_grant_access&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;18607131425&quot;, &quot;key&quot;: &quot;view.classroom_creation&quot;}, {&quot;experimentIds&quot;: [&quot;20437502121&quot;, &quot;20479227424&quot;], &quot;id&quot;: &quot;18831680583&quot;, &quot;key&quot;: &quot;upgrade_account_plan&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;19064064515&quot;, &quot;key&quot;: &quot;click.signup&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19075373687&quot;, &quot;key&quot;: &quot;click.view_account_billing_page&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19077355841&quot;, &quot;key&quot;: &quot;click.dismiss_signup_prompt&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;19079713938&quot;, &quot;key&quot;: &quot;click.contact_sales&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19120963070&quot;, &quot;key&quot;: &quot;click.compare_account_plans&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;19151690317&quot;, &quot;key&quot;: &quot;click.upgrade_account_cta&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19424193129&quot;, &quot;key&quot;: &quot;click.open_account_switcher&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19520330825&quot;, &quot;key&quot;: &quot;click.visit_account_profile&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19540970635&quot;, &quot;key&quot;: &quot;click.switch_account_context&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19730198868&quot;, &quot;key&quot;: &quot;submit.homepage_signup&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;19820830627&quot;, &quot;key&quot;: &quot;click.homepage_signup&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;19988571001&quot;, &quot;key&quot;: &quot;click.create_enterprise_trial&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;20036538294&quot;, &quot;key&quot;: &quot;click.create_organization_team&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20040653299&quot;, &quot;key&quot;: &quot;click.input_enterprise_trial_form&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;20062030003&quot;, &quot;key&quot;: &quot;click.continue_with_team&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;20068947153&quot;, &quot;key&quot;: &quot;click.create_organization_free&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20086636658&quot;, &quot;key&quot;: &quot;click.signup_continue.username&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20091648988&quot;, &quot;key&quot;: &quot;click.signup_continue.create_account&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20103637615&quot;, &quot;key&quot;: &quot;click.signup_continue.email&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20111574253&quot;, &quot;key&quot;: &quot;click.signup_continue.password&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20120044111&quot;, &quot;key&quot;: &quot;view.pricing_page&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20152062109&quot;, &quot;key&quot;: &quot;submit.create_account&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20165800992&quot;, &quot;key&quot;: &quot;submit.upgrade_payment_form&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20171520319&quot;, &quot;key&quot;: &quot;submit.create_organization&quot;}, {&quot;experimentIds&quot;: [&quot;20437502121&quot;], &quot;id&quot;: &quot;20222645674&quot;, &quot;key&quot;: &quot;click.recommended_plan_in_signup.discuss_your_needs&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20227443657&quot;, &quot;key&quot;: &quot;submit.verify_primary_user_email&quot;}, {&quot;experimentIds&quot;: [&quot;20437502121&quot;], &quot;id&quot;: &quot;20234607160&quot;, &quot;key&quot;: &quot;click.recommended_plan_in_signup.try_enterprise&quot;}, {&quot;experimentIds&quot;: [&quot;20437502121&quot;], &quot;id&quot;: &quot;20238175784&quot;, &quot;key&quot;: &quot;click.recommended_plan_in_signup.team&quot;}, {&quot;experimentIds&quot;: [&quot;20437502121&quot;], &quot;id&quot;: &quot;20239847212&quot;, &quot;key&quot;: &quot;click.recommended_plan_in_signup.continue_free&quot;}, {&quot;experimentIds&quot;: [&quot;20437502121&quot;], &quot;id&quot;: &quot;20251097193&quot;, &quot;key&quot;: &quot;recommended_plan&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;20438619534&quot;, &quot;key&quot;: &quot;click.pricing_calculator.1_member&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;20456699683&quot;, &quot;key&quot;: &quot;click.pricing_calculator.15_members&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;20467868331&quot;, &quot;key&quot;: &quot;click.pricing_calculator.10_members&quot;}, {&quot;experimentIds&quot;: [], &quot;id&quot;: &quot;20476267432&quot;, &quot;key&quot;: &quot;click.trial_days_remaining&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20476357660&quot;, &quot;key&quot;: &quot;click.discover_feature&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;20479287901&quot;, &quot;key&quot;: &quot;click.pricing_calculator.custom_members&quot;}, {&quot;experimentIds&quot;: [&quot;20437502121&quot;], &quot;id&quot;: &quot;20481107083&quot;, &quot;key&quot;: &quot;click.recommended_plan_in_signup.apply_teacher_benefits&quot;}, {&quot;experimentIds&quot;: [&quot;20470139194&quot;], &quot;id&quot;: &quot;20483089392&quot;, &quot;key&quot;: &quot;click.pricing_calculator.5_members&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20484283944&quot;, &quot;key&quot;: &quot;click.onboarding_task&quot;}, {&quot;experimentIds&quot;: [&quot;20437502121&quot;], &quot;id&quot;: &quot;20484996281&quot;, &quot;key&quot;: &quot;click.recommended_plan_in_signup.apply_student_benefits&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20486713726&quot;, &quot;key&quot;: &quot;click.onboarding_task_breadcrumb&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20490791319&quot;, &quot;key&quot;: &quot;click.upgrade_to_enterprise&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20491786766&quot;, &quot;key&quot;: &quot;click.talk_to_us&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20494144087&quot;, &quot;key&quot;: &quot;click.dismiss_enterprise_trial&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20499722759&quot;, &quot;key&quot;: &quot;completed_all_tasks&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20500710104&quot;, &quot;key&quot;: &quot;completed_onboarding_tasks&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20513160672&quot;, &quot;key&quot;: &quot;click.read_doc&quot;}, {&quot;experimentIds&quot;: [&quot;20479227424&quot;], &quot;id&quot;: &quot;20518980986&quot;, &quot;key&quot;: &quot;click.dismiss_trial_banner&quot;}], &quot;revision&quot;: &quot;805&quot;}" />
  <!-- To prevent page flashing, the optimizely JS needs to be loaded in the
    <head> tag before the DOM renders -->
  <script crossorigin="anonymous" defer="defer" integrity="sha512-+jU501Se8pk+19AWlNhSR/uznFeWGI9ndTB52CGeN8Fze/Srm+6H0FN6FCnvSdvVMtHwsV1NGq1sX5RvBwEGAg==" type="application/javascript" src="https://github.githubassets.com/assets/optimizely-fa3539d3.js"></script>



  

      <meta name="hostname" content="github.com">
    <meta name="user-login" content="">


      <meta name="expected-hostname" content="github.com">


    <meta name="enabled-features" content="MARKETPLACE_PENDING_INSTALLATIONS">

  <meta http-equiv="x-pjax-version" content="16b07b9e4c59ad87c930b1b01b63ad77f0f4b5b560223b0d52d8f53227877815">
  

    
  <meta name="go-import" content="github.com/astridx/boilerplate git https://github.com/astridx/boilerplate.git">

  <meta name="octolytics-dimension-user_id" content="9974686" /><meta name="octolytics-dimension-user_login" content="astridx" /><meta name="octolytics-dimension-repository_id" content="82167237" /><meta name="octolytics-dimension-repository_nwo" content="astridx/boilerplate" /><meta name="octolytics-dimension-repository_public" content="true" /><meta name="octolytics-dimension-repository_is_fork" content="true" /><meta name="octolytics-dimension-repository_parent_id" content="62122373" /><meta name="octolytics-dimension-repository_parent_nwo" content="joomla-extensions/boilerplate" /><meta name="octolytics-dimension-repository_network_root_id" content="62122373" /><meta name="octolytics-dimension-repository_network_root_nwo" content="joomla-extensions/boilerplate" />



    <link rel="canonical" href="https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php" data-pjax-transient>


  <meta name="browser-stats-url" content="https://api.github.com/_private/browser/stats">

  <meta name="browser-errors-url" content="https://api.github.com/_private/browser/errors">

  <meta name="browser-optimizely-client-errors-url" content="https://api.github.com/_private/browser/optimizely_client/errors">

  <link rel="mask-icon" href="https://github.githubassets.com/pinned-octocat.svg" color="#000000">
  <link rel="alternate icon" class="js-site-favicon" type="image/png" href="https://github.githubassets.com/favicons/favicon.png">
  <link rel="icon" class="js-site-favicon" type="image/svg+xml" href="https://github.githubassets.com/favicons/favicon.svg">

<meta name="theme-color" content="#1e2327">
<meta name="color-scheme" content="light dark" />


  <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials">

<meta name="enabled-homepage-translation-languages" content="">

  </head>

  <body class="logged-out env-production page-responsive page-blob" style="word-wrap: break-word;">
    

    <div class="position-relative js-header-wrapper ">
      <a href="#start-of-content" class="px-2 py-4 color-bg-info-inverse color-text-white show-on-focus js-skip-to-content">Skip to content</a>
      <span data-view-component="true" class="progress-pjax-loader js-pjax-loader-bar Progress position-fixed width-full">
    <span style="background-color: #79b8ff;width: 0%;" data-view-component="true" class="Progress-item progress-pjax-loader-bar"></span>
</span>      
      


        
            
<header class="Header-old header-logged-out js-details-container Details position-relative f4 py-2" role="banner">
  <div class="container-xl d-lg-flex flex-items-center p-responsive">
    <div class="d-flex flex-justify-between flex-items-center">
        <a class="mr-4" href="https://github.com/" aria-label="Homepage" data-ga-click="(Logged out) Header, go to homepage, icon:logo-wordmark">
          <svg height="32" class="octicon octicon-mark-github color-text-white" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>

          <div class="d-lg-none css-truncate css-truncate-target width-fit p-2">
            

          </div>

        <div class="d-flex flex-items-center">
              <a href="/signup?ref_cta=Sign+up&amp;ref_loc=header+logged+out&amp;ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E%2Fblob%2Fshow&amp;source=header-repo"
                class="d-inline-block d-lg-none f5 color-text-white no-underline border color-border-tertiary rounded-2 px-2 py-1 mr-3 mr-sm-5"
                data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;site header&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;SIGN_UP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="76f510bb52a36d6e37d318570df9436171495a8c332910885c67acef368f478c"
              >
                Sign&nbsp;up
              </a>

          <button class="btn-link d-lg-none mt-1 js-details-target" type="button" aria-label="Toggle navigation" aria-expanded="false">
            <svg height="24" class="octicon octicon-three-bars color-text-white" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"></path></svg>
          </button>
        </div>
    </div>

    <div class="HeaderMenu HeaderMenu--logged-out position-fixed top-0 right-0 bottom-0 height-fit position-lg-relative d-lg-flex flex-justify-between flex-items-center flex-auto">
      <div class="d-flex d-lg-none flex-justify-end border-bottom color-bg-secondary p-3">
        <button class="btn-link js-details-target" type="button" aria-label="Toggle navigation" aria-expanded="false">
          <svg height="24" class="octicon octicon-x color-text-secondary" viewBox="0 0 24 24" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"></path></svg>
        </button>
      </div>

        <nav class="mt-0 px-3 px-lg-0 mb-5 mb-lg-0" aria-label="Global">
          <ul class="d-lg-flex list-style-none">
              <li class="d-block d-lg-flex flex-lg-nowrap flex-lg-items-center border-bottom border-lg-bottom-0 mr-0 mr-lg-3 edge-item-fix position-relative flex-wrap flex-justify-between d-flex flex-items-center ">
                <details class="HeaderMenu-details details-overlay details-reset width-full">
                  <summary class="HeaderMenu-summary HeaderMenu-link px-0 py-3 border-0 no-wrap d-block d-lg-inline-block">
                    Why GitHub?
                    <svg x="0px" y="0px" viewBox="0 0 14 8" xml:space="preserve" fill="none" class="icon-chevon-down-mktg position-absolute position-lg-relative">
                      <path d="M1,1l6.2,6L13,1"></path>
                    </svg>
                  </summary>
                  <div class="dropdown-menu flex-auto rounded px-0 mt-0 pb-4 p-lg-4 position-relative position-lg-absolute left-0 left-lg-n4">
                    <a href="/features" class="py-2 lh-condensed-ultra d-block Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Features">Features <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a>
                    <ul class="list-style-none f5 pb-3">


                          <li class="edge-item-fix"><a href="/mobile" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Mobile <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                          <li class="edge-item-fix"><a href="/features/actions" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Actions <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                          <li class="edge-item-fix"><a href="/features/codespaces" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Codespaces <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                          <li class="edge-item-fix"><a href="/features/packages" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Packages <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                          <li class="edge-item-fix"><a href="/features/security" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Security <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                          <li class="edge-item-fix"><a href="/features/code-review/" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Code review <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                          <li class="edge-item-fix"><a href="/features/issues/" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Issues <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                          <li class="edge-item-fix"><a href="/features/integrations" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">Integrations <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>


                    </ul>

                    <ul class="list-style-none mb-0 border-lg-top pt-lg-3">
                      <li class="edge-item-fix"><a href="/sponsors" class="py-2 lh-condensed-ultra d-block no-underline Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Sponsors">GitHub Sponsors <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="/customer-stories" class="py-2 lh-condensed-ultra d-block no-underline Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Customer stories">Customer stories<span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>
                  </div>
                </details>
              </li>
              <li class="border-bottom border-lg-bottom-0 mr-0 mr-lg-3">
                <a href="/team" class="HeaderMenu-link no-underline py-3 d-block d-lg-inline-block" data-ga-click="(Logged out) Header, go to Team">Team</a>
              </li>
              <li class="border-bottom border-lg-bottom-0 mr-0 mr-lg-3">
                <a href="/enterprise" class="HeaderMenu-link no-underline py-3 d-block d-lg-inline-block" data-ga-click="(Logged out) Header, go to Enterprise">Enterprise</a>
              </li>

              <li class="d-block d-lg-flex flex-lg-nowrap flex-lg-items-center border-bottom border-lg-bottom-0 mr-0 mr-lg-3 edge-item-fix position-relative flex-wrap flex-justify-between d-flex flex-items-center ">
                <details class="HeaderMenu-details details-overlay details-reset width-full">
                  <summary class="HeaderMenu-summary HeaderMenu-link px-0 py-3 border-0 no-wrap d-block d-lg-inline-block">
                    Explore
                    <svg x="0px" y="0px" viewBox="0 0 14 8" xml:space="preserve" fill="none" class="icon-chevon-down-mktg position-absolute position-lg-relative">
                      <path d="M1,1l6.2,6L13,1"></path>
                    </svg>
                  </summary>

                  <div class="dropdown-menu flex-auto rounded px-0 pt-2 pb-0 mt-0 pb-4 p-lg-4 position-relative position-lg-absolute left-0 left-lg-n4">
                    <ul class="list-style-none mb-3">
                      <li class="edge-item-fix"><a href="/explore" class="py-2 lh-condensed-ultra d-block Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Explore">Explore GitHub <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>

                    <h4 class="color-text-tertiary text-normal text-mono f5 mb-2 border-lg-top pt-lg-3">Learn and contribute</h4>
                    <ul class="list-style-none mb-3">
                      <li class="edge-item-fix"><a href="/topics" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Topics">Topics <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                        <li class="edge-item-fix"><a href="/collections" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Collections">Collections <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="/trending" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Trending">Trending <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://lab.github.com/" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Learning lab">Learning Lab <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://opensource.guide" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Open source guides">Open source guides <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>

                    <h4 class="color-text-tertiary text-normal text-mono f5 mb-2 border-lg-top pt-lg-3">Connect with others</h4>
                    <ul class="list-style-none mb-0">
                      <li class="edge-item-fix"><a href="https://github.com/readme" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover">The ReadME Project <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://github.com/events" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Events">Events <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://github.community" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Community forum">Community forum <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://education.github.com" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to GitHub Education">GitHub Education <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://stars.github.com" class="py-2 pb-0 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to GitHub Stars Program">GitHub Stars program <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>
                  </div>
                </details>
              </li>

              <li class="border-bottom border-lg-bottom-0 mr-0 mr-lg-3">
                <a href="/marketplace" class="HeaderMenu-link no-underline py-3 d-block d-lg-inline-block" data-ga-click="(Logged out) Header, go to Marketplace">Marketplace</a>
              </li>

              <li class="d-block d-lg-flex flex-lg-nowrap flex-lg-items-center border-bottom border-lg-bottom-0 mr-0 mr-lg-3 edge-item-fix position-relative flex-wrap flex-justify-between d-flex flex-items-center ">
                <details class="HeaderMenu-details details-overlay details-reset width-full">
                  <summary class="HeaderMenu-summary HeaderMenu-link px-0 py-3 border-0 no-wrap d-block d-lg-inline-block">
                    Pricing
                    <svg x="0px" y="0px" viewBox="0 0 14 8" xml:space="preserve" fill="none" class="icon-chevon-down-mktg position-absolute position-lg-relative">
                       <path d="M1,1l6.2,6L13,1"></path>
                    </svg>
                  </summary>

                  <div class="dropdown-menu flex-auto rounded px-0 pt-2 pb-4 mt-0 p-lg-4 position-relative position-lg-absolute left-0 left-lg-n4">
                    <a href="/pricing" class="pb-2 lh-condensed-ultra d-block Link--primary no-underline h5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Pricing">Plans <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a>

                    <ul class="list-style-none mb-3">
                      <li class="edge-item-fix"><a href="/pricing#feature-comparison" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Compare plans">Compare plans <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                      <li class="edge-item-fix"><a href="https://enterprise.github.com/contact" class="py-2 lh-condensed-ultra d-block Link--secondary no-underline f5 Bump-link--hover" data-ga-click="(Logged out) Header, go to Contact Sales">Contact Sales <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>

                    <ul class="list-style-none mb-0 border-lg-top pt-lg-3">
                      <li class="edge-item-fix"><a href="https://education.github.com" class="py-2 pb-0 lh-condensed-ultra d-block no-underline Link--primary no-underline h5 Bump-link--hover"  data-ga-click="(Logged out) Header, go to Education">Education <span class="Bump-link-symbol float-right text-normal color-text-tertiary pr-3">&rarr;</span></a></li>
                    </ul>
                  </div>
                </details>
              </li>
          </ul>
        </nav>

      <div class="d-lg-flex flex-items-center px-3 px-lg-0 text-center text-lg-left">
          <div class="d-lg-flex min-width-0 mb-3 mb-lg-0">
            



<div class="header-search flex-auto js-site-search position-relative flex-self-stretch flex-md-self-auto mb-3 mb-md-0 mr-0 mr-md-3 scoped-search site-scoped-search js-jump-to"
>
  <div class="position-relative">
    <!-- '"` --><!-- </textarea></xmp> --></option></form><form class="js-site-search-form" role="search" aria-label="Site" data-scope-type="Repository" data-scope-id="82167237" data-scoped-search-url="/astridx/boilerplate/search" data-owner-scoped-search-url="/users/astridx/search" data-unscoped-search-url="/search" action="/astridx/boilerplate/search" accept-charset="UTF-8" method="get">
      <label class="form-control input-sm header-search-wrapper p-0 js-chromeless-input-container header-search-wrapper-jump-to position-relative d-flex flex-justify-between flex-items-center">
        <input type="text"
          class="form-control input-sm header-search-input jump-to-field js-jump-to-field js-site-search-focus js-site-search-field is-clearable"
          data-hotkey=s,/
          name="q"
          data-test-selector="nav-search-input"
          placeholder="Search"
          data-unscoped-placeholder="Search GitHub"
          data-scoped-placeholder="Search"
          autocapitalize="off"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-autocomplete="list"
          aria-controls="jump-to-results"
          aria-label="Search"
          data-jump-to-suggestions-path="/_graphql/GetSuggestedNavigationDestinations"
          spellcheck="false"
          autocomplete="off"
        >
        <input type="hidden" data-csrf="true" class="js-data-jump-to-suggestions-path-csrf" value="3aMpNuTPRyxtR2dEhMFJTdBs0m02r+bAZGdlQultsoOrU4+eHMggwW+owwknvr9FQzbrgwehurWIKk4ALhNNFw==" />
        <input type="hidden" class="js-site-search-type-field" name="type" >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" class="mr-1 header-search-key-slash"><path fill="none" stroke="#979A9C" opacity=".4" d="M3.5.5h12c1.7 0 3 1.3 3 3v13c0 1.7-1.3 3-3 3h-12c-1.7 0-3-1.3-3-3v-13c0-1.7 1.3-3 3-3z"></path><path fill="#979A9C" d="M11.8 6L8 15.1h-.9L10.8 6h1z"></path></svg>


          <div class="Box position-absolute overflow-hidden d-none jump-to-suggestions js-jump-to-suggestions-container">
            
<ul class="d-none js-jump-to-suggestions-template-container">
  

<li class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-suggestion" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="" data-item-type="suggestion">
    <div class="jump-to-octicon js-jump-to-octicon flex-shrink-0 mr-2 text-center d-none">
      <svg height="16" width="16" class="octicon octicon-repo flex-shrink-0 js-jump-to-octicon-repo d-none" title="Repository" aria-label="Repository" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-project flex-shrink-0 js-jump-to-octicon-project d-none" title="Project" aria-label="Project" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-search flex-shrink-0 js-jump-to-octicon-search d-none" title="Search" aria-label="Search" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path></svg>
    </div>

    <img class="avatar mr-2 flex-shrink-0 js-jump-to-suggestion-avatar d-none" alt="" aria-label="Team" src="" width="28" height="28">

    <div class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">
    </div>

    <div class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none js-jump-to-badge-search">
      <span class="js-jump-to-badge-search-text-default d-none" aria-label="in this repository">
        In this repository
      </span>
      <span class="js-jump-to-badge-search-text-global d-none" aria-label="in all of GitHub">
        All GitHub
      </span>
      <span aria-hidden="true" class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>

    <div aria-hidden="true" class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none d-on-nav-focus js-jump-to-badge-jump">
      Jump to
      <span class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>
  </a>
</li>

</ul>

<ul class="d-none js-jump-to-no-results-template-container">
  <li class="d-flex flex-justify-center flex-items-center f5 d-none js-jump-to-suggestion p-2">
    <span class="color-text-secondary">No suggested jump to results</span>
  </li>
</ul>

<ul id="jump-to-results" role="listbox" class="p-0 m-0 js-navigation-container jump-to-suggestions-results-container js-jump-to-suggestions-results-container">
  

<li class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-scoped-search d-none" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="" data-item-type="scoped_search">
    <div class="jump-to-octicon js-jump-to-octicon flex-shrink-0 mr-2 text-center d-none">
      <svg height="16" width="16" class="octicon octicon-repo flex-shrink-0 js-jump-to-octicon-repo d-none" title="Repository" aria-label="Repository" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-project flex-shrink-0 js-jump-to-octicon-project d-none" title="Project" aria-label="Project" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-search flex-shrink-0 js-jump-to-octicon-search d-none" title="Search" aria-label="Search" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path></svg>
    </div>

    <img class="avatar mr-2 flex-shrink-0 js-jump-to-suggestion-avatar d-none" alt="" aria-label="Team" src="" width="28" height="28">

    <div class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">
    </div>

    <div class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none js-jump-to-badge-search">
      <span class="js-jump-to-badge-search-text-default d-none" aria-label="in this repository">
        In this repository
      </span>
      <span class="js-jump-to-badge-search-text-global d-none" aria-label="in all of GitHub">
        All GitHub
      </span>
      <span aria-hidden="true" class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>

    <div aria-hidden="true" class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none d-on-nav-focus js-jump-to-badge-jump">
      Jump to
      <span class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>
  </a>
</li>

  

<li class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-owner-scoped-search d-none" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="" data-item-type="owner_scoped_search">
    <div class="jump-to-octicon js-jump-to-octicon flex-shrink-0 mr-2 text-center d-none">
      <svg height="16" width="16" class="octicon octicon-repo flex-shrink-0 js-jump-to-octicon-repo d-none" title="Repository" aria-label="Repository" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-project flex-shrink-0 js-jump-to-octicon-project d-none" title="Project" aria-label="Project" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-search flex-shrink-0 js-jump-to-octicon-search d-none" title="Search" aria-label="Search" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path></svg>
    </div>

    <img class="avatar mr-2 flex-shrink-0 js-jump-to-suggestion-avatar d-none" alt="" aria-label="Team" src="" width="28" height="28">

    <div class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">
    </div>

    <div class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none js-jump-to-badge-search">
      <span class="js-jump-to-badge-search-text-default d-none" aria-label="in this user">
        In this user
      </span>
      <span class="js-jump-to-badge-search-text-global d-none" aria-label="in all of GitHub">
        All GitHub
      </span>
      <span aria-hidden="true" class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>

    <div aria-hidden="true" class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none d-on-nav-focus js-jump-to-badge-jump">
      Jump to
      <span class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>
  </a>
</li>

  

<li class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-global-search d-none" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="" data-item-type="global_search">
    <div class="jump-to-octicon js-jump-to-octicon flex-shrink-0 mr-2 text-center d-none">
      <svg height="16" width="16" class="octicon octicon-repo flex-shrink-0 js-jump-to-octicon-repo d-none" title="Repository" aria-label="Repository" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-project flex-shrink-0 js-jump-to-octicon-project d-none" title="Project" aria-label="Project" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
      <svg height="16" width="16" class="octicon octicon-search flex-shrink-0 js-jump-to-octicon-search d-none" title="Search" aria-label="Search" viewBox="0 0 16 16" version="1.1" role="img"><path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path></svg>
    </div>

    <img class="avatar mr-2 flex-shrink-0 js-jump-to-suggestion-avatar d-none" alt="" aria-label="Team" src="" width="28" height="28">

    <div class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">
    </div>

    <div class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none js-jump-to-badge-search">
      <span class="js-jump-to-badge-search-text-default d-none" aria-label="in this repository">
        In this repository
      </span>
      <span class="js-jump-to-badge-search-text-global d-none" aria-label="in all of GitHub">
        All GitHub
      </span>
      <span aria-hidden="true" class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>

    <div aria-hidden="true" class="border rounded-1 flex-shrink-0 color-bg-tertiary px-1 color-text-tertiary ml-1 f6 d-none d-on-nav-focus js-jump-to-badge-jump">
      Jump to
      <span class="d-inline-block ml-1 v-align-middle">↵</span>
    </div>
  </a>
</li>


</ul>

          </div>
      </label>
</form>  </div>
</div>

          </div>

        <div class="position-relative mr-3 d-inline-block">
          <a href="/login?return_to=https%3A%2F%2Fgithub.com%2Fastridx%2Fboilerplate%2Fblob%2Ft6b%2Fsrc%2Fadministrator%2Fcomponents%2Fcom_foos%2Ftmpl%2Ffoos%2Femptystate.php"
            class="HeaderMenu-link flex-shrink-0 no-underline"
            data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;site header menu&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;SIGN_UP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="eafd47cbc7ca98c5943f9b8b0c08d801d3e24b4a30f59c3a6d8e379ad7d14906"
            data-ga-click="(Logged out) Header, clicked Sign in, text:sign-in">
            Sign in
          </a>
        </div>

            <a href="/signup?ref_cta=Sign+up&amp;ref_loc=header+logged+out&amp;ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E%2Fblob%2Fshow&amp;source=header-repo&amp;source_repo=astridx%2Fboilerplate"
              class="HeaderMenu-link flex-shrink-0 d-inline-block no-underline border color-border-tertiary rounded px-2 py-1"
              data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;site header menu&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;SIGN_UP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="eafd47cbc7ca98c5943f9b8b0c08d801d3e24b4a30f59c3a6d8e379ad7d14906"
              data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Sign up&quot;,&quot;action&quot;:&quot;click to sign up for account&quot;,&quot;label&quot;:&quot;ref_page:/&lt;user-name&gt;/&lt;repo-name&gt;/blob/show;ref_cta:Sign up;ref_loc:header logged out&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="7387aeb69328f06c85cb87f23d9ef04dbe57e84fedc2c1e4d38b7434a6de6ada"
            >
              Sign up
            </a>
      </div>
    </div>
  </div>
</header>

    </div>

  <div id="start-of-content" class="show-on-focus"></div>






    <div data-pjax-replace id="js-flash-container">


  <template class="js-flash-template">
    <div class="flash flash-full  {{ className }}">
  <div class=" px-2" >
    <button class="flash-close js-flash-close" type="button" aria-label="Dismiss this message">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
    </button>
    
      <div>{{ message }}</div>

  </div>
</div>
  </template>
</div>


    

  <include-fragment class="js-notification-shelf-include-fragment" data-base-src="https://github.com/notifications/beta/shelf"></include-fragment>




  <div
    class="application-main "
    data-commit-hovercards-enabled
    data-discussion-hovercards-enabled
    data-issue-and-pr-hovercards-enabled
  >
        <div itemscope itemtype="http://schema.org/SoftwareSourceCode" class="">
    <main id="js-repo-pjax-container" data-pjax-container >
      

    




  


  <div id="repository-container-header" class="hx_page-header-bg pt-3 hide-full-screen mb-5" data-pjax-replace>

      <div class="d-flex mb-3 px-3 px-md-4 px-lg-5">

        <div class="flex-auto min-width-0 width-fit mr-3">
            <h1 class=" d-flex flex-wrap flex-items-center break-word f3 text-normal">
    <svg class="octicon octicon-repo-forked color-text-secondary mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
  <span class="author flex-self-stretch" itemprop="author">
    <a class="url fn" rel="author" data-hovercard-type="user" data-hovercard-url="/users/astridx/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="/astridx">astridx</a>
  </span>
  <span class="mx-1 flex-self-stretch color-text-secondary">/</span>
  <strong itemprop="name" class="mr-2 flex-self-stretch">
    <a data-pjax="#js-repo-pjax-container" href="/astridx/boilerplate">boilerplate</a>
  </strong>
  
</h1>

  <span class="text-small lh-condensed-ultra no-wrap mt-1" data-repository-hovercards-enabled>
    forked from <a data-hovercard-type="repository" data-hovercard-url="/joomla-extensions/boilerplate/hovercard" href="/joomla-extensions/boilerplate">joomla-extensions/boilerplate</a>
  </span>

        </div>

          <ul class="pagehead-actions flex-shrink-0 d-none d-md-inline" style="padding: 2px 0;">

  <li>
      <a class="tooltipped tooltipped-s btn btn-sm" aria-label="You must be signed in to change notification settings" rel="nofollow" data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;notification subscription menu watch&quot;,&quot;repository_id&quot;:null,&quot;auth_type&quot;:&quot;LOG_IN&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="13d30dd0b7b640bdd804fe507645271d11dd7434865538769b93f10d63b16085" href="/login?return_to=%2Fastridx%2Fboilerplate">
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-bell">
    <path d="M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z"></path><path fill-rule="evenodd" d="M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.518 1.518 0 0113.482 13H2.518a1.518 1.518 0 01-1.263-2.36l1.703-2.554A.25.25 0 003 7.947V5z"></path>
</svg>
    Notifications
</a>
  </li>

  <li>
          <a class="btn btn-sm btn-with-count  tooltipped tooltipped-s" aria-label="You must be signed in to star a repository" rel="nofollow" data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;star button&quot;,&quot;repository_id&quot;:82167237,&quot;auth_type&quot;:&quot;LOG_IN&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="11da6e3512f100e935c87bafbbc088f6afc4ade0e3068912dc8fb671a64f2bc7" href="/login?return_to=%2Fastridx%2Fboilerplate">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star v-align-text-bottom mr-1">
    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
</svg>
      <span data-view-component="true">
        Star
</span></a>
    <a class="social-count js-social-count" href="/astridx/boilerplate/stargazers"
      aria-label="12 users starred this repository">
      12
    </a>

  </li>

  <li>
        <a class="btn btn-sm btn-with-count tooltipped tooltipped-s" aria-label="You must be signed in to fork a repository" rel="nofollow" data-hydro-click="{&quot;event_type&quot;:&quot;authentication.click&quot;,&quot;payload&quot;:{&quot;location_in_page&quot;:&quot;repo details fork button&quot;,&quot;repository_id&quot;:82167237,&quot;auth_type&quot;:&quot;LOG_IN&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="1eee4ec6d07a6192b19e3bfe147fdee3c01e68ceae107a33661cbde99ce35eac" href="/login?return_to=%2Fastridx%2Fboilerplate">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked">
    <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
</svg>
          Fork
</a>
      <a href="/astridx/boilerplate/network/members" class="social-count"
         aria-label="59 users forked this repository">
        59
      </a>
  </li>
</ul>

      </div>

      <div id="responsive-meta-container" data-pjax-replace>
</div>


        

  <nav data-pjax="#js-repo-pjax-container" aria-label="Repository" data-view-component="true" class="js-repo-nav js-sidenav-container-pjax js-responsive-underlinenav overflow-hidden UnderlineNav px-3 px-md-4 px-lg-5">

    <ul data-view-component="true" class="UnderlineNav-body list-style-none">
        <li data-view-component="true" class="d-flex">
  <a id="code-tab" href="/astridx/boilerplate/tree/t6b" data-tab-item="i0code-tab" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches repo_packages repo_deployments /astridx/boilerplate/tree/t6b" data-hotkey="g c" data-ga-click="Repository, Navigation click, Code tab" data-pjax="#repo-content-pjax-container" aria-current="page" data-view-component="true" class="UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item selected">
    
                  <svg class="octicon octicon-code UnderlineNav-octicon d-none d-sm-inline" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"></path></svg>
          <span data-content="Code">Code</span>
            <span title="Not available" data-view-component="true" class="Counter"></span>

    
</a></li>
        <li data-view-component="true" class="d-flex">
  <a id="issues-tab" href="/astridx/boilerplate/issues" data-tab-item="i1issues-tab" data-selected-links="repo_issues repo_labels repo_milestones /astridx/boilerplate/issues" data-hotkey="g i" data-ga-click="Repository, Navigation click, Issues tab" data-pjax="#repo-content-pjax-container" data-view-component="true" class="UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item">
    
                  <svg class="octicon octicon-issue-opened UnderlineNav-octicon d-none d-sm-inline" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path><path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path></svg>
          <span data-content="Issues">Issues</span>
            <span title="3" data-view-component="true" class="Counter">3</span>

    
</a></li>
        <li data-view-component="true" class="d-flex">
  <a id="pull-requests-tab" href="/astridx/boilerplate/pulls" data-tab-item="i2pull-requests-tab" data-selected-links="repo_pulls checks /astridx/boilerplate/pulls" data-hotkey="g p" data-ga-click="Repository, Navigation click, Pull requests tab" data-pjax="#repo-content-pjax-container" data-view-component="true" class="UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item">
    
                  <svg class="octicon octicon-git-pull-request UnderlineNav-octicon d-none d-sm-inline" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path></svg>
          <span data-content="Pull requests">Pull requests</span>
            <span title="0" hidden="hidden" data-view-component="true" class="Counter">0</span>

    
</a></li>
        <li data-view-component="true" class="d-flex">
  <a id="actions-tab" href="/astridx/boilerplate/actions" data-tab-item="i3actions-tab" data-selected-links="repo_actions /astridx/boilerplate/actions" data-hotkey="g a" data-ga-click="Repository, Navigation click, Actions tab" data-view-component="true" class="UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item">
    
                  <svg class="octicon octicon-play UnderlineNav-octicon d-none d-sm-inline" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227z"></path></svg>
          <span data-content="Actions">Actions</span>
            <span title="Not available" data-view-component="true" class="Counter"></span>

    
</a></li>
        <li data-view-component="true" class="d-flex">
  <a id="projects-tab" href="/astridx/boilerplate/projects" data-tab-item="i4projects-tab" data-selected-links="repo_projects new_repo_project repo_project /astridx/boilerplate/projects" data-hotkey="g b" data-ga-click="Repository, Navigation click, Projects tab" data-view-component="true" class="UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item">
    
                  <svg class="octicon octicon-project UnderlineNav-octicon d-none d-sm-inline" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>
          <span data-content="Projects">Projects</span>
            <span title="1" data-view-component="true" class="Counter">1</span>

    
</a></li>
        <li data-view-component="true" class="d-flex">
  <a id="wiki-tab" href="/astridx/boilerplate/wiki" data-tab-item="i5wiki-tab" data-selected-links="repo_wiki /astridx/boilerplate/wiki" data-hotkey="g w" data-ga-click="Repository, Navigation click, Wikis tab" data-view-component="true" class="UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item">
    
                  <svg class="octicon octicon-book UnderlineNav-octicon d-none d-sm-inline" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"></path></svg>
          <span data-content="Wiki">Wiki</span>
            <span title="Not available" data-view-component="true" class="Counter"></span>

    
</a></li>
        <li data-view-component="true" class="d-flex">
  <a id="security-tab" href="/astridx/boilerplate/security" data-tab-item="i6security-tab" data-selected-links="security overview alerts policy token_scanning code_scanning /astridx/boilerplate/security" data-hotkey="g s" data-ga-click="Repository, Navigation click, Security tab" data-view-component="true" class="UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item">
    
                  <svg class="octicon octicon-shield UnderlineNav-octicon d-none d-sm-inline" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.467.133a1.75 1.75 0 011.066 0l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.7 1.7 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667l5.25-1.68zm.61 1.429a.25.25 0 00-.153 0l-5.25 1.68a.25.25 0 00-.174.238V7c0 1.358.275 2.666 1.057 3.86.784 1.194 2.121 2.34 4.366 3.297a.2.2 0 00.154 0c2.245-.956 3.582-2.104 4.366-3.298C13.225 9.666 13.5 8.36 13.5 7V3.48a.25.25 0 00-.174-.237l-5.25-1.68zM9 10.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.75a.75.75 0 10-1.5 0v3a.75.75 0 001.5 0v-3z"></path></svg>
          <span data-content="Security">Security</span>
            <include-fragment src="/astridx/boilerplate/security/overall-count" accept="text/fragment+html"></include-fragment>

    
</a></li>
        <li data-view-component="true" class="d-flex">
  <a id="insights-tab" href="/astridx/boilerplate/pulse" data-tab-item="i7insights-tab" data-selected-links="repo_graphs repo_contributors dependency_graph dependabot_updates pulse people community /astridx/boilerplate/pulse" data-ga-click="Repository, Navigation click, Insights tab" data-view-component="true" class="UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item">
    
                  <svg class="octicon octicon-graph UnderlineNav-octicon d-none d-sm-inline" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 1.75a.75.75 0 00-1.5 0v12.5c0 .414.336.75.75.75h14.5a.75.75 0 000-1.5H1.5V1.75zm14.28 2.53a.75.75 0 00-1.06-1.06L10 7.94 7.53 5.47a.75.75 0 00-1.06 0L3.22 8.72a.75.75 0 001.06 1.06L7 7.06l2.47 2.47a.75.75 0 001.06 0l5.25-5.25z"></path></svg>
          <span data-content="Insights">Insights</span>
            <span title="Not available" data-view-component="true" class="Counter"></span>

    
</a></li>
</ul>
      <div style="visibility:hidden;" data-view-component="true" class="UnderlineNav-actions  js-responsive-underlinenav-overflow position-absolute pr-3 pr-md-4 pr-lg-5 right-0">      <details data-view-component="true" class="details-overlay details-reset position-relative">
  <summary role="button" data-view-component="true">          <div class="UnderlineNav-item mr-0 border-0">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-kebab-horizontal">
    <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
</svg>
            <span class="sr-only">More</span>
          </div>
</summary>
  <div data-view-component="true">          <details-menu role="menu" data-view-component="true" class="dropdown-menu dropdown-menu-sw">
  
            <ul>
                <li data-menu-item="i0code-tab" hidden>
                  <a role="menuitem" class="js-selected-navigation-item selected dropdown-item" aria-current="page" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches repo_packages repo_deployments /astridx/boilerplate/tree/t6b" href="/astridx/boilerplate/tree/t6b">
                    Code
</a>                </li>
                <li data-menu-item="i1issues-tab" hidden>
                  <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links="repo_issues repo_labels repo_milestones /astridx/boilerplate/issues" href="/astridx/boilerplate/issues">
                    Issues
</a>                </li>
                <li data-menu-item="i2pull-requests-tab" hidden>
                  <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links="repo_pulls checks /astridx/boilerplate/pulls" href="/astridx/boilerplate/pulls">
                    Pull requests
</a>                </li>
                <li data-menu-item="i3actions-tab" hidden>
                  <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links="repo_actions /astridx/boilerplate/actions" href="/astridx/boilerplate/actions">
                    Actions
</a>                </li>
                <li data-menu-item="i4projects-tab" hidden>
                  <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links="repo_projects new_repo_project repo_project /astridx/boilerplate/projects" href="/astridx/boilerplate/projects">
                    Projects
</a>                </li>
                <li data-menu-item="i5wiki-tab" hidden>
                  <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links="repo_wiki /astridx/boilerplate/wiki" href="/astridx/boilerplate/wiki">
                    Wiki
</a>                </li>
                <li data-menu-item="i6security-tab" hidden>
                  <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links="security overview alerts policy token_scanning code_scanning /astridx/boilerplate/security" href="/astridx/boilerplate/security">
                    Security
</a>                </li>
                <li data-menu-item="i7insights-tab" hidden>
                  <a role="menuitem" class="js-selected-navigation-item dropdown-item" data-selected-links="repo_graphs repo_contributors dependency_graph dependabot_updates pulse people community /astridx/boilerplate/pulse" href="/astridx/boilerplate/pulse">
                    Insights
</a>                </li>
            </ul>

</details-menu></div>
</details></div>
</nav>

  </div>


<div class="container-xl clearfix new-discussion-timeline px-3 px-md-4 px-lg-5">
  <div id="repo-content-pjax-container" class="repository-content " >

    


    
      
    
<div>
  


    <a class="d-none js-permalink-shortcut" data-hotkey="y" href="/astridx/boilerplate/blob/afa70b74db7a90f7887981cc31329b69a00b5e1b/src/administrator/components/com_foos/tmpl/foos/emptystate.php">Permalink</a>

    <!-- blob contrib key: blob_contributors:v22:0fb66cd2d04da64e728678911146ded668e33bef14112dab8415bdd1bdaa26ed -->

    <div class="d-flex flex-items-start flex-shrink-0 pb-3 flex-wrap flex-md-nowrap flex-justify-between flex-md-justify-start">
      
<div class="position-relative">
  <details class="details-reset details-overlay mr-0 mb-0 " id="branch-select-menu">
    <summary class="btn css-truncate"
            data-hotkey="w"
            title="Switch branches or tags">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-git-branch text-gray">
    <path fill-rule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"></path>
</svg>
      <span class="css-truncate-target" data-menu-button>t6b</span>
      <span class="dropdown-caret"></span>
    </summary>

      
<div class="SelectMenu">
  <div class="SelectMenu-modal">
    <header class="SelectMenu-header">
      <span class="SelectMenu-title">Switch branches/tags</span>
      <button class="SelectMenu-closeButton" type="button" data-toggle-for="branch-select-menu"><svg aria-label="Close menu" aria-hidden="false" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg></button>
    </header>

    <input-demux data-action="tab-container-change:input-demux#storeInput tab-container-changed:input-demux#updateInput">
      <tab-container class="d-flex flex-column js-branches-tags-tabs" style="min-height: 0;">
        <div class="SelectMenu-filter">
          <input data-target="input-demux.source"
                 id="context-commitish-filter-field"
                 class="SelectMenu-input form-control"
                 aria-owns="ref-list-branches"
                 data-controls-ref-menu-id="ref-list-branches"
                 autofocus
                 autocomplete="off"
                 aria-label="Filter branches/tags"
                 placeholder="Filter branches/tags"
                 type="text"
          >
        </div>

        <div class="SelectMenu-tabs" role="tablist" data-target="input-demux.control" >
          <button class="SelectMenu-tab" type="button" role="tab" aria-selected="true">Branches</button>
          <button class="SelectMenu-tab" type="button" role="tab">Tags</button>
        </div>

        <div role="tabpanel" id="ref-list-branches" data-filter-placeholder="Filter branches/tags" class="d-flex flex-column flex-auto overflow-auto" tabindex="">
          <ref-selector
            type="branch"
            data-targets="input-demux.sinks"
            data-action="
              input-entered:ref-selector#inputEntered
              tab-selected:ref-selector#tabSelected
              focus-list:ref-selector#focusFirstListMember
            "
            query-endpoint="/astridx/boilerplate/refs"
            
            cache-key="v0:1618218005.105692"
            current-committish="dDZi"
            default-branch="dHV0b3JpYWw="
            name-with-owner="YXN0cmlkeC9ib2lsZXJwbGF0ZQ=="
            prefetch-on-mouseover
          >

            <template data-target="ref-selector.fetchFailedTemplate">
              <div class="SelectMenu-message" data-index="{{ index }}">Could not load branches</div>
            </template>

              <template data-target="ref-selector.noMatchTemplate">
    <div class="SelectMenu-message">Nothing to show</div>
</template>


            <!-- TODO: this max-height is necessary or else the branch list won't scroll.  why? -->
            <div data-target="ref-selector.listContainer" role="menu" class="SelectMenu-list " style="max-height: 330px" data-pjax="#repo-content-pjax-container">
              <div class="SelectMenu-loading pt-3 pb-0" aria-label="Menu is loading">
                <svg style="box-sizing: content-box; color: var(--color-icon-primary);" width="32" height="32" viewBox="0 0 16 16" fill="none" data-view-component="true" class="anim-rotate">
  <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" vector-effect="non-scaling-stroke" />
  <path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke" />
</svg>
              </div>
            </div>

              <template data-target="ref-selector.itemTemplate">
  <a href="https://github.com/astridx/boilerplate/blob/{{ urlEncodedRefName }}/src/administrator/components/com_foos/tmpl/foos/emptystate.php" class="SelectMenu-item" role="menuitemradio" rel="nofollow" aria-checked="{{ isCurrent }}" data-index="{{ index }}">
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check">
    <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
</svg>
    <span class="flex-1 css-truncate css-truncate-overflow {{ isFilteringClass }}">{{ refName }}</span>
    <span hidden="{{ isNotDefault }}" class="Label Label--secondary flex-self-start">default</span>
  </a>
</template>


              <footer class="SelectMenu-footer"><a href="/astridx/boilerplate/branches">View all branches</a></footer>
          </ref-selector>

        </div>

        <div role="tabpanel" id="tags-menu" data-filter-placeholder="Find a tag" class="d-flex flex-column flex-auto overflow-auto" tabindex="" hidden>
          <ref-selector
            type="tag"
            data-action="
              input-entered:ref-selector#inputEntered
              tab-selected:ref-selector#tabSelected
              focus-list:ref-selector#focusFirstListMember
            "
            data-targets="input-demux.sinks"
            query-endpoint="/astridx/boilerplate/refs"
            cache-key="v0:1618218005.105692"
            current-committish="dDZi"
            default-branch="dHV0b3JpYWw="
            name-with-owner="YXN0cmlkeC9ib2lsZXJwbGF0ZQ=="
          >

            <template data-target="ref-selector.fetchFailedTemplate">
              <div class="SelectMenu-message" data-index="{{ index }}">Could not load tags</div>
            </template>

            <template data-target="ref-selector.noMatchTemplate">
              <div class="SelectMenu-message" data-index="{{ index }}">Nothing to show</div>
            </template>

              <template data-target="ref-selector.itemTemplate">
  <a href="https://github.com/astridx/boilerplate/blob/{{ urlEncodedRefName }}/src/administrator/components/com_foos/tmpl/foos/emptystate.php" class="SelectMenu-item" role="menuitemradio" rel="nofollow" aria-checked="{{ isCurrent }}" data-index="{{ index }}">
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check">
    <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
</svg>
    <span class="flex-1 css-truncate css-truncate-overflow {{ isFilteringClass }}">{{ refName }}</span>
    <span hidden="{{ isNotDefault }}" class="Label Label--secondary flex-self-start">default</span>
  </a>
</template>


            <div data-target="ref-selector.listContainer" role="menu" class="SelectMenu-list" style="max-height: 330px" data-pjax="#repo-content-pjax-container">
              <div class="SelectMenu-loading pt-3 pb-0" aria-label="Menu is loading">
                <svg style="box-sizing: content-box; color: var(--color-icon-primary);" width="32" height="32" viewBox="0 0 16 16" fill="none" data-view-component="true" class="anim-rotate">
  <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" vector-effect="non-scaling-stroke" />
  <path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke" />
</svg>
              </div>
            </div>
              <footer class="SelectMenu-footer"><a href="/astridx/boilerplate/tags">View all tags</a></footer>
          </ref-selector>
        </div>
      </tab-container>
    </input-demux>
  </div>
</div>

  </details>

</div>

      <h2 id="blob-path" class="breadcrumb flex-auto flex-self-center min-width-0 text-normal mx-2 width-full width-md-auto flex-order-1 flex-md-order-none mt-3 mt-md-0">
        <span class="js-repo-root text-bold"><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="#repo-content-pjax-container" href="/astridx/boilerplate/tree/t6b"><span>boilerplate</span></a></span></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="#repo-content-pjax-container" href="/astridx/boilerplate/tree/t6b/src"><span>src</span></a></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="#repo-content-pjax-container" href="/astridx/boilerplate/tree/t6b/src/administrator"><span>administrator</span></a></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="#repo-content-pjax-container" href="/astridx/boilerplate/tree/t6b/src/administrator/components"><span>components</span></a></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="#repo-content-pjax-container" href="/astridx/boilerplate/tree/t6b/src/administrator/components/com_foos"><span>com_foos</span></a></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="#repo-content-pjax-container" href="/astridx/boilerplate/tree/t6b/src/administrator/components/com_foos/tmpl"><span>tmpl</span></a></span><span class="separator">/</span><span class="js-path-segment d-inline-block wb-break-all"><a data-pjax="#repo-content-pjax-container" href="/astridx/boilerplate/tree/t6b/src/administrator/components/com_foos/tmpl/foos"><span>foos</span></a></span><span class="separator">/</span><strong class="final-path">emptystate.php</strong>
          <span class="separator">/</span><details class="details-reset details-overlay d-inline" id="jumpto-symbol-select-menu">
  <summary class="btn-link Link--secondary css-truncate" aria-haspopup="true" data-hotkey="r" data-hydro-click="{&quot;event_type&quot;:&quot;code_navigation.click_on_blob_definitions&quot;,&quot;payload&quot;:{&quot;action&quot;:&quot;click_on_blob_definitions&quot;,&quot;repository_id&quot;:82167237,&quot;ref&quot;:&quot;t6b&quot;,&quot;language&quot;:&quot;PHP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="a4f21ae100c2abcac057cff309754ab5c2d0ec7bb028a3ec674390a2f47e0c77">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-code">
    <path fill-rule="evenodd" d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"></path>
</svg>
    <span data-menu-button>Jump to</span>
    <span class="dropdown-caret"></span>
  </summary>
  <details-menu class="SelectMenu SelectMenu--hasFilter" role="menu">
    <div class="SelectMenu-modal">
      <header class="SelectMenu-header">
        <span class="SelectMenu-title">Code definitions</span>
        <button class="SelectMenu-closeButton" type="button" data-toggle-for="jumpto-symbol-select-menu">
          <svg aria-label="Close menu" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
        </button>
      </header>
      <div class="SelectMenu-list">
          <div class="SelectMenu-blankslate">
            <p class="mb-0 color-text-secondary">
              No definitions found in this file.
            </p>
          </div>
        <div data-filterable-for="jumpto-symbols-filter-field" data-filterable-type="substring">
        </div>
      </div>
      <footer class="SelectMenu-footer">
        <div class="d-flex flex-justify-between">
          Code navigation not available for this commit
          <svg class="octicon octicon-dot-fill text-light-gray" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z"></path></svg>
        </div>
      </footer>
    </div>
  </details-menu>
</details>

      </h2>
      <a href="/astridx/boilerplate/find/t6b"
            class="js-pjax-capture-input btn mr-2 d-none d-md-block"
            data-pjax
            data-hotkey="t">
        Go to file
      </a>

      <details id="blob-more-options-details" data-view-component="true" class="details-overlay details-reset position-relative">
  <summary role="button" data-view-component="true" class="btn">
  
            <svg aria-label="More options" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-kebab-horizontal">
    <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
</svg>

  

</summary>
  <div data-view-component="true">          <ul class="dropdown-menu dropdown-menu-sw">
            <li class="d-block d-md-none">
              <a class="dropdown-item d-flex flex-items-baseline" data-hydro-click="{&quot;event_type&quot;:&quot;repository.click&quot;,&quot;payload&quot;:{&quot;target&quot;:&quot;FIND_FILE_BUTTON&quot;,&quot;repository_id&quot;:82167237,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="0c1622779b1a3e3d7ffe12d1df943188073c0799cbc2bdd3e46b525a0110fb4f" data-ga-click="Repository, find file, location:repo overview" data-hotkey="t" data-pjax="true" href="/astridx/boilerplate/find/t6b">
                <span class="flex-auto">Go to file</span>
                <span class="text-small color-text-secondary" aria-hidden="true">T</span>
</a>            </li>
            <li data-toggle-for="blob-more-options-details">
              <button type="button" data-toggle-for="jumpto-line-details-dialog" class="btn-link dropdown-item">
                <span class="d-flex flex-items-baseline">
                  <span class="flex-auto">Go to line</span>
                  <span class="text-small color-text-secondary" aria-hidden="true">L</span>
                </span>
              </button>
            </li>
            <li data-toggle-for="blob-more-options-details">
              <button type="button" data-toggle-for="jumpto-symbol-select-menu" class="btn-link dropdown-item">
                <span class="d-flex flex-items-baseline">
                  <span class="flex-auto">Go to definition</span>
                  <span class="text-small color-text-secondary" aria-hidden="true">R</span>
                </span>
              </button>
            </li>
            <li class="dropdown-divider" role="none"></li>
            <li>
              <clipboard-copy value="src/administrator/components/com_foos/tmpl/foos/emptystate.php" class="dropdown-item cursor-pointer" data-toggle-for="blob-more-options-details">
                Copy path
              </clipboard-copy>
            </li>
            <li>
              <clipboard-copy value="https://github.com/astridx/boilerplate/blob/afa70b74db7a90f7887981cc31329b69a00b5e1b/src/administrator/components/com_foos/tmpl/foos/emptystate.php" class="dropdown-item cursor-pointer" data-toggle-for="blob-more-options-details" >
                <span class="d-flex flex-items-baseline">
                  <span class="flex-auto">Copy permalink</span>
                </span>
              </clipboard-copy>
            </li>
          </ul>
</div>
</details>    </div>




    <div class="Box d-flex flex-column flex-shrink-0 mb-3">
      <include-fragment src="/astridx/boilerplate/contributors/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php" class="commit-loader">
        <div class="Box-header hx_commit-tease d-flex flex-items-center">
          <div class="Skeleton avatar avatar-user flex-shrink-0 ml-n1 mr-n1 mt-n1 mb-n1" style="width:24px;height:24px;"></div>
          <div class="Skeleton Skeleton--text col-5 ml-2">&nbsp;</div>
        </div>

        <div class="Box-body d-flex flex-items-center" >
          <div class="Skeleton Skeleton--text col-1">&nbsp;</div>
          <span class="color-text-danger h6 loader-error">Cannot retrieve contributors at this time</span>
        </div>
</include-fragment>    </div>








  
    <div data-target="readme-toc.content" class="Box mt-3 position-relative
    ">
      
  <div
    class="Box-header py-2 pr-2 d-flex flex-shrink-0 flex-md-row flex-items-center"
    
  >


  <div class="text-mono f6 flex-auto pr-3 flex-order-2 flex-md-order-1">

      27 lines (22 sloc)
      <span class="file-info-divider"></span>
    834 Bytes
  </div>

  <div class="d-flex py-1 py-md-0 flex-auto flex-order-1 flex-md-order-2 flex-sm-grow-0 flex-justify-between hide-sm hide-md">

    <div class="BtnGroup">
      <a href="/astridx/boilerplate/raw/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php" id="raw-url" role="button" data-view-component="true" class="btn-sm btn BtnGroup-item">
  
  Raw
  

</a>
        <a href="/astridx/boilerplate/blame/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php" data-hotkey="b" role="button" data-view-component="true" class="js-update-url-with-hash btn-sm btn BtnGroup-item">
  
  Blame
  

</a>
    </div>

    <div>
          <a class="btn-octicon tooltipped tooltipped-nw js-remove-unless-platform"
             data-platforms="windows,mac"
             href="https://desktop.github.com"
             aria-label="Open this file in GitHub Desktop"
             data-ga-click="Repository, open with desktop">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-device-desktop">
    <path fill-rule="evenodd" d="M1.75 2.5h12.5a.25.25 0 01.25.25v7.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25v-7.5a.25.25 0 01.25-.25zM14.25 1H1.75A1.75 1.75 0 000 2.75v7.5C0 11.216.784 12 1.75 12h3.727c-.1 1.041-.52 1.872-1.292 2.757A.75.75 0 004.75 16h6.5a.75.75 0 00.565-1.243c-.772-.885-1.193-1.716-1.292-2.757h3.727A1.75 1.75 0 0016 10.25v-7.5A1.75 1.75 0 0014.25 1zM9.018 12H6.982a5.72 5.72 0 01-.765 2.5h3.566a5.72 5.72 0 01-.765-2.5z"></path>
</svg>
          </a>

          <a href="/login?return_to=https%3A%2F%2Fgithub.com%2Fastridx%2Fboilerplate%2Fblob%2Ft6b%2Fsrc%2Fadministrator%2Fcomponents%2Fcom_foos%2Ftmpl%2Ffoos%2Femptystate.php" class="btn-octicon disabled tooltipped tooltipped-nw"
            aria-label="You must be signed in to make or propose changes">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-pencil">
    <path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path>
</svg>
          </a>
          <a href="/login?return_to=https%3A%2F%2Fgithub.com%2Fastridx%2Fboilerplate%2Fblob%2Ft6b%2Fsrc%2Fadministrator%2Fcomponents%2Fcom_foos%2Ftmpl%2Ffoos%2Femptystate.php" class="btn-octicon btn-octicon-danger disabled tooltipped tooltipped-nw"
            aria-label="You must be signed in to make or propose changes">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-trash">
    <path fill-rule="evenodd" d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"></path>
</svg>
          </a>
    </div>
  </div>

    <div class="d-flex hide-lg hide-xl flex-order-2 flex-grow-0">
      <details class="dropdown details-reset details-overlay d-inline-block">
        <summary class="btn-octicon" aria-haspopup="true" aria-label="possible actions">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-kebab-horizontal">
    <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
</svg>
        </summary>

        <ul class="dropdown-menu dropdown-menu-sw">
            <li>
                <a class="dropdown-item tooltipped tooltipped-nw js-remove-unless-platform"
                   data-platforms="windows,mac"
                   href="https://desktop.github.com"
                   data-ga-click="Repository, open with desktop">
                  Open with Desktop
                </a>
            </li>
          <li>
            <a class="dropdown-item" href="/astridx/boilerplate/raw/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php">
              View raw
            </a>
          </li>
            <li>
              <a class="dropdown-item" href="/astridx/boilerplate/blame/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php">
                View blame
              </a>
            </li>

        </ul>
      </details>
    </div>
</div>


      
  <div itemprop="text" class="Box-body p-0 blob-wrapper data type-php  gist-border-0">

      
<table class="highlight tab-size js-file-line-container" data-tab-size="8" data-paste-markdown-skip>
      <tr>
        <td id="L1" class="blob-num js-line-number" data-line-number="1"></td>
        <td id="LC1" class="blob-code blob-code-inner js-file-line"><span class=pl-ent>&lt;?php</span></td>
      </tr>
      <tr>
        <td id="L2" class="blob-num js-line-number" data-line-number="2"></td>
        <td id="LC2" class="blob-code blob-code-inner js-file-line"><span class=pl-c>/**</span></td>
      </tr>
      <tr>
        <td id="L3" class="blob-num js-line-number" data-line-number="3"></td>
        <td id="LC3" class="blob-code blob-code-inner js-file-line"><span class=pl-c> * @package     Joomla.Administrator</span></td>
      </tr>
      <tr>
        <td id="L4" class="blob-num js-line-number" data-line-number="4"></td>
        <td id="LC4" class="blob-code blob-code-inner js-file-line"><span class=pl-c> * @subpackage  com_foos</span></td>
      </tr>
      <tr>
        <td id="L5" class="blob-num js-line-number" data-line-number="5"></td>
        <td id="LC5" class="blob-code blob-code-inner js-file-line"><span class=pl-c> *</span></td>
      </tr>
      <tr>
        <td id="L6" class="blob-num js-line-number" data-line-number="6"></td>
        <td id="LC6" class="blob-code blob-code-inner js-file-line"><span class=pl-c> * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.</span></td>
      </tr>
      <tr>
        <td id="L7" class="blob-num js-line-number" data-line-number="7"></td>
        <td id="LC7" class="blob-code blob-code-inner js-file-line"><span class=pl-c> * @license     GNU General Public License version 2 or later; see LICENSE.txt</span></td>
      </tr>
      <tr>
        <td id="L8" class="blob-num js-line-number" data-line-number="8"></td>
        <td id="LC8" class="blob-code blob-code-inner js-file-line"><span class=pl-c> */</span></td>
      </tr>
      <tr>
        <td id="L9" class="blob-num js-line-number" data-line-number="9"></td>
        <td id="LC9" class="blob-code blob-code-inner js-file-line"><span class=pl-en>\defined</span>(<span class=pl-s>&#39;_JEXEC&#39;</span>) or die;</td>
      </tr>
      <tr>
        <td id="L10" class="blob-num js-line-number" data-line-number="10"></td>
        <td id="LC10" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L11" class="blob-num js-line-number" data-line-number="11"></td>
        <td id="LC11" class="blob-code blob-code-inner js-file-line"><span class=pl-k>use</span> <span class=pl-v>Joomla</span>\<span class=pl-c1>CMS</span>\<span class=pl-v>Factory</span>;</td>
      </tr>
      <tr>
        <td id="L12" class="blob-num js-line-number" data-line-number="12"></td>
        <td id="LC12" class="blob-code blob-code-inner js-file-line"><span class=pl-k>use</span> <span class=pl-v>Joomla</span>\<span class=pl-c1>CMS</span>\<span class=pl-v>Layout</span>\<span class=pl-v>LayoutHelper</span>;</td>
      </tr>
      <tr>
        <td id="L13" class="blob-num js-line-number" data-line-number="13"></td>
        <td id="LC13" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L14" class="blob-num js-line-number" data-line-number="14"></td>
        <td id="LC14" class="blob-code blob-code-inner js-file-line"><span class=pl-s1><span class=pl-c1>$</span>displayData</span> = [</td>
      </tr>
      <tr>
        <td id="L15" class="blob-num js-line-number" data-line-number="15"></td>
        <td id="LC15" class="blob-code blob-code-inner js-file-line">	<span class=pl-s>&#39;textPrefix&#39;</span> =&gt; <span class=pl-s>&#39;COM_FOOS&#39;</span>,</td>
      </tr>
      <tr>
        <td id="L16" class="blob-num js-line-number" data-line-number="16"></td>
        <td id="LC16" class="blob-code blob-code-inner js-file-line">	<span class=pl-s>&#39;formURL&#39;</span> =&gt; <span class=pl-s>&#39;index.php?option=com_foos&#39;</span>,</td>
      </tr>
      <tr>
        <td id="L17" class="blob-num js-line-number" data-line-number="17"></td>
        <td id="LC17" class="blob-code blob-code-inner js-file-line">	<span class=pl-s>&#39;helpURL&#39;</span> =&gt; <span class=pl-s>&#39;https://github.com/astridx/boilerplate#readme&#39;</span>,</td>
      </tr>
      <tr>
        <td id="L18" class="blob-num js-line-number" data-line-number="18"></td>
        <td id="LC18" class="blob-code blob-code-inner js-file-line">	<span class=pl-s>&#39;icon&#39;</span> =&gt; <span class=pl-s>&#39;icon-copy&#39;</span>,</td>
      </tr>
      <tr>
        <td id="L19" class="blob-num js-line-number" data-line-number="19"></td>
        <td id="LC19" class="blob-code blob-code-inner js-file-line">];</td>
      </tr>
      <tr>
        <td id="L20" class="blob-num js-line-number" data-line-number="20"></td>
        <td id="LC20" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L21" class="blob-num js-line-number" data-line-number="21"></td>
        <td id="LC21" class="blob-code blob-code-inner js-file-line"><span class=pl-s1><span class=pl-c1>$</span>user</span> = <span class=pl-v>Factory</span>::<span class=pl-en>getApplication</span>()-&gt;<span class=pl-en>getIdentity</span>();</td>
      </tr>
      <tr>
        <td id="L22" class="blob-num js-line-number" data-line-number="22"></td>
        <td id="LC22" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L23" class="blob-num js-line-number" data-line-number="23"></td>
        <td id="LC23" class="blob-code blob-code-inner js-file-line"><span class=pl-k>if</span> (<span class=pl-s1><span class=pl-c1>$</span>user</span>-&gt;<span class=pl-en>authorise</span>(<span class=pl-s>&#39;core.create&#39;</span>, <span class=pl-s>&#39;com_foos&#39;</span>) || <span class=pl-en>count</span>(<span class=pl-s1><span class=pl-c1>$</span>user</span>-&gt;<span class=pl-en>getAuthorisedCategories</span>(<span class=pl-s>&#39;com_foos&#39;</span>, <span class=pl-s>&#39;core.create&#39;</span>)) &gt; <span class=pl-c1>0</span>) {</td>
      </tr>
      <tr>
        <td id="L24" class="blob-num js-line-number" data-line-number="24"></td>
        <td id="LC24" class="blob-code blob-code-inner js-file-line">	<span class=pl-s1><span class=pl-c1>$</span>displayData</span>[<span class=pl-s>&#39;createURL&#39;</span>] = <span class=pl-s>&#39;index.php?option=com_foos&amp;task=foo.add&#39;</span>;</td>
      </tr>
      <tr>
        <td id="L25" class="blob-num js-line-number" data-line-number="25"></td>
        <td id="LC25" class="blob-code blob-code-inner js-file-line">}</td>
      </tr>
      <tr>
        <td id="L26" class="blob-num js-line-number" data-line-number="26"></td>
        <td id="LC26" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L27" class="blob-num js-line-number" data-line-number="27"></td>
        <td id="LC27" class="blob-code blob-code-inner js-file-line"><span class=pl-k>echo</span> <span class=pl-v>LayoutHelper</span>::<span class=pl-en>render</span>(<span class=pl-s>&#39;joomla.content.emptystate&#39;</span>, <span class=pl-s1><span class=pl-c1>$</span>displayData</span>);</td>
      </tr>
</table>

  <details class="details-reset details-overlay BlobToolbar position-absolute js-file-line-actions dropdown d-none" aria-hidden="true">
    <summary class="btn-octicon ml-0 px-2 p-0 color-bg-primary border color-border-tertiary rounded-1" aria-label="Inline file action toolbar">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-kebab-horizontal">
    <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
</svg>
    </summary>
    <details-menu>

      <ul class="BlobToolbar-dropdown dropdown-menu dropdown-menu-se ml-2 mt-2"
      style="width:185px"
      >
        <li>
          <clipboard-copy role="menuitem" class="dropdown-item" id="js-copy-lines" style="cursor:pointer;">
            Copy lines
          </clipboard-copy>
        </li>
        <li>
          <clipboard-copy role="menuitem" class="dropdown-item" id="js-copy-permalink" style="cursor:pointer;">
            Copy permalink
          </clipboard-copy>
        </li>
        <li><a class="dropdown-item js-update-url-with-hash" id="js-view-git-blame" role="menuitem" href="/astridx/boilerplate/blame/afa70b74db7a90f7887981cc31329b69a00b5e1b/src/administrator/components/com_foos/tmpl/foos/emptystate.php">View git blame</a></li>
          <li><a class="dropdown-item" id="js-new-issue" role="menuitem" href="/astridx/boilerplate/issues/new">Reference in new issue</a></li>
      </ul>
    </details-menu>
  </details>

  </div>

    </div>


  

  <details class="details-reset details-overlay details-overlay-dark" id="jumpto-line-details-dialog">
    <summary data-hotkey="l" aria-label="Jump to line"></summary>
    <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast linejump" aria-label="Jump to line">
      <!-- '"` --><!-- </textarea></xmp> --></option></form><form class="js-jump-to-line-form Box-body d-flex" action="" accept-charset="UTF-8" method="get">
        <input class="form-control flex-auto mr-3 linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" aria-label="Jump to line" autofocus>
        <button data-close-dialog="" type="submit" data-view-component="true" class="btn">
  
  Go
  

</button>
</form>    </details-dialog>
  </details>

    <div class="Popover anim-scale-in js-tagsearch-popover"
     hidden
     data-tagsearch-url="/astridx/boilerplate/find-definition"
     data-tagsearch-ref="t6b"
     data-tagsearch-path="src/administrator/components/com_foos/tmpl/foos/emptystate.php"
     data-tagsearch-lang="PHP"
     data-hydro-click="{&quot;event_type&quot;:&quot;code_navigation.click_on_symbol&quot;,&quot;payload&quot;:{&quot;action&quot;:&quot;click_on_symbol&quot;,&quot;repository_id&quot;:82167237,&quot;ref&quot;:&quot;t6b&quot;,&quot;language&quot;:&quot;PHP&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}"
     data-hydro-click-hmac="6d17c10e1672e6102341f67175fafbb196379ed55698d3b6b864bc1734b68c2a">
  <div class="Popover-message Popover-message--large Popover-message--top-left TagsearchPopover mt-1 mb-4 mx-auto Box color-shadow-large">
    <div class="TagsearchPopover-content js-tagsearch-popover-content overflow-auto" style="will-change:transform;">
    </div>
  </div>
</div>


</div>



  </div>
</div>

    </main>
  </div>

  </div>

          
<div class="footer container-xl width-full p-responsive" role="contentinfo">
  <div class="position-relative d-flex flex-row-reverse flex-lg-row flex-wrap flex-lg-nowrap flex-justify-center flex-lg-justify-between pt-6 pb-2 mt-6 f6 color-text-secondary border-top color-border-secondary ">
    <ul class="list-style-none d-flex flex-wrap col-12 col-lg-5 flex-justify-center flex-lg-justify-between mb-2 mb-lg-0">
      <li class="mr-3 mr-lg-0">&copy; 2021 GitHub, Inc.</li>
        <li class="mr-3 mr-lg-0"><a href="https://docs.github.com/en/github/site-policy/github-terms-of-service" data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Footer&quot;,&quot;action&quot;:&quot;go to terms&quot;,&quot;label&quot;:&quot;text:terms&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="f2a3a66eb6d74c299eab3137204e24265e522b4be5d10c868bd4f67b03311c71">Terms</a></li>
        <li class="mr-3 mr-lg-0"><a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Footer&quot;,&quot;action&quot;:&quot;go to privacy&quot;,&quot;label&quot;:&quot;text:privacy&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="8740278eb675ee3d547912bd3a07da5186c484f18cda6e23b433e57cb6a15e7d">Privacy</a></li>
        <li class="mr-3 mr-lg-0"><a data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Footer&quot;,&quot;action&quot;:&quot;go to security&quot;,&quot;label&quot;:&quot;text:security&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="b092532a5c657ba144b1b838ac5a3527cb1a91039692f1c639336a66853690b9" href="https://github.com/security">Security</a></li>
        <li class="mr-3 mr-lg-0"><a href="https://www.githubstatus.com/" data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Footer&quot;,&quot;action&quot;:&quot;go to status&quot;,&quot;label&quot;:&quot;text:status&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="b668fc976e9c6029ed4b865e65d3bb0c76a46f4cbcceb9f4df484f1bf678667f">Status</a></li>
        <li><a data-ga-click="Footer, go to help, text:Docs" href="https://docs.github.com">Docs</a></li>
    </ul>

    <a aria-label="Homepage" title="GitHub" class="footer-octicon d-none d-lg-block mx-lg-4" href="https://github.com">
      <svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="octicon octicon-mark-github">
    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
</svg>
</a>
    <ul class="list-style-none d-flex flex-wrap col-12 col-lg-5 flex-justify-center flex-lg-justify-between mb-2 mb-lg-0">
        <li class="mr-3 mr-lg-0"><a href="https://support.github.com" data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Footer&quot;,&quot;action&quot;:&quot;go to contact&quot;,&quot;label&quot;:&quot;text:contact&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="45171226ea3ad5e1c51aaa71c8080f67c9c9cb28cf0605c69395e30298aa931d">Contact GitHub</a></li>
        <li class="mr-3 mr-lg-0"><a href="https://github.com/pricing" data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Footer&quot;,&quot;action&quot;:&quot;go to Pricing&quot;,&quot;label&quot;:&quot;text:Pricing&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="469077f627ac87fd7d8f98cb14a4370d75e9be1a0ae40caa6a899e068b8183ec">Pricing</a></li>
      <li class="mr-3 mr-lg-0"><a href="https://docs.github.com" data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Footer&quot;,&quot;action&quot;:&quot;go to api&quot;,&quot;label&quot;:&quot;text:api&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="20b605fb804fd295795785d410466f81eb30c01cbe788da173fe3a63f880b870">API</a></li>
      <li class="mr-3 mr-lg-0"><a href="https://services.github.com" data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Footer&quot;,&quot;action&quot;:&quot;go to training&quot;,&quot;label&quot;:&quot;text:training&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="cbf5809a6f6aec335ca0688b635bb4d227e59ea6adb39f3d183803a7833afe92">Training</a></li>
        <li class="mr-3 mr-lg-0"><a href="https://github.blog" data-hydro-click="{&quot;event_type&quot;:&quot;analytics.event&quot;,&quot;payload&quot;:{&quot;category&quot;:&quot;Footer&quot;,&quot;action&quot;:&quot;go to blog&quot;,&quot;label&quot;:&quot;text:blog&quot;,&quot;originating_url&quot;:&quot;https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php&quot;,&quot;user_id&quot;:null}}" data-hydro-click-hmac="1da9bb189736e8ea2fe11c853d48fe0001ba0e6e78b375d76c75e5d1b56908f0">Blog</a></li>
        <li><a data-ga-click="Footer, go to about, text:about" href="https://github.com/about">About</a></li>
    </ul>
  </div>
  <div class="d-flex flex-justify-center pb-6">
    <span class="f6 color-text-tertiary"></span>
  </div>

  
</div>



  <div id="ajax-error-message" class="ajax-error-message flash flash-error" hidden>
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-alert">
    <path fill-rule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path>
</svg>
    <button type="button" class="flash-close js-ajax-error-dismiss" aria-label="Dismiss error">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
    </button>
    You can’t perform that action at this time.
  </div>

  <div class="js-stale-session-flash flash flash-warn flash-banner" hidden
    >
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-alert">
    <path fill-rule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path>
</svg>
    <span class="js-stale-session-flash-signed-in" hidden>You signed in with another tab or window. <a href="">Reload</a> to refresh your session.</span>
    <span class="js-stale-session-flash-signed-out" hidden>You signed out in another tab or window. <a href="">Reload</a> to refresh your session.</span>
  </div>
    <template id="site-details-dialog">
  <details class="details-reset details-overlay details-overlay-dark lh-default color-text-primary hx_rsm" open>
    <summary role="button" aria-label="Close dialog"></summary>
    <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast hx_rsm-dialog hx_rsm-modal">
      <button class="Box-btn-octicon m-0 btn-octicon position-absolute right-0 top-0" type="button" aria-label="Close dialog" data-close-dialog>
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
      </button>
      <div class="octocat-spinner my-6 js-details-dialog-spinner"></div>
    </details-dialog>
  </details>
</template>

    <div class="Popover js-hovercard-content position-absolute" style="display: none; outline: none;" tabindex="0">
  <div class="Popover-message Popover-message--bottom-left Popover-message--large Box color-shadow-large" style="width:360px;">
  </div>
</div>

    <template id="snippet-clipboard-copy-button">
  <div class="zeroclipboard-container position-absolute right-0 top-0">
    <clipboard-copy aria-label="Copy" class="ClipboardButton btn js-clipboard-copy m-2 p-0 tooltipped-no-delay" data-copy-feedback="Copied!" data-tooltip-direction="w">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-paste js-clipboard-clippy-icon m-2">
    <path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path>
</svg>
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check js-clipboard-check-icon color-text-success d-none m-2">
    <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
</svg>
    </clipboard-copy>
  </div>
</template>



  

  </body>
</html>


```

> `'icon' => 'icon-copy'` only works with the icons that are included by name in the file [build/media_source/system/scss/\_icomoon.scss](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/scss/_icomoon.scss)[^build/media_source/system/scss/_icomoon.scss]. I explained why this is so in the preface. Adjust the layout for the icon if you want to display a different symbol.

The Empty State layout has been integrated into Joomla in [PR 33264](https://github.com/joomla/joomla-cms/pull/33264)[github.com/joomla/joomla-cms/pull/33264].

> Good design is already a challenge when there is data to display. It is even more difficult to implement an empty page in a user-friendly way. Have a look at [emptystat.es](https://emptystat.es/) if you want to get inspired about your Empty State implementation. 

### Modified files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-1ff20be1dacde6c4c8e68e90161e0578)

To ensure that the 'forms' directory is passed to Joomla during a new installation, enter it in the installation manifest.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/foos.xml)

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

In the view that displays the overview list, we add the toolbar. Here we insert a button that creates a new element. We also query with `if (!count($this->items) && $this->get('IsEmptyState'))` whether there are items to display. If the view is empty, we display the user-friendly Empty State layout `$this->setLayout('emptystate');`.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

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
#### [administrator/components/com\_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-3186af99ea4e3321b497b86fcd1cd757)

In the template of the overview list, we replace the simple text with a form. The form contains a form field for each column in the database table and makes it possible to create or change data.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/tmpl/foos/default.php)

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

5. delete all Foo-Items via the database and make sure that the Empty-State layout is displayed. Have you not yet edited the database yourself? In the previous section I suggested [phpmyadmin.net](https://www.phpmyadmin.net/) as a tool. In the following you will see the standard view followed by our user-friendly Empty State version for comparison. In the next but one section we will take care of the language files, then the layout will be perfect.

![Edit Joomla Component in Backend - Empty View without Empty State Layout](/images/j4x8x10.png)

![Edit Joomla Component in Backend - Empty View with Empty State Layout](/images/j4x8x11.png)
