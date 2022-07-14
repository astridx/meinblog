---
description: 'desc'
shortTitle: 'short'
date: 2021-02-02
title: 'Multilingualism - Multilingual Associations'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-mehrsprachigkeit
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

With Joomla it is possible to set up a multilingual website without installing third party extensions. In this tutorial, I'll show you how to program your component to support language linking.<!-- \index{multilingual associations} -->

> Multilingualism and language links: Multilingual content, menu items and language switches are set up with a standard Joomla installation without any additional extensions. Until version 3.7, Joomla required switching between views to translate content. Since 3.7 there is an improvement in usability, the so-called Multilingual Associations. With this extension, multilingual content can be created and linked in a user-friendly way. Thereby one remains in one view. The language links show incidentally which multilingual content is missing.

The chapter is one of the most extensive in this series. For that it covers all areas of multilingualism and language links in Joomla.

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t14b...t15a)[^github.com/astridx/boilerplate/compare/t14b...t15a] and copy these changes into your development version.

## Step by step

### New files

So that the language is saved to the element, we add a column to the database table. When updating the component, the script `15.0.0.sql` is the one that is executed for version 15.0.0.

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ sql/updates/mysql/15.0.0.sql

[administrator/components/com_foos/ sql/updates/mysql/15.0.0.sql](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t15a/src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*' AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Helper/AssociationsHelper.php

The helper file `AssociationsHelper.php` is the interface to the language associations component `com_associations`. `AssociationsHelper.php` exists in the frontend and the backend - we'll look at the latter first, the frontend version comes later in this chapter.

In this helper file we provide the details that are specific to our component, so that Joomla's own routines can find their way around in our component.

[administrator/components/com_foos/ src/Helper/AssociationsHelper.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Helper/AssociationsHelper.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t15a/src/administrator/components/com_foos/src/Helper/AssociationsHelper.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Association\AssociationExtensionHelper;
use Joomla\CMS\Language\Associations;
use Joomla\CMS\Table\Table;
use FooNamespace\Component\Foos\Site\Helper\AssociationHelper;

/**
 * Content associations helper.
 *
 * @since  __BUMP_VERSION__
 */
class AssociationsHelper extends AssociationExtensionHelper
{
	/**
	 * The extension name
	 *
	 * @var     array   $extension
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected $extension = 'com_foos';

	/**
	 * Array of item types
	 *
	 * @var     array   $itemTypes
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected $itemTypes = ['foo', 'category'];

	/**
	 * Has the extension association support
	 *
	 * @var     boolean   $associationsSupport
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected $associationsSupport = true;

	/**
	 * Method to get the associations for a given item.
	 *
	 * @param   integer  $id    Id of the item
	 * @param   string   $view  Name of the view
	 *
	 * @return  array   Array of associations for the item
	 *
	 * @since  __BUMP_VERSION__
	 */
	public function getAssociationsForItem($id = 0, $view = null)
	{
		return AssociationHelper::getAssociations($id, $view);
	}

	/**
	 * Get the associated items for an item
	 *
	 * @param   string  $typeName  The item type
	 * @param   int     $id        The id of item for which we need the associated items
	 *
	 * @return  array
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function getAssociations($typeName, $id)
	{
		$type = $this->getType($typeName);

		$context    = $this->extension . '.item';
		$catidField = 'catid';

		if ($typeName === 'category') {
			$context    = 'com_categories.item';
			$catidField = '';
		}

		// Get the associations.
		$associations = Associations::getAssociations(
			$this->extension,
			$type['tables']['a'],
			$context,
			$id,
			'id',
			'alias',
			$catidField
		);

		return $associations;
	}

	/**
	 * Get item information
	 *
	 * @param   string  $typeName  The item type
	 * @param   int     $id        The id of item for which we need the associated items
	 *
	 * @return  Table|null
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function getItem($typeName, $id)
	{
		if (empty($id)) {
			return null;
		}

		$table = null;

		switch ($typeName) {
			case 'foo':
				$table = Table::getInstance('FooTable', 'FooNamespace\\Component\\Foos\\Administrator\\Table\\');
				break;

			case 'category':
				$table = Table::getInstance('Category');
				break;
		}

		if (empty($table)) {
			return null;
		}

		$table->load($id);

		return $table;
	}

	/**
	 * Get information about the type
	 *
	 * @param   string  $typeName  The item type
	 *
	 * @return  array  Array of item types
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function getType($typeName = '')
	{
		$fields  = $this->getFieldsTemplate();
		$tables  = [];
		$joins   = [];
		$support = $this->getSupportTemplate();
		$title   = '';

		if (in_array($typeName, $this->itemTypes)) {
			switch ($typeName) {
				case 'foo':
					$fields['title'] = 'a.name';
					$fields['state'] = 'a.published';

					$support['state'] = true;
					$support['acl'] = true;
					$support['category'] = true;
					$support['save2copy'] = true;

					$tables = [
						'a' => '#__foos_details'
					];

					$title = 'foo';
					break;

				case 'category':
					$fields['created_user_id'] = 'a.created_user_id';
					$fields['ordering'] = 'a.lft';
					$fields['level'] = 'a.level';
					$fields['catid'] = '';
					$fields['state'] = 'a.published';

					$support['state'] = true;
					$support['acl'] = true;
					$support['checkout'] = false;
					$support['level'] = false;

					$tables = [
						'a' => '#__categories'
					];

					$title = 'category';
					break;
			}
		}

		return [
			'fields'  => $fields,
			'support' => $support,
			'tables'  => $tables,
			'joins'   => $joins,
			'title'   => $title
		];
	}

	/**
	 * Get default values for fields array
	 *
	 * @return  array
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function getFieldsTemplate()
	{
		return [
			'id'                  => 'a.id',
			'title'               => 'a.title',
			'alias'               => 'a.alias',
			'ordering'            => '',
			'menutype'            => '',
			'level'               => '',
			'catid'               => 'a.catid',
			'language'            => 'a.language',
			'access'              => 'a.access',
			'state'               => 'a.state',
			'created_user_id'     => '',
			'checked_out'         => '',
			'checked_out_time'    => ''
		];
	}
}

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foo/edit_associations.php

We don't have any special requests, so we use the default template to edit the language associations. You can find it in the directory `/layouts/joomla/ edit/associations.php`. How to load it is shown in the following example code.

> If you have special wishes, copy `/layouts/joomla/ edit/associations.php` into your component and change it as you wish. How and where you save or call them will be discussed later in the chapter on layouts.

[administrator/components/com_foos/ tmpl/foo/edit_associations.php](https://github.com/astridx/boilerplate/blob/t15a/src/administrator/components/com_foos/tmpl/foo/edit_associations.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t15a/src/administrator/components/com_foos/tmpl/foo/edit_associations.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Layout\LayoutHelper;

echo LayoutHelper::render('joomla.edit.associations', $this);
```

<!-- prettier-ignore -->
#### components/com\_foos/ src/Helper/AssociationHelper.php

The `AssociationsHelper.php` helper file is the interface to the `com_associations` language associations component. In it we configure the information that is specific to our component. Once this is done, Joomla's own routines take over and we don't reinvent the wheel.

> Attention: I had already written it: The class `AssociationsHelper.php` exists in the frontend and in the backend: `src/components/com_foos/ src/Helper/AssociationHelper.php` and `src/` `administrator` `/components/com_foos/ src/Helper/AssociationHelper.php`. We had already looked at the file for the backend before.

[components/com_foos/ src/Helper/AssociationHelper.php](https://github.com/astridx/boilerplate/blob/t15a/src/Helper/AssociationHelper.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t15a/src/components/com_foos/src/Helper/AssociationHelper.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Associations;
use Joomla\Component\Categories\Administrator\Helper\CategoryAssociationHelper;
use FooNamespace\Component\Foos\Site\Helper\RouteHelper;

/**
 * Foos Component Association Helper
 *
 * @since  __BUMP_VERSION__
 */
abstract class AssociationHelper extends CategoryAssociationHelper
{
	/**
	 * Method to get the associations for a given item
	 *
	 * @param   integer  $id    Id of the item
	 * @param   string   $view  Name of the view
	 *
	 * @return  array   Array of associations for the item
	 *
	 * @since  __BUMP_VERSION__
	 */
	public static function getAssociations($id = 0, $view = null)
	{
		$jinput = Factory::getApplication()->input;
		$view = $view ?? $jinput->get('view');
		$id = empty($id) ? $jinput->getInt('id') : $id;

		if ($view === 'foos') {
			if ($id) {
				$associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $id);

				$return = [];

				foreach ($associations as $tag => $item) {
					$return[$tag] = RouteHelper::getFoosRoute($item->id, (int) $item->catid, $item->language);
				}

				return $return;
			}
		}

		if ($view === 'category' || $view === 'categories') {
			return self::getCategoryAssociations($id, 'com_foos');
		}

		return [];
	}
}

```

<!-- prettier-ignore -->
#### components/com\_foos/ src/Helper/RouteHelper.php

We create the class `RouteHelper` to correctly compose the links we create in this chapter. Within the link there is one more piece of information as a parameter: the language.<!-- \index{routing} -->

[components/com_foos/ src/Helper/RouteHelper.php](https://github.com/astridx/boilerplate/blob/t15a/src/components/com_foos/src/Helper/RouteHelper.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t15a/src/components/com_foos/src/Helper/RouteHelper.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Categories\CategoryNode;
use Joomla\CMS\Language\Multilanguage;

/**
 * Foos Component Route Helper
 *
 * @static
 * @package     Joomla.Site
 * @subpackage  com_foos
 * @since       __DEPLOY_VERSION__
 */
abstract class RouteHelper
{
	/**
	 * Get the URL route for a foos from a foo ID, foos category ID and language
	 *
	 * @param   integer  $id        The id of the foos
	 * @param   integer  $catid     The id of the foos's category
	 * @param   mixed    $language  The id of the language being used.
	 *
	 * @return  string  The link to the foos
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public static function getFoosRoute($id, $catid, $language = 0)
	{
		// Create the link
		$link = 'index.php?option=com_foos&view=foos&id=' . $id;

		if ($catid > 1) {
			$link .= '&catid=' . $catid;
		}

		if ($language && $language !== '*' && Multilanguage::isEnabled()) {
			$link .= '&lang=' . $language;
		}

		return $link;
	}

	/**
	 * Get the URL route for a foo from a foo ID, foos category ID and language
	 *
	 * @param   integer  $id        The id of the foos
	 * @param   integer  $catid     The id of the foos's category
	 * @param   mixed    $language  The id of the language being used.
	 *
	 * @return  string  The link to the foos
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public static function getFooRoute($id, $catid, $language = 0)
	{
		// Create the link
		$link = 'index.php?option=com_foos&view=foo&id=' . $id;

		if ($catid > 1) {
			$link .= '&catid=' . $catid;
		}

		if ($language && $language !== '*' && Multilanguage::isEnabled()) {
			$link .= '&lang=' . $language;
		}

		return $link;
	}

	/**
	 * Get the URL route for a foos category from a foos category ID and language
	 *
	 * @param   mixed  $catid     The id of the foos's category either an integer id or an instance of CategoryNode
	 * @param   mixed  $language  The id of the language being used.
	 *
	 * @return  string  The link to the foos
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public static function getCategoryRoute($catid, $language = 0)
	{
		if ($catid instanceof CategoryNode) {
			$id = $catid->id;
		} else {
			$id = (int) $catid;
		}

		if ($id < 1) {
			$link = '';
		} else {
			// Create the link
			$link = 'index.php?option=com_foos&view=category&id=' . $id;

			if ($language && $language !== '*' && Multilanguage::isEnabled()) {
				$link .= '&lang=' . $language;
			}
		}

		return $link;
	}
}

```

### Modified files

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ forms/foo.xml

We create a field through which an author selects the language link. This is the field `name="language"`. In order for Joomla to find this field, we add the path in the form `addfieldprefix= "FooNamespace\Component\Foos\Administrator\Field"` as a parameter in the `<fieldset>`.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/fc08495c9bf14cb79315da7a3a5a95064351e2a0/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
 <?xml version="1.0" encoding="utf-8"?>
 <form>
-	<fieldset addruleprefix="FooNamespace\Component\Foos\Administrator\Rule">
+	<fieldset
+		addruleprefix="FooNamespace\Component\Foos\Administrator\Rule"
+		addfieldprefix="FooNamespace\Component\Foos\Administrator\Field"
+	>
 		<field
 			name="id"
 			type="number"

 			hint="JFIELD_ALIAS_PLACEHOLDER"
 		/>

+		<field
+			name="language"
+			type="contentlanguage"
+			label="JFIELD_LANGUAGE_LABEL"
+			>
+			<option value="*">JALL</option>
+		</field>
+
 		<field
 			name="published"
 			type="list"
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ services/provider.php

In the provider we register our `AssociationsHelper` as a service that implements [AssociationExtensionInterface](https://github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/Association/AssociationExtensionInterface.php)[^github.com/joomla/joomla-cms/blob/4.0-dev/ libraries/src/association/associationextensioninterface.php]. This way we ensure that all necessary functions are inherited into our component and are thus available.

[administrator/components/com_foos/ services/provider.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/services/provider.php)

```php {diff}
 use Joomla\DI\Container;
 use Joomla\DI\ServiceProviderInterface;
 use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;
+use FooNamespace\Component\Foos\Administrator\Helper\AssociationsHelper;
+use Joomla\CMS\Association\AssociationExtensionInterface;

 /**
  * The foos service provider.

 	 */
 	public function register(Container $container)
 	{
+		$container->set(AssociationExtensionInterface::class, new AssociationsHelper);
+
 		$container->registerServiceProvider(new CategoryFactory('\\FooNamespace\\Component\\Foos'));
 		$container->registerServiceProvider(new MVCFactory('\\FooNamespace\\Component\\Foos'));
 		$container->registerServiceProvider(new ComponentDispatcherFactory('\\FooNamespace\\Component\\Foos'));
 function (Container $container) {
 				$component->setRegistry($container->get(Registry::class));
 				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
 				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));
+				$component->setAssociationExtension($container->get(AssociationExtensionInterface::class));

 				return $component;
 			}
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ sql/install.mysql.utf8.sql

[administrator/components/com_foos/ /install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

In order for the language to be saved to the element, we add a column in the database table. For new installations, the script `install.mysql.utf8.sql` is the one that is called.

```php {diff}
 ALTER TABLE `#__foos_details` ADD COLUMN  `publish_down` datetime AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD KEY `idx_state` (`published`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*' AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Extension/FoosComponent.php

In FoosComponent we add `AssociationServiceInterface` and `AssociationServiceTrait` so that everything necessary is implemented in our extension.

> [Traits](https://www.php.net/manual/de/language.oop5.traits.php) are a code reuse mechanism used in programming languages with simple inheritance like PHP.

[administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}


 defined('JPATH_PLATFORM') or die;

+use Joomla\CMS\Association\AssociationServiceInterface;
+use Joomla\CMS\Association\AssociationServiceTrait;
 use Joomla\CMS\Categories\CategoryServiceInterface;
 use Joomla\CMS\Categories\CategoryServiceTrait;
 use Joomla\CMS\Extension\BootableExtensionInterface;

  *
  * @since  __BUMP_VERSION__
  */
-class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface
+class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface
 {
 	use CategoryServiceTrait;
+	use AssociationServiceTrait;
 	use HTMLRegistryAwareTrait;

 	/**

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Field/Modal/FooField.php

We previously used the modal to select a Foo item using a popup when creating a menu item. Now we use it again to select a language link. To make sure that only the matching languages are displayed, we extend the URL with the language information.

[administrator/components/com_foos/ src/Field/Modal/FooField.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Field/Modal/FooField.php)

```php {diff}
 		// Setup variables for display.
 		$linkFoos = 'index.php?option=com_foos&amp;view=foos&amp;layout=modal&amp;tmpl=component&amp;'
 			. Session::getFormToken() . '=1';
-		$linkFoo  = 'index.php?option=com_foos&amp;view=foo&amp;layout=modal&amp;tmpl=component&amp;'
-			. Session::getFormToken() . '=1';
 		$modalTitle   = Text::_('COM_FOOS_CHANGE_FOO');

+		if (isset($this->element['language'])) {
+			$linkFoos .= '&amp;forcedLanguage=' . $this->element['language'];
+			$modalTitle .= ' &#8212; ' . $this->element['label'];
+		}
+
 		$urlSelect = $linkFoos . '&amp;function=jSelectFoo_' . $this->id;

 		if ($value) {

```

> Are you confused by the characters [`&#8212;`](https://unicode-table.com/de/2014/)[^unicode-table.com/en/2014/] or [`&amp;`](https://unicode-table.com/de/0026/)[^unicode-table.com/de/0026/]? They are quite harmless. `&#8212;` is nothing more than a [dash](https://en.wikipedia.org/wiki/Dash#En_dash)[en.wikipedia.org/wiki/Dash#En_dash] `-`. `&amp;` stands for the ampersand character `&`. In HTML, the latter stands for the beginning of an entity reference. Thus it is a special character. If you use such a character in a text that is checked for security reasons, you should use the encoded entity `&amp;` - more technical stuff on [w3c.org](https://www.w3.org/TR/xhtml1/guidelines.html#C_12)[^w3.org/tr/xhtml1/guidelines.html#c_12]. For the dash `-`, we use [Unicode](https://en.wikipedia.org/wiki/Unicode)[^en.wikipedia.org/wiki/unicode]. The goal in this case is to unify the use of different and incompatible encodings in different countries or cultures.

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Model/FooModel.php

We extend the model `administrator/components/com_foos/ src/Model/FooModel.php` used to build the data of an item in regard to the language. In this case `getItem` and `preprocessForm` play the essential role.

[administrator/components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\Factory;
+use Joomla\CMS\Language\Associations;
 use Joomla\CMS\MVC\Model\AdminModel;
+use Joomla\CMS\Language\LanguageHelper;

 /**
  * Item Model for a Foo.
 class FooModel extends AdminModel
 	 */
 	public $typeAlias = 'com_foos.foo';

+	protected $associationsContext = 'com_foos.item';
+
 	/**
 	 * Method to get the row form.
 	 *
protected function loadFormData()
 		return $data;
 	}

+	public function getItem($pk = null)
+	{
+		$item = parent::getItem($pk);
+
+		// Load associated foo items
+		$assoc = Associations::isEnabled();
+
+		if ($assoc) {
+			$item->associations = [];
+
+			if ($item->id != null) {
+				$associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $item->id, 'id', null);
+
+				foreach ($associations as $tag => $association) {
+					$item->associations[$tag] = $association->id;
+				}
+			}
+		}
+
+		return $item;
+	}
+
+	protected function preprocessForm(\JForm $form, $data, $group = 'content')
+	{
+		if (Associations::isEnabled()) {
+			$languages = LanguageHelper::getContentLanguages(false, true, null, 'ordering', 'asc');
+
+			if (count($languages) > 1) {
+				$addform = new \SimpleXMLElement('<form />');
+				$fields = $addform->addChild('fields');
+				$fields->addAttribute('name', 'associations');
+				$fieldset = $fields->addChild('fieldset');
+				$fieldset->addAttribute('name', 'item_associations');
+
+				foreach ($languages as $language) {
+					$field = $fieldset->addChild('field');
+					$field->addAttribute('name', $language->lang_code);
+					$field->addAttribute('type', 'modal_foo');
+					$field->addAttribute('language', $language->lang_code);
+					$field->addAttribute('label', $language->title);
+					$field->addAttribute('translate_label', 'false');
+					$field->addAttribute('select', 'true');
+					$field->addAttribute('new', 'true');
+					$field->addAttribute('edit', 'true');
+					$field->addAttribute('clear', 'true');
+				}
+
+				$form->load($addform, false);
+			}
+		}
+
+		parent::preprocessForm($form, $data, $group);
+	}
+
 	/**
 	 * Prepare and sanitise the table prior to saving.
 	 *

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Model/FoosModel.php

> Note: `FooModel.php` is the model which calculates the data for an element. `FoosModel.php` - note the `s` - is the list view model - it handles data for a group of elements.

In the model of the list, besides adding the language information, it is important to update the state via `populateState`. Otherwise the correct language will not be active at each time. The state includes the information which language is active.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\MVC\Model\ListModel;
+use Joomla\CMS\Language\Associations;
+use Joomla\CMS\Factory;

 /**
  * Methods supporting a list of foo records.


 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access', 'a.catid', 'a.published', 'a.publish_up', 'a.publish_down'))
+			$db->quoteName(
+				array(
+					'a.id', 'a.name', 'a.alias', 'a.access',
+					'a.catid', 'a.published', 'a.publish_up', 'a.publish_down',
+					'a.language'
+				)
+			)
 		);

 		$query->from($db->quoteName('#__foos_details', 'a'));

 				$db->quoteName('#__categories', 'c') . ' ON ' . $db->quoteName('c.id') . ' = ' . $db->quoteName('a.catid')
 			);

+		// Join over the language
+		$query->select($db->quoteName('l.title', 'language_title'))
+			->select($db->quoteName('l.image', 'language_image'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__languages', 'l') . ' ON ' . $db->quoteName('l.lang_code') . ' = ' . $db->quoteName('a.language')
+			);
+
+		// Join over the associations.
+		if (Associations::isEnabled())
+		{
+			$subQuery = $db->getQuery(true)
+				->select('COUNT(' . $db->quoteName('asso1.id') . ') > 1')
+				->from($db->quoteName('#__associations', 'asso1'))
+				->join('INNER', $db->quoteName('#__associations', 'asso2'), $db->quoteName('asso1.key') . ' = ' . $db->quoteName('asso2.key'))
+				->where(
+					[
+						$db->quoteName('asso1.id') . ' = ' . $db->quoteName('a.id'),
+						$db->quoteName('asso1.context') . ' = ' . $db->quote('com_foos.item'),
+					]
+				);
+
+			$query->select('(' . $subQuery . ') AS ' . $db->quoteName('association'));
+		}
+
+		// Filter on the language.
+		if ($language = $this->getState('filter.language'))
+		{
+			$query->where($db->quoteName('a.language') . ' = ' . $db->quote($language));
+		}
+
 		return $query;
 	}
+
+	protected function populateState($ordering = 'a.name', $direction = 'asc')
+	{
+		$app = Factory::getApplication();
+		$forcedLanguage = $app->input->get('forcedLanguage', '', 'cmd');
+
+		// Adjust the context to support modal layouts.
+		if ($layout = $app->input->get('layout'))
+		{
+			$this->context .= '.' . $layout;
+		}
+
+		// Adjust the context to support forced languages.
+		if ($forcedLanguage)
+		{
+			$this->context .= '.' . $forcedLanguage;
+		}
+
+		// List state information.
+		parent::populateState($ordering, $direction);
+
+		// Force a language.
+		if (!empty($forcedLanguage))
+		{
+			$this->setState('filter.language', $forcedLanguage);
+		}
+	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Service/HTML/AdministratorService.php

We implement the `association` service in `AdministratorService.php`. Via the ID the function returns the HTML markup for editing the language links.<!-- \index{service!administrator} -->

[administrator/components/com_foos/ src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php)

```php {diff}

 defined('JPATH_BASE') or die;

+use Joomla\CMS\Factory;
+use Joomla\CMS\Language\Associations;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Layout\LayoutHelper;
+use Joomla\CMS\Router\Route;

 class AdministratorService
 {

+	public function association($fooid)
+	{
+		// Defaults
+		$html = '';
+
+		// Get the associations
+		if ($associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $fooid, 'id', null)) {
+			foreach ($associations as $tag => $associated) {
+				$associations[$tag] = (int) $associated->id;
+			}
+
+			// Get the associated foo items
+			$db = Factory::getDbo();
+			$query = $db->getQuery(true)
+				->select('c.id, c.name as title')
+				->select('l.sef as lang_sef, lang_code')
+				->from('#__foos_details as c')
+				->select('cat.title as category_title')
+				->join('LEFT', '#__categories as cat ON cat.id=c.catid')
+				->where('c.id IN (' . implode(',', array_values($associations)) . ')')
+				->where('c.id != ' . $fooid)
+				->join('LEFT', '#__languages as l ON c.language=l.lang_code')
+				->select('l.image')
+				->select('l.title as language_title');
+			$db->setQuery($query);
+
+			try {
+				$items = $db->loadObjectList('id');
+			} catch (\RuntimeException $e) {
+				throw new \Exception($e->getMessage(), 500, $e);
+			}
+
+			if ($items) {
+				foreach ($items as &$item) {
+					$text = strtoupper($item->lang_sef);
+					$url = Route::_('index.php?option=com_foos&task=foo.edit&id=' . (int) $item->id);
+					$tooltip = '<strong>' . htmlspecialchars($item->language_title, ENT_QUOTES, 'UTF-8') . '</strong><br>'
+						. htmlspecialchars($item->title, ENT_QUOTES, 'UTF-8') . '<br>' . Text::sprintf('JCATEGORY_SPRINTF', $item->category_title);
+					$classes = 'badge bg-secondary';
+
+					$item->link = '<a href="' . $url . '" title="' . $item->language_title . '" class="' . $classes . '">' . $text . '</a>'
+						. '<div role="tooltip" id="tip' . (int) $item->id . '">' . $tooltip . '</div>';
+				}
+			}
+
+			$html = LayoutHelper::render('joomla.content.associations', $items);
+		}
+
+		return $html;
+	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foo/HtmlView.php

If only one language is possible or changing it is not desired, we set the value of the language selection field and protected it from write access. Also, only categories of this language are selectable.

[administrator/components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/3e4020a2fb91237a269e49d24b9ff695f4d7ecec/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 		$this->form  = $this->get('Form');
 		$this->item = $this->get('Item');

+		// If we are forcing a language in modal (used for associations).
+		if ($this->getLayout() === 'modal' && $forcedLanguage = Factory::getApplication()->input->get('forcedLanguage', '', 'cmd')) {
+			// Set the language field to the forcedLanguage and disable changing it.
+			$this->form->setValue('language', null, $forcedLanguage);
+			$this->form->setFieldAttribute('language', 'readonly', 'true');
+
+			// Only allow to select categories with All language or with the forced language.
+			$this->form->setFieldAttribute('catid', 'language', '*,' . $forcedLanguage);
+		}
+
 		$this->addToolbar();

 		return parent::display($tpl);

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foos/HtmlView.php

The view of the list should contain the sidebar and the toolbar if it is not a modal view or a popup. If the view is modal, the toolbar and sidebar will confuse. In that case we filter the items automatically according to the currently active language.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
 use Joomla\CMS\Toolbar\Toolbar;
 use Joomla\CMS\Toolbar\ToolbarHelper;
+use Joomla\CMS\Factory;

 /**
  * View class for a list of foos.
 public function display($tpl = null): void
 			$this->setLayout('emptystate');
 		}

-		$this->addToolbar();
+		// We don't need toolbar in the modal window.
+		if ($this->getLayout() !== 'modal') {
+			$this->addToolbar();
+			$this->sidebar = \JHtmlSidebar::render();
+		} else {
+			// In article associations modal we need to remove language filter if forcing a language.
+			// We also need to change the category filter to show show categories with All or the forced language.
+			if ($forcedLanguage = Factory::getApplication()->input->get('forcedLanguage', '', 'CMD')) {
+				// If the language is forced we can't allow to select the language, so transform the language selector filter into a hidden field.
+				$languageXml = new \SimpleXMLElement('<field name="language" type="hidden" default="' . $forcedLanguage . '" />');
+			}
+		}

 		parent::display($tpl);
 	}

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foo/edit.php

In the form for editing an element we add a form field for specifying the language. For this we use the layout `administrator/components/com_foos/ tmpl/foo/edit_associations.php` created earlier in this part.

> Why the layout `edit_associations.php` is called in the file `edit.php` with the name `associations`, you might already think. In the part about the layouts, I go into this in more detail.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 use Joomla\CMS\Factory;
 use Joomla\CMS\HTML\HTMLHelper;
+use Joomla\CMS\Language\Associations;
 use Joomla\CMS\Router\Route;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\Layout\LayoutHelper;

 $app = Factory::getApplication();
 $input = $app->input;

+$assoc = Associations::isEnabled();
+
+$this->ignore_fieldsets = ['item_associations'];
 $this->useCoreUI = true;

 $wa = $this->document->getWebAssetManager();

 						<?php echo $this->getForm()->renderField('publish_up'); ?>
 						<?php echo $this->getForm()->renderField('publish_down'); ?>
 						<?php echo $this->getForm()->renderField('catid'); ?>
+						<?php echo $this->getForm()->renderField('language'); ?>
 					</div>
 				</div>
 			</div>
 		</div>
 		<?php echo HTMLHelper::_('uitab.endTab'); ?>

+		<?php if ($assoc) : ?>
+			<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'associations', Text::_('JGLOBAL_FIELDSET_ASSOCIATIONS')); ?>
+			<?php echo $this->loadTemplate('associations'); ?>
+			<?php echo HTMLHelper::_('uitab.endTab'); ?>
+		<?php endif; ?>
+
 		<?php echo LayoutHelper::render('joomla.edit.params', $this); ?>

 		<?php echo HTMLHelper::_('uitab.endTabSet'); ?>

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foos/default.php

In the components overview in the administration area, we add columns to display the language information. We display these columns only when it is required. This is the case when language associations and multilingualism are enabled. To find this out we use Joomla's own functions `Associations::isEnabled()` and `Multilanguage::isEnabled()`.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/d64685046cedc970243139a3c7846c68e6cd56f9/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 use Joomla\CMS\HTML\HTMLHelper;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\Router\Route;
+use Joomla\CMS\Language\Multilanguage;
+use Joomla\CMS\Language\Associations;
+use Joomla\CMS\Layout\LayoutHelper;
+
+$assoc = Associations::isEnabled();
+
 ?>
 <form action="<?php echo Route::_('index.php?option=com_foos'); ?>" method="post" name="adminForm" id="adminForm">
 	<div class="row">

 								<th scope="col" style="width:10%" class="d-none d-md-table-cell">
 									<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>
 								</th>
+								<?php if ($assoc) : ?>
+									<th scope="col" style="width:10%">
+										<?php echo Text::_('COM_FOOS_HEADING_ASSOCIATION'); ?>
+									</th>
+								<?php endif; ?>
+								<?php if (Multilanguage::isEnabled()) : ?>
+									<th scope="col" style="width:10%" class="d-none d-md-table-cell">
+										<?php echo Text::_('JGRID_HEADING_LANGUAGE'); ?>
+									</th>
+								<?php endif; ?>
 								<th scope="col">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_ID'); ?>
 								</th>

 								<td class="small d-none d-md-table-cell">
 									<?php echo $item->access_level; ?>
 								</td>
+
+								<?php if ($assoc) : ?>
+								<td class="d-none d-md-table-cell">
+									<?php if ($item->association) : ?>
+										<?php
+										echo HTMLHelper::_('foosadministrator.association', $item->id);
+										?>
+									<?php endif; ?>
+								</td>
+								<?php endif; ?>
+								<?php if (Multilanguage::isEnabled()) : ?>
+									<td class="small d-none d-md-table-cell">
+										<?php echo LayoutHelper::render('joomla.content.language', $item); ?>
+									</td>
+								<?php endif; ?>
+
 								<td class="d-none d-md-table-cell">
 									<?php echo $item->id; ?>
 								</td>

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

2. the database has been changed, so it is necessary to update it. Open the `System | Information | Database` section as described in part 16. Select your component and click on `Update Structure`.

![Joomla Published](/images/j4x16x1.png)

3. install at least one more language via `System | Install | Languages`. I chose the german and the persian language.

> [Persian](https://en.wikipedia.org/wiki/Persian_language)[^wikipedia.org/wiki/persian_language] is together with Arabic, Hebrew, Pashto, Urdu, and Sindhi one of the most widely used [RTL](https://en.wikipedia.org/wiki/Right-to-left_script)[^wikipedia.org/wiki/right-to-left_script] writing systems of modern times and can therefore be used to test the RTL integration in Joomla. In a _right-to-left, top-to-bottom_ [script](https://en.wikipedia.org/wiki/Writing_system)[^] (often abbreviated as _right-to-left_ or abbreviated as _RTL_), one writes from right to left on a page, with new lines written from top to bottom. This is in contrast to the left-to-right [writing system](https://en.wikipedia.org/wiki/Writing_system), where writing starts from the left and continues to the right.

![Joomla Language Associations - Multilingual Associations in your extension](/images/j4x19x1.png)

4. make sure via `System | Manage | Plugins` that the plugin `System - Language Filter` is published.

![Joomla Language Associations - Multilingual Associations in your extension](/images/j4x19x2.png)

5. open the view of an item of your component in the administration area and make sure that the status 'Language' is changeable. Change it from `All` to any language.

![Joomla Language Links - Multilingual Associations in your extension](/images/j4x19x3.png)

7. play with the language associations and make sure that everything is associated correctly.

![Joomla Language Links - Multilingual Associations in your extension](/images/j4x19x4.png)

![Joomla Language Links - Multilingual Associations in your extension](/images/j4x19x5.png)

8. extend the tests to the component 'Multilingual Associations'. This supports your extension as well.

![Joomla Language Associations - Multilingual Associations in your extension](/images/j4x19x7.png)

![Joomla Language Associations - Multilingual Associations in your extension](/images/j4x19x6.png)
<img src="https://vg08.met.vgwort.de/na/4f122f3e435546dc8111bbf5cd30f271" width="1" height="1" alt="">
