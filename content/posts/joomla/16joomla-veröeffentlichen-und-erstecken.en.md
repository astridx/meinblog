---
date: 2020-12-16
title: 'Joomla 4.x Tutorial - Extension Development - Publish and Unpublish / Hide'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-veröeffentlichen-und-erstecken
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

If you worked with Joomla, you know it from other components: Items have a status that can be changed. This section shows you how to

- unpublish,
- publish,
- schedule,
- archive and
- trash
  items.

![Joomla Published](/images/j4x16x3.png)

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t12...t13) and incorporate these changes into your development version.

## Step by step

### New files

#### [administrator/components/com_foos/ sql/updates/mysql/13.0.0.sql](https://github.com/astridx/boilerplate/compare/t12...t13#diff-87ec143942c0f306b40e69e84076afef)

In case of an update, the database is updated to the latest version for version 13 using the file `administrator/components/com_foos/ sql/updates/mysql/13.0.0.sql`. Specifically, columns are added for saving the data for publication.

[administrator/components/com_foos/ sql/updates/mysql/13.0.0.sql](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/sql/updates/mysql/13.0.0.sql)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/t13/src/administrator/components/com_foos/sql/updates/mysql/13.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `published` tinyint(1) NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD COLUMN  `publish_up` datetime AFTER `alias`;

ALTER TABLE `#__foos_details` ADD COLUMN  `publish_down` datetime AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_state` (`published`);
```

#### [administrator/components/com_foos/ src/Controller/FoosController.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-83275f4e46bde5a95cd61ce239609370)

Now we need the `AdminController` class. Therefore we create the class `FoosController` which inherits from `AdminController`.

[administrator/components/com_foos/ src/Controller/FoosController.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Controller/FoosController.php)

```php {numberLines: -2}
<?php
// https://raw.githubusercontent.com/astridx/boilerplate/t13/src/administrator/components/com_foos/src/Controller/FoosController.php

namespace FooNamespace\Component\Foos\Administrator\Controller;

use Joomla\CMS\Application\CMSApplication;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
use Joomla\Input\Input;

defined('_JEXEC') or die;

class FoosController extends AdminController
{
	public function __construct($config = array(), MVCFactoryInterface $factory = null, $app = null, $input = null)
	{
		parent::__construct($config, $factory, $app, $input);
	}

	public function getModel($name = 'Foo', $prefix = 'Administrator', $config = array('ignore_request' => true))
	{
		return parent::getModel($name, $prefix, $config);
	}
}
```

### Modified files

#### [administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t12...t13#diff-262e27353fbe755d3813ea2df19cd0ed)

Three fields are added to the form. One, in which the status is set and two, through which a scheduled publication is achieved with the help of a calendar.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}

 			hint="JFIELD_ALIAS_PLACEHOLDER"
 		/>

+		<field
+			name="published"
+			type="list"
+			label="JSTATUS"
+			default="1"
+			id="published"
+			class="custom-select-color-state"
+			size="1"
+			>
+			<option value="1">JPUBLISHED</option>
+			<option value="0">JUNPUBLISHED</option>
+			<option value="2">JARCHIVED</option>
+			<option value="-2">JTRASHED</option>
+		</field>
+
+		<field
+			name="publish_up"
+			type="calendar"
+			label="COM_FOOS_FIELD_PUBLISH_UP_LABEL"
+			translateformat="true"
+			showtime="true"
+			size="22"
+			filter="user_utc"
+		/>
+
+		<field
+			name="publish_down"
+			type="calendar"
+			label="COM_FOOS_FIELD_PUBLISH_DOWN_LABEL"
+			translateformat="true"
+			showtime="true"
+			size="22"
+			filter="user_utc"
+		/>
+
 		<field
 			name="catid"
 			type="categoryedit"

```

#### [administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t12...t13#diff-896f245bc8e493f91277fd33913ef974)

We implement the necessary information in the database in case of a new installation.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {diff}
 ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);

 ALTER TABLE `#__foos_details` ADD COLUMN  `catid` int(11) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `state` tinyint(3) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_catid` (`catid`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `published` tinyint(1) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `publish_up` datetime AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `publish_down` datetime AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_state` (`published`);

```

#### [administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-38764f2b1343234561c0d02cd2991ea1)

The component class gets the new function `getStateColumnForSection`.

[administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}
 		return ($section === 'category' ? 'categories' : 'foos_details');

 	}
+
+	/**
+	 * Returns the state column for the count items functions for the given section.
+	 *
+	 * @param   string  $section  The section
+	 *
+	 * @return  string|null
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function getStateColumnForSection(string $section = null)
+	{
+		return 'published';
+	}
 }

```

