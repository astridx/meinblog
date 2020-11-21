---
date: 2019-12-19
title: 'Mehrsprachigkeit'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-mehrsprachigkeit
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Mit Joomla! ist es möglich, eine mehrsprachige Website einzurichten, ohne Erweiterungen von Dritten zu installieren. In diesem Tutorial zeige ich dir, wie du deine Komponente so programmierst, dass sie Sprachverknüpfungen unterstützt.

> Abgrenzung Mehrsprachigkeit und Sprachverknüpfungen: Mehrsprachige Inhalte, Menüpunkte und Sprachumschalter werden mit einer Standard Joomla Installation ohne zusätzliche Erweiterungen eingerichtet. Bis zur Version 3.7 war es in Joomla erforderlich, zwischen Ansichten zu wechseln, um Inhalte zu übersetzen. Seit 3.7 gibt eine Verbesserung der Usability, die sogenannten Sprachverknüpfungen. Mit dieser Erweiterung lassen sich mehrsprachige Inhalte benutzerfreundlich erstellen und verknüpfen. Dabei bleibt man in einer Ansicht. Die Sprachverknüpfungen zeigen nebenbei, welche mehrsprachigen Inhalte fehlen.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x5.png)

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x6.png)

Das Kapitel ist eines der umfangreichsten in dieser Serie. Dafür deckt es alle Bereiche der Mehrsprachigkeit und der Sprachverknüpfungen in Joomla ab.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t14b...t15a) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Damit die Sprache zum Element gespeichert wird, fügen wir eine Spalte zur Datenbanktabelle hinzu. Bei einer Aktualisierung ist das Skript `15.0.0.sql` dasjenige, welches für Version 15.0.0. ausgeführt wird.

#### [src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-fa2e66efed41380705fb9f91c257ea9c)

[src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql)

```sql {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/d64685046cedc970243139a3c7846c68e6cd56f9/src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*' AFTER `alias`;
ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);
```

#### [src/administrator/components/com_foos/src/Helper/AssociationsHelper.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-89e05e395916539c641802f3bb6165c5)

Die Hilfsdatei `AssociationsHelper.php` ist die Schnittstelle zur Komponente Sprachverknüpfungen `com_associations`. `AssociationsHelper.php` gibt es im Frontend und im Backend - letztere sehen wir uns als erstes an, die Fontend-Version kommt später in diesem Kapitel hinzu.

In dieser Helper-Datei stellen wir die Angaben bereit, die für unsere Komponente spezifisch sind, so dass die Joomla eigenen Routinen sich in unserer Komponente zurecht finden.

[src/administrator/components/com_foos/src/Helper/AssociationsHelper.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Helper/AssociationsHelper.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/d64685046cedc970243139a3c7846c68e6cd56f9/src/administrator/components/com_foos/src/Helper/AssociationsHelper.php

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
	protected $itemTypes = array('foo', 'category');

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

		if ($typeName === 'category')
		{
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
		if (empty($id))
		{
			return null;
		}

		$table = null;

		switch ($typeName)
		{
			case 'foo':
				$table = Table::getInstance('FooTable', 'FooNamespace\\Component\\Foos\\Administrator\\Table\\');
				break;

			case 'category':
				$table = Table::getInstance('Category');
				break;
		}

		if (empty($table))
		{
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
		$tables  = array();
		$joins   = array();
		$support = $this->getSupportTemplate();
		$title   = '';

		if (in_array($typeName, $this->itemTypes))
		{
			switch ($typeName)
			{
				case 'foo':
					$fields['title'] = 'a.name';
					$fields['state'] = 'a.published';

					$support['state'] = true;
					$support['acl'] = true;
					$support['category'] = true;
					$support['save2copy'] = true;

					$tables = array(
						'a' => '#__foos_details'
					);

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

					$tables = array(
						'a' => '#__categories'
					);

					$title = 'category';
					break;
			}
		}

		return array(
			'fields'  => $fields,
			'support' => $support,
			'tables'  => $tables,
			'joins'   => $joins,
			'title'   => $title
		);
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
		return array(
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
		);
	}
}

```

#### [src/administrator/components/com_foos/tmpl/foo/edit_associations.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-00a681faa92b56a5268be6268afbe52f)

Wir haben keine speziellen Wünsche und nutzen deshalb das Standardtemplate zum Editieren der Sprachverknüpfungen. Du findest das im Verzeichnis `/layouts/joomla/edit/associations.php`. Wie du es lädst zeigt dir der nachfolgende Beispielcode.

> Falls du spezielle Wünsche hast, kopiere `/layouts/joomla/edit/associations.php` in deine Komponente und ändere sie wunschgemäß ab. Wie und wo du sie speicherst oder aufrufst, wird später Kapitel zu Layouts behandelt.

[src/administrator/components/com_foos/tmpl/foo/edit_associations.php](https://github.com/astridx/boilerplate/blob/3e4020a2fb91237a269e49d24b9ff695f4d7ecec/src/administrator/components/com_foos/tmpl/foo/edit_associations.php)

```php {numberLines: -2}
// https://github.com/astridx/boilerplate/raw/d64685046cedc970243139a3c7846c68e6cd56f9/src/administrator/components/com_foos/tmpl/foo/edit_associations.php

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

#### [src/components/com_foos/src/Helper/AssociationHelper.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-2c4c9f6ac9ee1dafc30e300dc667f323)

Die Hilfsdatei `AssociationsHelper.php` ist die Schnittstelle zur Komponente Sprachverknüpfungen `com_associations`. In ihr konfigurieren wir die Angaben, die für unsere Komponente spezifisch sind. Ist dies erledigt, übernehmen die Joomla eigenen Routinen und wir erfinden das Rad nicht neu.

> Achtung: Ich hatte es schon geschrieben: Die Klasse `AssociationsHelper.php` gibt es im Frontend und im Backend: `src/components/com_foos/src/Helper/AssociationHelper.php` und `src/` `administrator` `/components/com_foos/src/Helper/AssociationHelper.php`. Die Datei für das Backend hatten wir vorher schon angesehen.

[src/components/com_foos/src/Helper/AssociationHelper.php](https://github.com/astridx/boilerplate/blob/3e4020a2fb91237a269e49d24b9ff695f4d7ecec/src/components/com_foos/src/Helper/AssociationHelper.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/d64685046cedc970243139a3c7846c68e6cd56f9/src/components/com_foos/src/Helper/AssociationHelper.php

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

		if ($view === 'foos')
		{
			if ($id)
			{
				$associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $id);

				$return = array();

				foreach ($associations as $tag => $item)
				{
					$return[$tag] = RouteHelper::getFoosRoute($item->id, (int) $item->catid, $item->language);
				}

				return $return;
			}
		}

		if ($view === 'category' || $view === 'categories')
		{
			return self::getCategoryAssociations($id, 'com_foos');
		}

		return array();

	}
}

