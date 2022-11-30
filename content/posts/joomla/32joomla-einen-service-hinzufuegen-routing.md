---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2022-08-06
title: 'Einen Service hinzufügen - Routing'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-einen-service-hinzufuegen-routing
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Suchmaschinenfreundliche URLs funktionieren bisher nicht. Die URL zu den Elementen der Komponente erscheint in der Form `JOOMLA/category?view=category&id=8`. Anhand eines Services reparieren wir diesen Missstand. Gleichzeitig ist dies ein gutes Beispiel, um herauszuarbeiten, was notwendig ist, um einen Service in einer Joomla Erweiterung zu integrieren.<!-- \index{Service} --><!-- \index{Routing} -->

_Suchmaschinenfreundlich (SEF)_, [menschlich lesbare](https://de.wikipedia.org/wiki/Clean_URL)[^de.wikipedia.org/wiki/Clean_URL] sind URLs, die sowohl für Menschen als auch für Suchmaschinen Sinn machen, weil sie den Pfad zu der bestimmten Seite erklären. Joomla ist in der Lage, URLs in jedem Format zu erstellen. Dies hängt nicht vom URL-Rewriting ab, das vom Webserver ausgeführt wird, so dass es auch dann funktioniert, wenn Joomla einen anderen Server als Apache mit dem Modul mod_rewrite verwendet. Die SEF-URLs folgen einem bestimmten festen Muster, aber der Benutzer kann einen kurzen beschreibenden Text [Alias](https://docs.joomla.org/Alias/de)[^docs.joomla.org/Alias/de] für jedes Segment der URL definieren.<!-- \index{Suchmaschinenfreundlich (SEF)} --><!-- \index{Service!Suchmaschinenfreundlich (SEF)} -->

> Intern wird der lokale Teil einer SEF-URL (der Teil nach dem Domainnamen) als _Route_ bezeichnet. Das Erstellen und Verarbeiten von SEF-URLs wird daher als _Routing_ bezeichnet, und der entsprechende Code wird _Router_ genannt.

> Ein Beispiel für das Routing ist die URL zum Artikel "Willkommen bei Joomla" in den Beispieldaten. Ohne eingeschaltete SEF-URLs ist die URL `/index.php?option=com_content&view=article&id=1:welcome-to-joomla&catid=1:latest-news&Itemid=50`. Mit eingeschalteten SEF-URLs und ausgeschaltetem mod_rewrite ist es `/index.php/the-news/1-latest-news/1-welcome-to-joomla`. Mit eingeschalteten SEF-URLs und mod_rewrite ist es `/the-news/1-latest-news/1-welcome-to-joomla`.

Suchmaschinenfreundliche URLs können aktiviert werden, indem die Option _Search Engine Friendly URLs_ in der _Globalen Konfiguration_ eingeschaltet wird. Diese Option ist in Joomla 4 standardmäßig aktiviert. Weitere Informationen findest du unter [Aktivieren von suchmaschinenfreundlichen (SEF) URLs in der Dokumentation](https://docs.joomla.org/Enabling_Search_Engine_Friendly_(SEF)_URLs)[^docs.joomla.org/Enabling_Search_Engine_Friendly_(SEF)_URLs].

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t26...t27)[^codeberg.org/astrid/j4examplecode/compare/t26...t27] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### components/com\_foos/src/Service/Router.php

Der Service `components/com_foos/src/Service/Router.php` erledigt die eigentliche Arbeit und wandelt die URLs in suchmaschinenfreundliche Versionen.

[components/com_foos/src/Service/Router.php](https://codeberg.org/astrid/j4examplecode/src/branch/t27/src/components/com_foos/src/Service/Router.php)

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

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ services/provider.php

Im Service Provider registrieren wir den Service.

[administrator/components/com_foos/services/provider.php](https://codeberg.org/astrid/j4examplecode/src/branch/t27/src/administrator/components/com_foos/services/provider.php)

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

Die Zeilen `$container->registerServiceProvider (new RouterFactory('\\Joomla\\Component\\Foos'))` und `$component->setRouterFactory ($container->get(RouterFactoryInterface::class))` kommen hinzu.

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Extension/FoosComponent.php

Wir implementieren `RouterServiceInterface` und nutzen `RouterServiceTrait`, so dass diese Dateien zur Verfügung stehen.

[administrator/components/com_foos/src/Extension/FoosComponent.php](https://codeberg.org/astrid/j4examplecode/src/branch/t27/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

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

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Aktiviere die Einstellung suchmaschinenfreundliche URLs in der globalen Konfiguration.

![Suchmaschinenfreundliche URLs in der globalen Konfiguration von Joomla](/images/j4x32x1.png)

5. Erstelle einen Menüpunkt für ein Foo-Element

![Suchmaschinenfreundliche URLs in Joomla - Menüpunkt erstellen](/images/j4x32x2.png)

4. Überprüfe die URLs mit der der Menüpunkt im Frontend aufgerufen wird. Anstelle von `http://localhost/ single-foo-astrid?view=foo&id=2` sollte `http://localhost/ single-foo-astrid` erscheinen - jenachdem wie du deine Menüpunkte genannt hast. Im Falle von Kategorien ist die Verbesserung noch augenscheinlicher.

> Beachte: Die URL `http://localhost/ single-foo-astrid?view=foo&id=2` ist technisch gesehen weiterhin vorhanden und aufrufbar.

## Links

[Routing in com_contact](https://github.com/joomla/joomla-cms/pull/27693)[^github.com/joomla/joomla-cms/pull/27693]
<img src="https://vg08.met.vgwort.de/na/779f197311f04131bb5cde65a7793b56" width="1" height="1" alt="">
