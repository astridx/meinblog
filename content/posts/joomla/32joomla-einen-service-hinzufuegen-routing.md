---
date: 2021-01-01
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Einen Service hinzufügen - Routing'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-einen-service-hinzufuegen-routing
langKey: de
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

Suchmaschinenfreundliche URLs funktionieren bisher nicht. Anhand eines Services reparieren wir diesen Missstand. Gleichzeitig ist dies ein gutes Beispiel, um herauszuarbeiten, was notwendig ist, um einen Service in einer Joomla Erweiterung zu integrieren.

> _Suchmaschinenfreundliche (SEF)_, [menschlich lesbare](https://en.wikipedia.org/wiki/Clean_URL 'wikipedia:Saubere URL') sind URLs, die sowohl für Menschen als auch für Suchmaschinen Sinn machen, weil sie den Pfad zu der bestimmten Seite erklären. Joomla ist in der Lage, URLs in jedem Format zu erstellen. Dies hängt nicht vom URL-Rewriting ab, das vom Webserver ausgeführt wird, so dass es auch dann funktioniert, wenn Joomla einen anderen Server als Apache mit dem Modul mod_rewrite verwendet. Die SEF-URLs folgen einem bestimmten festen Muster, aber der Benutzer kann einen kurzen beschreibenden Text [Alias](https://docs.joomla.org/Alias) für jedes Segment der URL definieren.

> Intern wird der lokale Teil einer SEF-URL (der Teil nach dem Domainnamen) als _Route_ bezeichnet. Das Erstellen und Verarbeiten von SEF-URLs wird daher als _Routing_ bezeichnet, und der entsprechende Code wird _Router_ genannt.

> Ein Beispiel für das Routing ist die URL zum Artikel "Willkommen bei Joomla" in den Beispieldaten. Ohne eingeschaltete SEF-URLs ist die URL `/index.php?option=com_content&view=article&id=1:welcome-to-joomla&catid=1:latest-news&Itemid=50`. Mit eingeschalteten SEF-URLs und ausgeschaltetem mod_rewrite ist es `/index.php/the-news/1-latest-news/1-welcome-to-joomla`. Mit eingeschalteten SEF-URLs und mod_rewrite ist es `/the-news/1-latest-news/1-welcome-to-joomla`.

> Suchmaschinenfreundliche URLs können aktiviert werden, indem die Option _Search Engine Friendly URLs_ in der _Globalen Konfiguration_ eingeschaltet wird. Diese Option ist standardmäßig aktiviert. Weitere Informationen findest du unter [Aktivieren von suchmaschinenfreundlichen (SEF) URLs in der Dokumentation](<https://docs.joomla.org/Enabling_Search_Engine_Friendly_(SEF)_URLs>).

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t26...t27) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [components/com_foos/ src/Service/Router.php](https://github.com/astridx/boilerplate/compare/t26...t27#diff-6e8e84b1a865c4d53d5a754fe6331601)

Der Service `components/com_foos/ src/Service/Router.php` erledigt die eigentliche Arbeit und wandelt die URLs in suchmaschinenfreundliche Versionen.

[components/com_foos/ src/Service/Router.php](https://github.com/astridx/boilerplate/blob/4f83301e4e7e8cb611ffec99adf00f89aecc599c/src/components/com_foos/src/Service/Router.php)

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

#### [administrator/components/com_foos/ services/provider.php](https://github.com/astridx/boilerplate/compare/t26...t27#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

Im Service Provider registrieren wir den Service.

[administrator/components/com_foos/ services/provider.php](https://github.com/astridx/boilerplate/blob/4f83301e4e7e8cb611ffec99adf00f89aecc599c/src/administrator/components/com_foos/services/provider.php)

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

`$container->registerServiceProvider (new RouterFactory('\\Joomla\\Component\\Foos'));` und `$component->setRouterFactory ($container->get(RouterFactoryInterface::class));` kommen hinzu.

#### [administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t26...t27#diff-38764f2b1343234561c0d02cd2991ea1)

Wir implementieren `RouterServiceInterface` und nutzen `RouterServiceTrait`, so dass diese Dateien zur Verfügung stehen.

[administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/4f83301e4e7e8cb611ffec99adf00f89aecc599c/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

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

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t26...t27.diff

## Links

https://github.com/joomla/joomla-cms/pull/27693/files