```

#### [src/components/com_foos/src/Helper/RouteHelper.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-61bf17fac4ad652aec8237decb7db764349e1595597457840faddf6c3b93786b)

Wir erzeugen die Klasse `RouteHelper`, damit die Links korrekt zusammengesetzt werden, die wir in diesem Kapitel erstellen. Im Link ist eine weitere Information als Parameter enthalten: die Sprache.

[src/components/com_foos/src/Helper/RouteHelper.php](https://github.com/astridx/boilerplate/blob/d64685046cedc970243139a3c7846c68e6cd56f9/src/components/com_foos/src/Helper/RouteHelper.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/d64685046cedc970243139a3c7846c68e6cd56f9/src/components/com_foos/src/Helper/RouteHelper.php

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

		if ($catid > 1)
		{
			$link .= '&catid=' . $catid;
		}

		if ($language && $language !== '*' && Multilanguage::isEnabled())
		{
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

		if ($catid > 1)
		{
			$link .= '&catid=' . $catid;
		}

		if ($language && $language !== '*' && Multilanguage::isEnabled())
		{
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
		if ($catid instanceof CategoryNode)
		{
			$id = $catid->id;
		}
		else
		{
			$id = (int) $catid;
		}

		if ($id < 1)
		{
			$link = '';
		}
		else
		{
			// Create the link
			$link = 'index.php?option=com_foos&view=category&id=' . $id;

			if ($language && $language !== '*' && Multilanguage::isEnabled())
			{
				$link .= '&lang=' . $language;
			}
		}

		return $link;
	}
}

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-262e27353fbe755d3813ea2df19cd0ed)

Wir erstellen ein Feld, über das ein Autor die Sprachverknüpfung auswählt. Damit Joomla dieses Feld findet, gibt man den Pfad in der Form `addfieldprefix="FooNamespace\Component\Foos\Administrator\Field"` als Parameter im `<fieldset>` an.

Außerdem fügen wir ein Feld hinzu, in dem ein Element (Item) einer Sprache zugeordnet wird.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/fc08495c9bf14cb79315da7a3a5a95064351e2a0/src/administrator/components/com_foos/forms/foo.xml)

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
@@ -28,6 +31,14 @@
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

#### [src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

Im Provider registrieren wir unseren `AssociationsHelper` als Service der [AssociationExtensionInterface](https://github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/Association/AssociationExtensionInterface.php) implementiert. So stellen wir sicher, dass alle notwendigen Funktionen vorhanden sind.

[src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/services/provider.php)

```php {diff}
 use Joomla\DI\Container;
 use Joomla\DI\ServiceProviderInterface;
 use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;
+use FooNamespace\Component\Foos\Administrator\Helper\AssociationsHelper;
+use Joomla\CMS\Association\AssociationExtensionInterface;

 /**
  * The foos service provider.
@@ -40,9 +42,11 @@
 	 */
 	public function register(Container $container)
 	{
);
+		$container->set(AssociationExtensionInterface::class, new AssociationsHelper);
('\\NamespaceJoomla\\Component\\Foos'));

 		$container->set(
 			ComponentInterface::class,
@@ -53,6 +57,7 @@ function (Container $container)
 				$component->setRegistry($container->get(Registry::class));
 				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
 				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));
+				$component->setAssociationExtension($container->get(AssociationExtensionInterface::class));

 				return $component;
 			}

