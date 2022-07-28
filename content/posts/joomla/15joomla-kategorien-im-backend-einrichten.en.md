---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-02-06
title: 'Set Up Categories in Backend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-kategorien-im-backend-einrichten
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

Almost every website divides its content into categories. Joomla offers this useful feature as well. The current part of the tutorial shows you how to ideally integrate categories into a Joomla component. Don't reinvent the wheel yourself. Use what Joomla offers you.<!-- \index{categories!backend} -->

> [Categories](https://docs.joomla.org/Special:MyLanguage/Category 'Special:MyLanguage/Category') are a way of organising content in Joomla! A category contains posts and other categories. A post can only be in one category. If a category is contained in another, it is a subcategory of the category.

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t11b...t12)[^github.com/astridx/boilerplate/compare/t11b...t12] and copy these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ sql/updates/mysql/12.0.0.sql

We store the data in the database that is necessary to classify an element into a category. Therefore, in case of an update, it is important to add a column to the database. To do this, we create the file `administrator/components/com_foos/ sql/updates/mysql/12.0.0.sql` and enter the necessary SQL statement in it. We choose the name because we are currently working on version 12 of our extension.

[administrator/components/com_foos/ sql/updates/mysql/12.0.0.sql](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t12/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_catid` (`catid`);

```

### Modified files

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ access.xml

The entries in the file `access.xml` marked below with a plus sign are necessary to set permissions for the categories. The new code causes the display of a tab for setting user permissions per category in the administration area.

[administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/access.xml)

```xml {diff}

 		<action name="core.edit" title="JACTION_EDIT" />
 		<action name="core.edit.state" title="JACTION_EDITSTATE" />
 		<action name="core.edit.own" title="JACTION_EDITOWN" />
+		<action name="core.edit.value" title="JACTION_EDITVALUE" />
+	</section>
+	<section name="category">
+		<action name="core.create" title="JACTION_CREATE" />
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.own" title="JACTION_EDITOWN" />
 	</section>
 </access>

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ foos.xml

The `<menu link="option=com_categories&amp;extension=com_foos"` entry causes a menu item to be added in the administration area menu for editing the category.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/foos.xml)

```xml {diff}

 		<menu view="foos">COM_FOOS</menu>
 		<submenu>
 			<menu link="option=com_foos">COM_FOOS</menu>
+			<menu link="option=com_categories&amp;extension=com_foos">JCATEGORY</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>access.xml</filename>

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ forms/foo.xml

We add a selection field with matching categories to the form used to create a Foo item. We use the Joomla own field `categoryedit` for this. Note the line `extension="com_foos"`. This ensures that only categories belonging to the component `com_foos` are displayed.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/forms/foo.xml)

```php {diff}
 			hint="JFIELD_ALIAS_PLACEHOLDER"
 		/>

+		<field
+			name="catid"
+			type="categoryedit"
+			label="JCATEGORY"
+			extension="com_foos"
+			addfieldprefix="Joomla\Component\Categories\Administrator\Field"
+			required="true"
+			default=""
+		/>
+
 		<field
 			name="access"
 			type="accesslevel"

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ script.php

To ensure that a category already exists at the beginning, we add the script that is called during the installation. Using the `install` method, we create a category with the title `Uncategorised` for the component during a new installation. We store these directly in the database. To be able to specify a user as the creator of the category, we request the ID of the administrator in the `getAdminId()` method.

[administrator/components/com_foos/ script.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/script.php)

```php {diff}

  * @license     GNU General Public License version 2 or later; see LICENSE.txt
  */
 \defined('_JEXEC') or die;
+
+use Joomla\CMS\Application\ApplicationHelper;
+use Joomla\CMS\Factory;
 use Joomla\CMS\Installer\InstallerAdapter;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\Log\Log;
