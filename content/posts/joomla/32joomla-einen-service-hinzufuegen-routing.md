---
date: 2021-01-01
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Einen Service hinzufügen - Routing'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-einen-service-hinzufuegen-routing
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Suchmaschinenfreundliche URLs funktionieren nicht. Anhand eines Services reparieren wir diesen Missstand.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t26...t27) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/components/com_foos/src/Service/Router.php](https://github.com/astridx/boilerplate/compare/t26...t27#diff-6e8e84b1a865c4d53d5a754fe6331601)

Der Service wandelt die URLs in suchmaschinenfreundliche Versionen.

[src/components/com_foos/src/Service/Router.php](https://github.com/astridx/boilerplate/blob/4f83301e4e7e8cb611ffec99adf00f89aecc599c/src/components/com_foos/src/Service/Router.php)

```php
namespace FooNamespace\Component\Foos\Site\Service;

\defined('_JEXEC') or die;

use Joomla\CMS\Application\SiteApplication;
use Joomla\CMS\Categories\CategoryFactoryInterface;
use Joomla\CMS\Categories\CategoryInterface;
use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Component\Router\RouterView;
use Joomla\CMS\Component\Router\RouterViewConfiguration;
use Joomla\CMS\Component\Router\Rules\MenuRules;
use Joomla\CMS\Component\Router\Rules\NomenuRules;
use Joomla\CMS\Component\Router\Rules\StandardRules;
use Joomla\CMS\Menu\AbstractMenu;
use Joomla\Database\DatabaseInterface;
use Joomla\Database\ParameterType;

class Router extends RouterView
{
	protected $noIDs = false;

	private $categoryFactory;

	private $categoryCache = [];

	private $db;

	public function __construct(SiteApplication $app, AbstractMenu $menu, CategoryFactoryInterface $categoryFactory, DatabaseInterface $db)
	{
		$this->categoryFactory = $categoryFactory;
		$this->db              = $db;

		$params = ComponentHelper::getParams('com_foos');
		$this->noIDs = (bool) $params->get('sef_ids');
		$categories = new RouterViewConfiguration('categories');
		$categories->setKey('id');
		$this->registerView($categories);
		$category = new RouterViewConfiguration('category');
		$category->setKey('id')->setParent($categories, 'catid')->setNestable();
		$this->registerView($category);
		$foo = new RouterViewConfiguration('foo');
		$foo->setKey('id')->setParent($category, 'catid');
		$this->registerView($foo);
		$this->registerView(new RouterViewConfiguration('featured'));
		$form = new RouterViewConfiguration('form');
		$form->setKey('id');
		$this->registerView($form);

		parent::__construct($app, $menu);

		$this->attachRule(new MenuRules($this));
		$this->attachRule(new StandardRules($this));
		$this->attachRule(new NomenuRules($this));
	}

	public function getCategorySegment($id, $query)
	{
		$category = $this->getCategories()->get($id);

		if ($category)
		{
			$path = array_reverse($category->getPath(), true);
			$path[0] = '1:root';

			if ($this->noIDs)
			{
				foreach ($path as &$segment)
				{
					list($id, $segment) = explode(':', $segment, 2);
				}
			}

			return $path;
		}

		return array();
	}

	public function getCategoriesSegment($id, $query)
	{
		return $this->getCategorySegment($id, $query);
	}


	public function getFooSegment($id, $query)
	{
		if (!strpos($id, ':'))
		{
			$id = (int) $id;
			$dbquery = $this->db->getQuery(true);
			$dbquery->select($this->db->quoteName('alias'))
				->from($this->db->quoteName('#__foos_details'))
				->where($this->db->quoteName('id') . ' = :id')
				->bind(':id', $id, ParameterType::INTEGER);
			$this->db->setQuery($dbquery);

			$id .= ':' . $this->db->loadResult();
		}

		if ($this->noIDs)
		{
			list($void, $segment) = explode(':', $id, 2);

			return array($void => $segment);
		}

		return array((int) $id => $id);
	}

	public function getFormSegment($id, $query)
	{
		return $this->getFooSegment($id, $query);
	}

	public function getCategoryId($segment, $query)
	{
		if (isset($query['id']))
		{
			$category = $this->getCategories(['access' => false])->get($query['id']);

			if ($category)
			{
				foreach ($category->getChildren() as $child)
				{
					if ($this->noIDs)
					{
						if ($child->alias == $segment)
						{
							return $child->id;
						}
					}
					else
					{
						if ($child->id == (int) $segment)
						{
							return $child->id;
						}
					}
				}
			}
		}

		return false;
	}

	public function getCategoriesId($segment, $query)
	{
		return $this->getCategoryId($segment, $query);
	}

	public function getFooId($segment, $query)
	{
		if ($this->noIDs)
		{
			$dbquery = $this->db->getQuery(true);
			$dbquery->select($this->db->quoteName('id'))
				->from($this->db->quoteName('#__foos_details'))
				->where(
					[
						$this->db->quoteName('alias') . ' = :alias',
						$this->db->quoteName('catid') . ' = :catid',
					]
				)
				->bind(':alias', $segment)
				->bind(':catid', $query['id'], ParameterType::INTEGER);
			$this->db->setQuery($dbquery);

			return (int) $this->db->loadResult();
		}

		return (int) $segment;
	}

	private function getCategories(array $options = []): CategoryInterface
	{
		$key = serialize($options);

		if (!isset($this->categoryCache[$key]))
		{
			$this->categoryCache[$key] = $this->categoryFactory->createCategory($options);
		}

		return $this->categoryCache[$key];
	}
}
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/t26...t27#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

Im Service Provider registrieren wir den Service.

[src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/blob/4f83301e4e7e8cb611ffec99adf00f89aecc599c/src/administrator/components/com_foos/services/provider.php)

```php
\defined('_JEXEC') or die;
...
use Joomla\CMS\Component\Router\RouterFactoryInterface;
use Joomla\CMS\Extension\Service\Provider\RouterFactory;
...
...
	public function register(Container $container)
	{
		$container->set(AssociationExtensionInterface::class, new AssociationsHelper);

		$container->registerServiceProvider(new CategoryFactory('\\Joomla\\Component\\Foos'));
		$container->registerServiceProvider(new MVCFactory('\\Joomla\\Component\\Foos'));
		$container->registerServiceProvider(new ComponentDispatcherFactory('\\Joomla\\Component\\Foos'));
		$container->registerServiceProvider(new RouterFactory('\\Joomla\\Component\\Foos'));

		$container->set(
			ComponentInterface::class,
			function (Container $container)
			{
				$component = new FoosComponent($container->get(ComponentDispatcherFactoryInterface::class));

				$component->setRegistry($container->get(Registry::class));
				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));
				$component->setAssociationExtension($container->get(AssociationExtensionInterface::class));
				$component->setRouterFactory($container->get(RouterFactoryInterface::class));

				return $component;
			}
		);
	}
};
```

`$container->registerServiceProvider(new RouterFactory('\\Joomla\\Component\\Foos'));` und `$component->setRouterFactory($container->get(RouterFactoryInterface::class));` kommen hinzu.

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t26...t27#diff-38764f2b1343234561c0d02cd2991ea1)

Wir implementieren `RouterServiceInterface` und nutzen `RouterServiceTrait`, so dass diese Dateien gefunden werden.

[src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/4f83301e4e7e8cb611ffec99adf00f89aecc599c/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php
<?php
namespace FooNamespace\Component\Foos\Administrator\Extension;

defined('JPATH_PLATFORM') or die;

...
...
use Joomla\CMS\Component\Router\RouterServiceInterface;
use Joomla\CMS\Component\Router\RouterServiceTrait;

class FoosComponent extends MVCComponent
implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface, RouterServiceInterface
{
	use CategoryServiceTrait;
	use AssociationServiceTrait;
	use HTMLRegistryAwareTrait;
	use RouterServiceTrait;

...
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Aktiviere die Einstellung suchmaschinenfreundliche URLs in der globalen Konfiguration.

3. Überprüfe die URLs im Frontend. Anstelle von `/index.php/component/foos?view=foo&id=1:test&catid=4` sollte beispielsweise `http://localhost/joomla-cms4/index.php/list-foos-in-a-category/1-test` erscheinen - jenachdem wie du deine Menüpunkte genannt hast.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t26...t27.diff