```

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-896f245bc8e493f91277fd33913ef974)

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

Damit die Sprache zum Element gespeichert wird, fügen wir eine Spalte in der Datenbanktabelle hinzu. Bei Neuinstallationen ist das Skript `install.mysql.utf8.sql` dasjenige, welches aufgerufen wird.

```php {diff}
 ALTER TABLE `#__foos_details` ADD COLUMN  `publish_down` datetime AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD KEY `idx_state` (`published`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*' AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);

```

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-38764f2b1343234561c0d02cd2991ea1)

In FoosComponent ergänzen wir `AssociationServiceInterface` und `AssociationServiceTrait`, so das alles Notwendige in unserer Erweiterung implementiert ist.

> [Traits](https://www.php.net/manual/de/language.oop5.traits.php) sind ein Mechanismus zur Wiederverwendung von Code, der in Programmiersprachen mit einfacher Vererbung wie PHP verwendet wird.

[src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}

 defined('JPATH_PLATFORM') or die;

+use Joomla\CMS\Association\AssociationServiceInterface;
+use Joomla\CMS\Association\AssociationServiceTrait;
 use Joomla\CMS\Categories\CategoryServiceInterface;
 use Joomla\CMS\Categories\CategoryServiceTrait;
 use Joomla\CMS\Extension\BootableExtensionInterface;
@@ -25,9 +27,11 @@
  *
  * @since  __BUMP_VERSION__
  */
-class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface
+class FoosComponent extends MVCComponent
+implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface
 {
 	use CategoryServiceTrait;
+	use AssociationServiceTrait;
 	use HTMLRegistryAwareTrait;

 	/**

```

#### [src/administrator/components/com_foos/src/Field/Modal/FooField.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-aa20a48089379605365184314b6cc950)

Das Modal haben wir bisher genutzt, um beim Anlegen eines Menüpunkts ein Foo-Element mithilfe eines Popups auszuwählen. Jetzt verwenden wir es wieder, um eine Sprachverknüpfung zu selektieren. Damit nur die passenden Sprachen angezeigt werden, erweitern wir die URL um die Sprachinformation.

[src/administrator/components/com_foos/src/Field/Modal/FooField.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Field/Modal/FooField.php)

```php {diff}
 		// Setup variables for display.
 		$linkFoos = 'index.php?option=com_foos&amp;view=foos&amp;layout=modal&amp;tmpl=component&amp;'
 			. Session::getFormToken() . '=1';
 		$modalTitle   = Text::_('COM_FOOS_CHANGE_FOO');

+		if (isset($this->element['language']))
+		{
+			$linkFoos .= '&amp;forcedLanguage=' . $this->element['language'];
+			$modalTitle .= ' &#8212; ' . $this->element['label'];
+		}
+
 		$urlSelect = $linkFoos . '&amp;function=jSelectFoo_' . $this->id;

 		if ($value)

```

#### [src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-c1b8160bef2d2b36367dc59381d6bcb7)

Das Model mit dem Daten eines Elementes berechnet werden, passen wir bezüglich der Sprache an. Dabei spielen `getItem` und `preprocessForm` die wesentliche Rolle.

[src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\Factory;
+use Joomla\CMS\Language\Associations;
 use Joomla\CMS\MVC\Model\AdminModel;
+use Joomla\CMS\Language\LanguageHelper;

 /**
  * Item Model for a Foo.
@@ -29,6 +31,14 @@ class FooModel extends AdminModel
 	 */
 	public $typeAlias = 'com_foos.foo';

+	/**
+	 * The context used for the associations table
+	 *
+	 * @var    string
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $associationsContext = 'com_foos.item';
+
 	/**
 	 * Method to get the row form.
 	 *
@@ -70,6 +80,86 @@ protected function loadFormData()
 		return $data;
 	}

+	/**
+	 * Method to get a single record.
+	 *
+	 * @param   integer  $pk  The id of the primary key.
+	 *
+	 * @return  mixed  Object on success, false on failure.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function getItem($pk = null)
+	{
+		$item = parent::getItem($pk);
+
+		// Load associated foo items
+		$assoc = Associations::isEnabled();
+
+		if ($assoc)
+		{
+			$item->associations = array();
+
+			if ($item->id != null)
+			{
+				$associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $item->id, 'id', null);
+
+				foreach ($associations as $tag => $association)
+				{
+					$item->associations[$tag] = $association->id;
+				}
+			}
+		}
+
+		return $item;
+	}
+
+	/**
+	 * Preprocess the form.
+	 *
+	 * @param   \JForm  $form   Form object.
+	 * @param   object  $data   Data object.
+	 * @param   string  $group  Group name.
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function preprocessForm(\JForm $form, $data, $group = 'content')
+	{
+		if (Associations::isEnabled())
+		{
+			$languages = LanguageHelper::getContentLanguages(false, true, null, 'ordering', 'asc');
+
+			if (count($languages) > 1)
+			{
+				$addform = new \SimpleXMLElement('<form />');
+				$fields = $addform->addChild('fields');
+				$fields->addAttribute('name', 'associations');
+				$fieldset = $fields->addChild('fieldset');
+				$fieldset->addAttribute('name', 'item_associations');
+
+				foreach ($languages as $language)
+				{
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

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-2daf62ad6c51630353e31eaa3cc28626)

> Achtung: `FooModel.php` ist das Model welches die Daten für ein Element berechnet. `FoosModel.php` - beachte das `s` - ist das Model der Listenansicht - es behandelt Daten für eine Gruppe von Elementen.

Im Model der Liste ist es neben dem Hinzufügen der Sprachinformationen wichtig, den Status über `populateState` zu aktualisieren. Anderfalls ist nicht jederzeit die passende Sprache aktiv. Der Status beinhaltet die Information, welche Sprache aktiv ist.

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\MVC\Model\ListModel;
+use Joomla\CMS\Language\Associations;
+use Joomla\CMS\Factory;

 /**
  * Methods supporting a list of foo records.
@@ -48,7 +50,13 @@ protected function getListQuery()

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
@@ -67,6 +75,76 @@ protected function getListQuery()
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
+	/**
+	 * Method to auto-populate the model state.
+	 *
+	 * Note. Calling getState in this method will result in recursion.
+	 *
+	 * @param   string  $ordering   An optional ordering field.
+	 * @param   string  $direction  An optional direction (asc|desc).
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
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

#### [src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-66f0a18f94a16b0a790b4c8f20a4dd6e)

Wir implementieren den Service `association` in `AdministratorService.php`. Über die ID gibt die Funktion das HTML-Markup zum Bearbeiten der Sprachverknüpfungen zurück.

[src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php)

```php {diff}
defined('JPATH_BASE') or die;

+use Joomla\CMS\Factory;
+use Joomla\CMS\Language\Associations;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Layout\LayoutHelper;
+use Joomla\CMS\Router\Route;
+
 /**
  * Foo HTML class.
  *
@@ -18,4 +24,70 @@
  */
 class AdministratorService
 {
+	/**
+	 * Get the associated language flags
+	 *
+	 * @param   integer  $fooid  The item id to search associations
+	 *
+	 * @return  string  The language HTML
+	 *
+	 * @throws  Exception
+	 */
+	public function association($fooid)
+	{
+		// Defaults
+		$html = '';
+
+		// Get the associations
+		if ($associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $fooid, 'id', null))
+		{
+			foreach ($associations as $tag => $associated)
+			{
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
+			try
+			{
+				$items = $db->loadObjectList('id');
+			}
+			catch (\RuntimeException $e)
+			{
+				throw new \Exception($e->getMessage(), 500, $e);
+			}
+
+			if ($items)
+			{
+				foreach ($items as &$item)
+				{
+					$text = strtoupper($item->lang_sef);
+					$url = Route::_('index.php?option=com_foos&task=foo.edit&id=' . (int) $item->id);
+					$tooltip = '<strong>' . htmlspecialchars($item->language_title, ENT_QUOTES, 'UTF-8') . '</strong><br>'
+						. htmlspecialchars($item->title, ENT_QUOTES, 'UTF-8') . '<br>' . Text::sprintf('JCATEGORY_SPRINTF', $item->category_title);
+					$classes = 'badge badge-secondary';
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

#### [src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

[src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/3e4020a2fb91237a269e49d24b9ff695f4d7ecec/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

Wenn nur eine Sprache möglich ist beziehungsweise das Ändern nicht gewünscht ist, setzen wir den Wert des Sprachauswahlfeldes und schützte es vor Schreibzugriff. Außerdem sind nur Kategorien dieser Sprache auswählbar.

```php {diff}
 		$this->form  = $this->get('Form');
 		$this->item = $this->get('Item');

+		// If we are forcing a language in modal (used for associations).
+		if ($this->getLayout() === 'modal' && $forcedLanguage = Factory::getApplication()->input->get('forcedLanguage', '', 'cmd'))
+		{
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

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-8e3d37bbd99544f976bf8fd323eb5250)

Die View der Liste soll die Sidebar und die Tollbar enthalten, wenn es sich nicht um eine Modalansicht oder ein Popup handelt. Falls die Ansicht modal ist, verwirren Toolbar und Sidebar. In dem Fall filtern wir die Items automatisch nach der gerade aktiven Sprache.

[src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 use Joomla\CMS\Toolbar\Toolbar;
 use Joomla\CMS\Toolbar\ToolbarHelper;
 use FooNamespace\Component\Foos\Administrator\Helper\FooHelper;
+use Joomla\CMS\Factory;

 /**
  * View class for a list of foos.
@@ -53,7 +54,22 @@ public function display($tpl = null): void
 	{
 		$this->items = $this->get('Items');

-		$this->addToolbar();
-		$this->sidebar = \JHtmlSidebar::render();

+		// We don't need toolbar in the modal window.
+		if ($this->getLayout() !== 'modal')
+		{
+			$this->addToolbar();
+			$this->sidebar = \JHtmlSidebar::render();
+		}
+		else
+		{
+			// In article associations modal we need to remove language filter if forcing a language.
+			// We also need to change the category filter to show show categories with All or the forced language.
+			if ($forcedLanguage = Factory::getApplication()->input->get('forcedLanguage', '', 'CMD'))
+			{
+				// If the language is forced we can't allow to select the language, so transform the language selector filter into a hidden field.
+				$languageXml = new \SimpleXMLElement('<field name="language" type="hidden" default="' . $forcedLanguage . '" />');
+			}
+		}

 		parent::display($tpl);
 	}

```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-1637778e5f7d1d56dd1751af1970f01b)

Im Formular zum Editieren eines Elementes fügen wir ein Formularfeld zum Festelegen der Sprache ein.

[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}

 use Joomla\CMS\Factory;
 use Joomla\CMS\HTML\HTMLHelper;
+use Joomla\CMS\Language\Associations;
 use Joomla\CMS\Router\Route;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\Layout\LayoutHelper;
@@ -18,6 +19,9 @@
 $app = Factory::getApplication();
 $input = $app->input;

+$assoc = Associations::isEnabled();
+
+$this->ignore_fieldsets = array('item_associations');
 $this->useCoreUI = true;

 $wa = $this->document->getWebAssetManager();
@@ -45,12 +49,19 @@
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

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-3186af99ea4e3321b497b86fcd1cd757)

In der Übersicht zur Komponenten im Administrationsbereich ergänzen wir Spalten, um die Sprachinformationen anzuzeigen. Diese Spalten zeigen wir lediglich an, wenn es erforderlich ist. Dies ist der Fall, wenn Sprachverknüpfungen und Mehrsprachigkeit aktiviert sind. Um dies herauszufinden nutzen wir die Joomla eigene Funktionen `Associations::isEnabled()` und `Multilanguage::isEnabled()`.

[src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/d64685046cedc970243139a3c7846c68e6cd56f9/src/administrator/components/com_foos/tmpl/foos/default.php)

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
@@ -41,6 +47,19 @@
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
+								<th scope="col" style="width:1%; min-width:85px" class="text-center">
+									<?php echo Text::_('JSTATUS'); ?>
+								</th>
 								<th scope="col">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_ID'); ?>
 								</th>
@@ -75,6 +94,22 @@
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

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Installiere über `System | Install | Languages` mindestens eine weitere Sprache.

4. Stelle über `System | Manage | Plugins` sicher, dass das Plugin `Sample Data - Multilingual` veröffentlicht ist.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x1.png)

5. Wechsele zurück zum `Home Dashboard` und installiere die Beispieldateien `Multilinguale Sample Data`.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x3.png)

6. Öffne die Ansicht eines Items deiner Komponente im Administrationsbereich und überzeuge dich davon, dass der Status `Language` änderbar ist. Ändere diesen von `All` in eine beliebige Sprache.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x2.png)

7. Spiele mit den Sprachverknüpfungen und überzeuge dich davon, dass alles korrekt verknüpft wird.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x4.png)

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x5.png)

8. Erweitere die Tests auf die Komponente `Multilingual Associations`. Diese unterstützt deine Erweiterung ebenfalls.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x6.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t14b...t15a.diff

diff --git a/src/administrator/components/com_foos/forms/foo.xml b/src/administrator/components/com_foos/forms/foo.xml
index 29030084..48811dd9 100644
--- a/src/administrator/components/com_foos/forms/foo.xml
+++ b/src/administrator/components/com_foos/forms/foo.xml
@@ -1,6 +1,9 @@
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
@@ -28,6 +31,14 @@
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
diff --git a/src/administrator/components/com_foos/services/provider.php b/src/administrator/components/com_foos/services/provider.php
index 47fb5974..4c8d7c8f 100644
--- a/src/administrator/components/com_foos/services/provider.php
+++ b/src/administrator/components/com_foos/services/provider.php
@@ -20,6 +20,8 @@
 use Joomla\DI\Container;
 use Joomla\DI\ServiceProviderInterface;
 use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;
+use FooNamespace\Component\Foos\Administrator\Helper\AssociationsHelper;
+use Joomla\CMS\Association\AssociationExtensionInterface;

 /**
  * The foos service provider.
@@ -40,6 +42,8 @@
 	 */
 	public function register(Container $container)
 	{
+		$container->set(AssociationExtensionInterface::class, new AssociationsHelper);
+
 		$container->registerServiceProvider(new CategoryFactory('\\FooNamespace\\Component\\Foos'));
 		$container->registerServiceProvider(new MVCFactory('\\FooNamespace\\Component\\Foos'));
 		$container->registerServiceProvider(new ComponentDispatcherFactory('\\FooNamespace\\Component\\Foos'));
@@ -53,6 +57,7 @@ function (Container $container)
 				$component->setRegistry($container->get(Registry::class));
 				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
 				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));
