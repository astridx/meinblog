---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2022-07-31
title: 'Access Control List (ACL)'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-acl
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











Not everyone has the right to edit all content. For this purpose Joomla offers an access control list, the ACL. With this you manage user rights in your component.<!-- \index{access control list} -->

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t9...t10)[^codeberg.org/astrid/j4examplecode/compare/t9...t10] and copy these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### administrator/components/com_foos/ access.xml

First, we set all possible permissions in an XML file. Each component can define individual permissions. I orientate myself here on the usual actions in Joomla. `core.admin` thereby determines which groups are allowed to configure the permissions at component level via the `options` button in the toolbar. `core.manage` determines which groups are allowed to access the backend of the component.

> The [Access Control List Tutorial](https://docs.joomla.org/J3.x:Access_Control_List_Tutorial)[^docs.joomla.org/j3.x:access_control_list_tutorial] is a helpful read.

[administrator/components/com_foos/access.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/access.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t10/src/administrator/components/com_foos/access.xml -->

<?xml version="1.0" encoding="utf-8"?>
<access component="com_foos">
	<section name="component">
		<action name="core.admin" title="JACTION_ADMIN" />
		<action name="core.options" title="JACTION_OPTIONS" />
		<action name="core.manage" title="JACTION_MANAGE" />
		<action name="core.create" title="JACTION_CREATE" />
		<action name="core.delete" title="JACTION_DELETE" />
		<action name="core.edit" title="JACTION_EDIT" />
		<action name="core.edit.state" title="JACTION_EDITSTATE" />
		<action name="core.edit.own" title="JACTION_EDITOWN" />
	</section>
</access>
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/ sql/updates/mysql/10.0.0.sql

Joomla stores the permissions in the database. Regarding the database, only changes are relevant during a Joomla update. We enter these in the file `administrator/components/com_foos/sql/updates/mysql/VERSIONSNUMMER.sql`, here this is specifically `administrator/components/com_foos/sql/updates/mysql/10.0.0.sql`. This file is only called during an update. In case of a new installation the database will be set up correctly via the main file `administrator/components/com_foos/sql/install.mysql.utf8.sql`.

[administrator/components/com_foos/sql/updates/mysql/10.0.0.sql](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t10/src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
```

### Modified files

<!-- prettier-ignore -->
#### administrator/components/com_foos/ config.xml

We set the permissions for the entire component in the configuration. For this we integrate a special form field. Joomla offers the type `rules` for this.

[administrator/components/com_foos/config.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/config.xml)

```xml {diff}
 			<option value="1">JYES</option>
 		</field>
 	</fieldset>
+	<fieldset
+		name="permissions"
+		label="JCONFIG_PERMISSIONS_LABEL"
+		description="JCONFIG_PERMISSIONS_DESC"
+		>
+		<field
+			name="rules"
+			type="rules"
+			label="JCONFIG_PERMISSIONS_LABEL"
+			validate="rules"
+			filter="rules"
+			component="com_foos"
+			section="component"
+		/>
+	</fieldset>
 </config>
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/foos.xml

To make sure that everything runs smoothly during the installation, we add the new file and folder `sql/updates/mysql` and `access.xml` here.

[administrator/components/com_foos/foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/foos.xml)

```xml {diff}
 			<file driver="mysql" charset="utf8">sql/uninstall.mysql.utf8.sql</file>
 		</sql>
 	</uninstall>
+	<update>  <!-- Runs on update -->
+		<schemas>
+			<schemapath type="mysql">sql/updates/mysql</schemapath>
+		</schemas>
+	</update>
 	<!-- Frond-end files -->
 	<files folder="components/com_foos">
 		<folder>language</folder>

 			<menu link="option=com_foos">COM_FOOS</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
+			<filename>access.xml</filename>
 			<filename>foos.xml</filename>
 			<filename>config.xml</filename>
 			<folder>forms</folder>
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/ forms/foo.xml

We extend the form for creating a new Foo item with the possibility to set permissions for a single item. We add the field `name="access"`.

[administrator/components/com_foos/forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
 			size="45"
 			hint="JFIELD_ALIAS_PLACEHOLDER"
 		/>
+
+		<field
+			name="access"
+			type="accesslevel"
+			label="JFIELD_ACCESS_LABEL"
+			size="1"
+		/>
 	</fieldset>
 </form>
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/ sql/install.mysql.utf8.sql

The SQL script for a new installation of the component is also extended with the necessary fields. In this way we ensure that the database is also completely set up for a new installation.

[administrator/components/com_foos/sql/install.mysql.utf8.sql](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {diff}
 ('Nina'),
 ('Astrid'),
 ('Elmar');
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/ src/Model/FoosModel.php

If you are not familiar with SQL, the database query in the model will now seem complex. It is now necessary to combine data from two database tables. One table is `#__viewlevels` which manages the permissions of `com_user`. The other table is that of our example component which is named `#__foos_details`. Don't feel discouraged by this. Joomla supports you in creating the queries.

[administrator/components/com_foos/src/Model/FoosModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}

 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('id', 'name', 'alias'))
+			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access'))
 		);
-		$query->from($db->quoteName('#__foos_details'));
+
+		$query->from($db->quoteName('#__foos_details', 'a'));
+
+		// Join over the asset groups.
+		$query->select($db->quoteName('ag.title', 'access_level'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__viewlevels', 'ag') . ' ON ' . $db->quoteName('ag.id') . ' = ' . $db->quoteName('a.access')
+			);

 		return $query;
 	}
```

> As a reminder, Joomla supports you in creating the database queries. If you use the [available statements](https://docs.joomla.org/Accessing_the_database_using_JDatabase)[^docs.joomla.org/accessing_the_database_using_jdatabase], Joomla will take care of security or different syntax in PostgreSQL and MySQL for you.

<!-- prettier-ignore -->
#### administrator/components/com_foos/ src/View/Foos/HtmlView.php

A button to create an element is only useful if this is allowed. Therefore we change the view - `$canDo` is added. The call `$canDo = ContentHelper::getActions('com_foos');` gets the actions you defined in the file `administrator/components/com_foos/access.xml` at the beginning of this chapter.

[administrator/components/com_foos/src/View/Foos/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}

 \defined('_JEXEC') or die;

+use Joomla\CMS\Helper\ContentHelper;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
 use Joomla\CMS\Toolbar\Toolbar;

 	 */
 	protected function addToolbar()
 	{
+		$canDo = ContentHelper::getActions('com_foos');
+
 		// Get the toolbar object instance
 		$toolbar = Toolbar::getInstance('toolbar');

 		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');

-		$toolbar->addNew('foo.add');
+		if ($canDo->get('core.create'))
+		{
+			$toolbar->addNew('foo.add');
+		}

-		$toolbar->preferences('com_foos');
+		if ($canDo->get('core.options'))
+		{
+			$toolbar->preferences('com_foos');
+		}
 	}
-
 }
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/ tmpl/foo/edit.php

The entry `<?php echo $this->getForm()->renderField(access);` is necessary to include the field in the form, which we have already configured in the XML file. Only this way it is possible to change the permissions per element.

[administrator/components/com_foos/tmpl/foo/edit.php](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 <form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
 	<?php echo $this->getForm()->renderField('name'); ?>
 	<?php echo $this->getForm()->renderField('alias'); ?>
+	<?php echo $this->getForm()->renderField('access'); ?>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/ tmpl/foos/default.php

Last but not least, we include a column in the overview for the authorization display.

[administrator/components/com_foos/tmpl/foos/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t10/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_NAME'); ?>
 								</th>
+								<th scope="col" style="width:10%" class="d-none d-md-table-cell">
+									<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>
+								</th>
 								<th scope="col">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_ID'); ?>
 								</th>

 										<?php echo $editIcon; ?><?php echo $this->escape($item->name); ?></a>

 								</th>
+								<td class="small d-none d-md-table-cell">
+									<?php echo $item->access_level; ?>
+								</td>
 								<td class="d-none d-md-table-cell">
 									<?php echo $item->id; ?>
 								</td>
```

> Note that I have not covered all cases here where permissions need to be handled. This description is intended as a best practice.

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder to the `administrator` folder of your Joomla 4 installation. Install your component as described in part one, after copying all files. Joomla will update the database for you during the installation.

2. create a new item in your component. Make sure that you are offered a checkbox for saving a permission. The value you enter here will be saved with the item and can be queried when it is displayed in a list.

![Joomla Configuration - Set permissions in an element](/images/j4x12x1.png)

3. consider how you use the permission set in point 2 for your purposes? So far, the value is only stored, we do not use it.

4. for an overview, the value is additionally displayed in the main view.

![Joomla Configuration - Display permissions in the overview list](/images/j4x12x2.png)

5. Open the options of the global configuration. Here you have the possibility to set the permissions for the use of the component globally.

![Joomla Configuration - Permissions in the Global Configuration](/images/j4x12x3.png)

6. Play with the settings. Allow the administrator to use the component in the backend. But remove his right to create new elements in the extension. After that, log in as a simple administrator and make sure that the 'New' button has disappeared.

## Links

[Access Control List Tutorial](https://docs.joomla.org/J3.x:Access_Control_List_Tutorial)[^docs.joomla.org/j3.x:access_control_list_tutorial]
<img src="https://vg08.met.vgwort.de/na/6c4267266502456d9b38fa2fbc04f534" width="1" height="1" alt="">
