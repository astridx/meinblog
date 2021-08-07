---
date: 2020-12-07
title: 'Joomla 4.x Tutorial - Extension Development - A database table for your extension'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/eine-joomla-datenbank-fuer-deine-erweiterung
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Your view in the administration area usually does not contain only static text. You display data here that is dynamic. At least that's how most extensions work. That's why in this part we create a database for your component. In the database, we store three records during setup and display them in the administration area. A static list is displayed. The single entries are not changeable via the backend. We will work on that in the next part.

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t5...t6)[^github.com/astridx/boilerplate/compare/t5...t6] and incorporate these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t5...t6#diff-896f245bc8e493f91277fd33913ef974)

We create a file that contains SQL statements for creating the database table<!-- \index{Database} -->. So that these statements are called, we add the name of the file later in the manifest. With `CREATE TABLE IF NOT EXISTS ...` we create the database table if it does not already exist. With `INSERT INTO ...` we store sample contents in the database table.

> In a real extension, I would not add sample data via the SQL file during installation. In Joomla 4, a plugin of the type `sampledata` is a good choice. For inspiration you can find plugins in the directory `joomla-cms/plugins/sampledata`.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t6/src/administrator/components/com_foos/sql/install.mysql.utf8.sql -->

CREATE TABLE IF NOT EXISTS `#__foos_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE=utf8mb4_unicode_ci;

INSERT INTO `#__foos_details` (`name`) VALUES
('Nina'),
('Astrid'),
('Elmar');
```

> Read in the preface of this tutorial what exactly the prefix `#__` means, if you are unfamiliar with it.

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ sql/uninstall.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t5...t6#diff-e256ea429d6d414897f4bfe1730b9d8a)

So that Joomla does not contain unnecessary data in case of uninstallation, we simultaneously create a file that contains the SQL command to delete the database table. This automatically executed when uninstalling.

[administrator/components/com_foos/ sql/uninstall.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/sql/uninstall.mysql.utf8.sql)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t6/src/administrator/components/com_foos/sql/uninstall.mysql.utf8.sql -->

DROP TABLE IF EXISTS `#__foos_details`;
```

> You might think ahead and ask yourself already how to handle potential future database changes. What is needed to store the first name in addition to the name in a future version. SQL updates are name-based in Joomla. This means exactly: For each version of the component you have to create a file whose name consists of the version number and the file extension `.sql` in case database contents change. Practically you will experience this in the further course of this tutorial.

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-2daf62ad6c51630353e31eaa3cc28626)

Next, we create a _Model_ for the administration area. Since we are extending the `ListModel` class, we do not need to take care of the connection to the database ourselves. We create the `getListQuery()` method and specify our specific requirements here. Specific are for example the name of the database table and the column.

> If not done so far, you will see here why the separation of model and view makes sense. Have a look at the method `getListQuery()` in Joomla components, for example in `com_content`. The SQL statement is usually extensive. Therefore it is clearer to encapsulate this from the design part.

The following code shows you the model, which in our case is still quite clear.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6/src/administrator/components/com_foos/src/Model/FoosModel.php

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

use Joomla\CMS\MVC\Model\ListModel;

/**
 * Methods supporting a list of foo records.
 *
 * @since  __BUMP_VERSION__
 */
class FoosModel extends ListModel
{
	/**
	 * Constructor.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @see     \JControllerLegacy
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function __construct($config = [])
	{
		parent::__construct($config);
	}
	/**
	 * Build an SQL query to load the list data.
	 *
	 * @return  \JDatabaseQuery
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function getListQuery()
	{
		// Create a new query object.
		$db = $this->getDbo();
		$query = $db->getQuery(true);

		// Select the required fields from the table.
		$query->select(
			$db->quoteName(['id', 'name', 'alias'])
		);
		$query->from($db->quoteName('#__foos_details'));

		return $query;
	}
}

```

### Modified files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t5...t6#diff-1ff20be1dacde6c4c8e68e90161e0578)

The entry in the installation manifest marked with a plus sign causes the SQL statements in the named files to be called at the right moment, either during an installation or during an uninstallation..

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/foos.xml)

