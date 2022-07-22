---
description: 'desc'
shortTitle: 'short'
date: 2021-01-19
title: 'Dependency Injection/Einbringen von Abhängigkeiten'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-dependency-injection
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

_Dependency Injection (DI)_ hört sich kompliziert an und die deutsche Übersetzung _Einbringen von Abhängigkeiten_ hört ist nicht wirklich positiv. Auf den ersten Blick soll Programmcode so flexibel wie möglich sein. Also nicht angewiesen auf etwas anderes. Abhängig ist niemand gerne. Das Wort hat einen negativen Touch.

_Kompliziert_ und _negativ_? Bei genauem Hinsehen trifft beides nicht zu. Mithilfe eines praktischen Beispiels, werden die Vorteile klar.

> Die Erklärungen in diesem Kapitel sind ein Exkurs. Das bedeutet konkret: Der hier beschriebene Code ist nicht in der Endfassung des [Boilerplates](https://github.com/astridx/boilerplate) enthalten.

## Dependency Injection/Einbringen von Abhängigkeiten in Joomla

### Schritt 1 - Die Funktion displayDirection() hinzufügen

Die Ausgangssituation: Stelle dir vor, du möchtest zu jedem Item in deiner Komponente die Anfahrt individuell beschreibbar gestalten.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t27..t27a1)[^github.com/astridx/boilerplate/compare/t27..t27a1] an.

<!-- prettier-ignore -->
#### administrator/components/com\_foos/ src/Extension/FoosComponent.php

Damit alles von einer Stelle aus verwaltbar ist, startest du den Aufruf in der Datei `administrator/components/com_foos/ src/Extension/FoosComponent.php` ein. Diese Datei nutzt einen Container, beziehungsweise die Schnittstelle `ContainerInterface`.

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
#### administrator/components/com\_foos/ src/Service/HTML/Direction.php

Die Anfahrtsbeschreibung geben wir über die Methode `displayDirection` der Klasse `Direction` als Text aus.

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
#### components/com_foos/ tmpl/foo/default.php

Für die eigentliche Ausgabe ist das Template `default.php` im Verzeichnis `components/com_foos/ tmpl/foo/` zuständig.

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

Wenn du ein Item im Frontend aufrufst, erscheint der Text, den du zur Beschreibung der Anfahrt vorbereitet hast.

![Joomla 4 - Ausgabe Schritt 1 des Beispiels zu Services und Dependency Injection](/images/j4x27a1x1.png)

Nun ist es so, dass es verschiedene Möglichkeiten zur Beschreibung gibt:

- Es gibt digitale Karten, die sogar Routingfunktionen bieten.
- Die Beschreibung via Text ist möglich
- Man kann die Anfahrt mithilfe eines Bildes beschreiben.

Zu manchen Items verfügst du über eine bildlich beschreibende Grafik, die den Ort zeigt. Bei einem anderen Item gibt es keine Grafik. Dafür ist die Adresse über Geocoding-Dienste problemlos auffindbar und in einer digitalen Karte anzeigbar. Bei anderen Items ist es so, dass die Position lediglich per Text beschrieben werden kann, weil Insider-Wissen erforderlich ist. Dieses Problemlösen wir in Schritt 2.

### Schritt 2 - Die Funktion displayDirection() für mehrere Möglichkeiten verwenden

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t27a1..t27a2)[^github.com/astridx/boilerplate/compare/t27a1..t27a2] an.

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/Service/HTML/Direction.php

Zunächst bereiten wir für jede Beschreibungsart eine Klasse vor. Jede Klasse bereitet den Text für die Wegbeschreibung separat und damit übersichtlich auf. In diesem Schritt zeigen wir als nächstes die Beschreibung für jeden Typ an.

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
#### administrator/components/com_foos/src/Service/HTML/Directions/Image.php

Nachfolgen siehst du die Klasse, die für die Anzeige des Bildes zuständig ist.

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
#### administrator/components/com_foos/src/Service/HTML/Directions/Map.php

Am komplexesten wird wohl die Erstellung der Route über die digitale Karte, welches die Klasse `Map` zur Aufgabe hat.

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
#### administrator/components/com_foos/src/Service/HTML/Directions/Text.php

Die Klasse names `Text` bereitet die textuelle Beschreibung der Anfahrt auf.

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