diff --git a/src/administrator/components/com_foos/services/provider.php b/src/administrator/components/com_foos/services/provider.php
index 4c8d7c8f..04abaf80 100644
--- a/src/administrator/components/com_foos/services/provider.php
+++ b/src/administrator/components/com_foos/services/provider.php
@@ -22,6 +22,8 @@
 use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;
 use FooNamespace\Component\Foos\Administrator\Helper\AssociationsHelper;
 use Joomla\CMS\Association\AssociationExtensionInterface;
+use Joomla\CMS\Component\Router\RouterFactoryInterface;
+use Joomla\CMS\Extension\Service\Provider\RouterFactory;

 /**
  * The foos service provider.
@@ -47,6 +49,7 @@ public function register(Container $container)
 		$container->registerServiceProvider(new CategoryFactory('\\FooNamespace\\Component\\Foos'));
 		$container->registerServiceProvider(new MVCFactory('\\FooNamespace\\Component\\Foos'));
 		$container->registerServiceProvider(new ComponentDispatcherFactory('\\FooNamespace\\Component\\Foos'));
+		$container->registerServiceProvider(new RouterFactory('\\FooNamespace\\Component\\Foos'));

 		$container->set(
 			ComponentInterface::class,
@@ -58,6 +61,7 @@ function (Container $container)
 				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
 				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));
 				$component->setAssociationExtension($container->get(AssociationExtensionInterface::class));
+				$component->setRouterFactory($container->get(RouterFactoryInterface::class));

 				return $component;
 			}
diff --git a/src/administrator/components/com_foos/src/Extension/FoosComponent.php b/src/administrator/components/com_foos/src/Extension/FoosComponent.php
index 8aee99f2..25ef544c 100644
--- a/src/administrator/components/com_foos/src/Extension/FoosComponent.php
+++ b/src/administrator/components/com_foos/src/Extension/FoosComponent.php
@@ -23,6 +23,8 @@
 use FooNamespace\Component\Foos\Administrator\Service\HTML\Icon;
 use Psr\Container\ContainerInterface;
 use Joomla\CMS\Helper\ContentHelper;
+use Joomla\CMS\Component\Router\RouterServiceInterface;
+use Joomla\CMS\Component\Router\RouterServiceTrait;

 /**
  * Component class for com_foos
@@ -30,11 +32,12 @@
  * @since  __BUMP_VERSION__
  */
 class FoosComponent extends MVCComponent
-implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface
+implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface, RouterServiceInterface
 {
 	use CategoryServiceTrait;
 	use AssociationServiceTrait;
 	use HTMLRegistryAwareTrait;
+	use RouterServiceTrait;

 	/**
 	 * Booting the extension. This is the function to set up the environment of the extension like
diff --git a/src/components/com_foos/src/Service/Router.php b/src/components/com_foos/src/Service/Router.php
new file mode 100644
index 00000000..6ed10ed2
--- /dev/null
+++ b/src/components/com_foos/src/Service/Router.php
@@ -0,0 +1,299 @@
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Site\Service;
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Application\SiteApplication;
+use Joomla\CMS\Categories\CategoryFactoryInterface;
+use Joomla\CMS\Categories\CategoryInterface;
+use Joomla\CMS\Component\ComponentHelper;
+use Joomla\CMS\Component\Router\RouterView;
+use Joomla\CMS\Component\Router\RouterViewConfiguration;
+use Joomla\CMS\Component\Router\Rules\MenuRules;
+use Joomla\CMS\Component\Router\Rules\NomenuRules;
+use Joomla\CMS\Component\Router\Rules\StandardRules;
+use Joomla\CMS\Menu\AbstractMenu;
+use Joomla\Database\DatabaseInterface;
+use Joomla\Database\ParameterType;
+
+/**
+ * Routing class from com_foos
+ *
+ * @since  __BUMP_VERSION__
+ */
+class Router extends RouterView
+{
+	/**
+	 * Flag to remove IDs
+	 *
+	 * @var    boolean
+	 */
+	protected $noIDs = false;
+
+	/**
+	 * The category factory
+	 *
+	 * @var CategoryFactoryInterface
+	 *
+	 * @since  __BUMP_VERSION__
+	 */
+	private $categoryFactory;
+
+	/**
+	 * The category cache
+	 *
+	 * @var  array
+	 *
+	 * @since  __BUMP_VERSION__
+	 */
+	private $categoryCache = [];
+
+	/**
+	 * The db
+	 *
+	 * @var DatabaseInterface
+	 *
+	 * @since  __BUMP_VERSION__
+	 */
+	private $db;
+
+	/**
+	 * Content Component router constructor
+	 *
+	 * @param   SiteApplication           $app              The application object
+	 * @param   AbstractMenu              $menu             The menu object to work with
+	 * @param   CategoryFactoryInterface  $categoryFactory  The category object
+	 * @param   DatabaseInterface         $db               The database object
+	 */
+	public function __construct(SiteApplication $app, AbstractMenu $menu, CategoryFactoryInterface $categoryFactory, DatabaseInterface $db)
+	{
+		$this->categoryFactory = $categoryFactory;
+		$this->db              = $db;
+
+		$params = ComponentHelper::getParams('com_foos');
+		$this->noIDs = (bool) $params->get('sef_ids');
+		$categories = new RouterViewConfiguration('categories');
+		$categories->setKey('id');
+		$this->registerView($categories);
+		$category = new RouterViewConfiguration('category');
+		$category->setKey('id')->setParent($categories, 'catid')->setNestable();
+		$this->registerView($category);
+		$foo = new RouterViewConfiguration('foo');
+		$foo->setKey('id')->setParent($category, 'catid');
+		$this->registerView($foo);
+		$this->registerView(new RouterViewConfiguration('featured'));
+		$form = new RouterViewConfiguration('form');
+		$form->setKey('id');
+		$this->registerView($form);
+
+		parent::__construct($app, $menu);
+
+		$this->attachRule(new MenuRules($this));
+		$this->attachRule(new StandardRules($this));
+		$this->attachRule(new NomenuRules($this));
+	}
+
+	/**
+	 * Method to get the segment(s) for a category
+	 *
+	 * @param   string  $id     ID of the category to retrieve the segments for
+	 * @param   array   $query  The request that is built right now
+	 *
+	 * @return  array|string  The segments of this item
+	 */
+	public function getCategorySegment($id, $query)
+	{
+		$category = $this->getCategories()->get($id);
+
+		if ($category)
+		{
+			$path = array_reverse($category->getPath(), true);
+			$path[0] = '1:root';
+
+			if ($this->noIDs)
+			{
+				foreach ($path as &$segment)
+				{
+					list($id, $segment) = explode(':', $segment, 2);
+				}
+			}
+
+			return $path;
+		}
+
+		return array();
+	}
+
+	/**
+	 * Method to get the segment(s) for a category
+	 *
+	 * @param   string  $id     ID of the category to retrieve the segments for
+	 * @param   array   $query  The request that is built right now
+	 *
+	 * @return  array|string  The segments of this item
+	 */
+	public function getCategoriesSegment($id, $query)
+	{
+		return $this->getCategorySegment($id, $query);
+	}
+
+	/**
+	 * Method to get the segment(s) for a foo
+	 *
+	 * @param   string  $id     ID of the foo to retrieve the segments for
+	 * @param   array   $query  The request that is built right now
+	 *
+	 * @return  array|string  The segments of this item
+	 */
+	public function getFooSegment($id, $query)
+	{
+		if (!strpos($id, ':'))
+		{
+			$id = (int) $id;
+			$dbquery = $this->db->getQuery(true);
+			$dbquery->select($this->db->quoteName('alias'))
+				->from($this->db->quoteName('#__foos_details'))
+				->where($this->db->quoteName('id') . ' = :id')
+				->bind(':id', $id, ParameterType::INTEGER);
+			$this->db->setQuery($dbquery);
+
+			$id .= ':' . $this->db->loadResult();
+		}
+
+		if ($this->noIDs)
+		{
+			list($void, $segment) = explode(':', $id, 2);
+
+			return array($void => $segment);
+		}
+
+		return array((int) $id => $id);
+	}
+
+	/**
+	 * Method to get the segment(s) for a form
+	 *
+	 * @param   string  $id     ID of the foo form to retrieve the segments for
+	 * @param   array   $query  The request that is built right now
+	 *
+	 * @return  array|string  The segments of this item
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function getFormSegment($id, $query)
+	{
+		return $this->getFooSegment($id, $query);
+	}
+
+	/**
+	 * Method to get the id for a category
+	 *
+	 * @param   string  $segment  Segment to retrieve the ID for
+	 * @param   array   $query    The request that is parsed right now
+	 *
+	 * @return  mixed   The id of this item or false
+	 */
+	public function getCategoryId($segment, $query)
+	{
+		if (isset($query['id']))
+		{
+			$category = $this->getCategories(['access' => false])->get($query['id']);
+
+			if ($category)
+			{
+				foreach ($category->getChildren() as $child)
+				{
+					if ($this->noIDs)
+					{
+						if ($child->alias == $segment)
+						{
+							return $child->id;
+						}
+					}
+					else
+					{
+						if ($child->id == (int) $segment)
+						{
+							return $child->id;
+						}
+					}
+				}
+			}
+		}
+
+		return false;
+	}
+
+	/**
+	 * Method to get the segment(s) for a category
+	 *
+	 * @param   string  $segment  Segment to retrieve the ID for
+	 * @param   array   $query    The request that is parsed right now
+	 *
+	 * @return  mixed   The id of this item or false
+	 */
+	public function getCategoriesId($segment, $query)
+	{
+		return $this->getCategoryId($segment, $query);
+	}
+
+	/**
+	 * Method to get the segment(s) for a foo
+	 *
+	 * @param   string  $segment  Segment of the foo to retrieve the ID for
+	 * @param   array   $query    The request that is parsed right now
+	 *
+	 * @return  mixed   The id of this item or false
+	 */
+	public function getFooId($segment, $query)
+	{
+		if ($this->noIDs)
+		{
+			$dbquery = $this->db->getQuery(true);
+			$dbquery->select($this->db->quoteName('id'))
+				->from($this->db->quoteName('#__foos_details'))
+				->where(
+					[
+						$this->db->quoteName('alias') . ' = :alias',
+						$this->db->quoteName('catid') . ' = :catid',
+					]
+				)
+				->bind(':alias', $segment)
+				->bind(':catid', $query['id'], ParameterType::INTEGER);
+			$this->db->setQuery($dbquery);
+
+			return (int) $this->db->loadResult();
+		}
+
+		return (int) $segment;
+	}
+
+	/**
+	 * Method to get categories from cache
+	 *
+	 * @param   array  $options   The options for retrieving categories
+	 *
+	 * @return  CategoryInterface  The object containing categories
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	private function getCategories(array $options = []): CategoryInterface
+	{
+		$key = serialize($options);
+
+		if (!isset($this->categoryCache[$key]))
+		{
+			$this->categoryCache[$key] = $this->categoryFactory->createCategory($options);
+		}
+
+		return $this->categoryCache[$key];
+	}
+}

```

## Links

https://github.com/joomla/joomla-cms/pull/27693/files