```xml {diff}
 	<description>COM_FOOS_XML_DESCRIPTION</description>
 	<namespace path="src">FooNamespace\Component\Foos</namespace>
 	<scriptfile>script.php</scriptfile>
+	<install> <!-- Runs on install -->
+		<sql>
+			<file driver="mysql" charset="utf8">sql/install.mysql.utf8.sql</file>
+		</sql>
+	</install>
+	<uninstall> <!-- Runs on uninstall -->
+		<sql>
+			<file driver="mysql" charset="utf8">sql/uninstall.mysql.utf8.sql</file>
+		</sql>
+	</uninstall>
 	<!-- Frond-end files -->
 	<files folder="components/com_foos">
 		<folder>src</folder>

 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
 			<folder>services</folder>
+			<folder>sql</folder>
 			<folder>src</folder>
 			<folder>tmpl</folder>
 		</files>

```

> In this example, I only support a MySQL database. [Joomla supports](https://downloads.joomla.org/technical-requirements)[^downloads.joomla.org/technical-requirements] as well as MySQL (from 5.6) and PostgreSQL (from 11). If you also support both databases, you can find an implementation to check out in the [Weblinks component](https://github.com/joomla-extensions/weblinks)[^github.com/joomla-extensions/weblinks]. How you name the [drivers](https://github.com/joomla/joomla-cms/blob/e5db43948ed703492c99fa1f932247a9f611b058/libraries/src/Installer/Installer.php#L948) is flexible. `postgresql` and `mysql` are correct, `mysqli`, `pdomysql` and `pgsql` are adapted by Joomla in the file `/libraries/src/ Installer/Installer.php`.

##### Updates<!-- \index{Database (Update)} -->

For the sake of completeness, I anticipate here changes of a following chapter concerning updating. If something changes, it is sufficient to include only the changes in the database. You should take care that existing data are not affected. You save the changes in a separate file for each version. The directory, where the files for the future updates are to be stored, you write in the `<update>` tag. This is logical, right?

```xml
  ...
  <update>  <!-- Runs on update -->
		<schemas>
			<schemapath type="mysql">sql/updates/mysql</schemapath>
		</schemas>
  </update>
  ...
```

Below you can see the update file `src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql` as an example. This file will be added later in this example.

```xml
ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ services/provider.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

Previously it was not necessary to set the `MVC factory` in `provider.php`, now it is required. Otherwise you will see the following error message or you will be forced to program the connection to the database yourself: `MVC factory not set in Joomla\CMS\Extension\MVCComponent`.

[administrator/components/com_foos/ services/provider.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/services/provider.php)

```php {diff}
 use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
 use Joomla\CMS\Extension\Service\Provider\MVCFactory;
 use Joomla\CMS\HTML\Registry;
+use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
 use Joomla\DI\Container;
 use Joomla\DI\ServiceProviderInterface;
 use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;

 				$component = new FoosComponent($container->get(ComponentDispatcherFactoryInterface::class));

 				$component->setRegistry($container->get(Registry::class));
+				$component->setMVCFactory($container->get(MVCFactoryInterface::class));

 				return $component;
 			}
```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-8e3d37bbd99544f976bf8fd323eb5250)

In the view we get the items at the end. For this we call the method `$this->get('Items')` in the model:

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
  */
 class HtmlView extends BaseHtmlView
 {
+	/**
+	 * An array of items
+	 *
+	 * @var  array
+	 */
+	protected $items;
+
 	/**
 	 * Method to display the view.
 	 *

 	 */
 	public function display($tpl = null): void
 	{
+		$this->items = $this->get('Items');
 		parent::display($tpl);
 	}
 }

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-3186af99ea4e3321b497b86fcd1cd757)

Last but not least, we display everything using the template file. Instead of the static text `Hello Foos` there is now a loop that goes through all elements.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
  */
 \defined('_JEXEC') or die;
 ?>
-Hello Foos
+<?php foreach ($this->items as $i => $item) : ?>
+<?php echo $item->name; ?>
+</br>
+<?php endforeach; ?>

```

> Are you wondering about the syntax in the notation? In the preface I had explained why I choose the [alternative syntax](https://www.php.net/manual/en/control-structures.alternative-syntax.php) for PHP in a template file and enclose the individual lines in PHP tags.

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder to the `administrator` folder of your Joomla 4 installation. Install your component as described in part one, after copying all files. Joomla creates the database during the installation.

2. Next, test if the view of your component in the administration area is correct. Do you see three entries? We had entered these as sample data in the SQL file when setting up the database.

![Joomla Component with Database](/images/j4x7x1.png)

3. make sure that the elements are stored in the database. I use locally [phpmyadmin.net](https://www.phpmyadmin.net/) for database administration.

![Joomla Datenbankansicht in phpMyAdmin](/images/j4x7x2.png)
