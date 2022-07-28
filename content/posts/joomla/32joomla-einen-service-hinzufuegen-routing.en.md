---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-01-20
title: 'Add a Service - Routing'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-einen-service-hinzufuegen-routing
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

Search engine friendly URLs do not work yet. We use a service to repair this fault. At the same time, this is a good example to work out what is necessary to integrate a service in a Joomla extension.<!-- \index{service} --><!-- \index{routing} -->

_Search Engine Friendly (SEF)_, [human readable](https://en.wikipedia.org/wiki/Clean_URL)[^en.wikipedia.org/wiki/Clean_URL] are URLs that make sense to both humans and search engines because they explain the path to the specific page. Joomla is able to create URLs in any format. This does not depend on URL rewriting performed by the web server, so it will work even if Joomla uses a server other than Apache with the mod_rewrite module. The SEF URLs follow a certain fixed pattern, but the user can define a short descriptive text [alias](https://docs.joomla.org/Alias)[^docs.joomla.org/Alias] for each segment of the URL.<!-- \index{Search Engine Friendly (SEF)} --><!-- \index{service!Search Engine Friendly (SEF)} -->

> Internally, the local part of a SEF URL (the part after the domain name) is called the _route_. The creation and processing of SEF URLs is therefore called _routing_, and the corresponding code is called _router_.

An example of routing is the URL to the article "Welcome to Joomla" in the sample data. Without SEF URLs switched on, the URL is `/index.php?option=com_content&view=article&id=1:welcome-to-joomla&catid=1:latest-news&Itemid=50`. With SEF-URLs switched on and mod_rewrite switched off, it is `/index.php/the-news/1-latest-news/1-welcome-to-joomla`. With SEF URLs and mod_rewrite turned on, it is `/the-news/1-latest-news/1-welcome-to-joomla`.

> Search Engine Friendly URLs can be enabled by turning on the _Search Engine Friendly URLs_ option in the _Global configuration_. This option is activated by default. For more information, see [Enabling Search Engine Friendly (SEF) URLs in the documentation](<https://docs.joomla.org/Enabling_Search_Engine_Friendly_(SEF)_URLs>).

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t26...t27)[^github.com/astridx/boilerplate/compare/t26...t27] and copy these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### components/com\_foos/ src/Service/Router.php

The service `components/com_foos/ src/Service/Router.php` does the actual work and converts the URLs into search engine friendly versions.

[components/com_foos/ src/Service/Router.php](https://github.com/astridx/boilerplate/blob/4f83301e4e7e8cb611ffec99adf00f89aecc599c/src/components/com_foos/src/Service/Router.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t27/src/components/com_foos/src/Service/Router.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

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

/**
 * Routing class from com_foos
 *
 * @since  __BUMP_VERSION__
 */
class Router extends RouterView
{
	/**
	 * Flag to remove IDs
	 *
	 * @var    boolean
	 */
	protected $noIDs = false;

	/**
	 * The category factory
	 *
	 * @var CategoryFactoryInterface
	 *
	 * @since  __BUMP_VERSION__
	 */
	private $categoryFactory;

	/**
	 * The category cache
	 *
	 * @var  array
	 *
	 * @since  __BUMP_VERSION__
	 */
	private $categoryCache = [];

	/**
	 * The db
	 *
	 * @var DatabaseInterface
	 *
	 * @since  __BUMP_VERSION__
	 */
	private $db;

	/**
	 * Content Component router constructor
	 *
	 * @param   SiteApplication           $app              The application object
	 * @param   AbstractMenu              $menu             The menu object to work with
	 * @param   CategoryFactoryInterface  $categoryFactory  The category object
	 * @param   DatabaseInterface         $db               The database object
	 */
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

	/**
	 * Method to get the segment(s) for a category
	 *
	 * @param   string  $id     ID of the category to retrieve the segments for
	 * @param   array   $query  The request that is built right now
	 *
	 * @return  array|string  The segments of this item
	 */
	public function getCategorySegment($id, $query)
	{
		$category = $this->getCategories()->get($id);

		if ($category) {
			$path = array_reverse($category->getPath(), true);
			$path[0] = '1:root';

			if ($this->noIDs) {
				foreach ($path as &$segment) {
					list($id, $segment) = explode(':', $segment, 2);
				}
			}

			return $path;
		}

		return [];
	}

	/**
	 * Method to get the segment(s) for a category
	 *
	 * @param   string  $id     ID of the category to retrieve the segments for
	 * @param   array   $query  The request that is built right now
	 *
	 * @return  array|string  The segments of this item
	 */
	public function getCategoriesSegment($id, $query)
	{
		return $this->getCategorySegment($id, $query);
	}

	/**
	 * Method to get the segment(s) for a foo
	 *
	 * @param   string  $id     ID of the foo to retrieve the segments for
	 * @param   array   $query  The request that is built right now
	 *
	 * @return  array|string  The segments of this item
	 */
	public function getFooSegment($id, $query)
	{
		if (!strpos($id, ':')) {
			$id = (int) $id;
			$dbquery = $this->db->getQuery(true);
			$dbquery->select($this->db->quoteName('alias'))
				->from($this->db->quoteName('#__foos_details'))
				->where($this->db->quoteName('id') . ' = :id')
				->bind(':id', $id, ParameterType::INTEGER);
			$this->db->setQuery($dbquery);

			$id .= ':' . $this->db->loadResult();
		}

		if ($this->noIDs) {
			list($void, $segment) = explode(':', $id, 2);

			return [$void => $segment];
		}

		return [(int) $id => $id];
	}

	/**
	 * Method to get the segment(s) for a form
	 *
	 * @param   string  $id     ID of the foo form to retrieve the segments for
	 * @param   array   $query  The request that is built right now
	 *
	 * @return  array|string  The segments of this item
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function getFormSegment($id, $query)
	{
		return $this->getFooSegment($id, $query);
	}

	/**
	 * Method to get the id for a category
	 *
	 * @param   string  $segment  Segment to retrieve the ID for
	 * @param   array   $query    The request that is parsed right now
	 *
	 * @return  mixed   The id of this item or false
	 */
	public function getCategoryId($segment, $query)
	{
		if (isset($query['id'])) {
			$category = $this->getCategories(['access' => false])->get($query['id']);

			if ($category) {
				foreach ($category->getChildren() as $child) {
					if ($this->noIDs) {
						if ($child->alias == $segment) {
							return $child->id;
						}
					} else {
						if ($child->id == (int) $segment) {
							return $child->id;
						}
					}
				}
			}
		}

		return false;
	}

	/**
	 * Method to get the segment(s) for a category
	 *
	 * @param   string  $segment  Segment to retrieve the ID for
	 * @param   array   $query    The request that is parsed right now
	 *
	 * @return  mixed   The id of this item or false
	 */
	public function getCategoriesId($segment, $query)
	{
		return $this->getCategoryId($segment, $query);
	}

	/**
	 * Method to get the segment(s) for a foo
	 *
	 * @param   string  $segment  Segment of the foo to retrieve the ID for
	 * @param   array   $query    The request that is parsed right now
	 *
	 * @return  mixed   The id of this item or false
	 */
	public function getFooId($segment, $query)
	{
		if ($this->noIDs) {
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

	/**
	 * Method to get categories from cache
	 *
	 * @param   array  $options   The options for retrieving categories
	 *
	 * @return  CategoryInterface  The object containing categories
	 *
	 * @since   __BUMP_VERSION__
	 */
	private function getCategories(array $options = []): CategoryInterface
	{
		$key = serialize($options);

		if (!isset($this->categoryCache[$key])) {
			$this->categoryCache[$key] = $this->categoryFactory->createCategory($options);
		}

		return $this->categoryCache[$key];
	}
}

```

### Modified files

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ services/provider.php

In the service provider we register the service.

[administrator/components/com_foos/ services/provider.php](https://github.com/astridx/boilerplate/blob/4f83301e4e7e8cb611ffec99adf00f89aecc599c/src/administrator/components/com_foos/services/provider.php)

```php {diff}
 use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;
 use FooNamespace\Component\Foos\Administrator\Helper\AssociationsHelper;
 use Joomla\CMS\Association\AssociationExtensionInterface;
+use Joomla\CMS\Component\Router\RouterFactoryInterface;
+use Joomla\CMS\Extension\Service\Provider\RouterFactory;

 /**
  * The foos service provider.
 public function register(Container $container)
 		$container->registerServiceProvider(new CategoryFactory('\\FooNamespace\\Component\\Foos'));
 		$container->registerServiceProvider(new MVCFactory('\\FooNamespace\\Component\\Foos'));
 		$container->registerServiceProvider(new ComponentDispatcherFactory('\\FooNamespace\\Component\\Foos'));
+		$container->registerServiceProvider(new RouterFactory('\\FooNamespace\\Component\\Foos'));

 		$container->set(
 			ComponentInterface::class,
 function (Container $container) {
 				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
 				$component->setCategoryFactory($container->get(CategoryFactoryInterface::class));
 				$component->setAssociationExtension($container->get(AssociationExtensionInterface::class));
+				$component->setRouterFactory($container->get(RouterFactoryInterface::class));

 				return $component;
 			}

```

The lines `$container->registerServiceProvider (new RouterFactory('\\Joomla\\Component\\Foos'))` and `$component->setRouterFactory ($container->get(RouterFactoryInterface::class))` are added.

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Extension/FoosComponent.php

We implement `RouterServiceInterface` and use `RouterServiceTrait` so that these files are available.

[administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/4f83301e4e7e8cb611ffec99adf00f89aecc599c/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}

 use FooNamespace\Component\Foos\Administrator\Service\HTML\Icon;
 use Psr\Container\ContainerInterface;
 use Joomla\CMS\Helper\ContentHelper;
+use Joomla\CMS\Component\Router\RouterServiceInterface;
+use Joomla\CMS\Component\Router\RouterServiceTrait;

 /**
  * Component class for com_foos
  *
  * @since  __BUMP_VERSION__
  */
-class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface
+class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface, RouterServiceInterface
 {
 	use CategoryServiceTrait;
 	use AssociationServiceTrait;
 	use HTMLRegistryAwareTrait;
+	use RouterServiceTrait;

 	/**
 	 * Booting the extension. This is the function to set up the environment of the extension like

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

Install your component as described in part one, after you have copied all the files. Joomla will update the namespaces for you during the installation. Since a new file has been added, this is necessary.

2. Activate the setting search engine friendly URLs in the global configuration.

![Search engine friendly URLs in the global configuration of Joomla](/images/j4x32x1.png)

5. create a menu item for a foo element

![Search Engine Friendly URLs in Joomla - Create Menu Item](/images/j4x32x2.png)

4. check the URLs with which the menu item is called up in the frontend. Instead of `http://localhost/ single-foo-astrid?view=foo&id=2`, `http://localhost/ single-foo-astrid` should appear - depending on how you named your menu items. In the case of categories, the improvement is even more obvious.

> Note: The URL `http://localhost/ single-foo-astrid?view=foo&id=2` is technically still present and accessible.

## Links

[Routing in com_contact](https://github.com/joomla/joomla-cms/pull/27693)[^github.com/joomla/joomla-cms/pull/27693]
<img src="https://vg08.met.vgwort.de/na/59d74bcbc4e148638efadbb97bb44eb9" width="1" height="1" alt="">
