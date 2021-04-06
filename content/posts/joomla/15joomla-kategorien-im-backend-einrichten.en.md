---
date: 2020-12-15
title: 'Joomla 4.x Tutorial - Extension Development - Set Up Categories in Backend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-kategorien-im-backend-einrichten
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Almost every website divides its content into categories. Joomla offers this useful feature as well. The current part of the tutorial shows you how to ideally integrate categories into a Joomla component. Don't reinvent the wheel yourself. Use what Joomla offers you.

> [Categories](https://docs.joomla.org/Special:MyLanguage/Category 'Special:MyLanguage/Category') are a way of organising content in Joomla! A category contains posts and other categories. A post can only be in one category. If a category is contained in another, it is a subcategory of the category.

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t11b...t12) and incorporate these changes into your development version.

## Step by step

### New files

#### [administrator/components/com_foos/ sql/updates/mysql/12.0.0.sql](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-d7cb057651fb85156ba13996b6a045c8)

We store the data in the database that is necessary to classify an element into a category. Therefore, in case of an update, it is important to add a column to the database.

[administrator/components/com_foos/ sql/updates/mysql/12.0.0.sql](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql)

```sql {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/734d9acdc946880086984444ffad4b557bc2c39e/src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_catid` (`catid`);

```

### Modified files

#### [administrator/components/com_foos/ access.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-e5dfd09c647ca1e552c9016cf918acf3)

The entries in the `access.xml` are necessary to set permissions for the category. The following code causes the display of a tab for setting user permissions per category in the administration area.

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

#### [administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-1ff20be1dacde6c4c8e68e90161e0578)

The `<menu link="option=com_categories&amp;extension=com_foos"` entry causes a menu item to be added in the administration area menu for editing the category.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/foos.xml)

```xml {diff}

 		<menu view="foos">COM_FOOS</menu>
 		<submenu>
 			<menu link="option=com_foos">COM_FOOS</menu>
+			<menu link="option=com_categories&amp;extension=com_foos"
+				view="categories" img="class:foos-cat" alt="Foos/Categories">JCATEGORY</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>access.xml</filename>

```

#### [administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-262e27353fbe755d3813ea2df19cd0ed)

We add a selection field with matching categories to the form used to create a Foo item. We use the Joomla own field `categoryedit` for this. Note the line `extension="com_foos"`. This causes that only categories are displayed, which belong to your component.

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

#### [administrator/components/com_foos/ script.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-7aceee287e50092f4d9e6caaec3b8b40)

To ensure that a category already exists at the beginning, we add the script that is called during the installation. Using the `install` method, we create a category with the title `Uncategorised` for the component using the database during a new installation.

To be able to specify a user as the creator of the category, we request the ID of the administrator in the `getAdminId()` method.

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
+	/**
+	 * Retrieve the admin user id.
+	 *
+	 * @return  integer|boolean  One Administrator ID.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
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

#### [administrator/components/com_foos/ services/provider.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

In the service provider we register the interface `CategoryFactoryInterface`. It is not necessary to create `CategoryFactoryInterface` by yourself. We use the Joomla own functions.

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

#### [administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-896f245bc8e493f91277fd33913ef974)

In order to create the table column in which the category of a Foo element is stored during a new installation, we add the necessary SQL command in the SQL file that is called during the installation.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/f43071430a05c95faec2286cdf0853c9a473ad01/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```php {diff}
 ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

```

#### [administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-38764f2b1343234561c0d02cd2991ea1)

Additionally, implementations are required in the component class to use Joomla's own functions.

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
+	/**
+	 * Adds Count Items for Category Manager.
+	 *
+	 * @param   \stdClass[]  $items    The category objects
+	 * @param   string       $section  The section
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
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
+	/**
+	 * Returns the table for the count items functions for the given section.
+	 *
+	 * @param   string  $section  The section
+	 *
+	 * @return  string|null
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function getTableNameForSection(string $section = null)
+	{
+		return ($section === 'category' ? 'categories' : 'foos_details');
+
+	}
 }

```

#### [administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-2daf62ad6c51630353e31eaa3cc28626)

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

#### [administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-1637778e5f7d1d56dd1751af1970f01b)

The form for editing an element is told to display the category field using the information in the XML file.

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

#### [administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-3186af99ea4e3321b497b86fcd1cd757)

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

> The categories help you to display your data in a structured way in the frontend. We will create the frontend views in the further course of this article series.

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder to the `administrator` folder of your Joomla 4 installation.

Install your component as described in part one, after copying all files. Joomla will update the database for you during the installation.

2. Open the view of your component in the administration area.

3. in the sidebar you will see a new menu item. This offers you everything you need to create and edit the categories of your component.

![Joomla Category Menu Item](/images/j4x15x1.png)

4. next open an element. Make sure that it is possible to assign a category to it.

![Joomla Assign Category](/images/j4x15x2.png)

5. make sure that the foo specific categories do not appear in other components, for example in `com_contact`.

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t11b...t12.diff

## Links