Wenn du ein Item im Frontend aufrufst, erscheint der Text, den du zur Beschreibung der Anfahrt vorbereitet hast.

![Joomla 4 - Ausgabe Schritt 2 des Beispiels zu Services und Dependency Injection](/images/j4x27a2x1.png)

Das Problem: Momentan werden alle Arten von Wegbeschreibungen angezeigt und es ist nicht sichergestellt, dass diese Beschreibung existiert. Oft ist nicht jeder Typ verfügbar. Manchmal ist es auch der Fall, dass man festlegen möchte, welcher Typ angezeigt wird. Anstatt alle Typen verfügbar zu machen, wäre es besser, wenn die optimalen Wegbeschreibungen definiert werden könnten. Auf diese Weise wäre es auch möglich, neue Typen hinzuzufügen oder zu entfernen, ohne Änderungen am bestehenden Code vornehmen zu müssen. Wir werden uns in Schritt 3 ansehen, wie dies möglich ist.

### Schritt 3 - Auswahl der Variable displayDirection() und Typsicherheit

Für jedes Element ist der Ansatz durch Text, durch Bild oder durch digitale Karte möglich. Es wäre schön, wenn die drei Typen gleichwertig nebeneinander anwendbar wären und wenn sichergestellt wäre, dass es eine Beschreibung gibt. Betrachten wir in diesem Zusammenhang die Begriffe "Schnittstellen" und "Traits".

Eine Schnittstelle ist ein Vertrag zwischen der implementierenden Klasse und der aufrufenden Klasse. Der Vertrag stellt sicher, dass jede Klasse bestimmte Kriterien erfüllt, die die Schnittstelle implementiert. Wir haben drei Ansatzbeschreibungen. Wir erstellen Verträge/Schnittstellen für sie und implementieren diese Verträge/Schnittstellen dann in den Klassen. Durch die Verwendung eines "Traits" stellen wir sicher, dass wir den Vertrag nicht jedes Mal neu ausschreiben müssen. Wir verwenden Standards. Auf diese Weise funktioniert unser Dienst wie vereinbart!

> https://www.php.net/manual/de/language.oop5.interfaces.php

> https://www.php.net/manual/de/language.oop5.traits.php

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t27a2..t27a3)[^github.com/astridx/boilerplate/compare/t27a2..t27a3] an.

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/Extension/FoosComponent.php

In der Komponentenklasse fügen wir alles Notwendige für den Service `Direction` hinzu.

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
#### administrator/components/com_foos/src/Service/Direction/DirectionExtensionInterface.php

Die Datei `DirectionExtensionInterface.php` beinhaltet die Schnittstelle `DirectionExtensionInterface` welches dafür sorgt, dass die Funktion `findDirection()` bei allen implementierenden Klassen verfügbar ist. Vereinfacht ausgedrückt lautet der Vertrag: Wenn eine Klasse die Schnittstelle implementiert, dann bietet sie eine Lösung für die beinhaltenden Funktionen.

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
#### administrator/components/com_foos/src/Service/Direction/DirectionServiceInterface.php

`DirectionServiceInterface` ist eine weitere Schnittstelle. Sie legt fest, welche Schnittstelle der Service unterstützt und wie diese abrufbar ist. Konkret nutzen wir `DirectionExtensionInterface`, welche wir im vorhergehenden Abschnitt besprochen haben. Abrufen können wir diese per `getDirectionExtension`. Letzteres werden wir weiter unten in einem konkreten Beispiel durchführen.

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
#### administrator/components/com_foos/src/Service/Direction/DirectionServiceTrait.php

Der Trait `DirectionServiceTrait` bietet eine Standardimplementierung der Funktionen `getDirectionExtension` und `setDirectionExtension`, so das unser Vertrag sicher erfüllt ist.

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
#### administrator/components/com_foos/src/Service/HTML/Directions/Image.php

Die Klasse `Image` soll auf jeden Fall die Funktion `findDirection` zur Verfügung stellen. Dies erreichen wir, in dem die Klasse die Schnittstelle `DirectionExtensionInterface` implementiert.

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
#### administrator/components/com_foos/src/Service/HTML/Directions/Map.php

Die Klasse `Map` soll ebenfalls die Funktion `findDirection` bieten. Dies erreichen wir, in dem auch diese die Schnittstelle `DirectionExtensionInterface` implementiert.

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
#### administrator/components/com_foos/src/Service/HTML/Directions/Text.php