+				$component->setAssociationExtension($container->get(AssociationExtensionInterface::class));

 				return $component;
 			}
diff --git a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
index 87a3a0a0..5517b4c3 100644
--- a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
+++ b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
@@ -27,3 +27,7 @@ ALTER TABLE `#__foos_details` ADD COLUMN  `publish_up` datetime AFTER `alias`;
 ALTER TABLE `#__foos_details` ADD COLUMN  `publish_down` datetime AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD KEY `idx_state` (`published`);
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*' AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);
diff --git a/src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql b/src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql
new file mode 100644
index 00000000..d3ab7545
--- /dev/null
+++ b/src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql
@@ -0,0 +1,3 @@
+ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*' AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);
diff --git a/src/administrator/components/com_foos/src/Extension/FoosComponent.php b/src/administrator/components/com_foos/src/Extension/FoosComponent.php
index 831a13f6..0aca19d5 100644
--- a/src/administrator/components/com_foos/src/Extension/FoosComponent.php
+++ b/src/administrator/components/com_foos/src/Extension/FoosComponent.php
@@ -11,6 +11,8 @@

 defined('JPATH_PLATFORM') or die;

+use Joomla\CMS\Association\AssociationServiceInterface;
+use Joomla\CMS\Association\AssociationServiceTrait;
 use Joomla\CMS\Categories\CategoryServiceInterface;
 use Joomla\CMS\Categories\CategoryServiceTrait;
 use Joomla\CMS\Extension\BootableExtensionInterface;
