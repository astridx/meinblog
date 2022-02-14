---
description: 'desc'
shortTitle: 'short'
date: 2021-01-19
title: 'Dependency Injection'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-dependency-injection
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

_Dependency Injection (DI)_ sounds complicated and the synonym _introducing dependencies_ does not really sound positive. At first glance, program code should be as flexible as possible. In other words, not dependent on anything else. Nobody likes to be dependent. The word has a negative touch.

_Complicated_ and _negative_? On closer inspection, neither applies. With the help of a practical example, the advantages will become clear.

> The explanations in this chapter are an excursus. In other words, the code described here is not included in the final version of the [boilerplate](https://github.com/astridx/boilerplate).

## Dependency Injection in Joomla

### Step 1 - Add the function displayDirection()

The initial situation: Imagine you want to make the directions for each item in your component individually describable.

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t27..t27a1)[^github.com/astridx/boilerplate/compare/t27..t27a1].

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t27..t27a1#diff-6826d5e745659f7a316372a8f3bd15fa733a0e7dc107b7fb76a7b5769a789993)

So that everything can be managed from one place, you start the call in the file `administrator/components/com_foos/ src/Extension/FoosComponent.php`. This file uses a container, or rather the interface `ContainerInterface`.

[administrator/components/com_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/t27a1/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}
 use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
 use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;
 use FooNamespace\Component\Foos\Administrator\Service\HTML\Icon;
+use FooNamespace\Component\Foos\Administrator\Service\HTML\Direction;
 use Psr\Container\ContainerInterface;
 use Joomla\CMS\Helper\ContentHelper;
 use Joomla\CMS\Component\Router\RouterServiceInterface;
public function boot(ContainerInterface $container)
 	{
 		$this->getRegistry()->register('foosadministrator', new AdministratorService);
 		$this->getRegistry()->register('fooicon', new Icon($container->get(SiteApplication::class)));
+		$this->getRegistry()->register('foodirection', new Direction());
 	}

 	/**
```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Service/HTML/Direction.php](https://github.com/astridx/boilerplate/compare/t27..t27a1#diff-83dd9b718617cf8e2f5f2639fd8a7b80245559c71b7f2b814da7c95ca51cdd31)

We print the directions as text using the `displayDirection` method of the `Direction` class.

[administrator/components/com_foos/ src/Service/HTML/Direction.php](https://github.com/astridx/boilerplate/blob/t27a1/src/administrator/components/com_foos/src/Service/HTML/Direction.php)

```php {diff}
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Service\HTML;
+
+\defined('_JEXEC') or die;
+
+/**
+ * Directions Helper
+ *
+ * @since  __DEPLOY_VERSION__
+ */
+class Direction
+{
+	/**
+	 * Service constructor
+	 *
+	 * @since   __DEPLOY_VERSION__
+	 */
+	public function __construct()
+	{
+	}
+
+	/**
+	 * Method to generate a routing direction
+	 *
+	 * @return  string  The HTML markup for the create item link
+	 *
+	 * @since  __DEPLOY_VERSION__
+	 */
+	public function displayDirection()
+	{
+		return "The route description";
+	}
+}
```

<!-- prettier-ignore -->
#### [components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t27..t27a1#diff-11c9422cefaceff18372b720bf0e2f8fb05cda454054cd3bc38faf6a39e4f7d6)

The template `default.php` in the directory `components/com_foos/ tmpl/foo/` is responsible for the actual output.

[components/com_foos/tmpl/ foo/default.php](https://github.com/astridx/boilerplate/blob/t27a1/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 	</div>
 <?php endif; ?>

+<hr>
+<?php echo HTMLHelper::_('foodirection.displayDirection', $this->item, $tparams); ?>
+<hr>
+
 <?php
 echo $this->item->event->afterDisplayTitle;
 echo $this->item->event->beforeDisplayContent;
```

When you call up an item in the frontend, the text you prepared to describe the directions appears.

![Joomla 4 - Output Step 1 of the Example on Services and Dependency Injection](/images/j4x27a1x1.png)

Now the thing is that there are different ways to describe it:

- There are digital maps that even offer routing functions.
- The description via text is possible
- You can describe the route with the help of a picture.