Last but not least soll `Map` soll die Funktion `findDirection` bieten. Deshalb implementiert auch diese die Schnittstelle `DirectionExtensionInterface`.

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
#### administrator/components/com_foos/src/Service/HTML/Direction.php

Die Klasse `administrator/components/com_foos/src/Service/HTML/Direction.php` benötigen wir nicht weiter. Wir löschen diese.

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
#### components/com_foos/tmpl/foo/default.php

Bei der Darstellung im Frontend können wir die Komponentenklasse über `$fooComponent = Factory::getApplication()->bootComponent('com_foos')` laden und die Schnittstelle `$fooComponent->setDirectionExtension(new DirectionMap)` zur Laufzeit dynamisch neu setzen. Auf diese Weise ist es möglich, verschiedene Implementierungen für die Ausgabe `findDirection()` zu verwenden. Um sicherzustellen, dass die Methode `findDirection()` immer verfügbar ist, implementieren wir in den möglichen DirectionExtensions `DirectionExtension` das Interface `DirectionExtensionInterface`.

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

Wenn du ein Item im Frontend aufrufst, erscheint der Text, den du zur Beschreibung der Anfahrt vorbereitet hast. In dem Beispiel zeige ich zu Demonstrationszwecken noch alle möglichen Varianten an. Meiner Meinung nach wird aber deutlich, wie unkompliziert es ist, die Ausgabe zur Laufzeit zu ändern oder mit Hilfe von Parametern zu manipulieren. Parametern ist ebenfalls ein eigenes Kapitel in diesem Tutorial gewidmet.

![Joomla 4 - Ausgabe Schritt 3 des Beispiels zu Services und Dependency Injection](/images/j4x27a3x1.png)

## Warum Dependency Injection?

In diesem Abschnitt siehst du ein einfaches Beispiel. Es beinhaltet die Grundlagen von DI. Die Übergabe der Anforderungen für eine Klasse an die Klasse über eine `set`-Methode, wobei die `set`-Methode typischerweise dem Namen der Eigenschaft entspricht. In unserem Fall ist dies `DirectionExtension`: Wir möchten die Extension festlegen, welche die `Direction` ausgibt.

## Warum Container?

Ein Inversion of Control (IoC) Container kann helfen, alle Teile der Anwendung zu verwalten. Anstatt jedes Mal eine neue `DirectionExtension` zu erstellen, ist es viel einfacher, sich zu merken, wie man eine `DirectionExtension` vorbereitet. Da die `DirectionExtension` in unserem Beispiel nicht viele Abhängigkeiten hat, sind die Vorteile eines Containers schwer zu erkennen. Aber stell dir vor, dass du jedes Mal, wenn du eine `DirectionExtension` erstellst, daran denken musst, die Abhängigkeiten wie impementiere die Schnittstelle `DirectionExtensionInterface` und bietet die Methode `findDirection` zu übergeben. Mit einem Container ist es möglich alles wie in einer Art Template einzurichten und die Erstellung der Anwendung zu überlassen. Das ist erst recht praktisch, wenn die Abhängigkeiten, die wir injizieren, Abhängigkeiten innerhalb ihrer Abhängigkeiten haben. Das alles kann sehr komplex werden. Beispiel findest du in den `../services/provider.php` Dateien, beispielsweise in `/administrator/components/com_foos/services/provider.php`.

## Links

[Dependency Injection bei Wikipedia](https://de.wikipedia.org/wiki/Dependency_Injection)[^de.wikipedia.org/wiki/dependency_injection]
[JAB18: Services in Joomla 4](https://joomla.digital-peak.com/images/blog/JAB18_Services_in_Joomla_4.pdf)[^joomla.digital-peak.com/images/blog/jab18_services_in_joomla_4.pdf]
[Implementierung der Services in der Komponenten Klasse auf Github](https://github.com/joomla/joomla-cms/pull/20217)[^github.com/joomla/joomla-cms/pull/20217]
[Warum Dependency Injection in Joomla 4](https://github.com/joomla-framework/di/blob/2.0-dev/docs/why-dependency-injection.md)[^github.com/joomla-framework/di/blob/2.0-dev/docs/why-dependency-injection.md]
<img src="https://vg04.met.vgwort.de/na/3ebf04ae352546a3a0d0bcbadc37c2d1" width="1" height="1" alt="">