@@ -25,9 +27,11 @@
  *
  * @since  __BUMP_VERSION__
  */
-class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface
+class FoosComponent extends MVCComponent
+implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface
 {
 	use CategoryServiceTrait;
+	use AssociationServiceTrait;
 	use HTMLRegistryAwareTrait;

 	/**
diff --git a/src/administrator/components/com_foos/src/Field/Modal/FooField.php b/src/administrator/components/com_foos/src/Field/Modal/FooField.php
index e8704d68..1387c0be 100644
--- a/src/administrator/components/com_foos/src/Field/Modal/FooField.php
+++ b/src/administrator/components/com_foos/src/Field/Modal/FooField.php
@@ -81,10 +81,14 @@ function jSelectFoo_"
 		// Setup variables for display.
 		$linkFoos = 'index.php?option=com_foos&amp;view=foos&amp;layout=modal&amp;tmpl=component&amp;'
 			. Session::getFormToken() . '=1';
-		$linkFoo  = 'index.php?option=com_foos&amp;view=foo&amp;layout=modal&amp;tmpl=component&amp;'
-			. Session::getFormToken() . '=1';
 		$modalTitle   = Text::_('COM_FOOS_CHANGE_FOO');

+		if (isset($this->element['language']))
+		{
+			$linkFoos .= '&amp;forcedLanguage=' . $this->element['language'];
+			$modalTitle .= ' &#8212; ' . $this->element['label'];
+		}
+
 		$urlSelect = $linkFoos . '&amp;function=jSelectFoo_' . $this->id;

 		if ($value)
diff --git a/src/administrator/components/com_foos/src/Helper/AssociationsHelper.php b/src/administrator/components/com_foos/src/Helper/AssociationsHelper.php
new file mode 100644
index 00000000..cf8929fe
--- /dev/null
+++ b/src/administrator/components/com_foos/src/Helper/AssociationsHelper.php
@@ -0,0 +1,237 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Helper;
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Association\AssociationExtensionHelper;
+use Joomla\CMS\Language\Associations;
+use Joomla\CMS\Table\Table;
+use FooNamespace\Component\Foos\Site\Helper\AssociationHelper;
+
+/**
+ * Content associations helper.
+ *
+ * @since  __BUMP_VERSION__
+ */
+class AssociationsHelper extends AssociationExtensionHelper
+{
+	/**
+	 * The extension name
+	 *
+	 * @var     array   $extension
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected $extension = 'com_foos';
+
+	/**
+	 * Array of item types
+	 *
+	 * @var     array   $itemTypes
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected $itemTypes = array('foo', 'category');
+
+	/**
+	 * Has the extension association support
+	 *
+	 * @var     boolean   $associationsSupport
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected $associationsSupport = true;
+
+	/**
+	 * Method to get the associations for a given item.
+	 *
+	 * @param   integer  $id    Id of the item
+	 * @param   string   $view  Name of the view
+	 *
+	 * @return  array   Array of associations for the item
+	 *
+	 * @since  __BUMP_VERSION__
+	 */
+	public function getAssociationsForItem($id = 0, $view = null)
+	{
+		return AssociationHelper::getAssociations($id, $view);
+	}
+
+	/**
+	 * Get the associated items for an item
+	 *
+	 * @param   string  $typeName  The item type
+	 * @param   int     $id        The id of item for which we need the associated items
+	 *
+	 * @return  array
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function getAssociations($typeName, $id)
+	{
+		$type = $this->getType($typeName);
+
+		$context    = $this->extension . '.item';
+		$catidField = 'catid';
+
+		if ($typeName === 'category')
+		{
+			$context    = 'com_categories.item';
+			$catidField = '';
+		}
+
+		// Get the associations.
+		$associations = Associations::getAssociations(
+			$this->extension,
+			$type['tables']['a'],
+			$context,
+			$id,
+			'id',
+			'alias',
+			$catidField
+		);
+
+		return $associations;
+	}
+
+	/**
+	 * Get item information
+	 *
+	 * @param   string  $typeName  The item type
+	 * @param   int     $id        The id of item for which we need the associated items
+	 *
+	 * @return  Table|null
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function getItem($typeName, $id)
+	{
+		if (empty($id))
+		{
+			return null;
+		}
+
+		$table = null;
+
+		switch ($typeName)
+		{
+			case 'foo':
+				$table = Table::getInstance('FooTable', 'FooNamespace\\Component\\Foos\\Administrator\\Table\\');
+				break;
+
+			case 'category':
+				$table = Table::getInstance('Category');
+				break;
+		}
+
+		if (empty($table))
+		{
+			return null;
+		}
+
+		$table->load($id);
+
+		return $table;
+	}
+
+	/**
+	 * Get information about the type
+	 *
+	 * @param   string  $typeName  The item type
+	 *
+	 * @return  array  Array of item types
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function getType($typeName = '')
+	{
+		$fields  = $this->getFieldsTemplate();
+		$tables  = array();
+		$joins   = array();
+		$support = $this->getSupportTemplate();
+		$title   = '';
+
+		if (in_array($typeName, $this->itemTypes))
+		{
+			switch ($typeName)
+			{
+				case 'foo':
+					$fields['title'] = 'a.name';
+					$fields['state'] = 'a.published';
+
+					$support['state'] = true;
+					$support['acl'] = true;
+					$support['category'] = true;
+					$support['save2copy'] = true;
+
+					$tables = array(
+						'a' => '#__foos_details'
+					);
+
+					$title = 'foo';
+					break;
+
+				case 'category':
+					$fields['created_user_id'] = 'a.created_user_id';
+					$fields['ordering'] = 'a.lft';
+					$fields['level'] = 'a.level';
+					$fields['catid'] = '';
+					$fields['state'] = 'a.published';
+
+					$support['state'] = true;
+					$support['acl'] = true;
+					$support['checkout'] = false;
+					$support['level'] = false;
+
+					$tables = array(
+						'a' => '#__categories'
+					);
+
+					$title = 'category';
+					break;
+			}
+		}
+
+		return array(
+			'fields'  => $fields,
+			'support' => $support,
+			'tables'  => $tables,
+			'joins'   => $joins,
+			'title'   => $title
+		);
+	}
+
+	/**
+	 * Get default values for fields array
+	 *
+	 * @return  array
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function getFieldsTemplate()
+	{
+		return array(
+			'id'                  => 'a.id',
+			'title'               => 'a.title',
+			'alias'               => 'a.alias',
+			'ordering'            => '',
+			'menutype'            => '',
+			'level'               => '',
+			'catid'               => 'a.catid',
+			'language'            => 'a.language',
+			'access'              => 'a.access',
+			'state'               => 'a.state',
+			'created_user_id'     => '',
+			'checked_out'         => '',
+			'checked_out_time'    => ''
+		);
+	}
+}
diff --git a/src/administrator/components/com_foos/src/Model/FooModel.php b/src/administrator/components/com_foos/src/Model/FooModel.php
index 32a964a0..70fdd2e0 100644
--- a/src/administrator/components/com_foos/src/Model/FooModel.php
+++ b/src/administrator/components/com_foos/src/Model/FooModel.php
@@ -12,7 +12,9 @@
 \defined('_JEXEC') or die;

 use Joomla\CMS\Factory;
+use Joomla\CMS\Language\Associations;
 use Joomla\CMS\MVC\Model\AdminModel;
+use Joomla\CMS\Language\LanguageHelper;

 /**
  * Item Model for a Foo.
@@ -29,6 +31,14 @@ class FooModel extends AdminModel
 	 */
 	public $typeAlias = 'com_foos.foo';

+	/**
+	 * The context used for the associations table
+	 *
+	 * @var    string
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $associationsContext = 'com_foos.item';
+
 	/**
 	 * Method to get the row form.
 	 *
@@ -70,6 +80,86 @@ protected function loadFormData()
 		return $data;
 	}

+	/**
+	 * Method to get a single record.
+	 *
+	 * @param   integer  $pk  The id of the primary key.
+	 *
+	 * @return  mixed  Object on success, false on failure.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function getItem($pk = null)
+	{
+		$item = parent::getItem($pk);
+
+		// Load associated foo items
+		$assoc = Associations::isEnabled();
+
+		if ($assoc)
+		{
+			$item->associations = array();
+
+			if ($item->id != null)
+			{
+				$associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $item->id, 'id', null);
+
+				foreach ($associations as $tag => $association)
+				{
+					$item->associations[$tag] = $association->id;
+				}
+			}
+		}
+
+		return $item;
+	}
+
+	/**
+	 * Preprocess the form.
+	 *
+	 * @param   \JForm  $form   Form object.
+	 * @param   object  $data   Data object.
+	 * @param   string  $group  Group name.
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function preprocessForm(\JForm $form, $data, $group = 'content')
+	{
+		if (Associations::isEnabled())
+		{
+			$languages = LanguageHelper::getContentLanguages(false, true, null, 'ordering', 'asc');
+
+			if (count($languages) > 1)
+			{
+				$addform = new \SimpleXMLElement('<form />');
+				$fields = $addform->addChild('fields');
+				$fields->addAttribute('name', 'associations');
+				$fieldset = $fields->addChild('fieldset');
+				$fieldset->addAttribute('name', 'item_associations');
+
+				foreach ($languages as $language)
+				{
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
diff --git a/src/administrator/components/com_foos/src/Model/FoosModel.php b/src/administrator/components/com_foos/src/Model/FoosModel.php
index 20e61378..a168ab54 100644
--- a/src/administrator/components/com_foos/src/Model/FoosModel.php
+++ b/src/administrator/components/com_foos/src/Model/FoosModel.php
@@ -12,6 +12,8 @@
 \defined('_JEXEC') or die;

 use Joomla\CMS\MVC\Model\ListModel;
+use Joomla\CMS\Language\Associations;
+use Joomla\CMS\Factory;

 /**
  * Methods supporting a list of foo records.
@@ -48,7 +50,13 @@ protected function getListQuery()

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
@@ -67,6 +75,76 @@ protected function getListQuery()
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
+	/**
+	 * Method to auto-populate the model state.
+	 *
+	 * Note. Calling getState in this method will result in recursion.
+	 *
+	 * @param   string  $ordering   An optional ordering field.
+	 * @param   string  $direction  An optional direction (asc|desc).
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
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
diff --git a/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php b/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php
index 10c48b42..b3ca4cb1 100644
--- a/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php
+++ b/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php
@@ -11,6 +11,12 @@

 defined('JPATH_BASE') or die;

+use Joomla\CMS\Factory;
+use Joomla\CMS\Language\Associations;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Layout\LayoutHelper;
+use Joomla\CMS\Router\Route;
+
 /**
  * Foo HTML class.
  *
@@ -18,4 +24,70 @@
  */
 class AdministratorService
 {
+	/**
+	 * Get the associated language flags
+	 *
+	 * @param   integer  $fooid  The item id to search associations
+	 *
+	 * @return  string  The language HTML
+	 *
+	 * @throws  Exception
+	 */
+	public function association($fooid)
+	{
+		// Defaults
+		$html = '';
+
+		// Get the associations
+		if ($associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $fooid, 'id', null))
+		{
+			foreach ($associations as $tag => $associated)
+			{
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
+			try
+			{
+				$items = $db->loadObjectList('id');
+			}
+			catch (\RuntimeException $e)
+			{
+				throw new \Exception($e->getMessage(), 500, $e);
+			}
+
+			if ($items)
+			{
+				foreach ($items as &$item)
+				{
+					$text = strtoupper($item->lang_sef);
+					$url = Route::_('index.php?option=com_foos&task=foo.edit&id=' . (int) $item->id);
+					$tooltip = '<strong>' . htmlspecialchars($item->language_title, ENT_QUOTES, 'UTF-8') . '</strong><br>'
+						. htmlspecialchars($item->title, ENT_QUOTES, 'UTF-8') . '<br>' . Text::sprintf('JCATEGORY_SPRINTF', $item->category_title);
+					$classes = 'badge badge-secondary';
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
diff --git a/src/administrator/components/com_foos/src/View/Foo/HtmlView.php b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php
index 094a0a9f..206f748c 100644
--- a/src/administrator/components/com_foos/src/View/Foo/HtmlView.php
+++ b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php
@@ -49,6 +49,17 @@ public function display($tpl = null)
 		$this->form  = $this->get('Form');
 		$this->item = $this->get('Item');

+		// If we are forcing a language in modal (used for associations).
+		if ($this->getLayout() === 'modal' && $forcedLanguage = Factory::getApplication()->input->get('forcedLanguage', '', 'cmd'))
+		{
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
diff --git a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
index b80449d8..af7c2fa6 100644
--- a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
+++ b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
@@ -18,6 +18,7 @@
 use Joomla\CMS\Toolbar\Toolbar;
 use Joomla\CMS\Toolbar\ToolbarHelper;
 use FooNamespace\Component\Foos\Administrator\Helper\FooHelper;
+use Joomla\CMS\Factory;

 /**
  * View class for a list of foos.
@@ -53,7 +54,22 @@ public function display($tpl = null): void
 	{
 		$this->items = $this->get('Items');

-		$this->addToolbar();
+		// We don't need toolbar in the modal window.
+		if ($this->getLayout() !== 'modal')
+		{
+			$this->addToolbar();
+			$this->sidebar = \JHtmlSidebar::render();
+		}
+		else
+		{
+			// In article associations modal we need to remove language filter if forcing a language.
+			// We also need to change the category filter to show show categories with All or the forced language.
+			if ($forcedLanguage = Factory::getApplication()->input->get('forcedLanguage', '', 'CMD'))
+			{
+				// If the language is forced we can't allow to select the language, so transform the language selector filter into a hidden field.
+				$languageXml = new \SimpleXMLElement('<field name="language" type="hidden" default="' . $forcedLanguage . '" />');
+			}
+		}

 		parent::display($tpl);
 	}
diff --git a/src/administrator/components/com_foos/tmpl/foo/edit.php b/src/administrator/components/com_foos/tmpl/foo/edit.php
index c195acf8..e1dddc2e 100644
--- a/src/administrator/components/com_foos/tmpl/foo/edit.php
+++ b/src/administrator/components/com_foos/tmpl/foo/edit.php
@@ -11,6 +11,7 @@

 use Joomla\CMS\Factory;
 use Joomla\CMS\HTML\HTMLHelper;
+use Joomla\CMS\Language\Associations;
 use Joomla\CMS\Router\Route;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\Layout\LayoutHelper;
@@ -18,6 +19,9 @@
 $app = Factory::getApplication();
 $input = $app->input;

+$assoc = Associations::isEnabled();
+
+$this->ignore_fieldsets = array('item_associations');
 $this->useCoreUI = true;

 $wa = $this->document->getWebAssetManager();
@@ -45,12 +49,19 @@
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
diff --git a/src/administrator/components/com_foos/tmpl/foo/edit_associations.php b/src/administrator/components/com_foos/tmpl/foo/edit_associations.php
new file mode 100644
index 00000000..71442d04
--- /dev/null
+++ b/src/administrator/components/com_foos/tmpl/foo/edit_associations.php
@@ -0,0 +1,14 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Layout\LayoutHelper;
+
+echo LayoutHelper::render('joomla.edit.associations', $this);
diff --git a/src/administrator/components/com_foos/tmpl/foos/default.php b/src/administrator/components/com_foos/tmpl/foos/default.php
index b72ffc89..5014bb2d 100644
--- a/src/administrator/components/com_foos/tmpl/foos/default.php
+++ b/src/administrator/components/com_foos/tmpl/foos/default.php
@@ -11,6 +11,12 @@
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
@@ -41,6 +47,19 @@
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
+								<th scope="col" style="width:1%; min-width:85px" class="text-center">
+									<?php echo Text::_('JSTATUS'); ?>
+								</th>
 								<th scope="col">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_ID'); ?>
 								</th>
@@ -75,6 +94,22 @@
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
diff --git a/src/components/com_foos/src/Helper/AssociationHelper.php b/src/components/com_foos/src/Helper/AssociationHelper.php
new file mode 100644
index 00000000..d92ccc98
--- /dev/null
+++ b/src/components/com_foos/src/Helper/AssociationHelper.php
@@ -0,0 +1,67 @@
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Site\Helper;
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Factory;
+use Joomla\CMS\Language\Associations;
+use Joomla\Component\Categories\Administrator\Helper\CategoryAssociationHelper;
+use FooNamespace\Component\Foos\Site\Helper\RouteHelper;
+
+/**
+ * Foos Component Association Helper
+ *
+ * @since  __BUMP_VERSION__
+ */
+abstract class AssociationHelper extends CategoryAssociationHelper
+{
+	/**
+	 * Method to get the associations for a given item
+	 *
+	 * @param   integer  $id    Id of the item
+	 * @param   string   $view  Name of the view
+	 *
+	 * @return  array   Array of associations for the item
+	 *
+	 * @since  __BUMP_VERSION__
+	 */
+	public static function getAssociations($id = 0, $view = null)
+	{
+		$jinput = Factory::getApplication()->input;
+		$view = $view ?? $jinput->get('view');
+		$id = empty($id) ? $jinput->getInt('id') : $id;
+
+		if ($view === 'foos')
+		{
+			if ($id)
+			{
+				$associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $id);
+
+				$return = array();
+
+				foreach ($associations as $tag => $item)
+				{
+					$return[$tag] = RouteHelper::getFoosRoute($item->id, (int) $item->catid, $item->language);
+				}
+
+				return $return;
+			}
+		}
+
+		if ($view === 'category' || $view === 'categories')
+		{
+			return self::getCategoryAssociations($id, 'com_foos');
+		}
+
+		return array();
+
+	}
+}
diff --git a/src/components/com_foos/src/Helper/RouteHelper.php b/src/components/com_foos/src/Helper/RouteHelper.php
new file mode 100644
index 00000000..34a574af
--- /dev/null
+++ b/src/components/com_foos/src/Helper/RouteHelper.php
@@ -0,0 +1,123 @@
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Site\Helper;
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Categories\CategoryNode;
+use Joomla\CMS\Language\Multilanguage;
+
+/**
+ * Foos Component Route Helper
+ *
+ * @static
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ * @since       __DEPLOY_VERSION__
+ */
+abstract class RouteHelper
+{
+	/**
+	 * Get the URL route for a foos from a foo ID, foos category ID and language
+	 *
+	 * @param   integer  $id        The id of the foos
+	 * @param   integer  $catid     The id of the foos's category
+	 * @param   mixed    $language  The id of the language being used.
+	 *
+	 * @return  string  The link to the foos
+	 *
+	 * @since   __DEPLOY_VERSION__
+	 */
+	public static function getFoosRoute($id, $catid, $language = 0)
+	{
+		// Create the link
+		$link = 'index.php?option=com_foos&view=foos&id=' . $id;
+
+		if ($catid > 1)
+		{
+			$link .= '&catid=' . $catid;
+		}
+
+		if ($language && $language !== '*' && Multilanguage::isEnabled())
+		{
+			$link .= '&lang=' . $language;
+		}
+
+		return $link;
+	}
+
+	/**
+	 * Get the URL route for a foo from a foo ID, foos category ID and language
+	 *
+	 * @param   integer  $id        The id of the foos
+	 * @param   integer  $catid     The id of the foos's category
+	 * @param   mixed    $language  The id of the language being used.
+	 *
+	 * @return  string  The link to the foos
+	 *
+	 * @since   __DEPLOY_VERSION__
+	 */
+	public static function getFooRoute($id, $catid, $language = 0)
+	{
+		// Create the link
+		$link = 'index.php?option=com_foos&view=foo&id=' . $id;
+
+		if ($catid > 1)
+		{
+			$link .= '&catid=' . $catid;
+		}
+
+		if ($language && $language !== '*' && Multilanguage::isEnabled())
+		{
+			$link .= '&lang=' . $language;
+		}
+
+		return $link;
+	}
+
+	/**
+	 * Get the URL route for a foos category from a foos category ID and language
+	 *
+	 * @param   mixed  $catid     The id of the foos's category either an integer id or an instance of CategoryNode
+	 * @param   mixed  $language  The id of the language being used.
+	 *
+	 * @return  string  The link to the foos
+	 *
+	 * @since   __DEPLOY_VERSION__
+	 */
+	public static function getCategoryRoute($catid, $language = 0)
+	{
+		if ($catid instanceof CategoryNode)
+		{
+			$id = $catid->id;
+		}
+		else
+		{
+			$id = (int) $catid;
+		}
+
+		if ($id < 1)
+		{
+			$link = '';
+		}
+		else
+		{
+			// Create the link
+			$link = 'index.php?option=com_foos&view=category&id=' . $id;
+
+			if ($language && $language !== '*' && Multilanguage::isEnabled())
+			{
+				$link .= '&lang=' . $language;
+			}
+		}
+
+		return $link;
+	}
+}

```

## Links