For some items you have a descriptive graphic that shows the location. For another item, there is no graphic. Instead, the address can be easily found via geocoding services and displayed on a digital map. For other items, the position can only be described by text because insider knowledge is required. We will work on this problem in step 2.

### Schritt 2 - Die Funktion displayDirection() für mehrere Möglichkeiten verwenden

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t27a1..t27a2)[^github.com/astridx/boilerplate/compare/t27a1..t27a2].

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/HTML/Direction.php](https://github.com/astridx/boilerplate/compare/t27a1..t27a2#diff-83dd9b718617cf8e2f5f2639fd8a7b80245559c71b7f2b814da7c95ca51cdd31)

First, we prepare a class for each description type. Each class can prepare the text for the directions separately and therefore well arranged. In this step, we next display the description for each type.

[administrator/components/com_foos/src/Service/HTML/Direction.php](https://github.com/astridx/boilerplate/blob/t27a2/src/administrator/components/com_foos/src/Service/HTML/Direction.php)

```php {diff}

 \defined('_JEXEC') or die;

+use FooNamespace\Component\Foos\Administrator\Service\HTML\Directions\Image;
+use FooNamespace\Component\Foos\Administrator\Service\HTML\Directions\Map;
+use FooNamespace\Component\Foos\Administrator\Service\HTML\Directions\Text;
+
 /**
  * Directions Helper
  *
  */
 class Direction
 {
+	protected $directionTool1;
+	protected $directionTool2;
+	protected $directionTool3;
+
 	/**
 	 * Service constructor
 	 *
class Direction
 	 */
 	public function __construct()
 	{
+		$this->directionTool1 = new Image;
+		$this->directionTool2 = new Map;
+		$this->directionTool3 = new Text;
 	}

 	/**
public function __construct()
 	 */
 	public function displayDirection()
 	{
-		return "The route description";
+		return
+		$this->directionTool1->findDirection() . "<br>" .
+		$this->directionTool2->findDirection() . "<br>" .
+		$this->directionTool3->findDirection();
 	}
 }
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/HTML/Directions/Image.php](https://github.com/astridx/boilerplate/compare/t27a1..t27a2#diff-ac5ed87b3682de1b22977ac40be1945d2fc1651a98a37c37d1bc5c24911d0d45)

Below you see the class that is responsible for displaying the image.

[administrator/components/com_foos/src/Service/HTML/Directions/Image.php](https://github.com/astridx/boilerplate/blob/t27a2/src/administrator/components/com_foos/src/Service/HTML/Directions/Image.php)

```php {diff}
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Service\HTML\Directions;
+
+\defined('_JEXEC') or die;
+
+/**
+ * Content Component HTML Helper
+ *
+ * @since  __DEPLOY_VERSION__
+ */
+class Image
+{
+
+	/**
+	 * Service constructor
+	 *
+	 * @param   CMSApplication  $application  The application
+	 *
+	 * @since   __DEPLOY_VERSION__
+	 */
+	public function __construct()
+	{
+	}
+
+	/**
+	 * Method to generate a link to the create item page for the given category
+	 *
+	 * @param   object    $category  The category information
+	 * @param   Registry  $params    The item parameters
+	 * @param   array     $attribs   Optional attributes for the link
+	 *
+	 * @return  string  The HTML markup for the create item link
+	 *
+	 * @since  __DEPLOY_VERSION__
+	 */
+	public static function findDirection()
+	{
+		return "Find direction on Image.";
+	}
+}
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/HTML/Directions/Map.php](https://github.com/astridx/boilerplate/compare/t27a1..t27a2#diff-c19866b20f1e742b46d920bd9e2a2df87e753245507d23edb6b57b1b2a89fac5)

The most complex is probably the creation of the route via the digital map, which is the task of the class 'Map'.

[administrator/components/com_foos/src/Service/HTML/Directions/Map.php](https://github.com/astridx/boilerplate/blob/t27a2/src/administrator/components/com_foos/src/Service/HTML/Directions/Map.php)

```php {diff}
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Service\HTML\Directions;
+
+\defined('_JEXEC') or die;
+
+/**
+ * Content Component HTML Helper
+ *
+ * @since  __DEPLOY_VERSION__
+ */
+class Map
+{
+
+	/**
+	 * Service constructor
+	 *
+	 * @param   CMSApplication  $application  The application
+	 *
+	 * @since   __DEPLOY_VERSION__
+	 */
+	public function __construct()
+	{
+	}
+
+	/**
+	 * Method to generate a link to the create item page for the given category
+	 *
+	 * @param   object    $category  The category information
+	 * @param   Registry  $params    The item parameters
+	 * @param   array     $attribs   Optional attributes for the link
+	 *
+	 * @return  string  The HTML markup for the create item link
+	 *
+	 * @since  __DEPLOY_VERSION__
+	 */
+	public static function findDirection()
+	{
+		return "Find direction with a Map.";
+	}
+}
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/HTML/Directions/Text.php](https://github.com/astridx/boilerplate/compare/t27a1..t27a2#diff-ffe954f2a9fcfb59ee3ba580cdfdeb50736b9fb49ab10369decf684e307786c7)

The class named 'Text' prepares the textual description of the route.

[administrator/components/com_foos/src/Service/HTML/Directions/Text.php](https://github.com/astridx/boilerplate/blob/t27a2/src/administrator/components/com_foos/src/Service/HTML/Directions/Text.php)

```php {diff}
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Service\HTML\Directions;
+
+\defined('_JEXEC') or die;
+
+/**
+ * Content Component HTML Helper
+ *
+ * @since  __DEPLOY_VERSION__
+ */
+class Text
+{
+
+	/**
+	 * Service constructor
+	 *
+	 * @param   CMSApplication  $application  The application
+	 *
+	 * @since   __DEPLOY_VERSION__
+	 */
+	public function __construct()
+	{
+	}
+
+	/**
+	 * Method to generate a link to the create item page for the given category
+	 *
+	 * @param   object    $category  The category information
+	 * @param   Registry  $params    The item parameters
+	 * @param   array     $attribs   Optional attributes for the link
+	 *
+	 * @return  string  The HTML markup for the create item link
+	 *
+	 * @since  __DEPLOY_VERSION__
+	 */
+	public static function findDirection()
+	{
+		return "Find direction via Text Explanation.";
+	}
+}
```

When you call up an item in the frontend, the text you prepared to describe the directions appears.

![Joomla 4 - Output Step 2 of the Example on Services and Dependency Injection](/images/j4x27a2x1.png)

The problem: At the moment, all types of directions are displayed and it is not ensured that this description exists. Often not every type is available. Sometimes it is also the case that you want to specify which type is displayed. Instead of making all types available, it would be better if the optimal directions could be defined. This way it would also be possible to add or remove new types without having to make changes to the existing code. We will look at how this is possible in step 3.

### Step 3 - Select displayDirection() variable and type-safe

For each item, the approach is possible by text, by image or by digital map. It would be nice if the three types were equally applicable next to each other and if it was ensured that there is a description. Let us look at 'interfaces' and 'traits' in this context.

An interface is a contract between the implementing class and the calling class. The contract ensures that each class meets certain criteria that the interface implements. We have three approach descriptions. Let's create contracts/interfaces for them and then implement these contracts/interfaces in the classes. Using a `trait` we ensure that we don't have to write out the contract each time. We use standards. That way our service works as contracted!

> https://www.php.net/manual/em/language.oop5.interfaces.php

> https://www.php.net/manual/en/language.oop5.traits.php

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t27a2..t27a3)[^github.com/astridx/boilerplate/compare/t27a2..t27a3].

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

In the component class we add everything necessary for the service `Direction`.

[administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}
 use Joomla\CMS\Helper\ContentHelper;
 use Joomla\CMS\Component\Router\RouterServiceInterface;
 use Joomla\CMS\Component\Router\RouterServiceTrait;
+use FooNamespace\Component\Foos\Administrator\Service\Direction\DirectionServiceInterface;
+use FooNamespace\Component\Foos\Administrator\Service\Direction\DirectionServiceTrait;

 /**
  * Component class for com_foos
  *
  * @since  __BUMP_VERSION__
  */
-class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface, RouterServiceInterface
+class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface, RouterServiceInterface, DirectionServiceInterface
 {
 	use CategoryServiceTrait;
 	use AssociationServiceTrait;
 	use HTMLRegistryAwareTrait;
 	use RouterServiceTrait;
+	use DirectionServiceTrait;

 	/**
 	 * Booting the extension. This is the function to set up the environment of the extension like
public function boot(ContainerInterface $container)
 	{
 		$this->getRegistry()->register('foosadministrator', new AdministratorService);
 		$this->getRegistry()->register('fooicon', new Icon($container->get(SiteApplication::class)));
-		$this->getRegistry()->register('foodirection', new Direction());
 	}

 	/**
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/Direction/DirectionExtensionInterface.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/Direction/DirectionExtensionInterface.php)

The file `DirectionExtensionInterface.php` contains the interface `DirectionExtensionInterface` which ensures that the function `findDirection()` is available to all implementing classes. Put simply, the contract is: if a class implements the interface, then it provides a solution for the containing functions.

[administrator/components/com_foos/src/Service/Direction/DirectionExtensionInterface.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/Direction/DirectionExtensionInterface.php)

```php {diff}
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright  (C) 2017 Open Source Matters, Inc. <https://www.joomla.org>
+ * @license    GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Service\Direction;
+
+\defined('JPATH_PLATFORM') or die;
+
+/**
+ * Direction Extension Interface for the helper classes
+ *
+ * @since  __DEPLOY_VERSION__
+ */
+interface DirectionExtensionInterface
+{
+	/**
+	 * Method to get the direction for a given item.
+	 *
+	 * @return  string   Direction
+	 *
+	 * @since  __DEPLOY_VERSION__
+	 */
+	public static function findDirection();
+}
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/Direction/DirectionServiceInterface.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/Direction/DirectionServiceInterface.php)

DirectionServiceInterface' is another interface. It defines which interface the service supports and how it can be accessed. Specifically, we use `DirectionExtensionInterface`, which we discussed in the previous section. We can retrieve this via `getDirectionExtension`.We will do the latter in a concrete example below.

[administrator/components/com_foos/src/Service/Direction/DirectionServiceInterface.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/Direction/DirectionServiceInterface.php)

```php {diff}
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright  (C) 2017 Open Source Matters, Inc. <https://www.joomla.org>
+ * @license    GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Service\Direction;
+
+\defined('JPATH_PLATFORM') or die;
+
+/**
+ * The Direction service.
+ *
+ * @since  __DEPLOY_VERSION__
+ */
+interface DirectionServiceInterface
+{
+	/**
+	 * Returns the Directions extension helper class.
+	 *
+	 * @return  DirectionExtensionInterface
+	 *
+	 * @since  __DEPLOY_VERSION__
+	 */
+	public function getDirectionExtension(): DirectionExtensionInterface;
+}
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/Direction/DirectionServiceTrait.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/Direction/DirectionServiceTrait.php)

The trait `DirectionServiceTrait` provides a standard implementation of the functions `getDirectionExtension` and `setDirectionExtension`, so that our contract is for sure fulfilled.

[administrator/components/com_foos/src/Service/Direction/DirectionServiceTrait.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/Direction/DirectionServiceTrait.php)

```php {diff}
+<?php
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright  (C) 2017 Open Source Matters, Inc. <https://www.joomla.org>
+ * @license    GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Administrator\Service\Direction;
+
+\defined('JPATH_PLATFORM') or die;
+
+/**
+ * Trait to implement DirectionServiceInterface
+ *
+ * @since  __DEPLOY_VERSION__
+ */
+trait DirectionServiceTrait
+{
+	/**
+	 * The direction extension.
+	 *
+	 * @var DirectionExtensionInterface
+	 *
+	 * @since  __DEPLOY_VERSION__
+	 */
+	private $directionExtension = null;
+
+	/**
+	 * Returns the directions extension helper class.
+	 *
+	 * @return  DirectionExtensionInterface
+	 *
+	 * @since  __DEPLOY_VERSION__
+	 */
+	public function getDirectionExtension(): DirectionExtensionInterface
+	{
+		return $this->directionExtension;
+	}
+
+	/**
+	 * The direction extension.
+	 *
+	 * @param   DirectionExtensionInterface  $directionExtension  The extension
+	 *
+	 * @return  void
+	 *
+	 * @since  __DEPLOY_VERSION__
+	 */
+	public function setDirectionExtension(DirectionExtensionInterface $directionExtension)
+	{
+		$this->directionExtension = $directionExtension;
+	}
+}
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/HTML/Directions/Image.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/HTML/Directions/Image.php)

The class `Image` should in any case provide the function `findDirection`. We achieve this by implementing the interface `DirectionExtensionInterface`.

[administrator/components/com_foos/src/Service/HTML/Directions/Image.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/HTML/Directions/Image.php)

```php {diff}
  * @license     GNU General Public License version 2 or later; see LICENSE.txt
  */

-namespace FooNamespace\Component\Foos\Administrator\Service\HTML\Directions;
+namespace FooNamespace\Component\Foos\Administrator\Service\Direction;

 \defined('_JEXEC') or die;

  *
  * @since  __DEPLOY_VERSION__
  */
-class Image
+class Image implements DirectionExtensionInterface
 {

 	/**
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/HTML/Directions/Map.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/HTML/Directions/Map.php)

The class `Map` should also offer the function `findDirection`. We achieve this by also implementing the interface `DirectionExtensionInterface`.

[administrator/components/com_foos/src/Service/HTML/Directions/Map.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/HTML/Directions/Map.php)

```php {diff}
  * @license     GNU General Public License version 2 or later; see LICENSE.txt
  */

-namespace FooNamespace\Component\Foos\Administrator\Service\HTML\Directions;
+namespace FooNamespace\Component\Foos\Administrator\Service\Direction;

 \defined('_JEXEC') or die;

  *
  * @since  __DEPLOY_VERSION__
  */
-class Map
+class Map implements DirectionExtensionInterface
 {

 	/**
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/HTML/Directions/Text.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/HTML/Directions/Text.php)

Last but not least, `Map` shall provide the function `findDirection`. Therefore, this also implements the interface `DirectionExtensionInterface`.

[administrator/components/com_foos/src/Service/HTML/Directions/Text.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/HTML/Directions/Text.php)

```php {diff}
  * @license     GNU General Public License version 2 or later; see LICENSE.txt
  */

-namespace FooNamespace\Component\Foos\Administrator\Service\HTML\Directions;
+namespace FooNamespace\Component\Foos\Administrator\Service\Direction;

 \defined('_JEXEC') or die;

  *
  * @since  __DEPLOY_VERSION__
  */
-class Text
+class Text implements DirectionExtensionInterface
 {

 	/**
```

<!-- prettier-ignore -->
#### [administrator/components/com_foos/src/Service/HTML/Direction.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/HTML/Direction.php)

We do not need the class `administrator/components/com_foos/src/Service/HTML/Direction.php` any further. We delete it.

[administrator/components/com_foos/src/Service/HTML/Direction.php](https://github.com/astridx/boilerplate/blob/t27a3/src/administrator/components/com_foos/src/Service/HTML/Direction.php)

```php {diff}
-<?php
-/**
- * @package     Joomla.Site
- * @subpackage  com_foos
- *
- * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
- * @license     GNU General Public License version 2 or later; see LICENSE.txt
- */
-
-namespace FooNamespace\Component\Foos\Administrator\Service\HTML;
-
-\defined('_JEXEC') or die;
-
-use FooNamespace\Component\Foos\Administrator\Service\HTML\Directions\Image;
-use FooNamespace\Component\Foos\Administrator\Service\HTML\Directions\Map;
-use FooNamespace\Component\Foos\Administrator\Service\HTML\Directions\Text;
-
-/**
- * Directions Helper
- *
- * @since  __DEPLOY_VERSION__
- */
-class Direction
-{
-	protected $directionTool1;
-	protected $directionTool2;
-	protected $directionTool3;
-
-	/**
-	 * Service constructor
-	 *
-	 * @since   __DEPLOY_VERSION__
-	 */
-	public function __construct()
-	{
-		$this->directionTool1 = new Image;
-		$this->directionTool2 = new Map;
-		$this->directionTool3 = new Text;
-	}
-
-	/**
-	 * Method to generate a routing direction
-	 *
-	 * @return  string  The HTML markup for the direction
-	 *
-	 * @since  __DEPLOY_VERSION__
-	 */
-	public function displayDirection()
-	{
-		return
-		$this->directionTool1->findDirection() . "<br>" .
-		$this->directionTool2->findDirection() . "<br>" .
-		$this->directionTool3->findDirection();
-	}
-}
```

<!-- prettier-ignore -->
#### [components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/t27a3/src/components/com_foos/tmpl/foo/default.php)

When displaying in the frontend, we can load the component class via `$fooComponent = Factory::getApplication()->bootComponent('com_foos')` and dynamically re-set the interface `$fooComponent->setDirectionExtension(new DirectionMap)` during runtime. This way it is possible to use different implementations for the output `findDirection()`. To ensure that the method `findDirection()` is always available, we have implemented the interface `DirectionExtensionInterface` in the possible DirectionExtensions `DirectionExtension`.

[components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/t27a3/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 use Joomla\CMS\Helper\ContentHelper;
 use Joomla\CMS\HTML\HTMLHelper;
 use Joomla\CMS\Language\Text;
+use FooNamespace\Component\Foos\Administrator\Service\Direction\Map as DirectionMap;
+use FooNamespace\Component\Foos\Administrator\Service\Direction\Text as DirectionText;
+use FooNamespace\Component\Foos\Administrator\Service\Direction\Image as DirectionImage;

 $canDo   = ContentHelper::getActions('com_foos', 'category', $this->item->catid);
 $canEdit = $canDo->get('core.edit') || ($canDo->get('core.edit.own') && $this->item->created_by == Factory::getUser()->id);

 	</div>
 <?php endif; ?>

+<?php
+	$fooComponent = Factory::getApplication()->bootComponent('com_foos');
+?>
+<hr>
+<?php
+	$fooComponent->setDirectionExtension(new DirectionMap);
+	echo $fooComponent->getDirectionExtension()->findDirection();
+?>
 <hr>
-<?php echo HTMLHelper::_('foodirection.displayDirection', $this->item, $tparams); ?>
+<?php
+	$fooComponent->setDirectionExtension(new DirectionText);
+	echo $fooComponent->getDirectionExtension()->findDirection();
+?>
+<hr>
+<?php
+	$fooComponent->setDirectionExtension(new DirectionImage);
+	echo $fooComponent->getDirectionExtension()->findDirection();
+?>
 <hr>

 <?php
```

When you call up an item in the frontend, the text you prepared to describe the directions appears. In the example, for demonstration purposes, I still display all possible directions. In my opinion, however, it becomes clear how uncomplicated it is to change the output at runtime or how easy it is to manipulate it with the help of parameters. Parameters are also the subject of a chapter in this tutorial.

![Joomla 4 - Output Step 3 of the Example on Services and Dependency Injection](/images/j4x27a3x1.png)

## Why Dependency Injection?

In this section you see a simple example. It contains the basics of DI. Passing the requirements for a class to the class via a `set` method, where the `set` method typically corresponds to the name of the property. In our case, this is `DirectionExtension`: we want to set the extension that outputs the `Direction`.

## Why containers?

An Inversion of Control (IoC) container can help manage all parts of the application. Instead of creating a new `DirectionExtension` each time, it is much easier to remember how to prepare a `DirectionExtension`. Since the `DirectionExtension` in our example does not have many dependencies, the advantages of a container are hard to see. But imagine that every time you create a `DirectionExtension` you have to remember to pass the dependencies like impement the interface `DirectionExtensionInterface` and provide the method `findDirection`. With a container, it is possible to set up everything as if it were a template and leave the creation to the application. This is even more handy when the dependencies we inject have dependencies within their dependencies. This can all become very complex. Examples you can find in the `../services/provider.php` files, for example in `/administrator/components/com_foos/services/provider.php`.

## Links

[Dependency injection via Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection)[^en.wikipedia.org/wiki/dependency_injection]
[JAB18: Services in Joomla 4](https://joomla.digital-peak.com/images/blog/JAB18_Services_in_Joomla_4.pdf)[^joomla.digital-peak.com/images/blog/jab18_services_in_joomla_4.pdf]
[Implementation of the services in the component class on Github](https://github.com/joomla/joomla-cms/pull/20217)[^github.com/joomla/joomla-cms/pull/20217]
[Why dependency injection in Joomla 4](https://github.com/joomla-framework/di/blob/2.0-dev/docs/why-dependency-injection.md)[^github.com/joomla-framework/di/blob/2.0-dev/docs/why-dependency-injection.md]
<img src="https://vg04.met.vgwort.de/na/26b294bf6a4f49f896f2f647142cd10c" width="1" height="1" alt="">