#### [administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-2daf62ad6c51630353e31eaa3cc28626)

We extend the model so that the information about the status is loaded.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}

 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access', 'a.catid'))
+			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access', 'a.catid', 'a.published', 'a.publish_up', 'a.publish_down'))
 		);

 		$query->from($db->quoteName('#__foos_details', 'a'));

```

#### [administrator/components/com_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-19bf55010e1963bede0668355cebb307)

In the class that manages the database table, we add checks. This way we make sure that no impossible data is stored.

[administrator/components/com_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/src/Table/FooTable.php)

```php {diff}

 		return $this->alias;
 	}
+
+	/**
+	 * Overloaded check function
+	 *
+	 * @return  boolean
+	 *
+	 * @see     Table::check
+	 * @since   __BUMP_VERSION__
+	 */
+	public function check()
+	{
+		try
+		{
+			parent::check();
+		}
+		catch (\Exception $e)
+		{
+			$this->setError($e->getMessage());
+
+			return false;
+		}
+
+		// Check the publish down date is not earlier than publish up.
+		if ($this->publish_down > $this->_db->getNullDate() && $this->publish_down < $this->publish_up)
+		{
+			$this->setError(Text::_('JGLOBAL_START_PUBLISH_AFTER_FINISH'));
+
+			return false;
+		}
+
+		// Set publish_up, publish_down to null if not set
+		if (!$this->publish_up)
+		{
+			$this->publish_up = null;
+		}
+
+		if (!$this->publish_down)
+		{
+			$this->publish_down = null;
+		}
+
+		return true;
+	}
 }

```

#### [administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-1637778e5f7d1d56dd1751af1970f01b)

In the form for editing an element, we make sure that the new fields are rendered.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}

 	<?php echo $this->getForm()->renderField('alias'); ?>
 	<?php echo $this->getForm()->renderField('access'); ?>
 	<?php echo $this->getForm()->renderField('catid'); ?>
+	<?php echo $this->getForm()->renderField('published'); ?>
+	<?php echo $this->getForm()->renderField('publish_up'); ?>
+	<?php echo $this->getForm()->renderField('publish_down'); ?>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>

```

#### [administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-3186af99ea4e3321b497b86fcd1cd757)

Finally, we include the fields in the overview.

> Are you wondering about the the tags `<td>` and `<th>`. This seems to be a mistake at first sight. But it is correct. You can find more information in this [Github-Issue](https://github.com/joomla/joomla-cms/pull/24546).

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/2239e7093f3bbc66055d2d8134b635955458c4b2/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 					<table class="table" id="fooList">
 						<thead>
 							<tr>
+								<td style="width:1%" class="text-center">
+									<?php echo HTMLHelper::_('grid.checkall'); ?>
+								</td>
 								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_NAME'); ?>
 								</th>
+								<th scope="col" style="width:1%; min-width:85px" class="text-center">
+									<?php echo TEXT::_('JSTATUS'); ?>
+								</th>
 								<th scope="col" style="width:10%" class="d-none d-md-table-cell">
 									<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>
 								</th>

 						foreach ($this->items as $i => $item) :
 							?>
 							<tr class="row<?php echo $i % 2; ?>">
+								<td class="text-center">
+									<?php echo HTMLHelper::_('grid.id', $i, $item->id); ?>
+								</td>
 								<th scope="row" class="has-context">
 									<div>
 										<?php echo $this->escape($item->name); ?>

 										<?php echo Text::_('JCATEGORY') . ': ' . $this->escape($item->category_title); ?>
  									</div>
 								</th>
+								<td class="text-center">
+									<?php
+									echo HTMLHelper::_('jgrid.published', $item->published, $i, 'foos.', true, 'cb', $item->publish_up, $item->publish_down);
+									?>
+								</td>
 								<td class="small d-none d-md-table-cell">
 									<?php echo $item->access_level; ?>
 								</td>

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder to the `administrator` folder of your Joomla 4 installation.

2. the database has been changed again, so it is necessary to update it. Uninstalling and reinstalling is time-consuming. That's why I'll tell you an easier method.

3. open the section 'System | Information | Database'.

![Joomla Published](/images/j4x16x1.png)

4. select your component and click on 'Update Structure'. That was it! Now you have updated the database.

5. open the view of your component in the administration area and make sure that you see a column here that is overwritten with status. Click on an icon in it and change the status of the corresponding element from 'published' to 'hidden' and vice versa.

![Joomla Published](/images/j4x16x2.png)

6. open an element and check that the status is also editable in this view. It is also possible to specify a date, so that items are hidden or published according to the date.

![Joomla Validation](/images/j4x16x3.png)