+use Joomla\CMS\Table\Table;

 /**
  * Script file of Foo Component

 	{
 		echo Text::_('COM_FOOS_INSTALLERSCRIPT_INSTALL');

+		$db = Factory::getDbo();
+		$alias   = ApplicationHelper::stringURLSafe('FooUncategorised');
+
+		// Initialize a new category.
+		$category = Table::getInstance('Category');
+
+		$data = array(
+			'extension' => 'com_foos',
+			'title' => 'FooUncategorised',
+			'alias' => $alias . '(en-GB)',
+			'description' => '',
+			'published' => 1,
+			'access' => 1,
+			'params' => '{"target":"","image":""}',
+			'metadesc' => '',
+			'metakey' => '',
+			'metadata' => '{"page_title":"","author":"","robots":""}',
+			'created_time' => Factory::getDate()->toSql(),
+			'created_user_id' => (int) $this->getAdminId(),
+			'language' => 'en-GB',
+			'rules' => array(),
+			'parent_id' => 1,
+		);
+
+		$category->setLocation(1, 'last-child');
+
+		// Bind the data to the table
+		if (!$category->bind($data))
+		{
+			return false;
+		}
+
+		// Check to make sure our data is valid.
+		if (!$category->check())
+		{
+			return false;
+		}
+
+		// Store the category.
+		if (!$category->store(true))
+		{
+			return false;
+		}
+
 		return true;
 	}



 		return true;
 	}
+
+	private function getAdminId()
+	{
+		$db    = Factory::getDbo();
+		$query = $db->getQuery(true);
+
+		// Select the admin user ID
+		$query
+			->clear()
+			->select($db->quoteName('u') . '.' . $db->quoteName('id'))
+			->from($db->quoteName('#__users', 'u'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__user_usergroup_map', 'map')
+				. ' ON ' . $db->quoteName('map') . '.' . $db->quoteName('user_id')
+				. ' = ' . $db->quoteName('u') . '.' . $db->quoteName('id')
+			)
+			->join(
+				'LEFT',
+				$db->quoteName('#__usergroups', 'g')
+				. ' ON ' . $db->quoteName('map') . '.' . $db->quoteName('group_id')
+				. ' = ' . $db->quoteName('g') . '.' . $db->quoteName('id')
+			)
+			->where(
+				$db->quoteName('g') . '.' . $db->quoteName('title')
+				. ' = ' . $db->quote('Super Users')
+			);
+
+		$db->setQuery($query);
+		$id = $db->loadResult();
+
+		if (!$id || $id instanceof \Exception)
+		{
+			return false;
+		}
+
+		return $id;
+	}
 }

```

<!-- \index{alias} -->

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ services/provider.php

In the service provider we register the interface `CategoryFactoryInterface`. It is not necessary to create `CategoryFactory Interface` by yourself. We use the Joomla own functions.

[administrator/components/com_foos/ services/provider.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/services/provider.php)

```php {diff}

 \defined('_JEXEC') or die;

+use Joomla\CMS\Categories\CategoryFactoryInterface;
 use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
 use Joomla\CMS\Extension\ComponentInterface;
 use Joomla\CMS\Extension\Service\Provider\CategoryFactory;


 				$component->setRegistry($container->get(Registry::class));
 				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
+				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));

 				return $component;
 			}

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ sql/install.mysql.utf8.sql

In order to create the table column in which the category of a Foo element is stored during a new installation, we add the necessary SQL command in the SQL file that is called during the installation.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```php {diff}
 ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Extension/FoosComponent.php

Additionally, implementations are required in the component class to use Joomla's own functions. The method `countItems` is necessary so that an overview of assigned items appears in the category view. The method `getTableNameForSection` ensures that the correct database table is always queried.

[administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}
 use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
 use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;
 use Psr\Container\ContainerInterface;
+use Joomla\CMS\Helper\ContentHelper;

 /**
  * Component class for com_foos

 	{
 		$this->getRegistry()->register('foosadministrator', new AdministratorService);
 	}
+
+	public function countItems(array $items, string $section)
+	{
+		try
+		{
+			$config = (object) array(
+				'related_tbl'   => $this->getTableNameForSection($section),
+				'state_col'     => 'published',
+				'group_col'     => 'catid',
+				'relation_type' => 'category_or_group',
+			);
+
+			ContentHelper::countRelations($items, $config);
+		}
+		catch (\Exception $e)
+		{
+			// Ignore it
+		}
+	}
+
+	protected function getTableNameForSection(string $section = null)
+	{
+		return ($section === 'category' ? 'categories' : 'foos_details');
+
+	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Model/FoosModel.php](https://codeberg.org/astrid/j4examplecode/compare/t11b...t12#diff-2daf62ad6c51630353e31eaa3cc28626)

In the model we add to the database query the table where Joomla stores categories. Thus, in the administration area, when a category is selected, only the elements belonging to it are displayed.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}

 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access'))
+			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access', 'a.catid'))
 		);

 		$query->from($db->quoteName('#__foos_details', 'a'));

 				$db->quoteName('#__viewlevels', 'ag') . ' ON ' . $db->quoteName('ag.id') . ' = ' . $db->quoteName('a.access')
 			);

+		// Join over the categories.
+		$query->select($db->quoteName('c.title', 'category_title'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__categories', 'c') . ' ON ' . $db->quoteName('c.id') . ' = ' . $db->quoteName('a.catid')
+			);
+
 		return $query;
 	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foo/edit.php

We add the category field to the form for editing an element. It is rendered using the information in the XML form `administrator/components/com_foos/ forms/foo.xml`, which we worked on earlier in this chapter.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 	<?php echo $this->getForm()->renderField('name'); ?>
 	<?php echo $this->getForm()->renderField('alias'); ?>
 	<?php echo $this->getForm()->renderField('access'); ?>
+	<?php echo $this->getForm()->renderField('catid'); ?>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foos/default.php

In the overview table of the view in the backend, we add a column for displaying the category.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}

		<a class="hasTooltip" href="<?php echo Route::_('index.php?option=com_foos&task=foo.edit&id=' . (int) $item->id); ?>" title="<?php echo Text::_('JACTION_EDIT'); ?> <?php echo $this->escape(addslashes($item->name)); ?>">
			<?php echo $editIcon; ?><?php echo $this->escape($item->name); ?></a>

+		<div class="small">
+			<?php echo Text::_('JCATEGORY') . ': ' . $this->escape($item->category_title); ?>
+ 		</div>
	</th>
	<td class="small d-none d-md-table-cell">
		<?php echo $item->access_level; ?>

```

> The categories help you to display your data in a structured way in the frontend. We will create the frontend views in the further course of this tutorial.

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder to the `administrator` folder of your Joomla 4 installation. Install your component as described in part one, after copying all files. Joomla will update the database for you during the installation. On the right-hand side of the table is an overview that lists how many elements are published or unpublished. This does not work yet. We will work on publishing and unpublishing in the next part.

2. Open the view of your component in the administration area.

3. in the sidebar you will see a new menu item. This offers you everything you need to create and edit the categories of your component.

![Joomla Category Menu Item](/images/j4x15x1.png)

4. next open an element. Make sure that it is possible to assign a category to it.

![Joomla Assign Category](/images/j4x15x2.png)

5. make sure that the foo specific categories do not appear in other components, for example in `com_contact`.

<img src="https://vg08.met.vgwort.de/na/4a15803b18c1465ab4af60d225b23f12" width="1" height="1" alt="">
